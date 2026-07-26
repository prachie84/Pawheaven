'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

const featuredPets = [
{
  id: 1,
  name: 'Biscuit',
  breed: 'Golden Retriever',
  age: '2 years',
  type: 'Dog',
  location: 'Brooklyn, NY',
  image: "https://images.unsplash.com/photo-1496578895980-a6cd23995e66",
  alt: 'Fluffy golden retriever puppy with bright eyes sitting on green grass, warm sunlight',
  tag: 'Friendly',
  tagColor: 'bg-amber-100 text-amber-700'
},
{
  id: 2,
  name: 'Luna',
  breed: 'Domestic Shorthair',
  age: '1 year',
  type: 'Cat',
  location: 'Manhattan, NY',
  image: "https://images.unsplash.com/photo-1700031153788-1e15695cb520",
  alt: 'Orange tabby cat with vivid green eyes looking directly at camera, clean white background',
  tag: 'Playful',
  tagColor: 'bg-rose-100 text-rose-700'
},
{
  id: 3,
  name: 'Max',
  breed: 'Labrador Mix',
  age: '3 years',
  type: 'Dog',
  location: 'Queens, NY',
  image: "https://images.unsplash.com/photo-1733516192092-f43bd95de621",
  alt: 'Two friendly brown dogs running in park, happy expressions, motion blur background',
  tag: 'Active',
  tagColor: 'bg-sky-100 text-sky-700'
},
{
  id: 4,
  name: 'Daisy',
  breed: 'Beagle',
  age: '4 years',
  type: 'Dog',
  location: 'Bronx, NY',
  image: "https://images.unsplash.com/photo-1710756072197-93902e332d94",
  alt: 'Beagle dog with brown and white coat sitting calmly, soft studio lighting, calm expression',
  tag: 'Gentle',
  tagColor: 'bg-emerald-100 text-emerald-700'
},
{
  id: 5,
  name: 'Oliver',
  breed: 'Persian Mix',
  age: '5 years',
  type: 'Cat',
  location: 'Staten Island, NY',
  image: "https://images.unsplash.com/photo-1686259799275-c10b883d4f2e",
  alt: 'White fluffy cat with blue eyes resting on soft cushion, serene indoor setting, warm light',
  tag: 'Calm',
  tagColor: 'bg-purple-100 text-purple-700'
},
{
  id: 6,
  name: 'Coco',
  breed: 'Chihuahua',
  age: '6 months',
  type: 'Dog',
  location: 'Jersey City, NJ',
  image: "https://images.unsplash.com/photo-1606994160120-f10354d893b4",
  alt: 'Tiny chihuahua puppy with big ears and bright eyes, held gently in human hands, warm background',
  tag: 'Tiny & Sweet',
  tagColor: 'bg-pink-100 text-pink-700'
}];


export default function FeaturedPetsSection() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );
    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-secondary paw-bg-pattern" aria-label="Featured pets available for adoption">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-primary mb-3 block">Meet Your Match</span>
            <h2 className="section-headline font-bold text-foreground">
              Pets waiting for
              <br />
              <span className="text-primary">their forever home</span>
            </h2>
          </div>
          <Link
            href="/pets"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground border-b-2 border-primary pb-0.5 hover:text-primary transition-colors self-start md:self-end">
            
            View all pets
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredPets.map((pet, i) =>
          <div
            key={pet.id}
            ref={(el) => {cardsRef.current[i] = el;}}
            className="reveal-hidden pet-card warm-card overflow-hidden cursor-pointer group"
            style={{ transitionDelay: `${i * 80}ms` }}>
            
              <div className="relative h-56 overflow-hidden bg-muted">
                <AppImage
                src={pet.image}
                alt={pet.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover" />
              
                <div className="absolute top-3 left-3 z-10">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${pet.tagColor}`}>
                    {pet.tag}
                  </span>
                </div>
                <div className="absolute top-3 right-3 z-10">
                  <span className="text-xs font-mono bg-white/90 text-foreground px-2 py-1 rounded-full">
                    {pet.type}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{pet.name}</h3>
                    <p className="text-sm text-muted-foreground">{pet.breed}</p>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                    {pet.age}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {pet.location}
                </div>

                <Link
                href="/pets"
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-full hover:bg-accent transition-colors duration-200">
                
                  Meet {pet.name}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}