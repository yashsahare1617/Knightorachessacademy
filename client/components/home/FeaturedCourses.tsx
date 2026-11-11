'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, User, Users, MessageCircle } from 'lucide-react';
import ScrollReveal from '@/components/shared/ScrollReveal';

interface PricingPlan {
  id: string;
  name: string;
  subTitle: string;
  badge?: string;
  iconType: 'duo' | 'individual' | 'group';
  originalUsd: number;
  originalInr: number;
  discountUsd: number;
  discountInr: number;
  period: string;
  popular?: boolean;
  features: string[];
  waText: string;
}

const plans: PricingPlan[] = [
  {
    id: 'duo',
    name: 'Duo (2 Kids)',
    subTitle: 'Per Class',
    badge: 'Siblings & Friends',
    iconType: 'duo',
    originalUsd: 15,
    originalInr: 1410,
    discountUsd: 5,
    discountInr: 470,
    period: 'per class',
    features: [
      '2 Students per dedicated coach',
      'Interactive drills & practice games',
      'Personalized tactical feedback',
      'Flexible scheduling options',
      '100% Free trial assessment included',
    ],
    waText: 'Hi! I want to enroll for the Duo (2 Kids) plan ($5 / ₹470 per class).',
  },
  {
    id: 'individual',
    name: 'Individual',
    subTitle: 'Per Class',
    badge: 'Most Popular',
    popular: true,
    iconType: 'individual',
    originalUsd: 18,
    originalInr: 1690,
    discountUsd: 8,
    discountInr: 750,
    period: 'per class',
    features: [
      '1-on-1 private coaching with FIDE mentor',
      'Customized opening & endgame curriculum',
      'Deep game analysis & blunder checks',
      'Tournament psychological readiness',
      '100% Free trial assessment included',
    ],
    waText: 'Hi! I want to enroll for the 1-on-1 Individual plan ($8 / ₹750 per class).',
  },
  {
    id: 'group',
    name: 'Group (8 Classes)',
    subTitle: 'Monthly Pack',
    badge: 'Best Value',
    iconType: 'group',
    originalUsd: 50,
    originalInr: 4700,
    discountUsd: 35,
    discountInr: 3290,
    period: 'for 8 classes',
    features: [
      '8 structured live classes per month',
      'Small batch size (max 4-6 students)',
      'Weekly tournament & puzzle leagues',
      'Comprehensive monthly progress report',
      '100% Free trial assessment included',
    ],
    waText: 'Hi! I want to enroll for the Group (8 Classes) pack ($35 / ₹3,290).',
  },
];

function PlanIcon({ type }: { type: 'duo' | 'individual' | 'group' }) {
  if (type === 'individual') {
    return <User className="w-8 h-8 text-[#0f172a]" strokeWidth={2.2} />;
  }
  if (type === 'duo') {
    return (
      <div className="flex items-center -space-x-1">
        <User className="w-7 h-7 text-[#0f172a]" strokeWidth={2.2} />
        <User className="w-7 h-7 text-[#0f172a]" strokeWidth={2.2} />
      </div>
    );
  }
  return <Users className="w-8 h-8 text-[#0f172a]" strokeWidth={2.2} />;
}

export default function FeaturedCourses() {
  return (
    <section className="section bg-[#f8fafc] relative overflow-hidden py-20 sm:py-24">
      <div className="absolute inset-0 chess-bg opacity-30 pointer-events-none" />

      <div className="container relative z-10">
        <ScrollReveal y={24} duration={0.6}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16">
            <div>
              <div className="section-label">
                <span className="w-1.5 h-1.5 rounded-full bg-[#b8860b]" />
                Affordable Coaching Plans
              </div>
              <h2 className="section-title">
                Find Your Perfect{' '}
                <span className="text-gold-gradient">Chess Plan</span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
                World-class FIDE chess coaching at budget-friendly rates. Transparent pricing displayed in both <strong>USD ($)</strong> and <strong>INR (₹)</strong> (1 USD ≈ ₹94 INR).
              </p>
              <div className="divider-gold" />
            </div>
            <Link href="/courses" className="btn-secondary shrink-0">
              Explore Syllabus <ArrowRight size={14} />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-6 pt-4">
          {plans.map((plan, idx) => (
            <ScrollReveal key={plan.id} delay={idx * 0.12} y={30} duration={0.65} className="h-full">
              <div
                className={`relative bg-white rounded-3xl p-7 sm:p-8 flex flex-col justify-between h-full transition-all duration-300 shadow-md hover:shadow-2xl hover:-translate-y-2 border-2 ${
                  plan.popular
                    ? 'border-[#b8860b] shadow-[0_12px_36px_rgba(184,134,11,0.18)]'
                    : 'border-[#e5b839]/60 hover:border-[#b8860b]'
                }`}
              >
                {/* Popular / Badge Tag */}
                {plan.badge && (
                  <div className="absolute -top-3.5 right-6 z-20">
                    <span
                      className={`inline-block px-3.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider shadow-sm ${
                        plan.popular
                          ? 'bg-gradient-to-r from-[#e5b839] via-[#c9a227] to-[#b8860b] text-slate-950 font-black'
                          : 'bg-slate-900 text-white'
                      }`}
                    >
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Circular Gold Icon (matching reference image) */}
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full border-2 border-[#c9a227] bg-white flex items-center justify-center shadow-sm">
                    <PlanIcon type={plan.iconType} />
                  </div>

                  {/* Title & Subtitle */}
                  <div className="text-center mb-6">
                    <h3 className="font-['Playfair_Display'] text-2xl sm:text-[1.65rem] font-black text-slate-900 leading-tight">
                      {plan.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mt-1">
                      {plan.subTitle}
                    </p>
                  </div>

                  {/* Strikethrough Original Price with Red Slash */}
                  <div className="text-center mb-1">
                    <div className="inline-block relative">
                      <span className="text-slate-400 font-bold text-lg sm:text-xl tracking-tight">
                        ${plan.originalUsd} / ₹{plan.originalInr.toLocaleString('en-IN')}
                      </span>
                      {/* Red strike through line */}
                      <span className="absolute top-1/2 left-0 right-0 h-[2.5px] bg-red-500 -rotate-12 -translate-y-1/2 rounded-full pointer-events-none" />
                    </div>
                  </div>

                  {/* Main Large Discounted Price (Both USD and INR) */}
                  <div className="text-center mb-6 pt-1">
                    <div className="flex items-center justify-center gap-1.5 flex-wrap">
                      <span className="font-['Playfair_Display'] text-5xl sm:text-6xl font-black text-slate-950 tracking-tight">
                        ${plan.discountUsd}
                      </span>
                      <span className="text-2xl sm:text-3xl font-black text-[#b8860b] font-['Playfair_Display']">
                        / ₹{plan.discountInr.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <span className="inline-block mt-1 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      {plan.period}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px bg-slate-100 my-5" />

                  {/* Features List */}
                  <ul className="space-y-3 mb-8 text-xs sm:text-sm text-slate-600">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5">
                        <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span className="font-medium text-slate-700">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2.5 pt-2">
                  <Link
                    href="/trial"
                    className="w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 bg-gradient-to-r from-[#e5b839] via-[#c9a227] to-[#b8860b] text-slate-950 hover:brightness-105 shadow-md hover:shadow-lg transition-all"
                  >
                    Book Free Trial Class <ArrowRight size={15} />
                  </Link>

                  <a
                    href={`https://wa.me/918459527115?text=${encodeURIComponent(plan.waText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100 transition-colors"
                  >
                    <MessageCircle size={14} className="text-emerald-600" />
                    Enroll via WhatsApp
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom trust note */}
        <div className="mt-12 text-center text-xs sm:text-sm text-slate-500 flex flex-wrap items-center justify-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            No hidden charges or contracts
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            Accepted globally via Card / UPI / PayPal / Stripe
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            100% Free First Assessment Session
          </span>
        </div>
      </div>
    </section>
  );
}
