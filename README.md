# 🚀 AHSE Tech — Landing Page & Sistema de Agendamiento

Landing page profesional para **AHSE Tech**, una consultoría tecnológica enfocada en:

* Desarrollo de software a medida
* Soporte técnico y mantenimiento
* Capacitación tecnológica
* Asesoría digital para negocios

Incluye un sistema completo de **captación de leads + agendamiento de consultorías gratuitas**.

---

## 🌐 Demo

👉 Próximamente / Deploy en producción

---

## 🧠 Descripción del Proyecto

Este proyecto no es solo una landing page, es un **embudo de conversión completo** diseñado para:

1. Captar atención (Hero dinámico)
2. Mostrar servicios de alto valor
3. Generar confianza (stats + propuesta clara)
4. Convertir visitantes en leads (formulario + agenda)
5. Automatizar seguimiento (emails + base de datos)

---

## ⚙️ Tecnologías Utilizadas

### Frontend

* Next.js 15 (App Router)
* React 19
* TypeScript
* Tailwind CSS

### Backend / Integraciones

* Supabase (Base de datos y auth)
* API Routes (Next.js)
* Nodemailer (envío de correos) 
* Resend (alternativa serverless para emails) 

---

## 🧩 Arquitectura

```
src/
├── app/
│   ├── layout.tsx        # Layout global + SEO
│   ├── page.tsx          # Página principal
│   ├── api/              # Endpoints (emails, etc.)
│
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ui/               # Componentes reutilizables
│
├── sections/
│   ├── HeroSection       # Atracción inicial
│   ├── ServicesSection   # Oferta de valor
│   ├── WhyUsSection      # Diferenciación
│   ├── BookingSection    # Conversión (lead)
│   ├── ContactSection    # Confianza + contacto
```

---

## 🎯 Funcionalidades Clave

### 1. Hero dinámico (alta conversión)

* Slides automáticos con diferentes servicios
* Copy orientado a negocio
* Call to action directo

📄 Referencia: 

---

### 2. Sección de Servicios

* Diseño tipo "bento grid"
* Servicios organizados visualmente
* Enfoque en soluciones reales

📄 Referencia: 

---

### 3. Sección "Por qué elegirnos"

* Contadores animados (credibilidad)
* Propuesta de valor clara
* Diferenciadores:

```txt
✔ Diagnóstico gratis  
✔ Atención personalizada  
✔ Garantía  
✔ Servicio a domicilio  
```

---

### 4. Sistema de Agendamiento (Core del negocio)

Formulario con:

* Validación en tiempo real
* Selección de servicio
* Fecha y hora preferida
* Mensaje adicional

📄 Referencia: 

#### Flujo:

```
Usuario llena formulario
        ↓
Se valida información
        ↓
Se guarda en Supabase (tabla: cita)
        ↓
Se envía email automático
        ↓
Admin recibe lead listo para cerrar venta
```

---

### 5. Sistema de Emails Automatizados

* Confirmación al cliente
* Notificación al administrador
* Diseño profesional HTML

📄 Referencia: 

---

### 6. Contacto y confianza

* Teléfonos clicables
* Cobertura geográfica
* Horarios
* Diseño visual con galería

📄 Referencia: 

---

## 🎨 UI / UX

* Diseño moderno y limpio
* Animaciones con Intersection Observer
* Scroll suave
* Tipografías:

  * Plus Jakarta Sans (display)
  * DM Sans (body)

📄 Referencia estilos: 

---

## 🔐 Variables de Entorno

Crea un archivo `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:4028

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key

# SMTP (emails)
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
ADMIN_EMAIL=
```

---

## 🚀 Instalación

```bash
npm install
npm run dev
```

Abrir en:

```
http://localhost:4028
```

---

## 📦 Scripts Disponibles

```bash
npm run dev        # Desarrollo
npm run build      # Build producción
npm run serve      # Servidor producción
npm run lint       # Linter
npm run format     # Prettier
```

---

## 📈 Enfoque de Negocio

Este proyecto está diseñado para:

* Generar clientes sin inversión en ads
* Convertir tráfico en citas
* Automatizar seguimiento
* Escalar servicios digitales

---

## 🧠 Posibles Mejoras

* Panel admin para ver citas
* Integración con WhatsApp API
* CRM básico
* Pago en línea
* Tracking de conversiones (Google Analytics / Meta Pixel)

---

## 👨‍💻 Autor

**AHSE Tech**
Consultoría tecnológica en Durango, México

---

## 📄 Licencia

MIT

---

## 💡 Nota

Este proyecto no es solo una landing…
Es un **sistema de adquisición de clientes listo para negocio real**.
