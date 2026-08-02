import React from 'react';
import type { ActivityGraphConfig, TrophiesConfig } from '../../types/stats';
import { ThemeSelector } from '../common/ThemeSelector';
import { User } from 'lucide-react';

interface ExtraStatsFormProps {
  type: 'activity' | 'trophies';
  activityConfig?: ActivityGraphConfig;
  onActivityChange?: (config: ActivityGraphConfig) => void;
  trophiesConfig?: TrophiesConfig;
  onTrophiesChange?: (config: TrophiesConfig) => void;
}

export const ExtraStatsForm: React.FC<ExtraStatsFormProps> = ({
  type,
  activityConfig,
  onActivityChange,
  trophiesConfig,
  onTrophiesChange,
}) => {
  if (type === 'activity' && activityConfig && onActivityChange) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              GitHub Kullanıcı Adı
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={activityConfig.username}
                onChange={(e) => onActivityChange({ ...activityConfig, username: e.target.value })}
                placeholder="kroxlycode"
                className="w-full pl-9 pr-3 py-2 bg-slate-900 text-sm text-slate-200 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Özel Başlık
            </label>
            <input
              type="text"
              value={activityConfig.custom_title}
              onChange={(e) => onActivityChange({ ...activityConfig, custom_title: e.target.value })}
              placeholder="Aktivite Grafiği"
              className="w-full px-3 py-2 bg-slate-900 text-sm text-slate-200 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <label className="flex items-center gap-2.5 p-2.5 bg-slate-900/60 rounded-xl border border-slate-800/80 cursor-pointer hover:bg-slate-900 transition-colors">
            <input
              type="checkbox"
              checked={activityConfig.area}
              onChange={(e) => onActivityChange({ ...activityConfig, area: e.target.checked })}
              className="w-4 h-4 rounded text-cyan-500 bg-slate-950 border-slate-700 focus:ring-cyan-500"
            />
            <span className="text-xs text-slate-300 font-medium">Alan Doldurma Efekti (Area Fill)</span>
          </label>

          <label className="flex items-center gap-2.5 p-2.5 bg-slate-900/60 rounded-xl border border-slate-800/80 cursor-pointer hover:bg-slate-900 transition-colors">
            <input
              type="checkbox"
              checked={activityConfig.hide_border}
              onChange={(e) => onActivityChange({ ...activityConfig, hide_border: e.target.checked })}
              className="w-4 h-4 rounded text-cyan-500 bg-slate-950 border-slate-700 focus:ring-cyan-500"
            />
            <span className="text-xs text-slate-300 font-medium">Çerçeveyi Gizle</span>
          </label>
        </div>

        <ThemeSelector
          currentTheme={activityConfig.theme}
          onSelectTheme={(theme) => onActivityChange({ ...activityConfig, theme })}
        />
      </div>
    );
  }

  if (type === 'trophies' && trophiesConfig && onTrophiesChange) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              GitHub Kullanıcı Adı
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={trophiesConfig.username}
                onChange={(e) => onTrophiesChange({ ...trophiesConfig, username: e.target.value })}
                placeholder="kroxlycode"
                className="w-full pl-9 pr-3 py-2 bg-slate-900 text-sm text-slate-200 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Sütun Sayısı (Columns): <span className="text-cyan-400 font-mono">{trophiesConfig.column}</span>
            </label>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={trophiesConfig.column}
              onChange={(e) => onTrophiesChange({ ...trophiesConfig, column: parseInt(e.target.value) })}
              className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <label className="flex items-center gap-2.5 p-2.5 bg-slate-900/60 rounded-xl border border-slate-800/80 cursor-pointer hover:bg-slate-900 transition-colors">
            <input
              type="checkbox"
              checked={trophiesConfig.no_bg}
              onChange={(e) => onTrophiesChange({ ...trophiesConfig, no_bg: e.target.checked })}
              className="w-4 h-4 rounded text-cyan-500 bg-slate-950 border-slate-700 focus:ring-cyan-500"
            />
            <span className="text-xs text-slate-300 font-medium">Şeffaf Arka Plan (No BG)</span>
          </label>

          <label className="flex items-center gap-2.5 p-2.5 bg-slate-900/60 rounded-xl border border-slate-800/80 cursor-pointer hover:bg-slate-900 transition-colors">
            <input
              type="checkbox"
              checked={trophiesConfig.no_frame}
              onChange={(e) => onTrophiesChange({ ...trophiesConfig, no_frame: e.target.checked })}
              className="w-4 h-4 rounded text-cyan-500 bg-slate-950 border-slate-700 focus:ring-cyan-500"
            />
            <span className="text-xs text-slate-300 font-medium">Dış Çerçeveyi Gizle</span>
          </label>
        </div>

        <ThemeSelector
          currentTheme={trophiesConfig.theme}
          onSelectTheme={(theme) => onTrophiesChange({ ...trophiesConfig, theme })}
        />
      </div>
    );
  }

  return null;
};
