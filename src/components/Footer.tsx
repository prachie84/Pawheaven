import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';

const socialLinks = [
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: 'Twitter',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
          {/* Left: Brand */}
          <div className="flex flex-col gap-3 max-w-xs">
            <div className="flex items-center gap-2">
              <AppLogo size={32} />
              <span className="font-bold text-lg tracking-tight text-foreground">Pawheaven</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Every paw deserves a forever home. Connecting pets with loving families since 2019.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-2">
              {socialLinks?.map((s) => (
                <a
                  key={s?.label}
                  href={s?.href}
                  aria-label={s?.label}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-all duration-200"
                >
                  {s?.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right: Links */}
          <div className="flex flex-wrap gap-12">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Explore</span>
              <Link href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Home</Link>
              <Link href="/pets" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Browse Pets</Link>
              <Link href="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">About Us</Link>
              <Link href="/success-stories" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Success Stories</Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Support</span>
              <Link href="/contact" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Contact</Link>
              <Link href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Volunteer</Link>
              <Link href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Donate</Link>
              <Link href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Partner With Us</Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Pawheaven. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}