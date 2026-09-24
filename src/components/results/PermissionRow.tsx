import React from 'react';
import { PermissionResult } from '../../types';
import { MismatchBadge } from './MismatchBadge';
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
} from 'lucide-react';

interface PermissionRowProps {
  result: PermissionResult;
  isExclusive?: boolean;
}

const getPermissionIcon = (id: string) => {
  switch (id) {
    case 'camera':
      return <Camera className="w-4 h-4 text-brand-600" />;
    case 'flash_control':
      return <Zap className="w-4 h-4 text-amber-500" />;
    case 'contacts':
      return <Users className="w-4 h-4 text-purple-600" />;
    case 'location_precise':
      return <MapPin className="w-4 h-4 text-blue-600" />;
    case 'location_approx':
      return <Compass className="w-4 h-4 text-cyan-600" />;
    case 'sms_read':
      return <MessageSquare className="w-4 h-4 text-indigo-600" />;
    case 'sms_send':
      return <Send className="w-4 h-4 text-indigo-600" />;
    case 'call_logs':
      return <PhoneCall className="w-4 h-4 text-red-500" />;
    case 'phone':
      return <Phone className="w-4 h-4 text-teal-600" />;
    case 'microphone':
      return <Mic className="w-4 h-4 text-orange-500" />;
    case 'storage':
      return <HardDrive className="w-4 h-4 text-emerald-600" />;
    case 'notifications':
      return <Bell className="w-4 h-4 text-amber-600" />;
    default:
      return <Shield className="w-4 h-4 text-slate-500" />;
  }
};

export const PermissionRow: React.FC<PermissionRowProps> = ({ result, isExclusive }) => {
  const isHigh = result.status === 'high';
  const isMedium = result.status === 'medium';

  return (
    <div
      className={`p-3 rounded-lg border transition-all ${
        isHigh
          ? 'bg-rose-50/40 border-rose-200'
          : isMedium
          ? 'bg-amber-50/40 border-amber-200'
          : 'bg-white border-slate-200 hover:border-slate-300'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5 min-w-0">
          <div className="p-1.5 mt-0.5 rounded-md bg-slate-100 flex-shrink-0">
            {getPermissionIcon(result.permissionId)}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-sm text-slate-900">
                {result.permissionLabel}
              </span>
              {isExclusive && (
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-brand-50 text-brand-700 border border-brand-200">
                  Unique to this app
                </span>
              )}
            </div>
            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
              {result.explanation}
            </p>
            {result.featureRelevance && (
              <span className="inline-block mt-1 text-[11px] font-medium text-brand-700 bg-brand-50 px-2 py-0.5 rounded">
                ⚙️ {result.featureRelevance}
              </span>
            )}
          </div>
        </div>

        <div className="flex-shrink-0">
          <MismatchBadge status={result.status} size="sm" />
        </div>
      </div>
    </div>
  );
};
