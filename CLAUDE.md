# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Pisos-Pró is a Next.js 15 business website for a flooring company specializing in professional flooring solutions. The application features a complete business website with home, services, products, portfolio, about, and contact pages.

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
```

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Package Manager**: npm

### Project Structure
- `/src/app/` - Next.js App Router pages and layouts
  - Each page directory contains a `page.tsx` file
  - `layout.tsx` wraps all pages with Navbar and Footer
  - Uses server components by default
- `/src/components/` - Reusable React components
- `/src/lib/` - Utility functions and database client
- `/prisma/` - Database schema and migrations
- `/public/` - Static assets

### Key Architectural Patterns

1. **Database Access**: Prisma client is initialized in `/src/lib/prisma.ts` with singleton pattern for development
2. **Routing**: File-based routing using Next.js App Router conventions
3. **Styling**: Utility-first CSS with Tailwind, configured with custom colors (primary blue/yellow theme)
4. **TypeScript**: Strict mode enabled with path aliases (`@/*` maps to `./src/*`)

### Database Schema
The Prisma schema includes models for:
- **User**: Customer information and quotes
- **Category/Product**: Product catalog organization
- **Service**: Available flooring services
- **Quote/QuoteService**: Quote management system with status tracking
- **Project**: Portfolio project tracking

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

Key Analytics files:
- `/src/lib/analytics/tracker.ts` - Core tracking library with global click listener
- `/src/components/AnalyticsProvider.tsx` - React provider for automatic tracking
- `/src/app/api/track/click/route.ts` - API endpoint for recording clicks
- `/src/app/api/track/pageview/route.ts` - API endpoint for recording page views
- `/src/app/api/analytics/recent/route.ts` - API endpoint for dashboard data

Tracking Data Collected:
- **Click Events**: Element text, ID, type, page, timestamp
- **Page Views**: URL, title, time spent, referrer
- **Session Info**: IP address, user agent, device type, traffic source

### Important Configuration
- **Environment Variables**: Requires `DATABASE_URL` for PostgreSQL connection and WhatsApp API credentials (`WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, etc.)
- **WhatsApp Setup**: See `WHATSAPP_SETUP.md` for complete Meta Business API setup instructions
- **Next.js Config**: Currently minimal, ready for customization
- **TypeScript**: Targets ES2017 with strict mode and bundler module resolution