export interface VuxAudioStation {
  id: string;
  title: string;
  artist: string;
  genre: string;
  bpm: number;
  durationSec: number;
  filterHz: number;
  waveform: 'triangle' | 'sine' | 'sawtooth';
  chords: readonly (readonly number[])[];
  accentColor: string;
}

export interface VuxAmbientLayerSpec {
  id: 'rain' | 'fireplace' | 'cafe' | 'keyboard';
  label: string;
  description: string;
  defaultVolume: number;
}

export const VUX_AUDIO_STATIONS: readonly VuxAudioStation[] = [
  {
    id: 'lofi-study',
    title: 'Lofi Study Beats',
    artist: 'Vux Tape Deck',
    genre: 'Lo-Fi Chill',
    bpm: 76,
    durationSec: 210,
    filterHz: 1050,
    waveform: 'triangle',
    chords: [
      [261.63, 329.63, 392.0, 493.88],
      [220.0, 261.63, 329.63, 392.0],
      [174.61, 220.0, 261.63, 329.63],
      [196.0, 246.94, 293.66, 349.23],
    ],
    accentColor: '#ff5c7c',
  },
  {
    id: 'synthwave-night',
    title: 'Synthwave Night',
    artist: 'Neon Horizon FM',
    genre: 'Retrowave',
    bpm: 96,
    durationSec: 240,
    filterHz: 1550,
    waveform: 'sawtooth',
    chords: [
      [146.83, 220.0, 261.63, 349.23],
      [130.81, 196.0, 246.94, 329.63],
      [116.54, 174.61, 220.0, 293.66],
      [130.81, 196.0, 261.63, 329.63],
    ],
    accentColor: '#a855f7',
  },
  {
    id: 'deep-focus',
    title: 'Deep Focus Ambient',
    artist: 'Quiet Drift',
    genre: 'Ambient',
    bpm: 60,
    durationSec: 300,
    filterHz: 780,
    waveform: 'sine',
    chords: [
      [246.94, 293.66, 369.99, 440.0],
      [220.0, 261.63, 329.63, 415.3],
      [196.0, 246.94, 293.66, 369.99],
      [164.81, 220.0, 246.94, 329.63],
    ],
    accentColor: '#38bdf8',
  },
  {
    id: 'chill-piano',
    title: 'Chill Piano',
    artist: 'Midnight Felt Keys',
    genre: 'Acoustic Keys',
    bpm: 72,
    durationSec: 195,
    filterHz: 1350,
    waveform: 'triangle',
    chords: [
      [293.66, 349.23, 440.0, 523.25],
      [261.63, 329.63, 392.0, 493.88],
      [220.0, 261.63, 329.63, 440.0],
      [196.0, 246.94, 293.66, 392.0],
    ],
    accentColor: '#34d399',
  },
  {
    id: 'gaming-bass',
    title: 'Gaming Bass',
    artist: 'Overdrive Radio',
    genre: 'Electronic',
    bpm: 118,
    durationSec: 180,
    filterHz: 1750,
    waveform: 'sawtooth',
    chords: [
      [130.81, 196.0, 261.63, 311.13],
      [116.54, 174.61, 233.08, 293.66],
      [103.83, 155.56, 207.65, 261.63],
      [116.54, 174.61, 233.08, 293.66],
    ],
    accentColor: '#f59e0b',
  },
  {
    id: 'nature-rain',
    title: 'Nature Rain',
    artist: 'Rainforest Canopy',
    genre: 'Nature Soundscape',
    bpm: 64,
    durationSec: 360,
    filterHz: 680,
    waveform: 'sine',
    chords: [
      [220.0, 293.66, 329.63, 440.0],
      [196.0, 261.63, 329.63, 392.0],
      [174.61, 220.0, 293.66, 349.23],
      [196.0, 246.94, 293.66, 392.0],
    ],
    accentColor: '#2dd4bf',
  },
];

export const VUX_AMBIENT_LAYERS: readonly VuxAmbientLayerSpec[] = [
  { id: 'rain', label: 'Rain', description: 'Soft steady rainfall', defaultVolume: 0 },
  { id: 'fireplace', label: 'Fireplace', description: 'Warm crackling hearth', defaultVolume: 0 },
  { id: 'cafe', label: 'Cafe Chatter', description: 'Mellow coffeehouse murmur', defaultVolume: 0 },
  { id: 'keyboard', label: 'Keyboard Clicks', description: 'Crisp tactile typing rhythm', defaultVolume: 0 },
];

export function formatAudioTime(seconds: number): string {
  const safe = Math.max(0, Math.floor(Number.isFinite(seconds) ? seconds : 0));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${mins}:${String(secs).padStart(2, '0')}`;
}

export function normalizeCustomMp3Url(raw: string | null | undefined): string | null {
  const trimmed = String(raw || '').trim();
  if (!trimmed) return null;
  if (/^(javascript|data|vbscript|file):/i.test(trimmed)) return null;
  if (trimmed.startsWith('blob:')) return trimmed;
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return parsed.toString();
    }
    return null;
  } catch {
    return null;
  }
}
