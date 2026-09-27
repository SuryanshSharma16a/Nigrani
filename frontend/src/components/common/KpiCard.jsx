// File: src/components/common/KpiCard.jsx
import React from 'react';
import { Card } from './Card';
import { COLOR_TOKENS } from '../../config/constants';

export function KpiCard({
  icon: Icon,
  label,
  value,
  sub,
  color = COLOR_TOKENS.indigo,
  softBg = COLOR_TOKENS.indigoSoft,
  trend,
  trendUp,
  className = '',
  onClick,
}) {
  return (
    <Card className={className} onClick={onClick} hoverable={Boolean(onClick)}>
      <div className="flex items-center gap-3.5">
        {Icon && (
          <div
            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-105"
            style={{ backgroundColor: softBg }}
          >
            <Icon size={22} color={color} strokeWidth={2.2} />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="truncate text-xs font-medium" style={{ color: COLOR_TOKENS.inkMuted }}>
            {label}
          </div>
          <div className="mt-0.5 text-2xl font-extrabold tracking-tight" style={{ color: COLOR_TOKENS.ink }}>
            {value}
          </div>
        </div>
      </div>
      {(sub || trend) && (
        <div className="mt-3.5 flex items-center justify-between border-t pt-2.5 text-xs" style={{ borderColor: COLOR_TOKENS.border }}>
          {sub && <span style={{ color: COLOR_TOKENS.inkMuted }}>{sub}</span>}
          {trend && (
            <span
              className={`font-semibold ${
                trendUp === true
                  ? 'text-emerald-600'
                  : trendUp === false
                  ? 'text-red-500'
                  : 'text-gray-500'
              }`}
            >
              {trend}
            </span>
          )}
        </div>
      )}
    </Card>
  );
}

export default KpiCard;
