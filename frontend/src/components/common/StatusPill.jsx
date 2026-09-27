// File: src/components/common/StatusPill.jsx
import React from 'react';
import { statusColors } from '../../utils/helpers';

export function StatusPill({ status, size = 'md', className = '' }) {
  const style = statusColors(status);

  const sizeClasses =
    size === 'sm'
      ? 'px-2 py-0.5 text-[11px]'
      : size === 'lg'
      ? 'px-3.5 py-1.5 text-sm font-semibold'
      : 'px-2.5 py-1 text-xs font-semibold';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full transition-all ${sizeClasses} ${className}`}
      style={{ backgroundColor: style.bg, color: style.fg }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full flex-shrink-0 animate-pulse-subtle"
        style={{ backgroundColor: style.fg }}
      />
      <span>{style.label}</span>
    </span>
  );
}

export default StatusPill;
