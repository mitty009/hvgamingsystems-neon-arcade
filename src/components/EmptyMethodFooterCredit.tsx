import { motion, useReducedMotion } from 'framer-motion';

const letters = [
  { character: 'e', accent: false },
  { character: 'm', accent: true },
  { character: 'p', accent: false },
  { character: 't', accent: true },
  { character: 'y', accent: false },
  { character: 'm', accent: true },
  { character: 'e', accent: false },
  { character: 't', accent: true },
  { character: 'h', accent: false },
  { character: 'o', accent: false },
  { character: 'd', accent: false },
] as const;

export function EmptyMethodFooterCredit() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative z-10 border-t border-white/8 bg-[#040509] px-5 py-5 sm:px-6 lg:px-8 2xl:px-12">
      <div className="mx-auto flex w-full max-w-[96rem] flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-slate-500 sm:text-xs">
          Website created by
        </p>

        <motion.a
          href="https://www.emptymethod.com.au/"
          target="_blank"
          rel="noreferrer"
          aria-label="Visit Empty Method — systems, code and clarity"
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.75 }}
          whileHover={reduceMotion ? undefined : { y: -2 }}
          className="group inline-flex flex-col items-center gap-1.5 rounded-xl px-3 py-2 outline-none transition focus-visible:ring-2 focus-visible:ring-emerald-300/70 sm:items-end"
        >
          <span className="inline-flex gap-px font-sans text-[1.35rem] font-medium leading-none tracking-[-0.055em] sm:text-[1.55rem]">
            {letters.map((letter, index) => (
              <motion.span
                key={`${letter.character}-${index}`}
                variants={{
                  hidden: { opacity: 0, y: 9, filter: 'blur(3px)' },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    transition: {
                      duration: letter.accent ? 0.52 : 0.42,
                      delay: index * 0.045,
                      ease: [0.22, 0.61, 0.36, 1],
                    },
                  },
                }}
                className={
                  letter.accent
                    ? 'bg-gradient-to-br from-emerald-400 via-emerald-300 to-sky-400 bg-clip-text text-transparent'
                    : 'text-slate-100 transition group-hover:text-white'
                }
              >
                {letter.character}
              </motion.span>
            ))}
          </span>

          <motion.span
            variants={{
              hidden: { opacity: 0, y: 4 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, delay: 0.62, ease: 'easeOut' },
              },
            }}
            className="text-[0.48rem] font-semibold uppercase tracking-[0.34em] text-slate-500 transition group-hover:text-slate-300 sm:text-[0.56rem]"
          >
            Systems · Code · Clarity
          </motion.span>
        </motion.a>
      </div>
    </div>
  );
}
