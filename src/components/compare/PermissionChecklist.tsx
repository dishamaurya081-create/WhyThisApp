import React from 'react';
import { AVAILABLE_PERMISSIONS } from '../../data/permissions';
import {
  Camera,
  Zap,
  Users,
  MapPin,
  Compass,
  MessageSquare,
  Send,
  PhoneCall,
  Phone,
  Mic,
  HardDrive,
  Bell,
  Shield,
  CheckSquare,
  Square,
} from 'lucide-react';

interface PermissionChecklistProps {
  appName: string;
  selectedPermissions: string[];
  onChange: (permissions: string[]) => void;
  accentColor?: 'brand' | 'teal';
}

const getPermissionIcon = (id: string) => {
  switch (id) {
    case 'camera':
      return <Camera className="w-3.5 h-3.5 text-brand-600" />;
    case 'flash_control':
      return <Zap className="w-3.5 h-3.5 text-amber-500" />;
    case 'contacts':
      return <Users className="w-3.5 h-3.5 text-purple-600" />;
    case 'location_precise':
      return <MapPin className="w-3.5 h-3.5 text-blue-600" />;
    case 'location_approx':
      return <Compass className="w-3.5 h-3.5 text-cyan-600" />;
    case 'sms_read':
      return <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />;
    case 'sms_send':
      return <Send className="w-3.5 h-3.5 text-indigo-600" />;
    case 'call_logs':
      return <PhoneCall className="w-3.5 h-3.5 text-red-500" />;
    case 'phone':
      return <Phone className="w-3.5 h-3.5 text-teal-600" />;
    case 'microphone':
      return <Mic className="w-3.5 h-3.5 text-orange-500" />;
    case 'storage':
      return <HardDrive className="w-3.5 h-3.5 text-emerald-600" />;
    case 'notifications':
      return <Bell className="w-3.5 h-3.5 text-amber-600" />;
    default:
      return <Shield className="w-3.5 h-3.5 text-slate-500" />;
  }
};

export const PermissionChecklist: React.FC<PermissionChecklistProps> = ({
  appName,
  selectedPermissions,
  onChange,
  accentColor = 'brand',
}) => {
  const togglePermission = (id: string) => {
    if (selectedPermissions.includes(id)) {
      onChange(selectedPermissions.filter(p => p !== id));
    } else {
      onChange([...selectedPermissions, id]);
    }
  };

  const selectAll = () => {
    onChange(AVAILABLE_PERMISSIONS.map(p => p.id));
  };

  const clearAll = () => {
    onChange([]);
  };

  const isBrand = accentColor === 'brand';

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
        <div>
          <h4 className="font-bold text-slate-900 text-sm">
            {appName || 'App'} Permissions
          </h4>
          <span className="text-xs text-slate-500">
            {selectedPermissions.length} of {AVAILABLE_PERMISSIONS.length} selected
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={selectAll}
            className="text-brand-700 hover:underline font-semibold"
          >
            All
          </button>
          <span className="text-slate-300">•</span>
          <button
            type="button"
            onClick={clearAll}
            className="text-slate-500 hover:underline font-semibold"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[380px] overflow-y-auto pr-1">
        {AVAILABLE_PERMISSIONS.map(perm => {
          const isSelected = selectedPermissions.includes(perm.id);

          return (
            <label
              key={perm.id}
              onClick={() => togglePermission(perm.id)}
              className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-left cursor-pointer transition-all select-none ${
                isSelected
                  ? isBrand
                    ? 'bg-brand-50/60 border-brand-300 ring-1 ring-brand-300'
                    : 'bg-teal-50/60 border-teal-300 ring-1 ring-teal-300'
                  : 'bg-slate-50/40 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <div className="mt-0.5 flex-shrink-0">
                {isSelected ? (
                  <CheckSquare
                    className={`w-4 h-4 ${isBrand ? 'text-brand-600' : 'text-teal-600'}`}
                  />
                ) : (
                  <Square className="w-4 h-4 text-slate-300" />
                )}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  {getPermissionIcon(perm.id)}
                  <span className="text-xs font-bold text-slate-900 truncate">
                    {perm.label}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-tight mt-0.5 line-clamp-1">
                  {perm.shortDesc}
                </p>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};
