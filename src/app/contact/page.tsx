import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactHero from '@/app/contact/components/ContactHero';
import ContactForm from '@/app/contact/components/ContactForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us — Pawheaven',
  description: 'Get in touch with the Pawheaven team. We are here to help with adoption inquiries, volunteer opportunities, and rescue partnerships.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <ContactHero />
      <ContactForm />
      <Footer />
    </main>
  );
}