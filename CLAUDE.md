# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Pisos-Pró is a Next.js 15 business website for a flooring company specializing in professional flooring solutions. The application features a complete business website with home, services, products, portfolio, about, and contact pages, plus advanced integrations for WhatsApp Business API, analytics tracking, and gallery management with Vercel Blob storage.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Database commands
npm run db:generate    # Generate Prisma client
npm run db:push        # Push schema to database
npm run db:migrate     # Deploy migrations
npm run db:reset       # Reset database (destructive)
```

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS with custom color palette (wood, gold, neutral themes)
- **Database**: PostgreSQL with Prisma ORM
- **Storage**: Vercel Blob for file uploads (migrated from Cloudinary)
- **Package Manager**: npm

### Project Structure
- `/src/app/` - Next.js App Router pages and layouts
  - Each page directory contains a `page.tsx` file
  - `layout.tsx` wraps all pages with RootProvider (includes Navbar and Footer)
  - Uses server components by default, client components marked with `'use client'`
- `/src/components/` - Reusable React components with shadcn/ui components
- `/src/lib/` - Utility functions, database client, and integrations
- `/prisma/` - Database schema and migrations
- `/public/` - Static assets including optimized intro video and favicon set

### Key Architectural Patterns

1. **Database Access**: Prisma client is initialized in `/src/lib/prisma.ts` with singleton pattern for development
2. **Routing**: File-based routing using Next.js App Router conventions
3. **Styling**: Utility-first CSS with Tailwind, configured with custom flooring business colors
4. **TypeScript**: Strict mode enabled with path aliases (`@/*` maps to `./src/*`)
5. **Component Design**: Clean, professional aesthetic with gradient backgrounds instead of emoji icons

### Database Schema
The Prisma schema includes models for:
- **User**: Customer information and quotes
- **Category/Product**: Product catalog organization
- **Service**: Available flooring services
- **Quote/QuoteService**: Quote management system with status tracking
- **Project**: Portfolio project tracking
- **GalleryImage**: Image gallery with Vercel Blob URLs
- **WhatsAppConversation**: Complete conversation tracking
- **UserActivity**: Analytics and user interaction tracking

### WhatsApp Integration
The application includes a complete WhatsApp Business API integration with:
- **Chatbot Features**: Automated quote collection, service information, FAQ responses
- **Conversation Management**: Full conversation state tracking and history
- **Admin Dashboard**: `/admin/whatsapp` for managing conversations
- **Quote Integration**: WhatsApp conversations automatically create quotes in the database
- **Human Handoff**: Ability to transfer conversations to human agents

Key WhatsApp files:
- `/src/lib/whatsapp/client.ts` - Meta Cloud API client
- `/src/lib/whatsapp/messageHandler.ts` - Message processing and chatbot logic
- `/src/lib/whatsapp/templates.ts` - Conversation templates and state definitions
- `/src/app/api/whatsapp/webhook/route.ts` - Webhook endpoint for receiving messages

### Analytics & User Tracking
The application includes comprehensive user activity tracking:
- **Global Click Tracking**: Automatically captures all button clicks and interactions
- **Page View Tracking**: Records page visits with time spent on each page
- **Session Management**: Tracks unique user sessions with device and location data
- **Real-time Dashboard**: `/admin/analytics` for viewing live user activity
- **Simple Data Model**: Records element text, IDs, and interaction metadata
- **Admin Route Exclusion**: Analytics tracking is disabled for all `/admin` routes

Key Analytics files:
- `/src/lib/analytics/tracker.ts` - Core tracking library with global click listener
- `/src/components/AnalyticsProvider.tsx` - React provider for automatic tracking
- `/src/app/api/track/click/route.ts` - API endpoint for recording clicks
- `/src/app/api/track/pageview/route.ts` - API endpoint for recording page views
- `/src/app/api/analytics/recent/route.ts` - API endpoint for dashboard data

### Gallery & File Management
Complete migration from Cloudinary to Vercel Blob storage:
- **Upload Service**: `/src/lib/api/blob-upload.ts` - Comprehensive upload service with progress tracking
- **Gallery API**: `/src/app/api/gallery/upload/route.ts` - Enhanced with real-time logging and debugging
- **Admin Management**: `/src/app/admin/gallery/` - Full CRUD operations for gallery images
- **Test Interface**: `/src/app/test-simple-upload/` - Development tool for testing uploads

### Video Integration
- **Hero Video**: Optimized intro video with preloader system
- **Video Context**: `/src/context/VideoContext.tsx` - Global video state management
- **Preloader**: `/src/components/PreloadScreen.tsx` - Loading screen with spinning logo

### Design System
- **Typography**: Cinzel (headings) and Montserrat (body) fonts
- **Color Palette**: Green primary theme with wood, gold, and neutral accents
- **Components**: Professional gradient-based design instead of emoji icons
- **Animations**: Smooth transitions and hover effects
- **Responsive**: Mobile-first approach with touch-optimized interactions

### Important Configuration
- **Environment Variables**: 
  - `DATABASE_URL` for PostgreSQL connection
  - WhatsApp API credentials (`WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`)
  - Vercel Blob storage (`BLOB_READ_WRITE_TOKEN`, `BLOB_STORE_ID`, `BLOB_BASE_URL`)
- **Next.js Config**: Minimal configuration, relies on conventions
- **TypeScript**: Targets ES2017 with strict mode and bundler module resolution

### Development Notes
- Always use shadcn/ui components when creating new UI elements
- Follow the established gradient-based design pattern instead of using emoji icons
- Test uploads use the test-simple-upload page for development
- WhatsApp webhook requires HTTPS endpoint for production
- Analytics tracking is automatic via AnalyticsProvider wrapper
- Video assets should be optimized for web delivery

### Common Development Tasks
- **Adding new services**: Update `/src/app/services/page.tsx` with gradient-based cards
- **Gallery management**: Use admin interface at `/admin/gallery` or test-simple-upload for development
- **WhatsApp modifications**: Update conversation flow in `/src/lib/whatsapp/templates.ts`
- **Analytics tracking**: Automatic for most interactions, custom events via tracker.ts
- **Database changes**: Run `npm run db:push` for schema updates, then `npm run db:generate`