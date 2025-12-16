# 🚀 Guía Completa de Deployment - Oblivion Labs Website

## 📋 Checklist Pre-Deployment

### ✅ Configuraciones Completadas
- [x] EmailJS configurado con Gmail (xlcodecontact@gmail.com)
- [x] Google Analytics configurado (G-D6QYQ9PF4R)
- [x] Next.js configurado para export estático
- [x] Netlify.toml creado
- [x] Variables de entorno configuradas
- [x] Errores de ESLint corregidos

### 🔧 Configuraciones Técnicas
- [x] `output: 'export'` en next.config.js
- [x] `trailingSlash: true` para compatibilidad con Netlify
- [x] `images: { unoptimized: true }` para export estático
- [x] ESLint deshabilitado durante build (`ignoreDuringBuilds: true`)

## 🌐 Pasos para Deployment en Netlify

### 1. Preparar el Repositorio Git

```bash
# Si no has hecho commit aún
git add .
git commit -m "feat: ready for netlify deployment with analytics"

# Crear repositorio en GitHub (ve a github.com)
# Nombre sugerido: oblivion-labs-website

# Conectar repositorio local con GitHub
git remote add origin https://github.com/TU_USUARIO/oblivion-labs-website.git
git branch -M main
git push -u origin main
```

### 2. Configurar Netlify

1. **Crear cuenta en Netlify**
   - Ve a [netlify.com](https://netlify.com)
   - Regístrate con GitHub (recomendado)

2. **Conectar repositorio**
   - Click en "New site from Git"
   - Selecciona GitHub
   - Busca y selecciona tu repositorio `oblivion-labs-website`

3. **Configurar build settings**
   - Build command: `npm run build`
   - Publish directory: `out`
   - Node version: `18` (ya configurado en netlify.toml)

### 3. Variables de Entorno en Netlify

En el dashboard de Netlify, ve a **Site settings > Environment variables** y agrega:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID = oblivion_contact
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = template_ps2tc5y
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = AxamBrcyXe7Bcm_Xw
NEXT_PUBLIC_GA_MEASUREMENT_ID = G-D6QYQ9PF4R
```

### 4. Configurar Dominio Personalizado (Opcional)

1. **En Netlify Dashboard:**
   - Ve a **Site settings > Domain management**
   - Click "Add custom domain"
   - Ingresa: `oblivion-labs.com`

2. **Configurar DNS:**
   - En tu proveedor de dominio, configura los nameservers de Netlify
   - O configura un CNAME record apuntando a tu sitio de Netlify

### 5. Configurar SSL (Automático)

Netlify automáticamente configurará SSL con Let's Encrypt. Solo espera unos minutos después del deployment.

## 🔍 Verificación Post-Deployment

### ✅ Checklist de Funcionalidades

- [ ] **Sitio carga correctamente**
- [ ] **Formulario de contacto funciona** (envía email a xlcodecontact@gmail.com)
- [ ] **Cambio de idioma funciona** (ES/EN)
- [ ] **Navegación smooth scroll funciona**
- [ ] **Animaciones bokeh se ven correctamente**
- [ ] **Google Analytics está tracking** (verifica en GA dashboard)
- [ ] **Responsive design funciona** (móvil, tablet, desktop)
- [ ] **SEO meta tags están presentes**

### 🧪 Pruebas Específicas

1. **Formulario de Contacto:**
   ```
   - Llenar todos los campos
   - Enviar mensaje
   - Verificar email recibido en xlcodecontact@gmail.com
   - Verificar mensaje de confirmación en el sitio
   ```

2. **Google Analytics:**
   ```
   - Abrir Google Analytics dashboard
   - Verificar que aparezcan visitas en tiempo real
   - Verificar eventos de navegación
   ```

3. **Performance:**
   ```
   - Usar PageSpeed Insights
   - Verificar Core Web Vitals
   - Objetivo: Score > 90
   ```

## 🚨 Solución de Problemas Comunes

### Build Fails
```bash
# Si el build falla, verifica:
npm run build  # Debe funcionar localmente primero
```

### Formulario no envía emails
- Verificar variables de entorno en Netlify
- Verificar que EmailJS service esté activo
- Verificar template ID en EmailJS dashboard

### Analytics no funciona
- Verificar que G-D6QYQ9PF4R esté en variables de entorno
- Verificar que el script esté en el HTML generado
- Esperar 24-48 horas para datos en GA

### Imágenes no cargan
- Verificar que `images: { unoptimized: true }` esté en next.config.js
- Verificar que las imágenes estén en la carpeta `public/`

## 📊 Monitoreo Post-Launch

### Google Analytics Setup
1. Ve a [analytics.google.com](https://analytics.google.com)
2. Verifica que el property G-D6QYQ9PF4R esté recibiendo datos
3. Configura goals para el formulario de contacto

### Google Search Console
1. Ve a [search.google.com/search-console](https://search.google.com/search-console)
2. Agrega la propiedad oblivion-labs.com
3. Verifica ownership via Google Analytics
4. Envía el sitemap: `https://oblivion-labs.com/sitemap.xml`

## 🔄 Workflow de Updates

Para futuras actualizaciones:

```bash
# Hacer cambios en el código
git add .
git commit -m "feat: descripción del cambio"
git push origin main

# Netlify automáticamente rebuildeará y desplegará
```

## 📞 Contactos de Soporte

- **Netlify Support:** [netlify.com/support](https://netlify.com/support)
- **EmailJS Support:** [emailjs.com/docs](https://emailjs.com/docs)
- **Google Analytics:** [support.google.com/analytics](https://support.google.com/analytics)

---

## 🎯 Próximos Pasos Recomendados

1. **SEO Optimization:**
   - Crear sitemap.xml
   - Configurar robots.txt
   - Optimizar meta descriptions

2. **Performance:**
   - Implementar lazy loading
   - Optimizar imágenes con WebP
   - Configurar CDN

3. **Analytics Avanzados:**
   - Configurar conversion tracking
   - Implementar heatmaps (Hotjar)
   - Configurar A/B testing

4. **Security:**
   - Configurar CSP headers
   - Implementar rate limiting
   - Configurar monitoring

---

**¡Tu sitio está listo para el mundo! 🌍✨**