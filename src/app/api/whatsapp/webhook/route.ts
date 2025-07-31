import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { handleIncomingMessage } from '@/lib/whatsapp/messageHandler'

// Verify webhook token for initial setup
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  if (mode === 'subscribe' && token === process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN) {
    console.log('✅ Webhook verified successfully')
    return new NextResponse(challenge, { status: 200 })
  }

  return NextResponse.json({ error: 'Failed validation' }, { status: 403 })
}

// Handle incoming WhatsApp messages
export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text()
    const signature = request.headers.get('x-hub-signature-256')

    // Verify webhook signature
    if (!verifyWebhookSignature(rawBody, signature)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const body = JSON.parse(rawBody)
    
    // Process webhook events
    if (body.entry?.[0]?.changes?.[0]) {
      const change = body.entry[0].changes[0]
      
      if (change.field === 'messages') {
        const messageData = change.value

        // Handle different message types
        if (messageData.messages?.[0]) {
          const message = messageData.messages[0]
          const contact = messageData.contacts?.[0]
          
          // Process the incoming message asynchronously
          handleIncomingMessage({
            from: message.from,
            messageId: message.id,
            timestamp: message.timestamp,
            type: message.type,
            text: message.text?.body,
            mediaId: message.image?.id || message.document?.id || message.audio?.id || message.video?.id,
            mediaCaption: message.image?.caption || message.document?.caption,
            contactName: contact?.profile?.name || contact?.wa_id,
          }).catch(error => {
            console.error('Error processing message:', error)
          })
        }

        // Handle message status updates
        if (messageData.statuses?.[0]) {
          const status = messageData.statuses[0]
          console.log(`Message ${status.id} status: ${status.status}`)
          // TODO: Update message status in database
        }
      }
    }

    // Always return 200 to acknowledge receipt
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Webhook error:', error)
    // Still return 200 to prevent webhook retries
    return NextResponse.json({ success: true }, { status: 200 })
  }
}

function verifyWebhookSignature(rawBody: string, signature: string | null): boolean {
  if (!signature || !process.env.WHATSAPP_APP_SECRET) {
    return false
  }

  const expectedSignature = crypto
    .createHmac('sha256', process.env.WHATSAPP_APP_SECRET)
    .update(rawBody)
    .digest('hex')

  return signature === `sha256=${expectedSignature}`
}