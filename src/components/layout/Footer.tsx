import React from 'react';
import { ShieldCheck, Lock, Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-brand-600 text-white flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="font-extrabold text-base text-slate-900 tracking-tight">
                WhyThis<span className="text-brand-600">App</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-md">
              A purpose-aware permission comparison tool. Helping everyday users discover which app asks for more when two apps do the exact same job.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700">
              <Cpu className="w-3.5 h-3.5 text-brand-600" />
              <span>Deterministic Rule Engine</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700">
              <Lock className="w-3.5 h-3.5 text-brand-600" />
              <span>100% Client-Side Privacy</span>
            </span>
          </div>
        </div>

        {/* Mandatory Hackathon Disclaimer */}
        <div className="mt-6 pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-center sm:text-left leading-relaxed">
            <strong>Important Prototype Scope:</strong> Prototype uses manually entered and simulated permission data. It does not scan installed apps or monitor your device.
          </p>
          <div className="text-slate-400 whitespace-nowrap text-[11px]">
            WhyThisApp © 2026 • Round 2 Hackathon Prototype
          </div>
        </div>
      </div>
    </footer>
  );
};
