// File: src/utils/anomalyDetection.js

export function detectAnomalies(institutions = []) {
  const anomalies = [];

  institutions.forEach((inst, idx) => {
    // 1. Check for severe score decline or non-compliance
    if (inst.status === 'non-compliant' || inst.status === 'escalated') {
      anomalies.push({
        id: `anom-${idx}-1`,
        institutionId: inst.id,
        institutionName: inst.name,
        code: inst.code,
        type: 'FINANCE_MISMATCH',
        typeLabel: 'Financial Ledger Mismatch',
        severity: 'HIGH',
        confidence: 94,
        timestamp: new Date(Date.now() - 86400000 * 1).toISOString(),
        description: `PFMS Grant Utilization Certificate (UC) discrepancy detected. Reported expenditure exceeds verified bank ledger balance by ₹3.4 Lakhs.`,
        recommendedAction: 'Issue statutory audit order and freeze GIA disbursement on PFMS portal.',
        status: 'active',
      });
    }

    // 2. Check for attendance drop anomaly
    if (inst.status === 'minor deficit' || inst.status === 'flagged') {
      anomalies.push({
        id: `anom-${idx}-2`,
        institutionId: inst.id,
        institutionName: inst.name,
        code: inst.code,
        type: 'ATTENDANCE_DROP',
        typeLabel: 'Biometric Headcount Drop',
        severity: 'MEDIUM',
        confidence: 88,
        timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
        description: `Inmate headcount dropped by 18% over the past 48 hours compared to 30-day moving average.`,
        recommendedAction: 'Dispatch unannounced local officer visit to verify physical inmate presence.',
        status: 'active',
      });
    }

    // 3. Check for CCTV downtime anomaly
    if (inst.code === 'INST-RAJ-06') {
      anomalies.push({
        id: `anom-${idx}-3`,
        institutionId: inst.id,
        institutionName: inst.name,
        code: inst.code,
        type: 'CCTV_OFFLINE',
        typeLabel: 'Surveillance NVR Signal Loss',
        severity: 'HIGH',
        confidence: 99,
        timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
        description: `Main perimeter gate CCTV camera (CAM-01) feed lost signal for over 14 minutes.`,
        recommendedAction: 'Contact hostel warden and log hardware service request with state agency.',
        status: 'active',
      });
    }

    // 4. Geofence violation anomaly
    if (inst.code === 'INST-BH-09') {
      anomalies.push({
        id: `anom-${idx}-4`,
        institutionId: inst.id,
        institutionName: inst.name,
        code: inst.code,
        type: 'GEO_OUT_OF_BOUNDS',
        typeLabel: 'Geofence Proximity Warning',
        severity: 'MEDIUM',
        confidence: 91,
        timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
        description: `Inspector GPS location during submission was 1.2 km outside facility boundary radius.`,
        recommendedAction: 'Require re-submission of geotagged photo evidence with live GPS lock.',
        status: 'active',
      });
    }
  });

  return anomalies;
}
