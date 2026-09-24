import React from 'react';
import { Smartphone } from 'lucide-react';

interface AppInputProps {
  app1Name: string;
  app2Name: string;
  setApp1Name: (name: string) => void;
  setApp2Name: (name: string) => void;
}

export const AppInput: React.FC<AppInputProps> = ({
  app1Name,
  app2Name,
  setApp1Name,
  setApp2Name,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* App 1 Name */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <label className="block text-xs uppercase font-extrabold tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
          <Smartphone className="w-3.5 h-3.5 text-brand-600" />
          <span>Step 2 — App 1 Name</span>
        </label>
        <input
          type="text"
          value={app1Name}
          onChange={e => setApp1Name(e.target.value)}
          placeholder="e.g. Standard Reader Pro"
          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all placeholder:text-slate-400"
        />
        <span className="text-[11px] text-slate-400 mt-1 block">
          The first application to compare
        </span>
      </div>

      {/* App 2 Name */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <label className="block text-xs uppercase font-extrabold tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
          <Smartphone className="w-3.5 h-3.5 text-teal-600" />
          <span>Step 3 — App 2 Name</span>
        </label>
        <input
          type="text"
          value={app2Name}
          onChange={e => setApp2Name(e.target.value)}
          placeholder="e.g. Reader & Scanner Plus"
          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all placeholder:text-slate-400"
        />
        <span className="text-[11px] text-slate-400 mt-1 block">
          The alternative application performing the same task
        </span>
      </div>
    </div>
  );
};
