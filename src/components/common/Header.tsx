import React from 'react';
import { Zap, Search, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  globalUsername: string;
  setGlobalUsername: (name: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  globalUsername,
  setGlobalUsername,
}) => {
  return (
    <header className="sticky top-0 z-50 vibe-panel border-b border-slate-800/80 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Brand & Vibe Badge */}
      <div className="flex items-center gap-4">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-sky-400 to-purple-600 rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition duration-500"></div>
          <div className="relative w-11 h-11 bg-slate-950 rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl">
            <Zap className="w-6 h-6 text-cyan-400 fill-cyan-400/20 animate-pulse" />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-black text-2xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-purple-400 display-font">
              GitStats Studio
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-bold bg-cyan-500/10 text-cyan-300 rounded-full border border-cyan-500/30 text-glow-cyan">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
              VIBE ENGINE NATIVE
            </span>
          </div>
          <p className="text-xs text-slate-400 hidden sm:block mt-0.5">
            Gelişmiş Nitelikli GitHub Stat & Animasyonlu SVG Stüdyosu
          </p>
        </div>
      </div>

      {/* Global Username Cyber Input */}
      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="relative flex-1 md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4 text-cyan-400" />
          </div>
          <input
            type="text"
            value={globalUsername}
            onChange={(e) => setGlobalUsername(e.target.value)}
            placeholder="GitHub Kullanıcı Adı Girin..."
            className="w-full pl-10 pr-12 py-2 bg-slate-950/90 text-sm text-slate-100 placeholder-slate-500 rounded-xl border border-slate-700/80 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all font-mono"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[10px] font-mono text-slate-500">
            ⌘K
          </div>
        </div>

        {/* Security / Native API pill */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-2 bg-slate-900/80 text-emerald-400 rounded-xl border border-emerald-500/20 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Yerel API Aktif</span>
        </div>
      </div>
    </header>
  );
};
