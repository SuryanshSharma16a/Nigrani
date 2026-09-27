// File: src/components/admin/NotificationsPanel.jsx
import React, { useState } from 'react';
import { 
  X, 
  CheckCheck, 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  CheckCircle2, 
  ChevronRight,
  Filter,
  BellRing
} from 'lucide-react';
import { COLOR_TOKENS } from '../../config/constants';
import { StatusPill } from '../common/StatusPill';

const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    category: 'critical',
    title: 'Severe Attendance Drop Detected',
    message: 'St. Mary Hostels, Varanasi reported a 32% drop in biometric attendance today.',
    timestamp: '10 minutes ago',
    read: false,
    actionLabel: 'Investigate Anomaly',
    targetTab: 'anomaly',
  },
  {
    id: 'notif-2',
    category: 'critical',
    title: 'CCTV Stream Disconnected',
    message: 'Niramaya De-addiction Center, Jaipur feed offline for > 45 minutes.',
    timestamp: '25 minutes ago',
    read: false,
    actionLabel: 'View CCTV Feeds',
    targetTab: 'cctv',
  },
  {
    id: 'notif-3',
    category: 'warning',
    title: 'Suspected Proxy Attendance',
    message: 'Duplicate biometric device signatures detected at Dr. Ambedkar Boys Hostel, Lucknow.',
    timestamp: '1 hour ago',
    read: false,
    actionLabel: 'View Attendance',
    targetTab: 'attendance',
  },
  {
    id: 'notif-4',
    category: 'warning',
    title: 'Grant-in-Aid Mismatch Alert',
    message: 'Financial disbursement request exceeds quarterly cap by ₹2.4 Lakhs.',
    timestamp: '3 hours ago',
    read: true,
    actionLabel: 'Review Financials',
    targetTab: 'anomaly',
  },
  {
    id: 'notif-5',
    category: 'info',
    title: 'Random Inspection Assigned',
    message: 'Inspector Rajesh Kumar assigned to PM-AGY Village, Kanpur.',
    timestamp: '5 hours ago',
    read: true,
    actionLabel: 'View Assignment',
    targetTab: 'assignment',
  },
  {
    id: 'notif-6',
    category: 'success',
    title: 'Compliance Escalation Resolved',
    message: 'Prem Dham Old Age Home resolved safety certificate deficiencies.',
    timestamp: '1 day ago',
    read: true,
    actionLabel: 'View Record',
    targetTab: 'institutions',
  },
];

export function NotificationsPanel({ isOpen, onClose, onNavigateTab }) {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [activeFilter, setActiveFilter] = useState('all');

  if (!isOpen) return null;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleMarkSingleRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const filteredNotifications = notifications.filter((n) => {
    if (activeFilter === 'all') return true;
    return n.category === activeFilter;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getCategoryBadge = (category) => {
    switch (category) {
      case 'critical':
        return <StatusPill status="critical" text="Critical" />;
      case 'warning':
        return <StatusPill status="warning" text="Warning" />;
      case 'info':
        return <StatusPill status="info" text="Info" />;
      case 'success':
        return <StatusPill status="compliant" text="Success" />;
      default:
        return null;
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'critical':
        return <AlertTriangle size={18} color={COLOR_TOKENS.red} />;
      case 'warning':
        return <AlertCircle size={18} color={COLOR_TOKENS.orange} />;
      case 'info':
        return <Info size={18} color={COLOR_TOKENS.blue} />;
      case 'success':
        return <CheckCircle2 size={18} color={COLOR_TOKENS.green} />;
      default:
        return <BellRing size={18} color={COLOR_TOKENS.indigo} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Semi-transparent Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <aside 
        className="relative z-10 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-out"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <BellRing size={20} color={COLOR_TOKENS.indigo} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                </span>
              )}
            </div>
            <h3 className="text-base font-bold text-slate-800">Notifications</h3>
            {unreadCount > 0 && (
              <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-600">
                {unreadCount} new
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="flex items-center space-x-1 rounded-lg px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-indigo-600 transition-colors"
                title="Mark all as read"
              >
                <CheckCheck size={14} />
                <span>Mark all read</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center space-x-1 border-b border-slate-100 bg-slate-50 px-6 py-2 overflow-x-auto no-scrollbar">
          <Filter size={13} className="mr-1 text-slate-400 flex-shrink-0" />
          {[
            { id: 'all', label: 'All' },
            { id: 'critical', label: 'Critical' },
            { id: 'warning', label: 'Warning' },
            { id: 'info', label: 'Info' },
            { id: 'success', label: 'Success' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors flex-shrink-0 ${
                activeFilter === cat.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200/60 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 nigrani-scroll">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <CheckCircle2 size={40} className="text-slate-300 mb-2" />
              <p className="text-sm font-semibold text-slate-700">No notifications</p>
              <p className="text-xs text-slate-400 mt-0.5">
                {activeFilter === 'all'
                  ? "You're all caught up!"
                  : `No ${activeFilter} notifications available.`}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => handleMarkSingleRead(notif.id)}
                className={`relative rounded-xl border p-4 transition-all duration-200 hover:border-indigo-200 hover:shadow-xs cursor-pointer ${
                  notif.read
                    ? 'border-slate-100 bg-white'
                    : 'border-indigo-100 bg-indigo-50/20'
                }`}
              >
                {/* Unread Indicator Dot */}
                {!notif.read && (
                  <span className="absolute top-4 right-4 h-2 w-2 rounded-full bg-indigo-600" />
                )}

                <div className="flex items-start space-x-3">
                  <div className="mt-0.5 p-2 rounded-lg bg-slate-50 flex-shrink-0">
                    {getCategoryIcon(notif.category)}
                  </div>

                  <div className="flex-1 min-w-0 pr-2">
                    <div className="flex items-center space-x-2 mb-1">
                      {getCategoryBadge(notif.category)}
                      <span className="text-xs text-slate-400">{notif.timestamp}</span>
                    </div>

                    <h4 className="text-sm font-semibold text-slate-900 leading-tight">
                      {notif.title}
                    </h4>
                    <p className="mt-1 text-xs text-slate-600 leading-normal">
                      {notif.message}
                    </p>

                    {notif.actionLabel && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkSingleRead(notif.id);
                          if (onNavigateTab && notif.targetTab) {
                            onNavigateTab(notif.targetTab);
                            onClose();
                          }
                        }}
                        className="mt-3 inline-flex items-center space-x-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                      >
                        <span>{notif.actionLabel}</span>
                        <ChevronRight size={13} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 bg-slate-50 px-6 py-3 text-center">
          <p className="text-xs text-slate-400">
            Automated Ministry Vigilance & Security Engine
          </p>
        </div>
      </aside>
    </div>
  );
}

export default NotificationsPanel;
