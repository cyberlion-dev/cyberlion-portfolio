# GSAP Animation Guide

This project uses GSAP (GreenSock Animation Platform) for professional-grade animations. This guide covers how to use GSAP in this Next.js/React project.

## What is GSAP?

GSAP is a JavaScript animation library that provides:
- **High performance** - Hardware-accelerated animations
- **Cross-browser compatibility** - Works everywhere
- **Rich API** - Easy to use, powerful features
- **Plugins** - ScrollTrigger, Draggable, MotionPath, etc.

## Installation

Already installed in this project:
```bash
npm install gsap
```

## Basic Usage in React/Next.js

### 1. Simple Animation on Mount

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function MyComponent() {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate element when component mounts
    gsap.from(elementRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power4.out',
    });
  }, []);

  return <div ref={elementRef}>Animated content</div>;
}
```

### 2. Using gsap.context() for Cleanup

**Best Practice**: Always use `gsap.context()` in React to ensure proper cleanup.

```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    // All animations go here
    gsap.from('.my-class', {
      opacity: 0,
      duration: 1,
    });
  }, containerRef); // Scope to container

  // Cleanup automatically handled
  return () => ctx.revert();
}, []);
```

See: `components/sections/Hero.tsx:15-56` for real example.

### 3. ScrollTrigger Plugin

Trigger animations when elements enter the viewport.

```tsx
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugin ONCE at top of file
gsap.registerPlugin(ScrollTrigger);

useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from('.element', {
      scrollTrigger: {
        trigger: '.element',
        start: 'top 80%', // When top of element is 80% down viewport
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        // markers: true, // Debug mode - shows trigger points
      },
      opacity: 0,
      y: 50,
      duration: 1,
    });
  });

  return () => ctx.revert();
}, []);
```

See: `components/sections/About.tsx:14-78` for real example.

## Common Animation Properties

### Transform Properties
```tsx
{
  x: 100,              // Move right 100px
  y: -50,              // Move up 50px
  scale: 1.5,          // Scale to 150%
  rotation: 45,        // Rotate 45 degrees
  skewX: 10,           // Skew on X axis
}
```

### Display Properties
```tsx
{
  opacity: 0,          // Fade to invisible
  autoAlpha: 0,        // Opacity + visibility (better)
}
```

### Timing & Easing
```tsx
{
  duration: 1,         // Animation duration in seconds
  delay: 0.5,          // Wait before starting
  ease: 'power4.out',  // Easing function
  stagger: 0.1,        // Delay between multiple elements
}
```

### Common Easing Values
- `'power1.out'` - Gentle deceleration
- `'power4.out'` - Strong deceleration (most common)
- `'back.out(1.7)'` - Overshoot effect (bouncy)
- `'elastic.out(1, 0.3)'` - Spring/elastic effect
- `'none'` - Linear (no easing)

## Animation Methods

### gsap.from()
Animate FROM specified values TO current state.
```tsx
// Element starts at opacity:0, y:100 and animates to its current state
gsap.from('.box', { opacity: 0, y: 100, duration: 1 });
```

### gsap.to()
Animate FROM current state TO specified values.
```tsx
// Element animates from current position to opacity:0, x:200
gsap.to('.box', { opacity: 0, x: 200, duration: 1 });
```

### gsap.fromTo()
Specify both start and end values.
```tsx
gsap.fromTo('.box',
  { opacity: 0, scale: 0 },     // From
  { opacity: 1, scale: 1, duration: 1 }  // To
);
```

### gsap.timeline()
Chain multiple animations.
```tsx
const tl = gsap.timeline();
tl.from('.title', { opacity: 0, y: 50, duration: 1 })
  .from('.subtitle', { opacity: 0, y: 30, duration: 0.8 }, '-=0.5') // Overlap by 0.5s
  .from('.button', { scale: 0, duration: 0.5 });
```

## Stagger Animations

Animate multiple elements with a delay between each:

```tsx
// Simple stagger
gsap.from('.card', {
  opacity: 0,
  y: 50,
  stagger: 0.2, // 0.2s delay between each
  duration: 1,
});

// Advanced stagger
gsap.from('.card', {
  opacity: 0,
  stagger: {
    amount: 1,      // Total time for all staggers
    from: 'center', // Start from center element
    grid: [3, 4],   // Grid layout for calculations
    ease: 'power2.inOut',
  },
});
```

See: `components/sections/Hero.tsx:35-42` for stagger example.

## ScrollTrigger Configuration

```tsx
scrollTrigger: {
  trigger: '.element',           // Element that triggers
  start: 'top 80%',              // When trigger starts
  end: 'bottom 20%',             // When trigger ends
  scrub: true,                   // Link animation to scroll position
  pin: true,                     // Pin element during animation
  toggleActions: 'play pause resume reverse',
  markers: true,                 // Show debug markers (remove in production)
  onEnter: () => console.log('entered'),
  onLeave: () => console.log('left'),
}
```

### toggleActions Format
`'onEnter onLeave onEnterBack onLeaveBack'`

Values: `play`, `pause`, `resume`, `reverse`, `restart`, `reset`, `complete`, `none`

Examples:
- `'play none none none'` - Play once, stay
- `'play reverse play reverse'` - Reverse on scroll up
- `'play pause resume reset'` - Full control

## Mouse/Cursor Animations

### Follow Cursor
```tsx
const cursorRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    gsap.to(cursorRef.current, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  window.addEventListener('mousemove', handleMouseMove);
  return () => window.removeEventListener('mousemove', handleMouseMove);
}, []);
```

### Parallax Effect
```tsx
const handleMouseMove = (e: MouseEvent) => {
  const { clientX, clientY } = e;
  const { innerWidth, innerHeight } = window;

  const xPercent = (clientX / innerWidth - 0.5) * 2;
  const yPercent = (clientY / innerHeight - 0.5) * 2;

  gsap.to('.parallax-element', {
    x: xPercent * 50, // Move 50px max
    y: yPercent * 50,
    duration: 0.5,
  });
};
```

## SVG Animations

```tsx
// Draw SVG path
gsap.fromTo('.svg-path',
  { drawSVG: '0%' },
  { drawSVG: '100%', duration: 2, ease: 'none' }
);

// Morph SVG (requires MorphSVG plugin)
gsap.to('.svg-path', {
  morphSVG: '.target-shape',
  duration: 1,
});
```

## Performance Tips

1. **Use transforms over position properties**
   ```tsx
   // Good - GPU accelerated
   gsap.to('.box', { x: 100, y: 50 });

   // Bad - triggers layout recalculation
   gsap.to('.box', { left: 100, top: 50 });
   ```

2. **Use `will-change` for heavy animations**
   ```tsx
   className="will-change-transform"
   ```

3. **Batch similar animations**
   ```tsx
   gsap.to(['.el1', '.el2', '.el3'], { opacity: 0 });
   ```

4. **Kill animations on unmount**
   ```tsx
   useEffect(() => {
     const ctx = gsap.context(() => { /* animations */ });
     return () => ctx.revert(); // Kills all animations
   }, []);
   ```

## Common Patterns in This Project

### 1. Entrance Animation (Hero)
`components/sections/Hero.tsx:15-56`
- Title slides up with opacity
- Subtitle follows with delay
- Buttons stagger in
- Social icons bounce in

### 2. Scroll-Triggered Cards (About)
`components/sections/About.tsx:39-78`
- Cards slide up when scrolled into view
- Stagger creates wave effect
- Each section independently triggered

### 3. Form Field Focus Effect (Contact)
`components/sections/Contact.tsx`
- Could add: Scale up on focus
- Shake on validation error

## Debugging

### Enable Markers
```tsx
scrollTrigger: {
  trigger: '.element',
  markers: true, // Shows start/end points
}
```

### Log Animation Progress
```tsx
gsap.to('.box', {
  x: 100,
  onUpdate: (self) => console.log(self.progress()),
  onComplete: () => console.log('Done!'),
});
```

### Check if ScrollTrigger is Active
```tsx
ScrollTrigger.getAll().forEach(st => {
  console.log(st.trigger, st.vars);
});
```

## Resources

- [GSAP Documentation](https://gsap.com/docs/v3/)
- [GSAP Cheat Sheet](https://gsap.com/resources/get-started/)
- [ScrollTrigger Demos](https://codepen.io/collection/AEbkkJ)
- [Easing Visualizer](https://gsap.com/docs/v3/Eases)

## Examples in This Project

1. **Animated logo hover** - `components/Navigation.tsx:35-74`
   - Letter-by-letter stagger reveal
   - 3D rotation effect (rotationY)
   - Pipe separator slides in
   - Reverse animation on mouse leave
2. **Hero entrance** - `components/sections/Hero.tsx:18-84`
   - Title/subtitle slide up
   - Buttons stagger in
   - Social icons bounce in
3. **Floating shapes with parallax** - `components/sections/Hero.tsx:57-109`
   - Shapes scale in on load
   - Continuous floating animation (yoyo + repeat)
   - Mouse parallax effect with variable speed per shape
4. **Scroll animations** - `components/sections/About.tsx:14-78`
5. **Card reveals** - `components/sections/Projects.tsx`
6. **Form animations** - `components/sections/Contact.tsx`

## Next Steps

Ideas for more animations:
- ✨ Cursor trail effect
- 🎨 SVG drawing animations
- 📊 Number counter animations
- 🎭 Text scramble/glitch effects
- 🌊 Smooth scroll with parallax
- 🎪 Magnetic buttons (follow cursor)
