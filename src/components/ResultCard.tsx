import { useCalculation } from '../hooks/useCalculation';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface TimeBreakdown {
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function formatTimeUnit(value: number, singular: string, plural: string): string {
  return `${value} ${value === 1 ? singular : plural}`;
}

function TimeBreakdown({ breakdown }: { breakdown: TimeBreakdown }) {
  const { t } = useTranslation();
  const units = [
    { value: breakdown.months, singular: t('timeUnits.month'), plural: t('timeUnits.months') },
    { value: breakdown.weeks, singular: t('timeUnits.week'), plural: t('timeUnits.weeks') },
    { value: breakdown.days, singular: t('timeUnits.day'), plural: t('timeUnits.days') },
    { value: breakdown.hours, singular: t('timeUnits.hour'), plural: t('timeUnits.hours') }
  ];

  const formattedUnits = units
    .filter(unit => unit.value > 0)
    .map(unit => formatTimeUnit(unit.value, unit.singular, unit.plural));

  if (formattedUnits.length === 0) return null;

  return (
    <div className="mt-4 pt-4 border-t border-gray-700">
      <h4 className="text-sm font-medium text-white mb-2">{t('result.timeEquivalence')}:</h4>
      <div className="flex flex-wrap gap-1">
        {formattedUnits.map((text, index, array) => (
          <span key={index}>
            {text}
            {index < array.length - 1 && <span className="text-gray-500">, </span>}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ResultCard() {
  const { result } = useCalculation();
  const { t } = useTranslation();

  if (!result) return null;

  return (
    <div className="flex-1 relative">
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gray-600" />
      <div className="pl-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          className="bg-gray-800 rounded-lg p-6 shadow-[0_8px_30px_rgb(0,0,0,0.3)]"
        >
          <h2 className="text-2xl font-bold text-white mb-4">{t('result.title')}</h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-gray-400">{t('result.totalTime')}:</p>
              <p className="text-xl font-semibold text-white">{result.formattedTime}</p>
            </div>

            <div>
              <p className="text-gray-400">{t('result.totalValue')}:</p>
              <p className="text-3xl font-bold text-blue-400">{result.formattedValue}</p>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-3">{t('result.calculationDetails')}</h3>
              
              <div className="space-y-2 text-sm text-gray-400">
                <p>{t('result.hours')}: {result.calculationSteps.hours}h</p>
                <p>{t('result.minutes')}: {result.calculationSteps.minutes}min ({result.calculationSteps.decimalMinutes.toFixed(4)}h)</p>
                <p>{t('result.seconds')}: {result.calculationSteps.seconds}s ({result.calculationSteps.decimalSeconds.toFixed(4)}h)</p>
                <p className="font-medium text-white">{t('result.decimalHours')}: {result.decimalHours.toFixed(4)}h</p>
                
                <TimeBreakdown breakdown={result.timeBreakdown} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}