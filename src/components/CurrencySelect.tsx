import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { currencies } from '../constants/currencies';

export function CurrencySelect() {
  const { register } = useFormContext();

  return (
    <div className="space-y-2">
      <label className="text-gray-300 text-sm font-medium">Moeda</label>
      <motion.div 
        whileHover={{ }}
        whileTap={{ }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <select
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 appearance-none"
          {...register('currency')}
        >
          {currencies.map((curr) => (
            <option key={curr.code} value={curr.code}>
              {curr.name}
            </option>
          ))}
        </select>
      </motion.div>
    </div>
  );
} 