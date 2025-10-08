# Jordan Boyce Portfolio - Comprehensive Context

**Last Updated:** October 2025

## Project Overview

Modern, professional portfolio website showcasing Jordan Boyce's (Cyberlion) development work. Features 7 client sites, 2 personal projects, GSAP animations, AI-powered contact form, and comprehensive technology showcase.

**Status:** Production-ready (needs screenshots)
**Owner:** Jordan Boyce
**GitHub:** https://github.com/cyberlion-dev
**Email:** jordan.boyce@cyberlion.dev

## Complete Tech Stack

### Frontend
- Next.js 15.5.4 (App Router + Turbopack)
- React 19.1.0
- TypeScript 5
- Tailwind CSS v4 (PostCSS)
- GSAP 3.13.0 + ScrollTrigger

### UI & Components
- shadcn/ui (New York style)
- Lucide React (icons)
- next-themes (dark mode)
- Radix UI primitives

### Forms & Communication
- EmailJS (@emailjs/browser)
- Custom captcha system (8 randomized challenges)
- Honeypot spam protection

## All 9 Projects Listed

### Client Sites (7)
1. **Oaken Cupboards** - oakencupboards.com
2. **Eagle Rock Timber** - eaglerocktimber.com
3. **MyTBrite** - mytbrite.com
4. **MyTBrite Lights** - mytbrite-lights.com
5. **Beehive Window Cleaning** - beehivewindowcleaning.com
6. **ML Serv** - mlserv.com
7. **Hidden Treasures** - hiddentreasures.com

### Personal Projects (2)
8. **Walkup Beats ⭐ (Featured)** - walkup-beats.com
   - AI voice synthesis with Eleven Labs
   - Baseball walkup song creator
   - Audio processing & management
9. **This Portfolio** - Current site

## Contact Information

- **Email:** jordan.boyce@cyberlion.dev
- **Phone:** +1 (208) 534-6069
- **Location:** Chandler, AZ, USA
- **GitHub:** https://github.com/cyberlion-dev
- **LinkedIn:** https://www.linkedin.com/in/jordan-the-joyce-boyce/

## EmailJS Configuration (ACTIVE)

```typescript
SERVICE_ID: 'gmail2'
TEMPLATE_ID: 'template_50j6eb6'
PUBLIC_KEY: 'user_o4tEBCpcTsbstAtv5jsln'
```

Location: `components/sections/Contact.tsx:18-22`

## Technology Categories (About Section)

9 categories total:
1. Frontend Frameworks - React/Next.js, Vue/Nuxt, Angular, Svelte, Astro
2. Styling & Design - HTML/CSS, Tailwind, Bootstrap, SASS
3. Languages - JS/TS, Python, C#, SQL
4. Backend & APIs - Node.js, FastAPI, Entity Framework, REST, GraphQL
5. Databases - SQL, NoSQL, SQLite, PocketBase
6. CMS & Tools - WordPress, Strapi, PocketBase, Electron
7. DevOps & Cloud - Docker, Kubernetes, CI/CD
8. Automation & BI - n8n, Power BI
9. AI & ML Tools - Claude, OpenAI, Ollama, Eleven Labs

## Critical Animation Solution (GSAP)

**Problem:** Elements disappear on scroll or don't animate
**Solution:** ALWAYS include both:

```tsx
scrollTrigger: {
  toggleActions: 'play none none none',
},
immediateRender: false,
```

Applied in:
- About.tsx (tech cards)
- Projects.tsx (project cards)
- All ScrollTrigger animations

## Key File Locations

### Sections
- Hero: `components/sections/Hero.tsx`
- About: `components/sections/About.tsx`
- Projects: `components/sections/Projects.tsx`
- Contact: `components/sections/Contact.tsx`

### UI Components
- Navigation: `components/Navigation.tsx`
- Captcha: `components/ui/captcha-challenge.tsx`
- Theme Toggle: `components/ui/theme-toggle.tsx`

### Auto-Generated (shadcn)
- Button: `components/ui/button.tsx`
- Card: `components/ui/card.tsx`
- Badge: `components/ui/badge.tsx`
- Utils: `lib/utils.ts`

### Configuration
- Tailwind: `app/globals.css` (no tailwind.config.js)
- Next.js: `next.config.ts`
- TypeScript: `tsconfig.json`
- shadcn: `components.json`

## Signature Features

### 1. Animated Logo (Navigation)
- Hover reveals "JB | Cyberlion"
- Letter-by-letter stagger
- 3D rotation effect (rotationY)
- Lines 35-74

### 2. Floating Shapes (Hero)
- 6 gradient shapes
- Continuous float animation
- Mouse parallax with depth
- Lines 57-109, 120-139

### 3. Featured Project Badge
- Walkup Beats has star badge
- Primary ring border
- Enhanced shadow
- Title in primary color

### 4. Captcha System
- 8 randomized emoji challenges
- Question changes each submission
- Prevents bot spam
- Component: `ui/captcha-challenge.tsx`

### 5. Tech Stack Display
- 9 categorized cards
- Emoji icons per category
- Hover effects
- "Lifelong learner" disclaimer

## Important Line Numbers

```
EmailJS Config: Contact.tsx:18-22
Hero Animations: Hero.tsx:18-109
Logo Animation: Navigation.tsx:35-74
Tech Stack Data: About.tsx:92-128
Projects Data: Projects.tsx:16-117
Social Links: Hero.tsx:96-121
Contact Info: Contact.tsx:142-160
```

## Documentation Index

1. **README.md** - Project overview, setup, tech explanations
2. **GSAP_GUIDE.md** - Complete GSAP tutorial with examples
3. **EMAILJS_SETUP.md** - EmailJS configuration walkthrough
4. **SCREENSHOTS_GUIDE.md** - How to add project screenshots
5. **.claude/context.md** - This comprehensive context
6. **.claude/preferences.md** - Code style & conventions
7. **.claude/quick-reference.md** - Quick task lookup

## Pending Tasks

### High Priority
- [ ] Add real screenshots for all 9 projects
- [ ] Optimize images (< 200KB each)
- [ ] Test EmailJS integration thoroughly

### Medium Priority
- [ ] Add project detail modals/pages
- [ ] Implement image lightbox
- [ ] Add resume/CV download
- [ ] Set up analytics

### Optional
- [ ] Blog section
- [ ] Testimonials
- [ ] Admin dashboard
- [ ] CMS integration

## Development Commands

```bash
npm run dev          # Dev server with Turbopack
npm run build        # Production build
npm start            # Production server
npm run lint         # ESLint check
```

## Deployment Notes

**Recommended:** Vercel (made for Next.js)

**Environment Variables Needed:**
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=gmail2
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_50j6eb6
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=user_o4tEBCpcTsbstAtv5jsln
```

**Pre-Deploy Checklist:**
- [ ] All images optimized
- [ ] EmailJS tested
- [ ] Dark mode tested
- [ ] Mobile responsive checked
- [ ] Links verified
- [ ] Meta tags set
- [ ] Favicon added

## Code Patterns to Follow

### Component Header
```tsx
// Custom component - Brief description
'use client'; // If needed
```

### GSAP Animation
```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from('.class', {
      scrollTrigger: {
        trigger: '.class',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power4.out',
      immediateRender: false,
    });
  }, containerRef);
  return () => ctx.revert();
}, []);
```

### Styling Pattern
```tsx
className="container mx-auto px-4 sm:px-6 lg:px-8"
```

## Browser Support

- Chrome/Edge (latest 2)
- Firefox (latest 2)
- Safari (latest 2)
- Mobile Safari
- Chrome Mobile

## Performance Targets

- Lighthouse Score: 90+ (all categories)
- FCP: < 1.5s
- LCP: < 2.5s
- CLS: < 0.1
- Bundle Size: < 300KB gzipped

## Accessibility Features

- Semantic HTML throughout
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus visible styles
- Screen reader friendly
- Color contrast WCAG AA compliant

## Known Quirks

1. **GSAP animations** - Must use `immediateRender: false`
2. **Turbopack** - Some hot reload issues, restart if stuck
3. **Dark mode** - Flickers on initial load (expected with next-themes)
4. **Mobile menu** - Auto-closes on navigation

## Version History

- **v1.0** - Initial portfolio launch
- Features: Hero, About, Projects, Contact
- 9 projects, 9 tech categories
- EmailJS integration
- GSAP animations throughout
- Dark mode support
