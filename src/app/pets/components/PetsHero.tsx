import React from 'react';
import Link from 'next/link';

export default function PetsHero() {
  return (
    <section className="pt-28 pb-14 md:pt-36 md:pb-16 bg-secondary paw-bg-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-primary mb-3 block">Browse Pets</span>
            <h1 className="section-headline font-bold text-foreground">
              Find your perfect
              <br />
              <span className="text-primary">companion</span>
            </h1>
            <p className="text-muted-foreground mt-4 max-w-md text-sm leading-relaxed">
              Over 340 loving pets are waiting for their forever home. Use the filters below to find your match.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="warm-card px-5 py-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm font-semibold text-foreground">340+ Available</span>
            </div>
            <Link
              href="/contact"
              className="px-5 py-3 bg-primary text-primary-foreground text-sm font-semibold rounded-full hover:bg-accent transition-colors"
            >
              Get Help
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}