// File: src/components/inspector/EvidenceCapture.jsx
import React, { useRef } from 'react';
import { Camera, X, Image as ImageIcon } from 'lucide-react';
import { uid } from '../../utils/helpers';
import { COLOR_TOKENS, CARD_SHADOW } from '../../config/constants';

export function EvidenceCapture({ photos = [], onPhotosChange }) {
  const fileInputRef = useRef(null);

  const handleFiles = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const newPhoto = {
          id: uid('photo'),
          url: reader.result,
          name: file.name,
          timestamp: new Date().toISOString(),
          geotagged: true,
        };
        onPhotosChange([...photos, newPhoto]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const removePhoto = (id) => {
    onPhotosChange(photos.filter((p) => p.id !== id));
  };

  return (
    <div className="rounded-2xl bg-white p-4" style={{ boxShadow: CARD_SHADOW }}>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-bold text-sm" style={{ color: COLOR_TOKENS.ink }}>
          <Camera size={16} color={COLOR_TOKENS.indigo} />
          Photo Evidence Capture
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors"
          style={{ backgroundColor: COLOR_TOKENS.indigoSoft, color: COLOR_TOKENS.indigo }}
        >
          <Camera size={13} />
          Add Photo
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          multiple
          className="hidden"
          onChange={handleFiles}
        />
      </div>

      {photos.length === 0 ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-4 text-center transition-colors hover:bg-gray-50"
          style={{ borderColor: COLOR_TOKENS.border }}
        >
          <ImageIcon size={24} color={COLOR_TOKENS.inkMuted} />
          <p className="mt-1 text-xs font-semibold" style={{ color: COLOR_TOKENS.inkMuted }}>
            Tap to capture or select photo evidence
          </p>
        </div>
      ) : (
        <div className="mt-2 flex gap-2.5 overflow-x-auto pb-1 nigrani-scroll">
          {photos.map((p) => (
            <div key={p.id} className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border" style={{ borderColor: COLOR_TOKENS.border }}>
              <img src={p.url} alt={p.name || 'Inspection evidence'} className="h-full w-full object-cover" />
              <button
                onClick={() => removePhoto(p.id)}
                className="absolute right-1 top-1 rounded-full bg-black/60 p-1 transition-colors hover:bg-black"
                title="Remove photo"
              >
                <X size={10} color="#ffffff" />
              </button>
              <div className="absolute bottom-0 inset-x-0 bg-black/50 px-1 py-0.5 text-[9px] font-bold text-white text-center truncate">
                Geotagged
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EvidenceCapture;
