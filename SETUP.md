# 🚀 BoatCheckPro - Landing Page Setup & Deployment Guide

## 📋 Contenido

- [Estructura del Proyecto](#estructura-del-proyecto)
- [Archivos de la Landing Page](#archivos-de-la-landing-page)
- [Requisitos Previos](#requisitos-previos)
- [Opciones de Hosting](#opciones-de-hosting)
- [Configuración de Dominio](#configuración-de-dominio)
- [Deploy en Vercel (Recomendado)](#deploy-en-vercel-recomendado)
- [Deploy en Hosting Tradicional](#deploy-en-hosting-tradicional)
- [Configuración de Email](#configuración-de-email)
- [Testing y QA](#testing-y-qa)
- [Post-Launch Checklist](#post-launch-checklist)

---

## 📁 Estructura del Proyecto

```
boatcheckpro/
├── landing-page/           # Landing page HTML/CSS
│   ├── index.html         # Archivo principal (responsive)
│   ├── styles.css         # Estilos separados
│   ├── app.js            # JavaScript de funcionalidad
│   └── robots.txt        # SEO: robots crawler config
│
├── README.md             # Documentación general del proyecto
├── TECH_SPEC.md         # Especificaciones técnicas
└── SETUP.md             # Este archivo
```

---

## 📄 Archivos de la Landing Page

### 1. **index.html**
- HTML semántico y accesible
- Responsive (mobile, tablet, desktop)
- Optimizado para SEO
- Meta tags completos
- Favicon integrado
- Secciones:
  - Header/Hero con CTA principal
  - Problema (pain points)
  - Solución (value proposition)
  - Cómo funciona (proceso)
  - Precios
  - Formulario de solicitud
  - Footer

### 2. **styles.css**
- Estilos separados del HTML
- Responsive design con media queries
- Variables CSS para fácil customización
- Animaciones suaves
- Accesibilidad mejorada
- Hover states y transiciones

### 3. **app.js**
- Manejo del formulario sin librerías externas
- Validación del lado del cliente
- Integración con API (configurable)
- Mensajes de éxito/error
- Smooth scroll
- Analytics tracking hooks

---

## ⚙️ Requisitos Previos

### Información Necesaria
- [ ] Dominio (anayalvaro.com/boatcheckpro O subdominio nuevo)
- [ ] Email para formulario: info@boatcheckpro.es
- [ ] Teléfono de contacto (actualizar en footer)
- [ ] API Backend URL (cuando esté lista)
- [ ] Cuenta de email marketing (Mailchimp/Brevo/SendGrid)

### Personalizaciones Necesarias
- [ ] Actualizar teléfono en footer (line en HTML)
- [ ] Actualizar email en footer
- [ ] Personalizar mensaje de éxito en app.js
- [ ] Configurar API URL en app.js

---

## 🌐 Opciones de Hosting

### Opción 1: Vercel (⭐ RECOMENDADO)
**Pros:**
- Hosting gratuito con dominio propio
- Automático con Git (push = deploy)
- CDN global incluido
- SSL gratis
- Analytics incluido
- Muy fácil

**Cons:**
- Requiere cuenta GitHub

**Coste:** Gratuito (plan hobby)

---

### Opción 2: Netlify
**Pros:**
- Similar a Vercel
- Formularios nativos (alternativa al backend)
- Muy fácil de usar

**Cons:**
- Menos performante que Vercel

**Coste:** Gratuito (plan básico)

---

### Opción 3: Tu hosting actual (anayalvaro.com)
**Pros:**
- Ya tienes el dominio
- Control total

**Cons:**
- Requiere FTP/SSH
- Sin CDN (más lento)
- Más manual

**Coste:** Costo del hosting existente

---

### Opción 4: Cloudflare Pages
**Pros:**
- Gratuito
- CDN rápido
- Buen soporte

**Cons:**
- Menos features que Vercel

**Coste:** Gratuito

---

## 🔗 Configuración de Dominio

### Si usas Vercel con nuevo subdominio

**Paso 1: Crear cuenta en Vercel**
1. Ve a https://vercel.com
2. Crea cuenta (conecta GitHub si quieres auto-deploy)

**Paso 2: Importar proyecto**
1. Click en "Add New..." > "Project"
2. Importa el repo o sube los archivos
3. Vercel te da una URL automática (ej: `boatcheckpro.vercel.app`)

**Paso 3: Configurar dominio personalizado**
1. En Vercel > Project Settings > Domains
2. Añade `boatcheckpro.anayalvaro.com`
3. Vercel te da instrucciones de DNS

**Paso 4: Actualizar DNS en tu proveedor (GoDaddy, Namecheap, etc.)**
```
Añade un registro CNAME:
Nombre: boatcheckpro
Apunta a: cname.vercel-dns.com.
```

**Tiempo:** 24-48h para propagación DNS

---

### Si usas anayalvaro.com/boatcheckpro (Subdirectorio)

**Requisite:** Acceso FTP/SSH a tu hosting

```bash
# 1. Conectar por SSH/FTP
sftp user@anayalvaro.com

# 2. Crear carpeta
mkdir boatcheckpro

# 3. Subir archivos
upload landing-page/index.html boatcheckpro/
upload landing-page/styles.css boatcheckpro/
upload landing-page/app.js boatcheckpro/
```

**Acceso:** `https://anayalvaro.com/boatcheckpro`

---

## 🚀 Deploy en Vercel (Recomendado)

### Método 1: Vercel CLI (Más Fácil)

```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Entrar en carpeta del proyecto
cd /workspace/boatcheckpro/landing-page

# 3. Deploy
vercel

# Seguir las preguntas:
# - Project name: boatcheckpro
# - Root: ./
# - Build: No (es HTML estático)
# - Output: ./

# El CLI te da la URL
```

### Método 2: Git + Vercel (Automático)

```bash
# 1. Crear repo en GitHub
git init
git add .
git commit -m "Initial landing page"
git push origin main

# 2. En Vercel.com:
# - Conecta tu GitHub
# - Selecciona el repo
# - Click "Deploy"
# - Listo! Cada push = deploy automático
```

### Método 3: Subir Archivos Directamente

1. Ve a https://vercel.com/new
2. Click "Import Project" > "Other"
3. Sube una carpeta ZIP con los archivos
4. Vercel despliega automáticamente

---

## 💾 Deploy en Hosting Tradicional

Si prefieres tu hosting actual:

```bash
# 1. Conectar al servidor
sftp user@anayalvaro.com
# o
ssh user@anayalvaro.com

# 2. Crear carpeta
mkdir -p public_html/boatcheckpro

# 3. Subir archivos
scp landing-page/index.html user@anayalvaro.com:public_html/boatcheckpro/
scp landing-page/styles.css user@anayalvaro.com:public_html/boatcheckpro/
scp landing-page/app.js user@anayalvaro.com:public_html/boatcheckpro/

# 4. Dar permisos
chmod 644 public_html/boatcheckpro/*
chmod 755 public_html/boatcheckpro/

# 5. Acceso
https://anayalvaro.com/boatcheckpro
```

---

## 📧 Configuración de Email

### Configuración del Formulario

El formulario ahora está listo para integración. Hay 3 opciones:

#### Opción A: Mailto simple (No recomendada para producción)
```html
<form action="mailto:info@boatcheckpro.es" method="POST">
```
**Pros:** Funciona sin backend  
**Cons:** No es profesional, no hay confirmación

---

#### Opción B: Mailchimp (Gratuito)

**Paso 1: Crear cuenta**
1. Ve a https://mailchimp.com
2. Crea cuenta gratuita
3. Crea una audiencia llamada "BoatCheckPro"

**Paso 2: Obtener API Key**
1. Account > Integrations > API keys
2. Copia tu API Key
3. Copia el servidor (ej: us5)

**Paso 3: Actualizar app.js**
```javascript
// En app.js, en la función handleFormSubmit:
const response = await fetch(
    `https://us5.api.mailchimp.com/3.0/lists/{LIST_ID}/members`,
    {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa('anystring:' + API_KEY),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email_address: data.email,
            status: 'subscribed',
            merge_fields: {
                FNAME: data.name,
                PHONE: data.phone,
            }
        }),
    }
);
```

---

#### Opción C: SendGrid (Recomendado)

**Paso 1: Crear cuenta**
1. Ve a https://sendgrid.com
2. Crea cuenta (100 emails/día gratis)
3. Valida tu dominio

**Paso 2: Obtener API Key**
1. Settings > API Keys
2. Crea una key nueva
3. Copia la key

**Paso 3: Backend simple (Node.js)**
```javascript
// backend/api/submit-inspection.js
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = async (req, res) => {
    const { name, email, phone, boat_type, length, location, date, comments } = req.body;
    
    try {
        await sgMail.send({
            to: 'info@boatcheckpro.es',
            from: 'noreply@boatcheckpro.es',
            subject: `Nueva solicitud de inspección de ${name}`,
            html: `
                <h2>Nueva Solicitud de Inspección</h2>
                <p><strong>Nombre:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Teléfono:</strong> ${phone}</p>
                <p><strong>Tipo de barco:</strong> ${boat_type}</p>
                <p><strong>Eslora:</strong> ${length}m</p>
                <p><strong>Ubicación:</strong> ${location}</p>
                <p><strong>Fecha preferida:</strong> ${date || 'No especificada'}</p>
                <p><strong>Comentarios:</strong> ${comments || 'Ninguno'}</p>
            `,
        });
        
        // Email de confirmación al cliente
        await sgMail.send({
            to: email,
            from: 'noreply@boatcheckpro.es',
            subject: 'Solicitud de inspección recibida - BoatCheckPro',
            html: `
                <h2>¡Hola ${name}!</h2>
                <p>Hemos recibido tu solicitud de inspección.</p>
                <p>Nos pondremos en contacto contigo en las próximas 24 horas para confirmar los detalles.</p>
                <p>Saludos,<br>Equipo BoatCheckPro</p>
            `,
        });
        
        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error sending email' });
    }
};
```

**Paso 4: Actualizar app.js para usar backend**
```javascript
// En handleFormSubmit:
const response = await fetch('/api/submit-inspection', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
});
```

---

#### Opción D: Brevo (ex-Sendinblue)

Similar a SendGrid, muy bueno en Europa.

---

## 🧪 Testing y QA

### Checklist de Testing

#### Desktop
- [ ] Chrome/Edge (Windows)
- [ ] Safari (Mac)
- [ ] Firefox (cualquiera)
- [ ] Scroll smooth funciona
- [ ] Botones CTA funcionan
- [ ] Formulario valida (campos requeridos)
- [ ] Links internos funcionan (#solicitar)

#### Mobile
- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] Tablet (iPad)
- [ ] Responsive correctamente
- [ ] Form es usable en móvil
- [ ] Botones CTA son clickeables
- [ ] Texto legible sin zoom

#### Performance
- [ ] PageSpeed Insights > 80
- [ ] Time to First Byte < 1s
- [ ] Cumulative Layout Shift < 0.1

#### SEO
- [ ] Meta description presente
- [ ] Title tag optimizado
- [ ] Heading structure correcto (H1 único, etc.)
- [ ] Alt text en imágenes (si hay)
- [ ] Mobile-friendly (responsive)

#### Formulario
- [ ] Valida campo requerido (name)
- [ ] Valida email format
- [ ] Valida teléfono
- [ ] Mensajes de error claros
- [ ] Éxito muestra confirmación
- [ ] Submit button deshabilita durante envío

### Testing Tools

```bash
# SEO Check
https://www.seobility.net/

# Performance
https://pagespeed.web.dev/

# Mobile Testing
https://search.google.com/test/mobile-friendly

# Responsiveness
https://responsivedesignchecker.com/

# Cross-browser
BrowserStack.com o tu navegador con DevTools
```

---

## ✅ Post-Launch Checklist

### Inmediato (Día 1)
- [ ] Landing vive en URL final (dominio configurado)
- [ ] Formulario funciona (test submission)
- [ ] Email se recibe en info@boatcheckpro.es
- [ ] Todos los links funcionan
- [ ] No hay errores en consola (F12)

### En 24h
- [ ] Google Analytics configurado
- [ ] Google Search Console verificado
- [ ] XML sitemap enviado a Google
- [ ] Robots.txt en lugar (bloquear /admin, etc.)

### En 1 semana
- [ ] Primeras 10+ solicitudes recibidas (target)
- [ ] Email automático al cliente funciona
- [ ] Responder a primeras consultas en <2h

### En 1 mes
- [ ] Optimizar based on analytics
- [ ] A/B test botones/copy si cero conversiones
- [ ] Recoger feedback de primeros usuarios
- [ ] Iniciar email sequence

---

## 📊 Métricas a Monitorear

### Desde Day 1
- **Visits:** Cuánta gente llega
- **Conversion Rate:** % que llena formulario
- **Bounce Rate:** % que se va sin interactuar
- **Average Time on Page:** Engagement

### Para Optimizar
- **Top traffic sources:** De dónde vienen
- **Drop-off points:** Dónde se van
- **Device breakdown:** Desktop vs Mobile
- **Top pages:** Qué secciones leer más

---

## 🔐 Seguridad

### Checklist
- [ ] HTTPS habilitado (Vercel/hosting lo hace)
- [ ] No hay datos sensibles en código
- [ ] API URLs en variables de entorno
- [ ] Rate limiting en formulario (prevenir spam)
- [ ] Validación server-side (no solo client)

---

## 📞 Soporte & Próximos Pasos

### Si algo falla:
1. Revisa la consola (F12 en navegador)
2. Revisa logs del servidor (ssh/FTP)
3. Verifica DNS (si cambió dominio)
4. Verifica variables de entorno (API keys, etc.)

### Próxima Fase (Post-Launch):
1. **SEO:** Blog posts, backlinks, Google My Business
2. **Ads:** Google Ads, Facebook Ads
3. **Email:** Autoresponder, nurture sequence
4. **Backend:** API para inspecciones reales
5. **Mobile App:** App para técnicos (Fase 2)

---

## 🎯 Resumen Rápido

**Para publicar hoy:**

```bash
# Opción rápida: Vercel CLI
npm install -g vercel
cd landing-page
vercel

# Opción FTP: Tu hosting actual
sftp user@anayalvaro.com
mkdir boatcheckpro
put index.html boatcheckpro/
put styles.css boatcheckpro/
put app.js boatcheckpro/
exit
```

**URL final:**
- Vercel: `https://boatcheckpro.vercel.app` o custom domain
- Hosting: `https://anayalvaro.com/boatcheckpro`

**Próximo:** Email setup (puede ser post-launch)

---

**Last Updated:** 2026-02-19  
**Status:** Ready for Deployment  
**Next Action:** Choose hosting & deploy
