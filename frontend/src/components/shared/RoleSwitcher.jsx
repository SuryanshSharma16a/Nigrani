// File: src/components/shared/RoleSwitcher.jsx
import React from 'react';
import { Smartphone, Monitor } from 'lucide-react';
import { COLOR_TOKENS, CARD_SHADOW } from '../../config/constants';

export function RoleSwitcher({ currentRole, onChangeRole, onResetData }) {
  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex items-center gap-1 rounded-full bg-white p-1.5 shadow-xl transition-all"
      style={{ boxShadow: CARD_SHADOW, backgroundColor: COLOR_TOKENS.card }}
    >
      <button
        onClick={() => onChangeRole('inspector')}
        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
          currentRole === 'inspector' ? 'shadow-xs' : 'hover:bg-gray-100'
        }`}
        style={{
          backgroundColor: currentRole === 'inspector' ? COLOR_TOKENS.indigo : 'transparent',
          color: currentRole === 'inspector' ? '#ffffff' : COLOR_TOKENS.inkMuted,
        }}
      >
        <Smartphone size={14} />
        Inspector App
      </button>

      <button
        onClick={() => onChangeRole('admin')}
        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
          currentRole === 'admin' ? 'shadow-xs' : 'hover:bg-gray-100'
        }`}
        style={{
          backgroundColor: currentRole === 'admin' ? COLOR_TOKENS.indigo : 'transparent',
          color: currentRole === 'admin' ? '#ffffff' : COLOR_TOKENS.inkMuted,
        }}
      >
        <Monitor size={14} />
        Admin Portal
      </button>

      {onResetData && (
        <button
          onClick={onResetData}
          title="Reset local state to default seed data"
          className="ml-1 rounded-full px-2.5 py-1.5 text-[11px] font-semibold text-gray-500 hover:bg-gray-100"
        >
          Reset
        </button>
      )}
    </div>
  );
}

export default RoleSwitcher;
