import { prisma } from '@/lib/prisma'

async function getConversations() {
  return await prisma.whatsAppConversation.findMany({
    include: {
      messages: {
        orderBy: { createdAt: 'desc' },
        take: 1
      },
      state: true
    },
    orderBy: { lastMessageAt: 'desc' }
  })
}

export default async function WhatsAppAdminPage() {
  const conversations = await getConversations()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Conversas WhatsApp</h1>
        <p className="text-gray-600">Gerencie as conversas do chatbot</p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {conversations.map((conversation) => {
            const lastMessage = conversation.messages[0]
            const statusColors = {
              ACTIVE: 'bg-green-100 text-green-800',
              COMPLETED: 'bg-blue-100 text-blue-800',
              HANDED_OFF: 'bg-yellow-100 text-yellow-800'
            }

            return (
              <li key={conversation.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {conversation.customerName?.charAt(0) || '?'}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-gray-900">
                            {conversation.customerName || 'Cliente Anônimo'}
                          </p>
                          <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            statusColors[conversation.status as keyof typeof statusColors]
                          }`}>
                            {conversation.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {conversation.phoneNumber}
                        </p>
                        {conversation.state && (
                          <p className="text-xs text-gray-500">
                            Estado: {conversation.state.currentStep}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        {new Date(conversation.lastMessageAt).toLocaleString('pt-BR')}
                      </p>
                      {lastMessage && (
                        <p className="text-xs text-gray-400 mt-1 max-w-xs truncate">
                          {lastMessage.direction === 'INBOUND' ? '📩' : '📤'} {lastMessage.content}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      {conversations.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Nenhuma conversa encontrada</p>
        </div>
      )}

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-3">Configuração do WhatsApp</h2>
        <div className="space-y-2 text-sm text-blue-800">
          <p><strong>Webhook URL:</strong> {process.env.APP_URL || 'https://your-domain.com'}/api/whatsapp/webhook</p>
          <p><strong>Verify Token:</strong> Configure no Meta Business o token definido em WHATSAPP_WEBHOOK_VERIFY_TOKEN</p>
        </div>
      </div>
    </div>
  )
}