# 📊 Analytics & Admin Panel Setup

Este sistema incluye un **admin panel completo** con métricas avanzadas, tracking de usuarios, y monitoreo SEO.

## 🚀 Características

### Dashboard de Analytics
- **Métricas en tiempo real**: Visitantes, páginas vistas, tiempo de sesión
- **Análisis de conversión**: % de conversión, formularios completados
- **Geografía**: Países y ciudades de visitantes
- **Dispositivos**: Breakdown desktop/mobile/tablet
- **Páginas populares**: Top páginas más visitadas

### Tracking Avanzado
- **Comportamiento de usuario**: Scroll depth, tiempo en página
- **Eventos personalizados**: Clicks, interacciones, formularios
- **Sesiones de usuario**: Tracking completo de la experiencia
- **Fuentes de tráfico**: Referrers y canales de adquisición

### SEO Monitoring
- **Métricas orgánicas**: Tráfico, rankings, backlinks
- **Core Web Vitals**: LCP, FID, CLS
- **Page Speed**: Scores de rendimiento
- **Keywords**: Tracking de posiciones

## 🛠️ Configuración

### 1. Configurar Supabase

1. Crea un proyecto en [Supabase](https://supabase.com)
2. Ve a **SQL Editor** y ejecuta el archivo `supabase-schema.sql`
3. Copia las credenciales de **Settings > API**

### 2. Variables de Entorno

Crea un archivo `.env.local`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key

# EmailJS (para formulario de contacto)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=tu_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=tu_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=tu_public_key

# Google Analytics (opcional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 3. Configurar Autenticación

1. En Supabase, ve a **Authentication > Users**
2. Crea un usuario admin:
   - Email: `admin@oblivion.dev`
   - Password: `admin123` (cámbialo en producción)

### 4. Configurar EmailJS

1. Crea una cuenta en [EmailJS](https://www.emailjs.com/)
2. Configura un servicio de email
3. Crea un template con estas variables:
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{company}}`
   - `{{budget}}`
   - `{{message}}`

## 📈 Uso del Admin Panel

### Acceso
- URL: `https://tu-sitio.com/admin/login`
- **Username**: `Ruzze`
- **Password**: `sAUnuaiX.123Gabriela`
- **Email**: `ruzze@oblivion.dev`

### Secciones

#### 📊 Overview
- Métricas generales del sitio
- KPIs principales
- Gráficos de tendencias

#### 🚦 Traffic
- Análisis detallado de tráfico
- Fuentes de visitantes
- Patrones de navegación

#### ⏱️ Engagement
- **Métricas en tiempo real**: Usuarios activos, páginas vistas actuales
- **Tiempo de permanencia**: Distribución de duración de sesiones (1min, 3min, 5min, 10min+)
- **Análisis de scroll**: Profundidad de scroll por página
- **Patrones de actividad**: Actividad por horas del día
- **Retención de usuarios**: Usuarios nuevos vs. recurrentes
- **Engagement por dispositivo**: Tiempo promedio por tipo de dispositivo
- **Gráficos interactivos**: Visualizaciones con Recharts

#### 🎯 Conversions
- Formularios completados
- Tasas de conversión
- Embudo de conversión

#### 🔍 SEO
- Métricas de SEO
- Rankings de keywords
- Core Web Vitals

#### 📧 Contacts
- Lista de contactos recibidos
- Estado de seguimiento
- Análisis de leads

## 🚀 Despliegue en Vercel

### 1. Conectar Repositorio
```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel --prod
```

### 2. Configurar Variables de Entorno
En el dashboard de Vercel, agrega todas las variables de `.env.local`

### 3. Configurar Dominio
- Agrega tu dominio personalizado
- Configura SSL automático

## 📊 Métricas Disponibles

### Tráfico
- Visitantes únicos
- Páginas vistas
- Sesiones
- Duración promedio
- Tasa de rebote

### Conversiones
- Formularios completados
- Tasa de conversión
- Valor por visitante
- Embudo de conversión

### SEO
- Tráfico orgánico
- Rankings de keywords
- Backlinks
- Domain Authority
- Page Speed Score

### Comportamiento
- Páginas más visitadas
- Tiempo en página
- Scroll depth
- Eventos personalizados

## 🔧 Personalización

### Agregar Eventos Personalizados
```typescript
import { trackEvent } from '@/lib/analytics'

// Trackear click en botón
trackEvent('button_click', {
  button_name: 'cta_hero',
  page: '/home'
})

// Trackear descarga
trackEvent('file_download', {
  file_name: 'portfolio.pdf',
  file_type: 'pdf'
})
```

### Configurar Alertas
Puedes configurar alertas en Supabase para:
- Nuevos contactos
- Picos de tráfico
- Errores de conversión

## 🛡️ Seguridad

### Sistema de Autenticación Robusto
- **Credenciales específicas**: Solo el usuario `Ruzze` puede acceder
- **Límite de intentos**: Máximo 3 intentos fallidos
- **Bloqueo temporal**: 15 minutos de bloqueo tras intentos fallidos
- **Validación de email**: Solo `ruzze@oblivion.dev` tiene acceso
- **Tracking de seguridad**: Registro de intentos de login y bloqueos
- **Redirección automática**: Usuarios no autorizados son redirigidos

### Row Level Security (RLS)
- Todas las tablas tienen RLS habilitado
- Solo usuarios autenticados pueden leer datos
- Tracking público solo para inserción

### Datos Sensibles
- IPs se almacenan hasheadas
- Datos personales encriptados
- Cumple con GDPR

### Middleware de Protección
- Rutas `/admin/*` protegidas automáticamente
- Verificación de sesión en cada request
- Redirección automática a login si no autenticado

## 📱 Responsive
El admin panel es completamente responsive y funciona en:
- Desktop
- Tablet
- Mobile

## 🎨 Personalización Visual
Puedes personalizar:
- Colores del dashboard
- Gráficos y métricas
- Layout de secciones
- Branding del admin

## 🔄 Actualizaciones Automáticas
- Datos en tiempo real
- Refresh automático cada 30 segundos
- Notificaciones push (opcional)

## 📞 Soporte
Para soporte técnico:
- Email: admin@oblivion.dev
- Documentación: Ver código fuente
- Issues: GitHub repository