import {
  Category,
  MismatchStatus,
  AppFeatures,
  PermissionResult,
  EvaluatedApp,
  ComparisonData,
  ComparisonSummary,
} from '../types';
import { PERMISSION_MAP } from '../data/permissions';

/**
 * Evaluates a single permission in the context of the app's stated category and active features.
 * Pure deterministic rule engine - NO AI involved in scoring or classification.
 */
export function evaluatePermission(
  permissionId: string,
  category: Category,
  features: AppFeatures = {}
): PermissionResult {
  const permDef = PERMISSION_MAP[permissionId] || {
    id: permissionId,
    label: permissionId,
    shortDesc: 'Device permission',
    iconName: 'Shield',
    aliases: [],
  };

  const label = permDef.label;

  // 1. TORCH / FLASHLIGHT RULES
  if (category === 'torch') {
    switch (permissionId) {
      case 'flash_control':
        return {
          permissionId,
          permissionLabel: label,
          status: 'expected',
          reason: 'Core utility requirement',
          explanation: 'Directly required to toggle and manage the camera LED hardware for light output.',
        };

      case 'camera':
        return {
          permissionId,
          permissionLabel: label,
          status: 'expected',
          reason: 'Hardware subsystem dependency',
          explanation: 'On modern mobile operating systems, the LED flashlight is physically part of the camera module. Accessing the flash driver technically requires camera subsystem permission.',
        };

      case 'contacts':
        return {
          permissionId,
          permissionLabel: label,
          status: 'high',
          reason: 'Unrelated private data access',
          explanation: "This app also wants your contacts — that's unusual for a torch app. Toggling hardware light has zero legitimate reason to inspect your personal address book.",
        };

      case 'location_precise':
      case 'location_approx':
        return {
          permissionId,
          permissionLabel: label,
          status: 'high',
          reason: 'Unnecessary geographic tracking',
          explanation: "This app requests your location, which isn't normally needed to operate a flashlight. Illumination works identically anywhere on earth.",
        };

      case 'sms_read':
      case 'sms_send':
        return {
          permissionId,
          permissionLabel: label,
          status: 'high',
          reason: 'Sensitive messaging access',
          explanation: 'Reading or transmitting SMS text messages has no connection to operating a flashlight utility.',
        };

      case 'call_logs':
      case 'phone':
        return {
          permissionId,
          permissionLabel: label,
          status: 'high',
          reason: 'Telephony inspection',
          explanation: 'Access to call logs or phone state is not required to turn on a device light.',
        };

      case 'microphone':
        if (features.voiceCommands) {
          return {
            permissionId,
            permissionLabel: label,
            status: 'expected',
            reason: 'Voice control enabled',
            explanation: 'Audio access is justified because the voice-activated flashlight feature is enabled.',
            featureRelevance: 'Voice Activation Feature',
          };
        }
        return {
          permissionId,
          permissionLabel: label,
          status: 'medium',
          reason: 'Unusual for pure torch',
          explanation: 'A standard flashlight has no requirement for microphone access unless a sound-activated toggle is explicitly configured.',
        };

      case 'storage':
        return {
          permissionId,
          permissionLabel: label,
          status: 'medium',
          reason: 'Potential data access',
          explanation: 'A pure flashlight does not need to read or modify your files unless storing custom widget themes or light strobe patterns.',
        };

      case 'notifications':
        return {
          permissionId,
          permissionLabel: label,
          status: 'medium',
          reason: 'Persistent tray control',
          explanation: 'Can be used for quick toggle controls in the notification shade, but otherwise unnecessary for a basic torch.',
        };

      default:
        return {
          permissionId,
          permissionLabel: label,
          status: 'high',
          reason: 'Unrecognized permission for category',
          explanation: `The permission "${label}" does not match the normal operational scope of a flashlight app.`,
        };
    }
  }

  // 2. WEATHER RULES
  if (category === 'weather') {
    switch (permissionId) {
      case 'location_precise':
        return {
          permissionId,
          permissionLabel: label,
          status: 'expected',
          reason: 'Hyperlocal forecasting',
          explanation: 'Required to deliver accurate localized forecasts, precipitation radar, and severe weather alerts for your exact position.',
        };

      case 'location_approx':
        return {
          permissionId,
          permissionLabel: label,
          status: 'expected',
          reason: 'City-level forecasting',
          explanation: 'Permits fetching weather data for your general town or municipality without needing high-precision GPS.',
        };

      case 'notifications':
        return {
          permissionId,
          permissionLabel: label,
          status: 'expected',
          reason: 'Severe weather alerts',
          explanation: 'Essential for delivering emergency rain alerts, storm warnings, and daily morning forecast notifications.',
        };

      case 'storage':
        return {
          permissionId,
          permissionLabel: label,
          status: 'expected',
          reason: 'Offline radar and cache',
          explanation: 'Standard for caching weather radar maps, satellite imagery, and forecast models for offline viewing.',
        };

      case 'contacts':
        return {
          permissionId,
          permissionLabel: label,
          status: 'high',
          reason: 'Address book access',
          explanation: "Weather forecasts are strictly meteorological. The app doesn't need to read your personal contacts.",
        };

      case 'sms_read':
      case 'sms_send':
        return {
          permissionId,
          permissionLabel: label,
          status: 'high',
          reason: 'Private SMS inspection',
          explanation: "This weather app requests SMS access, which isn't normally required to provide weather information.",
        };

      case 'call_logs':
      case 'phone':
        return {
          permissionId,
          permissionLabel: label,
          status: 'high',
          reason: 'Telephony access',
          explanation: 'Call history and cellular phone status have no functional connection to weather data.',
        };

      case 'camera':
        if (features.crowdsourcedPhotos) {
          return {
            permissionId,
            permissionLabel: label,
            status: 'expected',
            reason: 'Storm photo reporting',
            explanation: 'Camera access is justified by the crowdsourced sky photo and severe weather reporting feature.',
            featureRelevance: 'Community Weather Photo Upload',
          };
        }
        return {
          permissionId,
          permissionLabel: label,
          status: 'high',
          reason: 'Unusual sensor access',
          explanation: 'Standard weather apps do not need camera access to display temperature and forecasts.',
        };

      case 'microphone':
        if (features.voiceCommands) {
          return {
            permissionId,
            permissionLabel: label,
            status: 'expected',
            reason: 'Voice assistant search',
            explanation: 'Microphone access is justified because voice weather search is enabled.',
            featureRelevance: 'Voice Weather Assistant',
          };
        }
        return {
          permissionId,
          permissionLabel: label,
          status: 'medium',
          reason: 'Audio input requested',
          explanation: 'Audio recording is unusual unless the app specifically offers hands-free voice weather inquiries.',
        };

      case 'flash_control':
        return {
          permissionId,
          permissionLabel: label,
          status: 'medium',
          reason: 'Flashlight utility',
          explanation: 'Flash control is occasionally bundled as an emergency strobe in weather apps, but unusual for basic forecasting.',
        };

      default:
        return {
          permissionId,
          permissionLabel: label,
          status: 'high',
          reason: 'Unusual for weather category',
          explanation: `The permission "${label}" is not typical for a weather forecasting utility.`,
        };
    }
  }

  // 3. PDF READER RULES
  if (category === 'pdf') {
    switch (permissionId) {
      case 'storage':
        return {
          permissionId,
          permissionLabel: label,
          status: 'expected',
          reason: 'Core document management',
          explanation: 'A PDF viewer fundamentally needs access to local files to open, read, annotate, and save documents.',
        };

      case 'camera':
        if (features.documentScanning) {
          return {
            permissionId,
            permissionLabel: label,
            status: 'expected',
            reason: 'Document scanning feature enabled',
            explanation: 'Legitimate for scanning physical documents, receipts, or contracts directly into PDF format.',
            featureRelevance: 'Document Scanner Feature Enabled',
          };
        }
        return {
          permissionId,
          permissionLabel: label,
          status: 'high',
          reason: 'No scanning feature declared',
          explanation: "This PDF reader requests camera access, but document scanning isn't enabled. A standard PDF viewer only reads local files.",
          featureRelevance: 'Requires Document Scanning Feature',
        };

      case 'flash_control':
        if (features.documentScanning) {
          return {
            permissionId,
            permissionLabel: label,
            status: 'expected',
            reason: 'Scanner flash illumination',
            explanation: 'Used to illuminate physical pages during document scanning.',
            featureRelevance: 'Document Scanner Feature Enabled',
          };
        }
        return {
          permissionId,
          permissionLabel: label,
          status: 'medium',
          reason: 'Flash without scanning',
          explanation: 'Flash control is unnecessary if document scanning is not active.',
        };

      case 'notifications':
        return {
          permissionId,
          permissionLabel: label,
          status: 'expected',
          reason: 'Export and background alerts',
          explanation: 'Used to alert users when large document exports, cloud synchronizations, or print jobs finish.',
        };

      case 'contacts':
        return {
          permissionId,
          permissionLabel: label,
          status: 'high',
          reason: 'Address book access',
          explanation: 'Reading documents does not require access to your personal contacts directory.',
        };

      case 'location_precise':
      case 'location_approx':
        return {
          permissionId,
          permissionLabel: label,
          status: 'high',
          reason: 'Geographic tracking',
          explanation: 'Viewing or editing PDF documents does not depend on GPS or network location coordinates.',
        };

      case 'sms_read':
      case 'sms_send':
        return {
          permissionId,
          permissionLabel: label,
          status: 'high',
          reason: 'SMS messages requested',
          explanation: 'SMS messaging is completely outside the functional scope of a document reader.',
        };

      case 'call_logs':
      case 'phone':
        return {
          permissionId,
          permissionLabel: label,
          status: 'high',
          reason: 'Telephony access',
          explanation: 'Phone state and call records are completely unrelated to document processing.',
        };

      case 'microphone':
        if (features.voiceCommands) {
          return {
            permissionId,
            permissionLabel: label,
            status: 'expected',
            reason: 'Audio annotation',
            explanation: 'Voice recording is justified for embedding audio notes or dictation into PDF pages.',
            featureRelevance: 'Voice Note Annotation',
          };
        }
        return {
          permissionId,
          permissionLabel: label,
          status: 'medium',
          reason: 'Unusual audio access',
          explanation: 'Audio recording is unusual unless the app provides voice dictation or audio note annotations.',
        };

      default:
        return {
          permissionId,
          permissionLabel: label,
          status: 'high',
          reason: 'Unusual for document category',
          explanation: `The permission "${label}" does not match normal requirements for a PDF reader.`,
        };
    }
  }

  // Fallback
  return {
    permissionId,
    permissionLabel: label,
    status: 'medium',
    reason: 'Standard review needed',
    explanation: `This permission requests access to ${label}, which requires review for this category.`,
  };
}

/**
 * Evaluates an entire app's permission list and computes mismatch counts.
 */
export function evaluateApp(appData: {
  id: string;
  name: string;
  category: Category;
  permissions: string[];
  features?: AppFeatures;
}): EvaluatedApp {
  const features = appData.features || {};
  const results = appData.permissions.map(permId =>
    evaluatePermission(permId, appData.category, features)
  );

  let expectedCount = 0;
  let mediumMismatchCount = 0;
  let highMismatchCount = 0;

  for (const r of results) {
    if (r.status === 'expected') expectedCount++;
    else if (r.status === 'medium') mediumMismatchCount++;
    else if (r.status === 'high') highMismatchCount++;
  }

  return {
    id: appData.id,
    name: appData.name,
    category: appData.category,
    permissions: appData.permissions,
    features,
    results,
    expectedCount,
    mediumMismatchCount,
    highMismatchCount,
    totalUnusual: mediumMismatchCount + highMismatchCount,
  };
}

/**
 * Compares two evaluated apps and generates a human-readable comparison summary.
 * Strictly rule-driven, no arbitrary security scores or claims of malware.
 */
export function compareApps(app1: EvaluatedApp, app2: EvaluatedApp): ComparisonData {
  const p1Set = new Set(app1.permissions);
  const p2Set = new Set(app2.permissions);

  const sharedPermissions = app1.permissions.filter(p => p2Set.has(p));
  const exclusiveToApp1 = app1.permissions.filter(p => !p2Set.has(p));
  const exclusiveToApp2 = app2.permissions.filter(p => !p2Set.has(p));

  const totalUnusualApp1 = app1.totalUnusual;
  const totalUnusualApp2 = app2.totalUnusual;

  let morePermissiveApp: 'app1' | 'app2' | 'equal' = 'equal';
  let differenceStatement = 'Both apps request a similar level of purpose-aligned permissions.';

  if (totalUnusualApp1 > totalUnusualApp2) {
    morePermissiveApp = 'app1';
    differenceStatement = `${app1.name} requests ${totalUnusualApp1} unusual permission${
      totalUnusualApp1 === 1 ? '' : 's'
    } compared to ${totalUnusualApp2} for ${app2.name}. ${app1.name} asks for more permissions that do not normally match the ${app1.category} category.`;
  } else if (totalUnusualApp2 > totalUnusualApp1) {
    morePermissiveApp = 'app2';
    differenceStatement = `${app2.name} requests ${totalUnusualApp2} unusual permission${
      totalUnusualApp2 === 1 ? '' : 's'
    } compared to ${totalUnusualApp1} for ${app1.name}. ${app2.name} asks for more permissions that do not normally match the ${app2.category} category.`;
  } else if (app1.permissions.length !== app2.permissions.length) {
    differenceStatement = `Both apps have ${totalUnusualApp1} unusual permissions flagged, but ${
      app1.permissions.length > app2.permissions.length ? app1.name : app2.name
    } requests more total permissions overall.`;
  }

  const summary: ComparisonSummary = {
    totalUnusualApp1,
    totalUnusualApp2,
    sharedPermissions,
    exclusiveToApp1,
    exclusiveToApp2,
    differenceStatement,
    morePermissiveApp,
    notice: 'These flags indicate a mismatch with the selected app purpose. They do not prove that an app is malicious.',
  };

  return {
    id: `comp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    category: app1.category,
    app1,
    app2,
    summary,
    timestamp: Date.now(),
  };
}
