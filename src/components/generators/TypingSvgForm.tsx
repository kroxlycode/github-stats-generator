import React from 'react';
import type { TypingSvgConfig } from '../../types/stats';
import { FONT_FAMILY_OPTIONS } from '../../constants/themes';

interface TypingSvgFormProps {
  config: TypingSvgConfig;
  onChange: (newConfig: TypingSvgConfig) => void;
}

export const TypingSvgForm: React.FC<TypingSvgFormProps> = ({ config, onChange }) => {
  return (
    <div className="space-y-4 text-xs text-zinc-300">
      <div>
        <label className="block text-zinc-400 mb-1 font-medium">Typing Font:</label>
        <select
          value={config.font}
          onChange={(e) => onChange({ ...config, font: e.target.value })}
          className="w-full px-3 py-1.5 bg-zinc-950 rounded-lg border border-zinc-800 focus:outline-none"
        >
          {FONT_FAMILY_OPTIONS.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
