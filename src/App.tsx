import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Mail, MapPin, Menu, X } from 'lucide-react';
import { GlowCard } from './components/GlowCard';
import { Loader } from './components/Loader';
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
      ? 'border-[#ff0092] bg-[#ff0092] text-white shadow-[0_0_45px_rgba(255,0,146,0.32)] hover:-translate-y-0.5 hover:bg-[#ff2ea7]'
      : 'border-[#8e28de]/45 bg-[#8e28de]/16 text-white hover:-translate-y-0.5 hover:bg-[#8e28de]/26';

  if (href) {
    return (
      <a
        href={href}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] transition duration-300',
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
        'inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] transition duration-300',
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
  children,
}: {
  id?: string;
  className?: string;
  tone?: 'violet' | 'pink' | 'cyan' | 'mixed' | 'dark';
  children: ReactNode;
}) {
  const tones: Record<string, string> = {
    violet:
      'bg-[linear-gradient(180deg,#20133b_0%,#130d26_52%,#090a12_100%)] before:bg-[linear-gradient(90deg,rgba(176,102,255,0.78),rgba(176,102,255,0.08),transparent)] after:bg-[radial-gradient(ellipse_at_18%_0%,rgba(176,102,255,0.24),transparent_48%)]',
    pink:
      'bg-[linear-gradient(180deg,#2b1026_0%,#170a19_52%,#09090f_100%)] before:bg-[linear-gradient(90deg,rgba(255,64,176,0.78),rgba(255,64,176,0.08),transparent)] after:bg-[radial-gradient(ellipse_at_82%_0%,rgba(255,64,176,0.23),transparent_48%)]',
    cyan:
      'bg-[linear-gradient(180deg,#0d2630_0%,#0a1720_52%,#070a10_100%)] before:bg-[linear-gradient(90deg,rgba(75,214,255,0.78),rgba(75,214,255,0.08),transparent)] after:bg-[radial-gradient(ellipse_at_50%_0%,rgba(75,214,255,0.21),transparent_50%)]',
    mixed:
      'bg-[linear-gradient(180deg,#19142b_0%,#100e1f_48%,#070910_100%)] before:bg-[linear-gradient(90deg,rgba(255,64,176,0.66),rgba(75,214,255,0.46),rgba(176,102,255,0.08),transparent)] after:bg-[radial-gradient(ellipse_at_22%_0%,rgba(176,102,255,0.18),transparent_42%),radial-gradient(ellipse_at_78%_0%,rgba(255,64,176,0.16),transparent_42%)]',
    dark:
      'bg-[linear-gradient(180deg,#121620_0%,#0b0f18_52%,#06080d_100%)] before:bg-[linear-gradient(90deg,rgba(255,255,255,0.26),rgba(255,255,255,0.05),transparent)] after:bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.08),transparent_50%)]',
  };

  return (
    <section
      id={id}
      className={cn(
        'relative isolate overflow-hidden border-t border-white/8 px-6 py-18 before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:z-[1] before:h-[2px] after:pointer-events-none after:absolute after:inset-0 after:z-0 sm:py-22 lg:px-8 lg:py-24',
        tones[tone],
        className,
      )}
    >
      <div className="relative z-10 mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [lightboxItem, setLightboxItem] = useState<(typeof galleryItems)[number] | null>(null);
  const year = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 2600);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!lightboxItem) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxItem(null);
    };
    document.body.style.overflow = 'hidden';
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
      <Loader visible={!loaded} />

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute left-[-14%] top-[-10%] h-[36rem] w-[36rem] rounded-full bg-[#8e28de]/11 blur-[150px]" />
        <div className="absolute bottom-[-14%] right-[-10%] h-[34rem] w-[34rem] rounded-full bg-[#ff0092]/10 blur-[150px]" />
        <div className="absolute left-1/2 top-[18%] h-[22rem] w-[22rem] -translate-x-1/2 rounded-full bg-[#2fd8ff]/6 blur-[130px]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:84px_84px]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/8 bg-[#06070b]/72 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <button onClick={() => scrollToId('home')} className="flex items-center gap-4 text-left">
            <img src="/assets/hv/logo-primary.png" alt="HIGH VOLTAGE GAMING SYSTEMS" className="h-10 w-auto sm:h-11" />
          </button>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToId(item.id)}
                className="text-sm font-medium uppercase tracking-[0.12em] text-slate-300 transition hover:text-white"
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
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen ? (
            <motion.div
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
        <section id="home" className="relative overflow-hidden bg-black">
  <div className="absolute inset-0">
    <img
      src="/assets/hv/hero-pin.jpeg"
      alt="Arcade machine hero"
      className="h-full w-full object-cover object-[center_56%] md:object-[center_54%] lg:object-[center_50%]"
    />
  </div>

  <div className="absolute inset-0 bg-black/28" />
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,146,0.10),transparent_42%)]" />
  <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black via-black/70 to-transparent" />
  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/70 to-transparent" />

  <div className="relative flex min-h-screen items-center justify-center px-5 py-24 sm:py-28 lg:px-8 lg:py-32">
    <div className="w-full max-w-5xl text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mx-auto rounded-[2rem] border border-white/12 bg-black/42 px-6 py-8 shadow-[0_0_60px_rgba(0,0,0,0.45)] sm:px-10 sm:py-10 lg:px-14 lg:py-12"
      >
        <h1 className="font-['Bebas_Neue'] text-5xl uppercase tracking-[0.06em] text-white sm:text-6xl lg:text-6xl">
          High Voltage Gaming Systems
        </h1>

        <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-white/90 sm:text-lg lg:text-xl">
          Arcade machines, pool tables and venue-ready entertainment solutions
          for hospitality, tourism and leisure spaces across the Murray and
          Riverina.
        </p>

        <div className="mt-8 flex items-center justify-center">
          {/* <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-[#ff1493] px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-[0_0_24px_rgba(255,20,147,0.45)] transition duration-300 hover:scale-[1.02] hover:bg-[#ff2ca0]"
          >
            Contact Us
          </a> */}

        </div>
      </motion.div>
    </div>
  </div>

  <section className="relative z-10 border-t border-white/8 bg-[linear-gradient(180deg,rgba(4,5,8,0.18),rgba(4,5,8,0.72))] px-5 py-5 lg:px-8 lg:py-7">
    <motion.p
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 12 }}
      transition={{ duration: 0.65, delay: 0.45 }}
      className="mx-auto max-w-6xl text-center text-xs font-semibold uppercase tracking-[0.14em] text-white/78 sm:text-sm"
    >
      Arcade machines, pool tables and prize attractions selected to suit each
      venue, strengthen the entertainment offer and keep guests engaged.
    </motion.p>
  </section>
</section>



        <SectionShell tone="dark">
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <SectionHeading
              eyebrow="Venue outcomes"
              title="More play, longer stays and better use of the room."
              text="The right mix of arcade machines, pool tables and prize attractions can make a venue feel more active while supporting the way guests already move through the space."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {venueOutcomes.map((item) => (
                <GlowCard key={item.title} className="border-cyan-300/14 bg-[linear-gradient(180deg,rgba(7,18,25,0.9),rgba(5,8,12,0.98))]">
                  <h3 className="font-display text-2xl uppercase tracking-[0.1em] text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
                </GlowCard>
              ))}
            </div>
          </div>
        </SectionShell>

        <SectionShell id="services" tone="pink">
          <SectionHeading
            eyebrow="Services"
            title="Machines, tables and support without the guesswork."
            text="Choose the entertainment mix, commercial arrangement and servicing approach that fits the venue. High Voltage Gaming Systems can help with supply, leasing, profit-share options and ongoing maintenance."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <GlowCard key={service.title}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#ff0092]/28 bg-[#ff0092]/14 text-[#ffd0ea]">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-white">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{service.description}</p>
                </GlowCard>
              );
            })}
          </div>
        </SectionShell>

        <SectionShell id="range" tone="violet">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <SectionHeading
              eyebrow="Our range"
              title="The right attraction for the right part of the venue."
              text="Racing games, prize machines, pool tables and quick-play social games each do a different job. The final mix should match the audience, footprint and atmosphere you want to create."
            />
            <div className="grid gap-4 rounded-[32px] border border-[#a05cff]/24 bg-[linear-gradient(180deg,rgba(35,20,58,0.9),rgba(12,10,24,0.96))] p-6 shadow-[0_0_90px_rgba(142,40,222,0.16)] backdrop-blur-xl sm:grid-cols-2 lg:p-8">
              {stats.map((item) => (
                <div key={item.label} className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] px-5 py-6 text-center">
                  <p className="font-display text-2xl uppercase tracking-[0.14em] text-white">{item.value}</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.16em] text-slate-400">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {categories.map((category) => (
              <GlowCard key={category.title} className="overflow-hidden p-0">
                <div className="relative h-72 overflow-hidden">
                  <img src={category.image} alt={category.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,12,0.02),rgba(8,8,12,0.88))]" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="text-2xl font-semibold text-white">{category.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-200/90">{category.description}</p>
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        </SectionShell>

        <SectionShell tone="mixed">
          <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
            <GlowCard className="min-h-[420px] overflow-hidden border-[#ff0092]/18 bg-[linear-gradient(180deg,rgba(18,6,18,0.94),rgba(10,8,16,0.98))] p-0">
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
            <div className="grid gap-6 sm:grid-cols-2">
              {differentiators.map((item) => {
                const Icon = item.icon;
                return (
                  <GlowCard key={item.title}>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#8e28de]/28 bg-[#8e28de]/14 text-[#f1d8ff]">
                      <Icon size={20} />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
                  </GlowCard>
                );
              })}
            </div>
          </div>
        </SectionShell>

        <SectionShell className="pt-12 lg:pt-14" tone="dark">
          <div className="grid gap-10 rounded-[32px] border border-white/8 bg-white/[0.04] p-8 shadow-[0_20px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl lg:grid-cols-[0.9fr_1.1fr] lg:p-12">
            <SectionHeading
              eyebrow="Process"
              title="A clear path from first conversation to working machines."
              text="Talk through the room, choose the mix, install cleanly and keep the equipment supported after it goes live."
            />
            <div className="grid gap-4">
              {process.map((step, index) => (
                <div key={step.title} className="rounded-[24px] border border-white/8 bg-[#0d111a]/80 p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/10 font-display text-lg text-cyan-300">
                      0{index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-300">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionShell>

        <SectionShell id="gallery" tone="cyan">
          <SectionHeading
            eyebrow="Showcase"
            title="Real venue spaces with machines doing useful work."
            text="Full games rooms, activated corners, racing banks, prize machines and social games for venues that want more energy on the floor."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
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
                  className={cn('overflow-hidden rounded-[30px] border bg-[linear-gradient(180deg,rgba(11,16,25,0.94),rgba(5,8,12,0.99))] shadow-[0_24px_90px_rgba(0,0,0,0.4)]', border)}
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
                    className="group relative block h-72 w-full overflow-hidden text-left"
                  >
                    <img src={story.image} alt={story.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,6,10,0),rgba(4,6,10,0.18),rgba(4,6,10,0.74))]" />
                    <div className={cn('absolute left-5 top-5 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] backdrop-blur-md', chip)}>
                      {story.tag}
                    </div>
                  </button>

                  <div className="p-6">
                    <h3 className="font-display text-[2rem] uppercase leading-none tracking-[0.07em] text-white">{story.title}</h3>
                    <div className="mt-6 grid gap-4">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">Ideal venues</p>
                        <p className="mt-2 text-sm leading-6 text-slate-200">{story.bestFor}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">Machine mix</p>
                        <p className="mt-2 text-sm leading-6 text-slate-200">{story.mix}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">What it adds</p>
                        <p className="mt-2 text-sm leading-6 text-slate-200">{story.outcome}</p>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
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
                  className="group cursor-zoom-in overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(12,13,20,0.9),rgba(6,8,12,0.98))] shadow-[0_18px_60px_rgba(0,0,0,0.32)]"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,14,0.02),rgba(8,10,14,0.74))]" />
                    <div className={cn('absolute left-4 top-4 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] backdrop-blur', chip)}>
                      {item.tag}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{item.blurb}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </SectionShell>

        <SectionShell id="about" tone="pink">
          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="grid gap-4">
              <div className="overflow-hidden rounded-[32px] border border-white/12 bg-[linear-gradient(180deg,rgba(36,18,42,0.92),rgba(12,10,18,0.98))] p-3 shadow-[0_30px_100px_rgba(0,0,0,0.36)]">
                <img src="/assets/hv/logo-light.png" alt="High Voltage Gaming Systems logo" className="w-full rounded-[26px] border border-white/10 bg-[#10131b] p-8" />
              </div>
              <div className="rounded-[28px] border border-[#ff5ab7]/18 bg-white px-5 py-4 shadow-[0_20px_70px_rgba(0,0,0,0.24)]">
                <img src="/assets/hv/veteran-badge.png" alt="Australian Veteran Owned Business" className="mx-auto h-auto w-full max-w-[34rem]" />
              </div>
            </div>
            <SectionHeading
              eyebrow="About"
              title={site.aboutTitle}
              text={site.aboutText}
              action={<PillButton onClick={() => scrollToId('contact')}>Start the conversation</PillButton>}
            />
          </div>
        </SectionShell>

        <SectionShell tone="cyan">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <SectionHeading
              eyebrow="Service area"
              title="Regional support across Albury-Wodonga, the Murray and the Riverina."
              text="Local and regional venues need equipment that looks sharp and support that is close enough to be useful. High Voltage Gaming Systems is focused on the Murray and Riverina market."
            />
            <div className="grid gap-4">
              {serviceAreas.map((area) => (
                <GlowCard key={area.title} className="border-cyan-300/14 bg-[linear-gradient(180deg,rgba(6,18,22,0.94),rgba(6,10,14,0.98))]">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/24 bg-cyan-300/12 text-cyan-100">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{area.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-300">{area.description}</p>
                    </div>
                  </div>
                </GlowCard>
              ))}
            </div>
          </div>
        </SectionShell>

        <SectionShell id="faq" tone="dark">
          <SectionHeading
            eyebrow="FAQ"
            title="Common questions from venue operators."
            text="Answers for pubs, clubs, holiday parks and tourism venues considering arcade machines, pool tables, leasing or a broader games area."
          />

          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            {faqs.map((item) => (
              <GlowCard key={item.question} className="border-white/10 bg-[linear-gradient(180deg,rgba(12,13,20,0.92),rgba(6,8,12,0.98))]">
                <h3 className="text-xl font-semibold text-white">{item.question}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.answer}</p>
              </GlowCard>
            ))}
          </div>
        </SectionShell>

        <SectionShell id="contact" className="pb-24 lg:pb-32" tone="mixed">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <GlowCard>
              <p className="text-sm uppercase tracking-[0.3em] text-[#ff7dc5]">Contact</p>
              <h2 className="mt-4 font-display text-4xl font-extrabold uppercase leading-[0.95] text-white">
                Tell us about your venue.
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-300">
                Share the room, the audience and what you want the entertainment area to achieve. We can recommend a machine mix and commercial option that suits the space.
              </p>

              <div className="mt-8 grid gap-4">
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
              <form onSubmit={handleSubmit} className="grid gap-5 p-6 sm:p-8">
                <label className="hidden" aria-hidden="true">
                  Website
                  <input name="website" tabIndex={-1} autoComplete="off" />
                </label>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm text-slate-300">
                    Name
                    <input name="name" required className="rounded-2xl border border-white/10 bg-[#0b0f18] px-4 py-3 text-white outline-none transition focus:border-[#ff0092]/50" />
                  </label>
                  <label className="grid gap-2 text-sm text-slate-300">
                    Email
                    <input name="email" type="email" required className="rounded-2xl border border-white/10 bg-[#0b0f18] px-4 py-3 text-white outline-none transition focus:border-[#ff0092]/50" />
                  </label>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm text-slate-300">
                    Mobile
                    <input name="mobile" className="rounded-2xl border border-white/10 bg-[#0b0f18] px-4 py-3 text-white outline-none transition focus:border-[#ff0092]/50" />
                  </label>
                  <label className="grid gap-2 text-sm text-slate-300">
                    Venue / Business
                    <input name="venue" className="rounded-2xl border border-white/10 bg-[#0b0f18] px-4 py-3 text-white outline-none transition focus:border-[#ff0092]/50" />
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
                  <textarea name="message" required rows={6} className="rounded-[24px] border border-white/10 bg-[#0b0f18] px-4 py-3 text-white outline-none transition focus:border-[#ff0092]/50" />
                </label>

                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <PillButton type="submit">
                    {sending ? 'Sending…' : 'Send enquiry'}
                    <ArrowRight size={16} />
                  </PillButton>
                  {message ? <p className="text-sm text-slate-300">{message}</p> : null}
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
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[1fr_auto] lg:px-8">
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
