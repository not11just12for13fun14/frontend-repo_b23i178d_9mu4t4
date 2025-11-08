import { useEffect, useState } from 'react';
import { Trash2, Download, Printer, Share2, ExternalLink } from 'lucide-react';

export default function Dashboard({ items, setItems }) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('creations', JSON.stringify(items));
    } catch {}
  }, [items]);

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    if (active && active.id === id) setActive(null);
  };

  const handleDownload = (item) => {
    const blob = new Blob([item.content || ''], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${item.mode}-${item.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async (item) => {
    if (navigator.share) {
      try { await navigator.share({ title: item.title, text: item.content }); } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(item.content || '');
        alert('Copied to clipboard');
      } catch {}
    }
  };

  const handlePrint = (item) => {
    const w = window.open('', '_blank', 'noopener,noreferrer');
    if (!w) return;
    w.document.write(`<pre style="font-family: ui-monospace, Menlo, monospace; white-space: pre-wrap; line-height: 1.6;">${(item.content || '').replaceAll('<', '&lt;')}</pre>`);
    w.document.close();
    w.focus();
    w.print();
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-4">
      <h2 className="text-lg font-semibold text-white mb-3">Dashboard</h2>
      {items.length === 0 ? (
        <p className="text-white/70">Nothing here yet. Create something above.</p>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {items.map((item) => (
            <div key={item.id} className={`rounded-2xl p-4 bg-white/5 border border-white/10 ${active && active.id === item.id ? 'ring-2 ring-white/40' : ''}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-white font-semibold truncate">{item.title}</div>
                  <div className="text-xs text-white/60">{new Date(item.createdAt).toLocaleString()} • {item.mode}</div>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <button onClick={() => setActive(item)} className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm inline-flex items-center gap-1"><ExternalLink className="w-4 h-4" /> Open</button>
                  <button onClick={() => handleDownload(item)} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"><Download className="w-4 h-4" /></button>
                  <button onClick={() => handlePrint(item)} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"><Printer className="w-4 h-4" /></button>
                  <button onClick={() => handleShare(item)} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"><Share2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-red-300"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              {active && active.id === item.id && (
                <div className="mt-3 p-3 rounded-lg bg-black/40 text-white/90 whitespace-pre-wrap text-base leading-relaxed">
                  {item.content}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
