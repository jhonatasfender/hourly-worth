import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export function TimeInput() {
  const { register, formState: { errors } } = useFormContext();
  const { t } = useTranslation();

  return (
    <div className="space-y-2">
      <label className="text-gray-300 text-sm font-medium">{t('form.time.label')}</label>
      <motion.div 
        whileHover={{ }}
        whileTap={{ }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <input
          type="text"
          placeholder={t('form.time.placeholder')}
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          {...register('time', {
            required: t('form.time.error.required'),
            pattern: {
              value: /^\d+:[0-5]\d:[0-5]\d$/,
              message: t('form.time.error.format')
            }
          })}
        />
        {errors.time && (
          <p className="text-red-400 text-sm mt-1">{errors.time.message as string}</p>
        )}
      </motion.div>
    </div>
  );
} 