import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PetsHero from '@/app/pets/components/PetsHero';
import PetsGrid from '@/app/pets/components/PetsGrid';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Browse Pets — Pawheaven',
  description: 'Find your perfect pet companion. Browse dogs, cats, and more available for adoption near you. Filter by species, age, size, and location.',
};

export default function PetsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <PetsHero />
      <PetsGrid />
      <Footer />
    </main>
  );
}