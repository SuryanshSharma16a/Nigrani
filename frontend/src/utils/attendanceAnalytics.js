// File: src/utils/attendanceAnalytics.js

export function generateAttendanceAnalytics(institutions = []) {
  // Generate 30-day daily trend series
  const dailyTrends = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    const dayLabel = `${d.getDate()} ${d.toLocaleDateString('en-US', { month: 'short' })}`;
    const baseRate = 88 + Math.floor(Math.sin(i / 3) * 6);
    return {
      date: dayLabel,
      attendanceRate: baseRate,
      presentInmates: Math.round((baseRate / 100) * 1650),
      totalSanctioned: 1650,
    };
  });

  // Per-institution attendance stats
  const institutionStats = institutions.map((inst, idx) => {
    const currentPct = inst.status === 'non-compliant' ? 64 : inst.status === 'minor deficit' ? 78 : 92 + (idx % 4);
    const avg7d = Math.min(100, currentPct + (idx % 2 === 0 ? 2 : -3));
    const avg30d = Math.min(100, currentPct + (idx % 2 === 0 ? 4 : -2));
    const trend = currentPct > avg30d ? 'up' : currentPct < avg30d ? 'down' : 'stable';

    return {
      institutionId: inst.id,
      institutionName: inst.name,
      schemeName: inst.schemeName,
      city: inst.city,
      state: inst.state,
      currentPct,
      avg7d,
      avg30d,
      trend,
    };
  });

  // Scheme averages
  const schemeAverages = [
    { scheme: 'PM-AJAY', avgAttendance: 91 },
    { scheme: 'PM-YASASVI', avgAttendance: 84 },
    { scheme: 'SMILE', avgAttendance: 95 },
    { scheme: 'TAPAS', avgAttendance: 86 },
    { scheme: 'SACRED', avgAttendance: 88 },
    { scheme: 'SHREYAS', avgAttendance: 93 },
  ];

  // Proxy incidents
  const proxyIncidents = [
    {
      id: 'proxy-101',
      institutionName: 'Savitribai Phule Girls Hostel for OBC Students',
      date: new Date(Date.now() - 86400000 * 1).toISOString(),
      suspectedCount: 6,
      reason: 'Biometric timestamp collision (6 fingerprint scans registered within 4 seconds)',
      confidence: 96,
      status: 'Under Inquiry',
    },
    {
      id: 'proxy-102',
      institutionName: 'Jagjivan Ram SC Welfare Ashram School',
      date: new Date(Date.now() - 86400000 * 3).toISOString(),
      suspectedCount: 4,
      reason: 'Facial recognition match confidence <60% during morning biometric roll call',
      confidence: 89,
      status: 'Warden Flagged',
    },
  ];

  return {
    dailyTrends,
    institutionStats,
    schemeAverages,
    proxyIncidents,
  };
}
