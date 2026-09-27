// File: src/components/admin/RandomAssignmentTab.jsx
import React, { useState } from 'react';
import { Shuffle, CheckCircle2, User, Building2, MapPin, AlertTriangle, Calendar } from 'lucide-react';
import { Card } from '../common/Card';
import { KpiCard } from '../common/KpiCard';
import { SEED_INSPECTORS } from '../../data/inspectors';
import { SEED_INSTITUTIONS } from '../../data/institutions';
import { COLOR_TOKENS } from '../../config/constants';

export function RandomAssignmentTab() {
  const [inspectors] = useState(SEED_INSPECTORS);
  const [assignments, setAssignments] = useState([
    {
      id: 'assign-101',
      inspectorId: 'insp-profile-02',
      inspectorName: 'Meera Nair',
      institutionId: 'inst-03',
      institutionName: 'Sant Kabir Senior Citizen Care & Rehab Centre',
      schemeName: 'SACRED',
      city: 'Varanasi',
      state: 'Uttar Pradesh',
      priority: 'HIGH (Flagged)',
      deadline: 'Within 24 Hours',
      estimatedDistanceKm: 14.2,
    },
    {
      id: 'assign-102',
      inspectorId: 'insp-profile-01',
      inspectorName: 'Rohan Verma',
      institutionId: 'inst-06',
      institutionName: 'Savitribai Phule Girls Hostel for OBC Students',
      schemeName: 'PM-YASASVI',
      city: 'Jaipur',
      state: 'Rajasthan',
      priority: 'HIGH (Non-Compliant)',
      deadline: 'Within 48 Hours',
      estimatedDistanceKm: 28.5,
    },
  ]);

  const [isGenerating, setIsGenerating] = useState(false);

  // Algorithmic Smart Dispatcher
  const handleGenerateAssignments = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const targetInsts = SEED_INSTITUTIONS.filter(
        (i) => i.status === 'due' || i.status === 'flagged' || i.status === 'non-compliant'
      );

      const newGenerated = targetInsts.map((inst, idx) => {
        const assignedInspector = inspectors[idx % inspectors.length];
        const isCritical = inst.status === 'flagged' || inst.status === 'non-compliant';

        return {
          id: `assign-${Date.now()}-${idx}`,
          inspectorId: assignedInspector.id,
          inspectorName: assignedInspector.name,
          institutionId: inst.id,
          institutionName: inst.name,
          schemeName: inst.schemeName,
          city: inst.city,
          state: inst.state,
          priority: isCritical ? 'HIGH (Flagged)' : 'MEDIUM (Unannounced)',
          deadline: isCritical ? 'Within 24 Hours' : 'Within 72 Hours',
          estimatedDistanceKm: Math.floor(12 + Math.random() * 35),
        };
      });

      setAssignments(newGenerated);
      setIsGenerating(false);
    }, 1200);
  };

  const handleManualReassign = (assignmentId, newInspectorId) => {
    const inspectorObj = inspectors.find((i) => i.id === newInspectorId);
    if (!inspectorObj) return;

    setAssignments((prev) =>
      prev.map((a) =>
        a.id === assignmentId
          ? { ...a, inspectorId: inspectorObj.id, inspectorName: inspectorObj.name }
          : a
      )
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Launch Bar */}
      <Card bodyClassName="p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-base font-extrabold" style={{ color: COLOR_TOKENS.ink }}>
              AI Unannounced Inspection Assignment Engine
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Algorithmically dispatches random surprise audits to balance officer workload and eliminate inspection bias.
            </p>
          </div>

          <button
            onClick={handleGenerateAssignments}
            disabled={isGenerating}
            className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-xs font-bold text-white shadow-md hover:bg-indigo-700 disabled:opacity-50 transition-all"
          >
            <Shuffle size={16} className={isGenerating ? 'animate-spin' : ''} />
            {isGenerating ? 'Running Smart Dispatch Algorithm…' : 'Generate Random Assignments'}
          </button>
        </div>
      </Card>

      {/* Assignment Metrics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <KpiCard
          icon={Building2}
          label="Target Hostels Scheduled"
          value={assignments.length}
          sub="Surprise audit windows created"
          color={COLOR_TOKENS.indigo}
          softBg={COLOR_TOKENS.indigoSoft}
        />

        <KpiCard
          icon={CheckCircle2}
          label="District Coverage Rate"
          value="94.2%"
          sub="State nodal alignment"
          color={COLOR_TOKENS.green}
          softBg={COLOR_TOKENS.greenSoft}
        />

        <KpiCard
          icon={MapPin}
          label="Avg Travel Distance"
          value="18.5 km"
          sub="Geographically optimized"
          color={COLOR_TOKENS.blue}
          softBg={COLOR_TOKENS.blueSoft}
        />
      </div>

      {/* Generated Assignment List */}
      <Card title="Active Unannounced Audit Schedules" subtitle="Real-time random inspection dispatches">
        {assignments.length === 0 ? (
          <p className="p-6 text-xs text-gray-400 text-center">
            No active assignments generated yet. Click "Generate Random Assignments" to run algorithm.
          </p>
        ) : (
          <div className="divide-y nigrani-scroll max-h-[500px] overflow-y-auto" style={{ borderColor: COLOR_TOKENS.border }}>
            {assignments.map((assign) => (
              <div key={assign.id} className="p-4 space-y-3 hover:bg-gray-50/70 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="inline-flex items-center gap-1 rounded-md bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-700">
                      <AlertTriangle size={11} /> {assign.priority}
                    </span>
                    <h4 className="text-sm font-extrabold mt-1" style={{ color: COLOR_TOKENS.ink }}>
                      {assign.institutionName}
                    </h4>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {assign.schemeName} · {assign.city}, {assign.state}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-xl">
                      <Calendar size={12} className="inline mr-1" />
                      Window: {assign.deadline}
                    </span>
                  </div>
                </div>

                {/* Inspector Assignment Row & Manual Override */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t text-xs" style={{ borderColor: COLOR_TOKENS.border }}>
                  <div className="flex items-center gap-2">
                    <User size={15} color={COLOR_TOKENS.indigo} />
                    <span className="font-bold text-gray-800">Assigned Inspector:</span>
                    <span className="font-semibold text-indigo-600">{assign.inspectorName}</span>
                    <span className="text-gray-400 font-mono text-[11px]">({assign.estimatedDistanceKm} km away)</span>
                  </div>

                  {/* Reassign Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-[11px]">Reassign:</span>
                    <select
                      value={assign.inspectorId}
                      onChange={(e) => handleManualReassign(assign.id, e.target.value)}
                      className="rounded-lg border bg-white px-2 py-1 text-xs font-semibold outline-none focus:ring-1 focus:ring-indigo-500"
                      style={{ borderColor: COLOR_TOKENS.border }}
                    >
                      {inspectors.map((insp) => (
                        <option key={insp.id} value={insp.id}>
                          {insp.name} ({insp.assignedDistrict})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

export default RandomAssignmentTab;
