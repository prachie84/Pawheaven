'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase/client';

interface Application {
  id: string;
  pet_id: string;
  pet_name: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  housing_type: string;
  experience: string;
  reason: string;
  status: string;
  created_at: string;
}

const statusConfig: Record<string, { label: string; color: string; bg: string; dot: string }> = {
  pending: { label: 'Under Review', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200', dot: 'bg-amber-500' },
  approved: { label: 'Approved', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200', dot: 'bg-emerald-500' },
  rejected: { label: 'Not Approved', color: 'text-red-700', bg: 'bg-red-50 border-red-200', dot: 'bg-red-500' },
  reviewing: { label: 'In Review', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200', dot: 'bg-blue-500' },
};

function ApplicationCard({ app, index }: { app: Application; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const status = statusConfig[app.status] || statusConfig.pending;

  const formattedDate = new Date(app.created_at).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div
      className="app-card warm-card overflow-hidden"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Card Header */}
      <div className="p-6 flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">🐾</span>
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-foreground truncate">
              Adoption for <span className="text-primary">{app.pet_name}</span>
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5">Submitted on {formattedDate}</p>
          </div>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold flex-shrink-0 ${status.bg} ${status.color}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${status.dot} animate-pulse`} />
          {status.label}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-border mx-6" />

      {/* Summary Row */}
      <div className="px-6 py-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Applicant</p>
          <p className="text-sm font-semibold text-foreground truncate">{app.full_name}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Housing</p>
          <p className="text-sm font-semibold text-foreground capitalize">{app.housing_type || '—'}</p>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <p className="text-xs text-muted-foreground mb-1">Contact</p>
          <p className="text-sm font-semibold text-foreground truncate">{app.phone}</p>
        </div>
      </div>

      {/* Expandable Details */}
      {expanded && (
        <div className="px-6 pb-5 space-y-4 border-t border-border pt-4">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1.5">Experience with Pets</p>
            <p className="text-sm text-foreground leading-relaxed bg-secondary/50 rounded-xl p-3">{app.experience}</p>
          </div>
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1.5">Why You Want to Adopt</p>
            <p className="text-sm text-foreground leading-relaxed bg-secondary/50 rounded-xl p-3">{app.reason}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Email</p>
              <p className="text-sm font-medium text-foreground">{app.email}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Address</p>
              <p className="text-sm font-medium text-foreground">{app.address}</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="px-6 pb-5 flex items-center justify-between gap-3">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm font-semibold text-primary hover:text-accent transition-colors flex items-center gap-1.5"
        >
          {expanded ? 'Show Less' : 'View Details'}
          <svg
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"
            className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        <Link
          href="/pets"
          className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          Browse More Pets →
        </Link>
      </div>
    </div>
  );
}

export default function MyApplicationsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login?redirect=/my-applications');
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;
    const fetchApplications = async () => {
      setFetching(true);
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('adoption_applications')
          .select('id, pet_id, pet_name, full_name, email, phone, address, housing_type, experience, reason, status, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setApplications(data || []);
      } catch (err: any) {
        setError(err?.message || 'Failed to load applications.');
      } finally {
        setFetching(false);
      }
    };
    fetchApplications();
  }, [user]);

  if (loading || (!user && !loading)) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Page Header */}
          <div className="mb-10 page-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-4">
              <span>📋</span> My Applications
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Your Adoption Applications
            </h1>
            <p className="text-muted-foreground">
              Track the status of all your adoption applications in one place.
            </p>
          </div>

          {/* Content */}
          {fetching ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="warm-card p-6 animate-pulse">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-muted" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded-full w-48" />
                      <div className="h-3 bg-muted rounded-full w-32" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-10 bg-muted rounded-xl" />
                    <div className="h-10 bg-muted rounded-xl" />
                    <div className="h-10 bg-muted rounded-xl" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="warm-card p-8 text-center">
              <span className="text-4xl mb-4 block">⚠️</span>
              <p className="text-foreground font-semibold mb-2">Something went wrong</p>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          ) : applications.length === 0 ? (
            <div className="warm-card p-12 text-center page-fade-in">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <span className="text-4xl">🐾</span>
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">No Applications Yet</h2>
              <p className="text-muted-foreground text-sm mb-6 max-w-xs mx-auto">
                You haven't submitted any adoption applications. Browse our pets and find your perfect companion!
              </p>
              <Link
                href="/pets"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-full hover:bg-accent transition-all duration-300 hover:scale-105 shadow-md"
              >
                Browse Pets
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground mb-2">
                {applications.length} application{applications.length !== 1 ? 's' : ''} found
              </p>
              {applications.map((app, i) => (
                <ApplicationCard key={app.id} app={app} index={i} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
