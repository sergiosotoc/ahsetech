'use client';
import React, { useState, useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

const heroSlides = [
{
  headline: 'Software\nPersonalizado',
  sub: 'Desarrollamos la solución exacta que tu negocio necesita, sin plantillas genéricas.',
  img: "",
  alt: 'Desarrollador escribiendo código en pantalla oscura con múltiples monitores',
  badge: 'Desarrollo Web & Apps'
},
{
  headline: 'Mantenimiento\nTécnico',
  sub: 'Preventivo y correctivo para computadoras e impresoras. Respuesta el mismo día.',
  img: "",
  alt: 'Técnico reparando placa base de computadora con herramientas de precisión',
  badge: 'Equipos e Impresoras'
},
{
  headline: 'Cursos y\nAsesoría',
  sub: 'Aprende computación, celular y Office desde cero. Clases personalizadas para tu nivel.',
  img: "",
  alt: 'Instructor mostrando pantalla de laptop a estudiante en clase de computación',
  badge: 'Capacitación Digital'
}];


export default function HeroSection() {
  const [active, setActive] = useState(0);
  const [imgVisible, setImgVisible] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const switchSlide = (idx: number) => {
    if (idx === active) return;
    setImgVisible(false);
    setTimeout(() => {
      setActive(idx);
      setImgVisible(true);
    }, 280);
  };

  // Auto-rotate
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % heroSlides.length;
        setImgVisible(false);
        setTimeout(() => setImgVisible(true), 280);
        return next;
      });
    }, 4500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const slide = heroSlides[active];

  return (
    <section
      id="inicio"
      className="min-h-screen pt-16 md:pt-20 px-6 md:px-12 bg-bg flex items-center relative overflow-hidden">
      
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.04] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #00C2A8 0%, transparent 70%)',
          transform: 'translate(30%, -30%)'
        }} />
      
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.03] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #1A2B4A 0%, transparent 70%)',
          transform: 'translate(-30%, 30%)'
        }} />
      

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 py-16 md:py-24">
        {/* Left: stacked titles */}
        <div className="lg:col-span-5 flex flex-col justify-center gap-4 md:gap-6">
          {/* Eyebrow */}
          <div className="flex items-center gap-2">
            <span className="pulse-ring w-2.5 h-2.5 rounded-full bg-accent block" />
            <span className="text-xs font-bold uppercase tracking-widest text-accent font-display">
              Durango, México · Disponible Ahora
            </span>
          </div>

          {/* Swappable headlines */}
          <div className="space-y-2 md:space-y-3">
            {heroSlides.map((s, i) =>
            <button
              key={i}
              onMouseEnter={() => switchSlide(i)}
              onClick={() => switchSlide(i)}
              className={`hero-title block text-left w-full ${i === active ? 'active' : ''}`}
              aria-pressed={i === active}>
              
                <h1
                className="font-display font-black tracking-tighter leading-[0.88] text-primary"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}>
                
                  {s.headline.split('\n').map((line, li) =>
                <span key={li} className="block">{line}</span>
                )}
                </h1>
              </button>
            )}
          </div>

          {/* Sub description */}
          <p
            className="text-muted text-base md:text-lg leading-relaxed max-w-sm transition-all duration-300"
            key={active}>
            
            {slide.sub}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <a
              href="#agendar"
              className="btn-glow bg-accent text-white px-7 py-3.5 rounded-full text-sm font-semibold font-display hover:bg-accent-dark transition-all text-center">
              
              Consultoría Gratis
            </a>
            <a
              href="#servicios"
              className="border border-border text-primary px-7 py-3.5 rounded-full text-sm font-semibold font-display hover:border-accent hover:text-accent transition-all text-center">
              
              Ver Servicios
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex items-center gap-6 mt-2 flex-wrap">
            {[
            { icon: '⚡', label: 'Respuesta el mismo día' },
            { icon: '✓', label: 'Sin costo inicial' },
            { icon: '🔒', label: 'Licencias originales' }].
            map((badge) =>
            <span key={badge.label} className="flex items-center gap-1.5 text-xs text-muted font-medium">
                <span>{badge.icon}</span>
                {badge.label}
              </span>
            )}
          </div>
        </div>

        {/* Right: image + floating card */}
        <div className="lg:col-span-7 relative">
          {/* Main image */}
          <div
            className={`img-mask aspect-[4/3] relative shadow-soft overflow-hidden border border-border transition-all duration-300 ${
            imgVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02]'}`
            }>
            
            <AppImage
              src={slide.img}
              alt={slide.alt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 55vw" />
            
            {/* Gradient overlay bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
          </div>

          {/* Floating info card */}
          <div className="absolute -bottom-6 -left-4 md:-bottom-10 md:-left-10 z-20 bg-white p-5 md:p-8 rounded-4xl shadow-soft border border-border max-w-[260px] md:max-w-[300px] float-anim">
            <p className="text-[10px] font-black text-accent uppercase tracking-widest mb-2 font-display">
              {slide.badge}
            </p>
            <p className="text-sm md:text-base font-bold leading-snug text-primary font-display">
              Soluciones tecnológicas a tu medida en Durango
            </p>
            <div className="mt-3 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-accent-light flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 1L7.5 4.5H11L8.5 6.5L9.5 10L6 8L2.5 10L3.5 6.5L1 4.5H4.5L6 1Z" fill="#00C2A8" />
                </svg>
              </div>
              <span className="text-xs text-muted font-medium">+50 clientes satisfechos</span>
            </div>
          </div>

          {/* Active slide indicator dots */}
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            {heroSlides.map((_, i) =>
            <button
              key={i}
              onClick={() => switchSlide(i)}
              className={`rounded-full transition-all duration-300 ${
              i === active ?
              'w-6 h-2 bg-accent' : 'w-2 h-2 bg-white/60 hover:bg-white'}`
              }
              aria-label={`Slide ${i + 1}`} />

            )}
          </div>
        </div>
      </div>
    </section>);

}