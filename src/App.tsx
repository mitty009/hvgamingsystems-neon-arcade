import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Mail, MapPin, Menu, Send, X, Zap } from 'lucide-react';
import { GlowCard } from './components/GlowCard';
import { SectionHeading } from './components/SectionHeading';
import {
  categories,
  differentiators,
  enquiryTypes,
  faqs,
  galleryStories,
  galleryItems,
  highlights,
  process,
  sectors,
  services,
  serviceAreas,
  site,
  stats,
  venueOutcomes,
} from './data/site';
import seoPages from './data/seo-pages.json';
import { cn, scrollToId } from './lib/utils';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'range', label: 'Range' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'about', label: 'About' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
];

const attractionRail = [
  'Linked racers',
  'Prize machines',
  'Pool tables',
  'Air hockey',
  'Skill testers',
  'Arcade cabinets',
  'Venue support',
  'Zero-upfront placements',
];

function PillButton({
  children,
  href,
  variant = 'primary',
  onClick,
  type = 'button',
}: {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  type?: 'button' | 'submit';
}) {
  const classes =
    variant === 'primary'
      ? 'arcade-button-primary'
      : 'arcade-button-secondary';

  if (href) {
    return (
      <a
        href={href}
        className={cn(
          'arcade-button inline-flex items-center justify-center gap-2 border px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] transition duration-300',
          classes,
        )}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        'arcade-button inline-flex items-center justify-center gap-2 border px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] transition duration-300',
        classes,
      )}
    >
      {children}
    </button>
  );
}

function SectionShell({
  id,
  className = '',
  tone = 'violet',
  width = 'standard',
  children,
}: {
  id?: string;
  className?: string;
  tone?: 'violet' | 'pink' | 'cyan' | 'mixed' | 'dark';
  width?: 'standard' | 'wide' | 'narrow';
  children: ReactNode;
}) {
  const tones: Record<string, string> = {
    violet:
      'after:bg-[linear-gradient(135deg,rgba(142,40,222,0.18),rgba(47,216,255,0.05)_44%,transparent_76%)]',
    pink:
      'after:bg-[linear-gradient(135deg,rgba(255,0,146,0.14),rgba(142,40,222,0.07)_48%,transparent_78%)]',
    cyan:
      'after:bg-[linear-gradient(135deg,rgba(75,214,255,0.13),rgba(26,57,72,0.08)_48%,transparent_80%)]',
    mixed:
      'after:bg-[linear-gradient(135deg,rgba(255,0,146,0.12),rgba(75,214,255,0.08)_42%,rgba(142,40,222,0.12)_74%,transparent_100%)]',
    dark:
      'after:bg-[linear-gradient(135deg,rgba(255,255,255,0.035),rgba(75,214,255,0.035)_52%,transparent_82%)]',
  };
  const widths = {
    standard: 'max-w-[96rem]',
    wide: 'max-w-[108rem]',
    narrow: 'max-w-[78rem]',
  };

  return (
    <section
      id={id}
      className={cn(
        '-mt-px relative isolate overflow-hidden bg-transparent px-5 py-[clamp(3.75rem,6vw,6rem)] after:pointer-events-none after:absolute after:inset-0 after:z-0 after:[mask-image:linear-gradient(180deg,transparent,black_14%,black_86%,transparent)] sm:px-6 lg:px-8 2xl:px-10',
        tones[tone],
        className,
      )}
    >
      <div className={cn('relative z-10 mx-auto w-full', widths[width])}>{children}</div>
    </section>
  );
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [lightboxItem, setLightboxItem] = useState<(typeof galleryItems)[number] | null>(null);
  const closeLightboxRef = useRef<HTMLButtonElement>(null);
  const year = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!lightboxItem) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxItem(null);
    };
    document.body.style.overflow = 'hidden';
    window.requestAnimationFrame(() => closeLightboxRef.current?.focus());
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [lightboxItem]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setSending(true);
    setMessage(null);

    try {
      const response = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          mobile: formData.get('mobile'),
          venue: formData.get('venue'),
          location: formData.get('location'),
          venueType: formData.get('venueType'),
          enquiryType: formData.get('enquiryType'),
          message: formData.get('message'),
          website: formData.get('website'),
        }),
      });

      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error ?? 'Unable to send enquiry.');
      form.reset();
      setMessage('Thanks — your enquiry has been sent.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to send enquiry.');
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#05060a] text-white">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#05060a]">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#05060a_0%,#090b13_28%,#070911_58%,#0a0d15_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,0,146,0.08),transparent_32%,rgba(75,214,255,0.06)_60%,rgba(142,40,222,0.07)_100%)]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:84px_84px]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/8 bg-[#06070b]/72 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[108rem] items-center justify-between px-5 py-4 sm:px-6 lg:px-8 2xl:px-10">
          <a href="#home" className="flex items-center gap-4 text-left">
            <img src="/assets/hv/logo-primary.png" alt="HIGH VOLTAGE GAMING SYSTEMS" className="h-10 w-auto sm:h-11" />
          </a>

          <nav className="hidden items-center gap-2 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToId(item.id)}
                className="nav-chip px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-300 transition hover:text-white"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <PillButton onClick={() => scrollToId('contact')}>Contact us</PillButton>
          </div>

          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 lg:hidden"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen ? (
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-white/8 bg-[#0b0d15]/97 px-6 py-5 lg:hidden"
            >
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setMobileOpen(false);
                      scrollToId(item.id);
                    }}
                    className="text-left text-sm font-medium uppercase tracking-[0.12em] text-slate-200"
                  >
                    {item.label}
                  </button>
                ))}
                <PillButton onClick={() => scrollToId('contact')}>Contact us</PillButton>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <main className="relative z-10">
        <section id="home" className="relative min-h-[42rem] overflow-hidden bg-black lg:min-h-[clamp(42rem,78svh,52rem)]">
          <div className="absolute inset-0">
            <img
              src="/assets/hv/hero-pin.jpeg"
              alt="Arcade machine hero"
              className="h-full w-full object-cover object-[center_56%] md:object-[center_54%] lg:object-[center_50%]"
            />
          </div>

          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.86)_0%,rgba(0,0,0,0.58)_42%,rgba(0,0,0,0.18)_78%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.72),rgba(0,0,0,0.05)_42%,rgba(0,0,0,0.9)_100%)]" />
          <div className="scanline-overlay absolute inset-0" />

          <div className="relative flex min-h-[42rem] items-center px-5 pb-24 pt-24 sm:px-6 sm:pt-28 lg:min-h-[clamp(42rem,78svh,52rem)] lg:px-8 2xl:px-10">
            <div className="mx-auto grid w-full max-w-[108rem] gap-8 lg:grid-cols-[minmax(0,1.12fr)_minmax(23rem,0.58fr)] lg:items-end 2xl:grid-cols-[minmax(0,1.16fr)_minmax(34rem,0.84fr)]">
              <motion.div
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-5xl"
              >
                <div className="inline-flex items-center gap-3 border border-[#ff0092]/36 bg-black/44 px-4 py-2 text-[0.7rem] font-bold uppercase tracking-[0.32em] text-[#ff8ccf] shadow-[0_0_32px_rgba(255,0,146,0.18)] backdrop-blur">
                  <Zap size={15} className="text-[#4bd6ff]" />
                  Murray / Riverina venue entertainment
                </div>

                <h1 className="mt-6 max-w-5xl font-display text-[clamp(4rem,8.4vw,9rem)] uppercase leading-[0.8] tracking-[0.025em] text-white drop-shadow-[0_0_28px_rgba(255,0,146,0.22)]">
                  High Voltage
                  <span className="block text-[#ff0092]">Gaming Systems</span>
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/88 sm:text-xl lg:text-2xl lg:leading-9">
                  Arcade machines, pool tables and zero-upfront-cost entertainment placements for venues that want more colour, more play and more reasons for guests to stay.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <PillButton onClick={() => scrollToId('contact')}>
                    Start a venue enquiry
                    <Send size={16} />
                  </PillButton>
                  <PillButton variant="secondary" onClick={() => scrollToId('gallery')}>
                    See machines in venues
                    <ChevronRight size={16} />
                  </PillButton>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 26 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.78, delay: 0.42 }}
                className="hidden lg:block"
              >
                <div className="arcade-panel border-[#4bd6ff]/24 bg-black/42 p-5 backdrop-blur-md">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[0.66rem] font-bold uppercase tracking-[0.32em] text-cyan-100/80">Venue mix</p>
                    <span className="h-2 w-2 bg-[#7dff7a] shadow-[0_0_18px_rgba(125,255,122,0.9)]" />
                  </div>
                  <div className="mt-4 grid gap-3 2xl:grid-cols-2">
                    {highlights.map((item) => (
                      <div key={item.value} className="border border-white/10 bg-white/[0.045] p-3.5">
                        <p className="font-display text-2xl uppercase tracking-[0.08em] text-white">{item.value}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-300">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-10 border-y border-white/10 bg-black/72 py-4 backdrop-blur-md">
            <div className="marquee-track flex whitespace-nowrap text-sm font-bold uppercase tracking-[0.22em] text-white/78">
              {[...attractionRail, ...attractionRail].map((item, index) => (
                <span key={`${item}-${index}`} className="mx-5 inline-flex items-center gap-4">
                  <span className="h-1.5 w-1.5 bg-[#ff0092] shadow-[0_0_12px_rgba(255,0,146,0.9)]" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>



        <SectionShell tone="dark" width="wide">
          <div className="grid gap-8 xl:grid-cols-[0.68fr_1.32fr] xl:items-stretch">
            <SectionHeading
              eyebrow="Venue outcomes"
              title="More play, longer stays and better use of the room."
              text="The right mix of arcade machines, pool tables and prize attractions can make a venue feel more active while supporting the way guests already move through the space."
              action={<PillButton variant="secondary" onClick={() => scrollToId('services')}>Explore services <ArrowRight size={16} /></PillButton>}
            />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55 }}
              className="arcade-panel min-h-[21rem] overflow-hidden p-0"
            >
              <img src="/assets/gallery/curated/venue-floor-wide.webp" alt="Arcade machines installed in a venue games room" className="h-full min-h-[21rem] w-full object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,5,8,0.05),rgba(3,5,8,0.82))]" />
              <div className="absolute inset-x-0 bottom-0 p-6 lg:p-7">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#4bd6ff]">From quiet floor space to active attraction</p>
                <h3 className="mt-2 max-w-2xl font-display text-[clamp(2.4rem,3.4vw,4rem)] uppercase leading-[0.9] tracking-[0.05em] text-white">
                  Build the room people notice.
                </h3>
              </div>
            </motion.div>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {venueOutcomes.map((item, index) => (
              <GlowCard key={item.title} className="border-cyan-300/14 bg-[linear-gradient(180deg,rgba(7,18,25,0.9),rgba(5,8,12,0.98))] p-5">
                <div className="flex items-start gap-4">
                  <p className="font-display text-2xl uppercase tracking-[0.1em] text-[#ff0092]">0{index + 1}</p>
                  <div>
                    <h3 className="font-display text-2xl uppercase leading-none tracking-[0.07em] text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        </SectionShell>

        <SectionShell id="services" tone="pink">
          <SectionHeading
            eyebrow="Services"
            title="Machines, tables and support without the guesswork."
            text="Choose the entertainment mix, commercial arrangement and servicing approach that fits the venue. High Voltage Gaming Systems can help with supply, leasing, profit-share options and ongoing maintenance."
          />

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <GlowCard key={service.title} className="service-card p-5 pb-7">
                  <div className="flex h-11 w-11 items-center justify-center border border-[#ff0092]/36 bg-[#ff0092]/14 text-[#ffd0ea]">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-4 font-display text-3xl uppercase leading-none tracking-[0.05em] text-white">{service.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{service.description}</p>
                </GlowCard>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="mt-5 grid overflow-hidden border border-[#ff0092]/20 bg-[linear-gradient(90deg,rgba(255,0,146,0.18),rgba(75,214,255,0.08),rgba(142,40,222,0.16))] lg:grid-cols-[0.7fr_1.3fr]"
          >
            <div className="p-5 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#ff9bd5]">Commercial pathway</p>
              <h3 className="mt-2 font-display text-4xl uppercase leading-[0.92] tracking-[0.05em] text-white">
                Zero-upfront-cost options for suitable venues.
              </h3>
            </div>
            <div className="grid gap-3 border-t border-white/10 bg-black/24 p-5 sm:grid-cols-3 lg:border-l lg:border-t-0 lg:p-6">
              {['Assess the room', 'Match the machines', 'Support the install'].map((item, index) => (
                <div key={item} className="border border-white/10 bg-black/24 p-4">
                  <p className="font-display text-3xl text-[#4bd6ff]">0{index + 1}</p>
                  <p className="mt-2 text-sm font-bold uppercase tracking-[0.12em] text-white">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </SectionShell>

        <SectionShell id="range" tone="violet" width="wide">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
            <SectionHeading
              eyebrow="Our range"
              title="The right attraction for the right part of the venue."
              text="Racing games, prize machines, pool tables and quick-play social games each do a different job. The final mix should match the audience, footprint and atmosphere you want to create."
            />
            <div className="grid gap-3 rounded-[24px] border border-[#a05cff]/24 bg-[linear-gradient(180deg,rgba(35,20,58,0.9),rgba(12,10,24,0.96))] p-4 shadow-[0_0_90px_rgba(142,40,222,0.16)] backdrop-blur-xl sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {stats.map((item) => (
                <div key={item.label} className="rounded-[18px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] px-4 py-4 text-center">
                  <p className="font-display text-xl uppercase tracking-[0.12em] text-white">{item.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-400">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {categories.map((category, index) => (
              <GlowCard key={category.title} className="group/range overflow-hidden p-0">
                <div className="relative h-[18rem] overflow-hidden 2xl:h-[20rem]">
                  <img src={category.image} alt={category.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,12,0.02),rgba(8,8,12,0.88))]" />
                  <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center border border-white/16 bg-black/52 font-display text-xl text-white backdrop-blur">
                    {index + 1}
                  </div>
                  <div className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center border border-[#4bd6ff]/24 bg-[#4bd6ff]/12 text-cyan-100 opacity-0 transition duration-300 group-hover/range:opacity-100">
                    <ArrowRight size={17} />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-display text-3xl uppercase leading-none tracking-[0.05em] text-white">{category.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-200/90">{category.description}</p>
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        </SectionShell>

        <SectionShell tone="mixed" width="wide">
          <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
            <GlowCard className="min-h-[22rem] overflow-hidden border-[#ff0092]/18 bg-[linear-gradient(180deg,rgba(18,6,18,0.94),rgba(10,8,16,0.98))] p-0">
              <div className="relative h-full">
                <img src="/assets/hv/motorbike-racers.jpg" alt="Motorbike arcade racing machines" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,16,0.12),rgba(8,10,16,0.84))]" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#ff7dc5]">Why High Voltage</p>
                  <p className="mt-3 max-w-md text-2xl font-semibold leading-tight text-white">
                    Venue-first advice, qualified technical support and machines chosen to earn their floor space.
                  </p>
                </div>
              </div>
            </GlowCard>
            <div className="grid gap-4 sm:grid-cols-2">
              {differentiators.map((item) => {
                const Icon = item.icon;
                return (
                  <GlowCard key={item.title} className="p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#8e28de]/28 bg-[#8e28de]/14 text-[#f1d8ff]">
                      <Icon size={20} />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
                  </GlowCard>
                );
              })}
            </div>
          </div>

          <div className="mt-6 grid gap-6 rounded-[24px] border border-white/8 bg-white/[0.04] p-6 shadow-[0_20px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:p-8">
            <SectionHeading
              eyebrow="Process"
              title="A clear path from first conversation to working machines."
              text="Talk through the room, choose the mix, install cleanly and keep the equipment supported after it goes live."
            />
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {process.map((step, index) => (
                <div key={step.title} className="rounded-[18px] border border-white/8 bg-[#0d111a]/80 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/10 font-display text-base text-cyan-300">
                      0{index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold leading-tight text-white">{step.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionShell>

        <SectionShell id="gallery" tone="cyan" width="wide">
          <SectionHeading
            eyebrow="Showcase"
            title="Real venue spaces with machines doing useful work."
            text="Full games rooms, activated corners, racing banks, prize machines and social games for venues that want more energy on the floor."
          />

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {galleryStories.map((story, index) => {
              const border = story.accent === 'pink'
                ? 'border-[#ff5ab7]/20'
                : story.accent === 'violet'
                  ? 'border-[#a05cff]/20'
                  : 'border-cyan-300/20';
              const chip = story.accent === 'pink'
                ? 'border-[#ff5ab7]/30 bg-[#ff0092]/16 text-[#ffd2ef]'
                : story.accent === 'violet'
                  ? 'border-[#a05cff]/30 bg-[#8e28de]/16 text-[#eadcff]'
                  : 'border-cyan-300/30 bg-cyan-400/14 text-cyan-100';
              return (
                <motion.article
                  key={story.title}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  className={cn(
                    'arcade-panel overflow-hidden bg-[linear-gradient(180deg,rgba(11,16,25,0.94),rgba(5,8,12,0.99))] p-0 shadow-[0_24px_90px_rgba(0,0,0,0.4)]',
                    border,
                  )}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxItem({
                        title: story.title,
                        image: story.image,
                        tag: story.tag,
                        blurb: story.outcome,
                        accent: story.accent,
                      })
                    }
                    className="group relative block h-64 w-full overflow-hidden text-left 2xl:h-72"
                  >
                    <img src={story.image} alt={story.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,6,10,0),rgba(4,6,10,0.18),rgba(4,6,10,0.74))]" />
                    <div className={cn('absolute left-5 top-5 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] backdrop-blur-md', chip)}>
                      {story.tag}
                    </div>
                  </button>

                  <div className="p-5">
                    <h3 className="font-display text-[1.75rem] uppercase leading-none tracking-[0.06em] text-white">{story.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-200">{story.outcome}</p>
                    <details className="group/details mt-4 border-t border-white/8 pt-3">
                      <summary className="cursor-pointer list-none text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200 transition hover:text-white">
                        Venue and machine details
                      </summary>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2">
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">Ideal venues</p>
                          <p className="mt-1 text-sm leading-6 text-slate-300">{story.bestFor}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">Machine mix</p>
                          <p className="mt-1 text-sm leading-6 text-slate-300">{story.mix}</p>
                        </div>
                      </div>
                    </details>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {galleryItems.map((item, index) => {
              const chip = item.accent === 'pink'
                ? 'border-[#ff5ab7]/30 bg-[#ff0092]/14 text-[#ffd1ed]'
                : item.accent === 'violet'
                  ? 'border-[#a05cff]/30 bg-[#8e28de]/14 text-[#ebddff]'
                  : 'border-cyan-300/30 bg-cyan-400/14 text-cyan-100';
              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{ duration: 0.45, delay: index * 0.04 }}
                  onClick={() => setLightboxItem(item)}
                  className="arcade-panel group cursor-zoom-in overflow-hidden bg-[linear-gradient(180deg,rgba(12,13,20,0.9),rgba(6,8,12,0.98))] p-0 shadow-[0_18px_60px_rgba(0,0,0,0.32)]"
                >
                  <div className="relative h-48 overflow-hidden 2xl:h-56">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,14,0.02),rgba(8,10,14,0.74))]" />
                    <div className={cn('absolute left-4 top-4 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] backdrop-blur', chip)}>
                      {item.tag}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold leading-snug text-white">{item.title}</h3>
                    <p className="mt-2 max-h-12 overflow-hidden text-sm leading-6 text-slate-300">{item.blurb}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </SectionShell>

        <SectionShell id="about" tone="pink" width="wide">
          <div className="grid items-start gap-8 lg:grid-cols-[0.62fr_1.38fr]">
            <div className="grid gap-4">
              <div className="overflow-hidden rounded-[24px] border border-white/12 bg-[linear-gradient(180deg,rgba(36,18,42,0.92),rgba(12,10,18,0.98))] p-3 shadow-[0_30px_100px_rgba(0,0,0,0.36)]">
                <img src="/assets/hv/logo-light.png" alt="High Voltage Gaming Systems logo" className="w-full rounded-[18px] border border-white/10 bg-[#10131b] p-6" />
              </div>
              <div className="rounded-[20px] border border-[#ff5ab7]/18 bg-white px-5 py-3 shadow-[0_20px_70px_rgba(0,0,0,0.24)]">
                <img src="/assets/hv/veteran-badge.png" alt="Australian Veteran Owned Business" className="mx-auto h-auto w-full max-w-[28rem]" />
              </div>
            </div>
            <div className="grid gap-7 xl:grid-cols-[0.92fr_1.08fr] xl:items-start">
              <SectionHeading
                eyebrow="About"
                title={site.aboutTitle}
                text={site.aboutText}
                action={<PillButton onClick={() => scrollToId('contact')}>Start the conversation</PillButton>}
              />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-200">Service area</p>
                <h3 className="mt-2 font-display text-3xl uppercase leading-none tracking-[0.05em] text-white">Regional support across the Murray and Riverina.</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">Equipment that looks sharp, backed by regional support close enough to be useful.</p>
                <div className="mt-4 grid gap-3">
                  {serviceAreas.map((area) => (
                    <div key={area.title} className="rounded-[18px] border border-cyan-300/14 bg-[linear-gradient(180deg,rgba(6,18,22,0.94),rgba(6,10,14,0.98))] p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-cyan-300/24 bg-cyan-300/12 text-cyan-100">
                          <MapPin size={17} />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white">{area.title}</h4>
                          <p className="mt-1 text-sm leading-6 text-slate-300">{area.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SectionShell>

        <SectionShell tone="violet" width="wide">
          <div className="grid gap-8 lg:grid-cols-[0.68fr_1.32fr] lg:items-start">
            <SectionHeading
              eyebrow="Venue solutions"
              title="Start with the service that matches your venue."
              text="Browse focused options for arcade machines, pool tables, leasing, prize attractions and maintenance support across Albury-Wodonga, the Murray and the Riverina."
            />
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {seoPages.map((page) => (
                <a
                  key={page.slug}
                  href={`/${page.slug}/`}
                  className="group flex min-h-24 items-center justify-between gap-3 rounded-[18px] border border-white/10 bg-[linear-gradient(180deg,rgba(20,17,34,0.88),rgba(7,9,15,0.98))] p-4 shadow-[0_18px_62px_rgba(0,0,0,0.3)] transition duration-300 hover:-translate-y-1 hover:border-[#a05cff]/34 hover:bg-[linear-gradient(180deg,rgba(38,24,62,0.9),rgba(7,9,15,0.98))]"
                >
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ff8ccf]">{page.eyebrow}</p>
                    <h3 className="mt-2 text-base font-semibold leading-snug text-white transition group-hover:text-cyan-100">{page.shortTitle}</h3>
                  </div>
                  <ArrowRight size={16} className="shrink-0 text-cyan-200/70 transition group-hover:translate-x-1 group-hover:text-cyan-100" />
                </a>
              ))}
            </div>
          </div>
        </SectionShell>

        <SectionShell id="faq" tone="dark" width="narrow">
          <SectionHeading
            eyebrow="FAQ"
            title="Common questions from venue operators."
            text="Answers for pubs, clubs, holiday parks and tourism venues considering arcade machines, pool tables, leasing or a broader games area."
          />

          <div className="mt-8 grid gap-3 lg:grid-cols-2">
            {faqs.map((item) => (
              <details key={item.question} className="group rounded-[18px] border border-white/10 bg-[linear-gradient(180deg,rgba(12,13,20,0.92),rgba(6,8,12,0.98))] p-5 open:border-cyan-300/20">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-lg font-semibold text-white">
                  {item.question}
                  <span className="text-2xl font-light leading-none text-cyan-200 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 border-t border-white/8 pt-3 text-sm leading-6 text-slate-300">{item.answer}</p>
              </details>
            ))}
          </div>
        </SectionShell>

        <SectionShell id="contact" className="pb-20 lg:pb-24" tone="mixed" width="wide">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <GlowCard>
              <p className="text-sm uppercase tracking-[0.3em] text-[#ff7dc5]">Contact</p>
              <h2 className="mt-4 font-display text-4xl font-extrabold uppercase leading-[0.95] text-white">
                Tell us about your venue.
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-300">
                Share the room, the audience and what you want the entertainment area to achieve. We can recommend a machine mix and commercial option that suits the space.
              </p>

              <div className="mt-6 grid gap-3">
                <div className="rounded-[22px] border border-white/8 bg-[#0d111a]/80 p-4">
                  <div className="flex items-center gap-3 text-sm uppercase tracking-[0.24em] text-slate-400">
                    <Mail size={16} /> Enquiries
                  </div>
                  <a href={`mailto:${site.email}`} className="mt-3 block text-lg text-white transition hover:text-[#ff7dc5]">
                    {site.email}
                  </a>
                </div>
                <div className="rounded-[22px] border border-white/8 bg-[#0d111a]/80 p-4">
                  <div className="flex items-center gap-3 text-sm uppercase tracking-[0.24em] text-slate-400">
                    <MapPin size={16} /> Service region
                  </div>
                  <p className="mt-3 text-lg text-white">Supporting Murray / Riverina hospitality, tourism and entertainment venues</p>
                </div>
              </div>
            </GlowCard>

            <GlowCard className="p-0">
              <form onSubmit={handleSubmit} className="grid gap-4 p-6 sm:p-7">
                <label className="hidden" aria-hidden="true">
                  Website
                  <input name="website" tabIndex={-1} autoComplete="off" />
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm text-slate-300">
                    Name
                    <input name="name" required maxLength={100} autoComplete="name" className="rounded-2xl border border-white/10 bg-[#0b0f18] px-4 py-3 text-white outline-none transition focus:border-[#ff0092]/50" />
                  </label>
                  <label className="grid gap-2 text-sm text-slate-300">
                    Email
                    <input name="email" type="email" required maxLength={254} autoComplete="email" className="rounded-2xl border border-white/10 bg-[#0b0f18] px-4 py-3 text-white outline-none transition focus:border-[#ff0092]/50" />
                  </label>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm text-slate-300">
                    Mobile
                    <input name="mobile" type="tel" maxLength={30} autoComplete="tel" className="rounded-2xl border border-white/10 bg-[#0b0f18] px-4 py-3 text-white outline-none transition focus:border-[#ff0092]/50" />
                  </label>
                  <label className="grid gap-2 text-sm text-slate-300">
                    Venue / Business
                    <input name="venue" maxLength={120} autoComplete="organization" className="rounded-2xl border border-white/10 bg-[#0b0f18] px-4 py-3 text-white outline-none transition focus:border-[#ff0092]/50" />
                  </label>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm text-slate-300">
                    Location / postcode
                    <input name="location" maxLength={100} autoComplete="postal-code" className="rounded-2xl border border-white/10 bg-[#0b0f18] px-4 py-3 text-white outline-none transition focus:border-[#ff0092]/50" />
                  </label>
                  <label className="grid gap-2 text-sm text-slate-300">
                    Venue type
                    <select name="venueType" className="rounded-2xl border border-white/10 bg-[#0b0f18] px-4 py-3 text-white outline-none transition focus:border-[#ff0092]/50">
                      <option>Hotel or pub</option>
                      <option>Club or social venue</option>
                      <option>Holiday park or accommodation</option>
                      <option>Tourism or entertainment venue</option>
                      <option>Other business</option>
                    </select>
                  </label>
                </div>
                <label className="grid gap-2 text-sm text-slate-300">
                  Enquiry type
                  <select name="enquiryType" className="rounded-2xl border border-white/10 bg-[#0b0f18] px-4 py-3 text-white outline-none transition focus:border-[#ff0092]/50">
                    {enquiryTypes.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2 text-sm text-slate-300">
                  Message
                  <textarea name="message" required maxLength={3000} rows={5} className="rounded-[20px] border border-white/10 bg-[#0b0f18] px-4 py-3 text-white outline-none transition focus:border-[#ff0092]/50" />
                </label>

                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <PillButton type="submit">
                    {sending ? 'Sending…' : 'Send enquiry'}
                    <ArrowRight size={16} />
                  </PillButton>
                  {message ? <p role="status" aria-live="polite" className="text-sm text-slate-300">{message}</p> : null}
                </div>
              </form>
            </GlowCard>
          </div>
        </SectionShell>
      </main>



      <AnimatePresence>
        {lightboxItem ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/82 p-4 backdrop-blur-md sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label="Gallery image"
            onClick={() => setLightboxItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 14 }}
              transition={{ duration: 0.22 }}
              className="relative w-full max-w-6xl overflow-hidden rounded-[30px] border border-white/12 bg-[linear-gradient(180deg,rgba(12,13,20,0.96),rgba(6,8,12,0.99))] shadow-[0_30px_120px_rgba(0,0,0,0.58)]"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                ref={closeLightboxRef}
                type="button"
                aria-label="Close gallery image"
                onClick={() => setLightboxItem(null)}
                className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-black/50 text-white transition hover:bg-black/70"
              >
                <X size={18} />
              </button>

              <div className="grid max-h-[90vh] lg:grid-cols-[1.2fr_0.8fr]">
                <div className="bg-black">
                  <img
                    src={lightboxItem.image}
                    alt={lightboxItem.title}
                    className="h-full max-h-[70vh] w-full object-contain bg-black lg:max-h-[90vh]"
                  />
                </div>
                <div className="flex flex-col justify-end border-t border-white/8 p-6 sm:p-8 lg:border-l lg:border-t-0">
                  <div className={cn(
                    'inline-flex w-fit rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em]',
                    lightboxItem.accent === 'pink'
                      ? 'border-[#ff5ab7]/30 bg-[#ff0092]/14 text-[#ffd1ed]'
                      : lightboxItem.accent === 'violet'
                        ? 'border-[#a05cff]/30 bg-[#8e28de]/14 text-[#ebddff]'
                        : 'border-cyan-300/30 bg-cyan-400/14 text-cyan-100',
                  )}>
                    {lightboxItem.tag}
                  </div>
                  <h3 className="mt-5 font-display text-3xl uppercase tracking-[0.07em] text-white sm:text-4xl">
                    {lightboxItem.title}
                  </h3>
                  <p className="mt-4 max-w-lg text-sm leading-7 text-slate-300 sm:text-base">
                    {lightboxItem.blurb}
                  </p>
                  <p className="mt-6 text-xs uppercase tracking-[0.24em] text-slate-500">
                    Tap outside or press escape to close
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <footer className="relative z-10 border-t border-white/8 bg-[#06070b]/90">
        <div className="mx-auto grid max-w-[96rem] gap-8 px-6 py-10 lg:grid-cols-[1fr_auto] lg:px-8 2xl:px-10">
          <div>
            <img src="/assets/hv/logo-primary.png" alt="High Voltage Gaming Systems" className="h-12 w-auto" />
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">{site.footerBlurb}</p>
          </div>
          <div className="flex flex-wrap gap-5 text-sm uppercase tracking-[0.12em] text-slate-400 lg:justify-end">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollToId(item.id)} className="transition hover:text-white">
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className="border-t border-white/8 px-6 py-4 text-center text-xs uppercase tracking-[0.28em] text-slate-500 lg:px-8">
          © {year} High Voltage Gaming Systems
        </div>
      </footer>
    </div>
  );
}
