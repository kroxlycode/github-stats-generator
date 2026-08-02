import React from 'react';
import { 
  BarChart3, 
  Code, 
  Flame, 
  Type, 
  GitFork, 
  Activity, 
  Trophy, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import type { TabType } from '../../types/stats';

interface SidebarProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

const TABS: { id: TabType; label: string; description: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'profile-stats', label: 'Profil İstatistikleri', description: 'Stars, Commits, PRs & Rank', icon: BarChart3 },
  { id: 'top-langs', label: 'En Çok Kullanılan Diller', description: 'Donut & Bar chart görünümleri', icon: Code },
  { id: 'streak-stats', label: 'GitHub Seri (Streak)', description: 'Günlük katkı serileri', icon: Flame },
  { id: 'typing-svg', label: 'Typing SVG Animasyonu', description: 'Yazı yazma efekti SVG header', icon: Type },
  { id: 'repo-stats', label: 'Pinned Repo Kartı', description: 'Repo detay kartları', icon: GitFork },
  { id: 'activity-graph', label: 'Aktivite Grafiği', description: 'Yıllık katkı dalga grafiği', icon: Activity },
  { id: 'trophies', label: 'GitHub Rozetleri (Trophy)', description: 'Başarım madalyaları', icon: Trophy },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onSelectTab }) => {
  return (
    <aside className="w-full lg:w-80 vibe-panel rounded-3xl p-4 border border-slate-800/80 flex flex-col gap-2 shrink-0">
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800/60">
        <span className="text-[11px] font-extrabold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5 display-font">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Stat Jeneratörleri
        </span>
        <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-2 py-0.5 rounded-full border border-slate-800">
          {TABS.length} MODÜL
        </span>
      </div>

      <nav className="flex flex-col gap-1.5 mt-1">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all duration-300 group relative ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 via-sky-500/15 to-purple-500/10 text-white border border-cyan-500/40 shadow-lg shadow-cyan-950/50 font-semibold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60 border border-transparent hover:border-slate-800'
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className={`p-2.5 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-cyan-500/20 text-cyan-300 shadow-md shadow-cyan-500/20' 
                    : 'bg-slate-900/90 text-slate-400 group-hover:text-cyan-400 group-hover:bg-slate-800'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-xs font-bold truncate leading-tight display-font">
                    {tab.label}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate mt-0.5">
                    {tab.description}
                  </div>
                </div>
              </div>

              <ChevronRight className={`w-4 h-4 transition-all duration-300 ${
                isActive 
                  ? 'translate-x-0.5 text-cyan-400 opacity-100' 
                  : 'opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 text-slate-500'
              }`} />
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
