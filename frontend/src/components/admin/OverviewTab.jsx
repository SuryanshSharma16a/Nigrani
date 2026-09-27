// File: src/components/admin/OverviewTab.jsx
import React from 'react';
import {
  Building2,
  CheckCircle2,
  ClipboardList,
  AlertTriangle,
  ChevronRight,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { KpiCard } from '../common/KpiCard';
import { Card } from '../common/Card';
import { StatusPill } from '../common/StatusPill';
import { fmtDate } from '../../utils/helpers';
import { COLOR_TOKENS, CARD_SHADOW } from '../../config/constants';

export function OverviewTab({
  institutions = [],
  inspections = [],
  onSelectInstitution,
  onViewAllInstitutions,
  onViewFlagged,
}) {
  // Metric Calculations
  const totalCount = institutions.length;
  const compliantCount = institutions.filter((i) => i.status === 'compliant').length;
  const minorDeficitCount = institutions.filter((i) => i.status === 'minor deficit').length;
  const nonCompliantCount = institutions.filter((i) => i.status === 'non-compliant').length;
  const escalatedCount = institutions.filter((i) => i.status === 'escalated').length;
  const dueCount = institutions.filter((i) => i.status === 'due').length;

  const avgComplianceScore =
    totalCount > 0
      ? Math.round(
          institutions.reduce((acc, curr) => acc + (curr.overallScore || 80), 0) / totalCount
        )
      : 85;

  const flaggedTotal = nonCompliantCount + escalatedCount;

  // Chart Data Preparation
  const monthlyTrendData = [
    { month: 'May', score: 78, audits: 32 },
    { month: 'Jun', score: 81, audits: 45 },
    { month: 'Jul', score: 79, audits: 38 },
    { month: 'Aug', score: 84, audits: 52 },
    { month: 'Sep', score: avgComplianceScore, audits: inspections.length + 10 },
  ];

  const pieData = [
    { name: 'Compliant', value: compliantCount, color: COLOR_TOKENS.green },
    { name: 'Minor Deficit', value: minorDeficitCount, color: COLOR_TOKENS.orange },
    { name: 'Non-Compliant', value: nonCompliantCount, color: COLOR_TOKENS.red },
    { name: 'Escalated', value: escalatedCount, color: '#B91C1C' },
    { name: 'Inspection Due', value: dueCount, color: COLOR_TOKENS.blue },
  ].filter((d) => d.value > 0);

  const schemeScores = [
    { scheme: 'PM-AJAY', score: 88 },
    { scheme: 'PM-YASASVI', score: 76 },
    { scheme: 'SMILE', score: 91 },
    { scheme: 'TAPAS', score: 82 },
    { scheme: 'SACRED', score: 74 },
    { scheme: 'SHREYAS', score: 89 },
  ];

  const recentInspections = inspections.slice(0, 5);

  return (
    <div className="space-y-6 pb-12">
      {/* Top 4 KPI Cards Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          icon={Building2}
          label="Total Monitored Institutions"
          value={totalCount}
          sub="Across 11 States & UTs"
          color={COLOR_TOKENS.indigo}
          softBg={COLOR_TOKENS.indigoSoft}
          onClick={onViewAllInstitutions}
        />

        <KpiCard
          icon={CheckCircle2}
          label="Overall Compliance Index"
          value={`${avgComplianceScore}%`}
          sub="Target Mandate: ≥85%"
          color={COLOR_TOKENS.green}
          softBg={COLOR_TOKENS.greenSoft}
          trend="+3.2% vs last month"
          trendUp={true}
        />

        <KpiCard
          icon={ClipboardList}
          label="Inspections Logged"
          value={inspections.length}
          sub="Geotagged & verified reports"
          color={COLOR_TOKENS.blue}
          softBg={COLOR_TOKENS.blueSoft}
        />

        <KpiCard
          icon={AlertTriangle}
          label="Flagged & Escalated"
          value={flaggedTotal}
          sub={`${escalatedCount} escalated to Nodal Officer`}
          color={COLOR_TOKENS.red}
          softBg={COLOR_TOKENS.redSoft}
          trend={flaggedTotal > 0 ? `${flaggedTotal} Actionable` : 'Zero Deficits'}
          trendUp={flaggedTotal === 0}
          onClick={onViewFlagged}
        />
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Compliance Trend Line Chart */}
        <Card
          title="Monthly Compliance & Audit Velocity"
          subtitle="Average compliance score trend across all DoSJE funded institutions"
          className="lg:col-span-2"
        >
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrendData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F6" vertical={false} />
                <XAxis dataKey="month" stroke="#8A8FA3" fontSize={12} tickLine={false} />
                <YAxis domain={[50, 100]} stroke="#8A8FA3" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    boxShadow: CARD_SHADOW,
                    border: 'none',
                    fontSize: '12px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  name="Compliance Score (%)"
                  stroke={COLOR_TOKENS.indigo}
                  strokeWidth={3}
                  dot={{ r: 5, fill: COLOR_TOKENS.indigo }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Status Breakdown Pie Chart */}
        <Card title="Compliance Status Distribution" subtitle="Breakdown of 11 seed institutions">
          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    boxShadow: CARD_SHADOW,
                    border: 'none',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex flex-wrap justify-center gap-3 text-[11px] font-semibold">
            {pieData.map((p) => (
              <div key={p.name} className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                <span>{p.name} ({p.value})</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Scheme Performance Bar Chart & Recent Activity Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Scheme Compliance Bar Chart */}
        <Card title="Scheme-wise Average Compliance" subtitle="Comparison across 6 DoSJE schemes">
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={schemeScores} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F6" vertical={false} />
                <XAxis dataKey="scheme" stroke="#8A8FA3" fontSize={11} tickLine={false} />
                <YAxis domain={[0, 100]} stroke="#8A8FA3" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    boxShadow: CARD_SHADOW,
                    border: 'none',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="score" name="Avg Score (%)" fill={COLOR_TOKENS.indigo} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent Inspection Activity List */}
        <Card
          title="Recent Field Inspection Audits"
          subtitle="Latest verified reports submitted by district officers"
          action={
            <button
              onClick={onViewAllInstitutions}
              className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:underline"
            >
              View All <ChevronRight size={14} />
            </button>
          }
        >
          <div className="divide-y nigrani-scroll max-h-64 overflow-y-auto" style={{ borderColor: COLOR_TOKENS.border }}>
            {recentInspections.map((insp) => (
              <div
                key={insp.id}
                onClick={() => onSelectInstitution(insp.institutionId)}
                className="flex cursor-pointer items-center justify-between py-3 transition-colors hover:bg-gray-50/80 px-2 rounded-xl"
              >
                <div className="min-w-0 flex-1 pr-3">
                  <div className="truncate text-xs font-bold" style={{ color: COLOR_TOKENS.ink }}>
                    {insp.institutionName || 'Dr. Ambedkar SC Hostel'}
                  </div>
                  <div className="mt-0.5 text-[11px]" style={{ color: COLOR_TOKENS.inkMuted }}>
                    {insp.inspectorName} · {fmtDate(insp.date)}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold" style={{ color: COLOR_TOKENS.ink }}>
                    {insp.score}%
                  </span>
                  <StatusPill status={insp.status || (insp.flagged ? 'non-compliant' : 'compliant')} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default OverviewTab;
