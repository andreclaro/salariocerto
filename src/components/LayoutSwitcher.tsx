import { useLanguage } from '../i18n/LanguageContext';

export type LayoutType = 'classic' | 'compact' | 'dashboard';
export type ThemeType = 'dark' | 'light';

interface LayoutSwitcherProps {
  layout: LayoutType;
  theme: ThemeType;
  onLayoutChange: (layout: LayoutType) => void;
  onThemeChange: (theme: ThemeType) => void;
}

export function LayoutSwitcher({ layout, theme, onLayoutChange, onThemeChange }: LayoutSwitcherProps) {
  const { t } = useLanguage();

  const layouts: { id: LayoutType; label: string }[] = [
    { id: 'classic', label: t('layoutClassic') },
    { id: 'compact', label: t('layoutCompact') },
    { id: 'dashboard', label: t('layoutDashboard') },
  ];

  return (
    <div className="layout-theme-switcher">
      <div className="layout-switcher">
        {layouts.map((l) => (
          <button
            key={l.id}
            className={`layout-btn ${layout === l.id ? 'active' : ''}`}
            onClick={() => onLayoutChange(l.id)}
            title={l.label}
          >
            {l.id === 'classic' && (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="18" rx="1" />
                <rect x="14" y="3" width="7" height="18" rx="1" />
              </svg>
            )}
            {l.id === 'compact' && (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="4" y="3" width="16" height="5" rx="1" />
                <rect x="4" y="10" width="16" height="5" rx="1" />
                <rect x="4" y="17" width="16" height="4" rx="1" />
              </svg>
            )}
            {l.id === 'dashboard' && (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="6" rx="1" />
                <rect x="3" y="12" width="8" height="9" rx="1" />
                <rect x="13" y="12" width="8" height="9" rx="1" />
              </svg>
            )}
          </button>
        ))}
      </div>
      <button
        className="theme-toggle"
        onClick={() => onThemeChange(theme === 'dark' ? 'light' : 'dark')}
        title={theme === 'dark' ? t('layoutLight') : t('layoutDark')}
      >
        {theme === 'dark' ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </button>
    </div>
  );
}
