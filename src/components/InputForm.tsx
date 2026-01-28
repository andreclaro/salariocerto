import { TaxInput } from '../utils/taxCalculator';
import { useLanguage } from '../i18n/LanguageContext';

interface InputFormProps {
  input: TaxInput;
  onChange: (input: TaxInput) => void;
}

export function InputForm({ input, onChange }: InputFormProps) {
  const { t } = useLanguage();

  const handleChange = (field: keyof TaxInput, value: string | number | boolean) => {
    onChange({ ...input, [field]: value });
  };

  const salaryLabel = input.salaryInputType === 'annual'
    ? `${t('grossSalary')} (${t('annual')})`
    : `${t('grossSalary')} (${t('monthly')})`;

  return (
    <section className="input-section">
      <h2>{t('inputTitle')}</h2>

      <div className="form-group">
        <label htmlFor="salaryInputType">{t('salaryInputType')}</label>
        <div className="input-type-toggle">
          <button
            type="button"
            className={`toggle-btn ${input.salaryInputType === 'monthly' ? 'active' : ''}`}
            onClick={() => handleChange('salaryInputType', 'monthly')}
          >
            {t('monthly')}
          </button>
          <button
            type="button"
            className={`toggle-btn ${input.salaryInputType === 'annual' ? 'active' : ''}`}
            onClick={() => handleChange('salaryInputType', 'annual')}
          >
            {t('annual')}
          </button>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="grossSalary">{salaryLabel}</label>
        <input
          type="number"
          id="grossSalary"
          value={input.grossSalary}
          onChange={(e) => handleChange('grossSalary', Number(e.target.value) || 0)}
          min="0"
          step={input.salaryInputType === 'annual' ? 1000 : 100}
        />
      </div>

      <div className="form-group">
        <label htmlFor="salaryMonths">{t('salaryMonths')}</label>
        <select
          id="salaryMonths"
          value={input.salaryMonths}
          onChange={(e) => handleChange('salaryMonths', Number(e.target.value))}
        >
          <option value="12">12</option>
          <option value="14">14</option>
        </select>
        <small className="hint">{t('salaryMonthsHint')}</small>
      </div>

      <div className="form-group">
        <label htmlFor="employmentType">{t('employmentType')}</label>
        <div className="input-type-toggle">
          <button
            type="button"
            className={`toggle-btn ${input.employmentType === 'employee' ? 'active' : ''}`}
            onClick={() => handleChange('employmentType', 'employee')}
          >
            {t('employee')}
          </button>
          <button
            type="button"
            className={`toggle-btn ${input.employmentType === 'self-employed' ? 'active' : ''}`}
            onClick={() => handleChange('employmentType', 'self-employed')}
          >
            {t('selfEmployed')}
          </button>
        </div>
        {input.employmentType === 'self-employed' && (
          <small className="hint">{t('selfEmployedHint')}</small>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="taxRegime">{t('taxRegime')}</label>
        <select
          id="taxRegime"
          value={input.taxRegime}
          onChange={(e) => handleChange('taxRegime', e.target.value as 'standard' | 'nhr')}
        >
          <option value="standard">{t('standardResident')}</option>
          <option value="nhr">{t('nhrResident')}</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="maritalStatus">{t('maritalStatus')}</label>
        <select
          id="maritalStatus"
          value={input.maritalStatus}
          onChange={(e) => handleChange('maritalStatus', e.target.value as TaxInput['maritalStatus'])}
        >
          <option value="single">{t('single')}</option>
          <option value="married-one">{t('marriedOne')}</option>
          <option value="married-two">{t('marriedTwo')}</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="dependents">{t('dependents')}</label>
        <select
          id="dependents"
          value={input.dependents}
          onChange={(e) => handleChange('dependents', Number(e.target.value))}
        >
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5+</option>
        </select>
      </div>

      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            checked={input.hasDisability}
            onChange={(e) => handleChange('hasDisability', e.target.checked)}
          />
          <span>{t('disability')}</span>
        </label>
      </div>
    </section>
  );
}
