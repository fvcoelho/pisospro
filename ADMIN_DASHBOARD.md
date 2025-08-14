# Admin Dashboard

## Overview

The Admin Dashboard provides a centralized interface for managing all aspects of the Pisos Pró system. It includes real-time statistics, quick navigation to all admin modules, and activity monitoring.

## Access

Navigate to `/admin` to access the main dashboard. The dashboard is protected from analytics tracking - admin activities are not logged in the user analytics system.

## Features

### 🏠 Main Dashboard (`/admin`)

**Statistics Overview (24-hour period)**
- Gallery images count (total and active)
- Recent user sessions and page views
- Active WhatsApp conversations
- Recent user activities

**Real-time Activity Feed**
- Shows latest user interactions
- Includes location, device, and interaction details
- Links to full analytics dashboard

**Top Pages Report**
- Most visited pages in the last 24 hours
- Visit counts for each page
- Performance insights

### 🖼️ Gallery Management (`/admin/gallery`)

**Features:**
- Upload new images with metadata
- Edit existing image details (title, description, location, category)
- Activate/deactivate images
- Delete images (soft delete by default)
- Filter by category
- Real-time preview during editing

### 📊 Analytics Dashboard (`/admin/analytics`)

**Comprehensive Analytics:**
- Real-time user activity monitoring
- Session tracking and analysis
- Page view statistics
- User interaction patterns
- Geographic and device insights

**Sub-modules:**
- `/admin/analytics/sessions` - All user sessions
- `/admin/analytics/session/[id]` - Individual session details

### 💬 WhatsApp Management (`/admin/whatsapp`)

**Conversation Management:**
- View all WhatsApp conversations
- Monitor conversation status
- Access individual conversation threads
- Track chatbot interactions
- Human handoff management

**Sub-modules:**
- `/admin/whatsapp/[id]` - Individual conversation details

## Navigation

### Admin Layout
- **Top Navigation Bar**: Quick access to all admin modules
- **Breadcrumb Navigation**: Shows current location in admin hierarchy
- **Back to Site**: Easy return to main website

### Quick Actions
- Add new gallery image
- View detailed analytics
- Check WhatsApp conversations
- Return to main website

## API Endpoints

### Admin Statistics API
- `GET /api/admin/stats` - Comprehensive dashboard statistics
- Returns real-time data for all admin modules
- 24-hour activity summaries
- Activity feed and top pages data

### Module-specific APIs
- Gallery API: Full CRUD operations at `/api/gallery/*`
- Analytics API: Session and activity data at `/api/analytics/*`
- WhatsApp API: Conversation management at `/api/whatsapp/*`

## Technical Details

### Components
- `AdminDashboard` - Main dashboard component
- `AdminLayout` - Consistent layout wrapper
- `AdminBreadcrumb` - Navigation breadcrumbs

### Data Fetching
- Real-time statistics via `/api/admin/stats`
- Automatic refresh on page load
- Error handling for failed API calls

### Responsive Design
- Mobile-optimized interface
- Touch-friendly interactions
- Grid layout adapts to screen size

## Security & Privacy

### Analytics Exclusion
- Admin routes (`/admin/*`) are excluded from user analytics tracking
- Admin activities do not appear in user behavior data
- Maintains separation between admin and user interactions

### Data Protection
- Real-time activity monitoring respects user privacy
- Location data is aggregated city/country level
- No sensitive personal information is displayed

## Usage Tips

1. **Regular Monitoring**: Check the dashboard daily for activity insights
2. **Gallery Management**: Use the edit feature to keep image metadata updated
3. **Analytics Review**: Monitor top pages to understand user behavior
4. **WhatsApp Engagement**: Track conversation flow and response times
5. **Quick Navigation**: Use the admin navigation bar for fast module switching

## Troubleshooting

### Common Issues
- **Missing Statistics**: Refresh the page or check API connectivity
- **Image Upload Issues**: Verify Vercel Blob configuration
- **WhatsApp Data**: Ensure WhatsApp API credentials are configured

### Performance
- Dashboard loads statistics asynchronously
- Activity feed shows last 10 items for performance
- Top pages limited to top 5 for clarity

## Future Enhancements

Planned features:
- Email notifications for admin alerts
- Scheduled reports export
- Advanced filtering and search
- Bulk operations for gallery management
- WhatsApp message templates management