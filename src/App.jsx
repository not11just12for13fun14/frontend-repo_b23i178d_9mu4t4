import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import ActionGrid from './components/ActionGrid';
import CreationModal from './components/CreationModal';
import Dashboard from './components/Dashboard';

function App() {
  const [dark, setDark] = useState(true);
  const [modal, setModal] = useState(null);
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('creations');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  const handleOpen = (mode) => setModal(mode);
  const handleClose = () => setModal(null);

  const handleSave = (data) => {
    const item = { id: crypto.randomUUID(), createdAt: Date.now(), ...data };
    setItems((prev) => [item, ...prev]);
  };

  const onVoice = async () => {
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) return alert('Voice not supported on this device');
      const recog = new SpeechRecognition();
      recog.lang = 'en-US';
      recog.interimResults = false;
      recog.maxAlternatives = 1;
      recog.onresult = (e) => {
        const text = e.results[0][0].transcript || '';
        setModal('writer');
        setTimeout(() => {
          const input = document.querySelector('input[placeholder^="Describe"]');
          if (input) {
            input.value = text;
            input.dispatchEvent(new Event('input', { bubbles: true }));
          }
        }, 50);
      };
      recog.start();
    } catch (e) {
      alert('Voice error: ' + (e?.message || 'unknown'));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-900 to-black text-white font-['Inter',_'IBM_Plex_Sans',system-ui]">
      <Header dark={dark} onToggleDark={() => setDark((d) => !d)} />
      <main className="pb-24">
        <ActionGrid onOpen={handleOpen} onVoice={onVoice} />
        <Dashboard items={items} setItems={setItems} />
      </main>
      {modal && (
        <CreationModal mode={modal} onClose={handleClose} onSave={handleSave} />
      )}
      <div className="fixed bottom-3 inset-x-0 mx-auto max-w-md px-4">
        <div className="rounded-2xl bg-white/10 backdrop-blur border border-white/10 p-3 text-center text-white/80 text-sm">
          Mobile-optimized layout with large type and high contrast for low-vision comfort.
        </div>
      </div>
    </div>
  );
}

export default App;
