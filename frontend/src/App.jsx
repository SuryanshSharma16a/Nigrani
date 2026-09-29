// File: src/App.jsx
import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { GlobalStyles } from './components/shared/GlobalStyles';
import { Landing } from './components/landing/Landing';
import { InspectorApp } from './components/inspector/InspectorApp';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { RoleSwitcher } from './components/shared/RoleSwitcher';
import { LoginPage } from './components/auth/LoginPage';
import { LogOut } from 'lucide-react';

function MainLayout() {
  const { userRole, setUserRole, resetDataToDefault } = useApp();
  const { isAuthenticated, user, logout } = useAuth();
  const [viewState, setViewState] = useState('landing'); // 'landing' | 'active'

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'admin' || user.role === 'ngo') {
        setUserRole(user.role);
        setViewState('active');
      } else if (user.role === 'inspector') {
        setUserRole('inspector');
        setViewState('active');
      }
    } else {
      setViewState('landing');
    }
  }, [isAuthenticated, user, setUserRole]);

  const handleChangeRole = (role) => {
    setUserRole(role);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <GlobalStyles />

      {viewState === 'landing' && (
        <Landing onSelectRole={(role) => {
          if (!isAuthenticated) {
            setViewState('login');
          } else {
            setUserRole(role);
            setViewState('active');
          }
        }} />
      )}

      {viewState === 'login' && (
        <LoginPage />
      )}

      {viewState === 'active' && (
        <>
          {userRole === 'inspector' ? (
            <div className="min-h-screen flex items-center justify-center p-4 bg-slate-900/95">
              <InspectorApp />
            </div>
          ) : (
            <AdminDashboard />
          )}

          {/* Floating Controls */}
          <div className="fixed bottom-6 right-6 flex flex-col items-end gap-4 z-[9999]">
            <button
              onClick={logout}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-red-600 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 font-semibold text-sm"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
            <RoleSwitcher
              currentRole={userRole}
              onChangeRole={handleChangeRole}
              onResetData={resetDataToDefault}
            />
          </div>
        </>
      )}
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <MainLayout />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;