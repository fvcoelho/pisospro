import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      sessionId, 
      page, 
      elementId, 
      elementText, 
      elementType,
      userAgent,
      referrer,
      landingPage
    } = body

    if (!sessionId || !page) {
      return NextResponse.json(
        { error: 'Missing required fields: sessionId, page' },
        { status: 400 }
      )
    }

    // Skip tracking if no meaningful element data
    if (!elementText && !elementId) {
      return NextResponse.json({ success: true, skipped: true })
    }

    // Get client IP
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip')

    // Ensure session exists
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

    // Create activity record
    const activity = await prisma.userActivity.create({
      data: {
        sessionId,
        page,
        elementId,
        elementText: elementText?.substring(0, 500), // Limit text length
        elementType
      }
    })

    return NextResponse.json({ success: true, id: activity.id })

  } catch (error) {
    console.error('Error tracking click:', error)
    return NextResponse.json(
      { error: 'Failed to track click' },
      { status: 500 }
    )
  }
}