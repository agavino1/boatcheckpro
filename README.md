# BoatCheckPro - Professional Boat Inspection SaaS

A modern, professional frontend for a boat inspection management platform built with Next.js, React, TypeScript, and Tailwind CSS.

## 🚀 Features

### Landing Page
- **Hero Section** - Compelling value proposition with CTA
- **How It Works** - Step-by-step process with visual indicators
- **Gallery** - Carousel of sample inspections with details
- **Pricing** - Transparent, tiered pricing plans
- **Testimonials** - Social proof with customer reviews and stats
- **FAQ** - Comprehensive Q&A section
- **CTA Footer** - Strong final call-to-action

### User Authentication
- **Login Page** - Email/password authentication with social options
- **Register Page** - User signup with role selection (Boat Owner, Technician, Insurance Agent)

### User Dashboard
- **Overview** - Statistics and quick metrics
- **Inspection History** - Table of past and upcoming inspections
- **Status Tracking** - Visual status indicators (Completed, Scheduled, In Progress)
- **Quick Actions** - Access to common tasks

### Inspection Management
- **Request Inspection** - Multi-step form for booking inspections
  - Step 1: Boat Information
  - Step 2: Inspection Details
  - Step 3: Confirmation
- **Calendar/Scheduling** - Date and time selection
- **Technician Profiles** - Browse and select certified technicians

### Design System
- **Professional UI Components** - Reusable, well-documented components
- **Mobile-First Responsive** - Works perfectly on all devices
- **Accessibility** - WCAG compliant with proper focus states
- **Dark Mode Ready** - Extensible for dark theme support

## 🛠 Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Build Tool**: Next.js built-in

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup

```bash
# Clone repository
git clone <repository-url>
cd boatcheckpro

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🏗 Project Structure

```
boatcheckpro/
├── src/
│   ├── app/
│   │   ├── globals.css           # Tailwind directives
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Home/landing page
│   │   ├── login/
│   │   │   └── page.tsx          # Login page
│   │   ├── register/
│   │   │   └── page.tsx          # Registration page
│   │   ├── dashboard/
│   │   │   └── page.tsx          # User dashboard
│   │   ├── request-inspection/
│   │   │   └── page.tsx          # Inspection request form
│   │   ├── calendar/
│   │   │   └── page.tsx          # Calendar/scheduling
│   │   └── technician/
│   │       └── page.tsx          # Technician profile
│   └── components/
│       ├── layout/
│       │   ├── Navbar.tsx
│       │   └── Footer.tsx
│       └── sections/
│           ├── Hero.tsx
│           ├── HowItWorks.tsx
│           ├── Gallery.tsx
│           ├── Pricing.tsx
│           ├── Testimonials.tsx
│           ├── FAQ.tsx
│           └── CTA.tsx
├── public/                       # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.js
├── DESIGN_SYSTEM.md              # Design documentation
└── README.md
```

## 🎨 Design System

See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for:
- Color palette and usage
- Typography scale
- Component specifications
- Spacing guidelines
- Animation definitions
- Accessibility standards

## 📄 Key Pages

| Page | Route | Purpose |
|------|-------|---------|
| Landing | `/` | Homepage with all sections |
| Login | `/login` | User authentication |
| Register | `/register` | New user signup |
| Dashboard | `/dashboard` | User inspection history |
| Request | `/request-inspection` | Book new inspection |
| Calendar | `/calendar` | Schedule inspection |
| Technician | `/technician` | View tech profile |

## 🎯 Component Examples

### Using Primary Button
```tsx
<button className="btn-primary">Get Started</button>
```

### Using Card Component
```tsx
<div className="card p-8">
  <h3>Card Title</h3>
  <p>Card content</p>
</div>
```

### Responsive Layout
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {/* Items */}
</div>
```

## 🌐 Responsive Design

- **Mobile**: Base styles, full-width
- **Tablet** (768px+): 2-column layouts, optimized spacing
- **Desktop** (1024px+): 3+ column layouts, full features
- **Touch Targets**: Minimum 44px for all interactive elements

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Semantic HTML structure
- Focus indicators on all interactive elements
- Color contrast ratios meet standards
- Keyboard navigation support
- ARIA labels where appropriate

## 🚀 Performance

- Next.js automatic optimization
- Image optimization ready
- CSS-in-JS (Tailwind) for minimal bundle
- Code splitting by route
- Static site generation ready

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Build & Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Lint
```bash
npm run lint
```

## 📝 Figma Design System

A comprehensive Figma design file documents:
- Component library
- Typography system
- Color tokens
- Spacing grid
- Interactive states
- Animation specifications

[Link to Figma: Add your Figma URL]

## 🔜 Upcoming Features

- [ ] Dark mode theme
- [ ] Advanced filtering in dashboard
- [ ] Email notifications
- [ ] PDF report generation
- [ ] Payment integration
- [ ] Real-time chat with technicians
- [ ] Mobile app (React Native)

## 📚 Documentation

- [Design System](./DESIGN_SYSTEM.md) - Comprehensive design guide
- Components are self-documenting with TypeScript
- Inline comments for complex logic

## 🤝 Contributing

1. Create feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📞 Support

For support, email support@boatcheckpro.com or check FAQ section.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Credits

- Icons from [Lucide React](https://lucide.dev)
- Font from [Inter](https://fonts.google.com/specimen/Inter)
- Styling with [Tailwind CSS](https://tailwindcss.com)
- Framework by [Vercel](https://vercel.com)

---

**Built with ❤️ for boat owners and marine professionals**
