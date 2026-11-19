import { AcademicTheme, SubjectFilter as FilterType } from '../types/curriculum';

interface SubjectFilterProps {
  selected: FilterType;
  onSelect: (filter: FilterType) => void;
  theme?: AcademicTheme;
}

const DEPARTMENTS: FilterType[] = [
  'All Disciplines',
  'Applied Mathematics',
  'Spatial Geometry',
  'Algorithmic Logic',
  'Classical Mechanics',
  'Probability & Statistics',
  'Fluid Kinematics',
  'Lexical Linguistics',
  'Cognitive Neuroscience',
  'Astrophysics & Celestial Mechanics',
  'Condensed Matter Physics',
];

export const SubjectFilter: React.FC<SubjectFilterProps> = ({ selected, onSelect, theme }) => {
  return (
    <div className="w-full overflow-x-auto pb-1 scrollbar-none">
      <div className={`flex items-center gap-1.5 p-1 border rounded-lg min-w-max transition-colors ${
        theme?.isDark
          ? 'bg-zinc-900/90 border-zinc-800'
          : 'bg-zinc-100/90 border-zinc-200/80'
      }`}>
        {DEPARTMENTS.map((dept) => {
          const isActive = selected === dept;
          return (
            <button
              key={dept}
              onClick={() => onSelect(dept)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
                isActive
                  ? theme?.activeTab || 'bg-white text-zinc-900 shadow-xs font-semibold'
                  : theme?.isDark
                  ? 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60'
              }`}
            >
              {dept}
            </button>
          );
        })}
      </div>
    </div>
  );
};
