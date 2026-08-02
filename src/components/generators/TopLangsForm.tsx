import React from 'react';
import type { TopLangsConfig } from '../../types/stats';
import { ThemeSelector } from '../common/ThemeSelector';
import { Layout, User, Filter } from 'lucide-react';

interface TopLangsFormProps {
  config: TopLangsConfig;
  onChange: (newConfig: TopLangsConfig) => void;
}

export const TopLangsForm: React.FC<TopLangsFormProps> = ({ config, onChange }) => {
  const layouts = [
    { id: 'default', label: 'Varsayılan Liste', desc: 'Renkli dikey çubuklar' },
    { id: 'compact', label: 'Kompakt (Compact)', desc: 'Yatay tek satır dil çubuğu' },
    { id: 'donut', label: 'Donut Grafik', desc: 'Halka dairesel görünüm' },
    { id: 'pie', label: 'Pasta Grafik (Pie)', desc: 'Dairesel dilim görünümü' },
  ];

  return (
    <div className="space-y-6">
      {/* Username & Custom Title */}
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
          <label className="text-xs font-semibold text-slate-300 block mb-1">
            Özel Kart Başlığı
          </label>
          <input
            type="text"
            value={config.custom_title}
            onChange={(e) => onChange({ ...config, custom_title: e.target.value })}
            placeholder="En Çok Kullanılan Diller"
            className="w-full px-3 py-2 bg-slate-900 text-sm text-slate-200 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Layout selector */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
          <Layout className="w-3.5 h-3.5 text-cyan-400" />
          Grafik Düzen Modu (Layout)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {layouts.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => onChange({ ...config, layout: l.id as any })}
              className={`p-3 rounded-xl border text-left transition-all ${
                config.layout === l.id
                  ? 'bg-cyan-500/15 border-cyan-500 text-cyan-300 shadow-md ring-1 ring-cyan-500/30'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div className="text-xs font-bold mb-0.5">{l.label}</div>
              <div className="text-[10px] text-slate-500 leading-tight">{l.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Language Count & Hide Languages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">
            Gösterilecek Dil Sayısı: <span className="text-cyan-400 font-mono">{config.langs_count}</span>
          </label>
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={config.langs_count}
            onChange={(e) => onChange({ ...config, langs_count: parseInt(e.target.value) })}
            className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1 flex items-center gap-1">
            <Filter className="w-3 h-3 text-amber-400" />
            Gizlenecek Diller (virgülle ayırın)
          </label>
          <input
            type="text"
            value={config.hide.join(', ')}
            onChange={(e) =>
              onChange({
                ...config,
                hide: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
              })
            }
            placeholder="örn: html, css, jupyter notebook"
            className="w-full px-3 py-2 bg-slate-900 text-sm text-slate-200 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Switches */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <label className="flex items-center gap-2.5 p-2.5 bg-slate-900/60 rounded-xl border border-slate-800/80 cursor-pointer hover:bg-slate-900 transition-colors">
          <input
            type="checkbox"
            checked={config.hide_border}
            onChange={(e) => onChange({ ...config, hide_border: e.target.checked })}
            className="w-4 h-4 rounded text-cyan-500 bg-slate-950 border-slate-700 focus:ring-cyan-500"
          />
          <span className="text-xs text-slate-300 font-medium">Çerçeveyi Gizle</span>
        </label>

        <label className="flex items-center gap-2.5 p-2.5 bg-slate-900/60 rounded-xl border border-slate-800/80 cursor-pointer hover:bg-slate-900 transition-colors">
          <input
            type="checkbox"
            checked={config.hide_title}
            onChange={(e) => onChange({ ...config, hide_title: e.target.checked })}
            className="w-4 h-4 rounded text-cyan-500 bg-slate-950 border-slate-700 focus:ring-cyan-500"
          />
          <span className="text-xs text-slate-300 font-medium">Başlığı Gizle</span>
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
          border_color: config.border_color,
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
