// File: src/components/admin/FlaggedTab.jsx
import React from 'react';
import { ShieldAlert, CheckCircle2, User, Phone } from 'lucide-react';
import { Card } from '../common/Card';
import { StatusPill } from '../common/StatusPill';
import { EmptyState } from '../common/EmptyState';
import { COLOR_TOKENS } from '../../config/constants';

export function FlaggedTab({
  institutions = [],
  onSelectInstitution,
  onToggleEscalation,
  onResolveEscalation,
}) {
  const flaggedList = institutions.filter(
    (i) => i.status === 'flagged' || i.status === 'non-compliant' || i.status === 'escalated'
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header Info */}
      <div className="flex items-center justify-between rounded-2xl bg-red-50/70 border border-red-200 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-700">
            <ShieldAlert size={22} />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-red-900">
              Statutory Deficit & Escalated Watchlist ({flaggedList.length})
            </h3>
            <p className="text-xs text-red-700">
              Institutions scoring &lt;75% or manually flagged for 14-day statutory inquiry under DoSJE guidelines.
            </p>
          </div>
        </div>
      </div>

      {/* Flagged Cards List */}
      {flaggedList.length === 0 ? (
        <Card>
          <EmptyState
            icon={CheckCircle2}
            title="Zero Flagged Institutions"
            description="All monitored grant-in-aid institutions currently meet statutory compliance guidelines."
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {flaggedList.map((inst) => {
            const isEscalated = inst.status === 'escalated';
            return (
              <Card
                key={inst.id}
                className={`border-l-4 transition-all hover:shadow-lg ${
                  isEscalated ? 'border-l-red-600' : 'border-l-amber-500'
                }`}
              >
                <div className="space-y-4">
                  {/* Top Bar */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-mono text-[10px] font-bold text-gray-400">
                        {inst.code} · {inst.schemeName}
                      </span>
                      <h4
                        onClick={() => onSelectInstitution(inst.id)}
                        className="text-sm font-extrabold cursor-pointer hover:underline"
                        style={{ color: COLOR_TOKENS.ink }}
                      >
                        {inst.name}
                      </h4>
                    </div>
                    <StatusPill status={inst.status} size="sm" />
                  </div>

                  {/* Metrics Row */}
                  <div className="flex items-center justify-between rounded-xl bg-gray-50 p-3 text-xs">
                    <div>
                      <span className="text-gray-400">Location:</span>{' '}
                      <span className="font-semibold text-gray-800">{inst.city}, {inst.state}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Compliance:</span>{' '}
                      <span className="font-black text-red-600">{inst.overallScore || 45}% Score</span>
                    </div>
                  </div>

                  {/* Supervisor Contact */}
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <User size={14} color={COLOR_TOKENS.indigo} />
                      <span>{inst.supervisorName}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Phone size={14} color={COLOR_TOKENS.indigo} />
                      <span>{inst.supervisorPhone}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 border-t pt-3" style={{ borderColor: COLOR_TOKENS.border }}>
                    <button
                      onClick={() => onSelectInstitution(inst.id)}
                      className="flex-1 rounded-xl bg-gray-100 py-2 text-xs font-bold text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                      View Audit Log
                    </button>

                    {isEscalated ? (
                      <button
                        onClick={() => onResolveEscalation(inst.id, 'Statutory verification completed.')}
                        className="flex-1 rounded-xl bg-emerald-600 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition-colors"
                      >
                        Resolve & Mark Compliant
                      </button>
                    ) : (
                      <button
                        onClick={() => onToggleEscalation(inst.id)}
                        className="flex-1 rounded-xl bg-red-600 py-2 text-xs font-bold text-white hover:bg-red-700 transition-colors"
                      >
                        Escalate Inquiry
                      </button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default FlaggedTab;
