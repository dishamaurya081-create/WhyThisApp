import React from 'react';
import { MismatchStatus } from '../../types';
import { CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';

interface MismatchBadgeProps {
  status: MismatchStatus;
  size?: 'sm' | 'md' | 'lg';
}

export const MismatchBadge: React.FC<MismatchBadgeProps> = ({ status, size = 'md' }) => {
  if (status === 'expected') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 ${
          size === 'sm'
            ? 'px-2 py-0.5 text-xs'
            : size === 'lg'
            ? 'px-3.5 py-1.5 text-sm font-semibold'
            : 'px-2.5 py-1 text-xs'
        }`}
      >
        <CheckCircle2 className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
        <span>Expected</span>
      </span>
    );
  }

  if (status === 'medium') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-amber-50 text-amber-800 border border-amber-300/80 ${
          size === 'sm'
            ? 'px-2 py-0.5 text-xs'
            : size === 'lg'
            ? 'px-3.5 py-1.5 text-sm font-semibold'
            : 'px-2.5 py-1 text-xs'
        }`}
      >
        <AlertTriangle className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
        <span>Medium Mismatch</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full bg-rose-50 text-rose-700 border border-rose-200 ${
        size === 'sm'
          ? 'px-2 py-0.5 text-xs'
          : size === 'lg'
          ? 'px-3.5 py-1.5 text-sm font-bold'
          : 'px-2.5 py-1 text-xs'
      }`}
    >
      <ShieldAlert className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      <span>High Mismatch</span>
    </span>
  );
};
