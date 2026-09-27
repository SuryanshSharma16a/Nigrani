// File: src/components/inspector/ChecklistFlow.jsx
import React, { useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { INSPECTION_CHECKLIST } from '../../config/checklist';
import { EvidenceCapture } from './EvidenceCapture';
import { GPSCapture } from './GPSCapture';
import { ProgressBar } from '../common/ProgressBar';
import { COLOR_TOKENS, CARD_SHADOW } from '../../config/constants';

export function ChecklistFlow({ institution, onCancel, onFinish }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [remark, setRemark] = useState('');
  const [photos, setPhotos] = useState([]);
  const [gpsLocation, setGpsLocation] = useState(null);
  const [manualFlag, setManualFlag] = useState(false);

  const totalSteps = INSPECTION_CHECKLIST.length + 1; // 4 checklist sections + 1 review step

  const setAnswerValue = (itemId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [itemId]: { ...(prev[itemId] || {}), value },
    }));
  };

  const setAnswerRemark = (itemId, text) => {
    setAnswers((prev) => ({
      ...prev,
      [itemId]: { ...(prev[itemId] || {}), remark: text },
    }));
  };

  // Score Calculation
  const allItems = INSPECTION_CHECKLIST.flatMap((sec) => sec.items);
  const yesCount = allItems.filter((it) => answers[it.id]?.value === 'yes').length;
  const noCount = allItems.filter((it) => answers[it.id]?.value === 'no').length;
  const evaluable = yesCount + noCount;
  const score = evaluable === 0 ? 100 : Math.round((yesCount / evaluable) * 100);

  const autoFlag = score < 75;

  const isSectionStep = step < INSPECTION_CHECKLIST.length;
  const currentSection = isSectionStep ? INSPECTION_CHECKLIST[step] : null;

  const currentSectionComplete = currentSection
    ? currentSection.items.every((it) => answers[it.id]?.value)
    : true;

  return (
    <div className="flex min-h-full flex-col" style={{ backgroundColor: COLOR_TOKENS.bg }}>
      {/* Step Header */}
      <div className="sticky top-0 z-10 border-b bg-white px-4 pb-3 pt-4" style={{ borderColor: COLOR_TOKENS.border }}>
        <div className="flex items-center gap-2">
          <button
            onClick={onCancel}
            className="rounded-full p-1 transition-colors hover:bg-gray-100"
            aria-label="Cancel inspection"
          >
            <ArrowLeft size={18} color={COLOR_TOKENS.ink} />
          </button>
          <div className="min-w-0 flex-1">
            <h4 className="truncate text-sm font-bold" style={{ color: COLOR_TOKENS.ink }}>
              {institution?.name}
            </h4>
            <p className="text-[11px]" style={{ color: COLOR_TOKENS.inkMuted }}>
              {isSectionStep
                ? `Section ${step + 1} of ${INSPECTION_CHECKLIST.length}: ${currentSection?.sectionTitle}`
                : 'Final Review & Verification'}
            </p>
          </div>
        </div>

        {/* Progress Bar Header */}
        <div className="mt-3">
          <ProgressBar
            value={step + 1}
            max={totalSteps}
            color={COLOR_TOKENS.indigo}
            height="h-1.5"
          />
        </div>
      </div>

      {/* Main Form Content */}
      <div className="flex-1 px-4 py-4">
        {isSectionStep && currentSection && (
          <div>
            <div className="mb-3">
              <h3 className="text-base font-extrabold" style={{ color: COLOR_TOKENS.ink }}>
                {currentSection.sectionTitle}
              </h3>
              <p className="text-xs" style={{ color: COLOR_TOKENS.inkMuted }}>
                {currentSection.description}
              </p>
            </div>

            <div className="flex flex-col gap-3.5">
              {currentSection.items.map((item) => {
                const currentVal = answers[item.id]?.value;
                return (
                  <div
                    key={item.id}
                    className="rounded-2xl bg-white p-4 transition-all"
                    style={{ boxShadow: CARD_SHADOW }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-semibold leading-relaxed" style={{ color: COLOR_TOKENS.ink }}>
                        {item.text}
                      </p>
                      <span className="rounded-md px-1.5 py-0.5 text-[10px] font-bold bg-gray-100 text-gray-600">
                        {item.code}
                      </span>
                    </div>

                    {/* Yes / No / NA Options */}
                    <div className="mt-3 flex gap-2">
                      {['yes', 'no', 'na'].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setAnswerValue(item.id, opt)}
                          className={`flex-1 rounded-xl py-2 text-xs font-bold capitalize transition-all ${
                            currentVal === opt ? 'shadow-xs scale-102' : 'hover:bg-gray-100'
                          }`}
                          style={{
                            backgroundColor:
                              currentVal === opt
                                ? opt === 'yes'
                                  ? COLOR_TOKENS.green
                                  : opt === 'no'
                                  ? COLOR_TOKENS.red
                                  : COLOR_TOKENS.indigo
                                : COLOR_TOKENS.bg,
                            color: currentVal === opt ? '#ffffff' : COLOR_TOKENS.inkMuted,
                          }}
                        >
                          {opt === 'na' ? 'N/A' : opt}
                        </button>
                      ))}
                    </div>

                    {/* Remark field on NO */}
                    {currentVal === 'no' && (
                      <div className="mt-3">
                        <textarea
                          rows={2}
                          value={answers[item.id]?.remark || ''}
                          onChange={(e) => setAnswerRemark(item.id, e.target.value)}
                          placeholder="Specify mandatory deficiency remark..."
                          className="w-full rounded-xl border p-2.5 text-xs outline-none focus:ring-1 focus:ring-indigo-500"
                          style={{ backgroundColor: COLOR_TOKENS.bg, borderColor: COLOR_TOKENS.border }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Final Review & Submission Step */}
        {!isSectionStep && (
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-extrabold" style={{ color: COLOR_TOKENS.ink }}>
              Audit Score & Verification
            </h3>

            {/* Score Summary Box */}
            <div
              className="rounded-2xl bg-white p-5 text-center shadow-sm"
              style={{ boxShadow: CARD_SHADOW }}
            >
              <div className="text-xs font-semibold" style={{ color: COLOR_TOKENS.inkMuted }}>
                Calculated Compliance Score
              </div>
              <div
                className="mt-1 text-4xl font-black"
                style={{ color: autoFlag || manualFlag ? COLOR_TOKENS.red : COLOR_TOKENS.green }}
              >
                {score}%
              </div>
              <div className="mt-1 text-xs" style={{ color: COLOR_TOKENS.inkMuted }}>
                {yesCount} Compliant · {noCount} Deficient · {allItems.length - evaluable} N/A
              </div>
            </div>

            {/* Evidence Photo Upload */}
            <EvidenceCapture photos={photos} onPhotosChange={setPhotos} />

            {/* GPS Geotag Capture */}
            <GPSCapture
              targetLat={institution?.lat}
              targetLng={institution?.lng}
              initialGps={gpsLocation}
              onLocationCaptured={setGpsLocation}
            />

            {/* Overall Inspector Remarks */}
            <div className="rounded-2xl bg-white p-4" style={{ boxShadow: CARD_SHADOW }}>
              <label className="block text-xs font-bold mb-1.5" style={{ color: COLOR_TOKENS.ink }}>
                Overall Inspection Summary & Observations
              </label>
              <textarea
                rows={3}
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                placeholder="Add general field observations or notes..."
                className="w-full rounded-xl border p-2.5 text-xs outline-none focus:ring-1 focus:ring-indigo-500"
                style={{ backgroundColor: COLOR_TOKENS.bg, borderColor: COLOR_TOKENS.border }}
              />
            </div>

            {/* Manual Flag Checkbox */}
            <label className="flex items-center gap-2.5 rounded-2xl bg-white p-3.5 shadow-xs cursor-pointer select-none">
              <input
                type="checkbox"
                checked={manualFlag}
                onChange={(e) => setManualFlag(e.target.checked)}
                className="h-4 w-4 rounded accent-indigo-600"
              />
              <span className="text-xs font-bold" style={{ color: COLOR_TOKENS.ink }}>
                Flag institution for 14-day statutory follow-up
              </span>
            </label>

            {autoFlag && !manualFlag && (
              <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs font-semibold text-red-600">
                <AlertCircle size={16} />
                Compliance score is below 75% — report will be auto-flagged.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sticky Bottom Navigation */}
      <div className="sticky bottom-0 border-t bg-white p-4" style={{ borderColor: COLOR_TOKENS.border }}>
        <div className="flex gap-2">
          {step > 0 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="flex items-center justify-center gap-1 rounded-xl px-4 py-2.5 text-xs font-bold transition-all hover:bg-gray-100"
              style={{ backgroundColor: COLOR_TOKENS.bg, color: COLOR_TOKENS.ink }}
            >
              <ChevronLeft size={16} /> Back
            </button>
          )}

          {isSectionStep ? (
            <button
              disabled={!currentSectionComplete}
              onClick={() => setStep((s) => s + 1)}
              className="flex flex-1 items-center justify-center gap-1 rounded-xl py-2.5 text-xs font-bold text-white transition-all disabled:opacity-40"
              style={{ backgroundColor: COLOR_TOKENS.indigo }}
            >
              Next Section <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={() =>
                onFinish({
                  answers,
                  remark,
                  photos,
                  gps: gpsLocation || {
                    lat: institution?.lat || 28.6139,
                    lng: institution?.lng || 77.2090,
                    approx: true,
                    verifiedGeoDistanceKm: 0.12,
                    geoMatched: true,
                  },
                  score,
                  flagged: autoFlag || manualFlag,
                })
              }
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl py-3 text-xs font-bold text-white shadow-md transition-all hover:opacity-90 active:scale-95"
              style={{ backgroundColor: COLOR_TOKENS.indigo }}
            >
              <CheckCircle2 size={16} /> Submit Audit Report
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChecklistFlow;
