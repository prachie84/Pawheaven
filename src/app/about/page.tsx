'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppImage from '@/components/ui/AppImage';

const teamMembers = [
{
  name: 'Sarah Whitmore',
  role: 'Founder & Director',
  bio: 'Former veterinarian with 12 years of rescue experience. Sarah started Pawheaven after fostering over 80 animals.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_19659d9ad-1772225919377.png",
  alt: 'Sarah Whitmore, founder of Pawheaven, smiling warmly in a bright office setting',
  tag: 'Since 2019'
},
{
  name: 'Marcus Rivera',
  role: 'Head of Adoptions',
  bio: 'Animal behaviorist who matches every pet to the right family. Marcus has facilitated over 1,200 successful adoptions.',
  image: "https://images.unsplash.com/photo-1731960745314-e12045ee74a5",
  alt: 'Marcus Rivera, head of adoptions, outdoors in casual clothing with a warm smile',
  tag: '1,200+ matches'
},
{
  name: 'Priya Nair',
  role: 'Veterinary Liaison',
  bio: 'Coordinates health screenings and ensures every animal is vaccinated, microchipped, and ready for their forever home.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1003c242e-1765325042303.png",
  alt: 'Priya Nair, veterinary liaison, in a professional setting with a caring expression',
  tag: '100% health-checked'
}];


const values = [
{
  icon:
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>,

  title: 'Compassion First',
  description: 'Every decision we make is guided by the wellbeing of the animals in our care and the families we serve.',
  accent: 'bg-rose-50 text-rose-500'
},
{
  icon:
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>,

  title: 'Transparency',
  description: 'We share full medical histories, behavioral assessments, and honest profiles for every animal.',
  accent: 'bg-amber-50 text-amber-500'
},
{
  icon:
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>,

  title: 'Community',
  description: 'We build lasting bonds — between pets and families, and among adopters who share the same love.',
  accent: 'bg-sky-50 text-sky-500'
},
{
  icon:
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>,

  title: 'Lifelong Support',
  description: 'Our relationship with adopters doesn\'t end at signing. We\'re here for every milestone and challenge.',
  accent: 'bg-emerald-50 text-emerald-500'
}];


const stats = [
{ value: '2,400+', label: 'Animals Rehomed' },
{ value: '98%', label: 'Adoption Success Rate' },
{ value: '7', label: 'Years of Service' },
{ value: '340+', label: 'Volunteer Network' }];


export default function AboutPage() {
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('revealed');
        });
      },
      { threshold: 0.1 }
    );
    revealRefs.current.forEach((el) => {if (el) observer.observe(el);});
    return () => observer.disconnect();
  }, []);

  const addRef = (el: HTMLElement | null, i: number) => {
    revealRefs.current[i] = el;
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/8 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <span
              ref={(el) => addRef(el, 0)}
              className="reveal-hidden text-xs font-mono uppercase tracking-widest text-primary mb-4 block">
              
              Our Story
            </span>
            <h1
              ref={(el) => addRef(el, 1)}
              className="reveal-hidden hero-headline font-bold text-foreground mb-6"
              style={{ transitionDelay: '80ms' }}>
              
              Built on love,
              <br />
              <span className="text-primary">driven by purpose</span>
            </h1>
            <p
              ref={(el) => addRef(el, 2)}
              className="reveal-hidden text-lg text-muted-foreground leading-relaxed max-w-xl"
              style={{ transitionDelay: '160ms' }}>
              
              Pawheaven started in a Brooklyn apartment with one rescued dog and a simple belief: every animal deserves a safe, loving home. Seven years later, we&apos;ve helped over 2,400 pets find their families.
            </p>
            <div
              ref={(el) => addRef(el, 3)}
              className="reveal-hidden flex flex-wrap gap-4 mt-10"
              style={{ transitionDelay: '240ms' }}>
              
              <Link
                href="/pets"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-7 py-3.5 rounded-full hover:bg-accent transition-all duration-300 hover:scale-105 hover:shadow-lg">
                
                Browse Pets
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-border text-foreground font-semibold px-7 py-3.5 rounded-full hover:border-primary hover:text-primary transition-all duration-300 hover:scale-105">
                
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-12 bg-secondary border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) =>
            <div
              key={i}
              ref={(el) => addRef(el, 4 + i)}
              className="reveal-hidden text-center"
              style={{ transitionDelay: `${i * 80}ms` }}>
              
                <p className="stat-number font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1 font-medium">{stat.label}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image collage */}
            <div
              ref={(el) => addRef(el, 8)}
              className="reveal-hidden relative h-[480px]">
              
              <div className="absolute top-0 left-0 w-[58%] h-[62%] rounded-2xl overflow-hidden shadow-xl">
                <AppImage
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_199f977cd-1772135487281.png"
                  alt="Golden retriever puppy being held gently by a volunteer at the Pawheaven shelter"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover" />
                
              </div>
              <div className="absolute bottom-0 right-0 w-[55%] h-[58%] rounded-2xl overflow-hidden shadow-xl">
                <AppImage
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_16f0d2fc4-1772099199062.png"
                  alt="Two dogs running happily in a sunny park after being adopted from Pawheaven"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover" />
                
              </div>
              <div className="absolute top-[30%] right-[10%] w-[32%] h-[32%] rounded-2xl overflow-hidden shadow-lg border-4 border-background">
                <AppImage
                  src="https://images.unsplash.com/photo-1601330092566-a25c920d7ce7"
                  alt="Tabby cat resting comfortably in a cozy shelter room at Pawheaven"
                  fill
                  sizes="200px"
                  className="object-cover" />
                
              </div>
              {/* Floating badge */}
              <div className="absolute bottom-8 left-4 bg-card border border-border rounded-xl px-4 py-3 shadow-lg flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--primary)" stroke="none">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">Trusted by families</p>
                  <p className="text-xs text-muted-foreground">across New York</p>
                </div>
              </div>
            </div>

            {/* Text */}
            <div
              ref={(el) => addRef(el, 9)}
              className="reveal-hidden"
              style={{ transitionDelay: '120ms' }}>
              
              <span className="text-xs font-mono uppercase tracking-widest text-primary mb-4 block">Our Mission</span>
              <h2 className="section-headline font-bold text-foreground mb-6">
                A shelter built on
                <br />
                <span className="text-primary">second chances</span>
              </h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  We believe the bond between a person and their pet is one of life&apos;s most profound relationships. Our mission is to make that connection accessible to everyone — regardless of background or circumstance.
                </p>
                <p>
                  Every animal in our care receives a full health assessment, behavioral evaluation, and personalized profile. We don&apos;t just find homes — we find the <em>right</em> homes.
                </p>
                <p>
                  From our first rescue in 2019 to today, we&apos;ve never lost sight of what matters: the animals waiting, and the families ready to love them.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[
                  'https://img.rocket.new/generatedImages/rocket_gen_img_1ff94b671-1772814006308.png',
                  'https://img.rocket.new/generatedImages/rocket_gen_img_1e177cfaa-1763294771386.png',
                  'https://img.rocket.new/generatedImages/rocket_gen_img_14ffb911d-1775835916875.png'].
                  map((src, i) =>
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-background overflow-hidden relative bg-muted">
                      <AppImage src={src} alt="Pawheaven team member" fill sizes="40px" className="object-cover" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Our dedicated team</span> — here for every step
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-secondary/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-primary mb-3 block">What We Stand For</span>
            <h2 className="section-headline font-bold text-foreground">
              Values that guide
              <br />
              <span className="text-primary">everything we do</span>
            </h2>
          </div>

          {/* Bento-style values grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {values.map((val, i) =>
            <div
              key={i}
              ref={(el) => addRef(el, 10 + i)}
              className="reveal-hidden warm-card p-8 flex gap-6 group hover:shadow-xl transition-all duration-400 hover:-translate-y-1"
              style={{ transitionDelay: `${i * 100}ms` }}>
              
                <div className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center ${val.accent} transition-transform duration-300 group-hover:scale-110`}>
                  {val.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{val.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{val.description}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-primary mb-3 block">The People</span>
              <h2 className="section-headline font-bold text-foreground">
                Meet the team
                <br />
                <span className="text-primary">behind the paws</span>
              </h2>
            </div>
            <p className="text-muted-foreground max-w-sm leading-relaxed text-sm">
              A small, passionate group of animal lovers, veterinarians, and community builders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {teamMembers.map((member, i) =>
            <div
              key={i}
              ref={(el) => addRef(el, 14 + i)}
              className="reveal-hidden warm-card overflow-hidden group hover:shadow-xl transition-all duration-400 hover:-translate-y-2"
              style={{ transitionDelay: `${i * 120}ms` }}>
              
                <div className="relative h-64 overflow-hidden bg-muted">
                  <AppImage
                  src={member.image}
                  alt={member.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105" />
                
                  <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm border border-border rounded-full px-3 py-1">
                    <span className="text-xs font-mono text-primary font-semibold">{member.tag}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
                  <p className="text-xs font-mono uppercase tracking-wider text-primary mt-1 mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary/5 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-primary mb-4 block">Ready?</span>
          <h2 className="section-headline font-bold text-foreground mb-5">
            Find your perfect
            <br />
            <span className="text-primary">companion today</span>
          </h2>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            Browse our available pets and start your adoption journey. Every paw deserves a forever home.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/pets"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-4 rounded-full hover:bg-accent transition-all duration-300 hover:scale-105 hover:shadow-lg">
              
              Browse Available Pets
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link
              href="/success-stories"
              className="inline-flex items-center gap-2 border border-border text-foreground font-semibold px-8 py-4 rounded-full hover:border-primary hover:text-primary transition-all duration-300 hover:scale-105">
              
              Read Success Stories
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>);

}