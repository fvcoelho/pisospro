import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Get 24 hours ago timestamp
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)

    // Run all queries in parallel
    const [
      totalImages,
      activeImages,
      recentSessions,
      totalSessions,
      activeConversations,
      totalConversations,
      recentPageViews
    ] = await Promise.all([
      // Gallery stats
      prisma.galleryImage.count(),
      prisma.galleryImage.count({ where: { isActive: true } }),
      
      // Analytics stats
      prisma.userSession.count({
        where: {
          createdAt: {
            gte: twentyFourHoursAgo
          }
        }
      }),
      prisma.userSession.count(),
      
      // WhatsApp stats
      prisma.whatsAppConversation.count({
        where: {
          status: 'ACTIVE'
        }
      }),
      prisma.whatsAppConversation.count(),
      
      // Page views (recent activity)
      prisma.pageView.count({
        where: {
          createdAt: {
            gte: twentyFourHoursAgo
          }
        }
      })
    ])

    // Get recent user activities for activity feed
    const recentActivities = await prisma.userActivity.findMany({
      take: 10,
      orderBy: {
        createdAt: 'desc'
      },
      where: {
        createdAt: {
          gte: twentyFourHoursAgo
        }
      },
      include: {
        session: {
          select: {
            city: true,
            country: true,
            browser: true,
            device: true
          }
        }
      }
    })

    // Get top pages visited today
    const topPages = await prisma.pageView.groupBy({
      by: ['page'],
      where: {
        createdAt: {
          gte: twentyFourHoursAgo
        }
      },
      _count: {
        page: true
      },
      orderBy: {
        _count: {
          page: 'desc'
        }
      },
      take: 5
    })

    const stats = {
      gallery: {
        totalImages,
        activeImages,
        inactiveImages: totalImages - activeImages
      },
      analytics: {
        recentSessions,
        totalSessions,
        recentPageViews,
        topPages: topPages.map(page => ({
          page: page.page,
          visits: page._count.page
        }))
      },
      whatsapp: {
        activeConversations,
        totalConversations
      },
      activity: {
        recentActivities: recentActivities.map(activity => ({
          id: activity.id,
          page: activity.page,
          elementText: activity.elementText,
          elementType: activity.elementType,
          createdAt: activity.createdAt,
          location: activity.session?.city && activity.session?.country 
            ? `${activity.session.city}, ${activity.session.country}`
            : null,
          device: activity.session?.device || null,
          browser: activity.session?.browser || null
        }))
      }
    }

    return NextResponse.json({
      success: true,
      stats,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch admin statistics',
        success: false 
      },
      { status: 500 }
    )
  }
}