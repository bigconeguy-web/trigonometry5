export interface AcademicModule {
  id: string;
  courseCode: string;
  title: string;
  department: string;
  level: string;
  estimatedDuration: string;
  description: string;
  academicObjective: string;
  instrumentDirectives: string;
  learningOutcomes: string[];
  defaultHonorsIndex: number;
  iframeSrc: string;
  tags: string[];
  isCustom?: boolean;
  blockPopups?: boolean;
  sandboxFlags?: string;
}

export type ViewMode = 'grid' | 'syllabus';

export type SubjectFilter =
  | 'All Disciplines'
  | 'Applied Mathematics'
  | 'Spatial Geometry'
  | 'Algorithmic Logic'
  | 'Classical Mechanics'
  | 'Probability & Statistics'
  | 'Fluid Kinematics'
  | 'Lexical Linguistics'
  | 'Cognitive Neuroscience'
  | 'Astrophysics & Celestial Mechanics'
  | 'Condensed Matter Physics';

export interface UserPerformanceRecord {
  moduleId: string;
  personalRecord: number;
  sessionsCompleted: number;
  lastStudiedDate: string;
  studentNotes: string;
}

export interface TabCloakPreset {
  id: string;
  label: string;
  title: string;
  faviconUrl: string;
}

export type ThemeId =
  | 'oxford'
  | 'cambridge'
  | 'sorbonne'
  | 'caltech'
  | 'midnight'
  | 'parchment'
  | 'mit_cyber'
  | 'harvard_ivy'
  | 'nord_frost'
  | 'tokyo_amber';

export interface AcademicTheme {
  id: ThemeId;
  name: string;
  departmentFocus: string;
  swatchColors: [string, string];
  isDark: boolean;
  pageBg: string;
  headerBg: string;
  heroGradient: string;
  cardBg: string;
  cardBorder: string;
  cardHover: string;
  primaryBtn: string;
  primaryBtnText: string;
  accentBadge: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  borderMuted: string;
  activeTab: string;
}

export interface PortalSettings {
  panicKey: string;
  panicTarget: string; // 'biology' | 'calculus' | 'physics' | 'economics'
  fontSize: 'compact' | 'standard' | 'large';
  audioFxEnabled: boolean;
  pomodoroWorkMinutes: number;
  pomodoroBreakMinutes: number;
  autoMuteOnBlur: boolean;
  showCourseCodes: boolean;
}
