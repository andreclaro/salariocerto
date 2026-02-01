# Net Salary Calculator Portugal

Free, open-source salary calculator for Portugal (2026). Calculate net salary after IRS, social security, and special tax regimes.

**Website:** [salarioliquidopt.vercel.app](https://salarioliquidopt.vercel.app)

---

# English

A free, open-source salary calculator for Portugal (2026). Calculate your net salary after IRS taxes, social security contributions, and special tax regimes.

## Features

- **Salary Calculation** – Compute net salary from gross with 2026 IRS tax brackets
- **Multiple Income Types** – Support for employees and self-employed (trabalhador independente)
- **Special Tax Regimes** – NHR (20% flat rate), IFICI, and RNH
- **Family Deductions** – Marital status and dependent deductions
- **Disability Allowances** – Specific deductions for disability status
- **Multi-language** – Portuguese and English with automatic browser detection
- **Dark/Light Mode** – Theme support with persistence
- **Responsive Design** – Classic and dashboard layout modes

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

---

# Português

Calculadora de salário líquido gratuita e open-source para Portugal (2026). Calcule o seu salário líquido após IRS, segurança social e regimes fiscais especiais.

## Funcionalidades

- **Cálculo de Salário** – Calcule o salário líquido a partir do bruto com os escalões de IRS 2026
- **Vários Tipos de Rendimento** – Suporte para trabalhadores por conta de outrem e independentes
- **Regimes Fiscais Especiais** – RNH (taxa fixa de 20%), IFICI e RNH
- **Deduções Familiares** – Estado civil e deduções por dependentes
- **Abonos por Deficiência** – Deduções específicas por deficiência
- **Multi-idioma** – Português e inglês com deteção automática do browser
- **Modo Claro/Escuro** – Suporte a tema com persistência
- **Design Responsivo** – Modos de layout clássico e dashboard

## Stack Tecnológica

- React 18 com TypeScript
- Vite
- React Router v7
- Implementação i18n própria

## Começar

### Pré-requisitos

- [Bun](https://bun.sh) 1.0+

### Instalação

```bash
git clone https://github.com/your-username/salariocerto.git
cd salariocerto
bun install
```

### Desenvolvimento

```bash
bun dev
```

### Build

```bash
bun run build
```

### Pré-visualizar Build de Produção

```bash
bun run preview
```

## Estrutura do Projeto

```
src/
├── components/        # Componentes React de UI
│   ├── InputForm.tsx       # Formulário de salário
│   ├── Results.tsx         # Resultados do cálculo
│   ├── InfoTabs.tsx        # Tabs de informação
│   └── SalaryExamples.tsx  # Cenários de exemplo
├── utils/
│   └── taxCalculator.ts    # Lógica de cálculo
├── i18n/
│   ├── LanguageContext.tsx # Estado do idioma
│   └── translations.ts     # Traduções PT e EN
├── hooks/             # React hooks personalizados
├── App.tsx            # Componente principal
└── main.tsx           # Ponto de entrada
```

## Constantes Fiscais 2026

| Parâmetro | Valor |
|-----------|-------|
| IAS | 537,13 € |
| Segurança Social (Trabalhador) | 11% |
| Segurança Social (Empregador) | 23,75% |
| Segurança Social (Independente) | 21,4% |
| Taxa Fixa RNH | 20% |
| Dedução por Dependente | 600 € |

## Licença

MIT
