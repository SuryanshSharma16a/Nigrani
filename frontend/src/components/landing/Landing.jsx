// File: src/components/landing/Landing.jsx
import React from 'react';
import { Smartphone, Monitor, ChevronRight, ShieldCheck } from 'lucide-react';
import { BrandMark } from '../common/BrandMark';
import { COLOR_TOKENS, CARD_SHADOW, APP_CONFIG } from '../../config/constants';

export function Landing({ onSelectRole }) {
  return (
    <div
      className="nigrani-root flex min-h-screen flex-col items-center justify-center px-6 py-16"
      style={{ backgroundColor: COLOR_TOKENS.bg }}
    >
      {/* Header Section */}
      <div className="mb-12 flex flex-col items-center text-center">
        <div className="mb-4">
          <BrandMark size={56} />
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: COLOR_TOKENS.indigoSoft, color: COLOR_TOKENS.indigo }}>
          <ShieldCheck size={14} />
          {APP_CONFIG.government} · SIH 2025 Prototype
        </div>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl" style={{ color: COLOR_TOKENS.ink }}>
          {APP_CONFIG.name}
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed" style={{ color: COLOR_TOKENS.inkMuted }}>
          {APP_CONFIG.tagline}
        </p>
      </div>

      {/* Role Selection Grid */}
      <div className="grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Field Inspector Card */}
        <button
          onClick={() => onSelectRole('inspector')}
          className="group flex flex-col items-start rounded-2xl bg-white p-7 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none"
          style={{ boxShadow: CARD_SHADOW, backgroundColor: COLOR_TOKENS.card }}
        >
          <div
            className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-110"
            style={{ backgroundColor: COLOR_TOKENS.indigoSoft }}
          >
            <Smartphone size={24} color={COLOR_TOKENS.indigo} strokeWidth={2.2} />
          </div>
          <h2 className="text-xl font-bold" style={{ color: COLOR_TOKENS.ink }}>
            Field Inspector Mobile App
          </h2>
          <p className="mt-2.5 text-xs leading-relaxed" style={{ color: COLOR_TOKENS.inkMuted }}>
            Conduct geotagged offline inspections, complete mandatory section checklists, upload photo evidence, and sync verified audit reports.
          </p>
          <div className="mt-6 inline-flex items-center gap-1 text-xs font-bold" style={{ color: COLOR_TOKENS.indigo }}>
            Open Field App
            <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
          </div>
        </button>

        {/* Ministry Dashboard Card */}
        <button
          onClick={() => onSelectRole('admin')}
          className="group flex flex-col items-start rounded-2xl bg-white p-7 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none"
          style={{ boxShadow: CARD_SHADOW, backgroundColor: COLOR_TOKENS.card }}
        >
          <div
            className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-110"
            style={{ backgroundColor: COLOR_TOKENS.blueSoft }}
          >
            <Monitor size={24} color={COLOR_TOKENS.blue} strokeWidth={2.2} />
          </div>
          <h2 className="text-xl font-bold" style={{ color: COLOR_TOKENS.ink }}>
            Ministry Admin Dashboard
          </h2>
          <p className="mt-2.5 text-xs leading-relaxed" style={{ color: COLOR_TOKENS.inkMuted }}>
            Monitor real-time compliance metrics across 6 flagship DoSJE schemes, track escalated non-compliance, inspect AI anomaly alerts, and review GIS heatmaps.
          </p>
          <div className="mt-6 inline-flex items-center gap-1 text-xs font-bold" style={{ color: COLOR_TOKENS.blue }}>
            Open Ministry Dashboard
            <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
          </div>
        </button>
      </div>

      {/* Footer Info */}
      <footer className="mt-14 text-center text-xs" style={{ color: COLOR_TOKENS.inkMuted }}>
        <p>{APP_CONFIG.ministry} · Version {APP_CONFIG.version}</p>
      </footer>
    </div>
  );
}

export default Landing;
