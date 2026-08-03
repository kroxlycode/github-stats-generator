import React, { useState, useEffect } from 'react';
import { Search, Palette, Globe, Type, Sparkles, Pipette, FolderGit2, BarChart3, Shield, FileText } from 'lucide-react';
import { StatCardItem } from './components/cards/StatCardItem';
import { IconLibraryPage } from './components/icons/IconLibraryPage';
import { ReadmeGeneratorPage } from './components/readme/ReadmeGeneratorPage';
import { THEMES } from './constants/themes';
import { LANGUAGES, TRANSLATIONS } from './constants/translations';
import type { LanguageCode } from './constants/translations';
import { fetchGitHubRepoDetails, type GitHubRepoDetails } from './services/githubService';
import { fetchGitHubUserData, type GitHubUserData } from './services/githubUserService';

import { 
  getProfileStatsUrl, 
  getProfileStatsDataUri,
  getTopLangsUrl, 
  getTopLangsDataUri,
  getStreakStatsUrl, 
  getStreakStatsDataUri,
  getTypingSvgUrl, 
  getTypingSvgDataUri,
  getRepoStatsUrl,
  getRepoStatsDataUri,
  getActivityGraphUrl,
  getActivityGraphDataUri,
  getTrophiesUrl,
  getTrophiesDataUri
} from './utils/urlGenerators';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'stats' | 'icons' | 'readme'>('stats');
  const [username, setUsername] = useState<string>('kroxlycode');
  const [selectedTheme, setSelectedTheme] = useState<string>('radical');
  const [language, setLanguage] = useState<LanguageCode>('tr');

  // Dedicated Typing SVG Custom Input, Color & Gradient State
  const [typingText, setTypingText] = useState<string>('Merhaba, GitHub Profilime Hoş Geldiniz!');
  const [typingGradient, setTypingGradient] = useState<'none' | 'cyan-purple' | 'gold-pink' | 'emerald-cyan' | 'custom'>('cyan-purple');
  const [customTypingColor, setCustomTypingColor] = useState<string>('#38bdf8');
  
  // Custom Gradient Start & End colors
  const [customGradStart, setCustomGradStart] = useState<string>('#ff007f');
  const [customGradEnd, setCustomGradEnd] = useState<string>('#7928ca');

  // Dedicated Custom Pinned Repo Name Input State & Live GitHub Details
  const [repoName, setRepoName] = useState<string>('github-stats-generator');
  const [repoDetails, setRepoDetails] = useState<GitHubRepoDetails | undefined>(undefined);

  const [debouncedUsername, setDebouncedUsername] = useState<string>(username);
  const [debouncedRepoName, setDebouncedRepoName] = useState<string>(repoName);

  // Debounce username input by 500ms to avoid spamming API calls on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedUsername(username), 500);
    return () => clearTimeout(timer);
  }, [username]);

  // Debounce repoName input by 500ms
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedRepoName(repoName), 500);
    return () => clearTimeout(timer);
  }, [repoName]);

  const cleanUsername = debouncedUsername.trim() || 'kroxlycode';
  const cleanRepoName = debouncedRepoName.trim() || 'github-stats-generator';
  const t = TRANSLATIONS[language] || TRANSLATIONS.tr;

  const [userData, setUserData] = useState<GitHubUserData | undefined>(undefined);

  // Fetch live GitHub repo details & user data only after debounced values settle
  useEffect(() => {
    let isMounted = true;
    if (cleanUsername.length >= 2) {
      fetchGitHubRepoDetails(cleanUsername, cleanRepoName).then((data) => {
        if (isMounted) {
          setRepoDetails(data);
        }
      });
      fetchGitHubUserData(cleanUsername).then((data) => {
        if (isMounted) {
          setUserData(data);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [cleanUsername, cleanRepoName]);

  // Card Configurations based on active username, theme, locale & fetched repoDetails / userData
  const profileConfig = {
    username: cleanUsername,
    theme: selectedTheme,
    locale: language,
    hide_border: false,
    include_all_commits: true,
    show_icons: true,
    count_private: true,
    custom_title: '',
    disable_animations: false,
    hide: [],
    rank_icon: 'github' as const,
    border_radius: 8,
    userData,
  };

  const topLangsConfig = {
    username: cleanUsername,
    theme: selectedTheme,
    locale: language,
    layout: 'default' as const,
    hide_border: false,
    hide_title: false,
    langs_count: 6,
    hide: [],
    custom_title: '',
    border_radius: 8,
    userData,
  };

  const streakConfig = {
    username: cleanUsername,
    theme: selectedTheme,
    locale: language,
    hide_border: false,
    border_radius: 8,
    background: '',
    border: '',
    stroke: '',
    ring: '',
    fire: '',
    currStreakNum: '',
    sideNums: '',
    currStreakLabel: '',
    sideLabels: '',
    dates: '',
    type: 'svg' as const,
    date_format: 'M j, Y',
    userData,
  };

  const typingConfig = {
    lines: [typingText.trim() || `Merhaba, Ben ${cleanUsername}!`],
    font: 'Fira Code',
    weight: '600',
    size: 22,
    duration: 4000,
    pause: 1000,
    color: typingGradient === 'none' ? customTypingColor.replace('#', '') : '',
    background: '00000000',
    center: true,
    vCenter: true,
    width: 550,
    height: 60,
    loop: true,
    multiline: false,
    locale: language,
    theme: selectedTheme,
    gradient: typingGradient,
    customGradStart: customGradStart,
    customGradEnd: customGradEnd,
  };

  const repoConfig = {
    username: cleanUsername,
    repo: cleanRepoName,
    theme: selectedTheme,
    locale: language,
    hide_border: false,
    show_owner: true,
    border_radius: 8,
    repoDetails: repoDetails,
  };

  const activityConfig = {
    username: cleanUsername,
    theme: selectedTheme,
    locale: language,
    area: true,
    custom_title: '',
    hide_border: false,
    radius: 8,
    userData,
  };

  const trophiesConfig = {
    username: cleanUsername,
    theme: selectedTheme,
    locale: language,
    column: 6,
    row: 1,
    margin_w: 15,
    margin_h: 15,
    no_bg: false,
    no_frame: false,
    userData,
  };

  // Cards List for simultaneous Grid view with translated titles & Data URIs
  const cards = [
    {
      id: 'profile-stats',
      title: t.cardTitles.profileStats,
      imageUrl: getProfileStatsUrl(profileConfig),
      dataUri: getProfileStatsDataUri(profileConfig),
      altText: `${cleanUsername} GitHub Stats`,
      linkUrl: `https://github.com/${cleanUsername}`,
    },
    {
      id: 'top-langs',
      title: t.cardTitles.topLangs,
      imageUrl: getTopLangsUrl(topLangsConfig),
      dataUri: getTopLangsDataUri(topLangsConfig),
      altText: `${cleanUsername} Top Languages`,
      linkUrl: `https://github.com/${cleanUsername}`,
    },
    {
      id: 'streak-stats',
      title: t.cardTitles.streakStats,
      imageUrl: getStreakStatsUrl(streakConfig),
      dataUri: getStreakStatsDataUri(streakConfig),
      altText: `${cleanUsername} GitHub Streak`,
      linkUrl: `https://github.com/${cleanUsername}`,
    },
    {
      id: 'typing-svg',
      title: t.cardTitles.typingSvg,
      imageUrl: getTypingSvgUrl(typingConfig),
      dataUri: getTypingSvgDataUri(typingConfig),
      altText: 'Typing SVG Animation',
      isTyping: true,
    },
    {
      id: 'repo-stats',
      title: t.cardTitles.repoStats,
      imageUrl: getRepoStatsUrl(repoConfig),
      dataUri: getRepoStatsDataUri(repoConfig),
      altText: `${cleanUsername}/${cleanRepoName} Stats`,
      linkUrl: `https://github.com/${cleanUsername}/${cleanRepoName}`,
      isRepo: true,
    },
    {
      id: 'activity-graph',
      title: t.cardTitles.activityGraph,
      imageUrl: getActivityGraphUrl(activityConfig),
      dataUri: getActivityGraphDataUri(activityConfig),
      altText: `${cleanUsername} Activity Graph`,
      linkUrl: `https://github.com/${cleanUsername}`,
    },
    {
      id: 'trophies',
      title: t.cardTitles.trophies,
      imageUrl: getTrophiesUrl(trophiesConfig),
      dataUri: getTrophiesDataUri(trophiesConfig),
      altText: `${cleanUsername} Trophies`,
      linkUrl: `https://github.com/${cleanUsername}`,
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      {/* Header Navigation */}
      <header className="border-b border-zinc-800 bg-zinc-900/60 sticky top-0 z-50 backdrop-blur-md px-6 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo & Navigation Tabs */}
          <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-start flex-wrap">
            <div className="flex items-center gap-2.5">
              <svg className="w-6 h-6 fill-current text-zinc-200" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <h1 className="text-base font-bold tracking-tight text-white hidden sm:block">
                {t.appTitle}
              </h1>
            </div>

            {/* Nav Tabs Switcher */}
            <nav className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800 flex-wrap">
              <button
                onClick={() => setActiveTab('stats')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${
                  activeTab === 'stats'
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t.navStats}</span>
              </button>

              <button
                onClick={() => setActiveTab('icons')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${
                  activeTab === 'icons'
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Shield className="w-3.5 h-3.5 text-purple-400" />
                <span>{t.navIcons}</span>
              </button>

              <button
                onClick={() => setActiveTab('readme')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${
                  activeTab === 'readme'
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.navReadme}</span>
              </button>
            </nav>
          </div>

          {/* Language Selector */}
          <div className="relative flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-zinc-400 hidden sm:inline" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as LanguageCode)}
              className="px-2.5 py-1.5 bg-zinc-950 text-xs text-zinc-200 rounded-xl border border-zinc-800 focus:outline-none focus:border-zinc-500 cursor-pointer font-sans"
              title={t.languageLabel}
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* Main View: Grid vs Icon Library vs Readme Generator */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {activeTab === 'readme' ? (
          <ReadmeGeneratorPage language={language} username={cleanUsername} theme={selectedTheme} />
        ) : activeTab === 'icons' ? (
          <IconLibraryPage language={language} />
        ) : (
          <div className="space-y-6">
            
            {/* Dedicated Top Controls Banner for Username & Theme */}
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                {/* Username Input */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={t.usernamePlaceholder}
                    className="w-full pl-10 pr-4 py-2 bg-zinc-950 text-sm text-zinc-100 placeholder-zinc-500 rounded-xl border border-zinc-800 focus:outline-none focus:border-cyan-500 font-mono transition-colors"
                  />
                </div>

                {/* Theme Selector */}
                <div className="flex items-center gap-2 bg-zinc-950 px-3.5 py-2 rounded-xl border border-zinc-800 self-start sm:self-auto">
                  <Palette className="w-4 h-4 text-zinc-400" />
                  <span className="text-xs text-zinc-400 font-medium">{t.themeLabel}:</span>
                  <select
                    value={selectedTheme}
                    onChange={(e) => setSelectedTheme(e.target.value)}
                    className="bg-transparent text-xs text-zinc-200 focus:outline-none cursor-pointer font-sans"
                  >
                    {THEMES.map((th) => (
                      <option key={th.id} value={th.id} className="bg-zinc-900 text-white">
                        {th.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Subtitle & User Info Line directly below input controls */}
              <div className="flex items-center justify-between pt-3 border-t border-zinc-800/80">
                <div>
                  <h2 className="text-sm font-semibold text-white">
                    <span className="text-zinc-400 font-normal">{t.userLabel}</span> @{cleanUsername}
                  </h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {t.subtitle}
                  </p>
                </div>

                <span className="text-xs font-mono bg-zinc-950 text-zinc-400 px-3 py-1 rounded-lg border border-zinc-800 whitespace-nowrap">
                  {cards.length} {t.activeCardsLabel}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cards.map((card) => (
                <StatCardItem
                  key={card.id}
                  title={card.title}
                  imageUrl={card.imageUrl}
                  dataUri={card.dataUri}
                  altText={card.altText}
                  linkUrl={card.linkUrl}
                  labels={{
                    downloadSvg: t.downloadSvg,
                    copied: t.copied,
                    copyMarkdown: t.copyMarkdown,
                    copyHtml: t.copyHtml,
                    copyUrl: t.copyUrl,
                  }}
                >
                  {/* Typing SVG Controls */}
                  {card.isTyping && (
                    <div className="space-y-2.5">
                      <div>
                        <label className="text-[11px] font-medium text-zinc-400 block mb-1 flex items-center gap-1">
                          <Type className="w-3 h-3 text-cyan-400" /> Typing Metni Düzenle:
                        </label>
                        <input
                          type="text"
                          value={typingText}
                          onChange={(e) => setTypingText(e.target.value)}
                          placeholder="Metin yazın..."
                          className="w-full px-3 py-1.5 bg-zinc-900 text-xs text-zinc-100 rounded-lg border border-zinc-800 focus:outline-none focus:border-cyan-500 font-mono"
                        />
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Düz Renk */}
                        <div className="flex items-center gap-1.5 bg-zinc-900 px-2 py-1 rounded-lg border border-zinc-800">
                          <Pipette className="w-3 h-3 text-zinc-400" />
                          <span className="text-[10px] text-zinc-400 font-medium">Düz Renk:</span>
                          <input
                            type="color"
                            value={customTypingColor}
                            onChange={(e) => {
                              setCustomTypingColor(e.target.value);
                              setTypingGradient('none');
                            }}
                            className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent"
                          />
                        </div>

                        {/* Özel Gradient (2 Renk) */}
                        <div className="flex items-center gap-1.5 bg-zinc-900 px-2 py-1 rounded-lg border border-zinc-800">
                          <Sparkles className="w-3 h-3 text-purple-400" />
                          <span className="text-[10px] text-zinc-400 font-medium">Özel Gradient:</span>
                          <input
                            type="color"
                            value={customGradStart}
                            onChange={(e) => {
                              setCustomGradStart(e.target.value);
                              setTypingGradient('custom');
                            }}
                            className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent"
                            title="Başlangıç Rengi"
                          />
                          <span className="text-[10px] text-zinc-600">➔</span>
                          <input
                            type="color"
                            value={customGradEnd}
                            onChange={(e) => {
                              setCustomGradEnd(e.target.value);
                              setTypingGradient('custom');
                            }}
                            className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent"
                            title="Bitiş Rengi"
                          />
                          <button
                            type="button"
                            onClick={() => setTypingGradient('custom')}
                            className={`px-1.5 py-0.5 text-[9px] rounded font-mono ${
                              typingGradient === 'custom' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'text-zinc-500 hover:text-zinc-300'
                            }`}
                          >
                            Uygula
                          </button>
                        </div>

                        {/* Preset Gradients */}
                        <div className="flex items-center gap-1 overflow-x-auto pt-0.5 no-scrollbar">
                          <button
                            type="button"
                            onClick={() => setTypingGradient('cyan-purple')}
                            className={`px-2 py-0.5 text-[10px] rounded-md border font-medium whitespace-nowrap transition-all ${
                              typingGradient === 'cyan-purple'
                                ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border-cyan-500/50'
                                : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-zinc-200'
                            }`}
                          >
                            Cyan ➔ Purple
                          </button>

                          <button
                            type="button"
                            onClick={() => setTypingGradient('gold-pink')}
                            className={`px-2 py-0.5 text-[10px] rounded-md border font-medium whitespace-nowrap transition-all ${
                              typingGradient === 'gold-pink'
                                ? 'bg-gradient-to-r from-amber-500/20 to-pink-500/20 text-amber-300 border-amber-500/50'
                                : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-zinc-200'
                            }`}
                          >
                            Gold ➔ Pink
                          </button>

                          <button
                            type="button"
                            onClick={() => setTypingGradient('emerald-cyan')}
                            className={`px-2 py-0.5 text-[10px] rounded-md border font-medium whitespace-nowrap transition-all ${
                              typingGradient === 'emerald-cyan'
                                ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 border-emerald-500/50'
                                : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-zinc-200'
                            }`}
                          >
                            Emerald ➔ Cyan
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Pinned Repo Custom Input Controls */}
                  {card.isRepo && (
                    <div>
                      <label className="text-[11px] font-medium text-zinc-400 block mb-1 flex items-center gap-1">
                        <FolderGit2 className="w-3 h-3 text-amber-400" /> Öne Çıkarılan Depo (Repo) Adı:
                      </label>
                      <input
                        type="text"
                        value={repoName}
                        onChange={(e) => setRepoName(e.target.value)}
                        placeholder="Repository adını girin (ör: github-stats-generator)..."
                        className="w-full px-3 py-1.5 bg-zinc-900 text-xs text-zinc-100 rounded-lg border border-zinc-800 focus:outline-none focus:border-amber-500 font-mono"
                      />
                      {repoDetails && (
                        <div className="mt-1.5 flex items-center gap-3 text-[10px] text-zinc-400">
                          <span>⭐ <strong className="text-zinc-200">{repoDetails.stars}</strong> stars</span>
                          <span>🍴 <strong className="text-zinc-200">{repoDetails.forks}</strong> forks</span>
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: repoDetails.languageColor }} />
                            <strong className="text-zinc-200">{repoDetails.language}</strong>
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </StatCardItem>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer with GitHub link on Left & SkillIcons credit on Right */}
      <footer className="border-t border-zinc-800 py-6 text-xs text-zinc-500">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left: GitHub Icon & Dev by kroxly */}
          <a
            href="https://github.com/kroxlycode"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-zinc-400 hover:text-cyan-400 font-mono font-semibold transition-colors group"
          >
            <svg className="w-4 h-4 fill-current text-zinc-400 group-hover:text-cyan-400 transition-colors" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>Dev by kroxly</span>
          </a>

          {/* Right: Powered by SkillIcons credit in English */}
          <a
            href="https://skillicons.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-purple-400 font-mono transition-colors flex items-center gap-1.5"
          >
            <span>Powered by SkillIcons.dev</span>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;
