import React from 'react';
import { Category, AppFeatures } from '../../types';
import { ScanLine, Mic, Camera, HelpCircle } from 'lucide-react';

interface FeatureSelectorProps {
  category: Category;
  app1Name: string;
  app2Name: string;
  app1Features: AppFeatures;
  app2Features: AppFeatures;
  setApp1Features: React.Dispatch<React.SetStateAction<AppFeatures>>;
  setApp2Features: React.Dispatch<React.SetStateAction<AppFeatures>>;
}

export const FeatureSelector: React.FC<FeatureSelectorProps> = ({
  category,
  app1Name,
  app2Name,
  app1Features,
  app2Features,
  setApp1Features,
  setApp2Features,
}) => {
  if (category === 'pdf') {
    return (
      <div className="p-4 rounded-xl bg-brand-50/50 border border-brand-200/80">
        <div className="flex items-center gap-2 mb-2">
          <ScanLine className="w-4 h-4 text-brand-600" />
          <h4 className="text-xs uppercase font-extrabold tracking-wider text-brand-900">
            Feature Toggles: Document Scanning
          </h4>
        </div>
        <p className="text-xs text-slate-600 mb-3">
          If an app includes an active document scanner feature, camera permission is considered <strong>Expected</strong>. Without scanning, camera access is flagged as a <strong>Mismatch</strong>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <label className="flex items-center gap-2.5 p-3 rounded-lg bg-white border border-slate-200 cursor-pointer hover:bg-slate-50">
            <input
              type="checkbox"
              checked={!!app1Features.documentScanning}
              onChange={e =>
                setApp1Features(prev => ({
                  ...prev,
                  documentScanning: e.target.checked,
                }))
              }
              className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
            />
            <span className="font-semibold text-slate-800">
              {app1Name || 'App 1'}: Has Document Scanning Feature
            </span>
          </label>

          <label className="flex items-center gap-2.5 p-3 rounded-lg bg-white border border-slate-200 cursor-pointer hover:bg-slate-50">
            <input
              type="checkbox"
              checked={!!app2Features.documentScanning}
              onChange={e =>
                setApp2Features(prev => ({
                  ...prev,
                  documentScanning: e.target.checked,
                }))
              }
              className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
            />
            <span className="font-semibold text-slate-800">
              {app2Name || 'App 2'}: Has Document Scanning Feature
            </span>
          </label>
        </div>
      </div>
    );
  }

  if (category === 'weather') {
    return (
      <div className="p-4 rounded-xl bg-cyan-50/50 border border-cyan-200/80">
        <div className="flex items-center gap-2 mb-2">
          <Camera className="w-4 h-4 text-cyan-700" />
          <h4 className="text-xs uppercase font-extrabold tracking-wider text-cyan-900">
            Feature Toggles: Storm Photo Reports
          </h4>
        </div>
        <p className="text-xs text-slate-600 mb-3">
          If enabled, users can upload storm photos, justifying Camera access in a weather app.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <label className="flex items-center gap-2.5 p-3 rounded-lg bg-white border border-slate-200 cursor-pointer hover:bg-slate-50">
            <input
              type="checkbox"
              checked={!!app1Features.crowdsourcedPhotos}
              onChange={e =>
                setApp1Features(prev => ({
                  ...prev,
                  crowdsourcedPhotos: e.target.checked,
                }))
              }
              className="w-4 h-4 text-cyan-600 rounded border-slate-300 focus:ring-cyan-500"
            />
            <span className="font-semibold text-slate-800">
              {app1Name || 'App 1'}: Community Storm Photo Uploads
            </span>
          </label>

          <label className="flex items-center gap-2.5 p-3 rounded-lg bg-white border border-slate-200 cursor-pointer hover:bg-slate-50">
            <input
              type="checkbox"
              checked={!!app2Features.crowdsourcedPhotos}
              onChange={e =>
                setApp2Features(prev => ({
                  ...prev,
                  crowdsourcedPhotos: e.target.checked,
                }))
              }
              className="w-4 h-4 text-cyan-600 rounded border-slate-300 focus:ring-cyan-500"
            />
            <span className="font-semibold text-slate-800">
              {app2Name || 'App 2'}: Community Storm Photo Uploads
            </span>
          </label>
        </div>
      </div>
    );
  }

  return null;
};
