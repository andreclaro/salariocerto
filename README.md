# Calculadora do Salário Líquido em Portugal

A free, open-source salary calculator for Portugal (2026). Calculate your net salary after IRS taxes, social security contributions, and special tax regimes.

**Website:** [Calculadora do Salário Líquido em Portugal](https://Sálario Certo)

## Features

- **Salary Calculation** - Compute net salary from gross with 2026 IRS tax brackets
- **Multiple Income Types** - Support for employees and self-employed (trabalhador independente)
- **Special Tax Regimes** - NHR (20% flat rate), IFICI, and RNH
- **Family Deductions** - Marital status and dependent deductions
- **Disability Allowances** - Specific deductions for disability status
- **Multi-language** - Portuguese and English with automatic browser detection
- **Dark/Light Mode** - Theme support with persistence
- **Responsive Design** - Classic and dashboard layout modes

## Tech Stack

- React 18 with TypeScript
- Vite
- React Router v7
- Custom i18n implementation

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) 1.0+

### Installation

```bash
git clone https://github.com/your-username/salariocerto.git
cd salariocerto
bun install
```

### Development

```bash
bun dev
```

### Build

```bash
bun run build
```

### Preview Production Build

```bash
bun run preview
```

## Project Structure

```
src/
├── components/        # React UI components
│   ├── InputForm.tsx       # Salary input form
│   ├── Results.tsx         # Calculation results
│   ├── InfoTabs.tsx        # Educational info tabs
│   └── SalaryExamples.tsx  # Example scenarios
├── utils/
│   └── taxCalculator.ts    # Core calculation logic
├── i18n/
│   ├── LanguageContext.tsx # Language state
│   └── translations.ts     # PT & EN translations
├── hooks/             # Custom React hooks
├── App.tsx            # Main app component
└── main.tsx           # Entry point
```

## 2026 Tax Constants

| Parameter | Value |
|-----------|-------|
| IAS | €537.13 |
| Social Security (Employee) | 11% |
| Social Security (Employer) | 23.75% |
| Social Security (Self-employed) | 21.4% |
| NHR Flat Rate | 20% |
| Dependent Deduction | €600 |

## License

MIT
