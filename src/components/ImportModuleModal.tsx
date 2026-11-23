import React, { useState } from 'react';
import { X, Plus, AlertCircle, Eye, Upload, FileCode, Sparkles } from 'lucide-react';
import { AcademicModule } from '../types/curriculum';
import { validateModuleInput } from '../utils/curriculumLogic';

interface ImportModuleModalProps {
  onClose: () => void;
  onImport: (newModule: AcademicModule) => void;
}

const DEPARTMENTS = [
  'Applied Mathematics',
  'Spatial Geometry',
  'Algorithmic Logic',
  'Classical Mechanics',
  'Probability & Statistics',
  'Fluid Kinematics',
  'Lexical Linguistics',
  'Cognitive Neuroscience',
  'Astrophysics & Celestial Mechanics',
  'Condensed Matter Physics',
];

export const ImportModuleModal: React.FC<ImportModuleModalProps> = ({
  onClose,
  onImport,
}) => {
  const [courseCode, setCourseCode] = useState('');
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const [level, setLevel] = useState('Undergraduate Practicum');
  const [estimatedDuration, setEstimatedDuration] = useState('10 min session');
  const [description, setDescription] = useState('');
  const [academicObjective, setAcademicObjective] = useState('');
  const [instrumentDirectives, setInstrumentDirectives] = useState('Mouse & Keyboard input directives as specified by the module.');
  const [iframeInput, setIframeInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  // Handle Drag & Drop of standalone HTML module file
  const handleFile = (file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const htmlContent = e.target?.result as string;
      if (htmlContent) {
        // Create Data URI
        const dataUri = `data:text/html;charset=utf-8,${encodeURIComponent(htmlContent)}`;
        setIframeInput(dataUri);

        // Auto-populate title if empty
        const cleanName = file.name.replace(/\.(html|ubg|htm)$/i, '').replace(/[-_]/g, ' ');
        if (!title) {
          setTitle(`Practicum: ${cleanName.charAt(0).toUpperCase() + cleanName.slice(1)}`);
        }
        if (!courseCode) {
          setCourseCode(`LAB-${Math.floor(100 + Math.random() * 900)}`);
        }
        setError(null);
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleValidateAndSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!iframeInput.trim()) {
      setError('Please provide an iframe source URL, embed code, or upload an HTML simulation file.');
      return;
    }

    let resolvedSrc = iframeInput.trim();
    // Resolve iframe embed code if pasted directly
    if (resolvedSrc.startsWith('<iframe')) {
      const match = resolvedSrc.match(/src=["']([^"']+)["']/i);
      if (match) resolvedSrc = match[1];
    }

    const newModule: AcademicModule = {
      id: `custom-${Date.now()}`,
      courseCode: (courseCode.trim() || 'LAB-201').toUpperCase(),
      title: title.trim() || 'Custom Curriculum Practicum',
      department,
      level,
      estimatedDuration,
      description: description.trim() || 'Custom scholar-imported interactive laboratory curriculum module.',
      academicObjective: academicObjective.trim() || 'Conduct empirical inquiry and optimize algorithmic execution within the sandbox.',
      instrumentDirectives: instrumentDirectives.trim(),
      learningOutcomes: [
        'Experimental empirical observation in simulated domain',
        'Parameter optimization and hypothesis testing'
      ],
      defaultHonorsIndex: 1000,
      iframeSrc: resolvedSrc,
      tags: [department, 'Imported Practicum', 'Custom Module'],
      isCustom: true,
    };

    onImport(newModule);
    onClose();
  };

  // Quick preset loader
  const loadPreset = (presetType: 'conway' | 'fractal') => {
    if (presetType === 'conway') {
      setCourseCode('BIO-240');
      setTitle('Conway Cellular Automata & Emergent Complexity');
      setDepartment('Algorithmic Logic');
      setDescription('Zero-player cellular automaton modeling population dynamics and emergent structural complexity on an infinite toroidal 2D grid.');
      setAcademicObjective('Observe oscillating gliders, beacons, and stable block clusters under the 4 foundational transition rules.');
      setIframeInput(`data:text/html;charset=utf-8,${encodeURIComponent(`<!DOCTYPE html><html><head><style>body{margin:0;background:#09090b;color:#fff;font-family:sans-serif;display:flex;flex-direction:column;align-items:center;padding:12px;}canvas{background:#111;border:1px solid #333;border-radius:8px;}button{background:#2563eb;color:#fff;border:none;padding:6px 14px;border-radius:6px;font-weight:bold;margin:8px;cursor:pointer;}</style></head><body><h3 style="margin:4px 0;">BIO-240: Cellular Automata</h3><canvas id="c" width="400" height="300"></canvas><div><button id="step">Step</button><button id="rand">Randomize Seed</button></div><script>const c=document.getElementById('c'),x=c.getContext('2d'),w=50,h=38,s=8;let g=Array.from({length:h},()=>Array(w).fill(0));function rnd(){for(let r=0;r<h;r++)for(let c=0;c<w;c++)g[r][c]=Math.random()>0.75?1:0;drw();}function drw(){x.clearRect(0,0,400,300);x.fillStyle='#10b981';for(let r=0;r<h;r++)for(let c=0;c<w;c++)if(g[r][c])x.fillRect(c*s,r*s,s-1,s-1);}function nxt(){let ng=g.map(row=>[...row]);for(let r=0;r<h;r++)for(let c=0;c<w;c++){let n=0;for(let dr=-1;dr<=1;dr++)for(let dc=-1;dc<=1;dc++)if((dr||dc)&&g[(r+dr+h)%h][(c+dc+w)%w])n++;if(g[r][c]&&(n===2||n===3))ng[r][c]=1;else if(!g[r][c]&&n===3)ng[r][c]=1;else ng[r][c]=0;}g=ng;drw();}document.getElementById('step').onclick=nxt;document.getElementById('rand').onclick=rnd;rnd();setInterval(nxt,150);<\/script></body></html>`)}`);
    } else {
      setCourseCode('MATH-380');
      setTitle('Complex Julia Set & Fractal Iterations');
      setDepartment('Applied Mathematics');
      setDescription('Fractal geometry visualization computing complex quadratic polynomial iterations z_{n+1} = z_n^2 + c.');
      setAcademicObjective('Inspect boundary convergence dynamics and self-similarity invariants across the complex Argand plane.');
      setIframeInput(`data:text/html;charset=utf-8,${encodeURIComponent(`<!DOCTYPE html><html><head><style>body{margin:0;background:#09090b;color:#fff;font-family:sans-serif;display:flex;flex-direction:column;align-items:center;padding:12px;}canvas{background:#000;border:1px solid #333;border-radius:8px;}</style></head><body><h3 style="margin:4px 0;">MATH-380: Julia Complex Iteration</h3><canvas id="c" width="400" height="300"></canvas><p style="font-size:11px;color:#888;">Move cursor across canvas to modulate complex constant parameter c.</p><script>const c=document.getElementById('c'),ctx=c.getContext('2d'),img=ctx.createImageData(400,300),d=img.data;let cr=-0.7,ci=0.27015;function drw(){let idx=0;for(let y=0;y<300;y++){for(let x=0;x<400;x++){let zx=1.5*(x-200)/150,zy=(y-150)/150,i=0;while(zx*zx+zy*zy<4&&i<40){let tmp=zx*zx-zy*zy+cr;zy=2*zx*zy+ci;zx=tmp;i++;}d[idx++]=i===40?0:i*6;d[idx++]=i===40?0:i*3;d[idx++]=i===40?0:i*8+50;d[idx++]=255;}}ctx.putImageData(img,0,0);}c.onmousemove=e=>{const r=c.getBoundingClientRect();cr=((e.clientX-r.left)/400-0.5)*1.5;ci=((e.clientY-r.top)/300-0.5)*1.5;drw();};drw();<\/script></body></html>`)}`);
    }
  };

  const currentPreviewSrc = iframeInput.trim().match(/src=["']([^"']+)["']/i)?.[1] || iframeInput.trim();

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-zinc-200 w-full max-w-xl max-h-[92vh] overflow-y-auto">
        <div className="p-5 border-b border-zinc-200 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-zinc-900 flex items-center gap-2">
              <span>Import External HTML5 Practicum</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                HTML5 / Canvas
              </span>
            </h2>
            <p className="text-xs text-zinc-500">
              Drop any standalone .html simulation file or paste an iframe sandbox URL
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleValidateAndSave} className="p-6 space-y-4 text-xs">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Drag & Drop Zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-5 text-center transition-all ${
              isDragOver
                ? 'border-indigo-500 bg-indigo-50/50'
                : 'border-zinc-200 bg-zinc-50/50 hover:bg-zinc-50'
            }`}
          >
            <FileCode className="w-6 h-6 mx-auto mb-2 text-indigo-600" />
            <span className="font-bold text-zinc-800 block text-xs mb-1">
              Drag &amp; Drop Standalone HTML5 File Here
            </span>
            <span className="text-[11px] text-zinc-500 block mb-3">
              Automatically encodes self-contained Canvas / JS simulation files into sandboxed practicums
            </span>

            <div className="flex items-center justify-center gap-2">
              <label className="px-3 py-1.5 bg-white border border-zinc-200 text-zinc-800 font-semibold rounded-lg shadow-2xs hover:bg-zinc-50 cursor-pointer inline-flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5" />
                <span>Select .html Simulation File</span>
                <input
                  type="file"
                  accept=".html,.htm,.ubg"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFile(f);
                  }}
                  className="hidden"
                />
              </label>

              <button
                type="button"
                onClick={() => loadPreset('conway')}
                className="px-2.5 py-1.5 text-zinc-600 hover:text-zinc-900 border border-zinc-200 bg-white rounded-lg hover:bg-zinc-50 font-medium inline-flex items-center gap-1"
                title="Load Conway Cellular Automata sample"
              >
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>Load Sample A</span>
              </button>

              <button
                type="button"
                onClick={() => loadPreset('fractal')}
                className="px-2.5 py-1.5 text-zinc-600 hover:text-zinc-900 border border-zinc-200 bg-white rounded-lg hover:bg-zinc-50 font-medium inline-flex items-center gap-1"
                title="Load Julia Set fractal sample"
              >
                <Sparkles className="w-3 h-3 text-indigo-500" />
                <span>Load Sample B</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-zinc-700 mb-1">
                Course Code *
              </label>
              <input
                type="text"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                placeholder="e.g. PHYS-304"
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-zinc-900 font-mono text-xs uppercase"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-zinc-700 mb-1">
                Department Discipline *
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-zinc-900 text-xs"
              >
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-zinc-700 mb-1">
              Practicum Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Non-Euclidean Wave Mechanics Simulation"
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-zinc-900 text-xs"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-zinc-700 mb-1">
              Iframe Source URL, Embed Code, or Data URI *
            </label>
            <textarea
              value={iframeInput}
              onChange={(e) => setIframeInput(e.target.value)}
              placeholder='e.g. ./modules/matrix_lab.html or https://example.org/sim or data:text/html,...'
              rows={2}
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-zinc-900 font-mono text-xs"
              required
            />
            {currentPreviewSrc && (
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[11px] text-zinc-500 font-mono truncate max-w-sm">
                  Loaded source: {currentPreviewSrc.slice(0, 45)}...
                </span>
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="text-xs text-zinc-700 hover:text-zinc-900 font-medium flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{showPreview ? 'Hide Preview' : 'Test Sandbox Preview'}</span>
                </button>
              </div>
            )}
          </div>

          {showPreview && currentPreviewSrc && (
            <div className="border border-zinc-200 rounded-lg overflow-hidden bg-zinc-100 h-44 relative">
              <iframe
                src={currentPreviewSrc}
                title="Preview"
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          )}

          <div>
            <label className="block font-semibold text-zinc-700 mb-1">
              Scholarly Abstract / Academic Objective
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the experimental hypothesis, mechanics, and analytical focus..."
              rows={2}
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-zinc-900 text-xs"
            />
          </div>

          <div className="pt-4 border-t border-zinc-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-100 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg transition flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Import to Catalog</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
