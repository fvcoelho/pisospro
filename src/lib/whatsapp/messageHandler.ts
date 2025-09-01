import { prisma } from '@/lib/prisma'
import { getWhatsAppClient } from './client'
import { 
  ChatState, 
  MAIN_MENU_BUTTONS, 
  SECONDARY_MENU_BUTTONS,
  PROJECT_TYPE_MENU,
  TIMELINE_MENU,
  TIMELINE_EXTENDED_MENU,
  BUDGET_MENU,
  SERVICES_INFO,
  FAQ_INFO,
  getProjectTypeDescription,
  getBudgetDescription,
  getTimelineDescription
} from './templates'

export interface IncomingMessage {
  from: string
  messageId: string
  timestamp: string
  type: string
  text?: string
  mediaId?: string
  mediaCaption?: string
  contactName?: string
}

export async function handleIncomingMessage(message: IncomingMessage) {
  try {
    console.log('Processing message from:', message.from)
    
    const whatsapp = getWhatsAppClient()
    
    // Mark message as read
    await whatsapp.markAsRead(message.messageId)
    
    // Get or create conversation
    const conversation = await getOrCreateConversation(message.from, message.contactName)
    
    // Save incoming message
    await saveMessage(conversation.id, message)
    
    // Get conversation state
    const state = await getChatbotState(conversation.id)
    
    // Process message based on current state
    await processMessage(message, conversation.id, state)
    
  } catch (error) {
    console.error('Error handling message:', error)
  }
}

async function getOrCreateConversation(phoneNumber: string, contactName?: string) {
  let conversation = await prisma.whatsAppConversation.findUnique({
    where: { phoneNumber }
  })
  
  if (!conversation) {
    conversation = await prisma.whatsAppConversation.create({
      data: {
        phoneNumber,
        customerName: contactName,
        lastMessageAt: new Date(),
        status: 'ACTIVE'
      }
    })
  } else {
    // Update last message time and name if provided
    conversation = await prisma.whatsAppConversation.update({
      where: { id: conversation.id },
      data: {
        lastMessageAt: new Date(),
        ...(contactName && !conversation.customerName && { customerName: contactName })
      }
    })
  }
  
  return conversation
}

async function saveMessage(conversationId: string, message: IncomingMessage) {
  await prisma.whatsAppMessage.create({
    data: {
      conversationId,
      messageId: message.messageId,
      direction: 'INBOUND',
      content: message.text || message.mediaCaption || '[Media]',
      mediaUrl: message.mediaId,
      mediaType: message.type !== 'text' ? message.type : null
    }
  })
}

async function getChatbotState(conversationId: string) {
  let state = await prisma.chatbotState.findUnique({
    where: { conversationId }
  })
  
  if (!state) {
    state = await prisma.chatbotState.create({
      data: {
        conversationId,
        currentStep: ChatState.WELCOME,
        collectedData: {}
      }
    })
  }
  
  return state
}

async function updateChatbotState(conversationId: string, currentStep: string, collectedData: any) {
  await prisma.chatbotState.update({
    where: { conversationId },
    data: {
      currentStep,
      collectedData,
      updatedAt: new Date()
    }
  })
}

async function processMessage(message: IncomingMessage, conversationId: string, state: any) {
  const whatsapp = getWhatsAppClient()
  const userInput = message.text?.toLowerCase().trim()
  
  switch (state.currentStep) {
    case ChatState.WELCOME:
      await sendMessage(conversationId, { ...MAIN_MENU_BUTTONS, to: message.from })
      await sendMessage(conversationId, { ...SECONDARY_MENU_BUTTONS, to: message.from })
      await updateChatbotState(conversationId, ChatState.MAIN_MENU, {})
      break
      
    case ChatState.MAIN_MENU:
      await handleMainMenuResponse(message, conversationId, state)
      break
      
    case ChatState.QUOTE_PROJECT_TYPE:
      await handleProjectTypeResponse(message, conversationId, state)
      break
      
    case ChatState.QUOTE_ROOM_SIZE:
      await handleRoomSizeResponse(message, conversationId, state)
      break
      
    case ChatState.QUOTE_TIMELINE:
      await handleTimelineResponse(message, conversationId, state)
      break
      
    case ChatState.QUOTE_BUDGET:
      await handleBudgetResponse(message, conversationId, state)
      break
      
    case ChatState.QUOTE_PHOTOS:
      await handlePhotosResponse(message, conversationId, state)
      break
      
    case ChatState.QUOTE_CONTACT:
      await handleContactResponse(message, conversationId, state)
      break
      
    default:
      // Fallback to main menu
      await sendMessage(conversationId, { ...MAIN_MENU_BUTTONS, to: message.from })
      await updateChatbotState(conversationId, ChatState.MAIN_MENU, {})
  }
}

async function handleMainMenuResponse(message: IncomingMessage, conversationId: string, state: any) {
  const input = message.text?.toLowerCase()
  
  if (message.text === 'request_quote' || input?.includes('orçamento') || input?.includes('orcamento')) {
    await sendMessage(conversationId, { ...PROJECT_TYPE_MENU, to: message.from })
    await updateChatbotState(conversationId, ChatState.QUOTE_PROJECT_TYPE, {})
  } 
  else if (message.text === 'view_services' || input?.includes('serviços') || input?.includes('servicos')) {
    await sendTextMessage(message.from, SERVICES_INFO, conversationId)
    await sendMessage(conversationId, { ...MAIN_MENU_BUTTONS, to: message.from })
  }
  else if (message.text === 'view_portfolio' || input?.includes('portfolio') || input?.includes('portfólio')) {
    await sendTextMessage(message.from, '📸 *Nosso Portfólio*\n\nVeja alguns dos nossos trabalhos mais recentes no nosso site: https://pisospro.com.br/portfolio\n\nOu solicite um orçamento para começarmos seu projeto!', conversationId)
    await sendMessage(conversationId, { ...MAIN_MENU_BUTTONS, to: message.from })
  }
  else if (message.text === 'talk_human' || input?.includes('atendente') || input?.includes('humano')) {
    await handleHumanHandoff(message.from, conversationId)
  }
  else if (message.text === 'faq' || input?.includes('pergunta') || input?.includes('dúvida')) {
    await sendTextMessage(message.from, FAQ_INFO, conversationId)
    await sendMessage(conversationId, { ...MAIN_MENU_BUTTONS, to: message.from })
  }
  else {
    // Handle natural language
    await sendTextMessage(message.from, 'Desculpe, não entendi. Por favor, use os botões abaixo para navegar:', conversationId)
    await sendMessage(conversationId, { ...MAIN_MENU_BUTTONS, to: message.from })
  }
}

async function handleProjectTypeResponse(message: IncomingMessage, conversationId: string, state: any) {
  const projectTypes = ['madeira', 'acabamento', 'laminado', 'vinílico', 'reacabamentoing', 'reparo', 'multiple']
  
  if (projectTypes.includes(message.text || '')) {
    const collectedData = { ...state.collectedData, projectType: message.text }
    const description = getProjectTypeDescription(message.text!)
    
    await sendTextMessage(message.from, `Excelente escolha! 👍\n\n*${description}*\n\nAgora, qual é aproximadamente o tamanho da área?\n\nPor favor, me informe em metros quadrados (ex: "20 m²" ou "45 metros quadrados"):`, conversationId)
    
    await updateChatbotState(conversationId, ChatState.QUOTE_ROOM_SIZE, collectedData)
  } else {
    await sendTextMessage(message.from, 'Por favor, selecione uma opção do menu:', conversationId)
    await sendMessage(conversationId, { ...PROJECT_TYPE_MENU, to: message.from })
  }
}

async function handleRoomSizeResponse(message: IncomingMessage, conversationId: string, state: any) {
  const text = message.text || ''
  
  // Extract numbers from the text (simple regex for m², metros, etc.)
  const sizeMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:m²|metros?|m2)/i) || text.match(/(\d+(?:\.\d+)?)/i)
  
  if (sizeMatch) {
    const size = sizeMatch[1]
    const collectedData = { ...state.collectedData, roomSize: `${size} m²` }
    
    await sendTextMessage(message.from, `Perfeito! ${size} m² 📐\n\nAgora sobre o cronograma:`, conversationId)
    await sendMessage(conversationId, { ...TIMELINE_MENU, to: message.from })
    await sendMessage(conversationId, { ...TIMELINE_EXTENDED_MENU, to: message.from })
    
    await updateChatbotState(conversationId, ChatState.QUOTE_TIMELINE, collectedData)
  } else {
    await sendTextMessage(message.from, 'Por favor, me informe o tamanho em metros quadrados (ex: "20 m²", "45 metros quadrados" ou apenas "30"):', conversationId)
  }
}

async function handleTimelineResponse(message: IncomingMessage, conversationId: string, state: any) {
  const timelines = ['asap', '1-2weeks', '1month', '2-3months', 'planning']
  
  if (timelines.includes(message.text || '')) {
    const collectedData = { ...state.collectedData, timeline: message.text }
    const description = getTimelineDescription(message.text!)
    
    await sendTextMessage(message.from, `Ótimo! Cronograma: *${description}* ⏰`, conversationId)
    await sendMessage(conversationId, { ...BUDGET_MENU, to: message.from })
    
    await updateChatbotState(conversationId, ChatState.QUOTE_BUDGET, collectedData)
  } else {
    await sendTextMessage(message.from, 'Por favor, selecione uma das opções de cronograma:', conversationId)
    await sendMessage(conversationId, { ...TIMELINE_MENU, to: message.from })
  }
}

async function handleBudgetResponse(message: IncomingMessage, conversationId: string, state: any) {
  const budgets = ['under15k', '15k-30k', '30k-60k', '60k-150k', 'over150k']
  
  if (budgets.includes(message.text || '')) {
    const collectedData = { ...state.collectedData, budget: message.text }
    const description = getBudgetDescription(message.text!)
    
    await sendTextMessage(message.from, `Perfeito! Orçamento: *${description}* 💰\n\nAgora, se possível, envie algumas fotos do ambiente atual. Isso me ajudará a preparar um orçamento mais preciso! 📸\n\nVocê pode enviar:\n• Fotos gerais do ambiente\n• Detalhes do piso atual\n• Medidas específicas\n\nOu digite "pular" se preferir não enviar fotos agora.`, conversationId)
    
    await updateChatbotState(conversationId, ChatState.QUOTE_PHOTOS, collectedData)
  } else {
    await sendTextMessage(message.from, 'Por favor, selecione uma faixa de orçamento:', conversationId)
    await sendMessage(conversationId, { ...BUDGET_MENU, to: message.from })
  }
}

async function handlePhotosResponse(message: IncomingMessage, conversationId: string, state: any) {
  const text = message.text?.toLowerCase()
  
  if (message.type === 'image' || message.mediaId) {
    // Handle photo upload
    const collectedData = { 
      ...state.collectedData, 
      photos: [...(state.collectedData.photos || []), message.mediaId]
    }
    
    await sendTextMessage(message.from, 'Foto recebida! 📸 Obrigado!\n\nVocê pode enviar mais fotos ou digite "continuar" para prosseguir com o orçamento.', conversationId)
    await updateChatbotState(conversationId, ChatState.QUOTE_PHOTOS, collectedData)
  }
  else if (text?.includes('pular') || text?.includes('continuar') || text?.includes('proximo')) {
    await sendTextMessage(message.from, 'Agora preciso dos seus dados para enviar o orçamento detalhado:\n\nPor favor, me informe seu *nome completo*:', conversationId)
    await updateChatbotState(conversationId, ChatState.QUOTE_CONTACT, state.collectedData)
  }
  else {
    await sendTextMessage(message.from, 'Você pode:\n• Enviar fotos do ambiente 📸\n• Digitar "pular" para continuar\n• Digitar "continuar" se já enviou as fotos', conversationId)
  }
}

async function handleContactResponse(message: IncomingMessage, conversationId: string, state: any) {
  const collectedData = state.collectedData
  
  if (!collectedData.name) {
    collectedData.name = message.text
    await sendTextMessage(message.from, `Olá, ${message.text}! 👋\n\nAgora preciso do seu *email* para enviar o orçamento detalhado:`, conversationId)
    await updateChatbotState(conversationId, ChatState.QUOTE_CONTACT, collectedData)
  }
  else if (!collectedData.email) {
    const email = message.text?.trim()
    if (email?.includes('@') && email?.includes('.')) {
      collectedData.email = email
      await generateQuote(message.from, conversationId, collectedData)
    } else {
      await sendTextMessage(message.from, 'Por favor, digite um email válido (ex: seu@email.com):', conversationId)
    }
  }
}

async function generateQuote(phoneNumber: string, conversationId: string, data: any) {
  try {
    // Create quote in database
    const quote = await prisma.quote.create({
      data: {
        name: data.name,
        email: data.email,
        phone: phoneNumber,
        description: `Projeto: ${getProjectTypeDescription(data.projectType)}\nTamanho: ${data.roomSize}\nCronograma: ${getTimelineDescription(data.timeline)}\nOrçamento: ${getBudgetDescription(data.budget)}`,
        status: 'PENDING'
      }
    })

    const summary = `🎉 *Orçamento Solicitado com Sucesso!*

📋 *Resumo do seu projeto:*
• *Tipo:* ${getProjectTypeDescription(data.projectType)}
• *Área:* ${data.roomSize}
• *Cronograma:* ${getTimelineDescription(data.timeline)}
• *Orçamento:* ${getBudgetDescription(data.budget)}

👤 *Dados de contato:*
• *Nome:* ${data.name}
• *Email:* ${data.email}
• *WhatsApp:* ${phoneNumber}

✅ *Próximos passos:*
1. Nossa equipe analisará sua solicitação
2. Entraremos em contato em até 24 horas
3. Agendaremos uma visita técnica gratuita
4. Apresentaremos um orçamento detalhado

💬 Em breve você receberá uma ligação ou mensagem da nossa equipe!

*Pisos Pró - Transformando espaços há mais de 15 anos!* 🏠✨`

    await sendTextMessage(phoneNumber, summary, conversationId)
    
    // Reset conversation to main menu
    await updateChatbotState(conversationId, ChatState.MAIN_MENU, {})
    await sendMessage(conversationId, { ...MAIN_MENU_BUTTONS, to: phoneNumber })
    
    // Mark conversation as completed
    await prisma.whatsAppConversation.update({
      where: { id: conversationId },
      data: { status: 'COMPLETED' }
    })
    
  } catch (error) {
    console.error('Error generating quote:', error)
    await sendTextMessage(phoneNumber, 'Ops! Ocorreu um erro ao processar seu orçamento. Nossa equipe entrará em contato em breve. 🙏', conversationId)
  }
}

async function handleHumanHandoff(phoneNumber: string, conversationId: string) {
  await sendTextMessage(phoneNumber, `🙋‍♂️ *Transferindo para Atendimento Humano*

Em alguns minutos um de nossos especialistas entrará em contato com você.

📞 *Você também pode nos ligar diretamente:*
*(11) 94014-7157*

📧 *Ou enviar um email:*
*contato@pisospro.com.br*

*Horário de atendimento:*
• Segunda a Sexta: 8h às 18h
• Sábado: 9h às 16h

Obrigado pela preferência! 🙏`, conversationId)

  await prisma.whatsAppConversation.update({
    where: { id: conversationId },
    data: { status: 'HANDED_OFF' }
  })
}

async function sendTextMessage(to: string, text: string, conversationId: string) {
  const whatsapp = getWhatsAppClient()
  
  try {
    const response = await whatsapp.sendTextMessage({
      to,
      text: { body: text }
    })
    
    // Save outbound message
    await prisma.whatsAppMessage.create({
      data: {
        conversationId,
        messageId: response.messages[0].id,
        direction: 'OUTBOUND',
        content: text
      }
    })
    
  } catch (error) {
    console.error('Error sending text message:', error)
  }
}

async function sendMessage(conversationId: string, message: any) {
  const whatsapp = getWhatsAppClient()
  
  try {
    const response = await whatsapp.sendInteractiveMessage(message)
    
    // Save outbound message
    await prisma.whatsAppMessage.create({
      data: {
        conversationId,
        messageId: response.messages[0].id,
        direction: 'OUTBOUND',
        content: '[Interactive Message]'
      }
    })
    
  } catch (error) {
    console.error('Error sending interactive message:', error)
  }
}