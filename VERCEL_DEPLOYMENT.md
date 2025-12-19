# 🚀 Vercel Deployment Guide - Oblivion Labs

## ✅ Pre-Deployment Checklist

### 🔧 **Optimizations Completed:**
- ✅ Removed all admin dashboard components
- ✅ Eliminated Supabase dependencies
- ✅ Cleaned up unused packages (buffer, recharts, zustand)
- ✅ Optimized for Vercel deployment
- ✅ Google Analytics configured (G-D6QYQ9PF4R)
- ✅ EmailJS integration working
- ✅ Build successful and optimized

### 📦 **Current Bundle Size:**
- Main page: 10.5 kB
- First Load JS: 125 kB
- Total optimized for performance

## 🌐 **Vercel Deployment Steps**

### 1. **Push to GitHub**
```bash
git add .
git commit -m "feat: optimized for vercel deployment - removed admin, cleaned dependencies"
git push origin main
```

### 2. **Deploy to Vercel**
1. Go to [vercel.com](https://vercel.com)
2. **Import Git Repository**
3. Select your GitHub repo: `oblivion-labs-website`
4. **Framework Preset:** Next.js
5. **Build Command:** `npm run build` (auto-detected)
6. **Output Directory:** `.next` (auto-detected)

### 3. **Environment Variables**
Add these in Vercel Dashboard → Settings → Environment Variables:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID = oblivion_contact
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = template_ps2tc5y  
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = AxamBrcyXe7Bcm_Xw
NEXT_PUBLIC_GA_MEASUREMENT_ID = G-D6QYQ9PF4R
```

### 4. **Custom Domain (Optional)**
1. **Vercel Dashboard** → **Domains**
2. **Add Domain:** `oblivion-labs.com`
3. **Configure DNS** in your domain provider:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   
   Type: A
   Name: @
   Value: 76.76.19.61
   ```

## 🔧 **Optimizations Applied**

### **Performance:**
- ✅ Removed unused dependencies (-53 packages)
- ✅ Optimized bundle size (125 kB first load)
- ✅ Image optimization enabled
- ✅ Code splitting optimized
- ✅ Console logs removed in production

### **SEO:**
- ✅ Meta tags optimized
- ✅ Google Analytics integrated
- ✅ Structured data ready
- ✅ Sitemap generation ready

### **Security:**
- ✅ No sensitive data in client
- ✅ Environment variables secured
- ✅ XSS protection headers
- ✅ Content Security Policy ready

## 📊 **Features Ready**

### ✅ **Core Features:**
- 🎨 Modern design with bokeh animations
- 📱 Fully responsive
- 🌐 English/Spanish translations
- 📧 Contact form with EmailJS
- 📊 Google Analytics tracking
- 🔍 SEO optimized

### ✅ **Performance Features:**
- ⚡ Next.js 15 with App Router
- 🎯 Core Web Vitals optimized
- 📦 Minimal bundle size
- 🚀 Fast loading times
- 💾 Efficient caching

## 🧪 **Testing Checklist**

After deployment, verify:

- [ ] **Homepage loads correctly**
- [ ] **Language switcher works (ES/EN)**
- [ ] **Contact form sends emails**
- [ ] **Google Analytics tracking works**
- [ ] **All animations work smoothly**
- [ ] **Mobile responsive design**
- [ ] **Page speed > 90 (PageSpeed Insights)**

## 🔗 **Useful Links**

- **Vercel Dashboard:** [vercel.com/dashboard](https://vercel.com/dashboard)
- **Google Analytics:** [analytics.google.com](https://analytics.google.com)
- **EmailJS Dashboard:** [emailjs.com/admin](https://emailjs.com/admin)
- **PageSpeed Insights:** [pagespeed.web.dev](https://pagespeed.web.dev)

## 🎯 **Expected Performance**

- **Lighthouse Score:** 95+ 
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Cumulative Layout Shift:** < 0.1
- **First Input Delay:** < 100ms

---

**🚀 Ready for production deployment!**