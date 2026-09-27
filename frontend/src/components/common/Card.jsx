// File: src/components/common/Card.jsx
import React from 'react';
import { COLOR_TOKENS, CARD_SHADOW } from '../../config/constants';

export function Card({
  title,
  subtitle,
  action,
  children,
  className = '',
  bodyClassName = 'p-5',
  onClick,
  hoverable = false,
}) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl bg-white transition-all duration-200 ${
        hoverable ? 'hover:-translate-y-0.5 hover:shadow-lg cursor-pointer' : ''
      } ${className}`}
      style={{
        boxShadow: CARD_SHADOW,
        backgroundColor: COLOR_TOKENS.card,
      }}
    >
      {(title || subtitle || action) && (
        <div className="flex items-center justify-between border-b px-5 py-4" style={{ borderColor: COLOR_TOKENS.border }}>
          <div>
            {title && (
              <h3 className="text-base font-semibold leading-snug" style={{ color: COLOR_TOKENS.ink }}>
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="mt-0.5 text-xs" style={{ color: COLOR_TOKENS.inkMuted }}>
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="flex-shrink-0">{action}</div>}
        </div>
      )}
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}

export default Card;
