import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LanguageSwitch } from './components/LanguageSwitch';
import { LayoutSwitcher, LayoutType, ThemeType } from './components/LayoutSwitcher';
import { InputForm } from './components/InputForm';
import { Results } from './components/Results';
import { InfoTabs } from './components/InfoTabs';
import { useLanguage } from './i18n/LanguageContext';
import { TaxInput, TaxResult, calculateTaxes } from './utils/taxCalculator';

const DEFAULT_INPUT: TaxInput = {
  grossSalary: 2500,
  salaryInputType: 'monthly',
  salaryMonths: 14,
  employmentType: 'employee',
  taxRegime: 'standard',
  maritalStatus: 'single',
  dependents: 0,
  hasDisability: false,
};

function App() {
  const { t } = useLanguage();
  const [input, setInput] = useState<TaxInput>(DEFAULT_INPUT);
  const [result, setResult] = useState<TaxResult>(() => calculateTaxes(DEFAULT_INPUT));

  const [layout, setLayout] = useState<LayoutType>(() => {
    const saved = localStorage.getItem('pt-salary-layout');
    return (saved as LayoutType) || 'classic';
  });

  const [theme, setTheme] = useState<ThemeType>(() => {
    const saved = localStorage.getItem('pt-salary-theme');
    return (saved as ThemeType) || 'dark';
  });

  useEffect(() => {
    setResult(calculateTaxes(input));
  }, [input]);

  useEffect(() => {
    document.documentElement.setAttribute('data-layout', layout);
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('pt-salary-layout', layout);
    localStorage.setItem('pt-salary-theme', theme);
  }, [layout, theme]);

  return (
    <div className={`app-container layout-${layout}`}>
      <header>
        <div className="header-top">
          <LayoutSwitcher
            layout={layout}
            theme={theme}
            onLayoutChange={setLayout}
            onThemeChange={setTheme}
          />
          <LanguageSwitch />
        </div>
        <div className="header-content">
          <h1>{t('title')}</h1>
        </div>
        <p className="subtitle">{t('subtitle')}</p>
      </header>

      <main>
        {layout === 'dashboard' ? (
          <>
            <div className="dashboard-summary">
              <Results result={result} />
            </div>
            <div className="dashboard-grid">
              <div className="dashboard-input">
                <InputForm input={input} onChange={setInput} />
              </div>
              <div className="dashboard-info">
                <InfoTabs />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="calculator-grid">
              <InputForm input={input} onChange={setInput} />
              <Results result={result} />
            </div>
            <InfoTabs />
          </>
        )}
      </main>

      <footer>
        <div className="footer-links">
          <Link to="/exemplos" className="examples-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            {t('viewExamples')}
          </Link>
        </div>
        <p>{t('disclaimer')}</p>
        <p className="sources">
          {t('sources')}{' '}
          <a
            href="https://info.portaldasfinancas.gov.pt/pt/apoio_contribuinte/tabela_ret_doclib/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Portal das Finanças
          </a>{' '}
          |{' '}
          <a
            href="https://www.pwc.pt/en/pwcinforfisco/statebudget/pit-and-social-security.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            PwC Portugal
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
