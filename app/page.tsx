import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/sections/hero';
import { RecentListingsSection } from '@/components/sections/recent-listings';
import { PopularCitiesSection } from '@/components/sections/popular-cities';
import { FeaturesSection } from '@/components/sections/features';
import { CtaSection } from '@/components/sections/cta';

export default function Home() {
  return (
    <main className="min-h-screen bg-background dark:bg-slate-950">
      <Navbar />
      <HeroSection />
      <RecentListingsSection />
      <PopularCitiesSection />
      <FeaturesSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
