import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('nigraniUser');
    return saved ? JSON.parse(saved) : null;
  });
  const [loginError, setLoginError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = () => {
      // For frontend-only demo, we just trust the local storage user if it exists
      if (user && user.role) {
        // Mock successful verification
      } else {
        setUser(null);
      }
      setLoading(false);
    };
    verifyUser();
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('nigraniUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('nigraniUser');
    }
  }, [user]);

  const login = async (email, password) => {
    setLoginError(null);
    try {
      // Mock Demo Credentials for Frontend-only Vercel Deployment
      let mockUser = null;
      if (email === 'admin@dosje.gov.in' && password === 'admin123') {
        mockUser = { id: 1, name: 'Admin User', email, role: 'admin', token: 'mock-jwt-token-admin' };
      } else if (email === 'inspector@pmu.gov.in' && password === 'insp123') {
        mockUser = { id: 2, name: 'Inspector User', email, role: 'inspector', token: 'mock-jwt-token-insp' };
      } else if (email === 'ngo@ashray.org' && password === 'ngo123') {
        mockUser = { id: 3, name: 'NGO User', email, role: 'ngo', token: 'mock-jwt-token-ngo' };
      }

      if (mockUser) {
        setUser(mockUser);
        return true;
      } else {
        setLoginError("Invalid demo email or password");
        return false;
      }
    } catch (error) {
      setLoginError("An error occurred during login");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loginError,
    login,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
