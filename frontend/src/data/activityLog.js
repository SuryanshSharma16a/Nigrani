// File: src/data/activityLog.js

export function generateSeedActivityLog(institutions = [], inspections = []) {
  const now = new Date();
  
  const subtractHours = (date, hours) => {
    const d = new Date(date);
    d.setHours(d.getHours() - hours);
    return d.toISOString();
  };

  const logs = [
    {
      id: "log-1",
      type: "inspection_submitted",
      actor: "Rohan Verma",
      actorRole: "inspector",
      institutionName: "Ashray Senior Citizens Home",
      description: "Submitted inspection report — Score: 92%",
      timestamp: subtractHours(now, 1),
      severity: "success"
    },
    {
      id: "log-2",
      type: "anomaly_detected",
      actor: "Nigrani AI",
      actorRole: "system",
      institutionName: "Dr. Ambedkar SC Boys Hostel",
      description: "AI detected attendance anomaly — 30% drop over 3 days.",
      timestamp: subtractHours(now, 2),
      severity: "warning"
    },
    {
      id: "log-3",
      type: "escalation",
      actor: "Ananya Rao",
      actorRole: "admin",
      institutionName: "Punarjeevan De-Addiction Centre",
      description: "Escalated to State Nodal Officer due to critical compliance failure.",
      timestamp: subtractHours(now, 5),
      severity: "critical"
    },
    {
      id: "log-4",
      type: "cctv_alert",
      actor: "System Monitor",
      actorRole: "system",
      institutionName: "Garima Greh, Sector 12",
      description: "CCTV offline for 4+ hours.",
      timestamp: subtractHours(now, 18),
      severity: "critical"
    },
    {
      id: "log-5",
      type: "vc_call",
      actor: "Ananya Rao",
      actorRole: "admin",
      institutionName: "Sahara De-Addiction Centre",
      description: "Random VC call completed with NGO staff — Duration: 8 min.",
      timestamp: subtractHours(now, 22),
      severity: "info"
    },
    {
      id: "log-6",
      type: "login",
      actor: "Suresh Kumar",
      actorRole: "ngo",
      institutionName: "Ashray Senior Citizens Home",
      description: "Logged into the NGO portal.",
      timestamp: subtractHours(now, 24),
      severity: "info"
    },
    {
      id: "log-7",
      type: "assignment_created",
      actor: "Nigrani AI",
      actorRole: "system",
      institutionName: "Umeed Special School",
      description: "Auto-assigned random inspection to Inspector Amit Singh.",
      timestamp: subtractHours(now, 36),
      severity: "info"
    },
    {
      id: "log-8",
      type: "flag_changed",
      actor: "Ananya Rao",
      actorRole: "admin",
      institutionName: "Garima Greh, Sector 12",
      description: "Flagged institution for manual review following CCTV outage.",
      timestamp: subtractHours(now, 40),
      severity: "warning"
    },
    {
      id: "log-9",
      type: "inspection_submitted",
      actor: "Priya Sharma",
      actorRole: "inspector",
      institutionName: "Sahara De-Addiction Centre",
      description: "Submitted inspection report — Score: 78%",
      timestamp: subtractHours(now, 48),
      severity: "success"
    },
    {
      id: "log-10",
      type: "anomaly_detected",
      actor: "Nigrani AI",
      actorRole: "system",
      institutionName: "Umeed Special School",
      description: "Financial mismatch detected in Q3 utilization certificate.",
      timestamp: subtractHours(now, 56),
      severity: "critical"
    },
    {
      id: "log-11",
      type: "vc_call",
      actor: "Ananya Rao",
      actorRole: "admin",
      institutionName: "Dr. Ambedkar SC Boys Hostel",
      description: "Random VC call completed with beneficiaries — Duration: 12 min.",
      timestamp: subtractHours(now, 72),
      severity: "info"
    },
    {
      id: "log-12",
      type: "cctv_alert",
      actor: "System Monitor",
      actorRole: "system",
      institutionName: "Punarjeevan De-Addiction Centre",
      description: "CCTV connection restored after 2 hours downtime.",
      timestamp: subtractHours(now, 80),
      severity: "success"
    },
    {
      id: "log-13",
      type: "assignment_created",
      actor: "Nigrani AI",
      actorRole: "system",
      institutionName: "Sahara De-Addiction Centre",
      description: "Auto-assigned follow-up inspection to Inspector Rohan Verma.",
      timestamp: subtractHours(now, 96),
      severity: "info"
    },
    {
      id: "log-14",
      type: "inspection_submitted",
      actor: "Amit Singh",
      actorRole: "inspector",
      institutionName: "Dr. Ambedkar SC Boys Hostel",
      description: "Submitted inspection report — Score: 64% (Minor Deficit).",
      timestamp: subtractHours(now, 110),
      severity: "warning"
    },
    {
      id: "log-15",
      type: "login",
      actor: "Rohan Verma",
      actorRole: "inspector",
      institutionName: "Multiple",
      description: "Inspector started duty and synced offline data.",
      timestamp: subtractHours(now, 120),
      severity: "info"
    }
  ];

  return logs;
}
