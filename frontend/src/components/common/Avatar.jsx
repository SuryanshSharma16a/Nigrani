// File: src/components/common/Avatar.jsx
import React from 'react';
import { COLOR_TOKENS } from '../../config/constants';

export function Avatar({
  name = 'User',
  src,
  size = 36,
  bgColor = COLOR_TOKENS.indigoSoft,
  textColor = COLOR_TOKENS.indigo,
  className = '',
}) {
  const initials = (name || '')
    .trim()
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`rounded-full object-cover flex-shrink-0 ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className={`flex flex-shrink-0 items-center justify-center rounded-full text-xs font-bold transition-transform ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      {initials || 'U'}
    </div>
  );
}

export default Avatar;
