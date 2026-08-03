import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { LANGUAGES } from '../../constants/translations';
import type { LanguageCode } from '../../constants/translations';

interface ShadcnLanguageSelectProps {
  selectedLanguage: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
}

export const ShadcnLanguageSelect: React.FC<ShadcnLanguageSelectProps> = ({
  selectedLanguage,
  onSelectLanguage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLangItem = LANGUAGES.find((l) => l.code === selectedLanguage) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-zinc-950 hover:bg-zinc-900 text-zinc-200 px-3 py-1.5 rounded-xl border border-zinc-800 focus:outline-none focus:border-zinc-500 transition-all text-xs font-semibold cursor-pointer"
      >
        <Globe className="w-3.5 h-3.5 text-zinc-400" />
        <span>{selectedLangItem.flag} {selectedLangItem.name}</span>
        <ChevronDown className={`w-3 h-3 text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-white' : ''}`} />
      </button>

      {/* Floating Dropdown Popover */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-zinc-950/95 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl z-50 p-1.5 animate-in fade-in zoom-in-95 duration-150 space-y-1">
          {LANGUAGES.map((lang) => {
            const isSelected = lang.code === selectedLanguage;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  onSelectLanguage(lang.code as LanguageCode);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all ${
                  isSelected
                    ? 'bg-zinc-800 text-white font-bold'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </span>
                {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
