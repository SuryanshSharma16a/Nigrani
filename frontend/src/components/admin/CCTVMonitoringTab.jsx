// File: src/components/admin/CCTVMonitoringTab.jsx
import React, { useState, useEffect } from 'react';
import { Video, Camera, Maximize2, AlertTriangle, CheckCircle2, ShieldAlert, Filter } from 'lucide-react';
import { Card } from '../common/Card';
import { Modal } from '../common/Modal';
import { SEED_CCTV_FEEDS } from '../../data/cctvFeeds';
import { DOSJE_SCHEMES } from '../../config/schemes';
import { COLOR_TOKENS } from '../../config/constants';

export function CCTVMonitoringTab() {
  const [feeds] = useState(SEED_CCTV_FEEDS);
  const [selectedFeed, setSelectedFeed] = useState(null);
  const [selectedScheme, setSelectedScheme] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [snapshotToast, setSnapshotToast] = useState(null);
  const [currentTimeStr, setCurrentTimeStr] = useState('');

  // Live timecode clock updates
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTimeStr(
        new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredFeeds = feeds.filter((f) => {
    const matchScheme = selectedScheme === 'ALL' || f.schemeName === selectedScheme;
    const matchStatus = selectedStatus === 'ALL' || f.status === selectedStatus;
    return matchScheme && matchStatus;
  });

  const offlineCount = feeds.filter((f) => f.status === 'offline').length;
  const alertCount = feeds.filter((f) => f.status === 'motion_alert').length;

  const handleRecordSnapshot = (feed, e) => {
    if (e) e.stopPropagation();
    setSnapshotToast(`Snapshot recorded for ${feed.cameraName} (${feed.institutionName})`);
    setTimeout(() => setSnapshotToast(null), 3500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Alert Banner */}
      {(offlineCount > 0 || alertCount > 0) && (
        <div className="flex items-center justify-between rounded-2xl bg-amber-50 border border-amber-200 p-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
              <AlertTriangle size={22} />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-amber-900">
                Surveillance System Alerts ({offlineCount + alertCount})
              </h4>
              <p className="text-xs text-amber-700">
                {offlineCount > 0 ? `${offlineCount} CCTV feed(s) offline. ` : ''}
                {alertCount > 0 ? `${alertCount} camera(s) detected off-hours motion.` : ''}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {snapshotToast && (
        <div className="fixed top-20 right-8 z-50 flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-xl animate-fade-in">
          <CheckCircle2 size={16} />
          <span>{snapshotToast}</span>
        </div>
      )}

      {/* Filter & Actions Bar */}
      <Card bodyClassName="p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <Video size={18} color={COLOR_TOKENS.indigo} />
            <h3 className="text-sm font-extrabold" style={{ color: COLOR_TOKENS.ink }}>
              24x7 NVR Surveillance Feeds ({filteredFeeds.length})
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs font-semibold text-gray-500">
              <Filter size={14} />
              <span>Filter:</span>
            </div>

            <select
              value={selectedScheme}
              onChange={(e) => setSelectedScheme(e.target.value)}
              className="rounded-xl border bg-white px-3 py-2 text-xs font-semibold outline-none focus:ring-2 focus:ring-indigo-500/20"
              style={{ borderColor: COLOR_TOKENS.border }}
            >
              <option value="ALL">All Schemes</option>
              {DOSJE_SCHEMES.map((s) => (
                <option key={s.id} value={s.code}>
                  {s.code}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="rounded-xl border bg-white px-3 py-2 text-xs font-semibold outline-none focus:ring-2 focus:ring-indigo-500/20"
              style={{ borderColor: COLOR_TOKENS.border }}
            >
              <option value="ALL">All Feeds</option>
              <option value="online">Live Online</option>
              <option value="recording">Recording</option>
              <option value="motion_alert">Motion Alert</option>
              <option value="offline">Offline</option>
            </select>
          </div>
        </div>
      </Card>

      {/* CCTV Camera Video Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredFeeds.map((feed) => {
          const isOffline = feed.status === 'offline';
          const isAlert = feed.status === 'motion_alert';

          return (
            <div
              key={feed.id}
              onClick={() => setSelectedFeed(feed)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border bg-black shadow-md transition-all hover:scale-[1.01] hover:shadow-xl"
              style={{ borderColor: COLOR_TOKENS.border }}
            >
              {/* Simulated Live Video Container */}
              <div
                className="relative h-52 w-full p-4 flex flex-col justify-between"
                style={{ background: feed.gradientBg }}
              >
                {/* Top Video Overlay Bar */}
                <div className="flex items-center justify-between text-[11px] font-mono font-bold text-white z-10">
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        isOffline
                          ? 'bg-red-500'
                          : isAlert
                          ? 'bg-amber-400 animate-ping'
                          : 'bg-emerald-400 animate-pulse'
                      }`}
                    />
                    <span className="uppercase tracking-wider">
                      {isOffline ? 'OFFLINE' : isAlert ? 'ALERT DETECTED' : 'REC 🔴'}
                    </span>
                  </div>
                  <span>{currentTimeStr || '13:55:04'}</span>
                </div>

                {/* Simulated Moving Scanline Overlay */}
                {!isOffline && (
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent animate-pulse-subtle" />
                )}

                {/* Offline Error Screen Overlay */}
                {isOffline && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-center p-4">
                    <ShieldAlert size={32} className="text-red-500 mb-2" />
                    <span className="text-xs font-bold text-white">NVR SIGNAL LOST</span>
                    <span className="text-[10px] text-gray-400 mt-1">{feed.lastActiveTime}</span>
                  </div>
                )}

                {/* Bottom Video Information Bar */}
                <div className="z-10 bg-black/60 backdrop-blur-xs p-2.5 rounded-xl border border-white/10 text-white">
                  <div className="text-xs font-extrabold truncate">{feed.institutionName}</div>
                  <div className="flex justify-between text-[10px] text-gray-300 mt-0.5">
                    <span>{feed.cameraName}</span>
                    <span>{feed.resolution} · {feed.fps} FPS</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="flex items-center justify-between border-t bg-white px-4 py-2.5 text-xs font-semibold" style={{ borderColor: COLOR_TOKENS.border }}>
                <span className="text-gray-500">{feed.city}, {feed.state}</span>
                <div className="flex items-center gap-2">
                  <button
                    disabled={isOffline}
                    onClick={(e) => handleRecordSnapshot(feed, e)}
                    className="flex items-center gap-1 rounded-lg bg-gray-100 px-2.5 py-1 text-[11px] font-bold text-gray-700 hover:bg-gray-200 disabled:opacity-30 transition-colors"
                  >
                    <Camera size={12} /> Snapshot
                  </button>
                  <button
                    onClick={() => setSelectedFeed(feed)}
                    className="rounded-lg bg-indigo-50 p-1 text-indigo-600 hover:bg-indigo-100 transition-colors"
                    title="Fullscreen"
                  >
                    <Maximize2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fullscreen Feed Modal */}
      {selectedFeed && (
        <Modal
          isOpen={Boolean(selectedFeed)}
          onClose={() => setSelectedFeed(null)}
          title={`${selectedFeed.cameraName} — ${selectedFeed.institutionName}`}
          subtitle={`${selectedFeed.city}, ${selectedFeed.state} · ${selectedFeed.schemeName}`}
          maxWidth="xl"
          footer={
            <div className="flex gap-2 w-full justify-between">
              <span className="text-xs text-gray-500 font-mono">Stream Encrypted · TLS 1.3 · DoSJE NVR</span>
              <button
                disabled={selectedFeed.status === 'offline'}
                onClick={() => handleRecordSnapshot(selectedFeed)}
                className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 transition-all shadow-sm"
              >
                <Camera size={14} /> Capture Audit Snapshot
              </button>
            </div>
          }
        >
          <div
            className="relative h-96 w-full rounded-2xl overflow-hidden p-6 flex flex-col justify-between"
            style={{ background: selectedFeed.gradientBg }}
          >
            <div className="flex items-center justify-between text-xs font-mono font-bold text-white z-10">
              <span className="bg-red-600 px-2 py-0.5 rounded text-[11px]">LIVE STREAMING</span>
              <span>TIME: {currentTimeStr} · FPS: {selectedFeed.fps}</span>
            </div>
            <div className="z-10 text-white bg-black/60 p-4 rounded-xl backdrop-blur-xs">
              <div className="text-sm font-extrabold">{selectedFeed.institutionName}</div>
              <div className="text-xs text-gray-300 mt-1">{selectedFeed.cameraName} · Resolution: {selectedFeed.resolution}</div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default CCTVMonitoringTab;
