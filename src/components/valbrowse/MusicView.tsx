import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Radio, Trash2, Plus, Upload } from 'lucide-react';
import {
  CURATED_SOUNDCLOUD_STATIONS,
  buildSoundCloudWidgetUrl,
  normalizeSoundCloudUrl,
  sanitizePlaylistItems,
  suggestTrackLabelFromUrl,
  type SoundCloudPlaylistEntry,
} from '../../utils/soundcloudEmbed';

const SC_PLAYLIST_STORAGE_KEY = 'valbrowse_sc_playlist';

const LOFI_CHORDS = [
  [261.63, 329.63, 392.0, 493.88], // Cmaj7
  [220.0, 261.63, 329.63, 392.0],  // Am7
  [174.61, 220.0, 261.63, 329.63], // Fmaj7
  [196.0, 246.94, 293.66, 349.23], // G7
];

export const MusicView: React.FC = () => {
  const [scInput, setScInput] = useState('https://soundcloud.com/lofi_girl');
  const [scActiveUrl, setScActiveUrl] = useState('https://soundcloud.com/lofi_girl');
  const [scError, setScError] = useState('');
  const [playlist, setPlaylist] = useState<SoundCloudPlaylistEntry[]>(() => {
    try {
      return sanitizePlaylistItems(localStorage.getItem(SC_PLAYLIST_STORAGE_KEY));
    } catch {
      return [];
    }
  });

  // Offline Web Audio Synth state
  const [synthRunning, setSynthRunning] = useState(false);
  const [bpm, setBpm] = useState(76);
  const [cutoff, setCutoff] = useState(1100);
  const synthCtxRef = useRef<AudioContext | null>(null);
  const synthFilterRef = useRef<BiquadFilterNode | null>(null);
  const synthMasterRef = useRef<GainNode | null>(null);
  const synthTimerRef = useRef<number | null>(null);
  const synthStepRef = useRef(0);

  // Local file audio
  const [localAudioUrl, setLocalAudioUrl] = useState<string | null>(null);
  const [localFileName, setLocalFileName] = useState<string | null>(null);

  const savePlaylist = (items: SoundCloudPlaylistEntry[]) => {
    setPlaylist(items);
    try {
      localStorage.setItem(SC_PLAYLIST_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  };

  const handleLoadSc = (rawUrl: string) => {
    const check = normalizeSoundCloudUrl(rawUrl);
    if (!check.ok) {
      setScError(check.error);
      return;
    }
    setScError('');
    setScInput(check.url);
    setScActiveUrl(check.url);
  };

  const handleAddPlaylist = () => {
    const check = normalizeSoundCloudUrl(scInput);
    if (!check.ok) {
      setScError(check.error);
      return;
    }
    setScError('');
    if (playlist.some((p) => p.url === check.url)) return;
    const next: SoundCloudPlaylistEntry[] = [
      { id: `sc_${Date.now()}`, name: suggestTrackLabelFromUrl(check.url), url: check.url },
      ...playlist,
    ];
    savePlaylist(next);
  };

  const playChord = (freqs: number[], durSec: number) => {
    const ctx = synthCtxRef.current;
    const filter = synthFilterRef.current;
    if (!ctx || !filter) return;
    const now = ctx.currentTime;
    freqs.forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.045, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + durSec);
      osc.connect(gain);
      gain.connect(filter);
      osc.start(now);
      osc.stop(now + durSec + 0.05);
    });
  };

  const playDrum = (type: 'kick' | 'snare' | 'hat') => {
    const ctx = synthCtxRef.current;
    const master = synthMasterRef.current;
    if (!ctx || !master) return;
    const now = ctx.currentTime;
    if (type === 'kick') {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(42, now + 0.14);
      g.gain.setValueAtTime(0.28, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.connect(g);
      g.connect(master);
      osc.start(now);
      osc.stop(now + 0.2);
    } else {
      const len = Math.floor(ctx.sampleRate * (type === 'snare' ? 0.12 : 0.045));
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
      const src = ctx.createBufferSource();
      src.buffer = buf;
      const flt = ctx.createBiquadFilter();
      flt.type = type === 'snare' ? 'bandpass' : 'highpass';
      flt.frequency.setValueAtTime(type === 'snare' ? 1400 : 5200, now);
      const g = ctx.createGain();
      g.gain.setValueAtTime(type === 'snare' ? 0.09 : 0.035, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + (type === 'snare' ? 0.12 : 0.045));
      src.connect(flt);
      flt.connect(g);
      g.connect(master);
      src.start(now);
    }
  };

  const runSynthTick = (activeBpm: number) => {
    const step = synthStepRef.current;
    const barStep = step % 8;
    if (barStep === 0) {
      const chordIdx = Math.floor(step / 8) % LOFI_CHORDS.length;
      playChord(LOFI_CHORDS[chordIdx], (60 / activeBpm) * 3.8);
    }
    if (barStep === 0 || barStep === 3) playDrum('kick');
    if (barStep === 4) playDrum('snare');
    if (barStep % 2 === 1) playDrum('hat');
    synthStepRef.current += 1;
  };

  const toggleSynth = () => {
    if (synthRunning) {
      setSynthRunning(false);
      if (synthTimerRef.current) {
        window.clearInterval(synthTimerRef.current);
        synthTimerRef.current = null;
      }
      synthCtxRef.current?.suspend().catch(() => {});
      return;
    }

    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    if (!synthCtxRef.current) {
      const ctx = new AudioCtx();
      const master = ctx.createGain();
      master.gain.value = 0.7;
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = cutoff;
      filter.connect(master);
      master.connect(ctx.destination);
      synthCtxRef.current = ctx;
      synthMasterRef.current = master;
      synthFilterRef.current = filter;
    }

    synthCtxRef.current.resume().catch(() => {});
    synthStepRef.current = 0;
    runSynthTick(bpm);
    synthTimerRef.current = window.setInterval(
      () => runSynthTick(bpm),
      Math.round((60 / bpm / 2) * 1000)
    );
    setSynthRunning(true);
  };

  useEffect(() => {
    if (synthFilterRef.current && synthCtxRef.current) {
      synthFilterRef.current.frequency.setTargetAtTime(cutoff, synthCtxRef.current.currentTime, 0.05);
    }
  }, [cutoff]);

  useEffect(() => {
    if (synthRunning) {
      if (synthTimerRef.current) window.clearInterval(synthTimerRef.current);
      synthTimerRef.current = window.setInterval(
        () => runSynthTick(bpm),
        Math.round((60 / bpm / 2) * 1000)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bpm]);

  useEffect(() => {
    return () => {
      if (synthTimerRef.current) window.clearInterval(synthTimerRef.current);
      if (localAudioUrl) URL.revokeObjectURL(localAudioUrl);
    };
  }, [localAudioUrl]);

  const handleLocalFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (localAudioUrl) URL.revokeObjectURL(localAudioUrl);
    setLocalAudioUrl(URL.createObjectURL(file));
    setLocalFileName(file.name);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="h-full overflow-y-auto px-5 py-5 lg:px-7"
    >
      <div className="max-w-[1440px] mx-auto space-y-5">
        <div className="border-b border-white/[0.07] pb-4">
          <div className="text-[11px] font-mono uppercase tracking-[0.08em] text-indigo-400">
            gn-math Audio · SoundCloud &amp; Offline Synth
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-50 mt-1">
            Music Studio
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* SoundCloud Panel */}
          <div className="rounded-xl bg-[#0e131e] border border-white/[0.07] p-4 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-bold text-slate-100">SoundCloud Player</h2>
              <span className="text-[11px] font-mono text-slate-500">Curated Stations</span>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLoadSc(scInput);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={scInput}
                onChange={(e) => setScInput(e.target.value)}
                placeholder="Paste any soundcloud.com track or playlist URL..."
                className="flex-1 h-9 px-3 rounded-lg bg-[#080b12] border border-white/[0.08] text-xs font-mono text-slate-100 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="h-9 px-3.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-xs font-semibold text-white cursor-pointer"
              >
                Load
              </button>
              <button
                type="button"
                onClick={handleAddPlaylist}
                title="Save to playlist"
                className="h-9 px-2.5 rounded-lg bg-[#121826] hover:bg-[#192235] border border-white/[0.08] text-slate-200 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </form>

            {scError && <p className="text-xs text-rose-400">{scError}</p>}

            <div className="flex flex-wrap gap-1.5">
              {CURATED_SOUNDCLOUD_STATIONS.map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => handleLoadSc(st.url)}
                  className={`h-7 px-2.5 rounded-md text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer transition-colors ${
                    scActiveUrl === st.url
                      ? 'bg-indigo-500 text-white'
                      : 'bg-[#121826] text-slate-300 hover:text-white border border-white/[0.07]'
                  }`}
                >
                  <Radio className="w-3 h-3" />
                  <span>{st.label}</span>
                </button>
              ))}
            </div>

            <iframe
              title="SoundCloud Player"
              width="100%"
              height="300"
              allow="autoplay"
              src={buildSoundCloudWidgetUrl(scActiveUrl)}
              className="rounded-lg border border-white/[0.07] bg-black"
            />

            {playlist.length > 0 && (
              <div className="space-y-1.5 pt-2 border-t border-white/[0.07]">
                <div className="text-[11px] font-mono uppercase text-slate-500">Saved Tracks</div>
                <div className="space-y-1 max-h-36 overflow-y-auto">
                  {playlist.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg bg-[#090d16] border border-white/[0.06]"
                    >
                      <button
                        type="button"
                        onClick={() => handleLoadSc(item.url)}
                        className="text-xs font-medium text-slate-200 hover:text-indigo-300 truncate text-left flex-1 cursor-pointer"
                      >
                        {item.name}
                      </button>
                      <button
                        type="button"
                        onClick={() => savePlaylist(playlist.filter((p) => p.id !== item.id))}
                        aria-label={`Remove ${item.name}`}
                        className="text-slate-500 hover:text-rose-400 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Offline Lo-Fi Synth & Local Audio */}
          <div className="rounded-xl bg-[#0e131e] border border-white/[0.07] p-4 space-y-5">
            <div>
              <h2 className="text-sm font-bold text-slate-100">
                Offline Lo-Fi Beat &amp; Chord Synth
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                100% browser Web Audio generator — works offline with zero external requests.
              </p>
            </div>

            <button
              type="button"
              onClick={toggleSynth}
              className={`h-10 px-4 rounded-lg text-xs font-semibold inline-flex items-center gap-2 cursor-pointer transition-colors ${
                synthRunning
                  ? 'bg-rose-500/20 text-rose-200 border border-rose-500/40'
                  : 'bg-indigo-500 hover:bg-indigo-600 text-white'
              }`}
            >
              {synthRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{synthRunning ? 'Stop Lo-Fi Synth' : 'Start Lo-Fi Beat & Chords'}</span>
            </button>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono text-slate-300">
                  <span>Tempo (BPM)</span>
                  <span className="tabular-nums text-indigo-300">{bpm} BPM</span>
                </div>
                <input
                  type="range"
                  min={60}
                  max={110}
                  value={bpm}
                  onChange={(e) => setBpm(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono text-slate-300">
                  <span>Warmth Filter</span>
                  <span className="tabular-nums text-indigo-300">{cutoff} Hz</span>
                </div>
                <input
                  type="range"
                  min={350}
                  max={2800}
                  value={cutoff}
                  onChange={(e) => setCutoff(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.07] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-200">Local Audio File Player</span>
                {localFileName && (
                  <span className="text-[11px] font-mono text-slate-400 truncate max-w-[200px]">
                    {localFileName}
                  </span>
                )}
              </div>

              <label className="inline-flex items-center gap-2 h-9 px-3.5 rounded-lg bg-[#121826] hover:bg-[#192235] border border-white/[0.08] text-xs font-semibold text-slate-200 cursor-pointer">
                <Upload className="w-3.5 h-3.5 text-indigo-400" />
                <span>Choose .mp3 / .wav / .ogg</span>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleLocalFile}
                  className="hidden"
                />
              </label>

              {localAudioUrl && (
                <audio src={localAudioUrl} controls autoPlay className="w-full mt-2" />
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
