import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '100')
    const hours = parseInt(searchParams.get('hours') || '24')
    
    const since = new Date(Date.now() - hours * 60 * 60 * 1000)

    // Get recent activities
    const activities = await prisma.userActivity.findMany({
      where: {
        createdAt: {
          gte: since
        }
      },
      include: {
        session: {
          select: {
            ipAddress: true,
            userAgent: true,
            referrer: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: limit
    })

    // Get recent page views
    const pageViews = await prisma.pageView.findMany({
      where: {
        createdAt: {
          gte: since
        }
      },
      include: {
        session: {
          select: {
            ipAddress: true,
            userAgent: true,
            referrer: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: limit
    })

    // Get basic stats
    const stats = await Promise.all([
      // Total clicks today
      prisma.userActivity.count({
        where: { createdAt: { gte: since } }
      }),
      
      // Total page views today
      prisma.pageView.count({
        where: { createdAt: { gte: since } }
      }),
      
      // Unique sessions today
      prisma.userSession.count({
        where: { createdAt: { gte: since } }
      }),
      
      // Most clicked elements
      prisma.userActivity.groupBy({
        by: ['elementText'],
        where: {
          createdAt: { gte: since },
          elementText: { not: null }
        },
        _count: true,
        orderBy: { _count: { elementText: 'desc' } },
        take: 10
      }),
      
      // Most visited pages
      prisma.pageView.groupBy({
        by: ['page'],
        where: { createdAt: { gte: since } },
        _count: true,
        orderBy: { _count: { page: 'desc' } },
        take: 10
      })
    ])

    return NextResponse.json({
      activities,
      pageViews,
      stats: {
        totalClicks: stats[0],
        totalPageViews: stats[1],
        uniqueSessions: stats[2],
        mostClickedElements: stats[3],
        mostVisitedPages: stats[4]
      }
    })

  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    )
  }
}