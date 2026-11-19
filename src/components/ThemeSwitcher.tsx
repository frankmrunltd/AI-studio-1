import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { ThemeMode } from '../utils/theme';

interface ThemeSwitcherProps {
  theme: ThemeMode;
  onToggle: () => void;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ theme, onToggle }) => {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141414] text-neutral-700 dark:text-neutral-200 hover:border-[#FF6500] hover:text-[#FF6500] dark:hover:border-[#FF6500] dark:hover:text-[#FF6500] transition-colors cursor-pointer shrink-0"
    >
      {isDark ? <Sun className="w-[18px] h-[18px]" aria-hidden="true" /> : <Moon className="w-[18px] h-[18px]" aria-hidden="true" />}
    </button>
  );
};
