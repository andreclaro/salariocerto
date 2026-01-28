import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { TranslationKey } from '../i18n/translations';
import { LanguageSwitch } from './LanguageSwitch';
import { calculateTaxes, formatCurrency, formatPercent, TaxInput } from '../utils/taxCalculator';

const SALARY_EXAMPLES: { label: TranslationKey; monthly: number }[] = [
  { label: 'minimumWage', monthly: 870 },
  { label: 'salary1000', monthly: 1000 },
  { label: 'salary1250', monthly: 1250 },
  { label: 'salary1500', monthly: 1500 },
  { label: 'salary1750', monthly: 1750 },
  { label: 'salary2000', monthly: 2000 },
  { label: 'salary2500', monthly: 2500 },
  { label: 'salary3000', monthly: 3000 },
  { label: 'salary3500', monthly: 3500 },
  { label: 'salary4000', monthly: 4000 },
  { label: 'salary4500', monthly: 4500 },
  { label: 'salary5000', monthly: 5000 },
  { label: 'salary6000', monthly: 6000 },
  { label: 'salary7000', monthly: 7000 },
  { label: 'salary8000', monthly: 8000 },
  { label: 'salary9000', monthly: 9000 },
  { label: 'salary10000', monthly: 10000 },
];

const DEFAULT_INPUT: Omit<TaxInput, 'grossSalary'> = {
  salaryInputType: 'monthly',
  salaryMonths: 14,
  employmentType: 'employee',
  taxRegime: 'standard',
  maritalStatus: 'single',
  dependents: 0,
  hasDisability: false,
};

export function SalaryExamples() {
  const { t } = useLanguage();

  const examples = SALARY_EXAMPLES.map(({ label, monthly }) => {
    const input: TaxInput = { ...DEFAULT_INPUT, grossSalary: monthly };
    const result = calculateTaxes(input);
    return { label, monthly, result };
  });

  return (
    <div className="examples-page">
      <header className="examples-header">
        <div className="examples-top-bar">
          <Link to="/" className="back-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {t('backToCalculator')}
          </Link>
          <LanguageSwitch />
        </div>
        <h1>{t('examplesTitle')}</h1>
        <p className="examples-subtitle">{t('examplesSubtitle')}</p>
      </header>

      <main className="examples-content">
        <div className="examples-assumptions">
          <h3>{t('assumptions')}</h3>
          <ul>
            <li>{t('assumption1')}</li>
            <li>{t('assumption2')}</li>
            <li>{t('assumption3')}</li>
            <li>{t('assumption4')}</li>
          </ul>
        </div>

        <div className="examples-table-wrapper">
          <table className="examples-table">
            <thead>
              <tr>
                <th>{t('grossMonthlyHeader')}</th>
                <th>{t('ssMonthlyHeader')}</th>
                <th>{t('irsMonthlyHeader')}</th>
                <th>{t('netMonthlyHeader')}</th>
                <th>{t('netAnnualHeader')}</th>
                <th>{t('effectiveRateHeader')}</th>
              </tr>
            </thead>
            <tbody>
              {examples.map(({ label, monthly, result }) => (
                <tr key={label} className={monthly === 870 ? 'minimum-wage' : ''}>
                  <td className="gross-cell">
                    <span className="salary-label">{t(label)}</span>
                    <span className="salary-value">{formatCurrency(monthly)}</span>
                  </td>
                  <td className="deduction">{formatCurrency(result.socialSecurityMonthly)}</td>
                  <td className="deduction">{formatCurrency(result.irsWithholdingMonthly)}</td>
                  <td className="net-cell">{formatCurrency(result.netMonthly)}</td>
                  <td className="annual-cell">{formatCurrency(result.netAnnual)}</td>
                  <td className="rate-cell">{formatPercent(result.effectiveTotalRate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="examples-cards">
          {examples.map(({ label, monthly, result }) => (
            <div key={label} className={`example-card ${monthly === 870 ? 'minimum-wage' : ''}`}>
              <div className="card-header">
                <span className="card-label">{t(label)}</span>
                <span className="card-gross">{formatCurrency(monthly)}/mês</span>
              </div>
              <div className="card-body">
                <div className="card-row">
                  <span>{t('socialSecurity')}</span>
                  <span className="deduction">-{formatCurrency(result.socialSecurityMonthly)}</span>
                </div>
                <div className="card-row">
                  <span>{t('irsWithholding')}</span>
                  <span className="deduction">-{formatCurrency(result.irsWithholdingMonthly)}</span>
                </div>
                <div className="card-row net">
                  <span>{t('netMonthly')}</span>
                  <span>{formatCurrency(result.netMonthly)}</span>
                </div>
              </div>
              <div className="card-footer">
                <div className="footer-item">
                  <span className="footer-label">{t('netAnnual')}</span>
                  <span className="footer-value">{formatCurrency(result.netAnnual)}</span>
                </div>
                <div className="footer-item">
                  <span className="footer-label">{t('effectiveTotalLabel')}</span>
                  <span className="footer-value rate">{formatPercent(result.effectiveTotalRate)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="examples-cta">
          <p>{t('examplesCta')}</p>
          <Link to="/" className="cta-button">{t('tryCalculator')}</Link>
        </div>
      </main>
    </div>
  );
}
