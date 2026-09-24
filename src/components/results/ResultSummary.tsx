import React from 'react';
import { ComparisonData } from '../../types';
import { PERMISSION_MAP } from '../../data/permissions';
import { AlertCircle, Info, Sparkles, Split } from 'lucide-react';

interface ResultSummaryProps {
  comparison: ComparisonData;
}

export const ResultSummary: React.FC<ResultSummaryProps> = ({ comparison }) => {
  const { app1, app2, summary } = comparison;

  const totalFlagged =
    app1.highMismatchCount +
    app1.mediumMismatchCount +
    app2.highMismatchCount +
    app2.mediumMismatchCount;

  const totalHigh = app1.highMismatchCount + app2.highMismatchCount;
  const totalMedium = app1.mediumMismatchCount + app2.mediumMismatchCount;
  const totalExpected = app1.expectedCount + app2.expectedCount;

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-brand-100/40 via-teal-50/20 to-transparent pointer-events-none rounded-full blur-2xl" />

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Purpose-Aware Comparison Analysis</span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {totalFlagged === 0 ? (
                  <span className="text-emerald-700">No unusual permissions found</span>
                ) : (
                  <span>
                    <strong className="text-rose-600">{totalFlagged}</strong> unusual permission{totalFlagged === 1 ? '' : 's'} identified
                  </span>
                )}
              </h2>
            </div>

            {/* Metric Chips */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                High mismatches: {totalHigh}
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-700 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Medium mismatches: {totalMedium}
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Expected: {totalExpected}
              </div>
            </div>
          </div>

          {/* Statement */}
          <div className="mt-4 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-brand-50 text-brand-600 mt-0.5 flex-shrink-0">
              <Split className="w-5 h-5" />
            </div>
            <div>
              <p className="text-base font-semibold text-slate-800 leading-snug">
                {summary.differenceStatement}
              </p>
              <div className="mt-3 flex items-start gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                <Info className="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Important Notice:</strong> {summary.notice}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shared vs Differing Permissions Pill Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <span className="font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Common To Both ({summary.sharedPermissions.length})
          </span>
          {summary.sharedPermissions.length === 0 ? (
            <span className="text-slate-400 italic">No permissions shared</span>
          ) : (
            <div className="flex flex-wrap gap-1.5 mt-1">
              {summary.sharedPermissions.map(p => (
                <span key={p} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                  {PERMISSION_MAP[p]?.label || p}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <span className="font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Only in {app1.name} ({summary.exclusiveToApp1.length})
          </span>
          {summary.exclusiveToApp1.length === 0 ? (
            <span className="text-slate-400 italic">No exclusive permissions</span>
          ) : (
            <div className="flex flex-wrap gap-1.5 mt-1">
              {summary.exclusiveToApp1.map(p => (
                <span key={p} className="px-2 py-0.5 rounded-md bg-brand-50 text-brand-800 border border-brand-200 font-medium">
                  {PERMISSION_MAP[p]?.label || p}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <span className="font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Only in {app2.name} ({summary.exclusiveToApp2.length})
          </span>
          {summary.exclusiveToApp2.length === 0 ? (
            <span className="text-slate-400 italic">No exclusive permissions</span>
          ) : (
            <div className="flex flex-wrap gap-1.5 mt-1">
              {summary.exclusiveToApp2.map(p => (
                <span key={p} className="px-2 py-0.5 rounded-md bg-brand-50 text-brand-800 border border-brand-200 font-medium">
                  {PERMISSION_MAP[p]?.label || p}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
