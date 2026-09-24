import React from 'react';
import { Layers, CheckSquare, BrainCircuit, ShieldAlert, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-xs uppercase font-extrabold tracking-wider text-brand-600">
          How It Works
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
          Compare → Check → Understand
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          Three simple steps to clarify what an app needs versus what it unnecessarily asks for.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {/* Step 1 */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-sm transition-all relative">
          <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-base mb-4 border border-brand-200">
            1
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-4 h-4 text-brand-600" />
            <h3 className="font-bold text-slate-900 text-base">
              Choose App Category
            </h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Pick two apps designed for the exact same function (e.g. Flashlight, PDF Reader, or Weather).
          </p>
        </div>

        {/* Step 2 */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-sm transition-all relative">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-base mb-4 border border-teal-200">
            2
          </div>
          <div className="flex items-center gap-2 mb-2">
            <CheckSquare className="w-4 h-4 text-teal-600" />
            <h3 className="font-bold text-slate-900 text-base">
              Compare Permissions
            </h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Select or paste the requested permissions for both apps. Declare any specific features like document scanning.
          </p>
        </div>

        {/* Step 3 */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-sm transition-all relative">
          <div className="w-10 h-10 rounded-xl bg-accent-light/20 text-accent-dark flex items-center justify-center font-bold text-base mb-4 border border-accent/30">
            3
          </div>
          <div className="flex items-center gap-2 mb-2">
            <BrainCircuit className="w-4 h-4 text-accent-dark" />
            <h3 className="font-bold text-slate-900 text-base">
              Understand Mismatches
            </h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            The category-aware rule engine highlights which permissions exceed the stated purpose and explains why.
          </p>
        </div>
      </div>

      {/* Scope Disclaimer Callout */}
      <div className="mt-10 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-brand-50/70 to-slate-50 border border-brand-200/80 text-xs text-slate-700 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="p-2 rounded-xl bg-brand-600 text-white flex-shrink-0">
          <ShieldAlert className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <p className="leading-relaxed">
            <strong>Purpose Mismatch vs. Malware Detection:</strong> WhyThisApp evaluates whether permissions match what an app is supposed to do. It does not inspect code binaries, label apps as malicious, or replace security software.
          </p>
        </div>
      </div>
    </section>
  );
};
