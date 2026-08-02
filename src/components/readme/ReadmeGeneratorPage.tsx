import React, { useState, useEffect } from 'react';
import { Copy, Check, Download, FileText, Layout, Eye, Code, User, Sparkles, FolderGit2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { THEMES } from '../../constants/themes';
import { TRANSLATIONS } from '../../constants/translations';
import type { LanguageCode } from '../../constants/translations';
import { fetchGitHubRepoDetails, type GitHubRepoDetails } from '../../services/githubService';

import {
  getProfileStatsDataUri,
  getTopLangsDataUri,
  getStreakStatsDataUri,
  getTypingSvgDataUri,
  getRepoStatsDataUri,
  getActivityGraphDataUri,
  getTrophiesDataUri,
  getBaseUrl,
} from '../../utils/urlGenerators';

interface ReadmeGeneratorPageProps {
  language: LanguageCode;
  username: string;
  theme: string;
}

export const ReadmeGeneratorPage: React.FC<ReadmeGeneratorPageProps> = ({
  language,
  username: defaultUsername,
  theme: defaultTheme,
}) => {
  const t = TRANSLATIONS[language]?.readmeGenerator || TRANSLATIONS.tr.readmeGenerator;

  const [username, setUsername] = useState<string>(defaultUsername || 'kroxlycode');
  const [selectedTheme, setSelectedTheme] = useState<string>(defaultTheme || 'radical');
  const [bioText, setBioText] = useState<string>('Full-Stack Software Engineer & Open Source Developer.');
  const [repoName, setRepoName] = useState<string>('github-stats-generator');
  const [repoDetails, setRepoDetails] = useState<GitHubRepoDetails | undefined>(undefined);

  // Socials
  const [linkedinUser, setLinkedinUser] = useState<string>('kroxlycode');
  const [twitterUser, setTwitterUser] = useState<string>('kroxlycode');
  const [instagramUser, setInstagramUser] = useState<string>('kroxlycode');

  // Included Cards Toggles
  const [incTyping, setIncTyping] = useState<boolean>(true);
  const [incProfileStats, setIncProfileStats] = useState<boolean>(true);
  const [incStreak, setIncStreak] = useState<boolean>(true);
  const [incTopLangs, setIncTopLangs] = useState<boolean>(true);
  const [incRepoStats, setIncRepoStats] = useState<boolean>(true);
  const [incActivity, setIncActivity] = useState<boolean>(true);
  const [incTrophies, setIncTrophies] = useState<boolean>(true);
  const [incSkills, setIncSkills] = useState<boolean>(true);

  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const cleanUser = username.trim() || 'kroxlycode';
  const cleanRepo = repoName.trim() || 'github-stats-generator';
  const apiHost = getBaseUrl();

  // Fetch live repo details for Pinned Repo card in README generator
  useEffect(() => {
    let isMounted = true;
    fetchGitHubRepoDetails(cleanUser, cleanRepo).then((data) => {
      if (isMounted) {
        setRepoDetails(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [cleanUser, cleanRepo]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#38bdf8', '#818cf8', '#a855f7'],
    });
  };

  // Safe Client-side Data URIs for 100% reliable Live Preview
  const previewProfileStats = getProfileStatsDataUri({
    username: cleanUser,
    theme: selectedTheme,
    locale: language,
    hide_border: false,
    include_all_commits: true,
    show_icons: true,
    count_private: true,
    custom_title: '',
    disable_animations: false,
    hide: [],
    rank_icon: 'github',
    border_radius: 8,
  });

  const previewTopLangs = getTopLangsDataUri({
    username: cleanUser,
    theme: selectedTheme,
    locale: language,
    layout: 'default',
    hide_border: false,
    hide_title: false,
    langs_count: 6,
    hide: [],
    custom_title: '',
    border_radius: 8,
  });

  const previewStreak = getStreakStatsDataUri({
    username: cleanUser,
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
    type: 'svg',
    date_format: 'M j, Y',
  });

  const previewTyping = getTypingSvgDataUri({
    lines: [`Merhaba, Ben ${cleanUser}!`],
    font: 'Fira Code',
    weight: '600',
    size: 22,
    duration: 4000,
    pause: 1000,
    color: '',
    background: '00000000',
    center: true,
    vCenter: true,
    width: 550,
    height: 60,
    loop: true,
    multiline: false,
    locale: language,
    theme: selectedTheme,
    gradient: 'cyan-purple',
  });

  const previewRepo = getRepoStatsDataUri({
    username: cleanUser,
    repo: cleanRepo,
    theme: selectedTheme,
    locale: language,
    hide_border: false,
    show_owner: true,
    border_radius: 8,
    repoDetails: repoDetails,
  });

  const previewActivity = getActivityGraphDataUri({
    username: cleanUser,
    theme: selectedTheme,
    locale: language,
    area: true,
    custom_title: '',
    hide_border: false,
    radius: 8,
  });

  const previewTrophies = getTrophiesDataUri({
    username: cleanUser,
    theme: selectedTheme,
    locale: language,
    column: 6,
    row: 1,
    margin_w: 15,
    margin_h: 15,
    no_bg: false,
    no_frame: false,
  });

  // Generate full markdown template code dynamically targeting current live domain
  const generatedMarkdown = `<div align="center">

${incTyping ? `<!-- Typing SVG Header -->
<a href="https://github.com/${cleanUser}">
  <img src="${apiHost}/typing-svg?theme=${selectedTheme}&lines=Merhaba+Ben+${cleanUser}!&center=true&width=600&height=60&color=38bdf8" alt="Header" />
</a>
` : ''}

# Hi there, I'm ${cleanUser} 👋

${bioText ? `> ${bioText}\n` : ''}

${(linkedinUser || twitterUser || instagramUser) ? `<!-- Social Badges -->
<p align="center">
${linkedinUser ? `<a href="https://linkedin.com/in/${linkedinUser}"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a> ` : ''}
${twitterUser ? `<a href="https://x.com/${twitterUser}"><img src="https://img.shields.io/badge/X-000000?style=for-the-badge&logo=x&logoColor=white" alt="Twitter" /></a> ` : ''}
${instagramUser ? `<a href="https://instagram.com/${instagramUser}"><img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram" /></a>` : ''}
</p>
<br/>
` : ''}

${incSkills ? `<!-- Skills Strip -->
<h3>🛠️ Languages and Tools</h3>
<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=react,ts,js,py,tailwind,nodejs,docker,postgres,vscode,git&theme=dark" alt="My Skills" />
  </a>
</p>
<br/>
` : ''}

${incTrophies ? `<!-- GitHub Trophies -->
<p align="center">
  <a href="https://github.com/${cleanUser}">
    <img src="${apiHost}/stats?username=${cleanUser}&type=trophies&theme=${selectedTheme}&column=6" alt="Trophies" />
  </a>
</p>
<br/>
` : ''}

${(incProfileStats || incTopLangs) ? `<!-- Stats & Top Languages -->
<p align="center">
${incProfileStats ? `<img src="${apiHost}/stats?username=${cleanUser}&theme=${selectedTheme}&locale=${language}" alt="GitHub Stats" /> ` : ''}
${incTopLangs ? `<img src="${apiHost}/top-langs?username=${cleanUser}&theme=${selectedTheme}&locale=${language}" alt="Top Languages" />` : ''}
</p>
<br/>
` : ''}

${incStreak ? `<!-- Streak Stats -->
<p align="center">
  <img src="${apiHost}/streak?username=${cleanUser}&theme=${selectedTheme}&locale=${language}" alt="GitHub Streak" />
</p>
<br/>
` : ''}

${incRepoStats ? `<!-- Pinned Repo -->
<p align="center">
  <img src="${apiHost}/repo?username=${cleanUser}&repo=${cleanRepo}&theme=${selectedTheme}" alt="Pinned Repo" />
</p>
<br/>
` : ''}

${incActivity ? `<!-- Activity Graph -->
<p align="center">
  <img src="${apiHost}/stats?username=${cleanUser}&type=activity&theme=${selectedTheme}&area=true" alt="Activity Graph" />
</p>
` : ''}

</div>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedMarkdown);
    setIsCopied(true);
    triggerConfetti();
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedMarkdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" /> {t.title}
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            {t.subtitle}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className={`py-2 px-4 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
              isCopied
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
                : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 hover:bg-cyan-500/30'
            }`}
          >
            {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
            <span>{isCopied ? 'Kopyalandı' : t.copyTemplate}</span>
          </button>

          <button
            onClick={handleDownload}
            className="py-2 px-4 rounded-xl bg-zinc-950 text-zinc-200 border border-zinc-800 hover:bg-zinc-800 text-xs font-semibold flex items-center gap-2 transition-all"
          >
            <Download className="w-4 h-4 text-zinc-400" />
            <span>{t.downloadFile}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Controls vs Live Preview/Code */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Settings Sidebar (4 cols) */}
        <div className="lg:col-span-4 bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 space-y-5 h-fit">
          
          {/* Section 1: Username & Theme */}
          <div className="space-y-3 pb-4 border-b border-zinc-800">
            <h3 className="text-xs font-bold text-white uppercase font-mono tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-cyan-400" /> {t.sections.personalInfo}
            </h3>

            <div>
              <label className="text-[11px] font-medium text-zinc-400 block mb-1">
                {t.labels.githubUsername}:
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="kullanici_adi"
                className="w-full px-3 py-1.5 bg-zinc-950 text-xs text-white rounded-lg border border-zinc-800 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-zinc-400 block mb-1">
                Tema:
              </label>
              <select
                value={selectedTheme}
                onChange={(e) => setSelectedTheme(e.target.value)}
                className="w-full px-3 py-1.5 bg-zinc-950 text-xs text-white rounded-lg border border-zinc-800 focus:outline-none focus:border-cyan-500 cursor-pointer font-sans"
              >
                {THEMES.map((th) => (
                  <option key={th.id} value={th.id}>
                    {th.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Section 2: Bio Text & Repo Name */}
          <div className="space-y-3 pb-4 border-b border-zinc-800">
            <h3 className="text-xs font-bold text-white uppercase font-mono tracking-wider flex items-center gap-1.5">
              <Layout className="w-3.5 h-3.5 text-purple-400" /> {t.sections.aboutMe}
            </h3>

            <div>
              <label className="text-[11px] font-medium text-zinc-400 block mb-1">
                {t.labels.bioText}:
              </label>
              <textarea
                value={bioText}
                onChange={(e) => setBioText(e.target.value)}
                rows={2}
                placeholder="Biyografi ekleyin..."
                className="w-full px-3 py-1.5 bg-zinc-950 text-xs text-white rounded-lg border border-zinc-800 focus:outline-none focus:border-purple-500 font-sans"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-zinc-400 block mb-1 flex items-center gap-1">
                <FolderGit2 className="w-3 h-3 text-amber-400" /> Öne Çıkarılan Depo Adı:
              </label>
              <input
                type="text"
                value={repoName}
                onChange={(e) => setRepoName(e.target.value)}
                placeholder="github-stats-generator"
                className="w-full px-3 py-1.5 bg-zinc-950 text-xs text-white rounded-lg border border-zinc-800 focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>
          </div>

          {/* Section 3: Social Links */}
          <div className="space-y-2.5 pb-4 border-b border-zinc-800">
            <h3 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
              {t.sections.socialLinks}
            </h3>

            <div className="space-y-2">
              <input
                type="text"
                value={linkedinUser}
                onChange={(e) => setLinkedinUser(e.target.value)}
                placeholder="LinkedIn kullanıcı adı..."
                className="w-full px-3 py-1.5 bg-zinc-950 text-xs text-white rounded-lg border border-zinc-800 focus:outline-none font-mono"
              />
              <input
                type="text"
                value={twitterUser}
                onChange={(e) => setTwitterUser(e.target.value)}
                placeholder="X (Twitter) kullanıcı adı..."
                className="w-full px-3 py-1.5 bg-zinc-950 text-xs text-white rounded-lg border border-zinc-800 focus:outline-none font-mono"
              />
              <input
                type="text"
                value={instagramUser}
                onChange={(e) => setInstagramUser(e.target.value)}
                placeholder="Instagram kullanıcı adı..."
                className="w-full px-3 py-1.5 bg-zinc-950 text-xs text-white rounded-lg border border-zinc-800 focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Section 4: Card Selection Toggles */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold text-white uppercase font-mono tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> {t.sections.statsSelection}
            </h3>

            <div className="space-y-2 text-xs">
              <label className="flex items-center gap-2.5 cursor-pointer text-zinc-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={incTyping}
                  onChange={(e) => setIncTyping(e.target.checked)}
                  className="rounded border-zinc-800 text-cyan-500 focus:ring-0 bg-zinc-950"
                />
                <span>{t.labels.includeTypingHeader}</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer text-zinc-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={incProfileStats}
                  onChange={(e) => setIncProfileStats(e.target.checked)}
                  className="rounded border-zinc-800 text-cyan-500 focus:ring-0 bg-zinc-950"
                />
                <span>{t.labels.includeStats}</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer text-zinc-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={incTopLangs}
                  onChange={(e) => setIncTopLangs(e.target.checked)}
                  className="rounded border-zinc-800 text-cyan-500 focus:ring-0 bg-zinc-950"
                />
                <span>{t.labels.includeTopLangs}</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer text-zinc-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={incStreak}
                  onChange={(e) => setIncStreak(e.target.checked)}
                  className="rounded border-zinc-800 text-cyan-500 focus:ring-0 bg-zinc-950"
                />
                <span>{t.labels.includeStreak}</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer text-zinc-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={incRepoStats}
                  onChange={(e) => setIncRepoStats(e.target.checked)}
                  className="rounded border-zinc-800 text-cyan-500 focus:ring-0 bg-zinc-950"
                />
                <span>Öne Çıkarılan Depo İstatistikleri</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer text-zinc-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={incActivity}
                  onChange={(e) => setIncActivity(e.target.checked)}
                  className="rounded border-zinc-800 text-cyan-500 focus:ring-0 bg-zinc-950"
                />
                <span>{t.labels.includeActivity}</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer text-zinc-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={incTrophies}
                  onChange={(e) => setIncTrophies(e.target.checked)}
                  className="rounded border-zinc-800 text-cyan-500 focus:ring-0 bg-zinc-950"
                />
                <span>{t.labels.includeTrophies}</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer text-zinc-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={incSkills}
                  onChange={(e) => setIncSkills(e.target.checked)}
                  className="rounded border-zinc-800 text-cyan-500 focus:ring-0 bg-zinc-950"
                />
                <span>{t.labels.includeSkills}</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Stage Box (8 cols): Preview vs Code */}
        <div className="lg:col-span-8 bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
          
          {/* Header Tabs */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all ${
                  activeTab === 'preview'
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t.previewTab}</span>
              </button>

              <button
                onClick={() => setActiveTab('code')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${
                  activeTab === 'code'
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Code className="w-3.5 h-3.5 text-purple-400" />
                <span>{t.codeTab}</span>
              </button>
            </div>

            <span className="text-[11px] font-mono text-zinc-500">README.md</span>
          </div>

          {/* Tab Content Stage */}
          {activeTab === 'code' ? (
            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 font-mono text-xs text-zinc-300 min-h-[420px] overflow-auto select-all leading-relaxed whitespace-pre-wrap">
              {generatedMarkdown}
            </div>
          ) : (
            <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800 min-h-[420px] overflow-y-auto space-y-6 text-center">
              {/* Typing Header Preview */}
              {incTyping && (
                <div className="flex justify-center">
                  <img
                    src={previewTyping}
                    alt="Header"
                    className="max-w-full h-auto drop-shadow-md"
                  />
                </div>
              )}

              {/* Title & Bio */}
              <div className="space-y-1">
                <h1 className="text-xl font-bold text-white">Hi there, I'm {cleanUser} 👋</h1>
                {bioText && <p className="text-xs text-zinc-400 italic font-mono">&gt; {bioText}</p>}
              </div>

              {/* Social Badges Preview */}
              {(linkedinUser || twitterUser || instagramUser) && (
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  {linkedinUser && <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />}
                  {twitterUser && <img src="https://img.shields.io/badge/X-000000?style=for-the-badge&logo=x&logoColor=white" alt="Twitter" />}
                  {instagramUser && <img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram" />}
                </div>
              )}

              {/* Skills Strip Preview */}
              {incSkills && (
                <div className="space-y-2 pt-2 border-t border-zinc-800/60">
                  <h3 className="text-xs font-semibold text-zinc-300">Languages and Tools</h3>
                  <div className="flex justify-center">
                    <img src="https://skillicons.dev/icons?i=react,ts,js,py,tailwind,nodejs,docker,postgres,vscode,git&theme=dark" alt="Skills" className="max-w-full h-auto" />
                  </div>
                </div>
              )}

              {/* Trophies Preview */}
              {incTrophies && (
                <div className="flex justify-center pt-2">
                  <img src={previewTrophies} alt="Trophies" className="max-w-full h-auto" />
                </div>
              )}

              {/* Stats & Languages Preview */}
              {(incProfileStats || incTopLangs) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center pt-2">
                  {incProfileStats && <img src={previewProfileStats} alt="Profile Stats" className="max-w-full h-auto" />}
                  {incTopLangs && <img src={previewTopLangs} alt="Top Languages" className="max-w-full h-auto" />}
                </div>
              )}

              {/* Streak Preview */}
              {incStreak && (
                <div className="flex justify-center pt-2">
                  <img src={previewStreak} alt="Streak Stats" className="max-w-full h-auto" />
                </div>
              )}

              {/* Pinned Repo Preview */}
              {incRepoStats && (
                <div className="flex justify-center pt-2">
                  <img src={previewRepo} alt="Pinned Repo" className="max-w-full h-auto" />
                </div>
              )}

              {/* Activity Preview */}
              {incActivity && (
                <div className="flex justify-center pt-2">
                  <img src={previewActivity} alt="Activity Graph" className="max-w-full h-auto" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
