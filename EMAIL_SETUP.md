# 📧 BoatCheckPro - Email Marketing Setup (Post-Launch)

**Nota:** Este documento describe la configuración de email marketing para _después_ de publicar la landing page. No es bloqueador para el lanzamiento inicial.

---

## 📋 Índice

- [Requisitos Previos](#requisitos-previos)
- [Seleccionar Proveedor](#seleccionar-proveedor)
- [Setup de Mailchimp](#setup-de-mailchimp)
- [Setup de Brevo](#setup-de-brevo)
- [Secuencia de Emails de Bienvenida](#secuencia-de-emails-de-bienvenida)
- [Flujo de Conversión](#flujo-de-conversión)

---

## ⚙️ Requisitos Previos

### Necesitas:
- ✅ Landing page publicada y recibiendo submissions
- ✅ Dominio de email (info@boatcheckpro.es)
- ✅ Email plan elegido (Mailchimp/Brevo/SendGrid)
- ✅ Aprobación de Álvaro para templates de email

### URLs que necesitarás:
- URL de landing: `https://boatcheckpro.com` (cambiar según tu dominio)
- URL de privacidad: `https://boatcheckpro.com/privacy` (crear después)
- URL de terms: `https://boatcheckpro.com/terms` (crear después)

---

## 🎯 Seleccionar Proveedor

### Comparativa Rápida

| Proveedor | Coste | Emails/mes | SMTP | API | Automatización |
|-----------|-------|-----------|------|-----|---|
| **Mailchimp** | Gratuito | 500 | ✅ | ✅ | ✅ (básico) |
| **Brevo** | Gratuito | 300 | ✅ | ✅ | ✅ (avanzado) |
| **SendGrid** | Gratuito | 100 | ✅ | ✅ | ❌ |
| **Klaviyo** | Pago | Unlimited | ✅ | ✅ | ✅ (premium) |

**Recomendación:** **Brevo** para Europe, **Mailchimp** si usas US

---

## 🐵 Setup de Mailchimp

### Paso 1: Crear Cuenta

1. Ve a https://mailchimp.com
2. Click "Sign Up"
3. Introduce email y contraseña
4. Verifica tu email
5. Completa tu perfil

### Paso 2: Crear Audiencia

1. Dashboard > Audience
2. Click "Create Audience"
3. Rellena:
   - **Audience name:** BoatCheckPro
   - **Default from email:** info@boatcheckpro.es
   - **Default from name:** BoatCheckPro
   - **Permission reminder:** Por favor, solicita permiso

4. Save

### Paso 3: Integrar Formulario

#### Opción A: Formulario Embedded (Fácil)

1. Audience > Signup forms > Embedded forms
2. Personaliza el formulario (colores, campos, etc.)
3. Copia el código
4. Pégalo en tu landing page (antes del `</body>`)

```html
<!-- Insertado después del formulario actual -->
<script id="mcjs">
!function(c,h,i,m,p){
  m=c.createElement(h);
  p=c.getElementsByTagName(h)[0];
  m.async=1;
  m.src=i;
  p.parentNode.insertBefore(m,p);
}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/xxxxxx/xxxxxx.js");
</script>
```

#### Opción B: Integración con API (Profesional)

1. Audience > Manage contacts > Settings
2. Copia: **Audience ID**
3. Ve a: Account > Integrations > API keys
4. Copia: **API Key** y **Server prefix** (ej: us5)

5. Actualiza `app.js` en tu landing page:

```javascript
// En app.js, en handleFormSubmit:
async function subscribeToMailchimp(data) {
    const API_KEY = 'tu_api_key_aqui';
    const AUDIENCE_ID = 'tu_audience_id_aqui';
    const SERVER = 'us5'; // Tu server
    
    const url = `https://${SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa('anystring:' + API_KEY),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email_address: data.email,
            status: 'pending', // double opt-in
            merge_fields: {
                FNAME: data.name,
                PHONE: data.phone,
                LNAME: '',
                MMERGE3: data['boat-type'],
                MMERGE4: data.length,
                MMERGE5: data.location,
            }
        }),
    });
    
    return response.json();
}
```

### Paso 4: Crear Secuencia de Bienvenida

1. Audience > Automations
2. Click "Create" > "Welcome Series"
3. Configura:
   - **Trigger:** New subscriber
   - **Email 1 (inmediato):** Bienvenida + próximos pasos
   - **Email 2 (día 3):** Educación (por qué inspección)
   - **Email 3 (día 7):** Social proof (reseñas)
   - **Email 4 (día 14):** Oferta especial (si aplica)

4. Para cada email, personaliza:
   - Subject line
   - Preview text
   - Body (HTML o drag-drop editor)
   - CTA button
   - Footer con datos de contacto

---

## 🚀 Setup de Brevo

### Paso 1: Crear Cuenta

1. Ve a https://brevo.com
2. Click "Sign up for free"
3. Introduce email
4. Verifica
5. Configura:
   - Nombre
   - Empresa: BoatCheckPro
   - País: Spain
   - Idioma: Español

### Paso 2: Verificar Dominio

1. Settings > Sender Identities > Domains
2. Añade: `boatcheckpro.com` (o tu dominio)
3. Brevo te da 3 registros DNS para añadir
4. Espera 24h para verificación

### Paso 3: Crear Lista de Contactos

1. Contacts > Manage lists
2. Click "Create List"
3. Nombre: "BoatCheckPro Solicitudes"
4. Descripción: "Nuevas solicitudes de inspección"
5. Save

### Paso 4: Integrar Formulario

#### Opción A: Embedded (Fácil)

1. Marketing > Signup forms
2. Click "Create new form"
3. Nombre: "BoatCheckPro Landing"
4. Personaliza campos:
   - Email (requerido)
   - Nombre
   - Teléfono
   - Tipo de barco
   - Eslora

5. Personaliza colores/texto
6. Copia el código

#### Opción B: API

1. Settings > API key
2. Copia: **API Key**

3. En `app.js`:

```javascript
async function subscribeToBrevo(data) {
    const API_KEY = 'tu_api_key_brevo';
    const LIST_ID = 'tu_list_id';
    
    const response = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
            'api-key': API_KEY,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: data.email,
            updateEnabled: true,
            attributes: {
                FIRSTNAME: data.name,
                PHONE: data.phone,
                BOAT_TYPE: data['boat-type'],
                BOAT_LENGTH: data.length,
                LOCATION: data.location,
            },
            listIds: [LIST_ID],
        }),
    });
    
    return response.json();
}
```

### Paso 5: Crear Automation

1. Marketing > Automations
2. Click "Create Automation"
3. Trigger: New contact in list
4. Workflow:
   - **Email 1 (0 min):** Confirmación + gracias
   - **Email 2 (día 1):** Cómo funciona el proceso
   - **Email 3 (día 3):** Reseñas de clientes
   - **Email 4 (día 7):** Seguimiento

---

## 📧 Secuencia de Emails de Bienvenida

### Email 1: Bienvenida Inmediata (0 min)
**Subject:** ¡Solicitud recibida! Próximos pasos ⚓

```html
Hola {FIRSTNAME},

Gracias por tu solicitud de inspección. Hemos recibido tus datos y nos pondremos 
en contacto en las próximas 24 horas para confirmar la fecha y el precio exacto.

PRÓXIMOS PASOS:
1. Espera nuestro email de confirmación
2. Te asignaremos un técnico certificado
3. Realiza la inspección
4. Recibe tu informe detallado

Si tienes preguntas, responde a este email o llama al +34 XXX XXX XXX

¡Saludos!
Equipo BoatCheckPro
```

### Email 2: Educación (Día 1)
**Subject:** ¿Por qué inspeccionar antes de comprar? 🔍

```html
Hola {FIRSTNAME},

Muchos compradores descubren problemas DESPUÉS de comprar. Aquí te contamos 
por qué una inspección profesional es la mejor inversión:

EVITAR SORPRESAS:
✓ Problemas ocultos en motor, casco, sistemas
✓ Reparaciones inesperadas de 5.000-50.000€
✓ Negociar mejor precio con datos reales

NUESTRO PROCESO:
- Inspección completa (100+ puntos)
- Informe detallado con fotos/vídeo
- Recomendaciones de mantenimiento
- Estimación de valor real

Lee nuestro blog: [link a post sobre inspecciones]

¡Saludos!
BoatCheckPro
```

### Email 3: Social Proof (Día 3)
**Subject:** Lo que dicen nuestros clientes ⭐

```html
Hola {FIRSTNAME},

Aquí estamos algunos de nuestros clientes satisfechos:

"Gracias a la inspección encontramos un problema grave que el vendedor no había 
mencionado. Pudimos negociar 10.000€ menos. Muy recomendado!"
— Juan, Barcelona

"El informe fue super detallado y nos dio total seguridad para la compra."
— María, Valencia

"Técnico profesional, rápido y muy claro explicando los problemas encontrados."
— Carlos, Málaga

VER TODAS LAS RESEÑAS: [link a página de testimonios]

¿Aún tienes dudas? Responde a este email.

¡Saludos!
BoatCheckPro
```

### Email 4: Follow-up (Día 7)
**Subject:** ¿Aún buscas barco? Estamos aquí para ayudarte 🚤

```html
Hola {FIRSTNAME},

Notamos que aún no has confirmado tu inspección. 
¿Hay algo que podamos aclarar?

PREGUNTAS FRECUENTES:

P: ¿Cuánto cuesta?
R: Desde 450€ según la eslora del barco

P: ¿Cuánto tarda?
R: Asignamos un técnico en 24h. Inspección: 2-4 horas

P: ¿Garantía?
R: Si encontramos un problema importante y no aparece en nuestro informe, 
   devolvemos el 100% del dinero

P: ¿Puedo estar presente?
R: Claro, te recomendamos que sí

CONTACTA CON NOSOTROS:
- Email: info@boatcheckpro.es
- Teléfono: +34 XXX XXX XXX
- Chat: [si tienes]

¿Listos para comprar con confianza?

¡Saludos!
BoatCheckPro
```

---

## 🔄 Flujo de Conversión

```
Usuario llena formulario en landing
        ↓
Email 1: Confirmación recibida (0 min)
        ↓
Email 2: Educación sobre inspecciones (Día 1)
        ↓
Check: ¿Ha confirmado?
  → SÍ: Email de confirmación + detalles de cita
  → NO: Email 3: Social proof (Día 3)
        ↓
Check: ¿Ha confirmado?
  → SÍ: Email de confirmación
  → NO: Email 4: Follow-up + FAQ (Día 7)
        ↓
Check: ¿Ha confirmado?
  → SÍ: Email de confirmación
  → NO: End of sequence
        ↓
CONFIRMADO: Email de cita + próximos pasos
        ↓
Inspection completada: Email de agradecimiento + encuesta
        ↓
Pedir reseña (Día después)
```

---

## 🎯 KPIs a Monitorear

### Email Metrics
- **Open Rate:** Target >30%
- **Click Rate:** Target >5%
- **Unsubscribe Rate:** <0.5% es bueno
- **Bounce Rate:** <2%

### Conversion Metrics
- **Leads recibidos:** Cuántos por semana
- **Confirmadas:** Cuántas inspecciones confirmadas
- **Conversion rate:** Solicitudes → Inspeccionadas
- **CAC:** Customer Acquisition Cost

### Email Optimization
Si el open rate es bajo (<20%):
- Prueba nuevos subject lines
- Mejor hora de envío
- Más personalización

Si el click rate es bajo (<2%):
- CTAs más claros
- Mejor copywriting
- Menos texto, más scanneable

---

## ✅ Checklist de Setup

- [ ] Cuenta en proveedor elegido (Mailchimp o Brevo)
- [ ] Dominio verificado
- [ ] Lista de contactos creada
- [ ] Formulario integrado en landing (o API)
- [ ] Emails de bienvenida creados
- [ ] Automation configurada
- [ ] Email de confirmación personalizado
- [ ] Footer con datos de contacto
- [ ] Link de unsubscribe en todos los emails
- [ ] Privacy policy actualizada
- [ ] Test: Enviar email a ti mismo
- [ ] Monitorear métricas

---

## 📞 Próximos Pasos

1. **Semana 1 post-launch:** Primeros emails funcionando
2. **Semana 2:** Analizar open/click rates
3. **Semana 3:** A/B testing en subject lines
4. **Semana 4:** Optimizar based on data
5. **Mes 2:** Crear más contenido (blog, webinar)

---

**Nota:** Email setup puede hacerse después del launch. Prioridad: landing funcional con form básico.

**Last Updated:** 2026-02-19  
**Status:** Ready for Post-Launch Implementation
