// File: src/components/admin/InstitutionsTab.jsx
import React, { useState, useMemo } from 'react';
import { Search, Filter, ChevronRight, Building2 } from 'lucide-react';
import { Card } from '../common/Card';
import { StatusPill } from '../common/StatusPill';
import { ProgressBar } from '../common/ProgressBar';
import { EmptyState } from '../common/EmptyState';
import { DOSJE_SCHEMES } from '../../config/schemes';
import { fmtDate } from '../../utils/helpers';
import { COLOR_TOKENS } from '../../config/constants';

export function InstitutionsTab({
  institutions = [],
  onSelectInstitution,
  initialFilterScheme = 'ALL',
  initialFilterStatus = 'ALL',
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedScheme, setSelectedScheme] = useState(initialFilterScheme);
  const [selectedStatus, setSelectedStatus] = useState(initialFilterStatus);

  const filteredInstitutions = useMemo(() => {
    return institutions.filter((inst) => {
      const matchSearch =
        !searchTerm ||
        inst.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inst.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inst.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inst.state.toLowerCase().includes(searchTerm.toLowerCase());

      const matchScheme =
        selectedScheme === 'ALL' ||
        inst.schemeId === selectedScheme ||
        inst.schemeName.toLowerCase() === selectedScheme.toLowerCase();

      const matchStatus =
        selectedStatus === 'ALL' || inst.status === selectedStatus;

      return matchSearch && matchScheme && matchStatus;
    });
  }, [institutions, searchTerm, selectedScheme, selectedStatus]);

  return (
    <div className="space-y-5 pb-12">
      {/* Header & Filter Bar */}
      <Card bodyClassName="p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search size={16} color={COLOR_TOKENS.inkMuted} className="absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by institution name, code, state, or city…"
              className="w-full rounded-xl border bg-gray-50/60 py-2 pl-10 pr-4 text-xs font-medium outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
              style={{ borderColor: COLOR_TOKENS.border }}
            />
          </div>

          {/* Scheme & Status Dropdown Filters */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
              <Filter size={14} />
              <span>Filters:</span>
            </div>

            <select
              value={selectedScheme}
              onChange={(e) => setSelectedScheme(e.target.value)}
              className="rounded-xl border bg-white px-3 py-2 text-xs font-semibold outline-none focus:ring-2 focus:ring-indigo-500/20"
              style={{ borderColor: COLOR_TOKENS.border }}
            >
              <option value="ALL">All Schemes</option>
              {DOSJE_SCHEMES.map((s) => (
                <option key={s.id} value={s.code}>
                  {s.code} ({s.name})
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="rounded-xl border bg-white px-3 py-2 text-xs font-semibold outline-none focus:ring-2 focus:ring-indigo-500/20"
              style={{ borderColor: COLOR_TOKENS.border }}
            >
              <option value="ALL">All Statuses</option>
              <option value="compliant">Compliant</option>
              <option value="minor deficit">Minor Deficit</option>
              <option value="non-compliant">Non-Compliant</option>
              <option value="escalated">Escalated</option>
              <option value="due">Inspection Due</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Institutions Table */}
      <Card bodyClassName="p-0 overflow-hidden">
        {filteredInstitutions.length === 0 ? (
          <EmptyState
            icon={Building2}
            title="No institutions match query"
            description="Try clearing your search term or setting filters to 'All Schemes' / 'All Statuses'."
            actionText="Reset Filters"
            onAction={() => {
              setSearchTerm('');
              setSelectedScheme('ALL');
              setSelectedStatus('ALL');
            }}
          />
        ) : (
          <div className="overflow-x-auto nigrani-scroll">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b bg-gray-50/80 font-bold uppercase tracking-wider text-[11px] text-gray-500" style={{ borderColor: COLOR_TOKENS.border }}>
                  <th className="px-5 py-3.5">Code & Institution Name</th>
                  <th className="px-4 py-3.5">Scheme</th>
                  <th className="px-4 py-3.5">State & Location</th>
                  <th className="px-4 py-3.5">Capacity / Enrolled</th>
                  <th className="px-4 py-3.5">Compliance Score</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5">Last Audit Date</th>
                  <th className="px-4 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: COLOR_TOKENS.border }}>
                {filteredInstitutions.map((inst) => (
                  <tr
                    key={inst.id}
                    onClick={() => onSelectInstitution(inst.id)}
                    className="group cursor-pointer transition-colors hover:bg-indigo-50/30"
                  >
                    <td className="px-5 py-4">
                      <div className="font-extrabold text-xs" style={{ color: COLOR_TOKENS.ink }}>
                        {inst.name}
                      </div>
                      <div className="mt-0.5 font-mono text-[10px] text-gray-400">
                        {inst.code} · {inst.type}
                      </div>
                    </td>
                    <td className="px-4 py-4 font-semibold text-gray-700">
                      <span className="rounded-md bg-indigo-50 px-2 py-0.5 font-bold text-indigo-600 text-[11px]">
                        {inst.schemeName}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-600 font-medium">
                      {inst.city}, {inst.state}
                    </td>
                    <td className="px-4 py-4 font-medium text-gray-700">
                      {inst.sanctionedCapacity ? `${inst.currentEnrolled} / ${inst.sanctionedCapacity}` : 'N/A'}
                    </td>
                    <td className="px-4 py-4 min-w-[140px]">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs" style={{ color: COLOR_TOKENS.ink }}>
                          {inst.overallScore ? `${inst.overallScore}%` : 'N/A'}
                        </span>
                        {inst.overallScore && (
                          <ProgressBar
                            value={inst.overallScore}
                            color={
                              inst.overallScore >= 85
                                ? COLOR_TOKENS.green
                                : inst.overallScore >= 70
                                ? COLOR_TOKENS.orange
                                : COLOR_TOKENS.red
                            }
                            width="w-16"
                          />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <StatusPill status={inst.status} size="sm" />
                    </td>
                    <td className="px-4 py-4 text-gray-500 font-medium">
                      {fmtDate(inst.lastInspectedDate)}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <ChevronRight
                        size={16}
                        color={COLOR_TOKENS.inkMuted}
                        className="inline transition-transform group-hover:translate-x-1"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

export default InstitutionsTab;
