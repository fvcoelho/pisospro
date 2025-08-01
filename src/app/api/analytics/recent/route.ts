import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Validate and set limit - only allow specific values
    const requestedLimit = parseInt(searchParams.get('limit') || '100')
    const allowedLimits = [50, 100, 150, 200]
    const limit = allowedLimits.includes(requestedLimit) ? requestedLimit : 100
    
    const hours = parseInt(searchParams.get('hours') || '24')
    const orderBy = searchParams.get('orderBy') || 'createdAt' // createdAt, page, elementText
    const orderDirection = searchParams.get('orderDirection') === 'asc' ? 'asc' : 'desc'
    
    const since = new Date(Date.now() - hours * 60 * 60 * 1000)

    // Build orderBy object for activities
    const activitiesOrderBy = orderBy === 'elementText' 
      ? { elementText: orderDirection as 'asc' | 'desc' }
      : orderBy === 'page' 
      ? { page: orderDirection as 'asc' | 'desc' }
      : { createdAt: orderDirection as 'asc' | 'desc' }

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
            sessionId: true,
            ipAddress: true,
            userAgent: true,
            referrer: true,
            device: true,
            browser: true,
            os: true,
            country: true,
            city: true
          }
        }
      },
      orderBy: activitiesOrderBy,
      take: limit
    })

    // Build orderBy object for pageViews
    const pageViewsOrderBy = orderBy === 'page' 
      ? { page: orderDirection as 'asc' | 'desc' }
      : orderBy === 'title'
      ? { title: orderDirection as 'asc' | 'desc' }
      : { createdAt: orderDirection as 'asc' | 'desc' }

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
            sessionId: true,
            ipAddress: true,
            userAgent: true,
            referrer: true,
            device: true,
            browser: true,
            os: true,
            country: true,
            city: true
          }
        }
      },
      orderBy: pageViewsOrderBy,
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