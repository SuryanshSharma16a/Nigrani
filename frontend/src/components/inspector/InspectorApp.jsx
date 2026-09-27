// File: src/components/inspector/InspectorApp.jsx
import React, { useState } from 'react';
import { PhoneFrame } from './PhoneFrame';
import { InspectorHome } from './InspectorHome';
import { ChecklistFlow } from './ChecklistFlow';
import { InspectorSuccess } from './InspectorSuccess';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';
import { useApp } from '../../context/AppContext';

export function InspectorApp() {
  const { institutions, addInspection } = useApp();
  const { isOnline, manualOffline, toggleManualOffline } = useOnlineStatus();

  const [currentScreen, setCurrentScreen] = useState('home'); // home | checklist | success
  const [activeInstitution, setActiveInstitution] = useState(null);
  const [pendingQueue, setPendingQueue] = useState([]);
  const [lastSubmissionResult, setLastSubmissionResult] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleStartChecklist = (inst) => {
    setActiveInstitution(inst);
    setCurrentScreen('checklist');
  };

  const handleFinishChecklist = (payload) => {
    const inspectionRecord = {
      institutionId: activeInstitution.id,
      ...payload,
    };

    if (manualOffline || !isOnline) {
      setPendingQueue((prev) => [...prev, inspectionRecord]);
    } else {
      addInspection(inspectionRecord);
    }

    setLastSubmissionResult(payload);
    setCurrentScreen('success');
  };

  const handleSyncNow = () => {
    if (pendingQueue.length === 0) return;
    setIsSyncing(true);
    setTimeout(() => {
      pendingQueue.forEach((rec) => addInspection(rec));
      setPendingQueue([]);
      setIsSyncing(false);
    }, 1200);
  };

  return (
    <PhoneFrame>
      {currentScreen === 'home' && (
        <InspectorHome
          institutions={institutions}
          pendingCount={pendingQueue.length}
          isOffline={manualOffline || !isOnline}
          onToggleOffline={toggleManualOffline}
          onOpenChecklist={handleStartChecklist}
          onSyncNow={handleSyncNow}
          isSyncing={isSyncing}
        />
      )}

      {currentScreen === 'checklist' && activeInstitution && (
        <ChecklistFlow
          institution={activeInstitution}
          onCancel={() => {
            setCurrentScreen('home');
            setActiveInstitution(null);
          }}
          onFinish={handleFinishChecklist}
        />
      )}

      {currentScreen === 'success' && (
        <InspectorSuccess
          flagged={lastSubmissionResult?.flagged}
          escalated={lastSubmissionResult?.score < 55}
          score={lastSubmissionResult?.score || 85}
          onDone={() => {
            setCurrentScreen('home');
            setActiveInstitution(null);
          }}
        />
      )}
    </PhoneFrame>
  );
}

export default InspectorApp;
