// File: src/components/admin/AdminSidebar.jsx
import React from 'react';
import {
  LayoutDashboard,
  Building2,
  Video,
  Camera,
  Shuffle,
  ShieldAlert,
  UserCheck,
  MapPin,
  Flag,
  FileText,
  LogOut,
} from 'lucide-react';
import { BrandMark } from '../common/BrandMark';
import { Avatar } from '../common/Avatar';
import { NotificationBadge } from '../common/NotificationBadge';
import { COLOR_TOKENS, APP_CONFIG } from '../../config/constants';

export function AdminSidebar({
  activeTab = 'overview',
  onTabChange,
  flaggedCount = 0,
  adminName = APP_CONFIG.defaultAdminName,
}) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'institutions', label: 'Institutions', icon: Building2 },
    { id: 'cctv', label: 'CCTV Feeds', icon: Video },
    { id: 'videoconf', label: 'Video Inspection', icon: Camera },
    { id: 'assignment', label: 'Random Assign', icon: Shuffle },
    { id: 'anomaly', label: 'AI Anomaly Detection', icon: ShieldAlert },
    { id: 'attendance', label: 'Biometric Log', icon: UserCheck },
    { id: 'geofencing', label: 'Geo-Fencing', icon: MapPin },
    { id: 'flagged', label: 'Flagged & Deficits', icon: Flag, badge: flaggedCount },
    { id: 'reports', label: 'Audit Reports', icon: FileText },
  ];

  return (
    <aside
      className="flex w-64 flex-shrink-0 flex-col border-r bg-white py-5 shadow-xs select-none"
      style={{ borderColor: COLOR_TOKENS.border }}
    >
      {/* Brand Header */}
      <div className="mb-6 flex items-center gap-3 px-6">
        <BrandMark size={36} />
        <div>
          <h2 className="text-lg font-extrabold tracking-tight" style={{ color: COLOR_TOKENS.ink }}>
            {APP_CONFIG.name}
          </h2>
          <p className="text-[10px] font-semibold" style={{ color: COLOR_TOKENS.inkMuted }}>
            DoSJE Monitoring Portal
          </p>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 space-y-1 px-3 nigrani-scroll overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all ${
                isActive
                  ? 'shadow-xs font-bold'
                  : 'hover:bg-gray-50'
              }`}
              style={{
                backgroundColor: isActive ? COLOR_TOKENS.indigoSoft : 'transparent',
                color: isActive ? COLOR_TOKENS.indigo : COLOR_TOKENS.inkMuted,
              }}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} color={isActive ? COLOR_TOKENS.indigo : COLOR_TOKENS.inkMuted} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <NotificationBadge count={item.badge} variant="danger" pulse={true} />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Profile Section */}
      <div className="border-t px-4 pt-4" style={{ borderColor: COLOR_TOKENS.border }}>
        <div className="flex items-center justify-between rounded-2xl p-2.5 hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-2.5">
            <Avatar name={adminName} size={36} />
            <div className="min-w-0">
              <div className="truncate text-xs font-bold" style={{ color: COLOR_TOKENS.ink }}>
                {adminName}
              </div>
              <div className="truncate text-[10px]" style={{ color: COLOR_TOKENS.inkMuted }}>
                Ministry Admin
              </div>
            </div>
          </div>
          <button
            title="Sign out"
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default AdminSidebar;
