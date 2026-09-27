// File: src/components/inspector/PhoneFrame.jsx
import React from 'react';
import { Wifi, Signal, Battery } from 'lucide-react';
import { COLOR_TOKENS } from '../../config/constants';

export function PhoneFrame({ children }) {
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return (
    <div className="flex justify-center py-6">
      <div
        className="relative overflow-hidden rounded-[2.5rem] border-8 shadow-2xl transition-all"
        style={{
          borderColor: '#1E1B2E',
          width: 390,
          height: 780,
          backgroundColor: COLOR_TOKENS.bg,
        }}
      >
        {/* Top Status Bar Simulator */}
        <div className="sticky top-0 z-30 flex items-center justify-between border-b bg-white/90 px-6 py-2 backdrop-blur-xs select-none" style={{ borderColor: COLOR_TOKENS.border }}>
          <span className="text-xs font-bold" style={{ color: COLOR_TOKENS.ink }}>
            {currentTime}
          </span>
          {/* Speaker Notch */}
          <div className="h-4 w-28 rounded-full bg-gray-900" />
          <div className="flex items-center gap-1.5" style={{ color: COLOR_TOKENS.ink }}>
            <Signal size={12} />
            <Wifi size={12} />
            <Battery size={13} />
          </div>
        </div>

        {/* Mobile Viewport Content */}
        <div className="nigrani-scroll h-[calc(780px-54px)] overflow-y-auto pb-4">
          {children}
        </div>

        {/* Bottom Home Bar */}
        <div className="pointer-events-none absolute bottom-1 left-1/2 z-40 h-1 w-32 -translate-x-1/2 rounded-full bg-gray-400/60" />
      </div>
    </div>
  );
}

export default PhoneFrame;
