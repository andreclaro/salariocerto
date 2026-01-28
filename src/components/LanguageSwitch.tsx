import { useLanguage } from '../i18n/LanguageContext';

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="language-switch">
      <button
        className={`lang-btn ${language === 'en' ? 'active' : ''}`}
        onClick={() => setLanguage('en')}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        className={`lang-btn ${language === 'pt' ? 'active' : ''}`}
        onClick={() => setLanguage('pt')}
        aria-label="Mudar para Português"
      >
        PT
      </button>
    </div>
  );
}
