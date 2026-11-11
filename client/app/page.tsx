import { Suspense } from 'react';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import BenefitsSection from '@/components/home/BenefitsSection';
import WinnersSection from '@/components/home/WinnersSection';
import FeaturedCourses from '@/components/home/FeaturedCourses';
import CTASection from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <BenefitsSection />
      <WinnersSection />
      <FeaturedCourses />
      <CTASection />
    </>
  );
}
