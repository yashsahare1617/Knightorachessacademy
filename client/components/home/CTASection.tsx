import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MessageCircle, CheckCircle2 } from 'lucide-react';
import ScrollReveal from '@/components/shared/ScrollReveal';

const guarantees = [
  'No credit card required',
  'Free first trial class',
  'Cancel anytime',
  'Same coach every session',
];

export default function CTASection() {
  return (
    <section className="section bg-white relative overflow-hidden">
      {/* Decorative chess piece */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[28rem] leading-none opacity-[0.025] select-none pointer-events-none font-serif text-slate-700 translate-x-24">
        ♚
      </div>
      <div className="absolute inset-0 chess-bg opacity-30 pointer-events-none" />

      <div className="container relative z-10">
        <div className="border-animated rounded-3xl overflow-hidden relative shadow-lg">
          <div className="bg-gradient-to-br from-[#ffffff] via-[#fcfaf5] to-[#f7f2e7] p-8 sm:p-12 md:p-16 relative z-10 border border-slate-200/60">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Text */}
              <ScrollReveal x={-24} y={0} duration={0.65}>
                <div>
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#e5b839] to-[#b8860b] flex items-center justify-center mb-6 shadow-[0_8px_30px_rgba(184,134,11,0.25)]">
                    <span className="text-slate-950 text-3xl select-none">♞</span>
                  </div>

                  <div className="section-label">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#b8860b] animate-pulse" />
                    Start Today — Free Trial
                  </div>

                  <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl xl:text-5xl font-black text-slate-900 mb-4 mt-2 leading-tight">
                    Begin Your Child&apos;s{' '}
                    <br className="hidden sm:block" />
                    <span className="text-gold-gradient">Chess Journey</span>
                  </h2>

                  <p className="text-slate-600 text-base md:text-lg max-w-md mb-8 leading-relaxed">
                    Book a free trial class and experience KnightOra&apos;s coaching firsthand.
                    No commitment — just chess!
                  </p>

                  {/* Guarantees */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {guarantees.map(g => (
                      <div key={g} className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                        <span className="text-sm font-medium text-slate-700">{g}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <Link href="/trial" className="btn-primary text-base !px-8 !py-4 w-full sm:w-auto justify-center shadow-md">
                      Book Free Trial Class <ArrowRight size={16} />
                    </Link>
                    <a
                      href="https://wa.me/918459527115?text=Hi!%20I%27d%20like%20to%20know%20more%20about%20KnightOra%20Chess%20Academy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-base !px-8 !py-4 w-full sm:w-auto justify-center shadow-sm"
                    >
                      <MessageCircle size={16} /> Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </ScrollReveal>

              {/* Right: Image showcasing a real KnightOra student champion */}
              <ScrollReveal x={24} y={0} duration={0.65} className="hidden lg:block relative">
                <div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#c9a227]/20 to-transparent blur-3xl scale-110 pointer-events-none" />
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xl bg-white aspect-[3/4]">
                    <Image
                      src="/images/cta-winner.jpg"
                      alt="KnightOra Chess Academy student celebrating at US Chess Supernationals"
                      fill
                      className="object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-center">
                      <span className="inline-block px-3 py-1 rounded-full bg-amber-500/90 text-slate-950 text-xs font-bold uppercase tracking-wide mb-1.5 shadow-md">
                        National Medalist
                      </span>
                      <p className="text-white text-sm font-bold drop-shadow-md">
                        🏆 From First Move to National Podiums
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
