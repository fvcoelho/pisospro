import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ id: string }>
}

async function getConversation(id: string) {
  return await prisma.whatsAppConversation.findUnique({
    where: { id },
    include: {
      messages: {
        orderBy: { createdAt: 'asc' }
      },
      state: true,
      user: true
    }
  })
}

export default async function ConversationDetailPage({ params }: Props) {
  const { id } = await params
  const conversation = await getConversation(id)

  if (!conversation) {
    notFound()
  }

  const statusColors = {
    ACTIVE: 'bg-green-100 text-green-800',
    COMPLETED: 'bg-blue-100 text-blue-800',
    HANDED_OFF: 'bg-yellow-100 text-yellow-800'
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link 
          href="/admin/whatsapp" 
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          ← Voltar para conversas
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mt-2">
          Conversa com {conversation.customerName || 'Cliente Anônimo'}
        </h1>
        <div className="mt-2 flex items-center space-x-4">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            statusColors[conversation.status as keyof typeof statusColors]
          }`}>
            {conversation.status}
          </span>
          <span className="text-sm text-gray-500">
            {conversation.phoneNumber}
          </span>
          {conversation.state && (
            <span className="text-sm text-gray-500">
              Estado atual: {conversation.state.currentStep}
            </span>
          )}
        </div>
      </div>

      {/* Conversation State Info */}
      {conversation.state && conversation.state.collectedData && Object.keys(conversation.state.collectedData as any).length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Dados Coletados</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {Object.entries((conversation.state.collectedData as Record<string, any>) || {}).map(([key, value]) => (
              <div key={key}>
                <span className="font-medium text-gray-600 capitalize">{key}:</span>
                <span className="ml-2 text-gray-900">{String(value)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Mensagens</h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {conversation.messages.map((message) => (
              <div 
                key={message.id}
                className={`flex ${message.direction === 'OUTBOUND' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.direction === 'OUTBOUND' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-900'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  {message.mediaType && (
                    <p className="text-xs mt-1 opacity-75">
                      [{message.mediaType.toUpperCase()}]
                    </p>
                  )}
                  <p className={`text-xs mt-1 ${
                    message.direction === 'OUTBOUND' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {new Date(message.createdAt).toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Ações Rápidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Enviar Mensagem
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Marcar como Resolvido
            </button>
            <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
              Transferir para Humano
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}