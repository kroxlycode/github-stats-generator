import React from 'react';
import type { ProfileStatsConfig } from '../../types/stats';
import { ThemeSelector } from '../common/ThemeSelector';
import { Sliders, EyeOff, User } from 'lucide-react';

interface ProfileStatsFormProps {
  config: ProfileStatsConfig;
  onChange: (newConfig: ProfileStatsConfig) => void;
}

export const ProfileStatsForm: React.FC<ProfileStatsFormProps> = ({ config, onChange }) => {
  const handleToggleHideItem = (item: string) => {
    const isCurrentlyHidden = config.hide.includes(item);
    const newHide = isCurrentlyHidden
      ? config.hide.filter((h) => h !== item)
      : [...config.hide, item];
    onChange({ ...config, hide: newHide });
  };

  const statItems = [
    { id: 'stars', label: 'Yıldızlar (Stars)' },
    { id: 'commits', label: 'Commit Sayısı' },
    { id: 'prs', label: "Pull Request'ler" },
    { id: 'issues', label: 'Sorunlar (Issues)' },
    { id: 'contribs', label: 'Katkıda Bulunulanlar' },
  ];

  return (
    <div className="space-y-6">
      {/* Username & Title */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-200 block mb-1.5 display-font">
            GitHub Kullanıcı Adı
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-cyan-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={config.username}
              onChange={(e) => onChange({ ...config, username: e.target.value })}
              placeholder="kroxlycode"
              className="w-full pl-10 pr-3.5 py-2.5 bg-slate-950 text-sm text-slate-100 rounded-2xl border border-slate-800 focus:outline-none focus:border-cyan-400 font-mono transition-all"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-200 block mb-1.5 display-font">
            Özel Kart Başlığı
          </label>
          <input
            type="text"
            value={config.custom_title}
            onChange={(e) => onChange({ ...config, custom_title: e.target.value })}
            placeholder="örn: Benim GitHub İstatistiklerim"
            className="w-full px-3.5 py-2.5 bg-slate-950 text-sm text-slate-100 rounded-2xl border border-slate-800 focus:outline-none focus:border-cyan-400 transition-all"
          />
        </div>
      </div>

      {/* Options & Switches */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-slate-200 flex items-center gap-2 uppercase tracking-wider display-font">
          <Sliders className="w-4 h-4 text-cyan-400" />
          İçerik ve Görünüm Seçenekleri
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="flex items-center gap-3 p-3 bg-slate-950/70 rounded-2xl border border-slate-800/80 cursor-pointer hover:bg-slate-900 transition-colors">
            <input
              type="checkbox"
              checked={config.show_icons}
              onChange={(e) => onChange({ ...config, show_icons: e.target.checked })}
              className="w-4 h-4 rounded-md text-cyan-500 bg-slate-900 border-slate-700 focus:ring-cyan-500"
            />
            <span className="text-xs text-slate-200 font-semibold">Stat İkonlarını Göster</span>
          </label>

          <label className="flex items-center gap-3 p-3 bg-slate-950/70 rounded-2xl border border-slate-800/80 cursor-pointer hover:bg-slate-900 transition-colors">
            <input
              type="checkbox"
              checked={config.include_all_commits}
              onChange={(e) => onChange({ ...config, include_all_commits: e.target.checked })}
              className="w-4 h-4 rounded-md text-cyan-500 bg-slate-900 border-slate-700 focus:ring-cyan-500"
            />
            <span className="text-xs text-slate-200 font-semibold">Tüm Yılların Commit'lerini Say</span>
          </label>

          <label className="flex items-center gap-3 p-3 bg-slate-950/70 rounded-2xl border border-slate-800/80 cursor-pointer hover:bg-slate-900 transition-colors">
            <input
              type="checkbox"
              checked={config.count_private}
              onChange={(e) => onChange({ ...config, count_private: e.target.checked })}
              className="w-4 h-4 rounded-md text-cyan-500 bg-slate-900 border-slate-700 focus:ring-cyan-500"
            />
            <span className="text-xs text-slate-200 font-semibold">Gizli (Private) Commit'ler</span>
          </label>

          <label className="flex items-center gap-3 p-3 bg-slate-950/70 rounded-2xl border border-slate-800/80 cursor-pointer hover:bg-slate-900 transition-colors">
            <input
              type="checkbox"
              checked={config.hide_border}
              onChange={(e) => onChange({ ...config, hide_border: e.target.checked })}
              className="w-4 h-4 rounded-md text-cyan-500 bg-slate-900 border-slate-700 focus:ring-cyan-500"
            />
            <span className="text-xs text-slate-200 font-semibold">Çerçeveyi Gizle</span>
          </label>
        </div>
      </div>

      {/* Rank Icon & Radius */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-200 block mb-1.5 display-font">
            Sıralama (Rank) İkon Stili
          </label>
          <select
            value={config.rank_icon}
            onChange={(e) => onChange({ ...config, rank_icon: e.target.value as any })}
            className="w-full px-3.5 py-2.5 bg-slate-950 text-sm text-slate-100 rounded-2xl border border-slate-800 focus:outline-none focus:border-cyan-400"
          >
            <option value="default">Varsayılan Daire (Default)</option>
            <option value="github">GitHub Logosu</option>
            <option value="percentile">Yüzdelik Rozet (Percentile)</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-200 block mb-1.5 display-font">
            Köşe Yuvarlaklığı: <span className="text-cyan-400 font-mono">{config.border_radius}px</span>
          </label>
          <input
            type="range"
            min="0"
            max="25"
            step="0.5"
            value={config.border_radius}
            onChange={(e) => onChange({ ...config, border_radius: parseFloat(e.target.value) })}
            className="w-full accent-cyan-400 bg-slate-900 h-2 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* Hide Specific Stats */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold text-slate-200 flex items-center gap-2 uppercase tracking-wider display-font">
          <EyeOff className="w-4 h-4 text-amber-400" />
          Gizlenecek Stat Öğeleri
        </label>
        <div className="flex flex-wrap gap-2">
          {statItems.map((item) => {
            const isHidden = config.hide.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleToggleHideItem(item.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  isHidden
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 line-through'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Integrated Theme Selector */}
      <ThemeSelector
        currentTheme={config.theme}
        onSelectTheme={(theme) => onChange({ ...config, theme })}
        customColors={{
          bg_color: config.bg_color,
          title_color: config.title_color,
          text_color: config.text_color,
          icon_color: config.icon_color,
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
