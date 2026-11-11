import { Users, Trophy, Star, BookOpen } from 'lucide-react';
import ScrollReveal from '@/components/shared/ScrollReveal';

const stats = [
  { icon: Users, value: '500+', label: 'Students Trained', color: '#b8860b', desc: 'Across all levels' },
  { icon: Trophy, value: '120+', label: 'Tournament Wins', color: '#2563eb', desc: 'National & state level' },
  { icon: Star, value: '4.9/5', label: 'Average Rating', color: '#059669', desc: 'By parents & students' },
  { icon: BookOpen, value: '12+', label: 'Course Programs', color: '#d97706', desc: 'Beginner to elite' },
];

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="relative">
        <div className="absolute inset-0 chess-bg opacity-40 pointer-events-none" />
        <div className="container py-14 md:py-20 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map(({ icon: Icon, value, label, color, desc }, index) => (
              <ScrollReveal
                key={label}
                delay={index * 0.1}
                y={28}
                className="w-full"
              >
                <div className="relative group flex flex-col items-center text-center p-6 md:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#b8860b]/40 hover:-translate-y-1 transition-all duration-300 h-full">
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                    style={{ background: `${color}14`, border: `1px solid ${color}30` }}
                  >
                    <Icon size={24} style={{ color }} />
                  </div>

                  {/* Value */}
                  <p className="text-4xl font-black font-['Playfair_Display'] mb-1 tracking-tight" style={{ color }}>
                    {value}
                  </p>
                  <p className="text-sm font-bold text-slate-900 mb-1">{label}</p>
                  <p className="text-xs text-slate-500 font-medium">{desc}</p>

                  {/* Bottom accent */}
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] rounded-full group-hover:w-1/2 transition-all duration-500"
                    style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </section>
  );
}
