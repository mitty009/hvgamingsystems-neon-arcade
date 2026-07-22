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
      className={align === 'center' ? 'mx-auto max-w-4xl text-center' : 'max-w-[52rem]'}
    >
      <div className="mb-3 inline-flex items-center gap-3 border border-white/18 bg-white/9 px-3.5 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.3em] text-[#ff8ccf] shadow-[0_0_34px_rgba(255,0,146,0.18)] backdrop-blur">
        <span className="h-2 w-2 bg-[#8e28de] shadow-[0_0_18px_rgba(142,40,222,0.9)]" />
        {eyebrow}
      </div>
      <h2 className="font-display text-[clamp(2.9rem,4.3vw,4.7rem)] font-extrabold uppercase leading-[0.9] tracking-[0.04em] text-white drop-shadow-[0_0_22px_rgba(255,255,255,0.08)]">
        {title}
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-7 text-slate-200/88 sm:text-lg sm:leading-8">{text}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </motion.div>
  );
}
