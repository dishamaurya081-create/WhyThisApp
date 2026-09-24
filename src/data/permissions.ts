import { PermissionDefinition, CategoryInfo, Category } from '../types';

export const CATEGORIES: Record<Category, CategoryInfo> = {
  torch: {
    id: 'torch',
    name: 'Torch / Flashlight',
    tagline: 'Simple utility to control the device LED light',
    icon: 'Flashlight',
    description: 'A hardware utility whose sole genuine requirement is controlling the camera flash LED.',
    hasScanningFeature: false,
  },
  pdf: {
    id: 'pdf',
    name: 'PDF Reader / Viewer',
    tagline: 'Read, view, and annotate document files',
    icon: 'FileText',
    description: 'A document utility that accesses local storage to render and view documents.',
    hasScanningFeature: true,
  },
  weather: {
    id: 'weather',
    name: 'Weather Forecast',
    tagline: 'Hyperlocal meteorological forecasts and alerts',
    icon: 'CloudSun',
    description: 'A forecast utility that legitimately needs location to deliver local weather conditions.',
    hasScanningFeature: false,
  },
};

export const AVAILABLE_PERMISSIONS: PermissionDefinition[] = [
  {
    id: 'camera',
    label: 'Camera',
    shortDesc: 'Access hardware camera sensor and flashlight driver',
    iconName: 'Camera',
    aliases: ['camera', 'take pictures', 'video', 'android.permission.camera'],
  },
  {
    id: 'flash_control',
    label: 'Flash control',
    shortDesc: 'Directly toggle the device camera LED torch',
    iconName: 'Zap',
    aliases: ['flash', 'flashlight', 'flash control', 'torch', 'control flashlight', 'android.permission.flashlight'],
  },
  {
    id: 'contacts',
    label: 'Contacts',
    shortDesc: 'Read address book and contacts stored on device',
    iconName: 'Users',
    aliases: ['contacts', 'address book', 'read contacts', 'get accounts', 'android.permission.read_contacts'],
  },
  {
    id: 'location_precise',
    label: 'Precise Location',
    shortDesc: 'Access fine GPS coordinates of the device',
    iconName: 'MapPin',
    aliases: ['precise location', 'fine location', 'gps', 'location', 'android.permission.access_fine_location'],
  },
  {
    id: 'location_approx',
    label: 'Approximate Location',
    shortDesc: 'Access network-based approximate coordinates',
    iconName: 'Compass',
    aliases: ['approximate location', 'coarse location', 'network location', 'android.permission.access_coarse_location'],
  },
  {
    id: 'sms_read',
    label: 'Read SMS',
    shortDesc: 'Read incoming and stored SMS text messages',
    iconName: 'MessageSquare',
    aliases: ['sms', 'read sms', 'text messages', 'messages', 'android.permission.read_sms'],
  },
  {
    id: 'sms_send',
    label: 'Send SMS',
    shortDesc: 'Send outgoing SMS messages directly from device',
    iconName: 'Send',
    aliases: ['send sms', 'write sms', 'transmit sms', 'android.permission.send_sms'],
  },
  {
    id: 'call_logs',
    label: 'Call Logs',
    shortDesc: 'Read phone call history and incoming/outgoing numbers',
    iconName: 'PhoneCall',
    aliases: ['call logs', 'call log', 'call history', 'phone history', 'android.permission.read_call_log'],
  },
  {
    id: 'phone',
    label: 'Phone State',
    shortDesc: 'Read cellular network status and initiate calls',
    iconName: 'Phone',
    aliases: ['phone', 'phone state', 'read phone state', 'make calls', 'android.permission.read_phone_state'],
  },
  {
    id: 'microphone',
    label: 'Microphone',
    shortDesc: 'Record ambient audio and voice from microphone',
    iconName: 'Mic',
    aliases: ['microphone', 'record audio', 'audio', 'mic', 'android.permission.record_audio'],
  },
  {
    id: 'storage',
    label: 'Storage / Files',
    shortDesc: 'Read, modify, or delete files on device storage',
    iconName: 'HardDrive',
    aliases: ['storage', 'files', 'read storage', 'write storage', 'photos and media', 'android.permission.read_external_storage'],
  },
  {
    id: 'notifications',
    label: 'Notifications',
    shortDesc: 'Post alerts and status icons in the system tray',
    iconName: 'Bell',
    aliases: ['notifications', 'post notifications', 'alerts', 'android.permission.post_notifications'],
  },
];

export const PERMISSION_MAP: Record<string, PermissionDefinition> = AVAILABLE_PERMISSIONS.reduce(
  (acc, perm) => {
    acc[perm.id] = perm;
    return acc;
  },
  {} as Record<string, PermissionDefinition>
);

/**
 * Robust parser for pasted permission lists.
 * Supports comma, newline, bullet points, Android manifest strings, etc.
 */
export function parsePermissionsText(text: string): string[] {
  if (!text || !text.trim()) return [];

  const lines = text
    .split(/[\n,;]+/)
    .map(line => line.replace(/^[-*•\d.)\s]+/, '').trim().toLowerCase())
    .filter(Boolean);

  const matchedIds = new Set<string>();

  for (const line of lines) {
    let matched = false;
    for (const perm of AVAILABLE_PERMISSIONS) {
      if (line === perm.label.toLowerCase() || line === perm.id.toLowerCase()) {
        matchedIds.add(perm.id);
        matched = true;
        break;
      }
      for (const alias of perm.aliases) {
        if (line.includes(alias.toLowerCase()) || alias.toLowerCase().includes(line)) {
          matchedIds.add(perm.id);
          matched = true;
          break;
        }
      }
      if (matched) break;
    }
  }

  return Array.from(matchedIds);
}
