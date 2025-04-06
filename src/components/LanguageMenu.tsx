import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export function LanguageMenu() {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'pt-BR', name: 'Português' },
    { code: 'en-US', name: 'English' }
  ];

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="absolute top-4 right-4">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group"
      >
        <button
          className="px-3 py-1.5 bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors duration-200"
        >
          {languages.find(lang => lang.code === i18n.language)?.name || 'Language'}
        </button>
        <div className="absolute right-0 mt-2 w-32 bg-gray-800 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full px-3 py-2 text-left text-sm ${
                i18n.language === lang.code
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 