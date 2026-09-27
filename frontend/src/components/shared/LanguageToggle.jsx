import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe } from 'lucide-react';

export const LanguageToggle = ({ className = '' }) => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-white shadow-sm hover:bg-slate-50 transition-colors text-sm font-semibold text-slate-700 ${className}`}
    >
      <Globe className="w-4 h-4 text-[#635BFF]" />
      {language === 'en' ? (
        <span>हिंदी 🇮🇳</span>
      ) : (
        <span>English 🇬🇧</span>
      )}
    </button>
  );
};
