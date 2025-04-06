import { motion } from 'framer-motion';

interface SubmitButtonProps {
  children: React.ReactNode;
}

export function SubmitButton({ children }: SubmitButtonProps) {
  return (
    <motion.button
      whileHover={{ }}
      whileTap={{ }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      type="submit"
      className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 cursor-pointer"
    >
      {children}
    </motion.button>
  );
}
