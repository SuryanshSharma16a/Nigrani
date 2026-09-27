// File: src/components/common/ProgressBar.jsx
import React from 'react';
import { COLOR_TOKENS } from '../../config/constants';

export function ProgressBar({
  value = 0,
  max = 100,
  color = COLOR_TOKENS.indigo,
  height = 'h-1.5',
  width = 'w-full',
  showLabel = false,
  className = '',
}) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  return (
    <div className={`flex items-center gap-2 ${width} ${className}`}>
      <div
        className={`${height} flex-1 overflow-hidden rounded-full transition-all`}
        style={{ backgroundColor: COLOR_TOKENS.border }}
      >
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-semibold" style={{ color: COLOR_TOKENS.ink }}>
          {percentage}%
        </span>
      )}
    </div>
  );
}

export default ProgressBar;
