import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import CountersSection from '@/app/components/CountersSection';
import WhyAdoptSection from '@/app/components/WhyAdoptSection';
import FeaturedPetsSection from '@/app/components/FeaturedPetsSection';
import SuccessStoriesSection from '@/app/components/SuccessStoriesSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pawheaven — Find Your Perfect Pet Companion',
  description: 'Pawheaven connects pets waiting for adoption with loving families. Browse available pets, read success stories, and give a paw a forever home today.',
  openGraph: {
    title: 'Pawheaven — Every Paw Deserves a Home',
    description: 'Browse hundreds of pets waiting for adoption. Find your perfect companion today.',
    images: [{ url: '/assets/images/app_logo.png', width: 1200, height: 630 }],
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <CountersSection />
      <WhyAdoptSection />
      <FeaturedPetsSection />
      <SuccessStoriesSection />
      <Footer />
    </main>
  );
}