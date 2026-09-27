// File: src/context/AppContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { SEED_INSTITUTIONS } from '../data/institutions';
import { generateSeedInspections } from '../data/inspections';
import { storage } from '../utils/storage';
import { calculateChecklistScore, uid } from '../utils/helpers';

const STORAGE_KEYS = {
  INSTITUTIONS: 'nigrani_institutions_v2',
  INSPECTIONS: 'nigrani_inspections_v2',
  ROLE: 'nigrani_user_role',
};

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // 1. Initial State Load with Storage Fallback
  const [institutions, setInstitutions] = useState(() => {
    const saved = storage.get(STORAGE_KEYS.INSTITUTIONS, null);
    return saved && Array.isArray(saved) && saved.length > 0 ? saved : SEED_INSTITUTIONS;
  });

  const [inspections, setInspections] = useState(() => {
    const saved = storage.get(STORAGE_KEYS.INSPECTIONS, null);
    if (saved && Array.isArray(saved) && saved.length > 0) return saved;
    return generateSeedInspections(SEED_INSTITUTIONS);
  });

  const [userRole, setUserRole] = useState(() => {
    return storage.get(STORAGE_KEYS.ROLE, 'admin'); // 'inspector' | 'admin'
  });

  // UI Navigation & Filters state
  const [activeTab, setActiveTab] = useState('overview'); // overview | institutions | inspections | flagged | analytics
  const [selectedInstitutionId, setSelectedInstitutionId] = useState(null);
  const [selectedInspectionId, setSelectedInspectionId] = useState(null);

  const [filters, setFilters] = useState({
    scheme: 'ALL',
    state: 'ALL',
    status: 'ALL',
    search: '',
  });

  // Sync states to LocalStorage
  useEffect(() => {
    storage.set(STORAGE_KEYS.INSTITUTIONS, institutions);
  }, [institutions]);

  useEffect(() => {
    storage.set(STORAGE_KEYS.INSPECTIONS, inspections);
  }, [inspections]);

  useEffect(() => {
    storage.set(STORAGE_KEYS.ROLE, userRole);
  }, [userRole]);

  // Actions & Mutators
  const addInspection = (inspectionData) => {
    const newId = uid('insp');
    const nowIso = new Date().toISOString();

    const scoreResult = calculateChecklistScore(inspectionData.answers || {});
    const isFlagged = inspectionData.flagged || scoreResult.score < 75;

    const newInspection = {
      id: newId,
      institutionId: inspectionData.institutionId,
      inspectorName: inspectionData.inspectorName || 'Rohan Verma',
      date: nowIso,
      answers: inspectionData.answers || {},
      score: scoreResult.score,
      flagged: isFlagged,
      escalated: isFlagged && scoreResult.score < 55,
      remark: inspectionData.remark || 'Inspection submitted via mobile field application.',
      gps: inspectionData.gps || { lat: 28.6139, lng: 77.2090, approx: true },
      photos: inspectionData.photos || [],
      status: isFlagged ? (scoreResult.score < 55 ? 'escalated' : 'non-compliant') : scoreResult.status,
    };

    setInspections((prev) => [newInspection, ...prev]);

    // Update parent institution's compliance status and last inspected date
    setInstitutions((prev) =>
      prev.map((inst) => {
        if (inst.id === inspectionData.institutionId) {
          return {
            ...inst,
            lastInspectedDate: nowIso,
            overallScore: scoreResult.score,
            status: isFlagged ? (scoreResult.score < 55 ? 'escalated' : 'non-compliant') : scoreResult.status,
          };
        }
        return inst;
      })
    );

    return newInspection;
  };

  const updateInstitution = (instId, updatedFields) => {
    setInstitutions((prev) =>
      prev.map((inst) => (inst.id === instId ? { ...inst, ...updatedFields } : inst))
    );
  };

  const toggleEscalation = (instId) => {
    setInstitutions((prev) =>
      prev.map((inst) => {
        if (inst.id === instId) {
          const newStatus = inst.status === 'escalated' ? 'minor deficit' : 'escalated';
          return { ...inst, status: newStatus };
        }
        return inst;
      })
    );
  };

  const resolveEscalation = (instId, resolutionNotes) => {
    setInstitutions((prev) =>
      prev.map((inst) => {
        if (inst.id === instId) {
          return {
            ...inst,
            status: 'compliant',
            resolutionNotes,
            resolvedAt: new Date().toISOString(),
          };
        }
        return inst;
      })
    );
  };

  const resetDataToDefault = () => {
    storage.clear();
    const freshInspections = generateSeedInspections(SEED_INSTITUTIONS);
    setInstitutions(SEED_INSTITUTIONS);
    setInspections(freshInspections);
    setSelectedInstitutionId(null);
    setSelectedInspectionId(null);
    setFilters({ scheme: 'ALL', state: 'ALL', status: 'ALL', search: '' });
  };

  const value = {
    institutions,
    inspections,
    userRole,
    setUserRole,
    activeTab,
    setActiveTab,
    selectedInstitutionId,
    setSelectedInstitutionId,
    selectedInspectionId,
    setSelectedInspectionId,
    filters,
    setFilters,
    addInspection,
    updateInstitution,
    toggleEscalation,
    resolveEscalation,
    resetDataToDefault,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export default AppContext;
