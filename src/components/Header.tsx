'use client';
import React, { useState, useEffect } from 'react';

import AppLogo from '@/components/ui/AppLogo';

const navLinks = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-border shadow-soft'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <AppLogo
            size={36}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />
          <span className="font-display font-800 text-lg tracking-tight text-primary hidden sm:block">
            AHSE Tech
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="nav-link hover:text-primary transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:6181498960"
            className="text-sm font-medium text-muted hover:text-primary transition-colors"
          >
            618 149 8960
          </a>
          <button
            onClick={() => handleNavClick('#agendar')}
            className="bg-accent text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-accent-dark transition-all btn-glow font-display"
          >
            Consultoría Gratis
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-accent-light transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {menuOpen ? (
              <path d="M4 4L18 18M18 4L4 18" stroke="#1A2B4A" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <>
                <path d="M3 6H19M3 11H19M3 16H19" stroke="#1A2B4A" strokeWidth="2" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-b border-border px-6 pb-6 pt-2 space-y-4">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="block w-full text-left text-base font-medium text-primary py-2 hover:text-accent transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('#agendar')}
            className="w-full bg-accent text-white py-3 rounded-full text-sm font-semibold font-display"
          >
            Consultoría Gratis — 30 min
          </button>
        </div>
      )}
    </header>
  );
}