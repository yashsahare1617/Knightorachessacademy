import Image from 'next/image';
import { Brain, Target, Users, Zap, Shield, Award } from 'lucide-react';
import ScrollReveal from '@/components/shared/ScrollReveal';

const benefits = [
  {
    icon: Brain,
    title: 'Cognitive Development',
    desc: 'Chess sharpens memory, concentration, and critical thinking skills that benefit every aspect of life and academics.',
    color: '#b8860b',
    stat: '85%',
    statLabel: 'students improved grades',
  },
  {
    icon: Target,
    title: 'Strategic Thinking',
    desc: 'Learn to plan several moves ahead, analyze positions deeply, and make confident decisions under pressure.',
    color: '#2563eb',
    stat: '10x',
    statLabel: 'better problem solving',
  },
  {
    icon: Users,
    title: 'Expert FIDE Coaches',
    desc: 'Learn from FIDE-rated coaches and national-level players who are passionate about helping you improve.',
    color: '#059669',
    stat: '10+',
    statLabel: 'certified coaches',
  },
  {
    icon: Zap,
    title: 'Personalised Curriculum',
    desc: 'Every student follows a customised learning path based on their current level, goals, and learning pace.',
    color: '#d97706',
    stat: '1-on-1',
    statLabel: 'attention guaranteed',
  },
  {
    icon: Shield,
    title: 'Structured Programs',
    desc: 'Our methodically designed curriculum takes you from absolute beginner to competitive player step by step.',
    color: '#7c3aed',
    stat: '6',
    statLabel: 'skill levels covered',
  },
  {
    icon: Award,
    title: 'Tournament Preparation',
    desc: 'We prepare students for FIDE-rated tournaments, national championships, and inter-school competitions.',
    color: '#ea580c',
    stat: '120+',
    statLabel: 'tournament victories',
  },
];

export default function BenefitsSection() {
  return (
    <section className="section bg-[#f8fafc] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#b8860b]/[0.03] to-transparent pointer-events-none" />
      <div className="absolute bottom-10 left-0 text-[18rem] leading-none text-slate-400 opacity-[0.03] select-none pointer-events-none font-serif -translate-x-16">
        ♝
      </div>

      <div className="container relative z-10">
        {/* Header with image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <ScrollReveal x={-30} y={0} duration={0.7}>
            <div>
              <div className="section-label">
                <span className="w-1.5 h-1.5 rounded-full bg-[#b8860b]" />
                Why Choose KnightOra
              </div>
              <h2 className="section-title">
                More Than Just{' '}
                <span className="text-gold-gradient">Chess Lessons</span>
              </h2>
              <p className="section-desc">
                We build champions — on the board and in life. Our holistic approach develops the whole student, 
                not just their chess rating.
              </p>
              <div className="divider-gold" />

              {/* Key highlights */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { label: 'Same coach every session', icon: '✓' },
                  { label: 'Weekly progress reports', icon: '✓' },
                  { label: 'Small batch sizes (≤6)', icon: '✓' },
                  { label: 'Flexible scheduling', icon: '✓' },
                ].map(({ label, icon }) => (
                  <div key={label} className="flex items-center gap-2 text-sm">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xs font-bold shrink-0">
                      {icon}
                    </span>
                    <span className="text-slate-700 font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Real KnightOra Coaching Photos */}
          <ScrollReveal x={30} y={0} duration={0.7} className="relative block">
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#c9a227]/15 to-emerald-400/10 blur-2xl scale-105 pointer-events-none" />

              <div className="relative grid grid-cols-12 gap-3 sm:gap-4 items-end">
                {/* Photo 1: Coach demonstrating on the board (portrait) */}
                <div className="col-span-5 relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xl bg-white aspect-[3/4] sm:aspect-[4/5] group">
                  <Image
                    src="/images/coaching-demonstration.jpg"
                    alt="KnightOra coach demonstrating tactics on demonstration board"
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 40vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-bold uppercase tracking-wider mb-1 shadow-sm">
                      Live Analysis
                    </span>
                    <p className="text-white text-xs font-bold leading-tight drop-shadow">
                      Demonstration Board Training
                    </p>
                  </div>
                </div>

                {/* Photo 2: Full classroom celebration with kids (landscape) */}
                <div className="col-span-7 relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xl bg-white aspect-[4/3] group">
                  <Image
                    src="/images/classroom-celebration.jpg"
                    alt="KnightOra Chess Academy students celebrating in class with their coach"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 60vw, 30vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider mb-1 shadow-sm">
                      Academy Culture
                    </span>
                    <p className="text-white text-xs font-bold leading-tight drop-shadow">
                      Learning With Passion &amp; Fun
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating session highlight badge */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 rounded-xl bg-white/95 border border-slate-200/90 shadow-sm text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-semibold text-slate-900">Real KnightOra Classroom Sessions</span>
                </div>
                <span className="text-slate-500 font-medium">In-Person &amp; Online Batches</span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map(({ icon: Icon, title, desc, color, stat, statLabel }, idx) => (
            <ScrollReveal key={title} delay={idx * 0.08} y={30} className="h-full">
              <div className="card group cursor-default h-full flex flex-col justify-between bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#b8860b]/40 hover:-translate-y-1 transition-all duration-300">
                <div>
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300"
                      style={{ background: `${color}14`, border: `1px solid ${color}25` }}
                    >
                      <Icon size={22} style={{ color }} />
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black font-['Playfair_Display']" style={{ color }}>{stat}</p>
                      <p className="text-[10px] text-slate-500 font-medium leading-tight">{statLabel}</p>
                    </div>
                  </div>
                  <h3 className="font-['Playfair_Display'] text-lg font-bold text-slate-900 mb-2.5">{title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
                </div>

                {/* Bottom accent line */}
                <div
                  className="h-0.5 w-0 group-hover:w-full mt-5 rounded-full transition-all duration-500"
                  style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
