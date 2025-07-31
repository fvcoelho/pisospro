import axios, { AxiosInstance } from 'axios'

export interface WhatsAppTextMessage {
  to: string
  text: {
    body: string
    preview_url?: boolean
  }
}

export interface WhatsAppTemplateMessage {
  to: string
  template: {
    name: string
    language: {
      code: string
    }
    components?: Array<{
      type: string
      parameters: Array<{
        type: string
        text?: string
        image?: {
          link: string
        }
      }>
    }>
  }
}

export interface WhatsAppInteractiveMessage {
  to: string
  interactive: {
    type: 'button' | 'list'
    header?: {
      type: 'text' | 'image' | 'video' | 'document'
      text?: string
      image?: { link: string }
    }
    body: {
      text: string
    }
    footer?: {
      text: string
    }
    action: {
      buttons?: Array<{
        type: 'reply'
        reply: {
          id: string
          title: string
        }
      }>
      button?: string
      sections?: Array<{
        title: string
        rows: Array<{
          id: string
          title: string
          description?: string
        }>
      }>
    }
  }
}

export interface WhatsAppMediaMessage {
  to: string
  type: 'image' | 'document' | 'audio' | 'video'
  image?: { link: string; caption?: string }
  document?: { link: string; caption?: string; filename?: string }
  audio?: { link: string }
  video?: { link: string; caption?: string }
}

export interface WhatsAppLocationMessage {
  to: string
  location: {
    longitude: number
    latitude: number
    name?: string
    address?: string
  }
}

export class WhatsAppClient {
  private client: AxiosInstance
  private phoneNumberId: string

  constructor() {
    const accessToken = process.env.WHATSAPP_ACCESS_TOKEN
    this.phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID || ''

    if (!accessToken || !this.phoneNumberId) {
      throw new Error('Missing WhatsApp configuration')
    }

    this.client = axios.create({
      baseURL: `https://graph.facebook.com/v18.0/${this.phoneNumberId}`,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })
  }

  async sendTextMessage(message: WhatsAppTextMessage) {
    try {
      const response = await this.client.post('/messages', {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: message.to,
        type: 'text',
        text: message.text,
      })
      return response.data
    } catch (error) {
      console.error('Error sending text message:', error)
      throw error
    }
  }

  async sendTemplateMessage(message: WhatsAppTemplateMessage) {
    try {
      const response = await this.client.post('/messages', {
        messaging_product: 'whatsapp',
        to: message.to,
        type: 'template',
        template: message.template,
      })
      return response.data
    } catch (error) {
      console.error('Error sending template message:', error)
      throw error
    }
  }

  async sendInteractiveMessage(message: WhatsAppInteractiveMessage) {
    try {
      const response = await this.client.post('/messages', {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: message.to,
        type: 'interactive',
        interactive: message.interactive,
      })
      return response.data
    } catch (error) {
      console.error('Error sending interactive message:', error)
      throw error
    }
  }

  async sendMediaMessage(message: WhatsAppMediaMessage) {
    try {
      const { to, type, ...media } = message
      const response = await this.client.post('/messages', {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to,
        type,
        [type]: media[type],
      })
      return response.data
    } catch (error) {
      console.error('Error sending media message:', error)
      throw error
    }
  }

  async sendLocationMessage(message: WhatsAppLocationMessage) {
    try {
      const response = await this.client.post('/messages', {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: message.to,
        type: 'location',
        location: message.location,
      })
      return response.data
    } catch (error) {
      console.error('Error sending location message:', error)
      throw error
    }
  }

  async markAsRead(messageId: string) {
    try {
      const response = await this.client.post('/messages', {
        messaging_product: 'whatsapp',
        status: 'read',
        message_id: messageId,
      })
      return response.data
    } catch (error) {
      console.error('Error marking message as read:', error)
      throw error
    }
  }

  async getMediaUrl(mediaId: string): Promise<string> {
    try {
      const response = await this.client.get(`/${mediaId}`)
      return response.data.url
    } catch (error) {
      console.error('Error getting media URL:', error)
      throw error
    }
  }

  async downloadMedia(mediaUrl: string): Promise<Buffer> {
    try {
      const response = await axios.get(mediaUrl, {
        headers: {
          'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
        },
        responseType: 'arraybuffer',
      })
      return Buffer.from(response.data)
    } catch (error) {
      console.error('Error downloading media:', error)
      throw error
    }
  }
}

// Singleton instance
let whatsappClient: WhatsAppClient | null = null

export function getWhatsAppClient(): WhatsAppClient {
  if (!whatsappClient) {
    whatsappClient = new WhatsAppClient()
  }
  return whatsappClient
}