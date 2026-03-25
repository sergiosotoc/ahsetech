'use client';
import React, { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 50, suffix: '+', label: 'Clientes atendidos', desc: 'Empresas y personas en Durango' },
  { value: 5, suffix: ' años', label: 'De experiencia', desc: 'En soporte y desarrollo tecnológico' },
  { value: 98, suffix: '%', label: 'Satisfacción', desc: 'En resolución de problemas técnicos' },
];

function useCounter(target: number, started: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);
  return count;
}

function StatCard({ value, suffix, label, desc, started }: typeof stats[0] & { started: boolean }) {
  const count = useCounter(value, started);
  return (
    <div className="p-8 border-l-4 border-accent bg-accent-light/40 rounded-r-3xl">
      <p className="font-display font-black text-5xl md:text-6xl text-primary mb-1 counter-value">
        {count}{suffix}
      </p>
      <p className="font-bold text-sm text-primary uppercase tracking-widest font-display mb-1">{label}</p>
      <p className="text-muted text-sm">{desc}</p>
    </div>
  );
}

export default function WhyUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStarted(true);
            setVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="nosotros"
      ref={sectionRef}
      className="py-24 md:py-32 px-6 md:px-12 bg-bg"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-16">
          {/* Left: manifesto */}
          <div className={`flex-1 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-xs font-black uppercase tracking-widest text-accent font-display mb-6">
              Por qué elegirnos
            </p>
            <h2
              className="font-display font-semibold text-2xl md:text-4xl leading-[1.2] text-primary mb-8"
              style={{ lineHeight: '1.3' }}
            >
              Somos el equipo técnico que{' '}
              <span className="highlight-span text-accent border-accent">
                responde rápido
              </span>{' '}
              y resuelve de verdad. Sin rodeos, sin letra chica,{' '}
              <span className="highlight-span text-violet-600 border-violet-400">
                con precios justos
              </span>{' '}
              para negocios y familias en{' '}
              <span className="highlight-span text-amber-600 border-amber-400">
                Durango.
              </span>
            </h2>

            <div className="space-y-4 text-muted text-base leading-relaxed max-w-md">
              <p>
                Atendemos desde la computadora de tu casa hasta el servidor de tu empresa. 
                Presencialmente o por videollamada.
              </p>
              <p>
                Nuestro compromiso: si no resolvemos tu problema, no cobramos.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                'Atención personalizada',
                'Garantía en trabajos',
                'Diagnóstico sin costo',
                'Servicio a domicilio',
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-white border border-border rounded-full text-sm font-medium text-primary hover:border-accent hover:text-accent transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right: stats */}
          <div
            className={`w-full lg:w-[360px] space-y-4 transition-all duration-700 delay-200 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} started={started} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}