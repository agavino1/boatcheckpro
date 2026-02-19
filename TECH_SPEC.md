# 🛠️ Especificaciones Técnicas - BoatCheckPro

## 📐 Arquitectura General

```
┌─────────────────┐
│  Web Frontend   │ (Next.js)
│  Landing + App  │
└────────┬────────┘
         │ HTTPS/REST
┌────────▼────────┐
│   API Gateway   │ (Node.js/Express)
│   + Auth        │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼───┐ ┌──▼───┐
│ PostgreSQL  │ Redis│
│   DB    │ Cache│
└─────────┘ └──────┘
         │
    ┌────┴────┐
    │         │
┌───▼───┐ ┌──▼───┐
│  S3   │ │Stripe│
│ Media │ │Payments
└───────┘ └──────┘
```

---

## 🗄️ Base de Datos (PostgreSQL)

### Tablas Principales

#### `users`
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  role VARCHAR(20) NOT NULL, -- 'customer', 'technician', 'admin'
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### `customers`
```sql
CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  stripe_customer_id VARCHAR(255),
  address TEXT,
  city VARCHAR(100),
  postal_code VARCHAR(10),
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### `technicians`
```sql
CREATE TABLE technicians (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  license_number VARCHAR(100),
  license_verified BOOLEAN DEFAULT FALSE,
  bio TEXT,
  experience_years INTEGER,
  specialties TEXT[], -- ['motor', 'vela', 'electrica']
  coverage_areas TEXT[], -- ['Málaga', 'Barcelona', ...]
  rating DECIMAL(3,2) DEFAULT 0,
  total_inspections INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'active', 'suspended'
  stripe_account_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### `inspections`
```sql
CREATE TABLE inspections (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES customers(id),
  technician_id INTEGER REFERENCES technicians(id),
  boat_type VARCHAR(50) NOT NULL, -- 'velero', 'lancha', 'yate', etc.
  boat_length DECIMAL(5,2) NOT NULL, -- metros
  boat_brand VARCHAR(100),
  boat_model VARCHAR(100),
  boat_year INTEGER,
  location TEXT NOT NULL, -- Puerto/amarre
  lat DECIMAL(10,8),
  lng DECIMAL(11,8),
  requested_date TIMESTAMP,
  scheduled_date TIMESTAMP,
  completed_date TIMESTAMP,
  status VARCHAR(20) DEFAULT 'requested', 
    -- 'requested', 'assigned', 'scheduled', 'in_progress', 'completed', 'cancelled'
  price_eur DECIMAL(10,2) NOT NULL,
  commission_eur DECIMAL(10,2) NOT NULL,
  payment_status VARCHAR(20) DEFAULT 'pending',
    -- 'pending', 'paid', 'refunded'
  stripe_payment_intent_id VARCHAR(255),
  customer_notes TEXT,
  technician_notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### `inspection_reports`
```sql
CREATE TABLE inspection_reports (
  id SERIAL PRIMARY KEY,
  inspection_id INTEGER REFERENCES inspections(id),
  report_data JSONB NOT NULL, -- Checklist completo
  overall_condition VARCHAR(20), -- 'excellent', 'good', 'fair', 'poor'
  estimated_value_eur DECIMAL(10,2),
  repair_estimate_eur DECIMAL(10,2),
  recommendation TEXT,
  pdf_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### `inspection_media`
```sql
CREATE TABLE inspection_media (
  id SERIAL PRIMARY KEY,
  inspection_id INTEGER REFERENCES inspections(id),
  type VARCHAR(20) NOT NULL, -- 'photo', 'video'
  url TEXT NOT NULL,
  category VARCHAR(50), -- 'exterior', 'motor', 'interior', 'electrical'
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### `reviews`
```sql
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  inspection_id INTEGER REFERENCES inspections(id),
  customer_id INTEGER REFERENCES customers(id),
  technician_id INTEGER REFERENCES technicians(id),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Usuario actual
- `POST /api/auth/forgot-password` - Recuperar contraseña

### Inspections (Customer)
- `POST /api/inspections` - Crear solicitud
- `GET /api/inspections` - Listar mis inspecciones
- `GET /api/inspections/:id` - Detalle de inspección
- `PUT /api/inspections/:id` - Actualizar (solo antes de asignar)
- `DELETE /api/inspections/:id/cancel` - Cancelar

### Inspections (Technician)
- `GET /api/technician/inspections/available` - Inspecciones disponibles
- `POST /api/technician/inspections/:id/accept` - Aceptar trabajo
- `PUT /api/technician/inspections/:id/schedule` - Programar fecha
- `POST /api/technician/inspections/:id/start` - Iniciar inspección
- `POST /api/technician/inspections/:id/complete` - Completar
- `POST /api/technician/inspections/:id/report` - Subir informe

### Technicians
- `POST /api/technicians/register` - Registro de técnico
- `GET /api/technicians/:id` - Perfil de técnico
- `PUT /api/technicians/:id` - Actualizar perfil
- `GET /api/technicians/search` - Buscar técnicos (admin)

### Reviews
- `POST /api/reviews` - Crear reseña
- `GET /api/technicians/:id/reviews` - Reseñas de técnico

### Payments
- `POST /api/payments/create-intent` - Crear PaymentIntent
- `POST /api/payments/confirm` - Confirmar pago
- `POST /api/webhooks/stripe` - Webhook de Stripe

### Admin
- `GET /api/admin/inspections` - Todas las inspecciones
- `GET /api/admin/technicians/pending` - Técnicos pendientes verificación
- `PUT /api/admin/technicians/:id/verify` - Verificar técnico
- `GET /api/admin/stats` - Estadísticas

---

## 📱 Frontend Pages

### Public
- `/` - Landing page
- `/como-funciona` - How it works
- `/precios` - Pricing
- `/blog` - Content marketing
- `/contacto` - Contact

### Customer Dashboard
- `/dashboard` - Overview
- `/dashboard/inspections` - Mis inspecciones
- `/dashboard/inspections/new` - Nueva solicitud
- `/dashboard/inspections/:id` - Detalle
- `/dashboard/perfil` - Mi perfil

### Technician Dashboard
- `/technician` - Overview (stats, próximas, disponibles)
- `/technician/jobs` - Trabajos disponibles
- `/technician/jobs/:id` - Detalle de trabajo
- `/technician/calendar` - Calendario
- `/technician/earnings` - Ingresos
- `/technician/profile` - Mi perfil

### Admin
- `/admin` - Dashboard
- `/admin/inspections` - Gestión inspecciones
- `/admin/technicians` - Gestión técnicos
- `/admin/customers` - Gestión clientes
- `/admin/stats` - Analytics

---

## 🎨 UI/UX Components

### Shared Components
- `<Navbar>` - Navigation
- `<Footer>` - Footer
- `<Button>` - Reusable button
- `<Input>` - Form input
- `<Select>` - Dropdown
- `<Modal>` - Modal dialogs
- `<Card>` - Content cards
- `<Badge>` - Status badges
- `<Rating>` - Star rating display

### Feature Components
- `<InspectionCard>` - Inspección summary
- `<TechnicianCard>` - Técnico profile card
- `<InspectionForm>` - Solicitud form
- `<Calendar>` - Date picker
- `<FileUpload>` - Media upload
- `<ChecklistEditor>` - Report checklist
- `<PriceCalculator>` - Calculadora de precio

---

## 🔐 Security & Auth

### Authentication
- JWT tokens (access + refresh)
- HTTPOnly cookies
- Password hashing (bcrypt)

### Authorization
- Role-based access control (RBAC)
- Resource ownership checks
- API rate limiting

### Data Protection
- HTTPS only
- Input validation/sanitization
- SQL injection prevention (parameterized queries)
- XSS prevention
- CSRF tokens

---

## 💳 Payment Flow (Stripe)

```
Customer submits form
  ↓
Calculate price (based on boat length)
  ↓
Create Stripe PaymentIntent
  ↓
Customer enters card details (Stripe.js)
  ↓
Confirm payment
  ↓
Webhook received → Update inspection status
  ↓
Assign technician (manual or auto)
  ↓
After completion → Transfer to technician (minus commission)
```

### Stripe Integration
- **Products:**
  - Inspection (variable pricing)
  - Additional services
  
- **Connect** for technician payouts
- **Webhooks:**
  - `payment_intent.succeeded`
  - `payment_intent.failed`
  - `transfer.created`

---

## 📊 Analytics & Tracking

### Events to Track
- Page views
- Form starts/completions
- Inspection requests
- Payment conversions
- Technician registrations
- Review submissions

### Tools
- Google Analytics 4
- Hotjar (heatmaps)
- Mixpanel (product analytics)
- Sentry (error tracking)

---

## 🚀 Deployment

### Infrastructure
- **Frontend:** Vercel (Next.js)
- **Backend:** Railway.app or Fly.io
- **Database:** Managed PostgreSQL (Railway/Supabase)
- **Redis:** Railway/Upstash
- **Media:** AWS S3 or Cloudflare R2
- **CDN:** Cloudflare

### CI/CD
- GitHub Actions
- Automatic deployments on push to `main`
- Preview deployments for PRs

### Monitoring
- Uptime monitoring (UptimeRobot)
- Error tracking (Sentry)
- Performance monitoring (Vercel Analytics)

---

## 📱 Mobile App (Fase 2)

### React Native App for Technicians
- Accept/reject jobs
- GPS navigation to boat location
- Photo/video capture
- Checklist completion
- Report submission
- Earnings tracking

---

## 🔄 Workflows

### Customer Journey
1. Lands on website (SEO/Ads)
2. Fills inspection request form
3. Receives quote via email (24h)
4. Pays online (Stripe)
5. Technician assigned + scheduled
6. Receives reminder 24h before
7. Inspection completed
8. Receives report (24-48h)
9. Leaves review

### Technician Journey
1. Applies to join platform
2. Submits credentials for verification
3. Admin verifies (2-5 days)
4. Account activated
5. Receives job notifications
6. Accepts job
7. Schedules date with customer
8. Completes inspection
9. Uploads report
10. Receives payout (7 days after completion)

---

## 📦 MVP Scope (8 weeks)

### Week 1-2: Foundation
- [ ] Project setup (Next.js + Express)
- [ ] Database schema
- [ ] Auth system
- [ ] Landing page

### Week 3-4: Core Features
- [ ] Inspection request flow
- [ ] Stripe payment integration
- [ ] Basic admin panel
- [ ] Email notifications

### Week 5-6: Technician Portal
- [ ] Technician registration
- [ ] Job acceptance flow
- [ ] Report submission
- [ ] Payout system

### Week 7-8: Polish
- [ ] Customer dashboard
- [ ] Review system
- [ ] Mobile responsive
- [ ] Testing & bug fixes
- [ ] Deployment

---

## 💰 Cost Estimates

### Development (Outsourced)
- **MVP:** 8.000-12.000€
- **Fase 2 (automation):** 10.000-15.000€
- **Mobile app:** 8.000-12.000€

### Development (In-house / AI Agent)
- **MVP:** 0€ (tu tiempo)
- **Fase 2:** 0€
- **Mobile app:** 0€ o 3.000-5.000€ si contratas

### Monthly Operational
- Hosting: 50-100€
- Domain: 1€/mes
- Email (SendGrid): 20€
- SMS (Twilio): 20€
- Stripe fees: 1.5% + 0.25€ per transaction
- Insurance (opcional): 50-100€

**Total mes 1:** ~150€  
**Total mes con volumen:** ~300-500€

---

## 🎯 Success Metrics (MVP)

- **10** inspection requests in first month
- **5** completed inspections
- **3** repeat customers or referrals
- **4+** average star rating
- **20+** technician applications
- **5** active technicians

---

**Status:** Ready for development  
**Priority:** High (validated market need)  
**Timeline:** 8-10 weeks to MVP  
