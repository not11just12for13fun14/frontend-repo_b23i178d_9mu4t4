import { Sparkles, Moon, Sun } from 'lucide-react';

export default function Header({ dark, onToggleDark }) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/30 border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-fuchsia-500 to-cyan-500">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-white leading-snug">
              h1aaaaaaaaaaaaqqqaaqaqaaàaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaàaaa
            </h1>
            <p className="text-xs sm:text-sm text-white/80">All-in-one AI studio — mobile-first, dark, low-vision friendly</p>
          </div>
        </div>
        <button
          onClick={onToggleDark}
          aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition focus:outline-none focus:ring-2 focus:ring-white/40"
        >
          {dark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          <span className="hidden sm:inline text-sm">{dark ? 'Dark' : 'Light'}</span>
        </button>
      </div>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </header>
  );
}
