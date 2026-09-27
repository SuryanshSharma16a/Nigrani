// File: src/config/checklist.js

export const INSPECTION_CHECKLIST = [
  {
    id: 'infra',
    sectionId: 'infra',
    sectionTitle: 'Infrastructure & Safety',
    weight: 25,
    icon: 'Building2',
    description: 'Physical building safety, sanitation, accessibility, and emergency readiness.',
    items: [
      {
        id: 'infra-1',
        code: 'INFRA_01',
        text: 'Building structure in safe, habitable condition with ramp access & fire safety readiness',
        maxPoints: 10,
        guideline: 'Verify structural stability, working fire extinguishers, clear emergency exits, and wheelchair ramp access at entrance.',
      },
      {
        id: 'infra-2',
        code: 'INFRA_02',
        text: 'Clean drinking water filtration plant & hygienic segregated toilet facilities',
        maxPoints: 10,
        guideline: 'Check water filter service log, TDS meter reading, and cleanliness/running water in separate male/female/transgender restrooms.',
      },
      {
        id: 'infra-3',
        code: 'INFRA_03',
        text: 'Per-capita room ventilation, bed spacing, and functional CCTV camera network',
        maxPoints: 10,
        guideline: 'Ensure minimum 40 sq ft space per inmate, clean bedding, functional lighting, and 30-day recording backup on NVR/CCTV.',
      },
    ],
  },
  {
    id: 'staff',
    sectionId: 'staff',
    sectionTitle: 'Staffing & Administrative Compliance',
    weight: 25,
    icon: 'Users',
    description: 'Sanctioned staff availability, attendance logs, and verified caretakers.',
    items: [
      {
        id: 'staff-1',
        code: 'STAFF_01',
        text: 'Resident Superintendent / Warden physically present with verified biometric attendance',
        maxPoints: 10,
        guideline: 'Cross-check physical presence of Warden with daily biometric log and official appointment letter.',
      },
      {
        id: 'staff-2',
        code: 'STAFF_02',
        text: 'Medical officer / qualified counselor on-call with maintained health registers',
        maxPoints: 10,
        guideline: 'Inspect beneficiary medical checkup register, emergency doctor contact list, and first-aid kit expiry dates.',
      },
      {
        id: 'staff-3',
        code: 'STAFF_03',
        text: 'Police verification certificates & food safety training for kitchen/support staff',
        maxPoints: 10,
        guideline: 'Verify PVR reports for all security guards, cooks, and cleaning staff to ensure safety of inmates.',
      },
    ],
  },
  {
    id: 'welfare',
    sectionId: 'welfare',
    sectionTitle: 'Beneficiary Welfare & Rights',
    weight: 25,
    icon: 'HeartHandshake',
    description: 'Dietary chart adherence, educational kits, and grievance redressal.',
    items: [
      {
        id: 'welfare-1',
        code: 'WELFARE_01',
        text: 'Inmate headcount matches sanctioned capacity and dietary menu chart',
        maxPoints: 10,
        guideline: 'Conduct physical roll call of beneficiaries against official register and inspect today’s cooked meal sample.',
      },
      {
        id: 'welfare-2',
        code: 'WELFARE_02',
        text: 'Distribution of educational/vocational kits, uniforms, and personal hygiene items',
        maxPoints: 10,
        guideline: 'Check stock distribution register signed by beneficiaries for textbooks, uniforms, soap, and personal care kits.',
      },
      {
        id: 'welfare-3',
        code: 'WELFARE_03',
        text: 'Prominently displayed DoSJE toll-free grievance helpline (14567) & suggestion box',
        maxPoints: 10,
        guideline: 'Verify sealed grievance box at main entrance and toll-free helpline number painted clearly on main wall.',
      },
    ],
  },
  {
    id: 'finance',
    sectionId: 'finance',
    sectionTitle: 'Financial Compliance & PFMS Audit',
    weight: 25,
    icon: 'Receipt',
    description: 'Grant utilization certificates, bank reconciliation, and DBT records.',
    items: [
      {
        id: 'finance-1',
        code: 'FINANCE_01',
        text: 'Direct Benefit Transfer (DBT) and monthly maintenance allowance disbursed on time',
        maxPoints: 10,
        guideline: 'Verify PFMS transaction receipts for beneficiary account credits without unauthorized cash payouts.',
      },
      {
        id: 'finance-2',
        code: 'FINANCE_02',
        text: 'Grant-in-Aid (GIA) Utilization Certificate (UC) filed on PFMS with audited balance sheet',
        maxPoints: 10,
        guideline: 'Check latest GIA sanction order date, Form 12-A UC submission timestamp, and chartered accountant audit report.',
      },
      {
        id: 'finance-3',
        code: 'FINANCE_03',
        text: 'Asset register up to date with zero discrepancies during physical spot audit',
        maxPoints: 10,
        guideline: 'Spot check furniture, computers, water purifiers, and generators against fixed asset barcode numbers.',
      },
    ],
  },
];

export const TOTAL_CHECKLIST_ITEMS = INSPECTION_CHECKLIST.reduce(
  (sum, sec) => sum + sec.items.length,
  0
);
