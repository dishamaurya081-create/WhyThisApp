import React from 'react';
import { Category } from '../../types';
import { DEMO_CONFIGS } from '../../data/demoData';
import { Flashlight, FileText, CloudSun, CheckCircle2, Sliders } from 'lucide-react';

interface DemoSelectorProps {
  selectedDemo: Category;
  onSelectDemo: (demoId: Category) => void;
  // Specific interactive toggle for the PDF Reader demo
  pdfScanningEnabled?: boolean;
  onTogglePdfScanning?: (enabled: boolean) => void;
}

export const DemoSelector: React.FC<DemoSelectorProps> = ({
  selectedDemo,
  onSelectDemo,
  pdfScanningEnabled = false,
  onTogglePdfScanning,
}) => {
  const getDemoIcon = (id: Category) => {
    switch (id) {
      case 'torch':
        return <Flashlight className="w-5 h-5 text-amber-500" />;
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-500" />;
      case 'weather':
        return <CloudSun className="w-5 h-5 text-cyan-500" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Category Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {DEMO_CONFIGS.map(demo => {
          const isSelected = selectedDemo === demo.id;

          return (
            <button
              key={demo.id}
              type="button"
              onClick={() => onSelectDemo(demo.id)}
              className={`p-4 rounded-2xl text-left border transition-all cursor-pointer relative ${
                isSelected
                  ? 'bg-white border-brand-500 ring-2 ring-brand-500/20 shadow-sm'
                  : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-xl bg-slate-100">{getDemoIcon(demo.id)}</div>
                <span
                  className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-brand-50 text-brand-700 border border-brand-200'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {demo.badge}
                </span>
              </div>

              <h4 className="font-bold text-slate-900 text-base">{demo.title}</h4>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                {demo.shortDescription}
              </p>

              <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] font-semibold text-brand-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{demo.keyTakeaway}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Feature Simulator Callout for PDF Reader */}
      {selectedDemo === 'pdf' && onTogglePdfScanning && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-brand-50/60 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-start gap-2.5">
            <div className="p-2 rounded-lg bg-amber-100 text-amber-800 flex-shrink-0 mt-0.5">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                Interactive Judge Simulator: Toggle "Document Scanning" on Reader B
              </span>
              <p className="text-xs text-slate-600 mt-0.5">
                Observe how the deterministic rule engine re-evaluates <strong>Camera</strong> from{' '}
                <span className="font-semibold text-rose-600">High Mismatch</span> to{' '}
                <span className="font-semibold text-emerald-600">Expected</span> in real time.
              </p>
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs hover:bg-slate-50 flex-shrink-0">
            <input
              type="checkbox"
              checked={pdfScanningEnabled}
              onChange={e => onTogglePdfScanning(e.target.checked)}
              className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
            />
            <span className="text-xs font-bold text-slate-800">
              Enable Document Scanning
            </span>
          </label>
        </div>
      )}
    </div>
  );
};
