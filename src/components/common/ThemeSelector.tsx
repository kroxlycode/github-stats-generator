import React, { useState } from 'react';
import { Palette, Check, SlidersHorizontal, Sparkles } from 'lucide-react';
import { THEMES } from '../../constants/themes';

interface ThemeSelectorProps {
  currentTheme: string;
  onSelectTheme: (themeId: string) => void;
  customColors?: {
    bg_color?: string;
    title_color?: string;
    text_color?: string;
    icon_color?: string;
    border_color?: string;
  };
  onCustomColorChange?: (key: string, value: string) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onSelectTheme,
  customColors = {},
  onCustomColorChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showCustom, setShowCustom] = useState<boolean>(currentTheme === 'custom');

  const categories = ['All', 'Popular', 'Dark', 'Vibrant', 'Light'];

  const filteredThemes = THEMES.filter((t) =>
    selectedCategory === 'All' ? true : t.category === selectedCategory
  );

  const handleThemeClick = (themeId: string) => {
    setShowCustom(themeId === 'custom');
    onSelectTheme(themeId);
  };

  return (
    <div className="space-y-4 pt-2 border-t border-slate-800/80">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-200 flex items-center gap-2 uppercase tracking-wider display-font">
          <Palette className="w-4 h-4 text-cyan-400" />
          Renk Teması ({THEMES.length}+ Presets)
        </label>
        <button
          type="button"
          onClick={() => handleThemeClick(currentTheme === 'custom' ? 'default' : 'custom')}
          className={`text-xs px-3 py-1.5 rounded-xl border transition-all duration-300 flex items-center gap-1.5 font-bold ${
            currentTheme === 'custom'
              ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border-cyan-500/50 shadow-md'
              : 'bg-slate-900/90 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Özel Hex Renkler
        </button>
      </div>

      {/* Category Pills */}
      {!showCustom && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-xs rounded-xl transition-all whitespace-nowrap font-medium ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-sm'
                  : 'bg-slate-950/60 text-slate-400 hover:bg-slate-900 hover:text-slate-300 border border-transparent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Preset Swatch Grid */}
      {!showCustom ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 max-h-60 overflow-y-auto pr-1">
          {filteredThemes.map((t) => {
            const isSelected = currentTheme === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => handleThemeClick(t.id)}
                className={`group relative p-2.5 rounded-2xl text-left border transition-all duration-300 ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-500/10 ring-1 ring-cyan-400/50 shadow-lg shadow-cyan-950/40'
                    : 'border-slate-800/80 bg-slate-950/70 hover:border-slate-700 hover:bg-slate-900/80'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-300 truncate group-hover:text-cyan-300 display-font">
                    {t.name}
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                </div>

                {/* Theme Color Dots */}
                <div 
                  className="h-6 rounded-xl flex items-center justify-around px-2 border transition-all"
                  style={{ 
                    backgroundColor: `#${t.bg_color}`, 
                    borderColor: t.border_color ? `#${t.border_color}` : '#30363d' 
                  }}
                >
                  <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: `#${t.title_color}` }}></span>
                  <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: `#${t.text_color}` }}></span>
                  <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: `#${t.icon_color}` }}></span>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        /* Custom Color Hex Pickers */
        <div className="p-4 bg-slate-950/90 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300 display-font">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Özel Hex Renk İnce Ayarları
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-slate-400 font-semibold block mb-1">Arka Plan (bg_color)</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={customColors.bg_color ? `#${customColors.bg_color}` : '#161b22'}
                  onChange={(e) => onCustomColorChange?.('bg_color', e.target.value.replace('#', ''))}
                  className="w-8 h-8 rounded-xl border border-slate-700 bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={customColors.bg_color || ''}
                  onChange={(e) => onCustomColorChange?.('bg_color', e.target.value)}
                  placeholder="161b22"
                  className="w-full px-2.5 py-1 bg-slate-900 text-xs font-mono text-cyan-300 rounded-xl border border-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-slate-400 font-semibold block mb-1">Başlık (title_color)</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={customColors.title_color ? `#${customColors.title_color}` : '#58a6ff'}
                  onChange={(e) => onCustomColorChange?.('title_color', e.target.value.replace('#', ''))}
                  className="w-8 h-8 rounded-xl border border-slate-700 bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={customColors.title_color || ''}
                  onChange={(e) => onCustomColorChange?.('title_color', e.target.value)}
                  placeholder="58a6ff"
                  className="w-full px-2.5 py-1 bg-slate-900 text-xs font-mono text-cyan-300 rounded-xl border border-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-slate-400 font-semibold block mb-1">Metin (text_color)</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={customColors.text_color ? `#${customColors.text_color}` : '#c9d1d9'}
                  onChange={(e) => onCustomColorChange?.('text_color', e.target.value.replace('#', ''))}
                  className="w-8 h-8 rounded-xl border border-slate-700 bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={customColors.text_color || ''}
                  onChange={(e) => onCustomColorChange?.('text_color', e.target.value)}
                  placeholder="c9d1d9"
                  className="w-full px-2.5 py-1 bg-slate-900 text-xs font-mono text-cyan-300 rounded-xl border border-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-slate-400 font-semibold block mb-1">İkon (icon_color)</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={customColors.icon_color ? `#${customColors.icon_color}` : '#58a6ff'}
                  onChange={(e) => onCustomColorChange?.('icon_color', e.target.value.replace('#', ''))}
                  className="w-8 h-8 rounded-xl border border-slate-700 bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={customColors.icon_color || ''}
                  onChange={(e) => onCustomColorChange?.('icon_color', e.target.value)}
                  placeholder="58a6ff"
                  className="w-full px-2.5 py-1 bg-slate-900 text-xs font-mono text-cyan-300 rounded-xl border border-slate-800"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
