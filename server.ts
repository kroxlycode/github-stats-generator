// Load .env file automatically (Node.js 20.12+ native — no dotenv needed)
try {
  process.loadEnvFile();
  console.log('[Server] .env dosyası yüklendi ✅');
} catch {
  // .env yoksa sessizce devam et (Vercel / prod env vars kullanır)
}

import express from 'express';
import cors from 'cors';
import { renderProfileStatsSvg } from './src/services/svgEngine/profileStatsSvg';
import { renderTopLangsSvg } from './src/services/svgEngine/topLangsSvg';
import { renderStreakStatsSvg } from './src/services/svgEngine/streakStatsSvg';
import { renderTypingSvg } from './src/services/svgEngine/typingSvg';
import { renderRepoStatsSvg } from './src/services/svgEngine/repoStatsSvg';
import { renderActivityGraphSvg } from './src/services/svgEngine/activityGraphSvg';
import { renderTrophiesSvg } from './src/services/svgEngine/trophiesSvg';
import { fetchGitHubUserDataServer } from './githubUserServiceServer'; // ← process.env version
import { fetchGitHubRepoDetails } from './src/services/githubService';
import type { LanguageCode } from './src/constants/translations';

export const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

// ─── Health ──────────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), token: !!process.env.GITHUB_TOKEN });
});

// ─── User JSON (for browser fetch) ───────────────────────────────────────────
app.get('/api/user-data', async (req, res) => {
  const username = (req.query.username as string) || 'kroxlycode';
  const userData = await fetchGitHubUserDataServer(username);
  res.setHeader('Cache-Control', 'public, max-age=600, s-maxage=1800');
  return res.json(userData);
});

// ─── Profile Stats SVG ───────────────────────────────────────────────────────
app.get('/api/stats', async (req, res) => {
  const username = (req.query.username as string) || 'kroxlycode';
  const theme    = (req.query.theme as string) || 'radical';
  const locale   = (req.query.locale as LanguageCode) || 'tr';
  const type     = req.query.type as string;

  const userData = await fetchGitHubUserDataServer(username);

  if (type === 'activity') {
    const svg = renderActivityGraphSvg({
      username, theme, locale,
      area: req.query.area !== 'false',
      custom_title: (req.query.custom_title as string) || '',
      hide_border: req.query.hide_border === 'true',
      radius: parseInt(req.query.border_radius as string, 10) || 8,
      userData,
    });
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=1800, s-maxage=3600');
    return res.send(svg);
  }

  if (type === 'trophies') {
    const svg = renderTrophiesSvg({
      username, theme, locale,
      column: parseInt(req.query.column as string, 10) || 6,
      row: 1,
      margin_w: 15,
      margin_h: 15,
      no_bg: req.query.no_bg === 'true',
      no_frame: req.query.no_frame === 'true',
      userData,
    });
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=1800, s-maxage=3600');
    return res.send(svg);
  }

  const svg = renderProfileStatsSvg({
    username, theme, locale,
    hide_border: req.query.hide_border === 'true',
    include_all_commits: req.query.include_all_commits !== 'false',
    show_icons: req.query.show_icons !== 'false',
    count_private: req.query.count_private !== 'false',
    custom_title: (req.query.custom_title as string) || '',
    disable_animations: req.query.disable_animations === 'true',
    hide: req.query.hide ? (req.query.hide as string).split(',') : [],
    rank_icon: (req.query.rank_icon as 'github' | 'percentile') || 'github',
    border_radius: parseInt(req.query.border_radius as string, 10) || 8,
    userData,
  });
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=1800, s-maxage=3600');
  return res.send(svg);
});

// ─── Top Languages SVG ────────────────────────────────────────────────────────
app.get('/api/top-langs', async (req, res) => {
  const username = (req.query.username as string) || 'kroxlycode';
  const theme    = (req.query.theme as string) || 'radical';
  const locale   = (req.query.locale as LanguageCode) || 'tr';

  const userData = await fetchGitHubUserDataServer(username);

  const svg = renderTopLangsSvg({
    username, theme, locale,
    layout: (req.query.layout as 'default' | 'compact' | 'donut') || 'default',
    hide_border: req.query.hide_border === 'true',
    hide_title: req.query.hide_title === 'true',
    langs_count: parseInt(req.query.langs_count as string, 10) || 6,
    hide: req.query.hide ? (req.query.hide as string).split(',') : [],
    custom_title: (req.query.custom_title as string) || '',
    border_radius: parseInt(req.query.border_radius as string, 10) || 8,
    userData,
  });
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=1800, s-maxage=3600');
  return res.send(svg);
});

// ─── Streak Stats SVG ─────────────────────────────────────────────────────────
app.get('/api/streak', async (req, res) => {
  const username = (req.query.username as string) || 'kroxlycode';
  const theme    = (req.query.theme as string) || 'radical';
  const locale   = (req.query.locale as LanguageCode) || 'tr';

  const userData = await fetchGitHubUserDataServer(username);

  const svg = renderStreakStatsSvg({
    username, theme, locale,
    hide_border: req.query.hide_border === 'true',
    border_radius: parseInt(req.query.border_radius as string, 10) || 8,
    background: (req.query.background as string) || '',
    border: (req.query.border as string) || '',
    stroke: (req.query.stroke as string) || '',
    ring: (req.query.ring as string) || '',
    fire: (req.query.fire as string) || '',
    currStreakNum: (req.query.currStreakNum as string) || '',
    sideNums: (req.query.sideNums as string) || '',
    currStreakLabel: (req.query.currStreakLabel as string) || '',
    sideLabels: (req.query.sideLabels as string) || '',
    dates: (req.query.dates as string) || '',
    type: 'svg',
    date_format: (req.query.date_format as string) || 'M j, Y',
    userData,
  });
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=1800, s-maxage=3600');
  return res.send(svg);
});

// ─── Typing SVG ───────────────────────────────────────────────────────────────
app.get('/api/typing-svg', (req, res) => {
  const linesParam = req.query.lines
    ? (Array.isArray(req.query.lines) ? (req.query.lines as string[]) : [(req.query.lines as string)].join(';').split(';'))
    : ['Merhaba, Profilime Hoş Geldiniz!'];
  const theme    = (req.query.theme as string) || 'radical';
  const locale   = (req.query.locale as LanguageCode) || 'tr';
  const gradient = (req.query.gradient as any) || 'cyan-purple';

  const svg = renderTypingSvg({
    lines: linesParam,
    font: (req.query.font as string) || 'Fira Code',
    weight: (req.query.weight as string) || '600',
    size: parseInt(req.query.size as string, 10) || 22,
    duration: parseInt(req.query.duration as string, 10) || 4000,
    pause: parseInt(req.query.pause as string, 10) || 1000,
    color: (req.query.color as string) || '',
    background: (req.query.background as string) || '00000000',
    center: req.query.center !== 'false',
    vCenter: req.query.vCenter !== 'false',
    width: parseInt(req.query.width as string, 10) || 550,
    height: parseInt(req.query.height as string, 10) || 60,
    loop: req.query.loop !== 'false',
    multiline: req.query.multiline === 'true',
    locale, theme, gradient,
    customGradStart: (req.query.grad_start as string) || '#ff007f',
    customGradEnd: (req.query.grad_end as string) || '#7928ca',
  });
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=1800, s-maxage=3600');
  return res.send(svg);
});

// ─── Repo Stats SVG ───────────────────────────────────────────────────────────
app.get('/api/repo', async (req, res) => {
  const username = (req.query.username as string) || 'kroxlycode';
  const repo     = (req.query.repo as string) || 'github-stats-generator';
  const theme    = (req.query.theme as string) || 'radical';
  const locale   = (req.query.locale as LanguageCode) || 'tr';

  const repoDetails = await fetchGitHubRepoDetails(username, repo);

  const svg = renderRepoStatsSvg({
    username, repo, theme, locale,
    hide_border: req.query.hide_border === 'true',
    show_owner: req.query.show_owner !== 'false',
    border_radius: parseInt(req.query.border_radius as string, 10) || 8,
    repoDetails,
  });
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=1800, s-maxage=3600');
  return res.send(svg);
});

// ─── Start (local dev only, not Vercel) ──────────────────────────────────────
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 GitStats API çalışıyor: http://localhost:${PORT}`);
    console.log(`🔑 GITHUB_TOKEN: ${process.env.GITHUB_TOKEN ? 'YÜKLENDİ ✅' : 'YOK ❌ (60 req/hr limit)'}`);
  });
}

export default app;
