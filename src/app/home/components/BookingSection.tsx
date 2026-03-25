'use client';
import React, { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import { createClient } from '../../../lib/supabase/client';

type FormData = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  preferredDate: string;
  preferredTime: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const serviceOptions = [
  'Desarrollo de Software',
  'Mantenimiento de Equipos',
  'Cursos Básicos',
  'Asesoría en Compra de Equipos',
  'Instalación de Office con Licencia',
  'Instalación de Programas',
  'Diseño de Posts para Redes Sociales',
  'Formateo de Laptop/PC',
  'Otro / No estoy seguro',
];

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '02:00 PM', '03:00 PM',
  '04:00 PM', '05:00 PM',
];

const PHONE_REGEX = /^[\d\s\-\+\(\)]{7,15}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm(form: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!form.name.trim()) {
    errors.name = 'El nombre es obligatorio.';
  } else if (form.name.trim().length < 2) {
    errors.name = 'El nombre debe tener al menos 2 caracteres.';
  }

  if (!form.phone.trim()) {
    errors.phone = 'El teléfono / WhatsApp es obligatorio.';
  } else if (!PHONE_REGEX.test(form.phone.trim())) {
    errors.phone = 'Ingresa un número de teléfono válido (7-15 dígitos).';
  }

  if (form.email.trim() && !EMAIL_REGEX.test(form.email.trim())) {
    errors.email = 'Ingresa un correo electrónico válido.';
  }

  if (!form.service) {
    errors.service = 'Selecciona el servicio que necesitas.';
  }

  return errors;
}

export default function BookingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [form, setForm] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
    preferredDate: '',
    preferredTime: '',
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear field error on change if field was already touched
    if (touched[name as keyof FormData]) {
      const updated = { ...form, [name]: value };
      const newErrors = validateForm(updated);
      setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormData] }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validateForm(form);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormData] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Mark all fields as touched and validate
    const allTouched: Partial<Record<keyof FormData, boolean>> = {
      name: true, phone: true, email: true, service: true,
      message: true, preferredDate: true, preferredTime: true,
    };
    setTouched(allTouched);

    const validationErrors = validateForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.from('cita').insert({
        nombre: form.name.trim(),
        telefono: form.phone.trim(),
        email: form.email.trim() || null,
        servicio: form.service,
        mensaje: form.message.trim() || null,
        fecha_preferida: form.preferredDate || null,
        hora_preferida: form.preferredTime || null,
        estado: 'pendiente',
      });

      if (error) {
        console.error('Supabase insert error:', error.message);
        setSubmitError('Ocurrió un error al enviar tu solicitud. Por favor intenta de nuevo.');
        setLoading(false);
        return;
      }

      // Send emails via SMTP (fire-and-forget — don't block success state)
      try {
        await fetch('/api/send-cita-emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre: form.name.trim(),
            telefono: form.phone.trim(),
            email: form.email.trim() || null,
            servicio: form.service,
            mensaje: form.message.trim() || null,
            fecha_preferida: form.preferredDate || null,
            hora_preferida: form.preferredTime || null,
          }),
        });
      } catch (emailErr) {
        // Email failure should not block the success state
        console.warn('Email sending failed (non-blocking):', emailErr);
      }

      setLoading(false);
      setSubmitted(true);
    } catch (err: any) {
      console.error('Unexpected error:', err?.message);
      setSubmitError('Ocurrió un error inesperado. Por favor intenta de nuevo.');
      setLoading(false);
    }
  };

  // Get tomorrow as min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const inputClass = (field: keyof FormData) =>
    `form-input w-full bg-white border rounded-xl px-4 py-3 text-sm text-primary placeholder-muted transition-colors ${
      touched[field] && errors[field]
        ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
        : touched[field] && !errors[field] && form[field]
        ? 'border-accent focus:border-accent' :'border-border'
    }`;

  return (
    <section
      id="agendar"
      ref={sectionRef}
      className="py-24 md:py-32 px-6 md:px-12 bg-white relative overflow-hidden"
    >
      {/* Background blob */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.05]"
        style={{
          background: 'radial-gradient(circle, #00C2A8 0%, transparent 70%)',
          transform: 'translate(40%, -40%)',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: pitch */}
          <div
            className={`transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent-light border border-accent/30 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-accent block pulse-ring" />
              <span className="text-xs font-bold text-accent uppercase tracking-widest font-display">
                Gratis · Sin Compromiso
              </span>
            </div>

            <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight text-primary leading-none mb-6">
              Consultoría<br />
              <span className="text-accent">gratuita</span><br />
              de 30 minutos
            </h2>

            <p className="text-muted text-base md:text-lg leading-relaxed mb-8 max-w-md">
              Cuéntanos tu problema o idea. En 30 minutos te decimos exactamente qué necesitas y cuánto cuesta. Sin rodeos.
            </p>

            {/* What to expect */}
            <div className="space-y-4">
              {[
                { icon: 'CheckCircleIcon', text: 'Diagnóstico honesto de tu situación tecnológica' },
                { icon: 'CheckCircleIcon', text: 'Propuesta clara con tiempos y costos reales' },
                { icon: 'CheckCircleIcon', text: 'Sin presión de venta — tú decides si continúas' },
                { icon: 'CheckCircleIcon', text: 'Videollamada o presencial en Durango' },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3">
                  <Icon
                    name={item.icon as Parameters<typeof Icon>[0]['name']}
                    size={18}
                    className="text-accent mt-0.5 shrink-0"
                    variant="solid"
                  />
                  <span className="text-sm text-muted leading-relaxed">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Phone quick contact */}
            <div className="mt-10 p-5 bg-bg rounded-3xl border border-border">
              <p className="text-xs font-bold uppercase tracking-widest text-muted font-display mb-3">
                ¿Prefieres llamar directo?
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href="tel:6181498960"
                  className="flex items-center gap-3 text-primary font-semibold hover:text-accent transition-colors"
                >
                  <Icon name="PhoneIcon" size={16} className="text-accent" variant="solid" />
                  618 149 8960
                </a>
                <a
                  href="tel:6181096537"
                  className="flex items-center gap-3 text-primary font-semibold hover:text-accent transition-colors"
                >
                  <Icon name="PhoneIcon" size={16} className="text-accent" variant="solid" />
                  618 109 6537
                </a>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div
            className={`transition-all duration-700 delay-200 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {submitted ? (
              <div className="bg-accent-light border border-accent/30 rounded-4xl p-12 text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6 pulse-ring">
                  <Icon name="CheckIcon" size={28} className="text-white" variant="solid" />
                </div>
                <h3 className="font-display font-black text-2xl text-primary mb-3">
                  ¡Solicitud enviada!
                </h3>
                <p className="text-muted text-base leading-relaxed mb-2">
                  Te contactaremos en menos de 2 horas para confirmar tu cita.
                </p>
                <p className="text-muted text-sm leading-relaxed mb-6">
                  Revisa tu WhatsApp o correo electrónico.
                </p>
                <div className="flex items-center justify-center gap-2 text-accent mb-6">
                  <Icon name="CheckCircleIcon" size={16} className="text-accent" variant="solid" />
                  <span className="text-sm font-semibold">Cita registrada correctamente</span>
                </div>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', phone: '', email: '', service: '', message: '', preferredDate: '', preferredTime: '' });
                    setErrors({});
                    setTouched({});
                    setSubmitError(null);
                  }}
                  className="text-sm text-accent font-semibold hover:underline"
                >
                  Enviar otra solicitud
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-bg rounded-4xl border border-border p-8 space-y-5"
              >
                <h3 className="font-display font-bold text-xl text-primary">
                  Agenda tu consulta gratis
                </h3>

                {/* Global submit error */}
                {submitError && (
                  <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                    <Icon name="ExclamationCircleIcon" size={16} className="text-red-500 mt-0.5 shrink-0" variant="solid" />
                    <p className="text-sm text-red-600">{submitError}</p>
                  </div>
                )}

                {/* Name + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-primary mb-1.5 font-display uppercase tracking-wide">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Tu nombre completo"
                      className={inputClass('name')}
                    />
                    {touched.name && errors.name && (
                      <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                        <Icon name="ExclamationCircleIcon" size={12} className="text-red-500 shrink-0" variant="solid" />
                        {errors.name}
                      </p>
                    )}
                    {touched.name && !errors.name && form.name && (
                      <p className="mt-1.5 text-xs text-accent flex items-center gap-1">
                        <Icon name="CheckCircleIcon" size={12} className="text-accent shrink-0" variant="solid" />
                        Perfecto
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-primary mb-1.5 font-display uppercase tracking-wide">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="618 000 0000"
                      className={inputClass('phone')}
                    />
                    {touched.phone && errors.phone && (
                      <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                        <Icon name="ExclamationCircleIcon" size={12} className="text-red-500 shrink-0" variant="solid" />
                        {errors.phone}
                      </p>
                    )}
                    {touched.phone && !errors.phone && form.phone && (
                      <p className="mt-1.5 text-xs text-accent flex items-center gap-1">
                        <Icon name="CheckCircleIcon" size={12} className="text-accent shrink-0" variant="solid" />
                        Perfecto
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-primary mb-1.5 font-display uppercase tracking-wide">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="tu@correo.com (opcional)"
                    className={inputClass('email')}
                  />
                  {touched.email && errors.email && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <Icon name="ExclamationCircleIcon" size={12} className="text-red-500 shrink-0" variant="solid" />
                      {errors.email}
                    </p>
                  )}
                  {touched.email && !errors.email && form.email && (
                    <p className="mt-1.5 text-xs text-accent flex items-center gap-1">
                      <Icon name="CheckCircleIcon" size={12} className="text-accent shrink-0" variant="solid" />
                      Correo válido
                    </p>
                  )}
                </div>

                {/* Service */}
                <div>
                  <label className="block text-xs font-semibold text-primary mb-1.5 font-display uppercase tracking-wide">
                    ¿En qué podemos ayudarte? *
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={inputClass('service')}
                  >
                    <option value="">Selecciona un servicio...</option>
                    {serviceOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {touched.service && errors.service && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <Icon name="ExclamationCircleIcon" size={12} className="text-red-500 shrink-0" variant="solid" />
                      {errors.service}
                    </p>
                  )}
                </div>

                {/* Date + Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-primary mb-1.5 font-display uppercase tracking-wide">
                      Fecha preferida
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={form.preferredDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      min={minDate}
                      className={inputClass('preferredDate')}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-primary mb-1.5 font-display uppercase tracking-wide">
                      Horario preferido
                    </label>
                    <select
                      name="preferredTime"
                      value={form.preferredTime}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={inputClass('preferredTime')}
                    >
                      <option value="">Selecciona horario...</option>
                      {timeSlots.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-primary mb-1.5 font-display uppercase tracking-wide">
                    Cuéntanos más (opcional)
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={3}
                    placeholder="Describe brevemente tu situación o lo que necesitas..."
                    className={`form-input w-full bg-white border border-border rounded-xl px-4 py-3 text-sm text-primary placeholder-muted resize-none transition-colors`}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-accent text-white py-4 rounded-full text-sm font-bold font-display hover:bg-accent-dark transition-all btn-glow disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    <>Solicitar Consultoría Gratis</>
                  )}
                </button>

                <p className="text-xs text-muted text-center">
                  Al enviar, aceptas que te contactemos por WhatsApp o correo para confirmar tu cita.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}