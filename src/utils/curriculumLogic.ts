import { AcademicModule, SubjectFilter, TabCloakPreset } from '../types/curriculum';

export const TAB_CLOAK_PRESETS: TabCloakPreset[] = [
  {
    id: 'default',
    label: 'Standard Academic Portal',
    title: 'Scholastica - Open Academic Modules & Interactive Curriculum',
    faviconUrl: '/favicon.ico',
  },
  {
    id: 'canvas',
    label: 'Canvas LMS Dashboard',
    title: 'Dashboard | Canvas Learning Management',
    faviconUrl: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%23E13127"/><circle cx="50" cy="50" r="22" fill="white"/></svg>',
  },
  {
    id: 'classroom',
    label: 'Google Classroom',
    title: 'Classes - Google Classroom',
    faviconUrl: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="%2325A269"/><rect x="20" y="20" width="60" height="60" rx="8" fill="%23FABE08"/></svg>',
  },
  {
    id: 'docs',
    label: 'Google Docs (Research Notes)',
    title: 'AP Biology Notes - Google Docs',
    faviconUrl: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="16" fill="%234285F4"/><rect x="25" y="25" width="50" height="8" fill="white"/><rect x="25" y="42" width="50" height="8" fill="white"/><rect x="25" y="59" width="30" height="8" fill="white"/></svg>',
  },
  {
    id: 'wikipedia',
    label: 'Wikipedia: Cellular Respiration',
    title: 'Cellular respiration - Wikipedia',
    faviconUrl: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="%23EAECF0"/><text x="50" y="70" font-size="60" font-family="serif" font-weight="bold" text-anchor="middle" fill="%23202122">W</text></svg>',
  },
];

export function filterModules(
  modules: AcademicModule[],
  query: string,
  subject: SubjectFilter,
  bookmarkedOnly: boolean = false,
  bookmarkedIds: Set<string> = new Set()
): AcademicModule[] {
  const normalizedQuery = query.trim().toLowerCase();

  return modules.filter((mod) => {
    if (bookmarkedOnly && !bookmarkedIds.has(mod.id)) {
      return false;
    }

    if (subject !== 'All Disciplines' && mod.department !== subject) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const matchesTitle = mod.title.toLowerCase().includes(normalizedQuery);
    const matchesCode = mod.courseCode.toLowerCase().includes(normalizedQuery);
    const matchesDesc = mod.description.toLowerCase().includes(normalizedQuery);
    const matchesDept = mod.department.toLowerCase().includes(normalizedQuery);
    const matchesTags = mod.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));

    return matchesTitle || matchesCode || matchesDesc || matchesDept || matchesTags;
  });
}

export function sortModules(
  modules: AcademicModule[],
  sortBy: 'code-asc' | 'code-desc' | 'honors-desc' | 'title-asc'
): AcademicModule[] {
  const cloned = [...modules];
  switch (sortBy) {
    case 'code-asc':
      return cloned.sort((a, b) => a.courseCode.localeCompare(b.courseCode));
    case 'code-desc':
      return cloned.sort((a, b) => b.courseCode.localeCompare(a.courseCode));
    case 'honors-desc':
      return cloned.sort((a, b) => b.defaultHonorsIndex - a.defaultHonorsIndex);
    case 'title-asc':
      return cloned.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return cloned;
  }
}

export function sanitizeIframeInput(input: string): string {
  const trimmed = input.trim();
  // If user pasted a full <iframe ... src="..." ...> tag, extract the src attribute
  const iframeSrcMatch = trimmed.match(/src=["']([^"']+)["']/i);
  if (iframeSrcMatch && iframeSrcMatch[1]) {
    return iframeSrcMatch[1];
  }
  return trimmed;
}

export function validateModuleInput(data: {
  title: string;
  courseCode: string;
  department: string;
  iframeSrc: string;
}): { isValid: boolean; error?: string; sanitizedSrc?: string } {
  if (!data.title.trim()) {
    return { isValid: false, error: 'Module title is required.' };
  }
  if (!data.courseCode.trim()) {
    return { isValid: false, error: 'Academic course code is required (e.g. MATH-101).' };
  }
  const sanitized = sanitizeIframeInput(data.iframeSrc);
  if (!sanitized) {
    return { isValid: false, error: 'Laboratory iframe URL or embed code is required.' };
  }

  // Must be a relative path or an http/https/data URL
  const isUrl = /^https?:\/\//i.test(sanitized) || sanitized.startsWith('/') || sanitized.startsWith('data:');
  if (!isUrl) {
    return { isValid: false, error: 'Please enter a valid URL or embed src.' };
  }

  return { isValid: true, sanitizedSrc: sanitized };
}

export function applyTabCloak(presetId: string): void {
  const preset = TAB_CLOAK_PRESETS.find((p) => p.id === presetId) || TAB_CLOAK_PRESETS[0];
  document.title = preset.title;

  let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
  if (!link) {
    link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    document.getElementsByTagName('head')[0].appendChild(link);
  }
  link.href = preset.faviconUrl;
}

export function resolveIframeSrc(src: string, baseUrl?: string): string {
  if (!src) return '';
  // External or embedded data URLs stay as-is
  if (/^(https?:|\/\/|data:|blob:)/i.test(src)) {
    return src;
  }
  // Strip leading slashes to prevent absolute root domain resolution issues
  const clean = src.replace(/^\/+/, '');
  const base = baseUrl !== undefined
    ? baseUrl
    : (typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL ? import.meta.env.BASE_URL : './');

  if (base === './' || base === '') {
    return clean.startsWith('./') ? clean : `./${clean}`;
  }
  return base.endsWith('/') ? `${base}${clean}` : `${base}/${clean}`;
}

export function calculateAcademicStanding(score: number, target: number): { grade: string; standing: string } {
  if (score <= 0) {
    return { grade: 'Audit', standing: 'Practicum In Progress' };
  }
  const ratio = score / (target || 1);
  if (ratio >= 1.5) {
    return { grade: 'Summa Cum Laude', standing: 'Outstanding Master Scholar' };
  }
  if (ratio >= 1.0) {
    return { grade: 'A (High Honors)', standing: 'Honors Index Achieved' };
  }
  if (ratio >= 0.75) {
    return { grade: 'B+ (Proficient)', standing: 'Commendable Academic Progress' };
  }
  if (ratio >= 0.5) {
    return { grade: 'B (Competent)', standing: 'Foundational Competence' };
  }
  return { grade: 'C (Developing)', standing: 'Additional Study Session Advised' };
}

