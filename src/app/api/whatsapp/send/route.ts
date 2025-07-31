import { NextRequest, NextResponse } from 'next/server'
import { getWhatsAppClient } from '@/lib/whatsapp/client'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { to, message, type = 'text' } = await request.json()

    if (!to || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: to, message' },
        { status: 400 }
      )
    }

    const whatsapp = getWhatsAppClient()
    let response

    // Send message based on type
    switch (type) {
      case 'text':
        response = await whatsapp.sendTextMessage({
          to,
          text: { body: message }
        })
        break

      case 'interactive':
        response = await whatsapp.sendInteractiveMessage({
          to,
          ...message
        })
        break

      default:
        return NextResponse.json(
          { error: 'Unsupported message type' },
          { status: 400 }
        )
    }

    // Get or create conversation
    const conversation = await prisma.whatsAppConversation.upsert({
      where: { phoneNumber: to },
      update: { lastMessageAt: new Date() },
      create: {
        phoneNumber: to,
        lastMessageAt: new Date(),
        status: 'ACTIVE'
      }
    })

    // Save outbound message
    await prisma.whatsAppMessage.create({
      data: {
        conversationId: conversation.id,
        messageId: response.messages[0].id,
        direction: 'OUTBOUND',
        content: typeof message === 'string' ? message : '[Interactive Message]'
      }
    })

    return NextResponse.json({ 
      success: true, 
      messageId: response.messages[0].id 
    })

  } catch (error) {
    console.error('Error sending message:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}