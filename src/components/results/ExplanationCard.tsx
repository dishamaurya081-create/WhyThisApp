import React from 'react';
import { ComparisonData } from '../../types';
import { MismatchBadge } from './MismatchBadge';
import { HelpCircle, ArrowRight, ShieldAlert } from 'lucide-react';

interface ExplanationCardProps {
  comparison: ComparisonData;
}

export const ExplanationCard: React.FC<ExplanationCardProps> = ({ comparison }) => {
  const { app1, app2 } = comparison;

  // Gather all mismatches across both apps
  const mismatches = [
    ...app1.results
      .filter(r => r.status !== 'expected')
      .map(r => ({ ...r, appName: app1.name })),
    ...app2.results
      .filter(r => r.status !== 'expected')
      .map(r => ({ ...r, appName: app2.name })),
  ];

  if (mismatches.length === 0) {
    return (
      <div className="p-6 rounded-2xl bg-white border border-slate-200 text-center">
        <p className="text-emerald-700 font-semibold">
          ✓ No unusual permissions were flagged for either app in this comparison.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
        <HelpCircle className="w-5 h-5 text-brand-600" />
        <h3 className="text-lg font-bold text-slate-900">
          Plain-Language Explanations: Why were these flagged?
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mismatches.map((m, idx) => (
          <div
            key={`${m.appName}_${m.permissionId}_${idx}`}
            className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/60 hover:bg-slate-50 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                  {m.appName}
                </span>
                <MismatchBadge status={m.status} size="sm" />
              </div>

              <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm mt-1">
                <span>{m.permissionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs font-semibold text-rose-600">
                  {m.reason}
                </span>
              </div>

              <p className="text-xs text-slate-600 mt-2 leading-relaxed bg-white p-3 rounded-lg border border-slate-100">
                "{m.explanation}"
              </p>
            </div>

            {m.featureRelevance && (
              <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] text-brand-800">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
                <span>Feature Context: {m.featureRelevance}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
