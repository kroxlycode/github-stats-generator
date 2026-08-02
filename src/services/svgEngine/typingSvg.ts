import type { TypingSvgConfig } from '../../types/stats';
import { THEMES } from '../../constants/themes';

export const renderTypingSvg = (config: TypingSvgConfig): string => {
  const width = config.width || 550;
  const height = config.height || 60;
  
  const selectedTheme = THEMES.find((t) => t.id === config.theme) || THEMES[0];
  
  let textColor = `#${selectedTheme.title_color}`;
  if (config.color) {
    textColor = config.color.startsWith('#') ? config.color : `#${config.color}`;
  }

  const font = config.font || 'Fira Code';
  const fontSize = config.size || 22;

  const lines = config.lines.filter((l) => l.trim().length > 0);
  const textContent = lines.length > 0 ? lines[0] : 'Merhaba, I am a Developer!';

  const gradientMode = config.gradient || 'none';

  let fillAttr = textColor;
  let defsSvg = '';

  if (gradientMode === 'cyan-purple') {
    defsSvg = `<defs>
      <linearGradient id="typingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#38bdf8" />
        <stop offset="100%" stop-color="#a855f7" />
      </linearGradient>
    </defs>`;
    fillAttr = 'url(#typingGrad)';
  } else if (gradientMode === 'gold-pink') {
    defsSvg = `<defs>
      <linearGradient id="typingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#f59e0b" />
        <stop offset="100%" stop-color="#ec4899" />
      </linearGradient>
    </defs>`;
    fillAttr = 'url(#typingGrad)';
  } else if (gradientMode === 'emerald-cyan') {
    defsSvg = `<defs>
      <linearGradient id="typingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#10b981" />
        <stop offset="100%" stop-color="#06b6d4" />
      </linearGradient>
    </defs>`;
    fillAttr = 'url(#typingGrad)';
  } else if (gradientMode === 'custom') {
    const cStart = config.customGradStart ? (config.customGradStart.startsWith('#') ? config.customGradStart : `#${config.customGradStart}`) : '#ff007f';
    const cEnd = config.customGradEnd ? (config.customGradEnd.startsWith('#') ? config.customGradEnd : `#${config.customGradEnd}`) : '#7928ca';
    defsSvg = `<defs>
      <linearGradient id="typingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${cStart}" />
        <stop offset="100%" stop-color="${cEnd}" />
      </linearGradient>
    </defs>`;
    fillAttr = 'url(#typingGrad)';
  }

  const charCount = Math.max(textContent.length, 1);
  const textWidth = charCount * (fontSize * 0.62);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  ${defsSvg}
  <style>
    @import url('https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}:wght@600&amp;display=swap');

    .typing-container {
      font-family: '${font}', monospace, sans-serif;
      font-size: ${fontSize}px;
      font-weight: 600;
    }

    .typing-text {
      fill: ${fillAttr};
      dominant-baseline: middle;
    }

    .clip-rect {
      animation: typewriter 4s steps(${charCount}) infinite;
    }

    .cursor-line {
      stroke: ${textColor};
      stroke-width: 3;
      animation: blink 0.7s infinite, cursorMove 4s steps(${charCount}) infinite;
    }

    @keyframes typewriter {
      0% { width: 0px; }
      40% { width: ${textWidth + 5}px; }
      65% { width: ${textWidth + 5}px; }
      90% { width: 0px; }
      100% { width: 0px; }
    }

    @keyframes cursorMove {
      0% { transform: translateX(0px); }
      40% { transform: translateX(${textWidth + 5}px); }
      65% { transform: translateX(${textWidth + 5}px); }
      90% { transform: translateX(0px); }
      100% { transform: translateX(0px); }
    }

    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
  </style>

  <g transform="translate(${config.center ? Math.max(10, (width - textWidth) / 2) : 20}, ${height / 2})">
    <g class="typing-container">
      <clipPath id="clip">
        <rect class="clip-rect" x="0" y="-${height/2}" width="0" height="${height}" />
      </clipPath>
      
      <text class="typing-text" clip-path="url(#clip)" x="0" y="2">${escapeHtml(textContent)}</text>
      <line class="cursor-line" x1="0" y1="-${fontSize/1.5}" x2="0" y2="${fontSize/1.5}" />
    </g>
  </g>
</svg>`;
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
