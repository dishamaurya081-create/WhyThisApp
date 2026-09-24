import React, { useState } from 'react';
import { parsePermissionsText, PERMISSION_MAP } from '../../data/permissions';
import { ClipboardPaste, Check, AlertCircle } from 'lucide-react';

interface PastePermissionsProps {
  appName: string;
  onApplyPermissions: (permissions: string[]) => void;
}

export const PastePermissions: React.FC<PastePermissionsProps> = ({
  appName,
  onApplyPermissions,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rawText, setRawText] = useState('');
  const [parsedIds, setParsedIds] = useState<string[]>([]);

  const handleTextChange = (text: string) => {
    setRawText(text);
    const parsed = parsePermissionsText(text);
    setParsedIds(parsed);
  };

  const handleApply = () => {
    if (parsedIds.length > 0) {
      onApplyPermissions(parsedIds);
      setIsOpen(false);
      setRawText('');
      setParsedIds([]);
    }
  };

  return (
    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ClipboardPaste className="w-4 h-4 text-brand-600" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Paste Permission List for {appName || 'App'}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs font-semibold text-brand-700 hover:text-brand-800 underline"
        >
          {isOpen ? 'Close Quick Paste' : 'Open Quick Paste Tool'}
        </button>
      </div>

      {isOpen && (
        <div className="mt-3 pt-3 border-t border-slate-200/80 space-y-3">
          <textarea
            rows={3}
            value={rawText}
            onChange={e => handleTextChange(e.target.value)}
            placeholder={"Paste permissions here, e.g.:\nCamera\nContacts\nLocation\nSMS"}
            className="w-full p-2.5 rounded-lg border border-slate-300 text-xs font-mono text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 placeholder:text-slate-400"
          />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="text-xs text-slate-500">
              {parsedIds.length > 0 ? (
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 inline" /> Recognized {parsedIds.length} permission(s):{' '}
                  <span className="font-normal text-slate-700">
                    {parsedIds.map(id => PERMISSION_MAP[id]?.label || id).join(', ')}
                  </span>
                </span>
              ) : rawText.trim() ? (
                <span className="text-amber-600">No matching permissions detected yet</span>
              ) : (
                <span>Type or paste permission text above</span>
              )}
            </div>

            <button
              type="button"
              disabled={parsedIds.length === 0}
              onClick={handleApply}
              className="px-3.5 py-1.5 rounded-lg bg-brand-600 text-white font-bold text-xs shadow-2xs hover:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Apply to {appName || 'App'}</span>
            </button>
          </div>

          {/* Prompt requirement notice */}
          <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200 text-[11px] text-amber-800 flex items-start gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-amber-600" />
            <span>
              Enter permissions as listed for the app. This prototype does not scan your device.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
