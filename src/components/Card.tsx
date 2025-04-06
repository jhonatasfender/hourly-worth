import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useCalculation } from '../hooks/useCalculation';
import { twMerge } from 'tailwind-merge';
import { LanguageMenu } from './LanguageMenu';
import { AboutSection } from './AboutSection';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  const { result } = useCalculation();

  const style = twMerge(
    'w-full max-w-md max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 hover:scrollbar-thumb-gray-500 transition-colors duration-200',
    className,
    result && 'max-w-4xl'
  );

  return (
    <div className="h-screen w-screen bg-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8,
          ease: [0.6, -0.05, 0.01, 0.99]
        }}
        className={style}
      >
        <LanguageMenu />
        <div className="w-full">
          <div
            className={`bg-gray-800 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.3)] p-6 md:p-8 space-y-4 md:space-y-6 backdrop-blur-sm ${className}`}
          >
            {children}
            <AboutSection />
          </div>
        </div>
      </motion.div>
    </div>
  );
} 