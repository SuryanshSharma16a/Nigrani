import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations } from '../config/translations';

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('nigrani_lang');
    return saved === 'hi' ? 'hi' : 'en';
  });

  useEffect(() => {
    localStorage.setItem('nigrani_lang', language);
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  }, []);

  const t = useCallback((keyString) => {
    const keys = keyString.split('.');
    let result = translations[language];
    
    for (const key of keys) {
      if (result && result[key] !== undefined) {
        result = result[key];
      } else {
        console.warn(`Translation key not found: ${keyString}`);
        return keyString; // Fallback to key if not found
      }
    }
    
    return result;
  }, [language]);

  const value = {
    language,
    toggleLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
