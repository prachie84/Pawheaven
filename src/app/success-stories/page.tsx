'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppImage from '@/components/ui/AppImage';

interface Story {
  id: number;
  familyName: string;
  location: string;
  petName: string;
  petType: string;
  petCategory: 'Dog' | 'Cat' | 'Other';
  quote: string;
  fullStory: string;
  familyImage: string;
  familyAlt: string;
  petImage: string;
  petAlt: string;
  date: string;
  stars: number;
  featured?: boolean;
}

const stories: Story[] = [
{
  id: 1,
  familyName: 'The Harrington Family',
  location: 'Brooklyn, NY',
  petName: 'Biscuit',
  petType: 'Golden Retriever',
  petCategory: 'Dog',
  quote: 'Adopting Biscuit was the best decision we ever made. He brought so much joy and energy into our home.',
  fullStory: 'We had been thinking about adopting for two years before we finally visited Pawheaven. The moment we met Biscuit, we knew. He was calm, gentle with our kids, and had this way of looking at you like you were his whole world. The adoption process was smooth and the team was incredibly supportive. Six months later, Biscuit is fully settled in — he sleeps at the foot of our youngest\'s bed every night.',
  familyImage: "https://img.rocket.new/generatedImages/rocket_gen_img_17bd9148e-1765771979332.png",
  familyAlt: 'Happy Harrington family outdoors with their golden retriever dog, smiling, sunny day, backyard setting',
  petImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_12e64b1ea-1772136582737.png',
  petAlt: 'Biscuit the golden retriever looking happy and healthy in a sunny backyard',
  date: 'March 2026',
  stars: 5,
  featured: true
},
{
  id: 2,
  familyName: 'Maya Chen',
  location: 'Manhattan, NY',
  petName: 'Luna',
  petType: 'Domestic Shorthair Cat',
  petCategory: 'Cat',
  quote: "Luna found me at exactly the right time. She's incredibly affectionate and has made my apartment feel like a real home.",
  fullStory: 'I was going through a difficult period when a friend suggested I visit Pawheaven. I wasn\'t sure I was ready for a pet, but Luna changed everything. She curled up on my lap within minutes of meeting me. The team helped me understand her needs and gave me a full care guide. She\'s been my constant companion for four months now — I genuinely can\'t imagine life without her.',
  familyImage: "https://img.rocket.new/generatedImages/rocket_gen_img_11a7607dc-1772093362349.png",
  familyAlt: 'Young Asian woman smiling warmly, holding her orange cat, bright apartment interior',
  petImage: "https://images.unsplash.com/photo-1616044525753-41f10ed847d4",
  petAlt: 'Luna the tabby cat with green eyes looking content and relaxed on a couch',
  date: 'January 2026',
  stars: 5
},
{
  id: 3,
  familyName: 'The Rivera Household',
  location: 'Queens, NY',
  petName: 'Max',
  petType: 'Labrador Mix',
  petCategory: 'Dog',
  quote: 'We were nervous about adopting a rescue, but Pawheaven guided us every step of the way. Max has settled in perfectly.',
  fullStory: 'Max had a rough start — he was found as a stray and was understandably anxious around new people. Pawheaven\'s team was upfront about his history and gave us detailed behavioral guidance. Within three weeks, he was sleeping through the night and joining us on morning runs. The post-adoption check-ins from the team made all the difference. Max is now the most loyal dog I\'ve ever known.',
  familyImage: "https://images.unsplash.com/photo-1724828236694-67f52d25968f",
  familyAlt: 'Hispanic man in his 30s smiling outdoors, casual clothing, park background, warm afternoon light',
  petImage: 'https://images.unsplash.com/photo-1703984210780-5d300858c838',
  petAlt: 'Max the labrador mix running energetically in the park on a sunny day',
  date: 'May 2026',
  stars: 5
},
{
  id: 4,
  familyName: 'The Okafor Family',
  location: 'Bronx, NY',
  petName: 'Cleo',
  petType: 'Siamese Mix',
  petCategory: 'Cat',
  quote: 'Cleo is the most elegant, opinionated cat we\'ve ever met. She runs the household and we wouldn\'t have it any other way.',
  fullStory: 'We adopted Cleo for our daughter\'s 10th birthday. She was a little shy at first but within a week she had claimed every soft surface in the house. The Pawheaven team matched us perfectly — they knew Cleo needed a quieter home and we were exactly that. Our daughter has learned so much about responsibility and empathy through caring for her.',
  familyImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_14ffb911d-1775835916875.png',
  familyAlt: 'Nigerian-American family of four smiling together in their living room, warm home setting',
  petImage: "https://images.unsplash.com/photo-1601483512386-8a3b4612a6cb",
  petAlt: 'Cleo the Siamese mix cat with blue eyes sitting regally on a windowsill',
  date: 'February 2026',
  stars: 5
},
{
  id: 5,
  familyName: 'James & Priya Patel',
  location: 'Staten Island, NY',
  petName: 'Archie',
  petType: 'Beagle',
  petCategory: 'Dog',
  quote: 'Archie is pure chaos and pure joy. He sniffs everything, barks at nothing, and we love every second of it.',
  fullStory: 'We had always wanted a dog but kept putting it off. After our kids started asking every single day, we finally visited Pawheaven. Archie was the first dog we met and that was that. He\'s a classic beagle — curious, vocal, and endlessly energetic. The team warned us about his nose and they weren\'t wrong. But they also gave us training resources that made the first few months manageable. He\'s our little adventure buddy now.',
  familyImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_1e177cfaa-1763294771386.png',
  familyAlt: 'South Asian couple smiling together outdoors with their beagle dog on a leash',
  petImage: "https://images.unsplash.com/photo-1703721946066-d40ef6e1660b",
  petAlt: 'Archie the beagle with floppy ears looking curious and alert in a park',
  date: 'April 2026',
  stars: 5
},
{
  id: 6,
  familyName: 'Diane Moreau',
  location: 'Jersey City, NJ',
  petName: 'Pepper',
  petType: 'Rabbit',
  petCategory: 'Other',
  quote: 'I never thought a rabbit could be so personable. Pepper hops over to greet me every morning without fail.',
  fullStory: 'I live in a small apartment and wasn\'t sure a dog or cat was realistic. A friend mentioned Pawheaven had small animals too. I met Pepper and was immediately charmed — she was curious, gentle, and completely unfazed by my busy apartment life. The team gave me a comprehensive guide on rabbit care. Six months in, Pepper has her own corner of the living room and a very strong personality.',
  familyImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_1ff94b671-1772814006308.png',
  familyAlt: 'French woman in her 40s smiling warmly, holding a small grey rabbit in her apartment',
  petImage: "https://images.unsplash.com/photo-1723729883110-18935746f19e",
  petAlt: 'Pepper the grey rabbit sitting in a cozy corner of a bright apartment',
  date: 'June 2026',
  stars: 5
}];


const filters = ['All', 'Dog', 'Cat', 'Other'] as const;
type Filter = typeof filters[number];

export default function SuccessStoriesPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  const filteredStories = stories.filter(
    (s) => activeFilter === 'All' || s.petCategory === activeFilter
  );

  const featuredStory = stories.find((s) => s.featured);
  const regularStories = filteredStories.filter((s) => !s.featured || activeFilter !== 'All');

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
  }, [filteredStories]);

  const addRef = (el: HTMLElement | null, i: number) => {
    revealRefs.current[i] = el;
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/8 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <span
            ref={(el) => addRef(el, 0)}
            className="reveal-hidden text-xs font-mono uppercase tracking-widest text-primary mb-4 block">
            
            Happy Endings
          </span>
          <h1
            ref={(el) => addRef(el, 1)}
            className="reveal-hidden hero-headline font-bold text-foreground mb-5"
            style={{ transitionDelay: '80ms' }}>
            
            Real families,
            <br />
            <span className="text-primary">real love</span>
          </h1>
          <p
            ref={(el) => addRef(el, 2)}
            className="reveal-hidden text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto"
            style={{ transitionDelay: '160ms' }}>
            
            Every adoption is a story of hope. Here are the families who opened their hearts — and the pets who changed their lives.
          </p>

          {/* Stats row */}
          <div
            ref={(el) => addRef(el, 3)}
            className="reveal-hidden flex flex-wrap justify-center gap-8 mt-12"
            style={{ transitionDelay: '240ms' }}>
            
            {[
            { value: '2,400+', label: 'Happy Adoptions' },
            { value: '98%', label: 'Success Rate' },
            { value: '5★', label: 'Average Rating' }].
            map((s, i) =>
            <div key={i} className="text-center">
                <p className="text-3xl font-bold text-primary">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1 font-medium uppercase tracking-wider">{s.label}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Story */}
      {activeFilter === 'All' && featuredStory &&
      <section className="py-12 bg-secondary/40 border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <span className="text-xs font-mono uppercase tracking-widest text-primary mb-6 block">Featured Story</span>
            <div
            ref={(el) => addRef(el, 4)}
            className="reveal-hidden grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
              <div className="relative h-80 lg:h-[420px] rounded-2xl overflow-hidden shadow-xl">
                <AppImage
                src={featuredStory.familyImage}
                alt={featuredStory.familyAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover" />
              
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
                <div className="absolute bottom-5 left-5 flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-background bg-muted">
                    <AppImage src={featuredStory.petImage} alt={featuredStory.petAlt} fill sizes="48px" className="object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{featuredStory.petName}</p>
                    <p className="text-xs text-white/80">{featuredStory.petType}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <div className="flex gap-1">
                  {Array.from({ length: featuredStory.stars }).map((_, i) =>
                <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="var(--primary)" stroke="none">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                )}
                </div>
                <blockquote className="text-2xl font-semibold text-foreground leading-snug">
                  &ldquo;{featuredStory.quote}&rdquo;
                </blockquote>
                <p className="text-muted-foreground leading-relaxed">{featuredStory.fullStory}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted">
                    <AppImage src={featuredStory.familyImage} alt={featuredStory.familyAlt} fill sizes="40px" className="object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{featuredStory.familyName}</p>
                    <p className="text-xs text-muted-foreground">{featuredStory.location} · {featuredStory.date}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      }

      {/* Filter + Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Filter chips */}
          <div className="flex flex-wrap gap-3 mb-12">
            {filters.map((f) =>
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`filter-chip px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
              activeFilter === f ?
              'bg-primary text-primary-foreground border-primary' :
              'bg-card text-muted-foreground border-border hover:border-primary hover:text-primary'}`
              }>
              
                {f === 'All' ? `All Stories (${stories.length})` : `${f}s`}
              </button>
            )}
          </div>

          {/* Stories grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activeFilter === 'All' ? regularStories : filteredStories).map((story, i) =>
            <div
              key={story.id}
              ref={(el) => addRef(el, 5 + i)}
              className="reveal-hidden story-card flex flex-col group hover:shadow-xl transition-all duration-400 hover:-translate-y-1.5 overflow-hidden"
              style={{ transitionDelay: `${i * 100}ms` }}>
              
                {/* Pet image */}
                <div className="relative h-48 overflow-hidden bg-muted">
                  <AppImage
                  src={story.petImage}
                  alt={story.petAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105" />
                
                  <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm border border-border rounded-full px-3 py-1">
                    <span className="text-xs font-mono text-primary font-semibold">{story.petCategory}</span>
                  </div>
                </div>

                <div className="p-6 flex flex-col gap-4 flex-1">
                  {/* Stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: story.stars }).map((_, si) =>
                  <svg key={si} width="14" height="14" viewBox="0 0 24 24" fill="var(--primary)" stroke="none">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                  )}
                  </div>

                  {/* Quote */}
                  <p className="text-sm leading-relaxed text-foreground italic flex-1">
                    &ldquo;{story.quote}&rdquo;
                  </p>

                  {/* Expanded story */}
                  {expandedId === story.id &&
                <p className="text-sm leading-relaxed text-muted-foreground border-t border-border pt-4">
                      {story.fullStory}
                    </p>
                }

                  <button
                  onClick={() => setExpandedId(expandedId === story.id ? null : story.id)}
                  className="text-xs font-semibold text-primary hover:text-accent transition-colors self-start">
                  
                    {expandedId === story.id ? '↑ Show less' : '↓ Read full story'}
                  </button>

                  {/* Footer */}
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-muted">
                      <AppImage src={story.familyImage} alt={story.familyAlt} fill sizes="40px" className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-foreground truncate">{story.familyName}</p>
                      <p className="text-xs text-muted-foreground">{story.location} · {story.date}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs font-semibold text-primary">{story.petName}</p>
                      <p className="text-xs text-muted-foreground">{story.petType}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {filteredStories.length === 0 &&
          <div className="text-center py-20">
              <p className="text-muted-foreground">No stories found for this filter.</p>
            </div>
          }
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary/5 border-t border-border">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="section-headline font-bold text-foreground mb-5">
            Write your own
            <br />
            <span className="text-primary">success story</span>
          </h2>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            Hundreds of pets are waiting for their forever home. Your story could be next.
          </p>
          <Link
            href="/pets"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-4 rounded-full hover:bg-accent transition-all duration-300 hover:scale-105 hover:shadow-lg">
            
            Meet Our Pets
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </main>);

}