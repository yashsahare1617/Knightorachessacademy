import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowRight, Award } from 'lucide-react';
import ScrollReveal from '@/components/shared/ScrollReveal';

const galleryItems = [
  {
    title: 'US Chess Supernationals VII Medalist',
    category: 'National Championship',
    image: '/images/winner-supernationals.jpg',
    caption: 'Medal finish at the largest scholastic chess championship in the USA (Orlando, FL)',
  },
  {
    title: 'CCL Scholastic 1st Place K-12 U900',
    category: '1st Place Trophy',
    image: '/images/winner-scholastic-cup.jpg',
    caption: 'First place champion with undefeated streak in the scholastic division',
  },
  {
    title: 'Buffalo Grove Swiss Open Champions',
    category: 'Podium Sweep',
    image: '/images/winner-trio-trophies.jpg',
    caption: 'KnightOra students swept top positions and brought home three championship trophies',
  },
  {
    title: 'Canadian Chess Challenge Grade 2 Champion',
    category: 'Provincial Championship',
    image: '/images/winner-canada-champion.jpg',
    caption: 'First place champion in Grade 2 division at the Chess\'n Math Challenge',
  },
  {
    title: 'Elite Chess Challenge 1st Place Winner',
    category: 'Scholastic Open',
    image: '/images/winner-elite-champion.jpg',
    caption: 'Secured 1st place overall in the unrated championship section',
  },
  {
    title: 'Interactive Classroom Strategy & Board Analysis',
    category: 'Coaching',
    image: '/images/coaching-demonstration.jpg',
    caption: 'FIDE-certified coach demonstrating opening theory and tactics on the demonstration board',
  },
  {
    title: 'KnightOra Academy Junior Batch Celebration',
    category: 'Academy Life',
    image: '/images/classroom-celebration.jpg',
    caption: 'Energetic learners celebrating their tournament milestones and tactical breakthroughs',
  },
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#f8fafc] relative overflow-hidden">
      {/* Decorative ambient elements */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#c9a227]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-48 w-96 h-96 bg-blue-400/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 chess-bg opacity-30 pointer-events-none" />

      <div className="container relative z-10">
        <ScrollReveal y={24} duration={0.65}>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 text-[#b8860b] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
              <Sparkles size={14} /> Academy Moments
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-['Playfair_Display'] tracking-tight mb-4">
              Champions <span className="text-gold-gradient">Gallery</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Celebrating our students&apos; victories, tournament moments, and academy celebrations across USA & worldwide.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, idx) => (
            <ScrollReveal key={item.title} delay={idx * 0.1} y={30} duration={0.65}>
              <div
                className="bg-white p-5 border border-slate-200/90 rounded-2xl overflow-hidden group hover:border-[#b8860b]/45 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl h-full flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-4 bg-slate-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="badge badge-gold text-xs shadow-sm bg-white/95 font-bold flex items-center gap-1">
                        <Award size={12} className="text-[#b8860b]" /> {item.category}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 font-['Playfair_Display'] mb-1.5 group-hover:text-[#b8860b] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal y={20} delay={0.3} duration={0.6}>
          <div className="mt-14 text-center">
            <Link href="/trial" className="btn-primary text-sm inline-flex items-center gap-2 shadow-md">
              Start Your Journey — Book Free Trial <ArrowRight size={16} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
