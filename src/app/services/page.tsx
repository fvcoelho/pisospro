import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Serviços Profissionais de Pisos - Instalação e Reforma | Pisos-Pró',
  description: 'Serviços especializados de instalação de pisos incluindo madeira, cerâmica, laminado, vinílico e carpete. Profissionais licenciados com mais de 25 anos de experiência. Orçamentos gratuitos disponíveis.',
  keywords: 'instalação de pisos, instalação de madeira, instalação de cerâmica, piso laminado, piso vinílico, instalação de carpete, restauração de pisos, serviços profissionais de pisos',
  openGraph: {
    title: 'Serviços Profissionais de Pisos | Pisos-Pró',
    description: 'Transforme seu espaço com nossos serviços especializados de instalação e reforma de pisos.',
    type: 'website',
  },
}

const services = [
  {
    id: 'hardwood',
    title: 'Instalação de Madeira',
    description: 'Instalação premium de piso de madeira com artesanato especializado. Trabalhamos com todos os tipos de madeira incluindo carvalho, maple, cerejeira e espécies exóticas.',
    features: ['Acabamento no Local e Pré-acabado', 'Madeira Maciça e Engenheirada', 'Tingimento Personalizado', 'Lixamento Profissional'],
    price: 'A partir de R$ 120/m²',
    image: '🪵',
    popular: true
  },
  {
    id: 'tile',
    title: 'Instalação de Cerâmica e Pedra',
    description: 'Bela instalação de cerâmica, porcelanato e pedra natural para cozinhas, banheiros e áreas de estar.',
    features: ['Cerâmica e Porcelanato', 'Pedra Natural', 'Padrões de Mosaico', 'Instalação Impermeável'],
    price: 'A partir de R$ 80/m²',
    image: '🏛️',
    popular: false
  },
  {
    id: 'laminate',
    title: 'Piso Laminado',
    description: 'Piso laminado acessível e durável que imita a aparência da madeira e cerâmica por uma fração do custo.',
    features: ['Instalação Click', 'Opções Resistentes à Água', 'Múltiplos Acabamentos', 'Instalação Rápida'],
    price: 'A partir de R$ 50/m²',
    image: '📋',
    popular: false
  },
  {
    id: 'vinyl',
    title: 'Vinílico e LVT',
    description: 'Piso vinílico de luxo em régua e manta perfeito para áreas de alta umidade e tráfego intenso.',
    features: ['100% À Prova d’Água', 'Vinílico de Luxo em Régua', 'Vinílico em Manta', 'Grau Comercial'],
    price: 'A partir de R$ 65/m²',
    image: '💧',
    popular: true
  },
  {
    id: 'carpet',
    title: 'Instalação de Carpete',
    description: 'Instalação confortável de carpete para quartos, salas e escritórios com base e acabamento profissionais.',
    features: ['Residencial e Comercial', 'Base Premium', 'Opções Anti-Manchas', 'Acabamento Personalizado'],
    price: 'A partir de R$ 35/m²',
    image: '🏠',
    popular: false
  },
  {
    id: 'refinishing',
    title: 'Restauração de Pisos',
    description: 'Restaure a beleza dos seus pisos de madeira existentes com lixamento, tingimento e acabamento profissionais.',
    features: ['Lixamento Completo', 'Tingimento Personalizado', 'Acabamento Poliuretano', 'Processo Sem Poeira'],
    price: 'A partir de R$ 45/m²',
    image: '✨',
    popular: true
  }
]

export default function ServicesPage() {
  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nossos Serviços
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Serviços profissionais de instalação e reforma de pisos para propriedades residenciais e comerciais.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-lg shadow-lg overflow-hidden relative">
              {service.popular && (
                <div className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
                  Popular
                </div>
              )}
              
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-4">{service.image}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                    <p className="text-blue-600 font-semibold">{service.price}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">O que está incluído:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex gap-4">
                  <Link 
                    href="/contact"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex-1 text-center"
                  >
                    Solicitar Orçamento
                  </Link>
                  <Link 
                    href={`/services/${service.id}`}
                    className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                  >
                    Saiba Mais
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-blue-900 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para Transformar seu Espaço?</h2>
          <p className="text-xl mb-6">
            Obtenha um orçamento gratuito e sem compromisso para seu projeto de piso hoje.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
            >
              Orçamento Grátis
            </Link>
            <Link 
              href="tel:11-9999-9999"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
            >
              Ligue (11) 9999-9999
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}