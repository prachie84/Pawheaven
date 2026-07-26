'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase/client';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  housingType: string;
  hasYard: string;
  hasOtherPets: string;
  otherPetsDetails: string;
  hasChildren: string;
  childrenAges: string;
  experience: string;
  reason: string;
  workSchedule: string;
  agreeTerms: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  housingType?: string;
  hasYard?: string;
  experience?: string;
  reason?: string;
  agreeTerms?: string;
  general?: string;
}

function AdoptionForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const petName = searchParams.get('petName') || 'this pet';
  const petId = searchParams.get('petId') || '';

  const { user, loading } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    housingType: '',
    hasYard: '',
    hasOtherPets: '',
    otherPetsDetails: '',
    hasChildren: '',
    childrenAges: '',
    experience: '',
    reason: '',
    workSchedule: '',
    agreeTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (!loading && !user) {
      router.replace(`/login?redirect=/adopt?petId=${petId}&petName=${encodeURIComponent(petName)}`);
    }
  }, [loading, user, router, petId, petName]);

  // Pre-fill email from logged-in user
  useEffect(() => {
    if (user?.email) {
      setForm((prev) => ({ ...prev, email: user.email || '' }));
    }
    if (user?.user_metadata?.full_name) {
      setForm((prev) => ({ ...prev, fullName: user.user_metadata.full_name || '' }));
    }
  }, [user]);

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required.';
    if (!form.email.trim()) {
      e.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Please enter a valid email.';
    }
    if (!form.phone.trim()) e.phone = 'Phone number is required.';
    if (!form.address.trim()) e.address = 'Address is required.';
    if (!form.housingType) e.housingType = 'Please select your housing type.';
    if (!form.experience) e.experience = 'Please describe your experience.';
    if (!form.reason.trim()) e.reason = 'Please tell us why you want to adopt.';
    if (!form.agreeTerms) e.agreeTerms = 'You must agree to the terms to proceed.';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.from('adoption_applications').insert({
        user_id: user?.id,
        pet_id: petId,
        pet_name: petName,
        full_name: form.fullName,
        email: form.email,
        phone: form.phone,
        address: form.address,
        housing_type: form.housingType,
        has_yard: form.hasYard,
        has_other_pets: form.hasOtherPets,
        other_pets_details: form.otherPetsDetails,
        has_children: form.hasChildren,
        children_ages: form.childrenAges,
        experience: form.experience,
        work_schedule: form.workSchedule,
        reason: form.reason,
        agree_terms: form.agreeTerms,
        status: 'pending',
      });

      if (error) {
        setErrors({ general: error.message || 'Failed to submit application. Please try again.' });
        return;
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrors({ general: err?.message || 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          {/* Page Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-4">
              <span>🐾</span> Adoption Application
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Apply to Adopt <span className="text-primary">{petName}</span>
            </h1>
            <p className="text-muted-foreground text-base max-w-md mx-auto">
              Fill out the form below and our team will review your application within 2–3 business days.
            </p>
          </div>

          {submitted ? (
            <div className="bg-card border border-border rounded-3xl shadow-lg p-10 text-center">
              <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-5">
                <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3">Application Submitted!</h2>
              <p className="text-muted-foreground mb-2">
                Thank you for applying to adopt <strong className="text-foreground">{petName}</strong>!
              </p>
              <p className="text-muted-foreground text-sm mb-8">
                Our adoption team will review your application and reach out to you within 2–3 business days.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/pets"
                  className="px-6 py-3 rounded-xl border border-border text-foreground font-semibold text-sm hover:border-primary hover:text-primary transition-colors"
                >
                  Browse More Pets
                </Link>
                <Link
                  href="/"
                  className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-accent transition-colors"
                >
                  Go to Home
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="bg-card border border-border rounded-3xl shadow-lg p-8 space-y-8">
              {/* General error */}
              {errors.general && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
                  {errors.general}
                </div>
              )}

              {/* Personal Information */}
              <section>
                <h2 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center">1</span>
                  Personal Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
                    <input
                      id="fullName"
                      type="text"
                      value={form.fullName}
                      onChange={(e) => updateField('fullName', e.target.value)}
                      placeholder="Jane Smith"
                      className={`w-full px-4 py-3 rounded-xl border text-sm bg-background text-foreground placeholder:text-muted-foreground outline-none transition-all focus:ring-2 focus:ring-primary/30 ${errors.fullName ? 'border-red-400' : 'border-border focus:border-primary'}`}
                    />
                    {errors.fullName && <p className="mt-1.5 text-xs text-red-500">{errors.fullName}</p>}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">Email Address *</label>
                      <input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        placeholder="you@example.com"
                        className={`w-full px-4 py-3 rounded-xl border text-sm bg-background text-foreground placeholder:text-muted-foreground outline-none transition-all focus:ring-2 focus:ring-primary/30 ${errors.email ? 'border-red-400' : 'border-border focus:border-primary'}`}
                      />
                      {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">Phone Number *</label>
                      <input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        placeholder="+91 98765 43210"
                        className={`w-full px-4 py-3 rounded-xl border text-sm bg-background text-foreground placeholder:text-muted-foreground outline-none transition-all focus:ring-2 focus:ring-primary/30 ${errors.phone ? 'border-red-400' : 'border-border focus:border-primary'}`}
                      />
                      {errors.phone && <p className="mt-1.5 text-xs text-red-500">{errors.phone}</p>}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-foreground mb-1.5">Home Address *</label>
                    <input
                      id="address"
                      type="text"
                      value={form.address}
                      onChange={(e) => updateField('address', e.target.value)}
                      placeholder="123 Main St, City, State, PIN"
                      className={`w-full px-4 py-3 rounded-xl border text-sm bg-background text-foreground placeholder:text-muted-foreground outline-none transition-all focus:ring-2 focus:ring-primary/30 ${errors.address ? 'border-red-400' : 'border-border focus:border-primary'}`}
                    />
                    {errors.address && <p className="mt-1.5 text-xs text-red-500">{errors.address}</p>}
                  </div>
                </div>
              </section>

              <div className="border-t border-border" />

              {/* Living Situation */}
              <section>
                <h2 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center">2</span>
                  Living Situation
                </h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="housingType" className="block text-sm font-medium text-foreground mb-1.5">Housing Type *</label>
                    <select
                      id="housingType"
                      value={form.housingType}
                      onChange={(e) => updateField('housingType', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-sm bg-background text-foreground outline-none transition-all focus:ring-2 focus:ring-primary/30 ${errors.housingType ? 'border-red-400' : 'border-border focus:border-primary'}`}
                    >
                      <option value="">Select housing type</option>
                      <option value="house">House</option>
                      <option value="apartment">Apartment</option>
                      <option value="condo">Condo</option>
                      <option value="townhouse">Townhouse</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.housingType && <p className="mt-1.5 text-xs text-red-500">{errors.housingType}</p>}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Do you have a yard?</label>
                      <div className="flex gap-3">
                        {['Yes', 'No'].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => updateField('hasYard', opt)}
                            className={`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-all ${form.hasYard === opt ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-foreground hover:border-primary'}`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Do you have other pets?</label>
                      <div className="flex gap-3">
                        {['Yes', 'No'].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => updateField('hasOtherPets', opt)}
                            className={`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-all ${form.hasOtherPets === opt ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-foreground hover:border-primary'}`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  {form.hasOtherPets === 'Yes' && (
                    <div>
                      <label htmlFor="otherPetsDetails" className="block text-sm font-medium text-foreground mb-1.5">Tell us about your other pets</label>
                      <input
                        id="otherPetsDetails"
                        type="text"
                        value={form.otherPetsDetails}
                        onChange={(e) => updateField('otherPetsDetails', e.target.value)}
                        placeholder="e.g. 1 dog (3 years old), 2 cats"
                        className="w-full px-4 py-3 rounded-xl border border-border text-sm bg-background text-foreground placeholder:text-muted-foreground outline-none transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary"
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Do you have children at home?</label>
                    <div className="flex gap-3 max-w-xs">
                      {['Yes', 'No'].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => updateField('hasChildren', opt)}
                          className={`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-all ${form.hasChildren === opt ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-foreground hover:border-primary'}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                  {form.hasChildren === 'Yes' && (
                    <div>
                      <label htmlFor="childrenAges" className="block text-sm font-medium text-foreground mb-1.5">Ages of children</label>
                      <input
                        id="childrenAges"
                        type="text"
                        value={form.childrenAges}
                        onChange={(e) => updateField('childrenAges', e.target.value)}
                        placeholder="e.g. 5, 8, 12"
                        className="w-full px-4 py-3 rounded-xl border border-border text-sm bg-background text-foreground placeholder:text-muted-foreground outline-none transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary"
                      />
                    </div>
                  )}
                </div>
              </section>

              <div className="border-t border-border" />

              {/* About You */}
              <section>
                <h2 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center">3</span>
                  About You & Your Lifestyle
                </h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-foreground mb-1.5">Pet Ownership Experience *</label>
                    <select
                      id="experience"
                      value={form.experience}
                      onChange={(e) => updateField('experience', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-sm bg-background text-foreground outline-none transition-all focus:ring-2 focus:ring-primary/30 ${errors.experience ? 'border-red-400' : 'border-border focus:border-primary'}`}
                    >
                      <option value="">Select experience level</option>
                      <option value="first-time">First-time pet owner</option>
                      <option value="some">Some experience (1–2 pets before)</option>
                      <option value="experienced">Experienced (3+ pets)</option>
                      <option value="professional">Professional (vet, trainer, etc.)</option>
                    </select>
                    {errors.experience && <p className="mt-1.5 text-xs text-red-500">{errors.experience}</p>}
                  </div>
                  <div>
                    <label htmlFor="workSchedule" className="block text-sm font-medium text-foreground mb-1.5">Work Schedule</label>
                    <select
                      id="workSchedule"
                      value={form.workSchedule}
                      onChange={(e) => updateField('workSchedule', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border text-sm bg-background text-foreground outline-none transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    >
                      <option value="">Select work schedule</option>
                      <option value="home">Work from home</option>
                      <option value="part-time">Part-time away</option>
                      <option value="full-time">Full-time away (8+ hrs)</option>
                      <option value="flexible">Flexible schedule</option>
                      <option value="retired">Retired / Stay at home</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="reason" className="block text-sm font-medium text-foreground mb-1.5">Why do you want to adopt {petName}? *</label>
                    <textarea
                      id="reason"
                      rows={4}
                      value={form.reason}
                      onChange={(e) => updateField('reason', e.target.value)}
                      placeholder={`Tell us why ${petName} would be a great fit for your home...`}
                      className={`w-full px-4 py-3 rounded-xl border text-sm bg-background text-foreground placeholder:text-muted-foreground outline-none transition-all focus:ring-2 focus:ring-primary/30 resize-none ${errors.reason ? 'border-red-400' : 'border-border focus:border-primary'}`}
                    />
                    {errors.reason && <p className="mt-1.5 text-xs text-red-500">{errors.reason}</p>}
                  </div>
                </div>
              </section>

              <div className="border-t border-border" />

              {/* Agreement */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative mt-0.5 flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={form.agreeTerms}
                      onChange={(e) => updateField('agreeTerms', e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${form.agreeTerms ? 'bg-primary border-primary' : 'border-border group-hover:border-primary'}`}
                    >
                      {form.agreeTerms && (
                        <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    I confirm that the information provided is accurate and I agree to Pawheaven&apos;s{' '}
                    <Link href="#" className="text-primary hover:underline">adoption terms</Link> and{' '}
                    <Link href="#" className="text-primary hover:underline">privacy policy</Link>.
                  </span>
                </label>
                {errors.agreeTerms && <p className="mt-2 text-xs text-red-500">{errors.agreeTerms}</p>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-base hover:bg-accent transition-all duration-200 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting Application…
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    Submit Adoption Application
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function AdoptPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <AdoptionForm />
    </Suspense>
  );
}
