'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

const heroSlides = [
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_1d9297cee-1766241423653.png",
  alt: 'Golden retriever dog sitting in sunlit park, warm afternoon light, lush green grass background'
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_1ffd272c6-1766771129850.png",
  alt: 'Orange tabby cat looking at camera with bright green eyes, soft natural lighting, cozy indoor setting'
},
{
  src: "https://images.unsplash.com/photo-1709424719811-db78154be0ae",
  alt: 'Two dogs running together in open field, playful energy, golden hour warm light, joyful movement'
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_1957f2aa2-1772787804366.png",
  alt: 'Happy family sitting on grass with their adopted dog, warm sunny day, smiling faces, suburban garden'
}];


export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(2);
  const [titleRevealed, setTitleRevealed] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setTitleRevealed(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section
      className="relative min-h-screen grid grid-cols-1 md:grid-cols-12 overflow-hidden"
      id="home"
      aria-label="Hero section">
      
      {/* Carousel Area — 9 cols */}
      <div className="col-span-1 md:col-span-9 relative min-h-[60vh] md:min-h-screen bg-muted overflow-hidden">
        {heroSlides.map((slide, i) =>
        <div
          key={i}
          className={`carousel-slide ${i === currentSlide ? 'active' : ''}`}>
          
            <AppImage
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 2}
            sizes="(max-width: 768px) 100vw, 75vw"
            className="object-cover" />
          
          </div>
        )}

        {/* Gradient scrim — dark at bottom for white text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent z-10 pointer-events-none" />

        {/* Hero Text */}
        <div className="absolute bottom-10 left-6 md:bottom-16 md:left-12 z-20 text-primary-foreground">
          <div className="mb-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 border border-white/40 rounded-full text-xs font-mono uppercase tracking-widest backdrop-blur-sm bg-white/10 text-primary-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Open for Adoptions
            </span>
          </div>

          <h1
            className={`hero-headline font-bold text-primary-foreground mb-4 ${
            titleRevealed ? 'reveal-active' : ''}`
            }>
            
            <span className="text-reveal-wrapper block">
              <span className="text-reveal-content delay-200">Every Paw</span>
            </span>
            <span className="text-reveal-wrapper block">
              <span className="text-reveal-content delay-300">Deserves</span>
            </span>
            <span className="text-reveal-wrapper block">
              <span className="text-reveal-content delay-400" style={{ color: 'var(--accent)' }}>
                a Home.
              </span>
            </span>
          </h1>

          <p
            className={`text-base md:text-lg text-white/80 max-w-md mb-8 leading-relaxed reveal-hidden ${
            titleRevealed ? 'revealed delay-500' : ''}`
            }>
            
            Thousands of loving pets are waiting for their forever family.
            Start your adoption journey today.
          </p>

          <div
            className={`flex flex-wrap gap-3 reveal-hidden ${
            titleRevealed ? 'revealed delay-700' : ''}`
            }>
            
            <Link
              href="/pets"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-accent transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm">
              
              Browse Pets
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/15 backdrop-blur-sm text-primary-foreground font-semibold rounded-full border border-white/30 hover:bg-white/25 transition-all duration-300 text-sm">
              
              Adopt Today
            </Link>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-6 right-6 z-20 flex gap-2">
          {heroSlides.map((_, i) =>
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`transition-all duration-300 rounded-full ${
            i === currentSlide ?
            'w-6 h-2 bg-primary' : 'w-2 h-2 bg-white/40 hover:bg-white/70'}`
            }
            aria-label={`Go to slide ${i + 1}`} />

          )}
        </div>
      </div>

      {/* Stats Sidebar — 3 cols */}
      <div className="col-span-1 md:col-span-3 grid grid-rows-3 min-h-[240px] md:min-h-screen border-l border-border bg-background">
        {/* Stat 1 */}
        <div className="row-span-1 border-b border-border p-6 md:p-8 flex flex-col justify-between group hover:bg-secondary transition-colors duration-300">
          <div className="text-primary">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <div>
            <div className="stat-number font-bold text-foreground">2,400+</div>
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground mt-1 block">Successful Adoptions</span>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="row-span-1 border-b border-border p-6 md:p-8 flex flex-col justify-between group hover:bg-secondary transition-colors duration-300">
          <div className="text-primary">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div>
            <div className="stat-number font-bold text-foreground">1,800+</div>
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground mt-1 block">Happy Families</span>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="row-span-1 p-6 md:p-8 flex flex-col justify-between group hover:bg-secondary transition-colors duration-300 relative overflow-hidden">
          <div className="text-primary">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="4" r="2" />
              <circle cx="18" cy="8" r="2" />
              <circle cx="20" cy="16" r="2" />
              <path d="M9 10a5 5 0 0 0 5 5v3.5a3.5 3.5 0 0 1-7 0V14a5 5 0 0 0-5-5" />
            </svg>
          </div>
          <div>
            <div className="stat-number font-bold text-foreground">340+</div>
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground mt-1 block">Pets Available</span>
          </div>
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="text-4xl animate-paw-float inline-block">🐾</span>
          </div>
        </div>
      </div>
    </section>);

}