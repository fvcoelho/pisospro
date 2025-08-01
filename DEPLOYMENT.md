# Deployment Guide - Pisos Pró

## Environment Files

This project uses different environment files for different stages:

- `.env` - Development environment (local)
- `.env.production` - Production environment 
- `.env.local.example` - Template for local development

## Pre-deployment Checklist

### 1. Environment Variables

Before deploying to production, ensure all environment variables in `.env.production` are properly configured:

- [ ] `DATABASE_URL` - Production database connection string
- [ ] `APP_URL` - Production domain (https://pisospro.com.br)
- [ ] `NEXT_PUBLIC_APP_URL` - Same as APP_URL
- [ ] `NEXTAUTH_SECRET` - Strong secret for authentication (if using)
- [ ] Email configuration (if needed)
- [ ] Error reporting configuration (optional)

### 2. Database Setup

```bash
# Run database migrations in production
npx prisma migrate deploy

# Or push schema changes (if not using migrations)
npx prisma db push

# Generate Prisma client
npx prisma generate
```

### 3. Build Verification

```bash
# Test production build locally
npm run build
npm start
```

## Deployment Options

### Vercel (Recommended)

1. **Connect Repository**
   - Import project from GitHub to Vercel
   - Select the repository

2. **Configure Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.production`
   - Set `NODE_ENV=production`

3. **Build Settings**
   ```
   Build Command: npm run build
   Install Command: npm install
   Output Directory: .next
   ```

4. **Domain Configuration**
   - Add custom domain: pisospro.com.br
   - Configure DNS records

### Netlify

1. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

2. **Environment Variables**
   - Add all production environment variables
   - Enable automatic deployments

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["npm", "start"]
```

## Post-deployment Steps

### 1. Verify Deployment

- [ ] Site loads correctly at https://pisospro.com.br
- [ ] All pages are accessible
- [ ] WhatsApp button works
- [ ] Analytics tracking is working
- [ ] Database connections are established

### 2. Performance Optimization

- [ ] Enable Vercel Analytics (if using Vercel)
- [ ] Configure CDN for images
- [ ] Set up monitoring (Sentry, LogRocket, etc.)
- [ ] Enable compression and caching

### 3. SEO Setup

- [ ] Verify sitemap.xml is accessible
- [ ] Submit to Google Search Console
- [ ] Configure robots.txt
- [ ] Set up Google Analytics (if desired)

### 4. Security

- [ ] Enable HTTPS
- [ ] Configure security headers
- [ ] Set up CORS policies
- [ ] Review and sanitize environment variables

## Monitoring

### Health Check Endpoints

The application includes built-in health checks:

- `/api/health` - Basic health check
- `/api/analytics/recent` - Database connectivity check

### Analytics Dashboard

Access the admin analytics at:
- https://pisospro.com.br/admin/analytics

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Verify DATABASE_URL is correct
   - Check database server is accessible
   - Ensure SSL settings are correct

2. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Review build logs for specific errors

3. **Environment Variables Not Loading**
   - Ensure variables are set in deployment platform
   - Check variable names match exactly
   - Restart deployment after adding new variables

### Logs

Access deployment logs:
- **Vercel**: Project dashboard → Functions tab
- **Netlify**: Site dashboard → Deploys → Deploy log
- **Docker**: `docker logs container-name`

## Backup Strategy

### Database Backups

```bash
# Create database backup
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql

# Restore from backup
psql $DATABASE_URL < backup-20240101.sql
```

### Code Backups

- Code is backed up in Git repository
- Ensure regular commits and pushes
- Tag releases for easy rollback

## Rollback Procedure

1. **Vercel/Netlify**: Use platform's rollback feature
2. **Docker**: Deploy previous image tag
3. **Database**: Restore from backup (if schema changes)

---

**Last Updated:** January 2025

For support or questions about deployment, contact the development team.