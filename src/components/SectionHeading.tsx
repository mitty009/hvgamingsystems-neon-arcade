import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = 'left',
  action,
}: {
  eyebrow: string;
  title: string;
  text: string;
  align?: 'left' | 'center';
  action?: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55 }}
      className={align === 'center' ? 'mx-auto max-w-4xl text-center' : 'max-w-4xl'}
    >
      <div className="mb-4 inline-flex items-center gap-3 border border-white/18 bg-white/9 px-4 py-2 text-[0.7rem] font-bold uppercase tracking-[0.34em] text-[#ff8ccf] shadow-[0_0_34px_rgba(255,0,146,0.18)] backdrop-blur">
        <span className="h-2 w-2 bg-[#8e28de] shadow-[0_0_18px_rgba(142,40,222,0.9)]" />
        {eyebrow}
      </div>
      <h2 className="font-display text-5xl font-extrabold uppercase leading-[0.86] tracking-[0.045em] text-white drop-shadow-[0_0_22px_rgba(255,255,255,0.08)] sm:text-6xl lg:text-7xl">
        {title}
      </h2>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200/88 sm:text-xl">{text}</p>
      {action ? <div className="mt-7">{action}</div> : null}
    </motion.div>
  );
}
