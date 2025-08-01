import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Parse User-Agent to extract device info
function parseUserAgent(userAgent: string) {
  const device = /Mobile|Tablet|iPad|iPhone|Android/i.test(userAgent) 
    ? (/Tablet|iPad/i.test(userAgent) ? 'Tablet' : 'Mobile')
    : 'Desktop'
  
  // Extract browser
  let browser = 'Unknown'
  if (/Chrome\//.test(userAgent) && !/Edge\//.test(userAgent)) browser = 'Chrome'
  else if (/Safari\//.test(userAgent) && !/Chrome\//.test(userAgent)) browser = 'Safari'
  else if (/Firefox\//.test(userAgent)) browser = 'Firefox'
  else if (/Edge\//.test(userAgent)) browser = 'Edge'
  else if (/Opera|OPR\//.test(userAgent)) browser = 'Opera'
  
  // Extract OS
  let os = 'Unknown'
  if (/Windows/.test(userAgent)) os = 'Windows'
  else if (/Mac OS/.test(userAgent)) os = 'MacOS'
  else if (/Linux/.test(userAgent)) os = 'Linux'
  else if (/Android/.test(userAgent)) os = 'Android'
  else if (/iOS|iPhone|iPad/.test(userAgent)) os = 'iOS'
  
  return { device, browser, os }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      sessionId, 
      page, 
      title, 
      userAgent, 
      referrer, 
      landingPage,
      screenResolution,
      viewport,
      colorDepth,
      timezone,
      language: clientLanguage
    } = body

    if (!sessionId || !page) {
      return NextResponse.json(
        { error: 'Missing required fields: sessionId, page' },
        { status: 400 }
      )
    }

    // Get client IP
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip')
    
    // Extract all headers
    const headers: Record<string, string> = {}
    request.headers.forEach((value, key) => {
      headers[key] = value
    })
    
    // Parse user agent
    const { device, browser, os } = userAgent ? parseUserAgent(userAgent) : { device: null, browser: null, os: null }
    
    // Extract language from Accept-Language header or use client-provided language
    const language = clientLanguage || request.headers.get('accept-language')?.split(',')[0]?.split('-')[0] || null
    
    // Extract location from Cloudflare headers (if using Cloudflare)
    const country = request.headers.get('cf-ipcountry') || null
    const city = request.headers.get('cf-city') || null
    const region = request.headers.get('cf-region') || null

    // Create or update session
    await prisma.userSession.upsert({
      where: { sessionId },
      update: { 
        updatedAt: new Date(),
        headers,
        language,
        device,
        browser,
        os,
        country,
        city,
        region,
        screenResolution,
        viewport,
        colorDepth,
        timezone
      },
      create: {
        sessionId,
        ipAddress: ip,
        userAgent,
        referrer,
        landingPage,
        headers,
        language,
        device,
        browser,
        os,
        country,
        city,
        region,
        screenResolution,
        viewport,
        colorDepth,
        timezone
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