// File: src/components/admin/VideoConferenceTab.jsx
import React, { useState, useEffect } from 'react';
import { Camera, PhoneOff, Mic, MicOff, Video, VideoOff, RefreshCw, CheckCircle2, User } from 'lucide-react';
import { Card } from '../common/Card';
import { Modal } from '../common/Modal';
import { SEED_INSTITUTIONS } from '../../data/institutions';
import { fmtDate } from '../../utils/helpers';
import { COLOR_TOKENS } from '../../config/constants';

export function VideoConferenceTab() {
  const [callState, setCallState] = useState('idle'); // idle | spinning | connecting | active | summary
  const [selectedInst, setSelectedInst] = useState(null);
  const [callTimer, setCallTimer] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [summaryNotes, setSummaryNotes] = useState('');
  const [callHistory, setCallHistory] = useState([
    {
      id: 'vc-101',
      institutionName: 'Dr. B.R. Ambedkar SC Boys Hostel',
      supervisorName: 'Dr. Rajesh Sharma',
      date: '2026-09-14T10:30:00.000Z',
      durationSec: 245,
      status: 'Verified Compliant',
      notes: 'Warden conducted live roll call of 45 residents in main hall. All parameters satisfied.',
    },
    {
      id: 'vc-102',
      institutionName: 'Sant Kabir Senior Citizen Care & Rehab Centre',
      supervisorName: 'Pandit Achyutanand Tripathi',
      date: '2026-09-11T14:15:00.000Z',
      durationSec: 180,
      status: 'Follow-up Needed',
      notes: 'Requested medical logbook photo copy over portal.',
    },
  ]);

  // Active call timer
  useEffect(() => {
    let interval;
    if (callState === 'active') {
      interval = setInterval(() => {
        setCallTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callState]);

  // Trigger random VC selection
  const handleInitiateRandomVC = () => {
    setCallTimer(0);
    setCallState('spinning');
    let spinCount = 0;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * SEED_INSTITUTIONS.length);
      setSelectedInst(SEED_INSTITUTIONS[randomIndex]);
      spinCount++;
      if (spinCount > 10) {
        clearInterval(interval);
        setCallState('connecting');
        setTimeout(() => {
          setCallState('active');
        }, 2000);
      }
    }, 150);
  };

  const handleEndCall = () => {
    setCallState('summary');
  };

  const handleSubmitCallSummary = () => {
    if (selectedInst) {
      const newLog = {
        id: `vc-${Date.now()}`,
        institutionName: selectedInst.name,
        supervisorName: selectedInst.supervisorName,
        date: new Date().toISOString(),
        durationSec: callTimer,
        status: 'Verified Compliant',
        notes: summaryNotes || 'Random unannounced WebRTC video verification audit completed.',
      };
      setCallHistory([newLog, ...callHistory]);
    }
    setCallState('idle');
    setSelectedInst(null);
    setSummaryNotes('');
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Launch Bar */}
      <Card bodyClassName="p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-base font-extrabold" style={{ color: COLOR_TOKENS.ink }}>
              Unannounced WebRTC Video Inspection Portal
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Initiate instant random video verification calls with hostellers and wardens across India.
            </p>
          </div>

          <button
            disabled={callState !== 'idle'}
            onClick={handleInitiateRandomVC}
            className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-xs font-bold text-white shadow-md hover:bg-indigo-700 disabled:opacity-50 transition-all"
          >
            <RefreshCw size={16} className={callState === 'spinning' ? 'animate-spin' : ''} />
            {callState === 'spinning'
              ? 'Selecting Target Hostel…'
              : callState === 'connecting'
              ? 'Connecting WebRTC Call…'
              : 'Initiate Random Inspection Call'}
          </button>
        </div>
      </Card>

      {/* Active Call UI Stage */}
      {callState === 'active' && selectedInst && (
        <Card bodyClassName="p-0 overflow-hidden">
          <div className="relative h-[450px] w-full bg-slate-900 text-white flex flex-col justify-between p-6">
            {/* Call Header Overlay */}
            <div className="z-10 flex items-center justify-between bg-black/50 p-3 rounded-2xl backdrop-blur-xs border border-white/10">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-red-500 animate-ping" />
                <div>
                  <div className="text-xs font-extrabold">{selectedInst.name}</div>
                  <div className="text-[10px] text-gray-300">
                    Warden: {selectedInst.supervisorName} · {selectedInst.city}, {selectedInst.state}
                  </div>
                </div>
              </div>
              <div className="font-mono text-sm font-bold bg-white/20 px-3 py-1 rounded-full">
                {formatTimer(callTimer)}
              </div>
            </div>

            {/* Video Placeholder Area */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
              {isVideoOff ? (
                <div className="flex flex-col items-center justify-center">
                  <User size={64} className="text-gray-500 mb-2" />
                  <span className="text-xs font-bold text-gray-400">Camera Paused</span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center">
                  <Camera size={56} className="text-indigo-400 mb-3 animate-pulse" />
                  <span className="text-sm font-extrabold text-white">Live WebRTC Video Stream</span>
                  <span className="text-xs text-gray-400 mt-1">
                    Inspecting {selectedInst.name} Warden & Inmates
                  </span>
                  {/* Simulated Audio Waveform */}
                  <div className="mt-4 flex items-center gap-1">
                    <span className="h-4 w-1.5 rounded-full bg-indigo-400 animate-bounce" />
                    <span className="h-7 w-1.5 rounded-full bg-indigo-400 animate-bounce delay-100" />
                    <span className="h-3 w-1.5 rounded-full bg-indigo-400 animate-bounce delay-200" />
                    <span className="h-8 w-1.5 rounded-full bg-indigo-400 animate-bounce delay-75" />
                  </div>
                </div>
              )}
            </div>

            {/* Call Control Toolbar */}
            <div className="z-10 flex items-center justify-center gap-4 bg-black/60 p-3 rounded-2xl backdrop-blur-xs border border-white/10 w-max mx-auto">
              <button
                onClick={() => setIsMuted((m) => !m)}
                className={`rounded-full p-3 transition-colors ${
                  isMuted ? 'bg-red-500 text-white' : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                {isMuted ? <MicOff size={18} /> : <Mic size={18} />}
              </button>

              <button
                onClick={() => setIsVideoOff((v) => !v)}
                className={`rounded-full p-3 transition-colors ${
                  isVideoOff ? 'bg-red-500 text-white' : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                {isVideoOff ? <VideoOff size={18} /> : <Video size={18} />}
              </button>

              <button
                onClick={handleEndCall}
                className="flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 text-xs font-bold text-white hover:bg-red-700 transition-colors shadow-lg"
              >
                <PhoneOff size={18} /> End Call & File Report
              </button>
            </div>
          </div>
        </Card>
      )}

      {/* Post-Call Summary Modal */}
      {callState === 'summary' && selectedInst && (
        <Modal
          isOpen={callState === 'summary'}
          onClose={() => setCallState('idle')}
          title={`Call Observation Report — ${selectedInst.name}`}
          subtitle={`Warden: ${selectedInst.supervisorName} · Call Duration: ${formatTimer(callTimer)}`}
          maxWidth="md"
          footer={
            <button
              onClick={handleSubmitCallSummary}
              className="rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 transition-all"
            >
              Submit Inspection Log
            </button>
          }
        >
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Visual Inspection & Compliance Notes
              </label>
              <textarea
                rows={4}
                value={summaryNotes}
                onChange={(e) => setSummaryNotes(e.target.value)}
                placeholder="Enter visual observations regarding inmate presence, clean water, or warden availability..."
                className="w-full rounded-xl border p-3 outline-none focus:ring-1 focus:ring-indigo-500"
                style={{ borderColor: COLOR_TOKENS.border }}
              />
            </div>
          </div>
        </Modal>
      )}

      {/* Call History Audit Table */}
      <Card title="Video Call Audit History Log" subtitle="Verified WebRTC video inspection sessions">
        <div className="overflow-x-auto nigrani-scroll">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b bg-gray-50/80 font-bold uppercase tracking-wider text-[11px] text-gray-500" style={{ borderColor: COLOR_TOKENS.border }}>
                <th className="px-5 py-3">Institution & Warden</th>
                <th className="px-4 py-3">Call Timestamp</th>
                <th className="px-4 py-3">Duration</th>
                <th className="px-4 py-3">Verification Notes</th>
                <th className="px-4 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: COLOR_TOKENS.border }}>
              {callHistory.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50/60">
                  <td className="px-5 py-3.5">
                    <div className="font-bold text-gray-900">{log.institutionName}</div>
                    <div className="text-[11px] text-gray-500">{log.supervisorName}</div>
                  </td>
                  <td className="px-4 py-3.5 text-gray-600 font-medium">{fmtDate(log.date, true)}</td>
                  <td className="px-4 py-3.5 font-mono text-gray-700">{formatTimer(log.durationSec)}</td>
                  <td className="px-4 py-3.5 text-gray-600 max-w-xs truncate">{log.notes}</td>
                  <td className="px-4 py-3.5 text-right">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                      <CheckCircle2 size={12} /> {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default VideoConferenceTab;
