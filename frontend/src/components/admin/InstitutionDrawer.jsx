// File: src/components/admin/InstitutionDrawer.jsx
import React, { useEffect } from 'react';
import { X, MapPin, Phone, Mail, User, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { StatusPill } from '../common/StatusPill';
import { ProgressBar } from '../common/ProgressBar';
import { fmtDate } from '../../utils/helpers';
import { COLOR_TOKENS, CARD_SHADOW } from '../../config/constants';

export function InstitutionDrawer({
  institution,
  inspections = [],
  isOpen = false,
  onClose,
  onToggleEscalation,
  onResolveEscalation,
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

  if (!isOpen || !institution) return null;

  const institutionInspections = inspections.filter(
    (i) => i.institutionId === institution.id
  );

  const isEscalated = institution.status === 'escalated';

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <aside
        className="relative z-10 flex h-full w-full max-w-xl flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out"
        style={{ backgroundColor: COLOR_TOKENS.card, boxShadow: CARD_SHADOW }}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b px-6 py-4" style={{ borderColor: COLOR_TOKENS.border }}>
          <div>
            <span className="font-mono text-[10px] font-bold text-gray-400">
              {institution.code} · {institution.schemeName}
            </span>
            <h3 className="text-base font-extrabold leading-tight" style={{ color: COLOR_TOKENS.ink }}>
              {institution.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 hover:bg-gray-100 transition-colors"
          >
            <X size={18} color={COLOR_TOKENS.inkMuted} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6 nigrani-scroll">
          {/* Hero Banner Image */}
          {institution.image && (
            <div className="relative h-44 w-full overflow-hidden rounded-2xl border" style={{ borderColor: COLOR_TOKENS.border }}>
              <img src={institution.image} alt={institution.name} className="h-full w-full object-cover" />
              <div className="absolute top-3 right-3">
                <StatusPill status={institution.status} size="lg" />
              </div>
            </div>
          )}

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border p-3.5 bg-gray-50/70" style={{ borderColor: COLOR_TOKENS.border }}>
              <div className="text-[11px] font-semibold text-gray-400">Compliance Score</div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-2xl font-black" style={{ color: COLOR_TOKENS.ink }}>
                  {institution.overallScore ? `${institution.overallScore}%` : 'N/A'}
                </span>
                {institution.overallScore && (
                  <ProgressBar
                    value={institution.overallScore}
                    color={institution.overallScore >= 80 ? COLOR_TOKENS.green : COLOR_TOKENS.red}
                    width="w-16"
                  />
                )}
              </div>
            </div>

            <div className="rounded-2xl border p-3.5 bg-gray-50/70" style={{ borderColor: COLOR_TOKENS.border }}>
              <div className="text-[11px] font-semibold text-gray-400">Sanctioned vs Enrolled</div>
              <div className="mt-1 text-2xl font-black" style={{ color: COLOR_TOKENS.ink }}>
                {institution.currentEnrolled} / {institution.sanctionedCapacity || 'N/A'}
              </div>
            </div>
          </div>

          {/* Location & Supervisor Details */}
          <div className="space-y-3 rounded-2xl border p-4" style={{ borderColor: COLOR_TOKENS.border }}>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Administrative Info & Contact
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 text-gray-700">
                <MapPin size={15} color={COLOR_TOKENS.indigo} className="flex-shrink-0 mt-0.5" />
                <span>{institution.address}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <User size={15} color={COLOR_TOKENS.indigo} className="flex-shrink-0" />
                <span>Supervisor: {institution.supervisorName}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Phone size={15} color={COLOR_TOKENS.indigo} className="flex-shrink-0" />
                <span>{institution.supervisorPhone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Mail size={15} color={COLOR_TOKENS.indigo} className="flex-shrink-0" />
                <span>{institution.supervisorEmail}</span>
              </div>
            </div>
          </div>

          {/* Facilities List */}
          {institution.facilities && institution.facilities.length > 0 && (
            <div>
              <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                Verified Facilities
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {institution.facilities.map((fac) => (
                  <span
                    key={fac}
                    className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700"
                  >
                    ✓ {fac}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Inspection History */}
          <div>
            <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">
              Field Audit History ({institutionInspections.length})
            </h4>
            {institutionInspections.length === 0 ? (
              <p className="text-xs text-gray-400">No field audit reports logged yet.</p>
            ) : (
              <div className="space-y-3">
                {institutionInspections.map((insp) => (
                  <div key={insp.id} className="rounded-2xl border p-3.5 space-y-2" style={{ borderColor: COLOR_TOKENS.border }}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold" style={{ color: COLOR_TOKENS.ink }}>
                        Auditor: {insp.inspectorName}
                      </span>
                      <span className="font-extrabold text-indigo-600">{insp.score}% Score</span>
                    </div>
                    <div className="text-[11px] text-gray-500">{fmtDate(insp.date, true)}</div>
                    <p className="text-xs text-gray-700 bg-gray-50 p-2 rounded-xl italic">
                      "{insp.remark}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t p-4 flex gap-2 bg-gray-50/50" style={{ borderColor: COLOR_TOKENS.border }}>
          {isEscalated ? (
            <button
              onClick={() => onResolveEscalation(institution.id, 'Statutory verification completed.')}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all"
            >
              <CheckCircle2 size={16} /> Mark Resolved & Compliant
            </button>
          ) : (
            <button
              onClick={() => onToggleEscalation(institution.id)}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold text-white bg-red-600 hover:bg-red-700 shadow-md transition-all"
            >
              <ShieldAlert size={16} /> Escalate to District Nodal Officer
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}

export default InstitutionDrawer;
