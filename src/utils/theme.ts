export type ThemeMode = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'jtr-theme';

export function resolveInitialTheme(
  storedTheme: string | null,
  prefersDarkSystem: boolean
): ThemeMode {
  if (storedTheme === 'dark' || storedTheme === 'light') {
    return storedTheme;
  }
  return prefersDarkSystem ? 'dark' : 'light';
}

export function getNextTheme(current: ThemeMode): ThemeMode {
  return current === 'dark' ? 'light' : 'dark';
}

export function applyThemeToDocument(theme: ThemeMode): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

export function saveThemePreference(theme: ThemeMode): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Ignore storage quota or private browsing errors
  }
}
