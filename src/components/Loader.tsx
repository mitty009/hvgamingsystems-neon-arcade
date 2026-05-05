import { AnimatePresence, motion } from 'framer-motion';

export function Loader({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45 } }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#07000d]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(142,40,222,0.3),transparent_24%),radial-gradient(circle_at_bottom,rgba(255,0,146,0.18),transparent_28%)]" />
          <div className="absolute inset-0 opacity-[0.1] [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:44px_44px]" />
          <div className="absolute inset-x-0 bottom-0 h-[28vh] bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.88))]" />
          <div className="absolute left-1/2 top-[72%] h-24 w-[70vw] max-w-[620px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,0,146,0.18),rgba(142,40,222,0.05),transparent_70%)] blur-2xl" />

          <div className="relative h-full w-full max-w-[880px] overflow-hidden">
            <motion.div
              initial={{ y: -240 }}
              animate={{ y: [-240, -26, -26, -210] }}
              transition={{ duration: 2.8, times: [0, 0.42, 0.7, 1], ease: 'easeInOut' }}
              className="absolute left-1/2 top-[10%] z-30 -translate-x-1/2"
            >
              <div className="absolute left-1/2 top-[-210px] h-[220px] w-[3px] -translate-x-1/2 bg-gradient-to-b from-white via-[#b874ff] to-transparent shadow-[0_0_18px_rgba(255,255,255,0.75)]" />

              <div className="relative h-36 w-44">
                <div className="absolute left-1/2 top-0 h-18 w-34 -translate-x-1/2 rounded-b-[32px] border border-white/18 bg-[linear-gradient(180deg,rgba(106,67,167,0.95),rgba(28,10,45,0.98))] shadow-[0_0_50px_rgba(142,40,222,0.34)]" />
                <div className="absolute left-1/2 top-3 h-2 w-18 -translate-x-1/2 rounded-full bg-white/28 blur-sm" />

                <motion.div
                  animate={{ rotate: [0, 2.5, 0, -2.5, 0] }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute left-1/2 top-10 -translate-x-1/2"
                >
                  <div className="absolute left-[-2.55rem] top-0 h-18 w-[3px] origin-top rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.86)] rotate-[18deg]" />
                  <div className="absolute left-0 top-0 h-18 w-[3px] origin-top rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.86)]" />
                  <div className="absolute right-[-2.55rem] top-0 h-18 w-[3px] origin-top rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.86)] -rotate-[18deg]" />
                  <div className="absolute left-[-3rem] top-[4.1rem] h-5 w-5 rounded-full border border-white/85 border-r-0 border-t-0" />
                  <div className="absolute left-[-0.55rem] top-[4.55rem] h-5 w-5 rounded-full border border-white/85 border-r-0 border-t-0" />
                  <div className="absolute right-[-3rem] top-[4.1rem] h-5 w-5 rounded-full border border-white/85 border-l-0 border-t-0" />
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 112, opacity: 0 }}
              animate={{ y: [112, 112, -8, -160], opacity: [0, 1, 1, 1] }}
              transition={{ duration: 2.8, times: [0, 0.16, 0.7, 1], ease: 'easeInOut' }}
              className="absolute left-1/2 top-[57%] z-20 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="loader-beam absolute left-1/2 top-[-2.4rem] h-28 w-20 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.25),rgba(255,255,255,0.06),transparent_72%)] blur-lg" />
              <div className="loader-mascot relative h-30 w-22 rounded-[52%_52%_44%_44%] border border-white/16 bg-[linear-gradient(180deg,#b7ff87,#64d449)] shadow-[0_0_36px_rgba(131,255,105,0.28)]">
                <span className="loader-eye loader-eye-left" />
                <span className="loader-eye loader-eye-center" />
                <span className="loader-eye loader-eye-right" />
                <span className="absolute left-1/2 top-[-0.95rem] h-5 w-[2px] -translate-x-1/2 bg-[#8eff76] shadow-[0_0_12px_rgba(132,255,111,0.85)]" />
                <span className="absolute left-1/2 top-[-1.15rem] h-3 w-3 -translate-x-1/2 rounded-full bg-[#8eff76] shadow-[0_0_12px_rgba(132,255,111,0.85)]" />
                <span className="absolute bottom-[-0.55rem] left-[1.35rem] h-6 w-[2px] bg-[#8eff76]" />
                <span className="absolute bottom-[-0.55rem] right-[1.35rem] h-6 w-[2px] bg-[#8eff76]" />
                <span className="absolute left-[-0.1rem] top-[3.8rem] h-[2px] w-5 rotate-[16deg] bg-[#8eff76]" />
                <span className="absolute right-[-0.1rem] top-[3.8rem] h-[2px] w-5 -rotate-[16deg] bg-[#8eff76]" />
              </div>
            </motion.div>

            <div className="absolute inset-x-0 bottom-[11%] text-center">
              <p className="font-display text-4xl uppercase tracking-[0.22em] text-white sm:text-5xl">High Voltage</p>
              <p className="mt-3 text-[11px] uppercase tracking-[0.34em] text-[#ff66bf] sm:text-sm">Loading the next game</p>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
