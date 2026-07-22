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
      className={align === 'center' ? 'mx-auto max-w-[50rem] text-center' : 'max-w-[48rem]'}
    >
      <div className="mb-3 inline-flex items-center gap-3 border border-white/18 bg-white/9 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#ff8ccf] shadow-[0_0_34px_rgba(255,0,146,0.18)] backdrop-blur">
        <span className="h-2 w-2 bg-[#8e28de] shadow-[0_0_18px_rgba(142,40,222,0.9)]" />
        {eyebrow}
      </div>
      <h2 className="font-display text-[clamp(2.5rem,3.5vw,4rem)] font-extrabold uppercase leading-[0.94] tracking-[0.035em] text-white drop-shadow-[0_0_22px_rgba(255,255,255,0.08)]">
        {title}
      </h2>
      <p className="mt-4 max-w-[46rem] text-base leading-7 text-slate-200 sm:text-[1.0625rem] sm:leading-8">{text}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </motion.div>
  );
}
