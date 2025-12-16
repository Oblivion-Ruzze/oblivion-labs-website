# 🚀 Guía de Despliegue - Oblivion Labs

Esta guía te ayudará a desplegar el sitio web de Oblivion Labs desde IONOS hasta Vercel con el dominio oblivion-labs.com.

## 📋 Requisitos Previos

- [x] Dominio oblivion-labs.com comprado en IONOS
- [ ] Cuenta en Vercel
- [ ] Cuenta en Zoho Mail (para el email hola@oblivion-labs.com)
- [ ] Repositorio en GitHub con el código

## 🌐 Paso 1: Configurar el Repositorio en GitHub

1. **Crear repositorio en GitHub:**
   ```bash
   # Si no tienes el repo aún
   git init
   git add .
   git commit -m "Initial commit - Oblivion Labs website"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/oblivion-labs.git
   git push -u origin main
   ```

2. **Asegúrate de que estos archivos estén incluidos:**
   - `package.json`
   - `next.config.js`
   - `vercel.json` (si existe)
   - Todos los archivos de `src/`
   - Archivos de `public/`

## 🚀 Paso 2: Desplegar en Vercel

### 2.1 Conectar GitHub a Vercel

1. Ve a [vercel.com](https://vercel.com) y crea una cuenta
2. Haz clic en "New Project"
3. Conecta tu cuenta de GitHub
4. Selecciona el repositorio `oblivion-labs`
5. Configura el proyecto:
   - **Framework Preset:** Next.js
   - **Root Directory:** `./` (raíz)
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`

### 2.2 Variables de Entorno (si las necesitas)

En Vercel, ve a Settings > Environment Variables y agrega:

```env
# Analytics (si usas Supabase)
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_key

# EmailJS (para el formulario de contacto)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=tu_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=tu_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=tu_public_key
```

### 2.3 Desplegar

1. Haz clic en "Deploy"
2. Espera a que termine el build (2-5 minutos)
3. Tu sitio estará disponible en una URL como `oblivion-labs.vercel.app`

## 🌍 Paso 3: Configurar el Dominio Personalizado

### 3.1 En Vercel

1. Ve a tu proyecto en Vercel
2. Settings > Domains
3. Agrega tu dominio: `oblivion-labs.com`
4. También agrega: `www.oblivion-labs.com`
5. Vercel te dará los registros DNS que necesitas

### 3.2 Configurar SSL en IONOS (IMPORTANTE)

**Cuando IONOS te pregunte sobre el certificado SSL:**

1. Ve a tu panel de IONOS
2. Busca "SSL Certificate" o "Certificado SSL"
3. Selecciona: **"Use with my own server"** ⚠️ **MUY IMPORTANTE**
4. **NO selecciones** "Use with my IONOS website"
5. Esto es porque usarás Vercel, no el hosting de IONOS

**¿Por qué "Use with my own server"?**
- Vercel maneja automáticamente los certificados SSL
- IONOS solo necesita saber que usarás un servidor externo
- El certificado SSL será gestionado por Vercel, no por IONOS

### 3.3 En IONOS (Configurar DNS)

1. Inicia sesión en tu cuenta de IONOS
2. Ve a "Dominios" > "oblivion-labs.com"
3. Haz clic en "DNS"
4. **ELIMINA todos los registros A existentes**
5. Agrega estos registros:

**Para el dominio principal:**
```
Tipo: A
Nombre: @
Valor: 76.76.19.61 (IP de Vercel)
TTL: 3600
```

**Para www:**
```
Tipo: CNAME
Nombre: www
Valor: cname.vercel-dns.com
TTL: 3600
```

**Alternativamente, puedes usar CNAME para ambos (RECOMENDADO):**
```
Tipo: CNAME
Nombre: @
Valor: cname.vercel-dns.com
TTL: 3600

Tipo: CNAME
Nombre: www
Valor: cname.vercel-dns.com
TTL: 3600
```

### 3.4 Verificar la Configuración

1. Espera 24-48 horas para la propagación DNS
2. Verifica en: https://dnschecker.org/
3. Tu sitio debería estar disponible en `https://oblivion-labs.com`
4. **El SSL será automático** - Vercel lo configura por ti

## 📧 Paso 4: Configurar Email con Zoho Mail

### 4.1 Crear Cuenta en Zoho Mail

1. Ve a [zoho.com/mail](https://www.zoho.com/mail/)
2. Crea una cuenta gratuita
3. Selecciona "Add your domain"
4. Ingresa `oblivion-labs.com`

### 4.2 Configurar DNS para Email

En IONOS, agrega estos registros MX:

```
Tipo: MX
Nombre: @
Valor: mx.zoho.com
Prioridad: 10
TTL: 3600

Tipo: MX
Nombre: @
Valor: mx2.zoho.com
Prioridad: 20
TTL: 3600

Tipo: MX
Nombre: @
Valor: mx3.zoho.com
Prioridad: 50
TTL: 3600
```

**Registro TXT para verificación:**
```
Tipo: TXT
Nombre: @
Valor: zoho-verification=tu_codigo_de_verificacion
TTL: 3600
```

### 4.3 Crear la Cuenta de Email

1. Una vez verificado el dominio en Zoho
2. Crea el usuario: `hola@oblivion-labs.com`
3. Configura la contraseña
4. ¡Listo! Ya tienes tu email profesional

## 🔧 Paso 5: Configuraciones Adicionales

### 5.1 Configurar EmailJS (Para el formulario de contacto)

**Paso a paso completo:**

1. **Crear cuenta en EmailJS:**
   - Ve a [emailjs.com](https://www.emailjs.com/)
   - Regístrate con tu email
   - Confirma tu cuenta

2. **Crear un servicio de email:**
   - En el dashboard, ve a "Email Services"
   - Haz clic en "Add New Service"
   - Selecciona "Gmail" (recomendado) o "Outlook"
   - Conecta tu cuenta `hola@oblivion-labs.com`
   - Copia el **Service ID** (lo necesitarás después)

3. **Crear un template:**
   - Ve a "Email Templates"
   - Haz clic en "Create New Template"
   - Usa este template:

   ```html
   Subject: Nuevo contacto desde Oblivion Labs - {{from_name}}
   
   From: {{from_name}} ({{from_email}})
   Company: {{company}}
   Budget: {{budget}}
   
   Message:
   {{message}}
   
   ---
   Enviado desde oblivion-labs.com
   ```

   - Guarda y copia el **Template ID**

4. **Obtener Public Key:**
   - Ve a "Account" > "General"
   - Copia tu **Public Key**

5. **Configurar variables en Vercel:**
   - Ve a tu proyecto en Vercel
   - Settings > Environment Variables
   - Agrega estas variables:

   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=tu_service_id_aqui
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=tu_template_id_aqui
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=tu_public_key_aqui
   ```

6. **Redesplegar:**
   - Haz un nuevo commit y push
   - O redespliega manualmente en Vercel

### 5.2 SSL Certificate

Vercel automáticamente provee certificados SSL. Tu sitio será accesible via HTTPS.

### 5.3 Redirects (Opcional)

Si quieres que `www.oblivion-labs.com` redirija a `oblivion-labs.com`, agrega en `vercel.json`:

```json
{
  "redirects": [
    {
      "source": "/(.*)",
      "has": [
        {
          "type": "host",
          "value": "www.oblivion-labs.com"
        }
      ],
      "destination": "https://oblivion-labs.com/$1",
      "permanent": true
    }
  ]
}
```

## 🧪 Paso 6: Verificar Funcionalidad Completa

### 6.1 Verificar Botones y Navegación

**Todos estos botones deben funcionar correctamente:**

1. **Hero Section:**
   - ✅ "View Our Work" → Scroll a Projects
   - ✅ "Start Your Project" → Scroll a Contact

2. **Services Section:**
   - ✅ "Get Started" (en cada servicio) → Scroll a Contact
   - ✅ "Schedule a Consultation" → Scroll a Contact

3. **Process Section:**
   - ✅ "Start Your Project" → Scroll a Contact

4. **Meet the Team Section:**
   - ✅ "Start Your Project" → Scroll a Contact

5. **Navbar:**
   - ✅ Todos los enlaces navegan correctamente
   - ✅ "Get Started" → Scroll a Contact
   - ✅ Logo → Scroll a Hero

### 6.2 Verificar Formulario de Contacto

**El formulario debe:**
- ✅ Validar campos requeridos
- ✅ Mostrar mensajes de error/éxito
- ✅ Enviar emails a `hola@oblivion-labs.com`
- ✅ Funcionar en ambos idiomas (EN/ES)

### 6.3 Verificar Traducciones

**Cambiar idioma debe actualizar:**
- ✅ Navbar: "Technologies" / "Tecnologías"
- ✅ Todo el contenido del sitio
- ✅ Formulario de contacto
- ✅ Botones y CTAs

### 6.4 Verificar Responsive Design

**Probar en:**
- ✅ Desktop (1920px+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (320px - 767px)

## ✅ Checklist Final

- [ ] Código subido a GitHub
- [ ] Proyecto desplegado en Vercel
- [ ] Dominio configurado en Vercel
- [ ] DNS configurado en IONOS
- [ ] **SSL configurado como "Use with my own server"**
- [ ] Email configurado en Zoho Mail
- [ ] EmailJS configurado y funcionando
- [ ] Variables de entorno configuradas
- [ ] SSL funcionando (https://)
- [ ] **Todos los botones funcionando**
- [ ] **Formulario de contacto funcionando**
- [ ] **Traducciones funcionando**
- [ ] Sitio accesible en oblivion-labs.com
- [ ] **Responsive design verificado**

## 🆘 Solución de Problemas

### El sitio no carga
- Verifica que los registros DNS estén correctos
- Espera 24-48 horas para propagación
- Usa `dig oblivion-labs.com` para verificar DNS

### El email no funciona
- Verifica los registros MX en IONOS
- Confirma la verificación en Zoho Mail
- Revisa la configuración de EmailJS

### Errores de build en Vercel
- Revisa los logs en Vercel Dashboard
- Verifica que todas las dependencias estén en `package.json`
- Asegúrate de que no hay errores de TypeScript

## 📞 Contacto

Si tienes problemas con el despliegue, revisa:
- [Documentación de Vercel](https://vercel.com/docs)
- [Documentación de IONOS](https://www.ionos.com/help/)
- [Documentación de Zoho Mail](https://www.zoho.com/mail/help/)

---

**¡Tu sitio web de Oblivion Labs estará listo para conquistar el mundo! 🚀**