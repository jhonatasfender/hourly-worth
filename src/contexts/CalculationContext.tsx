import { createContext, ReactNode, useState } from 'react';
import { formatDuration, intervalToDuration } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { currencies } from '../constants/currencies';

interface TimeBreakdown {
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CalculationContextData {
  time: string;
  hourlyRate: string;
  currency: string;
  result: {
    decimalHours: number;
    totalValue: number;
    formattedTime: string;
    formattedValue: string;
    timeBreakdown: TimeBreakdown;
    calculationSteps: {
      hours: number;
      minutes: number;
      seconds: number;
      decimalMinutes: number;
      decimalSeconds: number;
    };
  } | null;
  calculate: (time: string, hourlyRate: string, currency: string) => void;
}

const CalculationContext = createContext<CalculationContextData>({} as CalculationContextData);

interface CalculationProviderProps {
  children: ReactNode;
}

function calculateTimeBreakdown(hours: number): TimeBreakdown {
  const totalHours = hours;
  const months = Math.floor(totalHours / (24 * 30));
  const remainingHoursAfterMonths = totalHours % (24 * 30);
  
  const weeks = Math.floor(remainingHoursAfterMonths / (24 * 7));
  const remainingHoursAfterWeeks = remainingHoursAfterMonths % (24 * 7);
  
  const days = Math.floor(remainingHoursAfterWeeks / 24);
  const remainingHoursAfterDays = remainingHoursAfterWeeks % 24;
  
  return {
    months,
    weeks,
    days,
    hours: remainingHoursAfterDays,
    minutes: 0,
    seconds: 0
  };
}

export function CalculationProvider({ children }: CalculationProviderProps) {
  const [result, setResult] = useState<CalculationContextData['result']>(null);

  const calculate = (time: string, hourlyRate: string, currency: string) => {
    try {
      if (!time || !hourlyRate || !currency) {
        throw new Error('Todos os campos são obrigatórios');
      }

      const [hours, minutes, seconds] = time.split(':').map(Number);
      
      if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
        throw new Error('Formato de tempo inválido');
      }

      if (minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59) {
        throw new Error('Minutos e segundos devem estar entre 0 e 59');
      }

      const rate = Number(hourlyRate);
      if (isNaN(rate) || rate <= 0) {
        throw new Error('Valor por hora inválido');
      }
      
      const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
      
      const decimalMinutes = minutes / 60;
      const decimalSeconds = seconds / 3600;
      
      const decimalHours = hours + decimalMinutes + decimalSeconds;
      
      const totalValue = decimalHours * rate;
      
      const formattedTime = formatDuration(
        intervalToDuration({ start: 0, end: totalSeconds * 1000 }),
        { locale: ptBR }
      );
      
      const selectedCurrency = currencies.find(c => c.code === currency);
      const locale = selectedCurrency?.locale || 'en-US';
      const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      
      const formattedValue = formatter.format(totalValue);

      const timeBreakdown = calculateTimeBreakdown(hours);

      setResult({
        decimalHours,
        totalValue,
        formattedTime,
        formattedValue,
        timeBreakdown,
        calculationSteps: {
          hours,
          minutes,
          seconds,
          decimalMinutes,
          decimalSeconds
        }
      });
    } catch (error) {
      console.error('Erro ao calcular:', error);
      setResult(null);
    }
  };

  return (
    <CalculationContext.Provider value={{ time: '', hourlyRate: '', currency: '', result, calculate }}>
      {children}
    </CalculationContext.Provider>
  );
}

export { CalculationContext }; 