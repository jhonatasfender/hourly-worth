import { Card } from './components/Card';
import { Form } from './components/Form';
import { TimeInput } from './components/TimeInput';
import { CurrencySelect } from './components/CurrencySelect';
import { HourlyRateInput } from './components/HourlyRateInput';
import { SubmitButton } from './components/SubmitButton';
import { ResultCard } from './components/ResultCard';
import { CalculationProvider } from './contexts/CalculationContext';
import { useCalculation } from './hooks/useCalculation';
import { Logo } from './components/Logo';

function AppContent() {
  const { calculate } = useCalculation();

  return (
    <Card>
      <div className="flex flex-col items-center mb-6">
        <Logo />
        <h1 className="text-2xl font-bold text-white text-center">
          Calculadora de Valor Hora
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <Form onSubmit={calculate}>
            <TimeInput />
            <CurrencySelect />
            <HourlyRateInput />
            <SubmitButton>Calcular</SubmitButton>
          </Form>
        </div>
        
        <ResultCard />
      </div>
    </Card>
  );
}

function App() {
  return (
    <CalculationProvider>
      <AppContent />
    </CalculationProvider>
  );
}

export default App;
