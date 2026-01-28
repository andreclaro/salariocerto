// Portugal 2026 Tax Brackets (Annual Income)
// Source: https://www.pwc.pt/en/pwcinforfisco/statebudget/pit-and-social-security.html
export const TAX_BRACKETS_2026 = [
  { min: 0, max: 8342, rate: 0.125, deduction: 0 },
  { min: 8342, max: 12587, rate: 0.157, deduction: 266.94 },
  { min: 12587, max: 17838, rate: 0.212, deduction: 959.26 },
  { min: 17838, max: 23089, rate: 0.241, deduction: 1476.45 },
  { min: 23089, max: 29397, rate: 0.311, deduction: 3092.77 },
  { min: 29397, max: 43090, rate: 0.349, deduction: 4209.94 },
  { min: 43090, max: 46566, rate: 0.431, deduction: 7743.27 },
  { min: 46566, max: 86634, rate: 0.446, deduction: 8441.48 },
  { min: 86634, max: Infinity, rate: 0.48, deduction: 11387.17 },
];

// Social Security rates - Employees
export const SOCIAL_SECURITY_RATE_EMPLOYEE = 0.11;
export const SOCIAL_SECURITY_RATE_EMPLOYER = 0.2375;

// Social Security rates - Self-employed
export const SOCIAL_SECURITY_RATE_SELF_EMPLOYED = 0.214; // 21.4% standard rate
export const SOCIAL_SECURITY_RATE_SELF_EMPLOYED_EXTENDED = 0.252; // 25.2% extended coverage

// Self-employed contribution cap (12 × IAS per month)
export const SELF_EMPLOYED_MONTHLY_CAP_IAS_MULTIPLIER = 12;

// NHR flat rate
export const NHR_FLAT_RATE = 0.20;

// Solidarity tax thresholds
export const SOLIDARITY_TAX_THRESHOLD_1 = 80000;
export const SOLIDARITY_TAX_RATE_1 = 0.025;
export const SOLIDARITY_TAX_THRESHOLD_2 = 250000;
export const SOLIDARITY_TAX_RATE_2 = 0.05;

// Minimum subsistence threshold (Mínimo de Existência)
export const MINIMUM_SUBSISTENCE = 12880;

// IAS 2026
export const IAS_2026 = 537.13;

// Dependent deductions (per dependent)
export const DEPENDENT_DEDUCTION = 600; // €600 per dependent
export const DEPENDENT_DEDUCTION_UNDER_3 = 726; // €726 for children under 3

// Disability deduction
export const DISABILITY_DEDUCTION = 1900; // Additional deduction for disability

export interface TaxInput {
  grossSalary: number;
  salaryInputType: 'monthly' | 'annual';
  salaryMonths: number;
  employmentType: 'employee' | 'self-employed';
  taxRegime: 'standard' | 'nhr';
  maritalStatus: 'single' | 'married-one' | 'married-two';
  dependents: number;
  hasDisability: boolean;
}

export interface TaxResult {
  // Monthly values
  grossMonthly: number;
  socialSecurityMonthly: number;
  irsWithholdingMonthly: number;
  netMonthly: number;

  // Annual values
  grossAnnual: number;
  socialSecurityAnnual: number;
  irsAnnual: number;
  solidarityTax: number;
  netAnnual: number;

  // Deductions applied
  dependentDeduction: number;
  disabilityDeduction: number;
  totalDeductions: number;

  // Effective rates
  effectiveIRSRate: number;
  effectiveSSRate: number;
  effectiveTotalRate: number;

  // Tax breakdown
  taxableIncome: number;
  appliedBracket: typeof TAX_BRACKETS_2026[number] | null;
  isJointTaxation: boolean;

  // Self-employed specific
  isSelfEmployed: boolean;
  ssContributionCapped: boolean;
  ssMonthlyCapAmount: number;
}

// Helper function to calculate tax for a given taxable income
function calculateProgressiveTax(taxableIncome: number): { tax: number; bracket: typeof TAX_BRACKETS_2026[number] | null } {
  if (taxableIncome <= MINIMUM_SUBSISTENCE) {
    return { tax: 0, bracket: null };
  }

  let appliedBracket: typeof TAX_BRACKETS_2026[number] | null = null;

  for (const bracket of TAX_BRACKETS_2026) {
    if (taxableIncome <= bracket.max) {
      appliedBracket = bracket;
      break;
    }
  }

  if (!appliedBracket) {
    appliedBracket = TAX_BRACKETS_2026[TAX_BRACKETS_2026.length - 1];
  }

  const tax = Math.max(0, (taxableIncome * appliedBracket.rate) - appliedBracket.deduction);
  return { tax, bracket: appliedBracket };
}

export function calculateTaxes(input: TaxInput): TaxResult {
  const {
    grossSalary,
    salaryInputType,
    salaryMonths,
    employmentType,
    taxRegime,
    maritalStatus,
    dependents,
    hasDisability,
  } = input;

  // Calculate gross annual and monthly income based on input type
  const grossAnnual = salaryInputType === 'annual'
    ? grossSalary
    : grossSalary * salaryMonths;

  const grossMonthlySalary = salaryInputType === 'annual'
    ? grossSalary / salaryMonths
    : grossSalary;

  // Calculate social security based on employment type
  let socialSecurityAnnual: number;
  let socialSecurityMonthly: number;

  if (employmentType === 'self-employed') {
    // Self-employed: 21.4% rate with monthly cap of 12 × IAS
    const monthlyContributionCap = SELF_EMPLOYED_MONTHLY_CAP_IAS_MULTIPLIER * IAS_2026;
    const cappedMonthlyIncome = Math.min(grossMonthlySalary, monthlyContributionCap);
    socialSecurityMonthly = cappedMonthlyIncome * SOCIAL_SECURITY_RATE_SELF_EMPLOYED;
    socialSecurityAnnual = socialSecurityMonthly * salaryMonths;
  } else {
    // Employee: 11% of gross (no cap)
    socialSecurityAnnual = grossAnnual * SOCIAL_SECURITY_RATE_EMPLOYEE;
    socialSecurityMonthly = grossMonthlySalary * SOCIAL_SECURITY_RATE_EMPLOYEE;
  }

  // Taxable income = gross - social security
  const taxableIncome = grossAnnual - socialSecurityAnnual;

  let irsAnnual: number;
  let appliedBracket: typeof TAX_BRACKETS_2026[number] | null = null;

  // Determine if joint taxation applies (married sole earner) - only for standard regime
  const isJointTaxation = maritalStatus === 'married-one' && taxRegime === 'standard';

  // Calculate deductions - only apply to standard regime, not NHR
  // NHR uses a flat 20% rate without standard deductions
  const dependentDeduction = taxRegime === 'standard' ? dependents * DEPENDENT_DEDUCTION : 0;
  const disabilityDeduction = taxRegime === 'standard' && hasDisability ? DISABILITY_DEDUCTION : 0;
  const totalDeductions = dependentDeduction + disabilityDeduction;

  if (taxRegime === 'nhr') {
    // NHR: 20% flat rate on taxable income
    // No joint taxation benefit (flat rate makes it irrelevant)
    // No standard deductions apply
    irsAnnual = taxableIncome * NHR_FLAT_RATE;
  } else {
    // Standard: progressive tax brackets
    if (isJointTaxation) {
      // Joint taxation (quociente conjugal): divide income by 2, calculate tax, multiply by 2
      const halfTaxableIncome = taxableIncome / 2;
      const result = calculateProgressiveTax(halfTaxableIncome);
      irsAnnual = result.tax * 2;
      appliedBracket = result.bracket;
    } else {
      // Individual taxation
      const result = calculateProgressiveTax(taxableIncome);
      irsAnnual = result.tax;
      appliedBracket = result.bracket;
    }

    // Apply deductions as tax credits (reduce the tax owed)
    irsAnnual = Math.max(0, irsAnnual - totalDeductions);
  }

  // Calculate solidarity tax (only for standard regime, on individual taxable income)
  let solidarityTax = 0;
  if (taxRegime === 'standard' && taxableIncome > SOLIDARITY_TAX_THRESHOLD_1) {
    if (taxableIncome > SOLIDARITY_TAX_THRESHOLD_2) {
      // 2.5% on portion between 80k and 250k + 5% on portion above 250k
      solidarityTax =
        (SOLIDARITY_TAX_THRESHOLD_2 - SOLIDARITY_TAX_THRESHOLD_1) * SOLIDARITY_TAX_RATE_1 +
        (taxableIncome - SOLIDARITY_TAX_THRESHOLD_2) * SOLIDARITY_TAX_RATE_2;
    } else {
      // 2.5% on portion above 80k
      solidarityTax = (taxableIncome - SOLIDARITY_TAX_THRESHOLD_1) * SOLIDARITY_TAX_RATE_1;
    }
  }

  const totalIrsAnnual = irsAnnual + solidarityTax;

  // Calculate net annual
  const netAnnual = grossAnnual - socialSecurityAnnual - totalIrsAnnual;

  // Monthly IRS withholding (estimated as annual / salaryMonths)
  const irsWithholdingMonthly = totalIrsAnnual / salaryMonths;

  // Net monthly
  const netMonthly = grossMonthlySalary - socialSecurityMonthly - irsWithholdingMonthly;

  // Effective rates
  const effectiveIRSRate = grossAnnual > 0 ? totalIrsAnnual / grossAnnual : 0;
  const effectiveSSRate = SOCIAL_SECURITY_RATE_EMPLOYEE;
  const effectiveTotalRate = grossAnnual > 0 ? (socialSecurityAnnual + totalIrsAnnual) / grossAnnual : 0;

  // Self-employed cap info
  const monthlyCapAmount = SELF_EMPLOYED_MONTHLY_CAP_IAS_MULTIPLIER * IAS_2026;
  const isSelfEmployed = employmentType === 'self-employed';
  const ssContributionCapped = isSelfEmployed && grossMonthlySalary > monthlyCapAmount;

  return {
    grossMonthly: grossMonthlySalary,
    socialSecurityMonthly,
    irsWithholdingMonthly,
    netMonthly,
    grossAnnual,
    socialSecurityAnnual,
    irsAnnual: totalIrsAnnual,
    solidarityTax,
    netAnnual,
    dependentDeduction,
    disabilityDeduction,
    totalDeductions,
    effectiveIRSRate,
    effectiveSSRate,
    effectiveTotalRate,
    taxableIncome,
    appliedBracket,
    isJointTaxation,
    isSelfEmployed,
    ssContributionCapped,
    ssMonthlyCapAmount: monthlyCapAmount,
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPercent(value: number): string {
  return new Intl.NumberFormat('pt-PT', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value);
}
