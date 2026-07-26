'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AppImage from '@/components/ui/AppImage';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase/client';

const allPets = [
{ id: 1, name: 'Biscuit', breed: 'Golden Retriever', age: '2 years', ageGroup: 'Young', type: 'Dog', size: 'Large', location: 'Mumbai, MH', image: "https://images.unsplash.com/photo-1600804340584-c7db2eacf0bf", alt: 'Fluffy golden retriever dog sitting on green grass, warm sunlight, happy expression', tag: 'Friendly', tagColor: 'bg-amber-100 text-amber-700', vaccinated: true, neutered: true, fee: 500 },
{ id: 2, name: 'Luna', breed: 'Domestic Shorthair', age: '1 year', ageGroup: 'Young', type: 'Cat', size: 'Small', location: 'Delhi, DL', image: "https://img.rocket.new/generatedImages/rocket_gen_img_147dc6b4a-1772439625243.png", alt: 'Orange tabby cat with green eyes looking at camera, bright natural light', tag: 'Playful', tagColor: 'bg-rose-100 text-rose-700', vaccinated: true, neutered: true, fee: 300 },
{ id: 3, name: 'Max', breed: 'Labrador Mix', age: '3 years', ageGroup: 'Adult', type: 'Dog', size: 'Large', location: 'Bangalore, KA', image: "https://images.unsplash.com/photo-1572749243219-2a6657535037", alt: 'Two brown dogs running playfully in park, motion, green background', tag: 'Active', tagColor: 'bg-sky-100 text-sky-700', vaccinated: true, neutered: false, fee: 450 },
{ id: 4, name: 'Daisy', breed: 'Beagle', age: '4 years', ageGroup: 'Adult', type: 'Dog', size: 'Medium', location: 'Chennai, TN', image: "https://images.unsplash.com/photo-1710756072197-93902e332d94", alt: 'Beagle with brown and white coat sitting calmly, studio lighting, gentle expression', tag: 'Gentle', tagColor: 'bg-emerald-100 text-emerald-700', vaccinated: true, neutered: true, fee: 400 },
{ id: 5, name: 'Oliver', breed: 'Persian Mix', age: '5 years', ageGroup: 'Adult', type: 'Cat', size: 'Medium', location: 'Hyderabad, TS', image: "https://images.unsplash.com/photo-1686259799275-c10b883d4f2e", alt: 'White fluffy cat with blue eyes resting on soft cushion, serene warm indoor light', tag: 'Calm', tagColor: 'bg-purple-100 text-purple-700', vaccinated: true, neutered: true, fee: 250 },
{ id: 6, name: 'Coco', breed: 'Chihuahua', age: '6 months', ageGroup: 'Puppy/Kitten', type: 'Dog', size: 'Small', location: 'Pune, MH', image: "https://images.unsplash.com/photo-1606994160120-f10354d893b4", alt: 'Tiny chihuahua puppy with big ears and bright eyes held gently in human hands', tag: 'Tiny & Sweet', tagColor: 'bg-pink-100 text-pink-700', vaccinated: false, neutered: false, fee: 350 },
{ id: 7, name: 'Rocky', breed: 'German Shepherd Mix', age: '2 years', ageGroup: 'Young', type: 'Dog', size: 'Large', location: 'Kolkata, WB', image: "https://images.unsplash.com/photo-1649571069337-efce54ab2b15", alt: 'German shepherd mix dog with alert ears and intelligent eyes, outdoor park setting', tag: 'Loyal', tagColor: 'bg-orange-100 text-orange-700', vaccinated: true, neutered: true, fee: 480 },
{ id: 8, name: 'Mochi', breed: 'Scottish Fold', age: '8 months', ageGroup: 'Puppy/Kitten', type: 'Cat', size: 'Small', location: 'Ahmedabad, GJ', image: "https://images.unsplash.com/photo-1567322439999-544fb1d6ed8d", alt: 'Fluffy Scottish fold kitten with folded ears and round face, soft pastel background', tag: 'Cuddly', tagColor: 'bg-indigo-100 text-indigo-700', vaccinated: true, neutered: false, fee: 300 },
{ id: 9, name: 'Peanut', breed: 'Dachshund', age: '7 years', ageGroup: 'Senior', type: 'Dog', size: 'Small', location: 'Jaipur, RJ', image: "https://images.unsplash.com/photo-1680970328141-9ec1a6af6a0f", alt: 'Dachshund dog with long body and short legs looking up with big brown eyes, indoor cozy setting', tag: 'Senior Love', tagColor: 'bg-yellow-100 text-yellow-700', vaccinated: true, neutered: true, fee: 200 },
{ id: 10, name: 'Mango', breed: 'Indian Ringneck Parakeet', age: '1 year', ageGroup: 'Young', type: 'Bird', size: 'Small', location: 'Mumbai, MH', image: "https://images.unsplash.com/photo-1581886043969-c65ce109117e", alt: 'Bright green Indian ringneck parakeet perched on a branch, vibrant feathers, natural light', tag: 'Talkative', tagColor: 'bg-green-100 text-green-700', vaccinated: false, neutered: false, fee: 600 },
{ id: 11, name: 'Kiwi', breed: 'Budgerigar', age: '6 months', ageGroup: 'Puppy/Kitten', type: 'Bird', size: 'Small', location: 'Delhi, DL', image: "https://images.unsplash.com/photo-1658478689397-5824ca74ad36", alt: 'Small blue and yellow budgerigar parakeet sitting on a perch, colorful feathers, white background', tag: 'Cheerful', tagColor: 'bg-sky-100 text-sky-700', vaccinated: false, neutered: false, fee: 250 },
{ id: 12, name: 'Sunny', breed: 'Cockatiel', age: '2 years', ageGroup: 'Young', type: 'Bird', size: 'Small', location: 'Bangalore, KA', image: "https://images.unsplash.com/photo-1567011292854-a8e4cd361414", alt: 'White and yellow cockatiel bird with orange cheek patches perched on a wooden stand', tag: 'Friendly', tagColor: 'bg-amber-100 text-amber-700', vaccinated: false, neutered: false, fee: 400 },
{ id: 13, name: 'Rio', breed: 'African Grey Parrot', age: '3 years', ageGroup: 'Adult', type: 'Bird', size: 'Medium', location: 'Chennai, TN', image: "https://images.unsplash.com/photo-1712979294974-5ca26455bb8a", alt: 'Grey African parrot with red tail feathers perched on a branch, intelligent eyes, natural background', tag: 'Intelligent', tagColor: 'bg-purple-100 text-purple-700', vaccinated: true, neutered: false, fee: 1500 },
{ id: 14, name: 'Tweety', breed: 'Canary', age: '1 year', ageGroup: 'Young', type: 'Bird', size: 'Small', location: 'Hyderabad, TS', image: "https://images.unsplash.com/photo-1667983942945-3f0be4ad4bc6", alt: 'Bright yellow canary bird sitting on a small perch inside a cage, singing, warm light', tag: 'Singer', tagColor: 'bg-yellow-100 text-yellow-700', vaccinated: false, neutered: false, fee: 200 },
{ id: 15, name: 'Snowy', breed: 'White Dove', age: '2 years', ageGroup: 'Young', type: 'Bird', size: 'Small', location: 'Pune, MH', image: "https://images.unsplash.com/photo-1713344773244-801157ad2baa", alt: 'Pure white dove with gentle eyes perched on a hand, soft natural background, peaceful', tag: 'Peaceful', tagColor: 'bg-slate-100 text-slate-700', vaccinated: false, neutered: false, fee: 300 },
{ id: 16, name: 'Bunny', breed: 'Holland Lop Rabbit', age: '8 months', ageGroup: 'Puppy/Kitten', type: 'Rabbit', size: 'Small', location: 'Kolkata, WB', image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ecb4b808-1772844225441.png", alt: 'Fluffy white and brown Holland lop rabbit with floppy ears sitting on green grass', tag: 'Fluffy', tagColor: 'bg-pink-100 text-pink-700', vaccinated: true, neutered: false, fee: 350 },
{ id: 17, name: 'Caramel', breed: 'Angora Rabbit', age: '1 year', ageGroup: 'Young', type: 'Rabbit', size: 'Medium', location: 'Jaipur, RJ', image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ecb4b808-1772844225441.png", alt: 'Long-haired caramel colored Angora rabbit with soft fluffy fur sitting on wooden floor', tag: 'Soft & Sweet', tagColor: 'bg-amber-100 text-amber-700', vaccinated: true, neutered: true, fee: 400 },
{ id: 18, name: 'Hammy', breed: 'Syrian Hamster', age: '4 months', ageGroup: 'Puppy/Kitten', type: 'Small Animal', size: 'Small', location: 'Ahmedabad, GJ', image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b93073f1-1772135349288.png", alt: 'Golden Syrian hamster with chubby cheeks sitting in a small wooden house, cute expression', tag: 'Adorable', tagColor: 'bg-orange-100 text-orange-700', vaccinated: false, neutered: false, fee: 150 },
{ id: 19, name: 'Goldie', breed: 'Goldfish', age: '1 year', ageGroup: 'Young', type: 'Fish', size: 'Small', location: 'Mumbai, MH', image: "https://images.unsplash.com/photo-1668862347855-2784f183c397", alt: 'Bright orange goldfish swimming in a clear aquarium with green plants and pebbles', tag: 'Serene', tagColor: 'bg-yellow-100 text-yellow-700', vaccinated: false, neutered: false, fee: 100 },
{ id: 20, name: 'Shelly', breed: 'Red-eared Slider Turtle', age: '2 years', ageGroup: 'Young', type: 'Reptile', size: 'Small', location: 'Delhi, DL', image: "https://images.unsplash.com/photo-1600781365464-edc015f6b4fd", alt: 'Red-eared slider turtle with green shell and red stripe near ear, sitting on a rock near water', tag: 'Calm', tagColor: 'bg-emerald-100 text-emerald-700', vaccinated: false, neutered: false, fee: 200 },
{ id: 21, name: 'Mittens', breed: 'Siamese Cat', age: '3 years', ageGroup: 'Adult', type: 'Cat', size: 'Medium', location: 'Bangalore, KA', image: "https://images.unsplash.com/photo-1633339438513-6da3b922ddf1", alt: 'Siamese cat with blue eyes and cream coat with dark face markings sitting elegantly', tag: 'Elegant', tagColor: 'bg-blue-100 text-blue-700', vaccinated: true, neutered: true, fee: 350 },
{ id: 22, name: 'Bruno', breed: 'Indian Pariah Dog', age: '1 year', ageGroup: 'Young', type: 'Dog', size: 'Medium', location: 'Chennai, TN', image: "https://images.unsplash.com/photo-1655163531817-72a31b7dc850", alt: 'Brown Indian pariah dog with alert ears and friendly eyes sitting on grass in sunlight', tag: 'Street Rescue', tagColor: 'bg-rose-100 text-rose-700', vaccinated: true, neutered: true, fee: 150 }];

const typeFilters = ['All', 'Dog', 'Cat', 'Bird', 'Rabbit', 'Small Animal', 'Fish', 'Reptile'];
const sizeFilters = ['All Sizes', 'Small', 'Medium', 'Large'];
const ageFilters = ['All Ages', 'Puppy/Kitten', 'Young', 'Adult', 'Senior'];

interface LoginPromptModalProps {
  petName: string;
  onClose: () => void;
}

function LoginPromptModal({ petName, onClose }: LoginPromptModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" role="dialog" aria-modal="true" aria-labelledby="login-prompt-title">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center animate-bounce-in">
        <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">🐾</span>
        </div>
        <h2 id="login-prompt-title" className="text-xl font-bold text-foreground mb-2">
          Sign in to Adopt {petName}
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          You need to be logged in to submit an adoption application. It only takes a moment!
        </p>
        <div className="flex flex-col gap-3">
          <Link href="/login" className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-accent transition-all duration-300 hover:scale-105 text-center">
            Log In
          </Link>
          <Link href="/signup" className="w-full py-3 rounded-xl border border-border text-foreground font-semibold text-sm hover:border-primary hover:text-primary transition-colors duration-200 text-center">
            Create Account
          </Link>
          <button onClick={onClose} className="text-sm text-muted-foreground hover:text-foreground transition-colors mt-1">
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}

interface Pet {
  id: number;
  name: string;
  breed: string;
  age: string;
  ageGroup: string;
  type: string;
  size: string;
  location: string;
  image: string;
  alt: string;
  tag: string;
  tagColor: string;
  vaccinated: boolean;
  neutered: boolean;
  fee: number;
}

interface FavoriteButtonProps {
  pet: Pet;
  isFavorited: boolean;
  onToggle: (pet: Pet) => void;
  isLoading: boolean;
}

function FavoriteButton({ pet, isFavorited, onToggle, isLoading }: FavoriteButtonProps) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onToggle(pet); }}
      disabled={isLoading}
      aria-label={isFavorited ? `Remove ${pet.name} from favorites` : `Add ${pet.name} to favorites`}
      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border ${
        isFavorited
          ? 'bg-rose-500 border-rose-500 text-white scale-110' :'bg-white/90 border-white/50 text-muted-foreground hover:text-rose-500 hover:border-rose-300 hover:scale-110'
      } ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
    >
      {isLoading ? (
        <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill={isFavorited ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      )}
    </button>
  );
}

export default function PetsGrid() {
  const [activeType, setActiveType] = useState('All');
  const [activeSize, setActiveSize] = useState('All Sizes');
  const [activeAge, setActiveAge] = useState('All Ages');
  const [searchQuery, setSearchQuery] = useState('');
  const [loginPromptPet, setLoginPromptPet] = useState<string | null>(null);
  const [favoritedIds, setFavoritedIds] = useState<Set<string>>(new Set());
  const [loadingFavIds, setLoadingFavIds] = useState<Set<string>>(new Set());
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const router = useRouter();
  const { user, loading } = useAuth();

  // Load user's favorites from Supabase
  const loadFavorites = useCallback(async () => {
    if (!user) return;
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from('pet_favorites')
        .select('pet_id')
        .eq('user_id', user.id);
      if (data) {
        setFavoritedIds(new Set(data.map((f: { pet_id: string }) => f.pet_id)));
      }
    } catch {
      // silently fail
    }
  }, [user]);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  // Intersection observer for card reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number(entry.target.getAttribute('data-pet-id'));
            setVisibleCards((prev) => new Set(prev).add(id));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    const cards = document.querySelectorAll('[data-pet-id]');
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [activeType, activeSize, activeAge, searchQuery]);

  const handleApplyToAdopt = (petId: number, petName: string) => {
    if (user) {
      router.push(`/adopt?petId=${petId}&petName=${encodeURIComponent(petName)}`);
    } else {
      setLoginPromptPet(petName);
    }
  };

  const handleToggleFavorite = async (pet: Pet) => {
    if (!user) {
      setLoginPromptPet(pet.name);
      return;
    }
    const petIdStr = String(pet.id);
    setLoadingFavIds((prev) => new Set(prev).add(petIdStr));
    try {
      const supabase = createClient();
      if (favoritedIds.has(petIdStr)) {
        // Remove from favorites
        await supabase
          .from('pet_favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('pet_id', petIdStr);
        setFavoritedIds((prev) => {
          const next = new Set(prev);
          next.delete(petIdStr);
          return next;
        });
      } else {
        // Add to favorites
        await supabase.from('pet_favorites').upsert({
          user_id: user.id,
          pet_id: petIdStr,
          pet_name: pet.name,
          pet_breed: pet.breed,
          pet_image: pet.image,
          pet_type: pet.type,
          pet_location: pet.location,
          pet_fee: pet.fee,
        }, { onConflict: 'user_id,pet_id' });
        setFavoritedIds((prev) => new Set(prev).add(petIdStr));
      }
    } catch {
      // silently fail
    } finally {
      setLoadingFavIds((prev) => {
        const next = new Set(prev);
        next.delete(petIdStr);
        return next;
      });
    }
  };

  const filtered = allPets?.filter((pet) => {
    const typeMatch = activeType === 'All' || pet?.type === activeType;
    const sizeMatch = activeSize === 'All Sizes' || pet?.size === activeSize;
    const ageMatch = activeAge === 'All Ages' || pet?.ageGroup === activeAge;
    const searchMatch =
      searchQuery.trim() === '' ||
      pet?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet?.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet?.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet?.location.toLowerCase().includes(searchQuery.toLowerCase());
    return typeMatch && sizeMatch && ageMatch && searchMatch;
  });

  return (
    <section className="py-12 bg-background" aria-label="Pet listings">
      {loginPromptPet && (
        <LoginPromptModal petName={loginPromptPet} onClose={() => setLoginPromptPet(null)} />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, breed, type or location..."
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all shadow-sm"
              aria-label="Search pets"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-4 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-10 pb-8 border-b border-border">
          <div className="flex gap-2 flex-wrap">
            {typeFilters?.map((f) => (
              <button
                key={f}
                onClick={() => setActiveType(f)}
                className={`filter-chip px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                  activeType === f
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card text-foreground border-border hover:border-primary'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="w-px bg-border hidden sm:block" />
          <div className="flex gap-2 flex-wrap">
            {sizeFilters?.map((f) => (
              <button
                key={f}
                onClick={() => setActiveSize(f)}
                className={`filter-chip px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  activeSize === f
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card text-foreground border-border hover:border-primary'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="w-px bg-border hidden sm:block" />
          <div className="flex gap-2 flex-wrap">
            {ageFilters?.map((f) => (
              <button
                key={f}
                onClick={() => setActiveAge(f)}
                className={`filter-chip px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  activeAge === f
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card text-foreground border-border hover:border-primary'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Results count + favorites shortcut */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filtered?.length}</span> pets
            {searchQuery && (
              <span> for &quot;<span className="text-primary font-medium">{searchQuery}</span>&quot;</span>
            )}
          </p>
          {user && favoritedIds.size > 0 && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-full">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {favoritedIds.size} Saved
            </div>
          )}
        </div>

        {/* Grid */}
        {filtered?.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-5xl mb-4 block">🐾</span>
            <p className="text-muted-foreground">No pets match your search. Try different keywords or filters!</p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 px-5 py-2 bg-primary text-primary-foreground rounded-full text-sm font-semibold hover:bg-accent transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered?.map((pet, idx) => {
              const petIdStr = String(pet.id);
              const isFav = favoritedIds.has(petIdStr);
              const isFavLoading = loadingFavIds.has(petIdStr);
              const isVisible = visibleCards.has(pet.id);
              return (
                <div
                  key={pet?.id}
                  data-pet-id={pet.id}
                  className={`pet-card warm-card overflow-hidden group transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${(idx % 6) * 60}ms` }}
                >
                  <div className="relative h-56 overflow-hidden bg-muted">
                    <AppImage
                      src={pet?.image}
                      alt={pet?.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 z-10">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${pet?.tagColor}`}>
                        {pet?.tag}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 z-10 flex gap-1.5 items-center">
                      {pet?.vaccinated && (
                        <span className="text-xs font-mono bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                          Vaccinated
                        </span>
                      )}
                      <FavoriteButton
                        pet={pet}
                        isFavorited={isFav}
                        onToggle={handleToggleFavorite}
                        isLoading={isFavLoading}
                      />
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h2 className="text-lg font-bold text-foreground">{pet?.name}</h2>
                        <p className="text-sm text-muted-foreground">{pet?.breed}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                          {pet?.age}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {pet?.location}
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex gap-2">
                        <span className="text-xs bg-secondary text-muted-foreground px-2 py-1 rounded-full">{pet?.size}</span>
                        <span className="text-xs bg-secondary text-muted-foreground px-2 py-1 rounded-full">{pet?.type}</span>
                      </div>
                      <span className="text-sm font-bold text-primary">₹{pet?.fee} fee</span>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href="/contact"
                        className="flex-1 flex items-center justify-center py-2.5 border border-border text-foreground text-sm font-medium rounded-full hover:border-primary hover:text-primary transition-all duration-200 hover:scale-105"
                      >
                        Learn More
                      </Link>
                      <button
                        onClick={() => handleApplyToAdopt(pet?.id, pet?.name)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-full hover:bg-accent transition-all duration-200 hover:scale-105 hover:shadow-md"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        Apply to Adopt
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}