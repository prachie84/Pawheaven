'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import { useAuth } from '@/contexts/AuthContext';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Pets', href: '/pets' },
  { label: 'About', href: '/about' },
  { label: 'Success Stories', href: '/success-stories' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = () => setMenuOpen(false);

  const handleLogout = async () => {
    try {
      await signOut();
      setMenuOpen(false);
      router?.push('/');
      router?.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isLoggedIn = !loading && !!user;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'nav-blur bg-background/90 border-b border-border shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <AppLogo size={36} />
            <span className="font-bold text-xl tracking-tight text-foreground group-hover:text-primary transition-colors">
              Pawheaven
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks?.map((link) => (
              <Link
                key={link?.label}
                href={link?.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {link?.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full rounded-full" />
              </Link>
            ))}
            {isLoggedIn && (
              <Link
                href="/my-applications"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                My Applications
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full rounded-full" />
              </Link>
            )}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <span className="text-xs text-muted-foreground truncate max-w-[140px]">
                  {user?.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm font-semibold text-foreground hover:text-primary transition-all duration-200 px-4 py-2 border border-border rounded-full hover:border-primary hover:scale-105"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-semibold text-foreground hover:text-primary transition-colors px-4 py-2"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="text-sm font-semibold bg-primary text-primary-foreground hover:bg-accent transition-all duration-200 px-5 py-2.5 rounded-full shadow-sm hover:scale-105 hover:shadow-md"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden flex flex-col justify-center items-center w-11 h-11 gap-1.5 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 z-40 nav-blur bg-background/95">
          <nav className="flex flex-col items-center justify-center h-full gap-8 pb-20">
            {navLinks?.map((link) => (
              <Link
                key={link?.label}
                href={link?.href}
                onClick={handleNavClick}
                className="text-2xl font-semibold text-foreground hover:text-primary transition-colors"
              >
                {link?.label}
              </Link>
            ))}
            {isLoggedIn && (
              <Link
                href="/my-applications"
                onClick={handleNavClick}
                className="text-2xl font-semibold text-foreground hover:text-primary transition-colors"
              >
                My Applications
              </Link>
            )}
            <div className="flex flex-col items-center gap-4 mt-4">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="text-lg font-semibold text-foreground hover:text-primary transition-colors border border-border rounded-full px-8 py-3 hover:border-primary"
                >
                  Log Out
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={handleNavClick}
                    className="text-lg font-semibold text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    onClick={handleNavClick}
                    className="text-lg font-semibold bg-primary text-primary-foreground hover:bg-accent transition-colors px-8 py-3 rounded-full"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}