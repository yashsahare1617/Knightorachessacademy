'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Clock, Sparkles, CheckCircle2, BookOpen, MessageCircle, ArrowRight, Target } from 'lucide-react';
import ScrollReveal from '@/components/shared/ScrollReveal';

interface CourseProgram {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  color: string;
  ageGroup: string;
  duration: string;
  desc: string;
  goal: string;
  topics: { title: string; detail: string }[];
  waText: string;
}

const mockCourses: CourseProgram[] = [
  {
    id: 'beginner-foundations',
    title: 'Beginner Foundations: From Zero to 1000 ELO',
    level: 'Beginner',
    color: '#059669',
    ageGroup: 'Kids & Beginners (Ages 5+)',
    duration: '12 Weeks (24 Sessions)',
    desc: 'Master rules, piece power, opening safety, checkmate patterns, and basic endgame techniques with personalized mentor guidance.',
    goal: 'Confidently play full rated games, execute fundamental tactics, and achieve 1000 ELO.',
    topics: [
      {
        title: 'Rules & Board Geometry',
        detail: 'Ranks, files, diagonals, castling, en passant & pawn promotion rules',
      },
      {
        title: 'Core Tactical Motifs',
        detail: 'Forks, pins, skewers, discovered attacks & double checks',
      },
      {
        title: 'Checkmating Patterns',
        detail: 'Scholar’s mate defense, back-rank mate, Queen & Rook mating nets',
      },
      {
        title: 'Opening Fundamentals',
        detail: 'Controlling center squares, fast piece development & King safety',
      },
      {
        title: 'Essential Endgames',
        detail: 'King & Queen vs King, King & Rook vs King, pawn promotion races',
      },
      {
        title: 'Game Etiquette & Notation',
        detail: 'Algebraic notation, clock handling & official tournament rules',
      },
    ],
    waText: 'Hi! I want to know more about the Beginner Foundations (Zero to 1000 ELO) syllabus and batch timings.',
  },
  {
    id: 'intermediate-tactics-strategy',
    title: 'Intermediate Tactics & Strategy (1000–1400 ELO)',
    level: 'Intermediate',
    color: '#2563eb',
    ageGroup: 'Teens & Intermediate Players',
    duration: '16 Weeks (32 Sessions)',
    desc: 'Deepen positional understanding, calculation depth, candidate moves, pawn structures, and active middlegame attacking strategies.',
    goal: 'Calculate 3–4 moves deep, formulate middlegame plans, and achieve 1400 ELO.',
    topics: [
      {
        title: 'Advanced Combinations',
        detail: 'Deflection, decoying, overloading, clearance & removing the defender',
      },
      {
        title: 'Positional Strategy & Outposts',
        detail: 'Open files, outposts, weak squares, good vs. bad bishop dynamics',
      },
      {
        title: 'Pawn Structures & Breaks',
        detail: 'Isolated pawns, doubled pawns, pawn chains & creating passed pawns',
      },
      {
        title: 'Opening Repertoires',
        detail: 'Italian Game, Sicilian Defense concepts, Queen’s Gambit fundamentals',
      },
      {
        title: 'Middlegame Planning',
        detail: 'Finding candidate moves, targeting king weaknesses & piece coordination',
      },
      {
        title: 'Practical Rook Endgames',
        detail: 'Lucena & Philidor theoretical positions, opposition & active King technique',
      },
    ],
    waText: 'Hi! I want to know more about the Intermediate Tactics & Strategy (1000-1400 ELO) syllabus and schedule.',
  },
  {
    id: 'advanced-tournament-prep',
    title: 'Advanced & Tournament Prep (1400–1800+ ELO)',
    level: 'Advanced',
    color: '#b8860b',
    ageGroup: 'Competitive & FIDE Rated Players',
    duration: 'Ongoing Training',
    desc: 'Intensive coaching for state, national, and FIDE rated tournaments. Opening repertoires, psychological readiness, and master endgames.',
    goal: 'Compete on podiums in FIDE & national tournaments and advance towards 1800+ ELO.',
    topics: [
      {
        title: 'Calculation & Visualization',
        detail: 'Candidate move trees, deep visualization drills & prophylactic thinking',
      },
      {
        title: 'Master Opening Repertoire',
        detail: 'Engine-prepared novelties, pawn sacrifice gambits & counter-systems',
      },
      {
        title: 'Complex Endgame Technique',
        detail: 'Opposite-colored bishops, knight vs. bishop imbalances, triangulation & zugzwang',
      },
      {
        title: 'Dynamic Sacrifices & Defense',
        detail: 'Exchange sacrifices, counterplay dynamics & defending difficult positions',
      },
      {
        title: 'Tournament Game Analysis',
        detail: 'Move-by-move game reviews with FIDE trainers to eliminate repetitive blunders',
      },
      {
        title: 'Competitive Psychology',
        detail: 'Time-trouble management, tournament stamina & opponent prep routines',
      },
    ],
    waText: 'Hi! I want to know more about the Advanced & Tournament Prep (1400-1800+ ELO) coaching program.',
  },
];

export default function CoursesPage() {
  const [filter, setFilter] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');

  const filteredCourses =
    filter === 'All'
      ? mockCourses
      : mockCourses.filter((c) => c.level === filter);

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#f8fafc] relative overflow-hidden">
      {/* Decorative ambient elements */}
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-[#c9a227]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -left-48 w-96 h-96 bg-blue-400/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 chess-bg opacity-30 pointer-events-none" />

      <div className="container relative z-10">
        {/* Header */}
        <ScrollReveal y={24} duration={0.65}>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 text-[#b8860b] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
              <Sparkles size={14} /> Comprehensive Syllabus
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-['Playfair_Display'] tracking-tight mb-4">
              Our Training <span className="text-gold-gradient">Programs</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              From absolute beginner to tournament podiums — structured curriculum curated by International Masters &amp; FIDE trainers.
            </p>
          </div>
        </ScrollReveal>

        {/* Filter Pills */}
        <ScrollReveal y={16} delay={0.1} duration={0.6}>
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-12 flex-wrap">
            {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setFilter(lvl)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  filter === lvl
                    ? 'bg-[#b8860b] text-white shadow-md'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-[#b8860b]/50 shadow-sm'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {filteredCourses.map((c, idx) => (
            <ScrollReveal key={c.id} delay={idx * 0.12} y={30} duration={0.65} className="h-full">
              <div className="bg-white p-7 sm:p-8 border border-slate-200/90 rounded-3xl flex flex-col justify-between group hover:border-[#b8860b]/50 transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-xl h-full">
                <div>
                  {/* Badge & Target Audience */}
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <span
                      className="badge text-xs font-bold px-3 py-1 rounded-full"
                      style={{ background: `${c.color}14`, color: c.color, border: `1px solid ${c.color}35` }}
                    >
                      {c.level}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">{c.ageGroup}</span>
                  </div>

                  {/* Title & Short description */}
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Playfair_Display'] mb-3 group-hover:text-[#b8860b] transition-colors leading-snug">
                    {c.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {c.desc}
                  </p>

                  {/* Meta tag: Duration only */}
                  <div className="flex items-center gap-2 py-2.5 px-3.5 rounded-xl bg-slate-50 border border-slate-100 mb-6 text-xs text-slate-700 font-semibold">
                    <Clock size={15} className="text-[#b8860b] shrink-0" />
                    <span>Duration: <strong className="text-slate-900">{c.duration}</strong></span>
                  </div>

                  {/* Detailed Topics Covered Section */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
                      <BookOpen size={16} className="text-[#b8860b]" />
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                        Topics Covered in this Level
                      </span>
                    </div>

                    <ul className="space-y-3 text-xs text-slate-700">
                      {c.topics.map((t, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-slate-900 block">{t.title}</span>
                            <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">
                              {t.detail}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Milestone Goal Box */}
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-6">
                    <div className="flex items-start gap-2 text-xs text-slate-800">
                      <Target size={15} className="text-[#b8860b] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900 font-bold block mb-0.5">Target Level Outcome:</strong>
                        <span className="text-slate-600 text-[11px] leading-relaxed">
                          {c.goal}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Area (No Pricing) */}
                <div className="pt-4 border-t border-slate-100 space-y-2.5">
                  <Link
                    href="/trial"
                    className="btn-primary text-xs !py-3 w-full text-center justify-center font-bold shadow-md flex items-center gap-2"
                  >
                    <span>Book Free Trial Class</span>
                    <ArrowRight size={14} />
                  </Link>

                  <a
                    href={`https://wa.me/918459527115?text=${encodeURIComponent(c.waText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 border border-slate-200 transition-colors"
                  >
                    <MessageCircle size={14} className="text-emerald-600" />
                    <span>Inquire Syllabus on WhatsApp</span>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
