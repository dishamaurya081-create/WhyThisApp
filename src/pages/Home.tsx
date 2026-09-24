import React from 'react';
import { Hero } from '../components/home/Hero';
import { HowItWorks } from '../components/home/HowItWorks';
import { ShieldCheck, PlayCircle, PlusCircle, CheckCircle2, Split, Sparkles } from 'lucide-react';

interface HomeProps {
  onStartCompare: () => void;
  onTryDemo: () => void;
}

export const Home: React.FC<HomeProps> = ({ onStartCompare, onTryDemo }) => {
  return (
    <div className="space-y-12">
      <Hero onStartCompare={onStartCompare} onTryDemo={onTryDemo} />

      <HowItWorks />

      {/* Feature Principles Grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900/60 border border-brand-500/40 text-brand-300 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Core Architectural Principle</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Rules Decide The Mismatch. AI Does Not Decide The Mismatch.
            </h3>

            <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              WhyThisApp replaces subjective "threat scores" with deterministic, category-aware permission intelligence. An exact same permission yields radically different evaluations depending on the stated app job:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-xs uppercase font-bold text-brand-400 tracking-wider">
                  Weather Category
                </span>
                <h4 className="text-base font-bold text-white mt-1">Precise Location</h4>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
                  <CheckCircle2 className="w-3 h-3" /> Expected
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Legitimate for pinpoint weather forecast data.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                  Torch Category
                </span>
                <h4 className="text-base font-bold text-white mt-1">Precise Location</h4>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold">
                  <Split className="w-3 h-3" /> High Mismatch
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  A hardware light toggle has zero need for GPS coords.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-xs uppercase font-bold text-teal-400 tracking-wider">
                  PDF Reader Category
                </span>
                <h4 className="text-base font-bold text-white mt-1">Camera Sensor</h4>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold">
                  <span>Context-Aware</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Expected if document scanning exists; High Mismatch without it.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={onTryDemo}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <PlayCircle className="w-4 h-4" />
                <span>See It in Action (Demos)</span>
              </button>

              <button
                onClick={onStartCompare}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Create Custom Comparison</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
