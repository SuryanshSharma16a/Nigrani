// File: src/components/admin/AnomalyDetectionTab.jsx
import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, Filter, Eye, XCircle } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card } from '../common/Card';
import { KpiCard } from '../common/KpiCard';
import { EmptyState } from '../common/EmptyState';
import { detectAnomalies } from '../../utils/anomalyDetection';
import { SEED_INSTITUTIONS } from '../../data/institutions';
import { fmtDate } from '../../utils/helpers';
import { COLOR_TOKENS, CARD_SHADOW } from '../../config/constants';

export function AnomalyDetectionTab({ onSelectInstitution }) {
  const [anomalies, setAnomalies] = useState(() => detectAnomalies(SEED_INSTITUTIONS));
  const [selectedSeverity, setSelectedSeverity] = useState('ALL');
  const [selectedType, setSelectedType] = useState('ALL');

  const filteredAnomalies = anomalies.filter((a) => {
    const matchSev = selectedSeverity === 'ALL' || a.severity === selectedSeverity;
    const matchType = selectedType === 'ALL' || a.type === selectedType;
    return matchSev && matchType;
  });

  const highSeverityCount = anomalies.filter((a) => a.severity === 'HIGH').length;

  const handleDismiss = (id) => {
    setAnomalies((prev) => prev.filter((a) => a.id !== id));
  };

  const trendData = [
    { week: 'Week 1', count: 8 },
    { week: 'Week 2', count: 5 },
    { week: 'Week 3', count: 11 },
    { week: 'Week 4', count: anomalies.length },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <KpiCard
          icon={ShieldAlert}
          label="Total Active Anomalies"
          value={anomalies.length}
          sub="Computer vision & ledger flags"
          color={COLOR_TOKENS.red}
          softBg={COLOR_TOKENS.redSoft}
        />

        <KpiCard
          icon={AlertTriangle}
          label="High Severity Threats"
          value={highSeverityCount}
          sub="Immediate audit required"
          color={COLOR_TOKENS.orange}
          softBg={COLOR_TOKENS.orangeSoft}
        />

        <KpiCard
          icon={CheckCircle2}
          label="AI Engine Confidence"
          value="93.4%"
          sub="Verified anomaly precision"
          color={COLOR_TOKENS.green}
          softBg={COLOR_TOKENS.greenSoft}
        />
      </div>

      {/* Anomaly Trend Chart */}
      <Card title="AI Anomaly Occurrence Velocity" subtitle="Weekly trend of computer vision & financial flags">
        <div className="h-56 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F6" vertical={false} />
              <XAxis dataKey="week" stroke="#8A8FA3" fontSize={11} tickLine={false} />
              <YAxis stroke="#8A8FA3" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  boxShadow: CARD_SHADOW,
                  border: 'none',
                  fontSize: '12px',
                }}
              />
              <Line type="monotone" dataKey="count" stroke={COLOR_TOKENS.red} strokeWidth={3} dot={{ r: 5, fill: COLOR_TOKENS.red }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Filters Bar */}
      <Card bodyClassName="p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Filter size={16} color={COLOR_TOKENS.indigo} />
            <h3 className="text-sm font-extrabold" style={{ color: COLOR_TOKENS.ink }}>
              Detected Anomaly Logs ({filteredAnomalies.length})
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="rounded-xl border bg-white px-3 py-2 text-xs font-semibold outline-none focus:ring-2 focus:ring-indigo-500/20"
              style={{ borderColor: COLOR_TOKENS.border }}
            >
              <option value="ALL">All Severities</option>
              <option value="HIGH">High Severity</option>
              <option value="MEDIUM">Medium Severity</option>
              <option value="LOW">Low Severity</option>
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="rounded-xl border bg-white px-3 py-2 text-xs font-semibold outline-none focus:ring-2 focus:ring-indigo-500/20"
              style={{ borderColor: COLOR_TOKENS.border }}
            >
              <option value="ALL">All Anomaly Types</option>
              <option value="FINANCE_MISMATCH">Financial Discrepancy</option>
              <option value="ATTENDANCE_DROP">Biometric Headcount Drop</option>
              <option value="CCTV_OFFLINE">CCTV Signal Loss</option>
              <option value="GEO_OUT_OF_BOUNDS">Geofence Violation</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Anomaly Cards List */}
      {filteredAnomalies.length === 0 ? (
        <Card>
          <EmptyState
            icon={CheckCircle2}
            title="No anomalies detected"
            description="All active institutions pass real-time computer vision and financial ledger checks."
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filteredAnomalies.map((anom) => (
            <Card
              key={anom.id}
              className={`border-l-4 transition-all ${
                anom.severity === 'HIGH'
                  ? 'border-l-red-600'
                  : 'border-l-amber-500'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-mono text-[10px] font-bold text-gray-400">
                      {anom.code} · {fmtDate(anom.timestamp, true)}
                    </span>
                    <h4 className="text-sm font-extrabold text-gray-900 mt-0.5">
                      {anom.institutionName}
                    </h4>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                      anom.severity === 'HIGH'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {anom.severity} ({anom.confidence}% AI Confidence)
                  </span>
                </div>

                <div className="rounded-xl bg-gray-50 p-3 text-xs space-y-1">
                  <div className="font-bold text-indigo-600">{anom.typeLabel}</div>
                  <p className="text-gray-700 leading-relaxed">{anom.description}</p>
                </div>

                <div className="text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded-xl font-medium border border-amber-100">
                  <strong className="font-bold">Recommended Action:</strong> {anom.recommendedAction}
                </div>

                <div className="flex items-center gap-2 border-t pt-3" style={{ borderColor: COLOR_TOKENS.border }}>
                  <button
                    onClick={() => onSelectInstitution && onSelectInstitution(anom.institutionId)}
                    className="flex-1 flex items-center justify-center gap-1 rounded-xl bg-indigo-600 py-2 text-xs font-bold text-white hover:bg-indigo-700 transition-colors"
                  >
                    <Eye size={14} /> Investigate Detail
                  </button>

                  <button
                    onClick={() => handleDismiss(anom.id)}
                    className="flex items-center gap-1 rounded-xl bg-gray-100 px-3 py-2 text-xs font-bold text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    <XCircle size={14} /> Dismiss
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default AnomalyDetectionTab;
