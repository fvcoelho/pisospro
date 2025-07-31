import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, page, title, userAgent, referrer, landingPage } = body

    if (!sessionId || !page) {
      return NextResponse.json(
        { error: 'Missing required fields: sessionId, page' },
        { status: 400 }
      )
    }

    // Get client IP
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip')

    // Create or update session
    await prisma.userSession.upsert({
      where: { sessionId },
      update: { 
        updatedAt: new Date()
      },
      create: {
        sessionId,
        ipAddress: ip,
        userAgent,
        referrer,
        landingPage
      }
    })

    // Create page view
    const pageView = await prisma.pageView.create({
      data: {
        sessionId,
        page,
        title
      }
    })

    return NextResponse.json({ success: true, id: pageView.id })

  } catch (error) {
    console.error('Error tracking page view:', error)
    return NextResponse.json(
      { error: 'Failed to track page view' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, page, timeSpent } = body

    if (!sessionId || !page || !timeSpent) {
      return NextResponse.json(
        { error: 'Missing required fields: sessionId, page, timeSpent' },
        { status: 400 }
      )
    }

    // Update the most recent page view for this session and page
    await prisma.pageView.updateMany({
      where: {
        sessionId,
        page,
        timeSpent: null
      },
      data: {
        timeSpent
      }
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Error updating page view time:', error)
    return NextResponse.json(
      { error: 'Failed to update page view time' },
      { status: 500 }
    )
  }
}