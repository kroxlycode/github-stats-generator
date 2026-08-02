import React from 'react';
import type { StreakStatsConfig } from '../../types/stats';
import { ThemeSelector } from '../common/ThemeSelector';
import { User, Calendar } from 'lucide-react';

interface StreakStatsFormProps {
  config: StreakStatsConfig;
  onChange: (newConfig: StreakStatsConfig) => void;
}

export const StreakStatsForm: React.FC<StreakStatsFormProps> = ({ config, onChange }) => {
  return (
    <div className="space-y-6">
      {/* Username & Date Format */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">
            GitHub Kullanıcı Adı
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
          <label className="text-xs font-semibold text-slate-300 block mb-1 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            Tarih Biçimi (Date Format)
          </label>
          <select
            value={config.date_format}
            onChange={(e) => onChange({ ...config, date_format: e.target.value })}
            className="w-full px-3 py-2 bg-slate-900 text-sm text-slate-200 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500"
          >
            <option value="M j, Y">Oca 15, 2026 (M j, Y)</option>
            <option value="j M Y">15 Oca 2026 (j M Y)</option>
            <option value="Y-m-d">2026-01-15 (Y-m-d)</option>
            <option value="d/m/Y">15/01/2026 (d/m/Y)</option>
          </select>
        </div>
      </div>

      {/* Switches & Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <label className="flex items-center gap-2.5 p-2.5 bg-slate-900/60 rounded-xl border border-slate-800/80 cursor-pointer hover:bg-slate-900 transition-colors">
          <input
            type="checkbox"
            checked={config.hide_border}
            onChange={(e) => onChange({ ...config, hide_border: e.target.checked })}
            className="w-4 h-4 rounded text-cyan-500 bg-slate-950 border-slate-700 focus:ring-cyan-500"
          />
          <span className="text-xs text-slate-300 font-medium">Çerçeveyi Gizle (Hide Border)</span>
        </label>

        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">
            Çıktı Formatı
          </label>
          <select
            value={config.type}
            onChange={(e) => onChange({ ...config, type: e.target.value as any })}
            className="w-full px-3 py-1.5 bg-slate-900 text-xs text-slate-200 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500"
          >
            <option value="svg">Vektörel SVG (Önerilen)</option>
            <option value="png">PNG Görseli</option>
          </select>
        </div>
      </div>

      {/* Theme Selector */}
      <ThemeSelector
        currentTheme={config.theme}
        onSelectTheme={(theme) => onChange({ ...config, theme })}
        customColors={{
          bg_color: config.background,
          border_color: config.border,
          title_color: config.fire,
          text_color: config.currStreakNum,
        }}
        onCustomColorChange={(key, val) => {
          const map: Record<string, string> = {
            bg_color: 'background',
            border_color: 'border',
            title_color: 'fire',
            text_color: 'currStreakNum',
          };
          const targetKey = map[key] || key;
          onChange({
            ...config,
            theme: 'custom',
            [targetKey]: val,
          });
        }}
      />
    </div>
  );
};
