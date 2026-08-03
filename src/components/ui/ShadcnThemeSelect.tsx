import React, { useState, useRef, useEffect } from 'react';
import { Palette, ChevronDown, Check, Search, Sparkles } from 'lucide-react';
import { THEMES } from '../../constants/themes';
import type { ThemeConfig } from '../../types/stats';

interface ShadcnThemeSelectProps {
  selectedThemeId: string;
  onSelectTheme: (themeId: string) => void;
}

export const ShadcnThemeSelect: React.FC<ShadcnThemeSelectProps> = ({
  selectedThemeId,
  onSelectTheme,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedTheme = THEMES.find((t) => t.id === selectedThemeId) || THEMES[0];
  const categories = ['All', 'Popular', 'Dark', 'Light', 'Vibrant', 'Retro'];

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredThemes = THEMES.filter((theme) => {
    const matchesSearch =
      theme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      theme.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || theme.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 px-3.5 py-2 rounded-xl border border-zinc-800 focus:outline-none focus:border-cyan-500/80 transition-all shadow-sm group"
      >
        <Palette className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-white">{selectedTheme.name}</span>
          
          {/* Theme Color Palette Preview Dots */}
          <div className="flex items-center gap-1 bg-zinc-950/80 px-1.5 py-0.5 rounded-full border border-zinc-800">
            <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: `#${selectedTheme.bg_color}` }} />
            <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: `#${selectedTheme.title_color}` }} />
            <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: `#${selectedTheme.text_color}` }} />
            <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: `#${selectedTheme.icon_color}` }} />
          </div>
        </div>

        <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-cyan-400' : ''}`} />
      </button>

      {/* Shadcn Floating Dropdown Popover */}
      {isOpen && (
        <div className="absolute right-0 sm:left-0 mt-2 w-80 sm:w-96 bg-zinc-950/95 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl z-50 p-3.5 animate-in fade-in zoom-in-95 duration-150 space-y-3">
          
          {/* Top Title & Search Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Tema Seçimi ({THEMES.length} Tema)
              </span>
              <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded-full border border-zinc-800">
                {filteredThemes.length} Sonuç
              </span>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tema ara (ör: Dracula, Tokyo, Light)..."
                className="w-full pl-9 pr-3 py-1.5 bg-zinc-900 text-xs text-zinc-100 placeholder-zinc-500 rounded-xl border border-zinc-800 focus:outline-none focus:border-cyan-500 font-sans"
                autoFocus
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar border-b border-zinc-800/80">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Themes List Scroll Area */}
          <div className="max-h-64 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
            {filteredThemes.length === 0 ? (
              <div className="py-6 text-center text-xs text-zinc-500">
                Tema bulunamadı.
              </div>
            ) : (
              filteredThemes.map((theme: ThemeConfig) => {
                const isSelected = theme.id === selectedThemeId;

                return (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => {
                      onSelectTheme(theme.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all ${
                      isSelected
                        ? 'bg-zinc-800/90 text-white border border-cyan-500/40 shadow-sm'
                        : 'hover:bg-zinc-900 text-zinc-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {/* Swatch Color Strip */}
                      <div className="flex items-center gap-1 p-1 rounded-lg border border-zinc-800" style={{ backgroundColor: `#${theme.bg_color}` }}>
                        <span className="w-3 h-3 rounded-full inline-block shadow-inner" style={{ backgroundColor: `#${theme.title_color}` }} title="Title Color" />
                        <span className="w-3 h-3 rounded-full inline-block shadow-inner" style={{ backgroundColor: `#${theme.text_color}` }} title="Text Color" />
                        <span className="w-3 h-3 rounded-full inline-block shadow-inner" style={{ backgroundColor: `#${theme.icon_color}` }} title="Icon Color" />
                      </div>

                      <div>
                        <span className="text-xs font-bold block leading-snug">{theme.name}</span>
                        <span className="text-[10px] text-zinc-400 font-mono">{theme.category}</span>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/40">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
