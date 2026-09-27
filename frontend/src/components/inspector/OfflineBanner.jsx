// File: src/components/inspector/OfflineBanner.jsx
import React from 'react';
import { RefreshCw, WifiOff } from 'lucide-react';
import { COLOR_TOKENS } from '../../config/constants';

export function OfflineBanner({
  pendingCount = 0,
  isOffline = false,
  onSyncNow,
  isSyncing = false,
}) {
  if (pendingCount === 0 && !isOffline) return null;

  return (
    <div
      className="mx-4 mt-3 flex items-center justify-between rounded-2xl px-3.5 py-2.5 text-xs font-semibold shadow-xs"
      style={{
        backgroundColor: COLOR_TOKENS.orangeSoft,
        color: COLOR_TOKENS.orange,
      }}
    >
      <div className="flex items-center gap-2">
        {isOffline && <WifiOff size={14} className="flex-shrink-0" />}
        <span>
          {pendingCount > 0
            ? `${pendingCount} report${pendingCount > 1 ? 's' : ''} saved locally on device`
            : 'Offline mode active — reports will queue locally'}
        </span>
      </div>

      {pendingCount > 0 && onSyncNow && (
        <button
          disabled={isOffline || isSyncing}
          onClick={onSyncNow}
          className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold text-white transition-all hover:opacity-90 disabled:opacity-40"
          style={{ backgroundColor: COLOR_TOKENS.indigo }}
        >
          <RefreshCw size={12} className={isSyncing ? 'animate-spin' : ''} />
          {isSyncing ? 'Syncing…' : 'Sync now'}
        </button>
      )}
    </div>
  );
}

export default OfflineBanner;
