import { useFormContext } from 'react-hook-form';
import { currencies } from '../constants/currencies';
import { useTranslation } from 'react-i18next';

export function HourlyRateInput() {
  const { register, watch, formState: { errors } } = useFormContext();
  const { t } = useTranslation();
  const currency = watch('currency') || 'BRL';

  const selectedCurrency = currencies.find(c => c.code === currency);
  const formatter = new Intl.NumberFormat(selectedCurrency?.locale || 'en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return (
    <div className="space-y-2">
      <label className="text-gray-300 text-sm font-medium">{t('form.hourlyRate.label')}</label>
      <div>
        <input
          type="text"
          placeholder={formatter.format(0)}
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          {...register('hourlyRate', {
            required: t('form.hourlyRate.error.required'),
            pattern: {
              value: /^\d+(\.\d{1,2})?$/,
              message: t('form.hourlyRate.error.format')
            },
            validate: {
              positive: (value) => Number(value) > 0 || t('form.hourlyRate.error.positive')
            },
            onChange: (e) => {
              const value = e.target.value.replace(/[^\d.]/g, '');
              const parts = value.split('.');
              if (parts.length > 1) {
                parts[1] = parts[1].slice(0, 2);
                e.target.value = parts.join('.');
              } else {
                e.target.value = value;
              }
            }
          })}
        />
        {errors.hourlyRate && (
          <p className="text-red-400 text-sm mt-1">{errors.hourlyRate.message as string}</p>
        )}
      </div>
    </div>
  );
} 