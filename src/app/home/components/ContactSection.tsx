'use client';
import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

const contactItems = [
{
  icon: 'PhoneIcon',
  label: 'Teléfono principal',
  value: '618 149 8960',
  href: 'tel:6181498960',
  sub: 'Llamadas y WhatsApp'
},
{
  icon: 'PhoneIcon',
  label: 'Teléfono alternativo',
  value: '618 109 6537',
  href: 'tel:6181096537',
  sub: 'Llamadas y WhatsApp'
},
{
  icon: 'ClockIcon',
  label: 'Horario de atención',
  value: 'Lun–Vie, 9am–5pm',
  href: null,
  sub: 'Sabados con cita previa'
},
{
  icon: 'MapPinIcon',
  label: 'Cobertura',
  value: 'Durango, Dgo.',
  href: null,
  sub: 'También atención por videollamada'
}];


const galleryImages = [
{
  src: "",
  alt: 'Reunión de equipo técnico revisando equipos de cómputo en oficina',
  rotation: '-4deg',
  zIndex: 50,
  offset: { x: -200, y: 10 }
},
{
  src: "",
  alt: 'Pantalla con código de programación en entorno de desarrollo',
  rotation: '2deg',
  zIndex: 40,
  offset: { x: -60, y: 25 }
},
{
  src: "",
  alt: 'Laptop con pantalla de código abierta sobre escritorio',
  rotation: '-1deg',
  zIndex: 30,
  offset: { x: 80, y: 5 }
},
{
  src: "",
  alt: 'Taller de capacitación tecnológica con instructor y grupo de alumnos',
  rotation: '3deg',
  zIndex: 20,
  offset: { x: 220, y: 30 }
}];


export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="py-24 md:py-32 px-6 md:px-12 bg-bg relative overflow-hidden">
      
      {/* Grid background */}
      <div className="gallery-grid-bg" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`
          }>
          
          <p className="text-xs font-black uppercase tracking-widest text-accent font-display mb-3">
            Contáctanos
          </p>
          <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight text-primary leading-none mb-4">
            Estamos en{' '}
            <span className="text-accent">Durango</span>
            <br />y listos para ayudarte
          </h2>
          <p className="text-muted text-base max-w-md mx-auto">
            Escríbenos, llámanos o agenda tu consulta. Respondemos en menos de 2 horas.
          </p>
        </div>

        {/* Photo gallery (stacked) */}
        <div
          className={`relative h-[300px] w-full hidden md:flex items-center justify-center mb-20 transition-all duration-700 delay-100 ${
          visible ? 'opacity-100' : 'opacity-0'}`
          }>
          
          {galleryImages.map((img, i) =>
          <div
            key={i}
            className="absolute w-[200px] h-[160px] transition-transform duration-300 hover:scale-110 hover:z-[100] cursor-pointer"
            style={{
              transform: `translate(${img.offset.x}px, ${img.offset.y}px) rotate(${img.rotation})`,
              zIndex: img.zIndex
            }}>
            
              <AppImage
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover rounded-2xl shadow-soft"
              sizes="200px" />
            
            </div>
          )}
        </div>

        {/* Contact cards */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-700 delay-200 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`
          }>
          
          {contactItems.map((item) =>
          <div
            key={item.label}
            className="bg-white rounded-3xl border border-border p-6 hover:border-accent hover:shadow-soft transition-all duration-300 group">
            
              <div className="w-10 h-10 bg-accent-light rounded-2xl flex items-center justify-center mb-4 group-hover:bg-accent transition-colors">
                <Icon
                name={item.icon as Parameters<typeof Icon>[0]['name']}
                size={18}
                className="text-accent group-hover:text-white transition-colors"
                variant="solid" />
              
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted font-display mb-1">
                {item.label}
              </p>
              {item.href ?
            <a
              href={item.href}
              className="block text-base font-bold text-primary hover:text-accent transition-colors font-display">
              
                  {item.value}
                </a> :

            <p className="text-base font-bold text-primary font-display">{item.value}</p>
            }
              <p className="text-xs text-muted mt-1">{item.sub}</p>
            </div>
          )}
        </div>

        {/* Final CTA strip */}
        <div
          className={`mt-12 bg-primary rounded-4xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-700 delay-300 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`
          }>
          
          <div>
            <h3 className="font-display font-black text-2xl md:text-3xl text-white leading-tight mb-2">
              ¿Listo para resolver tu problema tecnológico?
            </h3>
            <p className="text-white/60 text-sm">
              Primera consulta gratis · Sin contratos · Atención en Durango
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="#agendar"
              className="bg-accent text-white px-7 py-3.5 rounded-full text-sm font-bold font-display hover:bg-accent-dark transition-all btn-glow text-center whitespace-nowrap">
              
              Agendar Ahora
            </a>
            <a
              href="https://wa.me/526181498960"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 border border-white/20 text-white px-7 py-3.5 rounded-full text-sm font-bold font-display hover:bg-white/20 transition-all text-center whitespace-nowrap">
              
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>);

}