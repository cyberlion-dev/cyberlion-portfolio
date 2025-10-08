# Quick Reference Guide

## Common Tasks

### Adding a New shadcn/ui Component
```bash
npx shadcn@latest add [component-name]
```

### Adding a New Section Component
1. Create file in `components/sections/YourSection.tsx`
2. Add comment: `// Custom component - Description`
3. Import and add to `app/page.tsx`
4. Add navigation link if needed in `components/Navigation.tsx`

### Adding Project Screenshot
1. Take 1200x800px screenshot
2. Optimize to < 200KB
3. Save to `public/screenshots/project-name.jpg`
4. Update `components/sections/Projects.tsx` image path

### Adding New Project
Edit `components/sections/Projects.tsx`:
```tsx
{
  id: X,
  title: 'Project Name',
  description: 'Description here...',
  image: '/screenshots/project.jpg',
  tags: ['Tech1', 'Tech2'],
  category: 'Client Site' | 'Personal Project',
  role: 'Your Role',
  liveUrl: 'https://example.com',
  isPrivateRepo: true,
  featured: true, // Optional
},
```

### Adding New Tech Stack Category
Edit `components/sections/About.tsx` techStack array:
```tsx
{
  category: 'Category Name',
  icon: '🎨', // Emoji icon
  technologies: ['Tech1', 'Tech2', 'Tech3'],
},
```

### Creating GSAP Animation
```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from('.element', {
      scrollTrigger: {
        trigger: '.element',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
      immediateRender: false,
    });
  }, containerRef);

  return () => ctx.revert();
}, []);
```

## File Locations

### Key Configuration
- **Tailwind Config:** `app/globals.css` (uses @theme directive)
- **TypeScript Config:** `tsconfig.json`
- **Next.js Config:** `next.config.ts`
- **ESLint Config:** `eslint.config.mjs`
- **shadcn Config:** `components.json`

### Component Locations
- **Sections:** `components/sections/`
- **UI Components:** `components/ui/`
- **Layout:** `components/Navigation.tsx`, `app/layout.tsx`
- **Utils:** `lib/utils.ts`

### Documentation
- **Project README:** `README.md`
- **GSAP Guide:** `GSAP_GUIDE.md`
- **EmailJS Setup:** `EMAILJS_SETUP.md`
- **Screenshots Guide:** `SCREENSHOTS_GUIDE.md`
- **Claude Context:** `.claude/context.md`

## Important Line References

### EmailJS Config
`components/sections/Contact.tsx:18-22`

### GSAP Animations
- Hero entrance: `components/sections/Hero.tsx:18-84`
- Hero parallax: `components/sections/Hero.tsx:86-109`
- Logo hover: `components/Navigation.tsx:35-74`
- About scroll: `components/sections/About.tsx:43-78`
- Projects: `components/sections/Projects.tsx:129-184`

### Social Links
- Hero: `components/sections/Hero.tsx:96-121`
- Contact info: `components/sections/Contact.tsx:142-160`

### Tech Stack Data
`components/sections/About.tsx:92-128`

### Projects Data
`components/sections/Projects.tsx:16-117`

## Color Palette

Using OKLCH color space for better color consistency:

### Light Mode (root)
- Background: `oklch(1 0 0)` - White
- Foreground: `oklch(0.145 0 0)` - Near black
- Primary: `oklch(0.205 0 0)` - Dark gray
- Accent: `oklch(0.97 0 0)` - Light gray

### Dark Mode (.dark)
- Background: `oklch(0.145 0 0)` - Dark
- Foreground: `oklch(0.985 0 0)` - Near white
- Primary: `oklch(0.922 0 0)` - Light
- Accent: `oklch(0.269 0 0)` - Dark gray

## Common Class Combinations

### Container
```tsx
className="container mx-auto px-4 sm:px-6 lg:px-8"
```

### Section Padding
```tsx
className="py-20 md:py-32 px-4 sm:px-6 lg:px-8"
```

### Card Hover Effect
```tsx
className="hover:shadow-xl transition-shadow group"
// Then use group-hover: for children
```

### Centered Content
```tsx
className="flex items-center justify-center"
```

### Responsive Grid
```tsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
```

## GSAP Easing Cheat Sheet

- `power1.out` - Gentle slow down
- `power2.out` - Medium slow down
- `power4.out` - Strong slow down (most common)
- `back.out(1.7)` - Overshoot bounce
- `elastic.out(1, 0.3)` - Spring effect
- `sine.inOut` - Smooth continuous

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run lint             # Run linter

# Package management
npm install [package]    # Add dependency
npm uninstall [package]  # Remove dependency

# Git (if using)
git status              # Check status
git add .               # Stage all changes
git commit -m "message" # Commit changes
git push                # Push to remote

# Process management
tasklist | findstr node # Find node processes (Windows)
taskkill //PID [pid] //F # Kill process (Windows)
```

## Troubleshooting

### Animations not showing
- Check for `immediateRender: false`
- Check for `toggleActions` in ScrollTrigger
- Verify class names match selectors
- Clear browser cache

### Dark mode not working
- Check ThemeProvider in layout.tsx
- Verify CSS variables in globals.css
- Check theme-toggle implementation

### EmailJS not sending
- Verify all config values are correct
- Check browser console for errors
- Test with simple form first
- Ensure template variables match

### Build errors
- Check TypeScript errors: `npm run lint`
- Verify all imports are correct
- Check for missing dependencies
- Clear `.next` folder and rebuild

### Styles not applying
- Verify Tailwind classes are correct
- Check for typos in class names
- Ensure PostCSS config is correct
- Restart dev server

## Performance Checklist

- [ ] Images optimized (< 200KB)
- [ ] Using Next.js Image component
- [ ] Only transform properties in animations
- [ ] No large bundle dependencies
- [ ] Code split where appropriate
- [ ] Lazy load below-fold content

## Accessibility Checklist

- [ ] Semantic HTML (nav, section, article, etc.)
- [ ] Alt text on images
- [ ] ARIA labels on interactive elements
- [ ] Keyboard navigation works
- [ ] Focus styles visible
- [ ] Color contrast meets WCAG AA

## Deployment Checklist

- [ ] Build succeeds locally
- [ ] All env vars documented
- [ ] Meta tags and OG images set
- [ ] Favicon added
- [ ] Analytics configured (optional)
- [ ] Error tracking set up (optional)
- [ ] Custom domain configured
- [ ] HTTPS enabled
