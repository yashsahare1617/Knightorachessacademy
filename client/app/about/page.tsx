import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#f8fafc] relative overflow-hidden">
      {/* Decorative ambient elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#c9a227]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-400/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 chess-bg opacity-30 pointer-events-none" />

      <div className="container relative z-10">
        <ScrollReveal y={24} duration={0.65}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 text-[#b8860b] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
              Our Mission & Legacy
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-['Playfair_Display'] tracking-tight mb-6">
              Shaping the Next Generation of <span className="text-gold-gradient">Chess Grandmasters</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              KnightOra was founded with a singular conviction: chess is not just a game, it is the greatest cognitive gym for young minds. We blend rigorous Soviet-school chess discipline with modern digital analysis tools.
            </p>
          </div>
        </ScrollReveal>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: '♛',
              title: 'FIDE Certified Mentors',
              desc: 'Every trainer undergoes rigorous pedagogy tests. Our coaches are active tournament players and titleholders.',
            },
            {
              icon: '♞',
              title: 'Small Micro-Batches',
              desc: 'Strict 1:4 student-coach ratio guarantees every move is evaluated and personalized feedback is given every single class.',
            },
            {
              icon: '♚',
              title: 'Holistic Growth',
              desc: 'Beyond openings and endgames, we cultivate patience, resilience, calculation speed, and emotional poise under pressure.',
            },
          ].map((pillar, idx) => (
            <ScrollReveal key={pillar.title} delay={idx * 0.12} y={30} duration={0.65}>
              <div className="card p-8 text-center bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#b8860b]/40 hover:-translate-y-1 transition-all duration-300 h-full">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-[#b8860b] flex items-center justify-center mx-auto mb-5 text-2xl font-bold shadow-sm">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-['Playfair_Display'] mb-3">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Call to Action */}
        <ScrollReveal y={24} delay={0.2} duration={0.65}>
          <div className="bg-white p-8 sm:p-12 text-center border border-slate-200/90 rounded-3xl shadow-lg max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Playfair_Display'] mb-3">
              Ready to experience the KnightOra difference?
            </h2>
            <p className="text-sm text-slate-600 mb-8 max-w-lg mx-auto">
              Book a 1-on-1 trial session today. Our coach will evaluate your child&apos;s level and design their personal pathway.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/trial" className="btn-primary text-sm shadow-md">
                Book Free Trial Session <ArrowRight size={15} />
              </Link>
              <Link href="/courses" className="btn-secondary text-sm">
                Browse All Courses
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
