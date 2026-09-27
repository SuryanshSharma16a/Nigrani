// File: src/components/inspector/InspectorHome.jsx
import React from 'react';
import { Wifi, WifiOff, ChevronRight, Building2, Calendar, CheckCircle2 } from 'lucide-react';
import { BrandMark } from '../common/BrandMark';
import { StatusPill } from '../common/StatusPill';
import { OfflineBanner } from './OfflineBanner';
import { fmtDate, daysAgo } from '../../utils/helpers';
import { COLOR_TOKENS, CARD_SHADOW, APP_CONFIG } from '../../config/constants';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export function InspectorHome({
  institutions = [],
  pendingCount = 0,
  isOffline = false,
  isSyncing = false,
  onToggleOffline,
  onOpenChecklist,
  onSyncNow,
  inspectorName = APP_CONFIG.defaultInspectorName,
}) {
  const dueInstitutions = institutions.filter((i) => i.status === 'due');
  const visitedInstitutions = institutions.filter((i) => i.status !== 'due');

  return (
    <div className="min-h-full pb-8" style={{ backgroundColor: COLOR_TOKENS.bg }}>
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 border-b bg-white px-4 pb-3.5 pt-4" style={{ borderColor: COLOR_TOKENS.border }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BrandMark size={36} />
            <div>
              <div className="text-sm font-bold" style={{ color: COLOR_TOKENS.ink }}>
                {getGreeting()}, {inspectorName.split(' ')[0]}
              </div>
              <div className="text-[11px]" style={{ color: COLOR_TOKENS.inkMuted }}>
                Field Inspector · DoSJE
              </div>
            </div>
          </div>

          {/* Network Connection Toggle */}
          <button
            onClick={onToggleOffline}
            className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all shadow-xs"
            style={{
              backgroundColor: isOffline ? COLOR_TOKENS.orangeSoft : COLOR_TOKENS.greenSoft,
              color: isOffline ? COLOR_TOKENS.orange : COLOR_TOKENS.green,
            }}
          >
            {isOffline ? <WifiOff size={13} /> : <Wifi size={13} />}
            {isOffline ? 'Offline' : 'Online'}
          </button>
        </div>
      </div>

      {/* Offline Sync Alert Banner */}
      <OfflineBanner
        pendingCount={pendingCount}
        isOffline={isOffline}
        isSyncing={isSyncing}
        onSyncNow={onSyncNow}
      />

      {/* Due Inspections List */}
      <div className="px-4 pt-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-extrabold tracking-tight" style={{ color: COLOR_TOKENS.ink }}>
            Today's Assigned Inspections ({dueInstitutions.length})
          </h3>
        </div>

        {dueInstitutions.length === 0 ? (
          <div className="rounded-2xl bg-white p-6 text-center shadow-xs" style={{ boxShadow: CARD_SHADOW }}>
            <CheckCircle2 size={32} color={COLOR_TOKENS.green} className="mx-auto mb-2" />
            <p className="text-xs font-bold" style={{ color: COLOR_TOKENS.ink }}>
              All visits complete for today!
            </p>
            <p className="mt-1 text-[11px]" style={{ color: COLOR_TOKENS.inkMuted }}>
              No pending inspection schedules in your assigned district.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {dueInstitutions.map((inst) => (
              <button
                key={inst.id}
                onClick={() => onOpenChecklist(inst)}
                className="group flex flex-col items-start rounded-2xl bg-white p-4 text-left transition-all hover:shadow-md active:scale-98"
                style={{ boxShadow: CARD_SHADOW }}
              >
                <div className="flex w-full items-center justify-between">
                  <span className="text-xs font-extrabold truncate" style={{ color: COLOR_TOKENS.ink }}>
                    {inst.name}
                  </span>
                  <ChevronRight size={16} color={COLOR_TOKENS.inkMuted} className="transition-transform group-hover:translate-x-1" />
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-[11px]" style={{ color: COLOR_TOKENS.inkMuted }}>
                  <Building2 size={12} />
                  <span>{inst.schemeName} · {inst.city}, {inst.state}</span>
                </div>
                <div className="mt-2.5 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                    <Calendar size={11} />
                    {inst.lastInspectedDate ? `Last visit ${daysAgo(inst.lastInspectedDate)}` : 'Never inspected'}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Recently Visited List */}
      <div className="px-4 pt-6">
        <h3 className="mb-3 text-sm font-extrabold tracking-tight" style={{ color: COLOR_TOKENS.ink }}>
          Recently Completed Audits ({visitedInstitutions.length})
        </h3>
        <div className="flex flex-col gap-2.5">
          {visitedInstitutions.map((inst) => (
            <div
              key={inst.id}
              className="flex items-center justify-between rounded-2xl bg-white p-3.5 shadow-xs"
              style={{ boxShadow: CARD_SHADOW }}
            >
              <div className="min-w-0 flex-1 pr-2">
                <div className="truncate text-xs font-bold" style={{ color: COLOR_TOKENS.ink }}>
                  {inst.name}
                </div>
                <div className="text-[11px]" style={{ color: COLOR_TOKENS.inkMuted }}>
                  {fmtDate(inst.lastInspectedDate)} · Score: {inst.overallScore || 90}%
                </div>
              </div>
              <StatusPill status={inst.status} size="sm" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InspectorHome;
