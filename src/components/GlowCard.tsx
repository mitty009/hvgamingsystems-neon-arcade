import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '../lib/utils';

type GlowCardProps = {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'compact' | 'comfortable';
  tone?: 'neutral' | 'cyan' | 'pink' | 'violet';
  motionEffect?: 'lift' | 'none';
};

const paddingClasses = {
  none: 'p-0',
  compact: 'p-5',
  comfortable: 'p-6',
};

const toneClasses = {
  neutral: 'border-white/16 bg-[linear-gradient(180deg,rgba(30,35,52,0.92),rgba(10,14,24,0.97))]',
  cyan: 'border-cyan-300/16 bg-[linear-gradient(180deg,rgba(7,18,25,0.92),rgba(5,8,12,0.98))]',
  pink: 'border-[#ff0092]/18 bg-[linear-gradient(180deg,rgba(26,10,24,0.94),rgba(9,8,15,0.98))]',
  violet: 'border-[#a05cff]/18 bg-[linear-gradient(180deg,rgba(24,15,40,0.94),rgba(9,8,16,0.98))]',
};

export function GlowCard({
  children,
  className = '',
  padding = 'comfortable',
  tone = 'neutral',
  motionEffect = 'lift',
}: GlowCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      whileHover={motionEffect === 'lift' ? { y: -4, scale: 1.01 } : undefined}
      className={cn(
        'arcade-panel group relative overflow-hidden border backdrop-blur-xl',
        toneClasses[tone],
        paddingClasses[padding],
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <div className="absolute -left-12 top-0 h-36 w-36 rounded-full bg-[#8e28de]/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-[#ff0092]/18 blur-3xl" />
      </div>
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
