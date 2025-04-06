import { useContext } from 'react';
import { CalculationContext } from '../contexts/CalculationContext';

export function useCalculation() {
  const context = useContext(CalculationContext);
  if (!context) {
    throw new Error('useCalculation must be used within a CalculationProvider');
  }
  return context;
} 