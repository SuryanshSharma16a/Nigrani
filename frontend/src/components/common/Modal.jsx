// File: src/components/common/Modal.jsx
import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { COLOR_TOKENS, CARD_SHADOW } from '../../config/constants';

export function Modal({
  isOpen = false,
  onClose,
  title,
  subtitle,
  children,
  footer,
  maxWidth = 'md', // sm | md | lg | xl
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && onClose) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const widthMap = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-2xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        className={`relative z-10 w-full overflow-hidden rounded-2xl bg-white shadow-2xl transition-all ${
          widthMap[maxWidth] || 'max-w-md'
        }`}
        style={{ boxShadow: CARD_SHADOW, backgroundColor: COLOR_TOKENS.card }}
      >
        {/* Header */}
        {(title || onClose) && (
          <div
            className="flex items-center justify-between border-b px-6 py-4"
            style={{ borderColor: COLOR_TOKENS.border }}
          >
            <div>
              {title && (
                <h3 className="text-lg font-bold leading-snug" style={{ color: COLOR_TOKENS.ink }}>
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="mt-0.5 text-xs" style={{ color: COLOR_TOKENS.inkMuted }}>
                  {subtitle}
                </p>
              )}
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="rounded-full p-1.5 transition-colors hover:bg-gray-100"
                aria-label="Close modal"
              >
                <X size={18} color={COLOR_TOKENS.inkMuted} />
              </button>
            )}
          </div>
        )}

        {/* Content Body */}
        <div className="max-h-[75vh] overflow-y-auto p-6 nigrani-scroll">{children}</div>

        {/* Footer */}
        {footer && (
          <div
            className="flex items-center justify-end gap-3 border-t bg-gray-50/50 px-6 py-4"
            style={{ borderColor: COLOR_TOKENS.border }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
