import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative p-2 rounded-full border border-slate-200 bg-white dark:bg-slate-800 dark:border-slate-700 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all text-slate-700 dark:text-slate-200 flex items-center justify-center overflow-hidden w-10 h-10 ${className}`}
      aria-label="Toggle Theme"
    >
      <div className={`transition-transform duration-500 ease-in-out absolute flex items-center justify-center ${theme === 'dark' ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'}`}>
        <Sun className="w-5 h-5 text-orange-500" />
      </div>
      <div className={`transition-transform duration-500 ease-in-out absolute flex items-center justify-center ${theme === 'dark' ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}`}>
        <Moon className="w-5 h-5 text-indigo-400" />
      </div>
    </button>
  );
};
