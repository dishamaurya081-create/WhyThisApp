import React from 'react';
import { EvaluatedApp } from '../../types';
import { PermissionRow } from './PermissionRow';
import { ShieldCheck, AlertOctagon, CheckCircle2, ShieldAlert } from 'lucide-react';

interface ComparisonCardProps {
  app: EvaluatedApp;
  exclusivePermissions: string[];
  isWinner?: boolean;
}

export const ComparisonCard: React.FC<ComparisonCardProps> = ({
  app,
  exclusivePermissions,
  isWinner,
}) => {
  const hasHighMismatches = app.highMismatchCount > 0;
  const hasMediumMismatches = app.mediumMismatchCount > 0;
  const isMinimal = !hasHighMismatches && !hasMediumMismatches;

  return (
    <div
      className={`rounded-2xl border bg-white shadow-sm overflow-hidden flex flex-col transition-all ${
        isWinner
          ? 'border-brand-500/60 ring-2 ring-brand-500/20 shadow-md'
          : hasHighMismatches
          ? 'border-rose-300 ring-1 ring-rose-200'
          : 'border-slate-200'
      }`}
    >
      {/* Header */}
      <div
        className={`p-5 border-b ${
          isMinimal
            ? 'bg-gradient-to-br from-emerald-50/70 via-white to-brand-50/40 border-emerald-100'
            : hasHighMismatches
            ? 'bg-gradient-to-br from-rose-50/70 via-white to-amber-50/30 border-rose-100'
            : 'bg-slate-50 border-slate-200'
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-slate-500">
              Application
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-0.5">
              {app.name}
            </h3>
          </div>

          <div>
            {isMinimal ? (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5" />
                Minimal / Aligned
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-300">
                <AlertOctagon className="w-3.5 h-3.5" />
                Needs Review
              </span>
            )}
          </div>
        </div>

        {/* Feature status badges if present */}
        {app.features.documentScanning !== undefined && (
          <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
            <span>Doc Scanning:</span>
            <strong className={app.features.documentScanning ? 'text-emerald-700' : 'text-slate-600'}>
              {app.features.documentScanning ? 'Enabled' : 'Disabled'}
            </strong>
          </div>
        )}

        {/* Mismatch Counts summary */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-200/70 text-center">
          <div className="bg-white/80 p-2 rounded-lg border border-slate-200/80">
            <span className="block text-lg font-bold text-emerald-600">
              {app.expectedCount}
            </span>
            <span className="text-[11px] font-medium text-slate-500 uppercase tracking-tight">
              Expected
            </span>
          </div>
          <div className="bg-white/80 p-2 rounded-lg border border-slate-200/80">
            <span className="block text-lg font-bold text-amber-600">
              {app.mediumMismatchCount}
            </span>
            <span className="text-[11px] font-medium text-slate-500 uppercase tracking-tight">
              Medium
            </span>
          </div>
          <div className="bg-white/80 p-2 rounded-lg border border-slate-200/80">
            <span className="block text-lg font-bold text-rose-600">
              {app.highMismatchCount}
            </span>
            <span className="text-[11px] font-medium text-slate-500 uppercase tracking-tight">
              High Mismatch
            </span>
          </div>
        </div>
      </div>

      {/* Permissions Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Requested Permissions ({app.permissions.length})
            </span>
            <span className="text-xs text-slate-500">
              {app.totalUnusual > 0 ? (
                <span className="text-rose-600 font-semibold flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 inline" /> {app.totalUnusual} flagged
                </span>
              ) : (
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 inline" /> All aligned
                </span>
              )}
            </span>
          </div>

          {app.permissions.length === 0 ? (
            <div className="p-6 text-center text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-sm">
              No permissions requested.
            </div>
          ) : (
            <div className="space-y-2.5">
              {app.results.map(res => (
                <PermissionRow
                  key={res.permissionId}
                  result={res}
                  isExclusive={exclusivePermissions.includes(res.permissionId)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer verdict text */}
        <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
          {isMinimal ? (
            <span className="text-emerald-700 font-medium">
              ✓ Requests only permissions customary for this category.
            </span>
          ) : (
            <span className="text-rose-700 font-medium">
              ⚠ Requests {app.totalUnusual} permission{app.totalUnusual === 1 ? '' : 's'} that exceed typical category needs.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
