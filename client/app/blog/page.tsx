import Link from 'next/link';
import { Calendar, ArrowRight, Sparkles } from 'lucide-react';
import ScrollReveal from '@/components/shared/ScrollReveal';

const articles = [
  {
    slug: '5-openings-every-beginner-must-know',
    title: '5 Fundamental Chess Openings Every Beginner Must Master',
    excerpt: 'The Italian Game, Queen\'s Gambit, and London System: Learn the core philosophies behind the most reliable setups.',
    date: 'Oct 20, 2026',
    author: 'Grandmaster Trainer',
    readTime: '6 min read',
    tag: 'Openings',
  },
  {
    slug: 'how-chess-improves-academic-performance',
    title: 'How 30 Minutes of Chess Daily Transforms Math & Logic Scores',
    excerpt: 'Scientific research into neuroplasticity shows structured chess training boosts cognitive agility, spatial memory, and test scores in school.',
    date: 'Oct 14, 2026',
    author: 'Academy Director',
    readTime: '4 min read',
    tag: 'Education',
  },
  {
    slug: 'mastering-endgame-principles',
    title: 'The Art of the Rook Endgame: Lucena & Philidor Positions',
    excerpt: 'Why grandmasters spend 60% of their study time on king activity and opposition in pawn and rook endings.',
    date: 'Oct 08, 2026',
    author: 'FIDE Master Coach',
    readTime: '8 min read',
    tag: 'Strategy',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#f8fafc] relative overflow-hidden">
      {/* Decorative ambient elements */}
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-[#c9a227]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -left-48 w-96 h-96 bg-blue-400/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 chess-bg opacity-30 pointer-events-none" />

      <div className="container relative z-10">
        <ScrollReveal y={24} duration={0.65}>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 text-[#b8860b] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
              <Sparkles size={14} /> Knowledge & Insights
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-['Playfair_Display'] tracking-tight mb-4">
              The Chess <span className="text-gold-gradient">Mastery Blog</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Tips, grandmaster game analyses, tournament guides, and pedagogical advice for students and chess parents.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art, idx) => (
            <ScrollReveal key={art.slug} delay={idx * 0.12} y={30} duration={0.65}>
              <div
                className="bg-white p-7 border border-slate-200/90 rounded-2xl flex flex-col justify-between group hover:border-[#b8860b]/40 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="badge badge-gold font-bold">{art.tag}</span>
                    <span className="text-slate-400 font-medium">{art.readTime}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 font-['Playfair_Display'] mb-3 group-hover:text-[#b8860b] transition-colors leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} className="text-[#b8860b]" /> {art.date}
                  </span>
                  <Link href="/trial" className="text-[#b8860b] font-bold flex items-center gap-1 hover:underline">
                    Book Trial <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
