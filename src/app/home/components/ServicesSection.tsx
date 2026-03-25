'use client';
import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const services = [
  {
    icon: 'CodeBracketIcon',
    title: 'Desarrollo de Software',
    desc: 'Aplicaciones web y de escritorio hechas a la medida de tu negocio. Desde cotizadores hasta sistemas de gestión.',
    color: 'bg-[rgba(0,194,168,0.1)]',
    textColor: 'text-accent',
    span: 'md:col-span-2',
    rotate: 'hover:rotate-1',
    size: 'h-[280px]',
  },
  {
    icon: 'WrenchScrewdriverIcon',
    title: 'Mantenimiento de Equipos',
    desc: 'Correctivo y preventivo para computadoras e impresoras. Diagnóstico gratis.',
    color: 'bg-[rgba(26,43,74,0.07)]',
    textColor: 'text-primary',
    span: 'md:col-span-1',
    rotate: 'hover:-rotate-2',
    size: 'h-[280px]',
  },
  {
    icon: 'AcademicCapIcon',
    title: 'Cursos Básicos',
    desc: 'Computadora, celular y Office. Clases personalizadas para adultos y principiantes.',
    color: 'bg-[rgba(251,191,36,0.12)]',
    textColor: 'text-amber-600',
    span: 'md:col-span-1',
    rotate: 'hover:rotate-2',
    size: 'h-[280px]',
  },
  {
    icon: 'ShoppingCartIcon',
    title: 'Asesoría en Compra de Equipos',
    desc: 'Te orientamos para elegir la computadora o impresora ideal según tu presupuesto y necesidad.',
    color: 'bg-[rgba(139,92,246,0.1)]',
    textColor: 'text-violet-600',
    span: 'md:col-span-1',
    rotate: 'hover:-rotate-1',
    size: 'h-[280px]',
  },
  {
    icon: 'WindowIcon',
    title: 'Instalación de Office con Licencia',
    desc: 'Word, Excel, PowerPoint y más. Licencias originales, activación garantizada.',
    color: 'bg-[rgba(244,63,94,0.1)]',
    textColor: 'text-rose-500',
    span: 'md:col-span-1',
    rotate: 'hover:rotate-1',
    size: 'h-[280px]',
  },
  {
    icon: 'ArrowDownTrayIcon',
    title: 'Instalación de Programas',
    desc: 'Antivirus, diseño, contabilidad, AutoCAD y cualquier software que necesites.',
    color: 'bg-[rgba(16,185,129,0.1)]',
    textColor: 'text-emerald-600',
    span: 'md:col-span-1',
    rotate: 'hover:-rotate-2',
    size: 'h-[280px]',
  },
  {
    icon: 'PhotoIcon',
    title: 'Diseño de Posts para Redes Sociales',
    desc: 'Contenido visual profesional para Facebook, Instagram y WhatsApp. Precios accesibles.',
    color: 'bg-[rgba(0,194,168,0.1)]',
    textColor: 'text-accent',
    span: 'md:col-span-2',
    rotate: 'hover:rotate-1',
    size: 'h-[240px]',
  },
  {
    icon: 'ArrowPathIcon',
    title: 'Formateo de Laptop y PC',
    desc: 'Limpieza total del sistema, instalación de Windows original, respaldo de datos incluido.',
    color: 'bg-[rgba(26,43,74,0.07)]',
    textColor: 'text-primary',
    span: 'md:col-span-1',
    rotate: 'hover:-rotate-1',
    size: 'h-[240px]',
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el) => {
              el.classList.add('visible');
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="servicios" ref={sectionRef} className="py-24 md:py-32 px-6 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 reveal">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-accent font-display mb-3">
              Nuestros Servicios
            </p>
            <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight text-primary leading-none">
              Todo lo que tu negocio<br />
              <span className="text-accent">necesita en tecnología</span>
            </h2>
          </div>
          <p className="text-muted text-base max-w-xs leading-relaxed">
            Un solo aliado para hardware, software, capacitación y diseño digital.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${Math.min(i + 1, 5)} bento-card ${service.color} ${service.span} ${service.size} rounded-4xl flex flex-col justify-between px-7 py-8 ${service.rotate} transition-all duration-300 cursor-default relative overflow-hidden group`}
            >
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer rounded-4xl" />

              <div className={`w-10 h-10 rounded-2xl ${service.color} flex items-center justify-center relative z-10`}>
                <Icon
                  name={service.icon as Parameters<typeof Icon>[0]['name']}
                  size={22}
                  className={service.textColor}
                  variant="outline"
                />
              </div>

              <div className="relative z-10">
                <h3 className={`font-display font-bold text-lg mb-2 ${service.textColor === 'text-accent' ? 'text-primary' : 'text-primary'}`}>
                  {service.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center reveal reveal-delay-3">
          <p className="text-muted text-sm mb-4">¿No ves lo que buscas? Contáctanos, seguro podemos ayudarte.</p>
          <a
            href="#agendar"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-full text-sm font-semibold font-display hover:bg-primary-light transition-all btn-glow"
          >
            <span>Agenda una consulta gratuita</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}