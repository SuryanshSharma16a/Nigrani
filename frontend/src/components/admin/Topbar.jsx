// File: src/components/admin/Topbar.jsx
import React from 'react';
import { Search, Bell, Shield } from 'lucide-react';
import { Avatar } from '../common/Avatar';
import { NotificationBadge } from '../common/NotificationBadge';
import { COLOR_TOKENS, APP_CONFIG } from '../../config/constants';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export function Topbar({
  searchValue = '',
  onSearchChange,
  notificationCount = 0,
  adminName = APP_CONFIG.defaultAdminName,
  onOpenNotifications,
}) {
  return (
    <header
      className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-white px-8 select-none"
      style={{ borderColor: COLOR_TOKENS.border }}
    >
      {/* Dynamic Greeting */}
      <div>
        <h1 className="text-base font-extrabold tracking-tight" style={{ color: COLOR_TOKENS.ink }}>
          {getGreeting()}, {adminName.split(' ')[0]}
        </h1>
        <p className="text-xs" style={{ color: COLOR_TOKENS.inkMuted }}>
          Department of Social Justice & Empowerment Headquarters
        </p>
      </div>

      {/* Center Search Bar & Quick Actions */}
      <div className="flex items-center gap-4">
        <div className="relative w-80">
          <Search
            size={16}
            color={COLOR_TOKENS.inkMuted}
            className="absolute left-3.5 top-1/2 -translate-y-1/2"
          />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            placeholder="Search institutions, schemes, states, or IDs…"
            className="w-full rounded-xl border bg-gray-50/70 py-2 pl-10 pr-4 text-xs font-medium outline-none transition-all focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
            style={{ borderColor: COLOR_TOKENS.border, color: COLOR_TOKENS.ink }}
          />
        </div>

        {/* Security Status Tag */}
        <div className="hidden lg:flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <Shield size={13} />
          <span>DoSJE Audit Network Active</span>
        </div>

        {/* Notification Bell Icon */}
        <button
          onClick={onOpenNotifications}
          className="relative rounded-xl p-2 transition-colors hover:bg-gray-100"
          aria-label="View notifications"
        >
          <Bell size={18} color={COLOR_TOKENS.ink} />
          {notificationCount > 0 && (
            <NotificationBadge
              count={notificationCount}
              variant="danger"
              pulse={true}
              className="absolute -right-1 -top-1"
            />
          )}
        </button>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-2 border-l pl-4" style={{ borderColor: COLOR_TOKENS.border }}>
          <Avatar name={adminName} size={36} />
        </div>
      </div>
    </header>
  );
}

export default Topbar;
