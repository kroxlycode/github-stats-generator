import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Download, 
  ExternalLink, 
  RefreshCw, 
  Code,
  Terminal
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatMarkdownImage, formatHtmlImage } from '../../utils/urlGenerators';

interface PreviewCanvasProps {
  cardTitle: string;
  imageUrl: string;
  dataUri?: string;
  altText: string;
  linkUrl?: string;
}

export const PreviewCanvas: React.FC<PreviewCanvasProps> = ({
  cardTitle,
  imageUrl,
  dataUri,
  altText,
  linkUrl,
}) => {
  const [copiedType, setCopiedType] = useState<'md' | 'html' | 'url' | null>(null);
  const [key, setKey] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(100);

  const previewSource = dataUri || imageUrl;

  const markdownSnippet = formatMarkdownImage(altText, imageUrl, linkUrl);
  const htmlSnippet = formatHtmlImage(altText, imageUrl, linkUrl);

  const triggerConfetti = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#38bdf8', '#818cf8', '#c084fc', '#f472b6']
    });
  };

  const handleCopy = (text: string, type: 'md' | 'html' | 'url') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    triggerConfetti();
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleRefresh = () => {
    setKey((prev) => prev + 1);
  };

  const handleDownloadSvg = async () => {
    try {
      const response = await fetch(previewSource);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${altText.toLowerCase().replace(/\s+/g, '-')}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch {
      window.open(imageUrl, '_blank');
    }
  };

  return (
    <div className="flex-1 vibe-panel rounded-3xl p-6 border border-slate-800 flex flex-col justify-between gap-6 min-h-[540px] relative overflow-hidden">
      {/* Top bar: Title & controls */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <span className="w-3 h-3 rounded-full bg-cyan-400 animate-ping absolute"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 relative"></span>
          </div>
          <h2 className="text-sm font-extrabold text-slate-100 uppercase tracking-wider display-font flex items-center gap-2">
            {cardTitle}
            <span className="text-[10px] font-mono font-normal text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
              STÜDYO STAGE
            </span>
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="flex items-center bg-slate-950/80 rounded-xl border border-slate-800 p-1 font-mono">
            <button
              onClick={() => setZoom(Math.max(60, zoom - 10))}
              className="w-7 h-7 flex items-center justify-center text-xs font-bold text-slate-400 hover:text-cyan-400 hover:bg-slate-900 rounded-lg transition-colors"
              title="Küçült"
            >
              -
            </button>

            <span className="text-[11px] font-bold text-slate-300 px-2 min-w-[45px] text-center">{zoom}%</span>

            <button
              onClick={() => setZoom(Math.min(150, zoom + 10))}
              className="w-7 h-7 flex items-center justify-center text-xs font-bold text-slate-400 hover:text-cyan-400 hover:bg-slate-900 rounded-lg transition-colors"
              title="Büyüt"
            >
              +
            </button>
          </div>

          <button
            onClick={handleRefresh}
            className="p-2 text-slate-400 hover:text-cyan-400 bg-slate-950/80 hover:bg-slate-900 rounded-xl border border-slate-800 transition-colors"
            title="Önizlemeyi Yenile"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Canvas View */}
      <div className="flex-1 flex items-center justify-center p-8 bg-slate-950/80 rounded-2xl border border-slate-800/80 overflow-hidden relative group">
        {/* Cyber Grid background */}
        <div className="absolute inset-0 vibe-bg-pattern opacity-40 pointer-events-none" />

        <div 
          className="transition-all duration-300 flex items-center justify-center max-w-full drop-shadow-[0_15px_35px_rgba(0,0,0,0.7)]"
          style={{ transform: `scale(${zoom / 100})` }}
        >
          <img
            key={key}
            src={previewSource}
            alt={altText}
            className="max-w-full h-auto rounded-xl border border-white/10"
          />
        </div>
      </div>

      {/* Code Snippets & Cyber Action Buttons */}
      <div className="space-y-4 pt-2">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Copy Markdown */}
          <button
            onClick={() => handleCopy(markdownSnippet, 'md')}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border text-xs font-bold transition-all duration-300 ${
              copiedType === 'md'
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/25'
                : 'bg-gradient-to-r from-cyan-500/20 via-sky-500/15 to-blue-500/20 text-cyan-300 border-cyan-500/40 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20'
            }`}
          >
            {copiedType === 'md' ? (
              <>
                <Check className="w-4 h-4" />
                <span>Markdown Kopyalandı!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-cyan-400" />
                <span>Markdown Kopyala</span>
              </>
            )}
          </button>

          {/* Copy HTML */}
          <button
            onClick={() => handleCopy(htmlSnippet, 'html')}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border text-xs font-bold transition-all duration-300 ${
              copiedType === 'html'
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/25'
                : 'bg-gradient-to-r from-purple-500/20 via-indigo-500/15 to-violet-500/20 text-purple-300 border-purple-500/40 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/20'
            }`}
          >
            {copiedType === 'html' ? (
              <>
                <Check className="w-4 h-4" />
                <span>HTML Kopyalandı!</span>
              </>
            ) : (
              <>
                <Code className="w-4 h-4 text-purple-400" />
                <span>HTML Kopyala</span>
              </>
            )}
          </button>

          {/* Copy Direct URL */}
          <button
            onClick={() => handleCopy(imageUrl, 'url')}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border text-xs font-bold transition-all duration-300 ${
              copiedType === 'url'
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/25'
                : 'bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-yellow-500/20 text-amber-300 border-amber-500/40 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/20'
            }`}
          >
            {copiedType === 'url' ? (
              <>
                <Check className="w-4 h-4" />
                <span>Yerel API URL Kopyalandı!</span>
              </>
            ) : (
              <>
                <ExternalLink className="w-4 h-4 text-amber-400" />
                <span>Yerel API URL Kopyala</span>
              </>
            )}
          </button>
        </div>

        {/* Code Box */}
        <div className="relative bg-slate-950/90 rounded-2xl p-4 border border-slate-800 font-mono">
          <div className="text-[10px] uppercase font-bold text-slate-400 mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <Terminal className="w-3.5 h-3.5" /> Markdown Kodu (Yerel API)
            </span>
            <button 
              onClick={handleDownloadSvg} 
              className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1 text-[11px] font-semibold lowercase"
            >
              <Download className="w-3.5 h-3.5" /> svg indir
            </button>
          </div>
          <code className="text-xs text-cyan-300 break-all selection:bg-cyan-500 selection:text-black">
            {markdownSnippet}
          </code>
        </div>
      </div>
    </div>
  );
};
