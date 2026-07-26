'use client';

import React, { useEffect, useRef, useState } from 'react';

interface CounterItem {
  target: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
}

const counters: CounterItem[] = [
  {
    target: 2400,
    suffix: '+',
    label: 'Successful Adoptions',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
  {
    target: 1800,
    suffix: '+',
    label: 'Happy Families',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    target: 340,
    suffix: '+',
    label: 'Available Pets',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="4" r="2"/>
        <circle cx="18" cy="8" r="2"/>
        <circle cx="20" cy="16" r="2"/>
        <path d="M9 10a5 5 0 0 0 5 5v3.5a3.5 3.5 0 0 1-7 0V14a5 5 0 0 0-5-5"/>
      </svg>
    ),
  },
  {
    target: 85,
    suffix: '+',
    label: 'Rescue Partners',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
];

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);

  return count;
}

function CounterCard({ item, active }: { item: CounterItem; active: boolean }) {
  const count = useCountUp(item.target, 2000, active);

  return (
    <div className="warm-card p-8 flex flex-col items-center text-center gap-4 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1">
      <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
        {item.icon}
      </div>
      <div>
        <div className="stat-number font-bold text-foreground">
          {count.toLocaleString()}{item.suffix}
        </div>
        <p className="text-sm font-mono uppercase tracking-widest text-muted-foreground mt-2">
          {item.label}
        </p>
      </div>
    </div>
  );
}

export default function CountersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-secondary paw-bg-pattern"
      aria-label="Impact statistics"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 reveal-hidden" data-reveal>
          <span className="text-xs font-mono uppercase tracking-widest text-primary mb-3 block">Our Impact</span>
          <h2 className="section-headline font-bold text-foreground">
            Numbers that speak
            <br />
            <span className="text-primary">from the heart</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {counters.map((item, i) => (
            <CounterCard key={i} item={item} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}