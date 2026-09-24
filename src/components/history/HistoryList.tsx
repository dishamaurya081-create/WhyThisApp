import React from 'react';
import { ComparisonData } from '../../types';
import { CATEGORIES } from '../../data/permissions';
import { History, Trash2, ArrowRight, Clock, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface HistoryListProps {
  history: ComparisonData[];
  onSelectComparison: (comparison: ComparisonData) => void;
  onClearHistory: () => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({
  history,
  onSelectComparison,
  onClearHistory,
}) => {
  if (history.length === 0) {
    return null;
  }

  const formatTime = (ts: number) => {
    try {
      const d = new Date(ts);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' • ' + d.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } catch {
      return 'Recent';
    }
  };

  return (
    <div className="mt-12 pt-8 border-t border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-brand-600" />
          <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
            Recent Comparisons ({history.length})
          </h3>
        </div>

        <button
          type="button"
          onClick={onClearHistory}
          className="inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-semibold cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear History</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {history.map(item => {
          const cat = CATEGORIES[item.category];
          const totalFlagged = item.app1.totalUnusual + item.app2.totalUnusual;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectComparison(item)}
              className="p-4 rounded-xl bg-white border border-slate-200 hover:border-brand-400 hover:shadow-xs transition-all text-left group flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                  <span className="font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                    {cat?.name || item.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatTime(item.timestamp)}
                  </span>
                </div>

                <div className="font-bold text-slate-900 text-sm group-hover:text-brand-700 transition-colors">
                  {item.app1.name} <span className="text-slate-400 font-normal">vs</span> {item.app2.name}
                </div>

                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {item.summary.differenceStatement}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                {totalFlagged > 0 ? (
                  <span className="text-rose-600 font-semibold flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    {totalFlagged} unusual permission{totalFlagged === 1 ? '' : 's'}
                  </span>
                ) : (
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    All aligned
                  </span>
                )}

                <span className="text-brand-600 font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                  View <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
