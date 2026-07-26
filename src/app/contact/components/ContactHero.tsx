import React from 'react';

export default function ContactHero() {
  return (
    <section className="pt-28 pb-12 md:pt-36 md:pb-14 bg-secondary paw-bg-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <span className="text-xs font-mono uppercase tracking-widest text-primary mb-3 block">Get In Touch</span>
        <h1 className="section-headline font-bold text-foreground max-w-xl">
          We&apos;d love to
          <br />
          <span className="text-primary">hear from you</span>
        </h1>
        <p className="text-muted-foreground mt-4 max-w-md text-sm leading-relaxed">
          Whether you have adoption questions, want to volunteer, or are interested in partnering with us — our team is ready to help.
        </p>
      </div>
    </section>
  );
}