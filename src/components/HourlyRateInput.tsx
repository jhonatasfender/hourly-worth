import { useFormContext } from 'react-hook-form';
import { currencies } from '../constants/currencies';

export function HourlyRateInput() {
  const { register, watch, formState: { errors } } = useFormContext();
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
      <label className="text-gray-300 text-sm font-medium">Valor da Hora</label>
      <div>
        <input
          type="text"
          placeholder={formatter.format(0)}
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          {...register('hourlyRate', {
            required: 'Valor da hora é obrigatório',
            pattern: {
              value: /^\d+(\.\d{1,2})?$/,
              message: 'Use apenas números e até 2 casas decimais'
            },
            validate: {
              positive: (value) => Number(value) > 0 || 'O valor deve ser maior que zero'
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