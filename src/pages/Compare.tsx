import React, { useState, useEffect } from 'react';
import { Category, AppFeatures, ComparisonData } from '../types';
import { evaluateApp, compareApps } from '../engine/ruleEngine';
import { CategorySelector } from '../components/compare/CategorySelector';
import { AppInput } from '../components/compare/AppInput';
import { FeatureSelector } from '../components/compare/FeatureSelector';
import { PermissionChecklist } from '../components/compare/PermissionChecklist';
import { PastePermissions } from '../components/compare/PastePermissions';
import { ResultSummary } from '../components/results/ResultSummary';
import { ComparisonCard } from '../components/results/ComparisonCard';
import { ExplanationCard } from '../components/results/ExplanationCard';
import { HistoryList } from '../components/history/HistoryList';
import {
  Sparkles,
  ArrowRight,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Share2,
} from 'lucide-react';

const STORAGE_KEY = 'whythisapp_comparisons_v1';

export const Compare: React.FC = () => {
  // Form State
  const [category, setCategory] = useState<Category>('torch');
  const [app1Name, setApp1Name] = useState('');
  const [app2Name, setApp2Name] = useState('');
  const [app1Permissions, setApp1Permissions] = useState<string[]>(['camera', 'flash_control']);
  const [app2Permissions, setApp2Permissions] = useState<string[]>([
    'camera',
    'contacts',
    'location_precise',
    'sms_read',
  ]);
  const [app1Features, setApp1Features] = useState<AppFeatures>({});
  const [app2Features, setApp2Features] = useState<AppFeatures>({});

  // Active Comparison Result State
  const [currentComparison, setCurrentComparison] = useState<ComparisonData | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  // History State
  const [history, setHistory] = useState<ComparisonData[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Save history to localStorage
  const saveToHistory = (comparison: ComparisonData) => {
    try {
      const updated = [comparison, ...history.filter(h => h.id !== comparison.id)].slice(0, 10);
      setHistory(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore localStorage errors
    }
  };

  const clearHistory = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setHistory([]);
    } catch {
      // Ignore
    }
  };

  // Run the Rule Engine
  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Empty state validations
    if (!app1Name.trim()) {
      setValidationError('Please enter a name for App 1 to continue.');
      return;
    }
    if (!app2Name.trim()) {
      setValidationError('Please enter a name for App 2 to continue.');
      return;
    }
    if (app1Permissions.length === 0 && app2Permissions.length === 0) {
      setValidationError('Please select or paste at least one permission for either app.');
      return;
    }

    // Execute category-aware rule engine on App 1
    const evaluatedApp1 = evaluateApp({
      id: `app1_${Date.now()}`,
      name: app1Name.trim(),
      category,
      permissions: app1Permissions,
      features: app1Features,
    });

    // Execute category-aware rule engine on App 2
    const evaluatedApp2 = evaluateApp({
      id: `app2_${Date.now()}`,
      name: app2Name.trim(),
      category,
      permissions: app2Permissions,
      features: app2Features,
    });

    // Generate comparison data and summaries
    const result = compareApps(evaluatedApp1, evaluatedApp2);
    setCurrentComparison(result);
    saveToHistory(result);

    // Scroll smoothly to results
    setTimeout(() => {
      document.getElementById('comparison-results-section')?.scrollIntoView({
        behavior: 'smooth',
      });
    }, 100);
  };

  const handleResetForm = () => {
    setCategory('torch');
    setApp1Name('');
    setApp2Name('');
    setApp1Permissions(['camera', 'flash_control']);
    setApp2Permissions(['camera', 'contacts', 'location_precise', 'sms_read']);
    setApp1Features({});
    setApp2Features({});
    setCurrentComparison(null);
    setValidationError(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10 py-4">
      {/* Page Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200 mb-1.5">
          <Sparkles className="w-3.5 h-3.5 text-brand-600" />
          <span>Major Round 2 Feature</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Create Your Own App Comparison
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
          Enter two real-world apps in the same category. Specify their requested permissions and features to run them through our deterministic purpose engine.
        </p>
      </div>

      {/* Comparison Creation Form */}
      <form onSubmit={handleAnalyze} className="space-y-6">
        {/* Step 1: Category */}
        <CategorySelector
          selectedCategory={category}
          onSelectCategory={cat => {
            setCategory(cat);
            // reset category-specific features
            setApp1Features({});
            setApp2Features({});
          }}
        />

        {/* Step 2 & 3: App Names */}
        <AppInput
          app1Name={app1Name}
          app2Name={app2Name}
          setApp1Name={setApp1Name}
          setApp2Name={setApp2Name}
        />

        {/* Category Features (e.g. Document Scanning for PDF) */}
        <FeatureSelector
          category={category}
          app1Name={app1Name}
          app2Name={app2Name}
          app1Features={app1Features}
          app2Features={app2Features}
          setApp1Features={setApp1Features}
          setApp2Features={setApp2Features}
        />

        {/* Step 4: Permissions Checklists & Paste Options */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-extrabold tracking-wider text-slate-500">
              Step 4 — Select or Paste Requested Permissions
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* App 1 Column */}
            <div className="space-y-3">
              <PermissionChecklist
                appName={app1Name || 'App 1'}
                selectedPermissions={app1Permissions}
                onChange={setApp1Permissions}
                accentColor="brand"
              />

              <PastePermissions
                appName={app1Name || 'App 1'}
                onApplyPermissions={parsed => {
                  setApp1Permissions(prev => Array.from(new Set([...prev, ...parsed])));
                }}
              />
            </div>

            {/* App 2 Column */}
            <div className="space-y-3">
              <PermissionChecklist
                appName={app2Name || 'App 2'}
                selectedPermissions={app2Permissions}
                onChange={setApp2Permissions}
                accentColor="teal"
              />

              <PastePermissions
                appName={app2Name || 'App 2'}
                onApplyPermissions={parsed => {
                  setApp2Permissions(prev => Array.from(new Set([...prev, ...parsed])));
                }}
              />
            </div>
          </div>
        </div>

        {/* Validation Errors */}
        {validationError && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Form Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={handleResetForm}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Fields</span>
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all hover:gap-2.5"
          >
            <span>Analyze Purpose Mismatch</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Results Section */}
      {currentComparison && (
        <div id="comparison-results-section" className="space-y-8 pt-8 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <h3 className="text-xl font-bold text-slate-900">
                Evaluation Results
              </h3>
            </div>

            <span className="text-xs text-slate-500">
              Evaluated with deterministic category rules
            </span>
          </div>

          {/* Top Result Summary */}
          <ResultSummary comparison={currentComparison} />

          {/* Side-by-side App Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ComparisonCard
              app={currentComparison.app1}
              exclusivePermissions={currentComparison.summary.exclusiveToApp1}
              isWinner={currentComparison.summary.morePermissiveApp === 'app2'}
            />

            <ComparisonCard
              app={currentComparison.app2}
              exclusivePermissions={currentComparison.summary.exclusiveToApp2}
              isWinner={currentComparison.summary.morePermissiveApp === 'app1'}
            />
          </div>

          {/* Plain Language Explanations */}
          <ExplanationCard comparison={currentComparison} />
        </div>
      )}

      {/* History of Recent Comparisons */}
      <HistoryList
        history={history}
        onSelectComparison={comp => {
          setCurrentComparison(comp);
          setCategory(comp.category);
          setApp1Name(comp.app1.name);
          setApp2Name(comp.app2.name);
          setApp1Permissions(comp.app1.permissions);
          setApp2Permissions(comp.app2.permissions);
          setApp1Features(comp.app1.features);
          setApp2Features(comp.app2.features);
          document.getElementById('comparison-results-section')?.scrollIntoView({
            behavior: 'smooth',
          });
        }}
        onClearHistory={clearHistory}
      />
    </div>
  );
};
