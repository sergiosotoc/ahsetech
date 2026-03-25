import React from 'react';
import AppLogo from '@/components/ui/AppLogo';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo + brand */}
        <div className="flex items-center gap-2">
          <AppLogo size={28} />
          <span className="font-display font-semibold text-sm text-primary">AHSE Tech</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm font-medium text-muted">
          <a href="#servicios" className="hover:text-primary transition-colors">Servicios</a>
          <a href="#nosotros" className="hover:text-primary transition-colors">Nosotros</a>
          <a href="#agendar" className="hover:text-primary transition-colors">Agendar</a>
          <a href="#contacto" className="hover:text-primary transition-colors">Contacto</a>
        </div>

        {/* Copyright */}
        <div className="flex items-center gap-4 text-sm text-muted">
          <span>© 2026 AHSE Tech</span>
          <span className="text-border">·</span>
          <a href="#" className="hover:text-primary transition-colors">Privacidad</a>
          <span className="text-border">·</span>
          <a href="#" className="hover:text-primary transition-colors">Términos</a>
        </div>
      </div>
    </footer>
  );
}