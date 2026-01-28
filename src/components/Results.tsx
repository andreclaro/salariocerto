import { TaxResult, formatCurrency, formatPercent } from '../utils/taxCalculator';
import { useLanguage } from '../i18n/LanguageContext';

interface ResultsProps {
  result: TaxResult;
}

export function Results({ result }: ResultsProps) {
  const { t } = useLanguage();

  return (
    <section className="results-section">
      <h2>{t('resultsTitle')}</h2>

      <div className="results-summary">
        <div className="result-card primary">
          <span className="result-label">{t('netMonthly')}</span>
          <span className="result-value">{formatCurrency(result.netMonthly)}</span>
        </div>
        <div className="result-card">
          <span className="result-label">{t('netAnnual')}</span>
          <span className="result-value">{formatCurrency(result.netAnnual)}</span>
        </div>
      </div>

      <div className="breakdown">
        <h3>{t('monthlyBreakdown')}</h3>
        <div className="breakdown-item">
          <span>{t('grossIncome')}</span>
          <span>{formatCurrency(result.grossMonthly)}</span>
        </div>
        <div className="breakdown-item deduction">
          <span>
            {result.isSelfEmployed ? t('socialSecuritySelfEmployed') : t('socialSecurity')}
            {result.ssContributionCapped && <span className="cap-badge">{t('capped')}</span>}
          </span>
          <span>-{formatCurrency(result.socialSecurityMonthly)}</span>
        </div>
        <div className="breakdown-item deduction">
          <span>{t('irsWithholding')}</span>
          <span>-{formatCurrency(result.irsWithholdingMonthly)}</span>
        </div>
        <div className="breakdown-item total">
          <span>{t('netIncome')}</span>
          <span>{formatCurrency(result.netMonthly)}</span>
        </div>
      </div>

      <div className="breakdown annual-breakdown">
        <h3>{t('annualBreakdown')}</h3>
        <div className="breakdown-item">
          <span>{t('grossAnnual')}</span>
          <span>{formatCurrency(result.grossAnnual)}</span>
        </div>
        <div className="breakdown-item deduction">
          <span>
            {t('ssTotalAnnual')}
            {result.ssContributionCapped && <span className="cap-badge">{t('capped')}</span>}
          </span>
          <span>-{formatCurrency(result.socialSecurityAnnual)}</span>
        </div>
        <div className="breakdown-item deduction">
          <span>{t('irsTotalAnnual')}</span>
          <span>-{formatCurrency(result.irsAnnual)}</span>
        </div>
        <div className="breakdown-item total">
          <span>{t('netAnnualTotal')}</span>
          <span>{formatCurrency(result.netAnnual)}</span>
        </div>
      </div>

      {(result.totalDeductions > 0 || result.isJointTaxation) && (
        <div className="breakdown deductions-breakdown">
          <h3>{t('taxBenefits')}</h3>
          {result.isJointTaxation && (
            <div className="breakdown-item benefit">
              <span>{t('jointTaxation')}</span>
              <span className="benefit-badge">{t('applied')}</span>
            </div>
          )}
          {result.dependentDeduction > 0 && (
            <div className="breakdown-item benefit">
              <span>{t('dependentDeduction')}</span>
              <span>-{formatCurrency(result.dependentDeduction)}</span>
            </div>
          )}
          {result.disabilityDeduction > 0 && (
            <div className="breakdown-item benefit">
              <span>{t('disabilityDeduction')}</span>
              <span>-{formatCurrency(result.disabilityDeduction)}</span>
            </div>
          )}
          {result.totalDeductions > 0 && (
            <div className="breakdown-item total benefit">
              <span>{t('totalTaxCredits')}</span>
              <span>-{formatCurrency(result.totalDeductions)}</span>
            </div>
          )}
        </div>
      )}

      <div className="effective-rates">
        <h3>{t('effectiveRates')}</h3>
        <div className="rate-grid">
          <div className="rate-item">
            <span className="rate-value">{formatPercent(result.effectiveIRSRate)}</span>
            <span className="rate-label">{t('effectiveIRSLabel')}</span>
          </div>
          <div className="rate-item">
            <span className="rate-value">{formatPercent(result.effectiveSSRate)}</span>
            <span className="rate-label">{t('effectiveSSLabel')}</span>
          </div>
          <div className="rate-item">
            <span className="rate-value">{formatPercent(result.effectiveTotalRate)}</span>
            <span className="rate-label">{t('effectiveTotalLabel')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
