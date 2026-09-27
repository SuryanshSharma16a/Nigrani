// File: src/components/admin/GeoFencingMap.jsx
import React, { useState } from 'react';
import { MapPin, Navigation, ShieldCheck, Filter, User } from 'lucide-react';
import { Card } from '../common/Card';
import { StatusPill } from '../common/StatusPill';
import { SEED_INSTITUTIONS } from '../../data/institutions';
import { SEED_INSPECTORS } from '../../data/inspectors';
import { COLOR_TOKENS } from '../../config/constants';

export function GeoFencingMap({ onSelectInstitution }) {
  const [selectedInst, setSelectedInst] = useState(null);
  const [filterStatus, setFilterStatus] = useState('ALL');

  // Convert Lat/Lng to approximate % coordinates on India map SVG container
  // India Bounding Box: Lat 8.4 to 37.6, Lng 68.7 to 97.2
  const mapCoords = (lat, lng) => {
    const minLat = 8.0;
    const maxLat = 37.0;
    const minLng = 68.0;
    const maxLng = 97.0;

    const top = 100 - ((lat - minLat) / (maxLat - minLat)) * 100;
    const left = ((lng - minLng) / (maxLng - minLng)) * 100;

    return {
      top: `${Math.min(90, Math.max(10, top))}%`,
      left: `${Math.min(90, Math.max(10, left))}%`,
    };
  };

  const filteredInstitutions = SEED_INSTITUTIONS.filter((inst) => {
    return filterStatus === 'ALL' || inst.status === filterStatus;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Map Control Bar */}
      <Card bodyClassName="p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <MapPin size={18} color={COLOR_TOKENS.indigo} />
            <h3 className="text-sm font-extrabold" style={{ color: COLOR_TOKENS.ink }}>
              GIS Geo-Fencing & Officer Live Proximity Map
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
              <Filter size={14} />
              <span>Status:</span>
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-xl border bg-white px-3 py-2 text-xs font-semibold outline-none focus:ring-2 focus:ring-indigo-500/20"
              style={{ borderColor: COLOR_TOKENS.border }}
            >
              <option value="ALL">All Facilities</option>
              <option value="compliant">Compliant</option>
              <option value="minor deficit">Minor Deficit</option>
              <option value="non-compliant">Non-Compliant</option>
              <option value="escalated">Escalated</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Main Interactive Map Container */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 overflow-hidden" bodyClassName="p-0">
          <div className="relative h-[520px] w-full bg-slate-900 overflow-hidden select-none">
            {/* Grid Backdrop Lines */}
            <div className="absolute inset-0 bg-[radial-gradient(#3B82F6_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />

            {/* India Map Outline SVG Silhouette */}
            <svg
              className="absolute inset-0 h-full w-full opacity-15"
              viewBox="0 0 1000 1000"
              fill="none"
              stroke="#635BFF"
              strokeWidth="2"
            >
              <path d="M 450 150 L 520 180 L 550 250 L 620 300 L 750 350 L 800 450 L 700 550 L 580 650 L 500 850 L 420 700 L 320 500 L 250 400 L 300 250 Z" />
            </svg>

            {/* Plotted Institution Geofence Pins */}
            {filteredInstitutions.map((inst) => {
              const pos = mapCoords(inst.lat, inst.lng);
              const isSelected = selectedInst?.id === inst.id;
              const color =
                inst.status === 'compliant'
                  ? '#16A34A'
                  : inst.status === 'minor deficit'
                  ? '#F97316'
                  : '#EF4444';

              return (
                <div
                  key={inst.id}
                  onClick={() => setSelectedInst(inst)}
                  className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group z-20"
                  style={{ top: pos.top, left: pos.left }}
                >
                  {/* Pulsing Geofence Ring */}
                  <span
                    className="absolute -inset-2 rounded-full opacity-40 animate-ping"
                    style={{ backgroundColor: color }}
                  />

                  {/* Pin Dot */}
                  <div
                    className={`relative flex h-6 w-6 items-center justify-center rounded-full border-2 border-white shadow-lg transition-transform ${
                      isSelected ? 'scale-125 ring-4 ring-indigo-400' : 'group-hover:scale-120'
                    }`}
                    style={{ backgroundColor: color }}
                  >
                    <span className="h-2 w-2 rounded-full bg-white" />
                  </div>

                  {/* Hover Tag */}
                  <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 hidden group-hover:block z-30">
                    <div className="whitespace-nowrap rounded-lg bg-gray-900/90 backdrop-blur-xs px-2.5 py-1 text-[10px] font-bold text-white shadow-md">
                      {inst.name} ({inst.city})
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Inspector Live GPS Location Markers */}
            {SEED_INSPECTORS.slice(0, 3).map((insp, idx) => {
              const pos = mapCoords(28.6 + idx * 3, 77.2 + idx * 2.5);
              return (
                <div
                  key={insp.id}
                  className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-10"
                  style={{ top: pos.top, left: pos.left }}
                >
                  <div className="flex items-center gap-1 rounded-full bg-indigo-600/90 border border-indigo-400 px-2 py-0.5 text-[10px] font-bold text-white shadow-md">
                    <User size={10} />
                    <span>{insp.name.split(' ')[0]}</span>
                  </div>
                </div>
              );
            })}

            {/* Map Controls Legend */}
            <div className="absolute bottom-4 left-4 z-20 flex flex-wrap gap-3 rounded-xl bg-slate-900/80 backdrop-blur-xs border border-white/10 px-3 py-2 text-[11px] text-white">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span>Compliant Facility</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                <span>Minor Deficit</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                <span>Non-Compliant / Escalated</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Navigation size={12} className="text-indigo-400" />
                <span>Active Inspector GPS</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Selected Institution Geofence Card */}
        <Card title="Geofence Detail & Verification" subtitle="Tap any map pin to inspect GIS accuracy">
          {!selectedInst ? (
            <div className="p-8 text-center text-gray-400 text-xs">
              <MapPin size={32} className="mx-auto mb-2 text-indigo-400" />
              Click any colored pin on the map to inspect facility geofence boundaries and verified GPS parameters.
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <span className="font-mono text-[10px] text-gray-400">{selectedInst.code}</span>
                <h4 className="text-sm font-extrabold text-gray-900">{selectedInst.name}</h4>
                <p className="text-xs text-gray-500 mt-0.5">{selectedInst.address}</p>
              </div>

              <div className="rounded-xl bg-gray-50 p-3 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Coordinates:</span>
                  <span className="font-mono font-bold text-gray-800">{selectedInst.lat}, {selectedInst.lng}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Geofence Radius:</span>
                  <span className="font-bold text-emerald-600">100 Meters Verified</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Compliance Status:</span>
                  <StatusPill status={selectedInst.status} size="sm" />
                </div>
              </div>

              <div className="flex items-center gap-1.5 rounded-xl bg-indigo-50 p-2.5 text-xs text-indigo-700 font-medium">
                <ShieldCheck size={16} />
                <span>GPS audit trail matched with official land survey records.</span>
              </div>

              <button
                onClick={() => onSelectInstitution && onSelectInstitution(selectedInst.id)}
                className="w-full rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 transition-colors shadow-xs"
              >
                Open Full Institution Profile
              </button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

export default GeoFencingMap;
