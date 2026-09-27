// File: src/components/common/NotificationBadge.jsx
import React from 'react';
import { COLOR_TOKENS } from '../../config/constants';

export function NotificationBadge({
  count = 0,
  variant = 'danger', // danger | warning | info | success | indigo
  pulse = false,
  className = '',
}) {
  if (count === 0 && count !== '0') return null;

  const variantStyles = {
    danger: { bg: COLOR_TOKENS.red, fg: '#ffffff' },
    warning: { bg: COLOR_TOKENS.orange, fg: '#ffffff' },
    info: { bg: COLOR_TOKENS.blue, fg: '#ffffff' },
    success: { bg: COLOR_TOKENS.green, fg: '#ffffff' },
    indigo: { bg: COLOR_TOKENS.indigo, fg: '#ffffff' },
  };

  const currentVariant = variantStyles[variant] || variantStyles.danger;

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-[11px] font-bold leading-none ${
        pulse ? 'animate-pulse' : ''
      } ${className}`}
      style={{
        backgroundColor: currentVariant.bg,
        color: currentVariant.fg,
        minWidth: '20px',
      }}
    >
      {count}
    </span>
  );
}

export default NotificationBadge;
