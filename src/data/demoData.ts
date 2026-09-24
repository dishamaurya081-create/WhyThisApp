import { Category, ComparisonData } from '../types';
import { evaluateApp, compareApps } from '../engine/ruleEngine';

export interface DemoConfig {
  id: Category;
  title: string;
  category: Category;
  badge: string;
  shortDescription: string;
  keyTakeaway: string;
  app1Data: {
    id: string;
    name: string;
    category: Category;
    permissions: string[];
    features?: { documentScanning?: boolean; [key: string]: any };
  };
  app2Data: {
    id: string;
    name: string;
    category: Category;
    permissions: string[];
    features?: { documentScanning?: boolean; [key: string]: any };
  };
}

export const DEMO_CONFIGS: DemoConfig[] = [
  {
    id: 'torch',
    title: 'Torch / Flashlight Demo',
    category: 'torch',
    badge: 'Hardware Utility',
    shortDescription: 'Compare a minimal flashlight tool against an excessive torch utility asking for contacts, GPS, and SMS.',
    keyTakeaway: 'Flashlights only toggle LED hardware. Contacts, GPS, and SMS have zero purpose alignment.',
    app1Data: {
      id: 'torch_a',
      name: 'Torch App A (Minimal)',
      category: 'torch',
      permissions: ['camera', 'flash_control'],
      features: {},
    },
    app2Data: {
      id: 'torch_b',
      name: 'Torch App B (Over-Permissive)',
      category: 'torch',
      permissions: ['camera', 'contacts', 'location_precise', 'sms_read'],
      features: {},
    },
  },
  {
    id: 'pdf',
    title: 'PDF Reader Demo',
    category: 'pdf',
    badge: 'Context-Aware Feature Demo',
    shortDescription: 'See how Camera access is flagged when document scanning is disabled, and why purpose context matters.',
    keyTakeaway: 'Storage is expected for PDF viewing. Camera is flagged as a mismatch unless document scanning is declared.',
    app1Data: {
      id: 'reader_a',
      name: 'PDF Reader A (Standard Viewer)',
      category: 'pdf',
      permissions: ['storage'],
      features: { documentScanning: false },
    },
    app2Data: {
      id: 'reader_b',
      name: 'PDF Reader B (Camera Without Scanning)',
      category: 'pdf',
      permissions: ['storage', 'camera'],
      features: { documentScanning: false },
    },
  },
  {
    id: 'weather',
    title: 'Weather Forecast Demo',
    category: 'weather',
    badge: 'Purpose Awareness',
    shortDescription: 'Demonstrates that Precise Location is completely expected for Weather, while Contacts and SMS are severe mismatches.',
    keyTakeaway: 'Location is not universally "bad" — for Weather it is Expected, but SMS and Contacts remain High Mismatches.',
    app1Data: {
      id: 'weather_a',
      name: 'Weather Forecast A (Direct)',
      category: 'weather',
      permissions: ['location_precise'],
      features: {},
    },
    app2Data: {
      id: 'weather_b',
      name: 'Weather Forecast B (Data Collector)',
      category: 'weather',
      permissions: ['location_precise', 'contacts', 'sms_read'],
      features: {},
    },
  },
];

/**
 * Dynamically executes the rule engine on demo data.
 * Zero hardcoded output - 100% computed via evaluateApp and compareApps.
 */
export function getDemoComparison(demoId: Category, customFeatures?: { app1Scanning?: boolean; app2Scanning?: boolean }): ComparisonData {
  const config = DEMO_CONFIGS.find(d => d.id === demoId) || DEMO_CONFIGS[0];

  const app1Features = {
    ...config.app1Data.features,
    ...(customFeatures?.app1Scanning !== undefined ? { documentScanning: customFeatures.app1Scanning } : {}),
  };

  const app2Features = {
    ...config.app2Data.features,
    ...(customFeatures?.app2Scanning !== undefined ? { documentScanning: customFeatures.app2Scanning } : {}),
  };

  const app1 = evaluateApp({
    ...config.app1Data,
    features: app1Features,
  });

  const app2 = evaluateApp({
    ...config.app2Data,
    features: app2Features,
  });

  return compareApps(app1, app2);
}
