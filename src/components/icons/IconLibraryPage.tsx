import React, { useState } from 'react';
import { Search, Copy, Check, ExternalLink, Code, Layers, LayoutGrid, Tag, Image as ImageIcon, Sparkles, Plus, Trash2, Link as LinkIcon, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BADGE_LIBRARY, BADGE_CATEGORIES, getShieldUrl, getCombinedSkillIconsUrl, type BadgeItem } from '../../constants/badgeLibrary';
import { BadgeIconRenderer } from './BadgeIconRenderer';
import { TRANSLATIONS } from '../../constants/translations';
import type { LanguageCode } from '../../constants/translations';

interface IconLibraryPageProps {
  language: LanguageCode;
}

export const IconLibraryPage: React.FC<IconLibraryPageProps> = ({ language }) => {
  const t = TRANSLATIONS[language]?.iconLibrary || TRANSLATIONS.tr.iconLibrary;

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [badgeFormat, setBadgeFormat] = useState<'full' | 'icon-only' | 'skillicons' | 'devicon'>('skillicons');
  const [badgeStyle] = useState<string>('for-the-badge');
  const [copiedBadgeId, setCopiedBadgeId] = useState<string | null>(null);

  // Multi-SkillIcons Strip Generator State
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['react', 'ts', 'py', 'tailwind', 'nodejs', 'docker', 'postgres']);
  const [skillTheme, setSkillTheme] = useState<'dark' | 'light'>('dark');

  // Social Link Modal State
  const [activeSocialBadge, setActiveSocialBadge] = useState<BadgeItem | null>(null);
  const [socialUsername, setSocialUsername] = useState<string>('kroxlycode');

  const triggerConfetti = () => {
    confetti({
      particleCount: 35,
      spread: 45,
      origin: { y: 0.8 },
      colors: ['#38bdf8', '#818cf8', '#a855f7'],
    });
  };

  const handleCopy = (text: string, badgeId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBadgeId(badgeId);
    triggerConfetti();
    setTimeout(() => setCopiedBadgeId(null), 2000);
  };

  const toggleSkillInStrip = (skillKey: string) => {
    if (selectedSkills.includes(skillKey)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skillKey));
    } else {
      setSelectedSkills([...selectedSkills, skillKey]);
    }
  };

  const addSkillToStrip = (skillKey: string) => {
    if (!selectedSkills.includes(skillKey)) {
      setSelectedSkills([...selectedSkills, skillKey]);
    }
  };

  const combinedUrl = getCombinedSkillIconsUrl(selectedSkills, skillTheme);
  const combinedMarkdown = `[![My Skills](${combinedUrl})](https://skillicons.dev)`;
  const combinedHtml = `<a href="https://skillicons.dev"><img src="${combinedUrl}" alt="My Skills" /></a>`;

  const filteredBadges = BADGE_LIBRARY.filter((badge) => {
    const matchesCategory = selectedCategory === 'all' || badge.category === selectedCategory;
    const matchesSearch = badge.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
                          badge.category.toLowerCase().includes(searchQuery.toLowerCase().trim());
    return matchesCategory && matchesSearch;
  });

  // Modal computations for social link
  const socialPrefix = activeSocialBadge?.socialBaseUrl || 'https://instagram.com/';
  const fullSocialLink = `${socialPrefix}${socialUsername.trim() || 'kroxlycode'}`;
  const modalBadgeUrl = activeSocialBadge ? getShieldUrl(activeSocialBadge, badgeStyle, badgeFormat) : '';
  const modalMarkdown = activeSocialBadge ? `[![${activeSocialBadge.name}](${modalBadgeUrl})](${fullSocialLink})` : '';
  const modalHtml = activeSocialBadge ? `<a href="${fullSocialLink}"><img src="${modalBadgeUrl}" alt="${activeSocialBadge.name}" /></a>` : '';

  const activeSkillKey = activeSocialBadge ? (activeSocialBadge.skilliconKey || activeSocialBadge.id) : '';
  const isModalSkillInStrip = activeSkillKey ? selectedSkills.includes(activeSkillKey) : false;

  return (
    <div className="space-y-6 animate-fadeIn relative">
      {/* Multi-SkillIcons Combined Strip Generator Box */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" /> {t.stripTitle}
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              {t.stripSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400 font-medium">{t.formatLabel}</span>
            <button
              onClick={() => setSkillTheme('dark')}
              className={`px-3 py-1 text-xs rounded-lg font-medium transition-all ${
                skillTheme === 'dark' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-zinc-950 text-zinc-400'
              }`}
            >
              {t.stripThemeDark}
            </button>
            <button
              onClick={() => setSkillTheme('light')}
              className={`px-3 py-1 text-xs rounded-lg font-medium transition-all ${
                skillTheme === 'light' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'bg-zinc-950 text-zinc-400'
              }`}
            >
              {t.stripThemeLight}
            </button>

            <button
              onClick={() => setSelectedSkills([])}
              className="px-2.5 py-1 text-xs text-rose-400 hover:bg-rose-500/10 rounded-lg border border-rose-500/20 flex items-center gap-1 transition-all"
              title={t.stripClear}
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t.stripClear}</span>
            </button>
          </div>
        </div>

        {/* Combined Strip Live Preview */}
        <div className="flex flex-col items-center justify-center p-5 bg-zinc-950 rounded-xl border border-zinc-800 min-h-[90px] overflow-x-auto">
          {selectedSkills.length > 0 ? (
            <img src={combinedUrl} alt="SkillIcons Strip" className="max-w-full h-auto drop-shadow-md rounded" />
          ) : (
            <p className="text-xs text-zinc-500 italic">Select icons from the catalog below...</p>
          )}
        </div>

        {/* Copy Strip Code Actions */}
        {selectedSkills.length > 0 && (
          <div className="flex items-center justify-between gap-3 pt-2">
            <span className="text-xs text-zinc-400 font-mono">
              {t.stripSelectedCount} <strong className="text-cyan-300">{selectedSkills.length}</strong>
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(combinedMarkdown, 'strip-md')}
                className={`py-1.5 px-3 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-all ${
                  copiedBadgeId === 'strip-md'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-zinc-950 text-zinc-200 border-zinc-800 hover:bg-zinc-800'
                }`}
              >
                {copiedBadgeId === 'strip-md' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
                <span>{t.copyMarkdown}</span>
              </button>

              <button
                onClick={() => handleCopy(combinedHtml, 'strip-html')}
                className={`py-1.5 px-3 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-all ${
                  copiedBadgeId === 'strip-html'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-zinc-950 text-zinc-200 border-zinc-800 hover:bg-zinc-800'
                }`}
              >
                {copiedBadgeId === 'strip-html' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Code className="w-3.5 h-3.5 text-zinc-400" />}
                <span>{t.copyHtml}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Header Banner & Controls */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" /> {t.title}
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              {t.subtitle}
            </p>
          </div>

          {/* Format Mode Toggles */}
          <div className="flex items-center gap-1.5 bg-zinc-950 p-1.5 rounded-xl border border-zinc-800 self-start lg:self-auto flex-wrap">
            <span className="text-xs text-zinc-400 pl-2 font-medium">{t.formatLabel}</span>

            <button
              onClick={() => setBadgeFormat('skillicons')}
              className={`px-3 py-1.5 text-xs rounded-lg font-medium flex items-center gap-1.5 transition-all ${
                badgeFormat === 'skillicons'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.formats.skillicons}</span>
            </button>
            
            <button
              onClick={() => setBadgeFormat('full')}
              className={`px-3 py-1.5 text-xs rounded-lg font-medium flex items-center gap-1.5 transition-all ${
                badgeFormat === 'full'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Tag className="w-3.5 h-3.5" />
              <span>{t.formats.full}</span>
            </button>

            <button
              onClick={() => setBadgeFormat('icon-only')}
              className={`px-3 py-1.5 text-xs rounded-lg font-medium flex items-center gap-1.5 transition-all ${
                badgeFormat === 'icon-only'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>{t.formats.iconOnly}</span>
            </button>

            <button
              onClick={() => setBadgeFormat('devicon')}
              className={`px-3 py-1.5 text-xs rounded-lg font-medium flex items-center gap-1.5 transition-all ${
                badgeFormat === 'devicon'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>{t.formats.devicon}</span>
            </button>
          </div>
        </div>

        {/* Search Bar & Category Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Live Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 bg-zinc-950 text-sm text-zinc-100 placeholder-zinc-500 rounded-xl border border-zinc-800 focus:outline-none focus:border-cyan-500 font-mono transition-colors"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
            {BADGE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-2 text-xs rounded-xl font-medium whitespace-nowrap border transition-all flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/40'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-zinc-200'
                }`}
              >
                <span>{t.categories[cat.nameKey]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Badges Grid (1:1 Square vs Horizontal Layouts) */}
      <div className={`grid gap-4 ${
        badgeFormat === 'full' 
          ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
          : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'
      }`}>
        {filteredBadges.map((badge: BadgeItem) => {
          const url = getShieldUrl(badge, badgeStyle, badgeFormat);
          const markdown = `![${badge.name}](${url})`;
          const html = `<img src="${url}" alt="${badge.name}" ${badgeFormat !== 'full' ? 'width="48" height="48"' : ''} />`;
          const isCopied = copiedBadgeId === badge.id;
          
          const sKey = badge.skilliconKey || badge.id;
          const isSelectedInStrip = selectedSkills.includes(sKey);
          const isSocial = badge.category === 'social' || !!badge.socialBaseUrl;

          return (
            <div
              key={badge.id}
              className={`bg-zinc-900/60 border rounded-2xl p-4 flex flex-col justify-between gap-3.5 transition-all group ${
                isSelectedInStrip ? 'border-amber-500/60 ring-1 ring-amber-500/30' : 'border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {/* Badge Name & Action Trigger */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-200 truncate">
                  {badge.name}
                </span>

                {isSocial ? (
                  <button
                    onClick={() => {
                      setActiveSocialBadge(badge);
                      setSocialUsername('kroxlycode');
                    }}
                    className="px-2 py-0.5 rounded text-[10px] font-medium bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 flex items-center gap-1 transition-all"
                    title={t.addLinkBtn}
                  >
                    <LinkIcon className="w-2.5 h-2.5" />
                    <span>{t.addLinkBtn}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => toggleSkillInStrip(sKey)}
                    className={`px-1.5 py-0.5 rounded text-[9px] font-medium flex items-center gap-0.5 transition-all ${
                      isSelectedInStrip
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-zinc-950 text-zinc-400 border border-zinc-800 hover:text-white'
                    }`}
                    title="Add/Remove"
                  >
                    {isSelectedInStrip ? <Check className="w-2.5 h-2.5 text-amber-400" /> : <Plus className="w-2.5 h-2.5" />}
                    <span>{isSelectedInStrip ? 'Added' : 'Add'}</span>
                  </button>
                )}
              </div>

              {/* SkillIcons / Shield / 1:1 Vector Preview Stage */}
              <div className="flex items-center justify-center p-3 bg-zinc-950 rounded-xl border border-zinc-800/80 min-h-[75px]">
                {badgeFormat === 'skillicons' || badgeFormat === 'icon-only' ? (
                  <BadgeIconRenderer badge={badge} size={24} />
                ) : (
                  <img
                    src={url}
                    alt={badge.name}
                    className={`drop-shadow-sm transition-transform group-hover:scale-110 ${
                      badgeFormat === 'devicon' ? 'w-12 h-12 object-contain' : 'max-w-full h-auto'
                    }`}
                  />
                )}
              </div>

              {/* Quick Copy Buttons */}
              <div className="grid grid-cols-3 gap-1">
                <button
                  onClick={() => handleCopy(markdown, badge.id)}
                  className={`py-1.5 px-1 rounded-lg border text-[10px] font-medium flex items-center justify-center gap-1 transition-all ${
                    isCopied
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:bg-zinc-800'
                  }`}
                >
                  {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-zinc-400" />}
                  <span>MD</span>
                </button>

                <button
                  onClick={() => handleCopy(html, badge.id)}
                  className={`py-1.5 px-1 rounded-lg border text-[10px] font-medium flex items-center justify-center gap-1 transition-all ${
                    isCopied
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:bg-zinc-800'
                  }`}
                >
                  {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Code className="w-3 h-3 text-zinc-400" />}
                  <span>HTML</span>
                </button>

                <button
                  onClick={() => handleCopy(url, badge.id)}
                  className={`py-1.5 px-1 rounded-lg border text-[10px] font-medium flex items-center justify-center gap-1 transition-all ${
                    isCopied
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:bg-zinc-800'
                  }`}
                >
                  {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <ExternalLink className="w-3 h-3 text-zinc-400" />}
                  <span>URL</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Social Link Modal Dialog */}
      {activeSocialBadge && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl relative">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">
                  {activeSocialBadge.name} {t.modalTitle}
                </h3>
              </div>

              <button
                onClick={() => setActiveSocialBadge(null)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Shield Preview inside Modal */}
            <div className="flex items-center justify-center p-4 bg-zinc-950 rounded-xl border border-zinc-800/80">
              <img src={modalBadgeUrl} alt={activeSocialBadge.name} className="h-9 w-auto drop-shadow-md" />
            </div>

            {/* Input Form with Fixed Base URL Prefix */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-300 block">
                {t.usernameLabel}
              </label>

              <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden focus-within:border-cyan-500 transition-colors">
                {/* Fixed Base URL Prefix */}
                <span className="px-3 py-2.5 text-xs text-zinc-400 font-mono bg-zinc-900 border-r border-zinc-800 select-none whitespace-nowrap">
                  {socialPrefix}
                </span>

                {/* Username Input */}
                <input
                  type="text"
                  value={socialUsername}
                  onChange={(e) => setSocialUsername(e.target.value)}
                  placeholder={t.usernamePlaceholder}
                  className="w-full px-3 py-2.5 bg-transparent text-xs text-white placeholder-zinc-500 font-mono focus:outline-none"
                  autoFocus
                />
              </div>

              <p className="text-[11px] text-zinc-500 font-mono">
                {t.generatedLink} <span className="text-cyan-400">{fullSocialLink}</span>
              </p>
            </div>

            {/* Add to SkillIcons Strip Option in Modal */}
            <div className="pt-2 border-t border-zinc-800">
              <button
                onClick={() => {
                  if (activeSkillKey) {
                    addSkillToStrip(activeSkillKey);
                    triggerConfetti();
                  }
                }}
                className={`w-full py-2 px-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-all ${
                  isModalSkillInStrip
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                {isModalSkillInStrip ? <Check className="w-3.5 h-3.5 text-amber-400" /> : <Plus className="w-3.5 h-3.5 text-amber-400" />}
                <span>{isModalSkillInStrip ? t.addedToStripBtn : t.addToStripBtn}</span>
              </button>
            </div>

            {/* Copy Action Buttons in Modal */}
            <div className="space-y-2 pt-2 border-t border-zinc-800">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    handleCopy(modalMarkdown, 'modal-md');
                    setActiveSocialBadge(null);
                  }}
                  className="py-2 px-3 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{t.copyMarkdown}</span>
                </button>

                <button
                  onClick={() => {
                    handleCopy(modalHtml, 'modal-html');
                    setActiveSocialBadge(null);
                  }}
                  className="py-2 px-3 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40 hover:bg-purple-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>{t.copyHtml}</span>
                </button>
              </div>

              <div className="bg-zinc-950 p-2.5 rounded-lg border border-zinc-800/80 font-mono text-[10px] text-zinc-400 break-all select-all">
                {modalMarkdown}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
