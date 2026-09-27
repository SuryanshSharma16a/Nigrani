// File: src/components/admin/AdminDashboard.jsx
import React, { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { Topbar } from './Topbar';
import { OverviewTab } from './OverviewTab';
import { InstitutionsTab } from './InstitutionsTab';
import { FlaggedTab } from './FlaggedTab';
import { CCTVMonitoringTab } from './CCTVMonitoringTab';
import { VideoConferenceTab } from './VideoConferenceTab';
import { RandomAssignmentTab } from './RandomAssignmentTab';
import { AnomalyDetectionTab } from './AnomalyDetectionTab';
import { AttendanceAnalyticsTab } from './AttendanceAnalyticsTab';
import { GeoFencingMap } from './GeoFencingMap';
import { ReportsTab } from './ReportsTab';
import { NotificationsPanel } from './NotificationsPanel';
import { InstitutionDrawer } from './InstitutionDrawer';
import { useApp } from '../../context/AppContext';
import { COLOR_TOKENS } from '../../config/constants';

export function AdminDashboard() {
  const {
    institutions,
    inspections,
    activeTab,
    setActiveTab,
    selectedInstitutionId,
    setSelectedInstitutionId,
    toggleEscalation,
    resolveEscalation,
  } = useApp();

  const [globalSearch, setGlobalSearch] = useState('');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const selectedInstitution = institutions.find(
    (i) => i.id === selectedInstitutionId
  );

  const flaggedCount = institutions.filter(
    (i) => i.status === 'flagged' || i.status === 'non-compliant' || i.status === 'escalated'
  ).length;

  return (
    <div className="nigrani-root flex min-h-screen" style={{ backgroundColor: COLOR_TOKENS.bg }}>
      {/* Sidebar Navigation */}
      <AdminSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        flaggedCount={flaggedCount}
      />

      {/* Main View Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar
          searchValue={globalSearch}
          onSearchChange={setGlobalSearch}
          notificationCount={flaggedCount}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
        />

        <main className="flex-1 overflow-y-auto px-8 pt-6 nigrani-scroll">
          {activeTab === 'overview' && (
            <OverviewTab
              institutions={institutions}
              inspections={inspections}
              onSelectInstitution={(id) => setSelectedInstitutionId(id)}
              onViewAllInstitutions={() => setActiveTab('institutions')}
              onViewFlagged={() => setActiveTab('flagged')}
            />
          )}

          {activeTab === 'institutions' && (
            <InstitutionsTab
              institutions={institutions}
              onSelectInstitution={(id) => setSelectedInstitutionId(id)}
            />
          )}

          {activeTab === 'flagged' && (
            <FlaggedTab
              institutions={institutions}
              onSelectInstitution={(id) => setSelectedInstitutionId(id)}
              onToggleEscalation={toggleEscalation}
              onResolveEscalation={resolveEscalation}
            />
          )}

          {activeTab === 'cctv' && <CCTVMonitoringTab />}

          {activeTab === 'videoconf' && <VideoConferenceTab />}

          {activeTab === 'assignment' && <RandomAssignmentTab />}

          {activeTab === 'anomaly' && (
            <AnomalyDetectionTab
              institutions={institutions}
              onSelectInstitution={(id) => setSelectedInstitutionId(id)}
            />
          )}

          {activeTab === 'attendance' && (
            <AttendanceAnalyticsTab
              institutions={institutions}
              onSelectInstitution={(id) => setSelectedInstitutionId(id)}
            />
          )}

          {activeTab === 'geofencing' && (
            <GeoFencingMap
              institutions={institutions}
              onSelectInstitution={(id) => setSelectedInstitutionId(id)}
            />
          )}

          {activeTab === 'reports' && (
            <ReportsTab
              institutions={institutions}
              inspections={inspections}
            />
          )}
        </main>
      </div>

      {/* Slide-out Institution Details Drawer */}
      <InstitutionDrawer
        institution={selectedInstitution}
        inspections={inspections}
        isOpen={Boolean(selectedInstitutionId)}
        onClose={() => setSelectedInstitutionId(null)}
        onToggleEscalation={toggleEscalation}
        onResolveEscalation={resolveEscalation}
      />

      {/* Notifications Slide-out Panel */}
      <NotificationsPanel
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          setIsNotificationsOpen(false);
        }}
      />
    </div>
  );
}

export default AdminDashboard;
