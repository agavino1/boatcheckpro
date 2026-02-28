# BoatCheckPro — Guía de Despliegue
# Backend → Google Cloud Run | Frontend → Vercel | BD → Supabase

## Arquitectura final

```
GitHub push → master
  ├── GitHub Actions → Docker build → Google Cloud Run (europe-west1)
  │                                        ↕  DATABASE_URL
  │                                   Supabase PostgreSQL
  │
  └── Vercel detecta el push → deploya /frontend/ automáticamente
```

---

## PASO 1 — Supabase (base de datos)

1. Ve a **[supabase.com](https://supabase.com)** → crea cuenta → **New Project**
   - Name: `boatcheckpro`
   - Password: elige una fuerte (la necesitarás)
   - Region: **West EU (Ireland)** — más cercana a España
   - Espera ~2 min

2. Ve a **Settings → Database → Connection string → URI**
   Copia la cadena completa, tiene esta forma:
   ```
   postgresql://postgres:[TU-PASSWORD]@db.XXXXXXXXXXXX.supabase.co:5432/postgres
   ```
   Esta es tu `DATABASE_URL`. Guárdala.

---

## PASO 2 — Google Cloud (Cloud Run)

### 2.1 Encontrar tu Project ID
1. Ve a **[console.cloud.google.com](https://console.cloud.google.com)**
2. En la barra superior izquierda, haz click en el nombre del proyecto
3. En el popup verás dos cosas: **Nombre** y **ID** — copia el **ID**
   (ej: `boatcheckpro-123456` o similar)

### 2.2 Habilitar APIs (solo se hace una vez)
Ve a [console.cloud.google.com/apis/library](https://console.cloud.google.com/apis/library) y activa:
- **Cloud Run API**
- **Container Registry API**
- **Cloud Build API**

### 2.3 Crear Service Account para GitHub Actions
1. Ve a **IAM & Admin → Service Accounts → Create Service Account**
   - Nombre: `github-deployer`
2. Añade estos roles:
   - `Cloud Run Admin`
   - `Storage Admin`
   - `Service Account User`
3. Click en la cuenta creada → **Keys → Add Key → JSON**
4. Se descarga un `.json` — ábrelo con el bloc de notas y copia TODO su contenido

---

## PASO 3 — Vercel (frontend)

1. Ve a **[vercel.com](https://vercel.com)** → **Add New Project**
2. Importa el repo `agavino1/boatcheckpro`
3. Configura:
   - **Root Directory:** `frontend`   ← CRÍTICO
   - **Framework:** Next.js (autodetectado)
4. En **Environment Variables** añade:
   ```
   NEXT_PUBLIC_API_URL = https://XXXX  ← la URL de Cloud Run (la tendrás en el paso 5)
   ```
   Por ahora ponla vacía y la actualizas después del primer deploy.
5. Deploy

---

## PASO 4 — GitHub Secrets

Ve a tu repo → **Settings → Secrets and variables → Actions → New repository secret**

| Secret | Qué poner |
|--------|-----------|
| `GCP_PROJECT_ID` | Tu Project ID de Google Cloud (paso 2.1) |
| `GCP_CREDENTIALS` | Contenido completo del archivo `.json` (paso 2.3) |
| `DATABASE_URL` | La URI de Supabase (paso 1) — ej: `postgresql://postgres:pass@db.xxx.supabase.co:5432/postgres` |
| `JWT_SECRET` | Clave aleatoria larga — genera con: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"` |
| `STRIPE_SECRET_KEY` | `sk_test_...` desde [dashboard.stripe.com](https://dashboard.stripe.com) → Developers → API Keys |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` desde Stripe → Webhooks (créalo después) |
| `EMAIL_HOST` | `smtp.gmail.com` |
| `EMAIL_PORT` | `587` |
| `EMAIL_USER` | tu cuenta gmail |
| `EMAIL_PASSWORD` | App Password de Gmail (Gmail → Seguridad → Contraseñas de aplicación) |
| `FRONTEND_URL` | `https://boatcheckpro.vercel.app` (o la URL que te dé Vercel) |
| `API_URL` | `https://boatcheckpro-api-XXXX-ew.a.run.app` (la tendrás tras el primer deploy) |

---

## PASO 5 — Primer deploy

Con todos los secrets configurados:

```bash
git add .
git commit -m "deploy: configure cloud run + supabase"
git push origin master
```

GitHub Actions desplegará el backend. Al final del job aparece la URL de Cloud Run.

**Después del primer deploy:**
1. Copia la URL de Cloud Run → ponla en Vercel como `NEXT_PUBLIC_API_URL`
2. Copia la URL de Cloud Run → actualiza GitHub Secret `API_URL`
3. En Vercel haz **Redeploy** (o el próximo push lo hace automático)

---

## PASO 6 — Inicializar la base de datos (seed)

Una vez el backend está en producción, ejecuta el seed desde tu máquina local con la `DATABASE_URL` de Supabase:

```bash
# En la raíz del proyecto (donde está package.json del backend)
DATABASE_URL="postgresql://postgres:TU-PASSWORD@db.XXXX.supabase.co:5432/postgres" node scripts/seed.js
```

Esto crea las tablas y los usuarios de prueba.

---

## URLs finales

| Servicio | URL |
|----------|-----|
| Frontend | `https://boatcheckpro.vercel.app` |
| Backend API | `https://boatcheckpro-api-XXXX-ew.a.run.app` |
| Health check | `https://boatcheckpro-api-XXXX-ew.a.run.app/health` |
| Admin panel | Despliegue separado en Vercel con root: `admin-panel` |

---

## Coste estimado (tráfico MVP)

| Servicio | Plan | Coste |
|----------|------|-------|
| Vercel | Hobby (free) | 0€ |
| Google Cloud Run | min-instances=0, escala a cero | ~0€ |
| Supabase | Free tier (500MB, 2 proyectos) | 0€ |
| **Total** | | **~0€/mes** |
