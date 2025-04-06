import { useContext } from 'react';
import { CalculationContext, CalculationContextData } from '../contexts/CalculationContext';

export function useCalculation(): CalculationContextData {
  const context = useContext(CalculationContext);
  if (!context) {
    throw new Error('useCalculation must be used within a CalculationProvider');
  }
  return context;
} 