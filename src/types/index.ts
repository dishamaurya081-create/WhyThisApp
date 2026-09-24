export type Category = 'torch' | 'pdf' | 'weather';

export type MismatchStatus = 'expected' | 'medium' | 'high';

export interface CategoryInfo {
  id: Category;
  name: string;
  tagline: string;
  icon: string;
  description: string;
  hasScanningFeature?: boolean;
}

export interface PermissionDefinition {
  id: string;
  label: string;
  shortDesc: string;
  iconName: string;
  aliases: string[];
}

export interface AppFeatures {
  documentScanning?: boolean;
  voiceCommands?: boolean;
  crowdsourcedPhotos?: boolean;
  [key: string]: boolean | undefined;
}

export interface PermissionResult {
  permissionId: string;
  permissionLabel: string;
  status: MismatchStatus;
  reason: string;
  explanation: string;
  featureRelevance?: string;
}

export interface EvaluatedApp {
  id: string;
  name: string;
  category: Category;
  permissions: string[];
  features: AppFeatures;
  results: PermissionResult[];
  expectedCount: number;
  mediumMismatchCount: number;
  highMismatchCount: number;
  totalUnusual: number;
}

export interface ComparisonSummary {
  totalUnusualApp1: number;
  totalUnusualApp2: number;
  sharedPermissions: string[];
  exclusiveToApp1: string[];
  exclusiveToApp2: string[];
  differenceStatement: string;
  morePermissiveApp?: 'app1' | 'app2' | 'equal';
  notice: string;
}

export interface ComparisonData {
  id: string;
  category: Category;
  app1: EvaluatedApp;
  app2: EvaluatedApp;
  summary: ComparisonSummary;
  timestamp: number;
}
