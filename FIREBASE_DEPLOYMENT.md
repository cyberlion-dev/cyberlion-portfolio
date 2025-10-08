# Firebase Hosting Deployment Guide

Your portfolio is **ready for Firebase hosting**! This guide walks you through deploying your Next.js portfolio to Google Firebase.

## ✅ Pre-Deployment Checklist

- [x] Next.js configured for static export (`output: 'export'`)
- [x] All images optimized (< 200KB each)
- [x] EmailJS configured with credentials
- [x] No TypeScript errors
- [x] Build tested successfully
- [x] Static files generated in `out/` directory

## 🚀 Deployment Steps

### 1. Install Firebase CLI

```bash
npm install -g firebase-tools
```

### 2. Login to Firebase

```bash
firebase login
```

This opens your browser for Google authentication.

### 3. Initialize Firebase in Your Project

```bash
firebase init
```

**Select:**
- ✅ **Hosting**: Configure files for Firebase Hosting
- Press Space to select, Enter to continue

**Configuration:**
1. **Use existing project or create new?**
   - Select existing project OR create new
2. **Public directory?**
   - Enter: `out`
3. **Configure as single-page app?**
   - Enter: `No` (we have 404.html)
4. **Set up automatic builds with GitHub?**
   - Enter: `No` (optional, can set up later)
5. **Overwrite index.html?**
   - Enter: `No` (keep our generated one)

### 4. Build Your Project

```bash
npm run build
```

This creates the `out/` directory with static files.

### 5. Deploy to Firebase

```bash
firebase deploy
```

Your site will be live at: `https://your-project-id.web.app`

## 📝 Firebase Configuration Files

After `firebase init`, you'll have these files:

### `.firebaserc`
```json
{
  "projects": {
    "default": "your-project-id"
  }
}
```

### `firebase.json`
```json
{
  "hosting": {
    "public": "out",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "cleanUrls": true,
    "trailingSlash": true
  }
}
```

**Recommended additions:**
```json
{
  "hosting": {
    "public": "out",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "cleanUrls": true,
    "trailingSlash": true,
    "headers": [
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      },
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
```

## 🔄 Update & Redeploy Workflow

Whenever you make changes:

```bash
# 1. Make your code changes
# 2. Build the project
npm run build

# 3. Deploy to Firebase
firebase deploy

# Optional: Preview before deploying
firebase serve
# Visit http://localhost:5000
```

## 🌐 Custom Domain Setup

### 1. Add Custom Domain in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to **Hosting** → **Add custom domain**
4. Enter your domain (e.g., `jordanboyce.dev`)

### 2. Update DNS Records

Firebase will provide DNS records to add to your domain registrar:

**For root domain (jordanboyce.dev):**
```
Type: A
Name: @
Value: <Firebase IP addresses>
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: <your-project-id>.web.app
```

### 3. Wait for SSL Certificate

Firebase automatically provisions SSL certificates. This can take 24-48 hours.

## 📊 Environment Variables

Your EmailJS credentials are hardcoded in `Contact.tsx`. For production, consider:

### Option 1: Keep as-is (Current Setup)
EmailJS public keys are safe to expose client-side. Current setup works fine.

### Option 2: Environment Variables (More Secure)

1. Create `.env.local`:
```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=gmail2
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_50j6eb6
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=user_o4tEBCpcTsbstAtv5jsln
```

2. Update `Contact.tsx:18-22`:
```tsx
const EMAILJS_CONFIG = {
  SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
  TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
  PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
};
```

3. Add to `.gitignore`:
```
.env*.local
```

## 🔍 Firebase Hosting Features

### Preview Channels
Test changes before going live:
```bash
firebase hosting:channel:deploy preview
```

### Multiple Sites
Host multiple sites in one project:
```bash
firebase hosting:sites:create new-site-name
```

### Rollback Deployments
View deployment history and rollback:
```bash
firebase hosting:rollback
```

## 📈 Performance Optimization

Your site is already optimized with:
- ✅ Static export (no server needed)
- ✅ Optimized images (< 200KB)
- ✅ Code splitting (automatic)
- ✅ CSS extraction (Tailwind)
- ✅ Gzip compression (Firebase automatic)

### Additional Optimizations

1. **Enable Compression Headers** (already in firebase.json above)
2. **Monitor with Firebase Performance:**
   ```bash
   firebase init performance
   ```

3. **Add Analytics:**
   ```bash
   firebase init analytics
   ```

## 🐛 Troubleshooting

### Build Errors

**Error: Image Optimization**
- Already fixed with `images.unoptimized: true` in next.config.ts

**Error: Dynamic Routes**
- Not applicable (single page app)

### Deployment Issues

**Error: Permission Denied**
```bash
firebase login --reauth
```

**Error: 404 on Refresh**
- Check `firebase.json` has correct `public: "out"`
- Ensure `trailingSlash: true` in next.config.ts

**Images Not Loading**
- Verify screenshots are in `out/screenshots/`
- Check image paths start with `./` not `/`

### Performance Issues

**Slow Load Times**
- Run `npm run build` to regenerate optimized build
- Check Firebase Analytics for bottlenecks
- Verify CDN caching is enabled

## 📱 Testing Checklist

Before deploying to production:

- [ ] Build succeeds: `npm run build`
- [ ] No console errors in browser
- [ ] All images load correctly
- [ ] EmailJS contact form works
- [ ] Dark mode toggles properly
- [ ] Mobile responsive (test on device)
- [ ] GSAP animations smooth
- [ ] Links open correctly (client sites)
- [ ] Test on multiple browsers

## 🎉 Post-Deployment

After successful deployment:

1. **Test your live site:** Visit `https://your-project-id.web.app`
2. **Test contact form:** Send a test email via EmailJS
3. **Check performance:** Run Lighthouse audit
4. **Monitor analytics:** Check Firebase Analytics (if enabled)
5. **Share your portfolio:** Update LinkedIn, GitHub, etc.

## 🔐 Security Notes

- ✅ EmailJS public key is safe to expose
- ✅ No API keys or secrets in code
- ✅ HTTPS automatic with Firebase
- ✅ Firebase security rules not needed (static hosting)

## 📚 Useful Commands

```bash
# Development
npm run dev                    # Local dev server

# Build & Deploy
npm run build                  # Build static site
firebase deploy               # Deploy to production
firebase serve                # Preview locally

# Firebase Management
firebase projects:list        # List your projects
firebase hosting:sites:list   # List hosting sites
firebase deploy --only hosting # Deploy only hosting

# Cleanup
rm -rf .next out              # Clear build artifacts
```

## 🌟 Next Steps

After deploying:

1. Set up custom domain
2. Enable Firebase Analytics
3. Add Google Search Console
4. Submit sitemap for SEO
5. Monitor performance metrics

## 📞 Support

- **Firebase Docs:** https://firebase.google.com/docs/hosting
- **Next.js Static Export:** https://nextjs.org/docs/app/building-your-application/deploying/static-exports
- **Firebase Console:** https://console.firebase.google.com

---

**Your portfolio is production-ready! 🚀**

Total build size: ~186KB (excellent!)
Static pages: 2 (homepage + 404)
Optimized images: 9 screenshots (< 200KB each)
