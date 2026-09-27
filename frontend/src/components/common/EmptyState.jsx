// File: src/components/common/EmptyState.jsx
import React from 'react';
import { Inbox } from 'lucide-react';
import { COLOR_TOKENS } from '../../config/constants';

export function EmptyState({
  icon: Icon = Inbox,
  title = 'No records found',
  description = 'There are no institutions or inspection reports matching your filter parameters.',
  actionText,
  onAction,
  className = '',
}) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
      <div
        className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl shadow-xs"
        style={{ backgroundColor: COLOR_TOKENS.indigoSoft }}
      >
        <Icon size={28} color={COLOR_TOKENS.indigo} strokeWidth={2} />
      </div>
      <h4 className="text-base font-bold" style={{ color: COLOR_TOKENS.ink }}>
        {title}
      </h4>
      <p className="mt-1.5 max-w-sm text-xs leading-relaxed" style={{ color: COLOR_TOKENS.inkMuted }}>
        {description}
      </p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-5 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold text-white transition-all hover:opacity-90 shadow-sm"
          style={{ backgroundColor: COLOR_TOKENS.indigo }}
        >
          {actionText}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
