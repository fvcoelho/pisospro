import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    
    // Validate and set limit - only allow specific values
    const requestedLimit = parseInt(searchParams.get('limit') || '50')
    const allowedLimits = [50, 100, 150, 200]
    const limit = allowedLimits.includes(requestedLimit) ? requestedLimit : 50
    
    const offset = (page - 1) * limit
    const orderBy = searchParams.get('orderBy') || 'createdAt' // createdAt, updatedAt, country, city
    const orderDirection = searchParams.get('orderDirection') === 'asc' ? 'asc' : 'desc'

    // Build orderBy object
    const sessionOrderBy = ['createdAt', 'updatedAt', 'country', 'city'].includes(orderBy)
      ? { [orderBy]: orderDirection as 'asc' | 'desc' }
      : { createdAt: orderDirection as 'asc' | 'desc' }

    // Get sessions with counts
    const sessions = await prisma.userSession.findMany({
      select: {
        id: true,
        sessionId: true,
        ipAddress: true,
        userAgent: true,
        referrer: true,
        landingPage: true,
        country: true,
        city: true,
        region: true,
        language: true,
        device: true,
        browser: true,
        os: true,
        screenResolution: true,
        viewport: true,
        timezone: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            pageViews: true,
            activities: true
          }
        }
      },
      orderBy: sessionOrderBy,
      skip: offset,
      take: limit
    })

    return NextResponse.json({ sessions })
  } catch (error) {
    console.error('Error fetching sessions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sessions' },
      { status: 500 }
    )
  }
}