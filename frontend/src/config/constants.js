// File: src/config/constants.js

export const COLOR_TOKENS = {
  bg: '#F4F5FA',
  card: '#FFFFFF',
  border: '#EEF0F6',
  ink: '#1E1B2E',
  inkMuted: '#8A8FA3',
  indigo: '#635BFF',
  indigoSoft: '#EEEDFF',
  indigoLight: '#A78BFA',
  green: '#16A34A',
  greenSoft: '#DCFCE7',
  orange: '#F97316',
  orangeSoft: '#FFEDD5',
  red: '#EF4444',
  redSoft: '#FEE2E2',
  blue: '#3B82F6',
  blueSoft: '#DBEAFE',
  purple: '#8B5CF6',
  purpleSoft: '#F3E8FF',
  emerald: '#10B981',
  emeraldSoft: '#D1FAE5',
};

// Shorthand alias for light mode
export const C = COLOR_TOKENS;

export const C_DARK = {
  bg: '#0F1117',
  card: '#1A1D2E',
  border: '#2A2D3E',
  ink: '#E8E9F0',
  inkMuted: '#8A8FA3',
  indigo: '#635BFF',
  indigoSoft: '#EEEDFF',
  indigoLight: '#A78BFA',
  green: '#16A34A',
  greenSoft: '#DCFCE7',
  orange: '#F97316',
  orangeSoft: '#FFEDD5',
  red: '#EF4444',
  redSoft: '#FEE2E2',
  blue: '#3B82F6',
  blueSoft: '#DBEAFE',
  purple: '#8B5CF6',
  purpleSoft: '#F3E8FF',
  emerald: '#10B981',
  emeraldSoft: '#D1FAE5',
};

export const getThemeColors = (theme) => {
  return theme === 'dark' ? C_DARK : C;
};

export const CARD_SHADOW = '0 1px 2px rgba(30,27,46,0.04), 0 8px 24px rgba(30,27,46,0.06)';
export const CARD_SHADOW_DARK = '0 1px 2px rgba(0,0,0,0.2), 0 8px 24px rgba(0,0,0,0.4)';
export const CARD_SHADOW_HOVER = '0 4px 6px rgba(30,27,46,0.06), 0 12px 32px rgba(30,27,46,0.12)';

export const APP_CONFIG = {
  name: 'Nigrani',
  tagline: 'Smart Real-Time Monitoring & Inspection Mobile App for DoSJE',
  ministry: 'Department of Social Justice and Empowerment',
  government: 'Government of India',
  version: '2.4.0-SIH2025',
  defaultInspectorName: 'Rohan Verma',
  defaultAdminName: 'Ananya Rao',
};

export const SCORE_THRESHOLDS = {
  EXCELLENT: 85,
  GOOD: 70,
  CRITICAL: 50,
};

export const STATUS_CONFIG = {
  compliant: {
    label: 'Compliant',
    bg: COLOR_TOKENS.greenSoft,
    fg: COLOR_TOKENS.green,
    dot: COLOR_TOKENS.green,
    description: 'Institution meets or exceeds all mandated compliance standards.',
  },
  'minor deficit': {
    label: 'Minor Deficit',
    bg: COLOR_TOKENS.orangeSoft,
    fg: COLOR_TOKENS.orange,
    dot: COLOR_TOKENS.orange,
    description: 'Minor non-critical gaps identified requiring routine rectification.',
  },
  'non-compliant': {
    label: 'Non-Compliant',
    bg: COLOR_TOKENS.redSoft,
    fg: COLOR_TOKENS.red,
    dot: COLOR_TOKENS.red,
    description: 'Critical compliance failures detected. Immediate remediation action required.',
  },
  escalated: {
    label: 'Escalated',
    bg: '#FEE2E2',
    fg: '#B91C1C',
    dot: '#B91C1C',
    description: 'Issue escalated to Ministry District Nodal Officer for statutory inquiry.',
  },
  due: {
    label: 'Inspection Due',
    bg: COLOR_TOKENS.blueSoft,
    fg: COLOR_TOKENS.blue,
    dot: COLOR_TOKENS.blue,
    description: 'Scheduled inspection window open for field officer visit.',
  },
};

export const GLOBAL_APP_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
.nigrani-root { font-family: 'Inter', system-ui, sans-serif; color: ${COLOR_TOKENS.ink}; }
`;
