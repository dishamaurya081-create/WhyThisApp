import React from 'react';
import { ArrowRight, PlayCircle, ShieldCheck, Zap, Split, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onStartCompare: () => void;
  onTryDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartCompare, onTryDemo }) => {
  return (
    <section className="relative pt-12 pb-16 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-brand-200/50 via-teal-100/40 to-emerald-100/50 blur-3xl -z-10 rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center px-4 sm:px-6">
        {/* Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 text-brand-800 text-xs font-semibold mb-6 shadow-2xs">
          <ShieldCheck className="w-4 h-4 text-brand-600" />
          <span>Purpose-Aware Permission Comparison</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
          Two apps. Same job.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-teal-600 to-accent-dark">
            One clear answer
          </span>{' '}
          about who asks for more.
        </h1>

        {/* Supporting text */}
        <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Understand permission differences between apps before you choose which one to use.
          Evaluated strictly by category purpose, not arbitrary threat scores.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onStartCompare}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-600/25 flex items-center justify-center gap-2 transition-all hover:gap-3 cursor-pointer"
          >
            <span>Compare Apps</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onTryDemo}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-200/90 shadow-2xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <PlayCircle className="w-4 h-4 text-brand-600" />
            <span>Try Pre-loaded Demos</span>
          </button>
        </div>

        {/* Interactive Micro-Teaser Comparison Preview */}
        <div className="mt-12 max-w-3xl mx-auto p-4 sm:p-5 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-md">
          <div className="text-xs uppercase font-bold text-slate-500 tracking-wider mb-3 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-brand-700">
              <Zap className="w-3.5 h-3.5 text-amber-500" /> Quick Flashlight Example
            </span>
            <span className="text-slate-400">Deterministic Evaluation</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-slate-900 text-sm">Torch App A</span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Minimal
                </span>
              </div>
              <p className="text-xs text-slate-600">Requests: Camera & Flashlight hardware driver</p>
              <div className="mt-2 text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% purpose-aligned
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-200">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-slate-900 text-sm">Torch App B</span>
                <span className="text-[10px] font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded-full">
                  3 Mismatches
                </span>
              </div>
              <p className="text-xs text-slate-600">Requests: Camera, Contacts, GPS, Read SMS</p>
              <div className="mt-2 text-[11px] text-rose-700 font-semibold flex items-center gap-1">
                <Split className="w-3.5 h-3.5" /> Asks for private data unrelated to torch
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
