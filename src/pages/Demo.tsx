import React, { useState, useMemo } from 'react';
import { Category } from '../types';
import { getDemoComparison } from '../data/demoData';
import { DemoSelector } from '../components/demo/DemoSelector';
import { ResultSummary } from '../components/results/ResultSummary';
import { ComparisonCard } from '../components/results/ComparisonCard';
import { ExplanationCard } from '../components/results/ExplanationCard';
import { PlusCircle, PlayCircle, ShieldCheck } from 'lucide-react';

interface DemoProps {
  onGoToCompare: () => void;
}

export const Demo: React.FC<DemoProps> = ({ onGoToCompare }) => {
  const [selectedDemo, setSelectedDemo] = useState<Category>('torch');
  const [pdfScanningEnabled, setPdfScanningEnabled] = useState(false);

  // Dynamically compute demo comparison through the real deterministic rule engine
  const comparison = useMemo(() => {
    return getDemoComparison(selectedDemo, {
      app2Scanning: pdfScanningEnabled,
    });
  }, [selectedDemo, pdfScanningEnabled]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200 mb-1.5">
            <PlayCircle className="w-3.5 h-3.5 text-brand-600" />
            <span>Interactive Round 2 Demo Scenarios</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Original Hackathon Demos
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Choose an official demo scenario to test the deterministic rule engine on real app comparisons.
          </p>
        </div>

        <button
          onClick={onGoToCompare}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex-shrink-0 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create Custom Comparison</span>
        </button>
      </div>

      {/* Demo Selector Tabs */}
      <DemoSelector
        selectedDemo={selectedDemo}
        onSelectDemo={demoId => {
          setSelectedDemo(demoId);
          if (demoId !== 'pdf') {
            setPdfScanningEnabled(false);
          }
        }}
        pdfScanningEnabled={pdfScanningEnabled}
        onTogglePdfScanning={setPdfScanningEnabled}
      />

      {/* Top Result Summary */}
      <ResultSummary comparison={comparison} />

      {/* Side-by-Side Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ComparisonCard
          app={comparison.app1}
          exclusivePermissions={comparison.summary.exclusiveToApp1}
          isWinner={comparison.summary.morePermissiveApp === 'app2'}
        />

        <ComparisonCard
          app={comparison.app2}
          exclusivePermissions={comparison.summary.exclusiveToApp2}
          isWinner={comparison.summary.morePermissiveApp === 'app1'}
        />
      </div>

      {/* Plain Language Explanations */}
      <ExplanationCard comparison={comparison} />

      {/* Bottom CTA Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-600 to-teal-700 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold">Ready to test your own two apps?</h3>
          <p className="text-xs text-brand-100 mt-1">
            Use the Custom Comparison wizard to input real Android app names and permissions.
          </p>
        </div>
        <button
          onClick={onGoToCompare}
          className="px-5 py-2.5 rounded-xl bg-white text-brand-900 font-bold text-xs uppercase tracking-wider hover:bg-brand-50 transition-colors shadow-2xs flex-shrink-0 cursor-pointer"
        >
          Create Your Own Comparison →
        </button>
      </div>
    </div>
  );
};
