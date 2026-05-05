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
      className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}
    >
      <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-white/18 bg-white/9 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.34em] text-[#ff8ccf] shadow-[0_0_34px_rgba(255,0,146,0.18)] backdrop-blur">
        <span className="h-2 w-2 rounded-full bg-[#8e28de] shadow-[0_0_18px_rgba(142,40,222,0.9)]" />
        {eyebrow}
      </div>
      <h2 className="font-display text-3xl font-extrabold uppercase leading-[0.95] text-white drop-shadow-[0_0_22px_rgba(255,255,255,0.08)] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-7 text-slate-200/88 sm:text-lg">{text}</p>
      {action ? <div className="mt-7">{action}</div> : null}
    </motion.div>
  );
}
