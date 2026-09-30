// File: src/components/common/BrandMark.jsx
import React from 'react';

export function BrandMark({ size = 36, className = '' }) {
  return (
    <div
      className={`flex flex-shrink-0 items-center justify-center transition-transform duration-200 hover:scale-105 ${className}`}
      style={{
        width: size,
        height: size,
      }}
    >
      <img src="/logo.png" alt="Nigrani Logo" className="w-full h-full object-contain" />
    </div>
  );
}

export default BrandMark;
