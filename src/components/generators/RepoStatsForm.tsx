import React from 'react';
import type { RepoStatsConfig } from '../../types/stats';
import { ThemeSelector } from '../common/ThemeSelector';
import { User, FolderGit2 } from 'lucide-react';

interface RepoStatsFormProps {
  config: RepoStatsConfig;
  onChange: (newConfig: RepoStatsConfig) => void;
}

export const RepoStatsForm: React.FC<RepoStatsFormProps> = ({ config, onChange }) => {
  return (
    <div className="space-y-6">
      {/* Owner & Repo Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">
            GitHub Kullanıcı Adı (Owner)
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={config.username}
              onChange={(e) => onChange({ ...config, username: e.target.value })}
              placeholder="kroxlycode"
              className="w-full pl-9 pr-3 py-2 bg-slate-900 text-sm text-slate-200 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">
            Depo (Repository) Adı
          </label>
          <div className="relative">
            <FolderGit2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={config.repo}
              onChange={(e) => onChange({ ...config, repo: e.target.value })}
              placeholder="Hello-World"
              className="w-full pl-9 pr-3 py-2 bg-slate-900 text-sm text-slate-200 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>
      </div>

      {/* Switches */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <label className="flex items-center gap-2.5 p-2.5 bg-slate-900/60 rounded-xl border border-slate-800/80 cursor-pointer hover:bg-slate-900 transition-colors">
          <input
            type="checkbox"
            checked={config.show_owner}
            onChange={(e) => onChange({ ...config, show_owner: e.target.checked })}
            className="w-4 h-4 rounded text-cyan-500 bg-slate-950 border-slate-700 focus:ring-cyan-500"
          />
          <span className="text-xs text-slate-300 font-medium">Sahip Adını Başlıkta Göster</span>
        </label>

        <label className="flex items-center gap-2.5 p-2.5 bg-slate-900/60 rounded-xl border border-slate-800/80 cursor-pointer hover:bg-slate-900 transition-colors">
          <input
            type="checkbox"
            checked={config.hide_border}
            onChange={(e) => onChange({ ...config, hide_border: e.target.checked })}
            className="w-4 h-4 rounded text-cyan-500 bg-slate-950 border-slate-700 focus:ring-cyan-500"
          />
          <span className="text-xs text-slate-300 font-medium">Çerçeveyi Gizle</span>
        </label>
      </div>

      {/* Theme Selector */}
      <ThemeSelector
        currentTheme={config.theme}
        onSelectTheme={(theme) => onChange({ ...config, theme })}
        customColors={{
          bg_color: config.bg_color,
          title_color: config.title_color,
          text_color: config.text_color,
          icon_color: config.icon_color,
        }}
        onCustomColorChange={(key, val) =>
          onChange({
            ...config,
            theme: 'custom',
            [key]: val,
          })
        }
      />
    </div>
  );
};
