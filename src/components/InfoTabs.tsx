import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { TAX_BRACKETS_2026 } from '../utils/taxCalculator';

type TabId = 'irs' | 'ss' | 'nhr';

export function InfoTabs() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabId>('irs');

  const tabs: { id: TabId; label: string }[] = [
    { id: 'irs', label: t('irsTab') },
    { id: 'ss', label: t('ssTab') },
    { id: 'nhr', label: t('nhrTab') },
  ];

  const professions = [
    t('prof1'), t('prof2'), t('prof3'), t('prof4'), t('prof5'),
    t('prof6'), t('prof7'), t('prof8'), t('prof9'), t('prof10'),
  ];

  return (
    <section className="info-section">
      <div className="info-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'irs' && (
        <div className="tab-content active">
          <h3>{t('irsBracketsTitle')}</h3>
          <p>{t('irsBracketsDesc')}</p>
          <table className="tax-table">
            <thead>
              <tr>
                <th>{t('taxableIncome')}</th>
                <th>{t('rate')}</th>
                <th>{t('deduction')}</th>
              </tr>
            </thead>
            <tbody>
              {TAX_BRACKETS_2026.map((bracket, index) => (
                <tr key={index}>
                  <td>
                    {bracket.max === Infinity
                      ? `> ${bracket.min.toLocaleString('pt-PT')}`
                      : `${bracket.min.toLocaleString('pt-PT')} - ${bracket.max.toLocaleString('pt-PT')}`}
                  </td>
                  <td>{(bracket.rate * 100).toFixed(2)}%</td>
                  <td>{bracket.deduction.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="info-note">
            <strong>{t('solidarityTax')}</strong>
            <span>{t('solidarityTaxDesc')}</span>
          </div>
          <div className="info-note">
            <strong>{t('minExistence')}</strong>
            <span>{t('minExistenceDesc')}</span>
          </div>
        </div>
      )}

      {activeTab === 'ss' && (
        <div className="tab-content active">
          <h3>{t('ssTitle')}</h3>

          <h4 className="ss-section-title">{t('employeesTitle')}</h4>
          <div className="ss-info">
            <div className="ss-card">
              <span className="ss-rate">11%</span>
              <span className="ss-label">{t('employeeContrib')}</span>
              <p>{t('employeeContribDesc')}</p>
            </div>
            <div className="ss-card">
              <span className="ss-rate">23.75%</span>
              <span className="ss-label">{t('employerContrib')}</span>
              <p>{t('employerContribDesc')}</p>
            </div>
          </div>
          <div className="info-note">
            <strong>{t('employeeNoCap')}</strong>
          </div>

          <h4 className="ss-section-title">{t('selfEmployedTitle')}</h4>
          <div className="ss-info">
            <div className="ss-card">
              <span className="ss-rate">21.4%</span>
              <span className="ss-label">{t('selfEmployedContrib')}</span>
              <p>{t('selfEmployedContribDesc')}</p>
            </div>
            <div className="ss-card">
              <span className="ss-rate">25.2%</span>
              <span className="ss-label">{t('selfEmployedExtended')}</span>
              <p>{t('selfEmployedExtendedDesc')}</p>
            </div>
          </div>
          <div className="info-note highlight">
            <strong>{t('selfEmployedCap')}</strong>
            <span>{t('selfEmployedCapDesc')}</span>
          </div>

          <div className="info-note">
            <strong>{t('iasTitle')}</strong>
            <span>€537.13</span>
          </div>
          <div className="info-note">
            <strong>{t('boardMembers')}</strong>
            <span>{t('boardMembersRate')}</span>
          </div>
        </div>
      )}

      {activeTab === 'nhr' && (
        <div className="tab-content active">
          <h3>{t('nhrTitle')}</h3>
          <div className="nhr-status">
            <div className="status-badge warning">{t('nhrStatus')}</div>
          </div>

          <div className="nhr-comparison">
            <div className="nhr-card">
              <h4>{t('originalNHR')}</h4>
              <ul>
                <li>{t('nhr1')}</li>
                <li>{t('nhr2')}</li>
                <li>{t('nhr3')}</li>
                <li>{t('nhr4')}</li>
                <li className="strikethrough">{t('nhr5')}</li>
              </ul>
            </div>
            <div className="nhr-card highlight">
              <h4>{t('nhr2Title')}</h4>
              <ul>
                <li>{t('ifici1')}</li>
                <li>{t('ifici2')}</li>
                <li>{t('ifici3')}</li>
                <li>{t('ifici4')}</li>
                <li>{t('ifici5')}</li>
                <li>{t('ifici6')}</li>
              </ul>
            </div>
          </div>

          <div className="eligible-professions">
            <h4>{t('eligibleProfessions')}</h4>
            <div className="profession-tags">
              {professions.map((profession, index) => (
                <span key={index}>{profession}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
