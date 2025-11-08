import { useEffect, useRef, useState } from 'react';
import { X, Save, Download, Printer, Share2, Trash2 } from 'lucide-react';

export default function CreationModal({ mode, onClose, onSave }) {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const dialogRef = useRef(null);

  useEffect(() => {
    const onEsc = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [onClose]);

  const title = {
    web: 'Website Creator',
    chat: 'Chatbot Creator',
    images: 'Image Creator',
    writer: 'Writer Studio',
    qa: 'Q&A Solver',
    convert: 'Code Converter',
  }[mode] || 'Create';

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const base = import.meta.env.VITE_BACKEND_URL;
      if (base) {
        const res = await fetch(`${base}/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mode, prompt }),
        });
        if (!res.ok) throw new Error('Generation failed');
        const data = await res.json();
        setResult(data.output || '');
        onSave({ mode, title: `${title} result`, content: data.output || '' });
      } else {
        const demo = `${title} preview for: "${prompt}"`;
        setResult(demo);
        onSave({ mode, title: `${title} result`, content: demo });
      }
    } catch (e) {
      const demo = `${title} preview for: "${prompt}"`;
      setResult(demo);
      onSave({ mode, title: `${title} result`, content: demo });
    } finally {
      setLoading(false);
    }
  };

  const handleAction = (action) => {
    if (!result) return;
    if (action === 'print') window.print();
    if (action === 'download') {
      const blob = new Blob([result], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${mode}-result.txt`;
      a.click();
      URL.revokeObjectURL(url);
    }
    if (action === 'share' && navigator.share) {
      navigator.share({ title, text: result });
    }
    if (action === 'delete') {
      setResult('');
    }
    if (action === 'save') {
      onSave({ mode, title: `${title} result`, content: result });
    }
  };

  return (
    <div className="fixed inset-0 z-30 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div ref={dialogRef} className="relative w-full sm:max-w-lg bg-zinc-900 text-white rounded-t-3xl sm:rounded-3xl shadow-xl p-4 sm:p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="p-2 rounded-lg bg-white/10 hover:bg-white/20">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what to create..."
            className="w-full px-3 py-3 rounded-lg bg-white/10 placeholder-white/60 outline-none text-base"
          />
          <button onClick={handleGenerate} disabled={loading || !prompt} className="w-full py-3 rounded-lg text-base font-medium bg-gradient-to-r from-fuchsia-500 to-cyan-500 disabled:opacity-50">
            {loading ? 'Working…' : 'Create'}
          </button>
          {result && (
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-white/10 min-h-[140px] whitespace-pre-wrap">{result}</div>
              <div className="grid grid-cols-5 gap-2">
                <button onClick={() => handleAction('save')} className="p-2 rounded-lg bg-white/10 hover:bg-white/20"><Save className="w-5 h-5 mx-auto" /></button>
                <button onClick={() => handleAction('download')} className="p-2 rounded-lg bg-white/10 hover:bg-white/20"><Download className="w-5 h-5 mx-auto" /></button>
                <button onClick={() => handleAction('print')} className="p-2 rounded-lg bg-white/10 hover:bg-white/20"><Printer className="w-5 h-5 mx-auto" /></button>
                <button onClick={() => handleAction('share')} className="p-2 rounded-lg bg-white/10 hover:bg-white/20"><Share2 className="w-5 h-5 mx-auto" /></button>
                <button onClick={() => handleAction('delete')} className="p-2 rounded-lg bg-white/10 hover:bg-white/20"><Trash2 className="w-5 h-5 mx-auto" /></button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
