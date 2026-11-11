'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Shield, Users, Trophy, Star } from 'lucide-react';
import ScrollReveal from '@/components/shared/ScrollReveal';

const trustBadges = [
  { icon: Shield, text: 'FIDE Certified Mentors', color: '#10b981' },
  { icon: Trophy, text: 'USCF & Scholastic Prep', color: '#f59e0b' },
  { icon: Users, text: '1:4 Student-Coach Batches', color: '#60a5fa' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-28 pb-20 md:pt-36 md:pb-24">
      {/* Background Hero Image - Custom bright, warm, educational coaching scene */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-coaching.jpg"
          alt="KnightOra Chess Academy student learning chess with an expert coach"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-[1.02]"
        />
        {/* Soft, light cinematic overlay allowing the warm sunlit scene to shine through while keeping all text ultra-clear */}
        <div className="absolute inset-0 bg-[#08111d]/45 backdrop-brightness-[0.95]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/55 via-transparent to-slate-950/65" />
      </div>

      <div className="container relative z-10 text-center max-w-4xl mx-auto px-4">
        <ScrollReveal y={20} duration={0.6}>
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-400/40 text-emerald-300 text-xs sm:text-sm font-bold uppercase tracking-[0.16em] mb-6 backdrop-blur-md shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            WELCOME TO KNIGHTORA CHESS ACADEMY
          </div>

          {/* Headline with 100% visible, high-contrast pure white text & emerald accent */}
          <h1 className="font-['Playfair_Display'] text-3xl sm:text-5xl md:text-6xl font-black leading-[1.15] tracking-tight mb-6 drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] max-w-4xl mx-auto">
            <span className="!text-white">#1 Online Chess </span>
            <span className="text-[#10b981] inline-block drop-shadow-[0_2px_14px_rgba(16,185,129,0.6)]">
              Coaching
            </span>{' '}
            <span className="!text-white block sm:inline">
              for Kids in the USA, UK &amp; Worldwide
            </span>
          </h1>

          {/* Subheading text */}
          <p className="!text-white text-base sm:text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] font-medium">
            Chess is not just a game; it&apos;s a journey of strategic thinking, mental fortitude, and personal growth. Join us on the path to excellence and unlock the secrets of the royal game.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-12">
            <Link
              href="/courses"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#0e5c3e] hover:bg-[#12724e] text-white font-bold text-sm tracking-wider uppercase transition-all shadow-[0_4px_24px_rgba(14,92,62,0.6)] hover:shadow-[0_6px_32px_rgba(14,92,62,0.8)] hover:-translate-y-0.5 border border-emerald-400/30"
            >
              Our Courses <ArrowRight size={16} />
            </Link>

            <a
              href="https://wa.me/918459527115?text=Hi!%20I%27d%20like%20to%20know%20more%20about%20KnightOra%20Chess%20Coaching"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-white/30 text-white font-semibold text-sm backdrop-blur-md transition-all hover:-translate-y-0.5 shadow-xl group"
            >
              <span className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </span>
              <span className="tracking-wide">+91 84595 27115</span>
            </a>
          </div>

          {/* Trust badges row */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-6 border-t border-white/20">
            {trustBadges.map(({ icon: Icon, text, color }) => (
              <div
                key={text}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/70 border border-white/20 text-xs sm:text-sm !text-white font-medium backdrop-blur-md shadow-sm"
              >
                <Icon size={14} style={{ color }} />
                <span>{text}</span>
              </div>
            ))}
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-950/70 border border-white/20 text-xs sm:text-sm !text-white backdrop-blur-md shadow-sm">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} className="fill-current" />
                ))}
              </div>
              <span className="font-bold text-white ml-0.5">4.9/5</span>
              <span className="text-slate-200 font-medium">(500+ Families)</span>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Subtle bottom fade transition into the white content below */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
