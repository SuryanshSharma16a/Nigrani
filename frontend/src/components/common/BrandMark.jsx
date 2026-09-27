// File: src/components/common/BrandMark.jsx
import React from 'react';
import { Building2 } from 'lucide-react';
import { COLOR_TOKENS } from '../../config/constants';

export function BrandMark({ size = 36, className = '' }) {
  return (
    <div
      className={`flex flex-shrink-0 items-center justify-center rounded-xl shadow-sm transition-transform duration-200 hover:scale-105 ${className}`}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${COLOR_TOKENS.indigo}, ${COLOR_TOKENS.indigoLight})`,
      }}
    >
      <Building2 size={size * 0.52} color="#ffffff" strokeWidth={2.2} />
    </div>
  );
}

export default BrandMark;
