// File: src/components/admin/AttendanceAnalyticsTab.jsx
import React, { useState } from 'react';
import { UserCheck, ShieldAlert, ArrowUpRight, ArrowDownRight, Minus, CheckCircle2 } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card } from '../common/Card';
import { KpiCard } from '../common/KpiCard';
import { ProgressBar } from '../common/ProgressBar';
import { generateAttendanceAnalytics } from '../../utils/attendanceAnalytics';
import { SEED_INSTITUTIONS } from '../../data/institutions';
import { fmtDate } from '../../utils/helpers';
import { COLOR_TOKENS, CARD_SHADOW } from '../../config/constants';

export function AttendanceAnalyticsTab() {
  const [data] = useState(() => generateAttendanceAnalytics(SEED_INSTITUTIONS));
  const [proxyLogs, setProxyLogs] = useState(data.proxyIncidents);

  const handleResolveProxy = (id) => {
    setProxyLogs((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6 pb-12">
      {/* KPI Cards Header */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <KpiCard
          icon={UserCheck}
          label="Today's Average Attendance"
          value="89.4%"
          sub="Across 1,650 sanctioned inmates"
          color={COLOR_TOKENS.indigo}
          softBg={COLOR_TOKENS.indigoSoft}
        />

        <KpiCard
          icon={UserCheck}
          label="7-Day Rolling Average"
          value="90.2%"
          sub="Stable biometric logging"
          color={COLOR_TOKENS.green}
          softBg={COLOR_TOKENS.greenSoft}
        />

        <KpiCard
          icon={ShieldAlert}
          label="Suspected Proxy Scans"
          value={proxyLogs.length}
          sub="Requires biometric verification"
          color={COLOR_TOKENS.red}
          softBg={COLOR_TOKENS.redSoft}
        />
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* 30-Day Daily Attendance Trend */}
        <Card title="30-Day Daily Inmate Attendance Trend" subtitle="Synced via Aadhaar biometric terminals" className="lg:col-span-2">
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.dailyTrends} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F6" vertical={false} />
                <XAxis dataKey="date" stroke="#8A8FA3" fontSize={10} tickLine={false} />
                <YAxis domain={[70, 100]} stroke="#8A8FA3" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    boxShadow: CARD_SHADOW,
                    border: 'none',
                    fontSize: '12px',
                  }}
                />
                <Line type="monotone" dataKey="attendanceRate" name="Attendance (%)" stroke={COLOR_TOKENS.indigo} strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Scheme Attendance Rate Bar Chart */}
        <Card title="Average Attendance by Scheme" subtitle="Comparative analysis">
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.schemeAverages} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F6" vertical={false} />
                <XAxis dataKey="scheme" stroke="#8A8FA3" fontSize={10} tickLine={false} />
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
                <Bar dataKey="avgAttendance" name="Avg Rate (%)" fill={COLOR_TOKENS.indigo} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Proxy Biometric Detection Section */}
      <Card title="Proxy Biometric Detection Alerts" subtitle="AI detection of fingerprint spoofing or rapid double-scans">
        {proxyLogs.length === 0 ? (
          <p className="p-4 text-xs text-gray-500 text-center">Zero proxy incidents flagged in current period.</p>
        ) : (
          <div className="space-y-3 p-4">
            {proxyLogs.map((p) => (
              <div key={p.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl bg-red-50/70 border border-red-200 p-4">
                <div className="flex items-start gap-3">
                  <ShieldAlert size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-red-950">{p.institutionName}</h4>
                    <p className="text-xs text-red-700 mt-0.5">{p.reason}</p>
                    <span className="text-[10px] text-red-500 font-mono mt-1 block">
                      {p.suspectedCount} suspected scans · {fmtDate(p.date, true)} · {p.confidence}% AI Confidence
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleResolveProxy(p.id)}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-700 transition-colors shadow-xs"
                >
                  <CheckCircle2 size={14} /> Verify & Clear Alert
                </button>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Institution Biometric Attendance Table */}
      <Card title="Institution-wise Attendance Register" subtitle="Real-time 7-day and 30-day moving averages">
        <div className="overflow-x-auto nigrani-scroll">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b bg-gray-50/80 font-bold uppercase tracking-wider text-[11px] text-gray-500" style={{ borderColor: COLOR_TOKENS.border }}>
                <th className="px-5 py-3">Institution</th>
                <th className="px-4 py-3">Scheme</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Today's Attendance</th>
                <th className="px-4 py-3">7-Day Avg</th>
                <th className="px-4 py-3">30-Day Avg</th>
                <th className="px-4 py-3 text-right">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: COLOR_TOKENS.border }}>
              {data.institutionStats.map((stat) => (
                <tr key={stat.institutionId} className="hover:bg-gray-50/60">
                  <td className="px-5 py-3.5 font-bold text-gray-900">{stat.institutionName}</td>
                  <td className="px-4 py-3.5 font-semibold text-indigo-600">{stat.schemeName}</td>
                  <td className="px-4 py-3.5 text-gray-600">{stat.city}, {stat.state}</td>
                  <td className="px-4 py-3.5 min-w-[130px]">
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{stat.currentPct}%</span>
                      <ProgressBar value={stat.currentPct} color={stat.currentPct >= 85 ? COLOR_TOKENS.green : COLOR_TOKENS.red} width="w-14" />
                    </div>
                  </td>
                  <td className="px-4 py-3.5 font-semibold text-gray-700">{stat.avg7d}%</td>
                  <td className="px-4 py-3.5 font-semibold text-gray-700">{stat.avg30d}%</td>
                  <td className="px-4 py-3.5 text-right font-bold">
                    {stat.trend === 'up' ? (
                      <span className="inline-flex items-center text-emerald-600"><ArrowUpRight size={14} /> Rising</span>
                    ) : stat.trend === 'down' ? (
                      <span className="inline-flex items-center text-red-500"><ArrowDownRight size={14} /> Falling</span>
                    ) : (
                      <span className="inline-flex items-center text-gray-500"><Minus size={14} /> Stable</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default AttendanceAnalyticsTab;
