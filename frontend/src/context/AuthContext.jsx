import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, getMe } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('nigraniUser');
    return saved ? JSON.parse(saved) : null;
  });
  const [loginError, setLoginError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      if (user && user.token) {
        try {
          const userData = await getMe();
          setUser({ ...userData, token: user.token });
        } catch (error) {
          console.error("Token invalid or expired", error);
          logout();
        }
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
      const data = await apiLogin({ email, password });
      setUser(data);
      return true;
    } catch (error) {
      setLoginError(error.response?.data?.message || "Invalid email or password");
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
