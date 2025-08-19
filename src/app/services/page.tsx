import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Serviços Profissionais de Pisos - Instalação e Reforma | Pisos Pró',
  description: 'Serviços especializados de instalação de pisos incluindo madeira, cerâmica, laminado, vinílico e carpete. Profissionais licenciados com mais de 15 anos de experiência. Orçamentos gratuitos disponíveis.',
  keywords: 'instalação de pisos, instalação de madeira, instalação de cerâmica, piso laminado, piso vinílico, instalação de carpete, restauração de pisos, serviços profissionais de pisos',
  openGraph: {
    title: 'Serviços Profissionais de Pisos | Pisos Pró',
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
    gradient: 'from-wood-400 to-wood-600',
    popular: true
  },
  // {
  //   id: 'tile',
  //   title: 'Instalação de Cerâmica e Pedra',
  //   description: 'Bela instalação de cerâmica, porcelanato e pedra natural para cozinhas, banheiros e áreas de estar.',
  //   features: ['Cerâmica e Porcelanato', 'Pedra Natural', 'Padrões de Mosaico', 'Instalação Impermeável'],
  //   price: 'A partir de R$ 80/m²',
  //   image: '🏛️',
  //   popular: false
  // },
  {
    id: 'laminate',
    title: 'Piso Laminado',
    description: 'Piso laminado acessível e durável que imita a aparência da madeira e cerâmica por uma fração do custo.',
    features: ['Instalação Click', 'Opções Resistentes à Água', 'Múltiplos Acabamentos', 'Instalação Rápida'],
    price: 'A partir de R$ 50/m²',
    gradient: 'from-wood-300 to-wood-500',
    popular: false
  },
  {
    id: 'vinyl',
    title: 'Vinílico e LVT',
    description: 'Piso vinílico de luxo em régua e manta perfeito para áreas de alta umidade e tráfego intenso.',
    features: ['100% À Prova d’Água', 'Vinílico de Luxo em Régua', 'Vinílico em Manta', 'Grau Comercial'],
    price: 'A partir de R$ 65/m²',
    gradient: 'from-blue-400 to-blue-600',
    popular: true
  },
  {
    id: 'other',
    title: 'Outros Serviços',
    description: 'Soluções especializadas em pisos para atender suas necessidades específicas.',
    features: ['Consulta Personalizada', 'Projetos Especiais', 'Soluções Sob Medida', 'Acabamento Premium'],
    price: 'Sob consulta',
    gradient: 'from-neutral-400 to-neutral-600',
    popular: false
  },
  {
    id: 'refinishing',
    title: 'Restauração de Pisos',
    description: 'Restaure a beleza dos seus pisos de madeira existentes com lixamento, tingimento e acabamento profissionais.',
    features: ['Lixamento Completo', 'Tingimento Personalizado', 'Acabamento Poliuretano', 'Processo Sem Poeira'],
    price: 'A partir de R$ 45/m²',
    gradient: 'from-gold-400 to-gold-600',
    popular: true
  }
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-cinzel text-5xl md:text-6xl lg:text-7xl mb-6 tracking-wider font-light">
            <span className="text-gradient-gold">
              Nossos Serviços
            </span>
          </h1>
          <p className="font-montserrat text-xl md:text-2xl mb-8 font-light tracking-wide text-white/90 max-w-4xl mx-auto">
            Serviços especializados de instalação e reforma de pisos com mais de 15 anos de experiência 
            em projetos residenciais e comerciais
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-2xl shadow-xl overflow-hidden relative group hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              {service.popular && (
                <div className="absolute top-6 right-6 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg z-10">
                  Mais Popular
                </div>
              )}
              
              {/* Gradient Header */}
              <div className={`h-24 bg-gradient-to-r ${service.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              
              <div className="p-8 -mt-6 relative">
                <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
                  <div className="mb-4">
                    <h3 className="font-cinzel text-3xl font-bold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-green-600 font-bold text-xl">{service.price}</p>
                  </div>
                </div>
                
                <p className="font-montserrat text-gray-600 mb-8 leading-relaxed">{service.description}</p>
                
                <div className="mb-8">
                  <h4 className="font-cinzel text-lg font-bold text-gray-900 mb-4">O que está incluído:</h4>
                  <ul className="space-y-3">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600 font-montserrat">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/contact"
                    className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 flex-1 text-center font-montserrat shadow-lg group-hover:shadow-xl"
                  >
                    Solicitar Orçamento
                  </Link>
                  <Link 
                    href={`/services/${service.id}`}
                    className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-green-50 transition-all duration-300 font-montserrat text-center"
                  >
                    Saiba Mais
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-900 via-green-800 to-green-700 text-white rounded-2xl p-12 text-center shadow-2xl">
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient-gold">
              Pronto para Transformar seu Espaço?
            </span>
          </h2>
          <p className="font-montserrat text-xl md:text-2xl mb-8 font-light text-white/90 max-w-3xl mx-auto">
            Obtenha um orçamento gratuito e sem compromisso para seu projeto de piso. 
            Experimente a diferença da qualidade profissional
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/contact"
              className="group relative px-12 py-4 overflow-hidden bg-green-600 hover:bg-green-700 transition-colors duration-300 rounded font-montserrat font-semibold text-lg"
            >
              <span className="relative z-10">Orçamento Grátis</span>
            </Link>
            <Link 
              href="tel:11-94014-7157"
              className="group relative px-12 py-4 border-2 border-white text-white hover:bg-white hover:text-green-900 transition-all duration-300 rounded font-montserrat font-semibold text-lg"
            >
              <span className="relative z-10">Ligue (11) 94014-7157</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}