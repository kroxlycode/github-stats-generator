import React, { useState } from 'react';
import { Copy, Check, Download, ExternalLink, Code } from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatMarkdownImage, formatHtmlImage } from '../../utils/urlGenerators';

interface StatCardItemProps {
  title: string;
  imageUrl: string;
  dataUri?: string;
  altText: string;
  linkUrl?: string;
  labels: {
    downloadSvg: string;
    copied: string;
    copyMarkdown: string;
    copyHtml: string;
    copyUrl: string;
  };
  children?: React.ReactNode;
}

export const StatCardItem: React.FC<StatCardItemProps> = ({
  title,
  imageUrl,
  dataUri,
  altText,
  linkUrl,
  labels,
  children,
}) => {
  const [copiedType, setCopiedType] = useState<'md' | 'html' | 'url' | null>(null);

  const previewSource = dataUri || imageUrl;

  const markdownSnippet = formatMarkdownImage(altText, imageUrl, linkUrl);
  const htmlSnippet = formatHtmlImage(altText, imageUrl, linkUrl);

  const triggerConfetti = () => {
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#38bdf8', '#818cf8', '#a855f7']
    });
  };

  const handleCopy = (text: string, type: 'md' | 'html' | 'url') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    triggerConfetti();
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleDownload = async () => {
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

  // Only render controls container if children has actual non-boolean elements
  const hasControls = React.Children.toArray(children).filter(Boolean).length > 0;

  return (
    <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between gap-4 hover:border-zinc-700 transition-colors">
      {/* Header title & Download SVG */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
        <h3 className="text-sm font-semibold text-zinc-200">
          {title}
        </h3>

        <button
          onClick={handleDownload}
          className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center gap-1 transition-colors"
          title={labels.downloadSvg}
        >
          <Download className="w-3.5 h-3.5" />
          <span>{labels.downloadSvg}</span>
        </button>
      </div>

      {/* Rendered ONLY if the card has active input controls (Typing SVG & Pinned Repo) */}
      {hasControls && (
        <div className="bg-zinc-950/70 p-3 rounded-xl border border-zinc-800 space-y-2">
          {children}
        </div>
      )}

      {/* SVG Image Preview Stage */}
      <div className="flex items-center justify-center p-4 bg-zinc-950/80 rounded-xl border border-zinc-800/50 min-h-[160px] overflow-hidden">
        <img
          src={previewSource}
          alt={altText}
          className="max-w-full h-auto drop-shadow-md rounded"
        />
      </div>

      {/* Copy Actions */}
      <div className="space-y-2.5">
        <div className="grid grid-cols-3 gap-2">
          {/* Markdown */}
          <button
            onClick={() => handleCopy(markdownSnippet, 'md')}
            className={`py-2 px-3 rounded-lg border text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
              copiedType === 'md'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:bg-zinc-800 hover:text-white'
            }`}
          >
            {copiedType === 'md' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
            <span>{copiedType === 'md' ? labels.copied : labels.copyMarkdown}</span>
          </button>

          {/* HTML */}
          <button
            onClick={() => handleCopy(htmlSnippet, 'html')}
            className={`py-2 px-3 rounded-lg border text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
              copiedType === 'html'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:bg-zinc-800 hover:text-white'
            }`}
          >
            {copiedType === 'html' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Code className="w-3.5 h-3.5 text-zinc-400" />}
            <span>{copiedType === 'html' ? labels.copied : labels.copyHtml}</span>
          </button>

          {/* Direct URL */}
          <button
            onClick={() => handleCopy(imageUrl, 'url')}
            className={`py-2 px-3 rounded-lg border text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
              copiedType === 'url'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:bg-zinc-800 hover:text-white'
            }`}
          >
            {copiedType === 'url' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />}
            <span>{copiedType === 'url' ? labels.copied : labels.copyUrl}</span>
          </button>
        </div>

        {/* Code Snippet Box */}
        <div className="bg-zinc-950 p-2.5 rounded-lg border border-zinc-800/80 font-mono text-[11px] text-zinc-400 break-all select-all">
          {markdownSnippet}
        </div>
      </div>
    </div>
  );
};
