import { motion } from 'framer-motion';
import Link from 'next/link';

export const Overview = () => {
  return (
    <motion.div
      key="overview"
      className="max-w-3xl mx-auto flex flex-col justify-center items-center text-center"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      <h1 className="text-3xl font-semibold text-black mb-4">
        Welcome to GrowthBot
      </h1>
      <p className="text-base text-gray-400 max-w-md">
        Welcome, I'm GrowthBot! Congratulations, you have taken commendable
        steps towards your discipleship and spiritual growth.
      </p>
    </motion.div>
  );
};
