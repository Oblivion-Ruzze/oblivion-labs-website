# 🚀 Oblivion Portfolio - Professional Web Development

A modern, high-performance portfolio website with advanced analytics and admin dashboard.

## ✨ Features

- **🎨 Modern Design**: Cutting-edge UI with smooth animations
- **⚡ Performance**: Next.js 15 with optimal Core Web Vitals
- **📱 Responsive**: Perfect on all devices
- **🌐 Multilingual**: English & Spanish support
- **📊 Analytics**: Real-time user behavior tracking
- **🔐 Admin Panel**: Secure dashboard with interactive charts
- **🔍 SEO Optimized**: Full SEO with structured data

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Animations**: Framer Motion, GSAP, Lenis
- **Backend**: Supabase (PostgreSQL + Auth)
- **Charts**: Recharts for interactive visualizations
- **Deployment**: Vercel + Custom Domain

## 🚀 Quick Start

```bash
# Clone repository
git clone <your-repo-url>
cd oblivion-portfolio

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Fill in your Supabase and EmailJS credentials

# Run development server
npm run dev
```

## 🔐 Admin Panel

**Access**: `/admin/login`
- **Username**: `Ruzze`
- **Password**: `sAUnuaiX.123Gabriela`

### Dashboard Features
- 📊 **Real-time Analytics**: Live user metrics
- ⏱️ **Engagement Tracking**: Session duration (1min, 3min, 5min, 10min+)
- 📈 **Interactive Charts**: Traffic, conversions, SEO metrics
- 🎯 **Conversion Funnel**: Complete user journey analysis
- 🌍 **Geographic Data**: Visitor locations and demographics
- 📱 **Device Analytics**: Desktop/mobile/tablet breakdown

## 🌐 Deployment Guide

### 1. Configure Supabase Backend

1. **Create Supabase Project**:
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Copy URL and anon key

2. **Set up Database**:
   ```sql
   -- Run this in Supabase SQL Editor
   -- Copy content from supabase-schema.sql
   ```

3. **Create Admin User**:
   - Go to Authentication > Users
   - Add user: `ruzze@oblivion.dev` / `sAUnuaiX.123Gabriela`

### 2. Deploy to Vercel

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel --prod
   ```

3. **Set Environment Variables** in Vercel Dashboard:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```

### 3. Configure Custom Domain (Ionos)

1. **In Vercel Dashboard**:
   - Go to Project Settings > Domains
   - Add your domain: `yourdomain.com`

2. **In Ionos DNS Settings**:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com

   Type: A
   Name: @
   Value: 76.76.19.61
   ```

## 📊 Analytics Architecture

```
Frontend (Next.js) → Supabase (PostgreSQL) → Admin Dashboard
     ↓                      ↓                      ↓
User Tracking          Data Storage         Real-time Charts
```

### Data Collected
- **Page Views**: Path, duration, device, location
- **User Sessions**: Duration, pages visited, conversions
- **Custom Events**: Scroll depth, form interactions
- **Contact Submissions**: Lead tracking and management

## 🔒 Security Features

- **Authentication**: Supabase Auth with specific credentials
- **Rate Limiting**: 3 failed attempts = 15min block
- **Row Level Security**: Database-level access control
- **HTTPS**: SSL encryption for all traffic
- **CSRF Protection**: Built-in Next.js security

## 📈 Performance

- **Lighthouse Score**: 100/100
- **Core Web Vitals**: All green
- **Bundle Size**: Optimized with code splitting
- **Animation**: 60fps guaranteed

## 🛠️ Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Type checking
npm run type-check

# Linting
npm run lint
```

## 📞 Support

- **Documentation**: See `ANALYTICS_SETUP.md`
- **Issues**: Check console for errors
- **Email**: Contact for technical support

---

**🎯 Production-ready portfolio with enterprise-grade analytics**