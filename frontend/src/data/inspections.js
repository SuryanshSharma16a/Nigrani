// File: src/data/inspections.js
import { INSPECTION_CHECKLIST } from '../config/checklist';

export function generateSeedInspections(institutions = []) {
  const inspections = [];

  institutions.forEach((inst, idx) => {
    if (!inst.lastInspectedDate) return;

    const answers = {};
    let yesCount = 0;
    let noCount = 0;

    INSPECTION_CHECKLIST.forEach((section, sIdx) => {
      section.items.forEach((item, iIdx) => {
        const isDeficitItem =
          (inst.status === 'non-compliant' || inst.status === 'escalated') && (sIdx + iIdx) % 3 === 0;
        const isMinorItem = inst.status === 'minor deficit' && (sIdx + iIdx) % 4 === 0;

        const isNo = isDeficitItem || isMinorItem;
        if (isNo) noCount++;
        else yesCount++;

        answers[item.id] = {
          value: isNo ? 'no' : 'yes',
          remark: isNo
            ? `Deficiency observed: ${item.text.split('&')[0]} failed mandatory verification parameters.`
            : 'Verified and compliant during physical inspection.',
        };
      });
    });

    const totalEval = yesCount + noCount;
    const score = totalEval === 0 ? 100 : Math.round((yesCount / totalEval) * 100);

    const isFlagged = inst.status === 'non-compliant' || inst.status === 'escalated';

    inspections.push({
      id: `insp-${idx + 101}`,
      institutionId: inst.id,
      institutionName: inst.name,
      schemeName: inst.schemeName,
      inspectorName: idx % 2 === 0 ? 'Rohan Verma' : 'Meera Nair',
      inspectorDesignation: idx % 2 === 0 ? 'District Social Welfare Officer' : 'Assistant Nodal Officer',
      inspectorBadgeId: idx % 2 === 0 ? 'DSWO-DEL-402' : 'ANO-UP-918',
      date: inst.lastInspectedDate,
      answers,
      score: inst.overallScore || score,
      flagged: isFlagged,
      escalated: inst.status === 'escalated',
      status: inst.status,
      remark: isFlagged
        ? 'Critical non-compliance detected in financial records and staff presence. Escalation report initiated for state nodal officer.'
        : inst.status === 'minor deficit'
        ? 'Minor maintenance and register discrepancies noted. 14-day rectification window granted.'
        : 'Inspection completed smoothly. High compliance standard observed across all 4 parameters.',
      gps: {
        lat: inst.lat + (idx % 2 === 0 ? 0.0012 : -0.0008),
        lng: inst.lng + (idx % 2 === 0 ? 0.0015 : -0.0009),
        approx: false,
        verifiedGeoDistanceKm: 0.15,
        geoMatched: true,
      },
      photos: [
        {
          id: `photo-${idx}-1`,
          caption: 'Main Entrance & DoSJE Helpline Display',
          url: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=400&q=80',
          timestamp: inst.lastInspectedDate,
          geotagged: true,
        },
        {
          id: `photo-${idx}-2`,
          caption: 'Kitchen & Meal Quality Audit',
          url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80',
          timestamp: inst.lastInspectedDate,
          geotagged: true,
        },
      ],
      aiAnomalyAnalysis: {
        anomalyDetected: isFlagged,
        headcountMismatch: isFlagged ? 14 : 0,
        facialVerificationConfidence: isFlagged ? 74 : 98,
        geoFenceStatus: 'VALID_ON_SITE',
        riskCategory: isFlagged ? 'HIGH' : inst.status === 'minor deficit' ? 'MEDIUM' : 'LOW',
      },
    });
  });

  return inspections;
}
