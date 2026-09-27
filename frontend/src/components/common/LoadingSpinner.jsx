// File: src/components/common/LoadingSpinner.jsx
import React from 'react';
import { Loader2 } from 'lucide-react';
import { COLOR_TOKENS } from '../../config/constants';

export function LoadingSpinner({
  size = 28,
  text = 'Loading Nigrani records…',
  fullPage = false,
  color = COLOR_TOKENS.indigo,
  className = '',
}) {
  const spinnerContent = (
    <div className={`flex flex-col items-center justify-center p-6 text-center ${className}`}>
      <Loader2
        size={size}
        color={color}
        className="animate-spin"
        strokeWidth={2.2}
      />
      {text && (
        <p className="mt-3 text-xs font-semibold" style={{ color: COLOR_TOKENS.inkMuted }}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-xs">
        {spinnerContent}
      </div>
    );
  }

  return spinnerContent;
}

export default LoadingSpinner;
