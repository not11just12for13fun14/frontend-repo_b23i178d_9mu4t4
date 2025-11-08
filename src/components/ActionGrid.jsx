import { Globe, Bot, Image as ImageIcon, FileText, Code2, Mic, Share2, Trash2, Save, Download, Printer, Star, BookOpen } from 'lucide-react';

const actions = [
  { key: 'web', label: 'Website Creator', icon: Globe, color: 'from-cyan-500 to-blue-500', desc: 'Generate fully hosted sites via prompt' },
  { key: 'chat', label: 'Chatbot Creator', icon: Bot, color: 'from-emerald-500 to-lime-500', desc: 'Build bots for support, sales, FAQs' },
  { key: 'images', label: 'Image Creator', icon: ImageIcon, color: 'from-fuchsia-500 to-pink-500', desc: 'Create and edit images' },
  { key: 'writer', label: 'Writer Studio', icon: FileText, color: 'from-amber-500 to-orange-500', desc: 'Essays, poems, emails, resumes' },
  { key: 'qa', label: 'Q&A Solver', icon: BookOpen, color: 'from-sky-500 to-indigo-500', desc: 'Answers for any subject' },
  { key: 'convert', label: 'Code Converter', icon: Code2, color: 'from-purple-500 to-violet-500', desc: 'Translate code across languages' },
  { key: 'astro', label: 'Astrology', icon: Star, color: 'from-rose-500 to-fuchsia-500', desc: 'Readings and charts', link: 'https://hindi.astrosage.com/' },
  { key: 'numerology', label: 'Numerology', icon: Star, color: 'from-teal-500 to-emerald-500', desc: 'Your numerology report', link: 'https://vedicrishi.in/your-free-numerology-report?utm_source=google&utm_medium=cpc&utm_campaign=numerology&gad_source=1&gad_campaignid=21448723888&gclid=Cj0KCQjwgpzIBhCOARIsABZm7vGvatRdl471Fws5eKxmNle8YT2JziEaakwzY05l1Q7dRcb7kfvsSiUaAik7EALw_wcB' },
  { key: 'loshu', label: 'Lo Shu Grid', icon: Star, color: 'from-cyan-600 to-indigo-600', desc: 'Grid calculator', link: 'https://www-occultscience-in.translate.goog/tools/lo-shu-grid-calculator/?_x_tr_sl=en&_x_tr_tl=hi&_x_tr_hl=hi&_x_tr_pto=tc' },
];

export default function ActionGrid({ onOpen, onVoice }) {
  return (
    <section className="max-w-5xl mx-auto px-4 py-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-white">Create</h2>
        <button onClick={onVoice} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white">
          <Mic className="w-4 h-4" /> Voice
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {actions.map((a) => (
          <button
            key={a.key}
            onClick={() => a.link ? window.open(a.link, '_blank', 'noopener,noreferrer') : onOpen(a.key)}
            className={`group rounded-2xl p-4 text-left bg-gradient-to-br ${a.color} focus:outline-none focus:ring-2 focus:ring-white/40`}
          >
            <div className="flex items-center justify-between">
              <a.icon className="w-6 h-6 text-white drop-shadow" />
            </div>
            <div className="mt-8">
              <div className="text-white font-semibold leading-tight">{a.label}</div>
              <div className="text-white/80 text-sm">{a.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
