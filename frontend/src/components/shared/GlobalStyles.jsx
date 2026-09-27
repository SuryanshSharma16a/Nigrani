// File: src/components/shared/GlobalStyles.jsx
import React from 'react';
import { COLOR_TOKENS } from '../../config/constants';

export function GlobalStyles() {
  return (
    <style dangerouslySetInnerHTML={{ __html: `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

      .nigrani-root {
        font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        color: ${COLOR_TOKENS.ink};
        background-color: ${COLOR_TOKENS.bg};
      }

      /* Scrollbar utilities */
      .nigrani-scroll::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
      .nigrani-scroll::-webkit-scrollbar-track {
        background: transparent;
      }
      .nigrani-scroll::-webkit-scrollbar-thumb {
        background: rgba(30, 27, 46, 0.15);
        border-radius: 9999px;
      }
      .nigrani-scroll::-webkit-scrollbar-thumb:hover {
        background: rgba(30, 27, 46, 0.3);
      }

      /* Animations */
      @keyframes pulse-subtle {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.6; }
      }
      .animate-pulse-subtle {
        animation: pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }

      /* Print stylesheet optimizations for inspection PDF export */
      @media print {
        .no-print {
          display: none !important;
        }
        body {
          background-color: #ffffff !important;
          color: #000000 !important;
        }
      }
    ` }} />
  );
}

export default GlobalStyles;
