'use client';

import React, { useEffect, useRef } from 'react';

const reasons = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: 'Giving Love',
    description: 'Open your heart and home to a pet who will love you unconditionally every single day.',
    color: 'bg-rose-50 text-rose-500',
    stat: '100% love',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Saving Lives',
    description: 'Every adoption saves a life and opens space for another animal in need of rescue.',
    color: 'bg-amber-50 text-amber-500',
    stat: '2,400+ saved',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    title: 'Affordable',
    description: 'Adoption fees are far lower than breeders. Most pets come vaccinated and neutered.',
    color: 'bg-emerald-50 text-emerald-500',
    stat: 'From $50',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4l3 3"/>
      </svg>
    ),
    title: 'Lifetime Support',
    description: 'Our team stays with you long after adoption — vet guidance, training tips, and community.',
    color: 'bg-sky-50 text-sky-500',
    stat: 'Always there',
  },
];

export default function WhyAdoptSection() {
  const sectionRef = useRef<HTMLElement>(null);
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
      { threshold: 0.15 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-background"
      id="about"
      aria-label="Why adopt a pet"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-primary mb-3 block">Why Adopt</span>
            <h2 className="section-headline font-bold text-foreground">
              Four reasons to choose
              <br />
              <span className="text-primary">adoption over shopping</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm leading-relaxed text-sm md:text-base">
            Adopting a pet is one of the most rewarding decisions you&apos;ll ever make — for you, your family, and your new companion.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((reason, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="reveal-hidden warm-card p-7 flex flex-col gap-5 group hover:shadow-xl transition-all duration-400 hover:-translate-y-1.5 cursor-default"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${reason.color} transition-transform duration-300 group-hover:scale-110`}>
                {reason.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground mb-2">{reason.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
              </div>
              <div className="pt-4 border-t border-border">
                <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold">
                  {reason.stat}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}