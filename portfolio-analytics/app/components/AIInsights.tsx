'use client';

import { useState } from 'react';
import { Sparkles, Copy, Check, ArrowRight } from 'lucide-react';

interface AIInsightsProps {
  insights: string[];
}

export function AIInsights({ insights }: AIInsightsProps) {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div
      className="p-6 rounded-2xl chart-enter"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid rgba(0, 102, 255, 0.15)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0, 102, 255, 0.06)',
        backdropFilter: 'blur(12px)',
        animationDelay: '240ms',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <div
          className="w-6 h-6 rounded-md flex items-center justify-center"
          style={{ background: 'rgba(0, 212, 170, 0.1)' }}
        >
          <Sparkles size={14} style={{ color: '#00D4AA' }} />
        </div>
        <span
          className="text-[13px] font-semibold uppercase tracking-wide"
          style={{
            background: 'linear-gradient(90deg, #0066FF, #00D4AA)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          AI Insights
        </span>
      </div>

      {/* Insights List */}
      <div className="space-y-3 mb-5">
        {insights.map((insight, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 p-3.5 rounded-xl transition-all group"
            style={{
              background: 'var(--color-border)',
            }}
          >
            <p className="text-[14px] leading-relaxed flex-1" style={{ color: 'var(--color-text-primary)' }}>
              {insight}
            </p>
            <button
              onClick={() => handleCopy(insight, idx)}
              className="shrink-0 p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-all"
              style={{ color: 'var(--color-text-tertiary)' }}
              aria-label={`Copy insight: ${insight.slice(0, 30)}`}
            >
              {copiedIdx === idx ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
            </button>
          </div>
        ))}
        {insights.length === 0 && (
          <p className="text-[14px] py-4 text-center" style={{ color: 'var(--color-text-tertiary)' }}>
            Awaiting data to generate insights.
          </p>
        )}
      </div>

      {/* CTA */}
      <button
        className="w-full py-2.5 rounded-xl text-[14px] font-semibold flex items-center justify-center gap-2 transition-all"
        style={{
          background: 'linear-gradient(135deg, #0066FF 0%, #0052CC 100%)',
          color: 'white',
          boxShadow: '0 2px 8px rgba(0, 102, 255, 0.3)',
        }}
        aria-label="Generate a full analytics report"
      >
        Generate Full Report
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
