import QuoteForm from '@/components/QuoteForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contato Pisos Pró - Obtenha seu Orçamento Gratuito Hoje',
  description: 'Entre em contato com a Pisos Pró para uma consulta e orçamento gratuitos. Ligue (11) 94014-7157 ou preencha nosso formulário online. Resposta rápida, preços transparentes, satisfação garantida.',
  keywords: 'contato pisos-pro, orcamento pisos, estimativa gratuita, consultoria pisos, contato empreiteiro pisos, solicitar orcamento',
  openGraph: {
    title: 'Contato Pisos Pró - Orçamento Gratuito',
    description: 'Obtenha sua consulta e orçamento gratuitos hoje mesmo. Assessoria especializada e preços transparentes.',
    type: 'website',
  },
}

const contactInfo = [
  {
    type: 'Telefone',
    value: '(11) 94014-7157',
    description: 'Ligue para atendimento imediato',
    icon: '📞',
    href: 'tel:11-94014-7157'
  },
  {
    type: 'E-mail',
    value: 'contato@pisospro.com.br',
    description: 'Envie suas dúvidas a qualquer momento',
    icon: '✉️',
    href: 'mailto:contato@pisospro.com.br'
  },
  {
    type: 'Endereço',
    value: 'Rua Principal, 123\nSão Paulo, SP 01234-567',
    description: 'Visite nosso showroom',
    icon: '📍',
    href: 'https://maps.google.com'
  },
  {
    type: 'Horário',
    value: 'Seg-Sex: 8h às 18h\nSáb: 9h às 16h\nDom: Fechado',
    description: 'Horário de funcionamento',
    icon: '🕒',
    href: null
  }
]

const serviceAreas = [
  'Centro', 'Zona Norte', 'Zona Leste', 'Zona Oeste',
  'Zona Sul', 'ABC Paulista', 'Alphaville', 'Moema',
  'Vila Mariana', 'Pinheiros', 'Perdizes', 'Morumbi'
]

export default function ContactPage() {
  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Obtenha seu Orçamento Gratuito
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pronto para transformar seu espaço? Entre em contato hoje mesmo para uma consulta gratuita 
            e orçamento detalhado personalizado para as necessidades do seu projeto.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Quote Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Solicitar Orçamento</h2>
              <QuoteForm />
            </div>
          </div>

          {/* Contact Information & Sidebar */}
          <div className="space-y-8">
            {/* Contact Info Cards */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Informações de Contato</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="text-2xl">{info.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{info.type}</h4>
                      {info.href ? (
                        <a 
                          href={info.href}
                          className="text-blue-600 hover:text-blue-800 transition-colors whitespace-pre-line"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-gray-600 whitespace-pre-line">{info.value}</p>
                      )}
                      <p className="text-sm text-gray-500 mt-1">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Service */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-red-800 mb-3">🚨 Serviço de Emergência</h3>
              <p className="text-red-700 mb-4">
                Danos por enchente? Reparo urgente necessário? Oferecemos serviços de pisos 24/7 para emergências.
              </p>
              <a 
                href="tel:11-9999-8888"
                className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors inline-block"
              >
                Ligar para Emergência
              </a>
            </div>

            {/* Service Areas */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Áreas de Atendimento</h3>
              <p className="text-gray-600 mb-4">Atendemos com orgulho a grande região metropolitana incluindo:</p>
              <div className="grid grid-cols-2 gap-2">
                {serviceAreas.map((area, index) => (
                  <div key={index} className="text-sm text-gray-600 flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    {area}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Não vê sua região? Entre em contato mesmo assim - ainda podemos ajudar!
              </p>
            </div>

            {/* Financing */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-blue-800 mb-3">💳 Financiamento Disponível</h3>
              <p className="text-blue-700 mb-4">
                Opções flexíveis de pagamento e planos de financiamento disponíveis para clientes qualificados.
              </p>
              <ul className="text-sm text-blue-600 space-y-1">
                <li>• 0% de juros por 12 meses</li>
                <li>• Planos de pagamento estendido</li>
                <li>• Processo de aprovação rápido</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Why Choose Us for Contact */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Por Que Clientes Escolhem a Pisos Pró
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Resposta Rápida</h3>
              <p className="text-gray-600">
                Respondemos a todas as consultas em até 24 horas e frequentemente agendamos consultas em até 48 horas.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Preços Transparentes</h3>
              <p className="text-gray-600">
                Sem taxas ocultas ou cobranças surpresa. Nossos orçamentos detalhados incluem tudo que você precisa saber.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Satisfação Garantida</h3>
              <p className="text-gray-600">
                Garantimos nosso trabalho com garantias abrangentes e 100% de satisfação garantida.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}