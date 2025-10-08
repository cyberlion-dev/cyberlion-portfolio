# Jordan Boyce Portfolio

A modern portfolio website built with Next.js, React, TypeScript, and animated with GSAP. This project showcases a clean, responsive design with smooth animations and dark mode support.

## Tech Stack

### Core Framework
- **Next.js 15** - React framework with App Router for server-side rendering and routing
- **React 19** - UI library for building component-based interfaces
- **TypeScript** - Type-safe JavaScript for better development experience

### Styling
- **Tailwind CSS v4** - Utility-first CSS framework configured via `@tailwindcss/postcss`
  - Used throughout the project for responsive layouts and styling
  - Custom theme configuration in `app/globals.css` with CSS variables for colors
  - Includes light/dark mode color schemes using OKLCH color space
  - Example: Navigation component (`components/Navigation.tsx`) uses Tailwind classes for layout, spacing, and responsive design

### UI Components
- **shadcn/ui** - Pre-built, customizable React components
  - Configured via `components.json` with "new-york" style
  - Components stored in `components/ui/` directory (Button, Card, Badge, etc.)
  - Uses Radix UI primitives under the hood for accessibility
  - Styled with Tailwind and includes theme support
  - Example components: `components/ui/button.tsx`, `components/ui/card.tsx`

### Animation
- **GSAP (GreenSock Animation Platform)** - Professional-grade animation library
  - Used for scroll-triggered animations and page transitions
  - **Hero Section** (`components/sections/Hero.tsx:15-56`) - Entrance animations for title, subtitle, CTA buttons, and social icons
  - **About Section** (`components/sections/About.tsx:14-65`) - Scroll-triggered animations using ScrollTrigger plugin for skill cards and tech badges
  - **Projects & Contact** - Similar scroll-based reveal animations throughout the site

### Additional Libraries
- **next-themes** - Dark mode/theme switching with system preference detection
- **lucide-react** - Icon library for consistent, customizable icons
- **tw-animate-css** - Additional Tailwind animation utilities

## Project Structure

```
jb-portfolio/
├── app/
│   ├── globals.css        # Tailwind imports, theme variables, and base styles
│   ├── layout.tsx         # Root layout with ThemeProvider and fonts
│   └── page.tsx           # Main page composing all sections
├── components/
│   ├── sections/          # Page sections
│   │   ├── Hero.tsx       # Hero section with GSAP entrance animations
│   │   ├── About.tsx      # About section with scroll-triggered GSAP animations
│   │   ├── Projects.tsx   # Projects showcase with GSAP
│   │   └── Contact.tsx    # Contact form with GSAP
│   ├── ui/                # shadcn/ui components
│   │   ├── button.tsx     # Button component with variants
│   │   ├── card.tsx       # Card component
│   │   ├── badge.tsx      # Badge component
│   │   └── theme-toggle.tsx # Dark/light mode toggle
│   ├── Navigation.tsx     # Navigation bar with scroll effects
│   └── theme-provider.tsx # Theme context provider
├── lib/
│   └── utils.ts           # Utility functions (cn helper for Tailwind)
└── components.json        # shadcn/ui configuration
```

## Key Features

1. **Responsive Design** - Mobile-first approach using Tailwind's responsive utilities
2. **Dark Mode** - System-aware theme switching with custom color palettes
3. **Smooth Animations** - GSAP-powered entrance and scroll animations
4. **Type Safety** - Full TypeScript support across the project
5. **Component Library** - Reusable UI components from shadcn/ui
6. **Modern Font** - Geist font family optimized with next/font

## Getting Started

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

Build for production:
```bash
npm run build
npm start
```

## How It Works

### Tailwind CSS
- Configured in `app/globals.css` with `@import "tailwindcss"`
- Theme colors defined as CSS custom properties (e.g., `--background`, `--foreground`)
- Components use utility classes: `className="flex items-center gap-4 p-6 rounded-lg"`

### shadcn/ui
- Install new components with: `npx shadcn@latest add [component-name]`
- Components are copied into your project (not imported from node_modules)
- Fully customizable and use the `cn()` utility from `lib/utils.ts` for class merging

### GSAP Animations
- Components use `useRef` and `useEffect` to initialize animations
- `gsap.context()` ensures proper cleanup on unmount
- ScrollTrigger plugin creates animations that trigger when elements enter the viewport
- Example pattern from `Hero.tsx:15-56`:
  ```tsx
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 100, opacity: 0, duration: 1, ease: 'power4.out'
      });
    }, heroRef);
    return () => ctx.revert(); // Cleanup
  }, []);
  ```

## Adding Your Own Content

### Project Screenshots
The portfolio currently uses placeholder images for projects. To add real screenshots:
1. Take screenshots of your live sites
2. Optimize images (< 200KB)
3. Save to `public/screenshots/`
4. Update paths in `components/sections/Projects.tsx`

See `SCREENSHOTS_GUIDE.md` for detailed instructions.

### Email Configuration
Configure EmailJS for the contact form:
1. Create an EmailJS account
2. Set up email service and template
3. Update credentials in `components/sections/Contact.tsx`

See `EMAILJS_SETUP.md` for detailed instructions.

## Deployment

### Firebase Hosting (Recommended)

This project is **ready for Firebase hosting**! It's configured for static export with all optimizations in place.

**Quick Deploy:**
```bash
# 1. Build static site
npm run build

# 2. Install Firebase CLI
npm install -g firebase-tools

# 3. Login and initialize
firebase login
firebase init

# 4. Deploy
firebase deploy
```

See `FIREBASE_DEPLOYMENT.md` for complete deployment guide including:
- Step-by-step setup
- Custom domain configuration
- Environment variables
- Performance optimization
- Troubleshooting tips

**Build Output:**
- Static files generated in `out/` directory
- Total size: ~186KB (optimized)
- All images < 200KB

### Other Hosting Options

The static export (`out/` directory) can also be deployed to:
- **Vercel** - `npm run build` then connect GitHub repo
- **Netlify** - Drag & drop `out/` folder or connect repo
- **GitHub Pages** - Deploy `out/` directory to gh-pages branch
- **Any static host** - Upload contents of `out/` directory

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [GSAP Documentation](https://gsap.com/docs)
- [GSAP Guide](./GSAP_GUIDE.md) - Custom guide for this project
