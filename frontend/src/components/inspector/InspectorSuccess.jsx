// File: src/components/inspector/InspectorSuccess.jsx
import React from 'react';
import { CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';
import { COLOR_TOKENS } from '../../config/constants';

export function InspectorSuccess({ flagged = false, escalated = false, score = 90, onDone }) {
  return (
    <div
      className="flex h-full flex-col items-center justify-center px-6 py-12 text-center"
      style={{ backgroundColor: COLOR_TOKENS.bg }}
    >
      <div
        className="mb-5 flex h-20 w-20 items-center justify-center rounded-full shadow-lg transition-transform animate-bounce"
        style={{
          backgroundColor: escalated
            ? '#FEE2E2'
            : flagged
            ? COLOR_TOKENS.orangeSoft
            : COLOR_TOKENS.greenSoft,
        }}
      >
        {escalated ? (
          <ShieldAlert size={36} color="#B91C1C" />
        ) : flagged ? (
          <AlertTriangle size={36} color={COLOR_TOKENS.orange} />
        ) : (
          <CheckCircle2 size={36} color={COLOR_TOKENS.green} />
        )}
      </div>

      <h3 className="text-xl font-extrabold" style={{ color: COLOR_TOKENS.ink }}>
        {escalated
          ? 'Inspection Escalated'
          : flagged
          ? 'Report Flagged for Follow-up'
          : 'Inspection Submitted Successfully'}
      </h3>

      <div className="mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: COLOR_TOKENS.indigoSoft, color: COLOR_TOKENS.indigo }}>
        Calculated Compliance Score: {score}%
      </div>

      <p className="mt-3 max-w-xs text-xs leading-relaxed" style={{ color: COLOR_TOKENS.inkMuted }}>
        {escalated
          ? 'Critical deficiencies detected. Report has been auto-escalated to the Ministry District Nodal Officer for statutory inquiry.'
          : flagged
          ? 'Deficiencies were identified during inspection. The institution has been marked for 14-day compliance follow-up.'
          : 'Audit data, geotag location, and photo evidence verified. Ministry compliance logs updated in real time.'}
      </p>

      <button
        onClick={onDone}
        className="mt-8 w-full max-w-xs rounded-xl py-3 text-sm font-bold text-white shadow-md transition-all hover:opacity-90 active:scale-95"
        style={{ backgroundColor: COLOR_TOKENS.indigo }}
      >
        Back to Today's Inspections
      </button>
    </div>
  );
}

export default InspectorSuccess;
