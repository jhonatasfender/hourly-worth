import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { version } from '../../package.json';

export function AboutSection() {
  const { t } = useTranslation();

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/jhonatasfender',
      icon: FaGithub,
      color: 'hover:text-gray-300'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/jhonatasfender',
      icon: FaLinkedin,
      color: 'hover:text-blue-500'
    },
    {
      name: 'Email',
      url: 'mailto:jhonatas.fender@gmail.com',
      icon: FaEnvelope,
      color: 'hover:text-red-400'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8 pt-8 border-t border-gray-700"
    >
      <h3 className="text-lg font-semibold text-white mb-4">{t('about.title')}</h3>
      <div className="space-y-4 text-gray-300">
        <p>{t('about.description')}</p>
        
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`text-gray-400 ${link.color} transition-colors duration-200`}
                title={link.name}
              >
                <link.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>{t('about.version')} {version}</span>
            <span>•</span>
            <span>{t('about.contact')}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 