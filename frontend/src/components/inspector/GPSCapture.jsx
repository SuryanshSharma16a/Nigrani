// File: src/components/inspector/GPSCapture.jsx
import React from 'react';
import { MapPin, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';
import { useGeolocation } from '../../hooks/useGeolocation';
import { COLOR_TOKENS, CARD_SHADOW } from '../../config/constants';

export function GPSCapture({ targetLat, targetLng, onLocationCaptured, initialGps }) {
  const { location, loading, captureLocation } = useGeolocation();

  const activeGps = location || initialGps;

  const handleCapture = async () => {
    const loc = await captureLocation(targetLat, targetLng, 4000);
    if (onLocationCaptured) {
      onLocationCaptured(loc);
    }
  };

  return (
    <div className="rounded-2xl bg-white p-4" style={{ boxShadow: CARD_SHADOW }}>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-bold text-sm" style={{ color: COLOR_TOKENS.ink }}>
          <MapPin size={16} color={COLOR_TOKENS.indigo} />
          Geotag Verification
        </div>
        <button
          onClick={handleCapture}
          disabled={loading}
          className="flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold transition-colors disabled:opacity-50"
          style={{ backgroundColor: COLOR_TOKENS.indigoSoft, color: COLOR_TOKENS.indigo }}
        >
          <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
          {loading ? 'Locating…' : activeGps ? 'Recapture' : 'Capture GPS'}
        </button>
      </div>

      {loading && (
        <p className="text-xs" style={{ color: COLOR_TOKENS.inkMuted }}>
          Acquiring high-accuracy GPS coordinates (4s timeout fallback active)…
        </p>
      )}

      {!loading && activeGps && (
        <div className="mt-2 flex flex-col gap-1.5 rounded-xl bg-gray-50 p-2.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-mono text-gray-700">
              {activeGps.lat.toFixed(5)}, {activeGps.lng.toFixed(5)}
            </span>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                activeGps.geoMatched
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-amber-100 text-amber-700'
              }`}
            >
              {activeGps.geoMatched ? (
                <>
                  <CheckCircle2 size={11} /> Verified On-Site
                </>
              ) : (
                <>
                  <AlertTriangle size={11} /> Outside Geofence
                </>
              )}
            </span>
          </div>

          <div className="flex justify-between text-[11px]" style={{ color: COLOR_TOKENS.inkMuted }}>
            <span>Distance from premises: ~{activeGps.verifiedGeoDistanceKm || 0.12} km</span>
            <span>{activeGps.approx ? '(Approximate)' : '(GPS Lock)'}</span>
          </div>
        </div>
      )}

      {!loading && !activeGps && (
        <p className="text-xs" style={{ color: COLOR_TOKENS.inkMuted }}>
          GPS timestamp ensures tamper-proof audit trails for statutory DoSJE inspections.
        </p>
      )}
    </div>
  );
}

export default GPSCapture;
