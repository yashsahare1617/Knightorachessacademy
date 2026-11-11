'use client';

import Image from 'next/image';
import { Trophy, Award, Sparkles } from 'lucide-react';
import ScrollReveal from '@/components/shared/ScrollReveal';

const champions = [
  {
    image: '/images/winner-supernationals.jpg',
    title: 'US Chess Supernationals VII Medalist',
    event: 'Supernationals VII — Orlando, FL',
    category: 'National Championship',
    caption: 'Medal finish at the largest scholastic chess tournament in the United States.',
  },
  {
    image: '/images/winner-scholastic-cup.jpg',
    title: 'CCL Scholastic 1st Place K-12 U900',
    event: 'CCL Scholastic Chess 2025',
    category: 'Scholastic 1st Place',
    caption: 'First place podium and gold medal after an undefeated 5-round performance.',
  },
  {
    image: '/images/winner-trio-trophies.jpg',
    title: 'Buffalo Grove Swiss Champions',
    event: 'Buffalo Grove Swiss Open',
    category: 'Triple Podium',
    caption: 'KnightOra students swept top positions and brought home three championship trophies.',
  },
  {
    image: '/images/winner-canada-champion.jpg',
    title: 'Canadian Chess Challenge Champion',
    event: 'Chess\'n Math Association',
    category: 'Grade 2 Champion',
    caption: 'Gold trophy victory at the prestigious provincial scholastic championship.',
  },
  {
    image: '/images/winner-elite-champion.jpg',
    title: 'Elite Chess Challenge 1st Place',
    event: 'Elite Chess Championship',
    category: 'Tournament Winner',
    caption: 'Secured 1st place overall in the unrated championship section.',
  },
];

export default function WinnersSection() {
  return (
    <section className="section bg-white relative overflow-hidden">
      <div className="absolute inset-0 chess-bg opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="container relative z-10">
        <ScrollReveal y={24} duration={0.6}>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="section-label justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b8860b]" />
              <Sparkles size={13} className="text-[#b8860b]" />
              Our Student Champions
            </div>
            <h2 className="section-title text-center">
              Training Winners Since{' '}
              <span className="text-gold-gradient">Day One</span>
            </h2>
            <p className="section-desc mx-auto text-center">
              Real victories, real ratings, real trophies. KnightOra students consistently earn podium finishes across USCF, state, and scholastic tournaments.
            </p>
          </div>
        </ScrollReveal>

        {/* Gallery grid of all real student winners */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {champions.map((champ, i) => (
            <ScrollReveal key={champ.title} delay={i * 0.1} y={30} duration={0.65}>
              <div className="group relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-2xl hover:border-[#b8860b]/50 transition-all duration-300 hover:-translate-y-1 bg-white flex flex-col h-full">
                {/* Image Container with high quality framing */}
                <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                  <Image
                    src={champ.image}
                    alt={champ.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle gradient vignette at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  
                  {/* Event badge */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-slate-900 shadow-md backdrop-blur-sm">
                      <Award size={13} className="text-[#b8860b]" />
                      {champ.category}
                    </span>
                  </div>

                  {/* Overlay title text on the photo */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Trophy size={16} className="text-[#e5b839] shrink-0 drop-shadow-sm" />
                      <p className="text-base font-bold text-white drop-shadow-md leading-tight">
                        {champ.title}
                      </p>
                    </div>
                    <p className="text-xs text-amber-200/90 font-medium">
                      {champ.event}
                    </p>
                  </div>
                </div>

                {/* Card footer description */}
                <div className="p-4 bg-white flex-1 flex items-center border-t border-slate-100">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {champ.caption}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Stats row */}
        <ScrollReveal y={20} delay={0.3} duration={0.6}>
          <div className="mt-14 grid grid-cols-3 gap-6 max-w-2xl mx-auto bg-[#f8fafc] border border-slate-200/90 rounded-2xl p-6 shadow-sm">
            {[
              { value: '120+', label: 'Tournament Victories' },
              { value: '50+', label: 'Scholastic Champions' },
              { value: '15+', label: 'State & National Titles' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-2xl md:text-3xl font-black font-['Playfair_Display'] text-[#b8860b]">{value}</p>
                <p className="text-xs text-slate-600 font-semibold mt-1">{label}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
