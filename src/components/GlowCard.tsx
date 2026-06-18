import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export function GlowCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      whileHover={{ y: -4, scale: 1.01 }}
      className={`arcade-panel group relative overflow-hidden border border-white/16 bg-[linear-gradient(180deg,rgba(30,35,52,0.92),rgba(10,14,24,0.97))] p-6 backdrop-blur-xl ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <div className="absolute -left-12 top-0 h-36 w-36 rounded-full bg-[#8e28de]/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-[#ff0092]/18 blur-3xl" />
      </div>
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
