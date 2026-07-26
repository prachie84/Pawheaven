'use client';

import React, { useRef, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';

const stories = [
{
  id: 1,
  familyName: 'The Harrington Family',
  location: 'Brooklyn, NY',
  petName: 'Biscuit',
  petType: 'Golden Retriever',
  quote: 'Adopting Biscuit was the best decision we ever made. He brought so much joy and energy into our home — our kids absolutely adore him.',
  familyImage: "https://img.rocket.new/generatedImages/rocket_gen_img_14ffb911d-1775835916875.png",
  familyAlt: 'Happy Harrington family outdoors with their golden retriever dog, smiling, sunny day, backyard setting',
  petImage: "https://img.rocket.new/generatedImages/rocket_gen_img_12e64b1ea-1772136582737.png",
  petAlt: 'Biscuit the golden retriever looking happy and healthy',
  date: 'March 2026',
  stars: 5
},
{
  id: 2,
  familyName: 'Maya Chen',
  location: 'Manhattan, NY',
  petName: 'Luna',
  petType: 'Domestic Shorthair Cat',
  quote: "Luna found me at exactly the right time. She's incredibly affectionate and has made my apartment feel like a real home. The adoption process was seamless.",
  familyImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1ff94b671-1772814006308.png",
  familyAlt: 'Young Asian woman smiling warmly, holding her orange cat, bright apartment interior',
  petImage: "https://images.unsplash.com/photo-1712095051853-93688263dbe3",
  petAlt: 'Luna the tabby cat with green eyes looking content',
  date: 'January 2026',
  stars: 5
},
{
  id: 3,
  familyName: 'The Rivera Household',
  location: 'Queens, NY',
  petName: 'Max',
  petType: 'Labrador Mix',
  quote: 'We were nervous about adopting a rescue, but Pawheaven guided us every step of the way. Max has settled in perfectly and loves our daily runs.',
  familyImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1e177cfaa-1763294771386.png",
  familyAlt: 'Hispanic man in his 30s smiling outdoors, casual clothing, park background, warm afternoon light',
  petImage: "https://images.unsplash.com/photo-1703984210780-5d300858c838",
  petAlt: 'Max the labrador mix running energetically in the park',
  date: 'May 2026',
  stars: 5
}];


export default function SuccessStoriesSection() {
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
    <section
      id="stories"
      className="py-16 md:py-24 bg-background"
      aria-label="Adoption success stories">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-primary mb-3 block">Success Stories</span>
          <h2 className="section-headline font-bold text-foreground">
            Real families,
            <br />
            <span className="text-primary">real love</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-sm leading-relaxed">
            Every adoption is a story of hope. Here are a few of our favorite happy endings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stories.map((story, i) =>
          <div
            key={story.id}
            ref={(el) => {cardsRef.current[i] = el;}}
            className="reveal-hidden story-card p-7 flex flex-col gap-5 group"
            style={{ transitionDelay: `${i * 120}ms` }}>
            
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: story.stars }).map((_, si) =>
              <svg key={si} width="16" height="16" viewBox="0 0 24 24" fill="var(--primary)" stroke="none">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
              )}
              </div>

              {/* Quote */}
              <p className="text-sm leading-relaxed text-foreground flex-1 italic">
                &ldquo;{story.quote}&rdquo;
              </p>

              {/* Footer */}
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-muted">
                  <AppImage
                  src={story.familyImage}
                  alt={story.familyAlt}
                  fill
                  sizes="48px"
                  className="object-cover" />
                
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground truncate">{story.familyName}</p>
                  <p className="text-xs text-muted-foreground">{story.location} · {story.date}</p>
                </div>
                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-muted border-2 border-primary/20">
                  <AppImage
                  src={story.petImage}
                  alt={story.petAlt}
                  fill
                  sizes="40px"
                  className="object-cover" />
                
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-muted-foreground">Adopted</span>
                <span className="text-xs font-semibold text-primary">{story.petName}</span>
                <span className="text-xs text-muted-foreground">·</span>
                <span className="text-xs text-muted-foreground">{story.petType}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}