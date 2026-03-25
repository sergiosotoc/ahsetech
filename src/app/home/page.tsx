import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import WhyUsSection from './components/WhyUsSection';
import BookingSection from './components/BookingSection';
import ContactSection from './components/ContactSection';

export default function HomePage() {
  return (
    <div className="grain-overlay">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <WhyUsSection />
        <BookingSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}