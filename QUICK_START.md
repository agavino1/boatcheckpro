# ⚡ BoatCheckPro - Quick Start (5 minutos)

## 🚀 Deploy Más Rápido

### Opción 1: Vercel (Recomendado, 3 minutos)

```bash
# 1. Instalar CLI
npm install -g vercel

# 2. Ir a carpeta
cd ~/boatcheckpro/landing-page

# 3. Deploy
vercel

# Responde a las preguntas:
# Project name: boatcheckpro
# Root: ./
# Build: n (es HTML estático)
# Output: ./

# ✅ Listo! URL en la consola
```

### Opción 2: FTP Manual (5 minutos)

```bash
# 1. Conectar
sftp user@anayalvaro.com
# enter password

# 2. Crear carpeta
mkdir boatcheckpro

# 3. Subir archivos
put landing-page/index.html boatcheckpro/
put landing-page/styles.css boatcheckpro/
put landing-page/app.js boatcheckpro/

exit

# ✅ Acceso: https://anayalvaro.com/boatcheckpro
```

### Opción 3: Drag-Drop a Vercel (2 minutos)

1. Abre https://vercel.com/new
2. Drag-drop carpeta `landing-page/`
3. Click "Deploy"
4. ✅ Listo, te da la URL

---

## 📝 Personalizar Antes de Deploy

**IMPORTANTE:** Cambiar el teléfono en `landing-page/index.html`

Busca esta línea (aprox. línea 340):
```html
<p style="margin-top: 10px; opacity: 0.7;">
    Email: info@boatcheckpro.es | Tel: +34 XXX XXX XXX
</p>
```

Reemplaza `+34 XXX XXX XXX` con tu número real.

---

## ✅ Test Post-Deploy

1. Abre la URL que te da Vercel/FTP
2. En móvil + desktop
3. Scroll por todas las secciones
4. Clica el botón "Solicitar Inspección"
5. Llena el formulario
6. Envía
7. Debes ver: **✅ ¡Solicitud Recibida!**

Si todo funciona → **¡YA ESTÁS EN VIVO!** 🎉

---

## 📧 Email (Post-Launch)

El formulario ahora solo muestra "Solicitud Recibida" (sin enviar a email).

Para email real, ver `EMAIL_SETUP.md` (puedes hacerlo después).

---

## 🎯 Próximos Pasos

1. ✅ Deploy (hoy, 5 minutos)
2. ⏳ Test (hoy, 5 minutos)
3. ⏳ Anunciar (mañana)
4. ⏳ Email setup (esta semana)
5. ⏳ Google Ads (próxima semana)

---

## 🆘 Si Algo Falla

**Error 404 (página no encontrada):**
- Verifica el dominio en la URL
- Vuelve a hacer deploy

**Formulario no funciona:**
- Abre F12 (DevTools)
- Ve a Console
- Busca errores rojos
- Avísame

**Styling roto:**
- Verifica que `styles.css` se subió
- Check: DevTools > Network > styles.css (200 OK?)

---

## 📞 Más Detalles

- `SETUP.md` - Guía completa (14 KB)
- `EMAIL_SETUP.md` - Email marketing
- `DEPLOYMENT_READY.md` - Checklist completo

---

**¡A por ello! 🚀⚓**
