import Link from 'next/link'

const services = [
  {
    title: 'Instalação de Madeira',
    description: 'Instalação especializada de pisos de madeira premium com precisão e cuidado.',
    icon: '🪵',
    href: '/services/hardwood'
  },
  {
    title: 'Cerâmica e Pedra',
    description: 'Bela instalação de azulejos cerâmicos, porcelanato e pedra natural.',
    icon: '🏛️',
    href: '/services/tile'
  },
  {
    title: 'Piso Laminado',
    description: 'Opções de laminado acessíveis e duráveis para todos os ambientes.',
    icon: '📋',
    href: '/services/laminate'
  },
  {
    title: 'Vinílico e LVT',
    description: 'Soluções impermeáveis em piso vinílico de luxo em régua e manta.',
    icon: '💧',
    href: '/services/vinyl'
  },
  {
    title: 'Instalação de Carpete',
    description: 'Instalação confortável de carpetes para espaços residenciais e comerciais.',
    icon: '🏠',
    href: '/services/carpet'
  },
  {
    title: 'Restauração de Pisos',
    description: 'Restaure a beleza dos seus pisos de madeira existentes.',
    icon: '✨',
    href: '/services/refinishing'
  }
]

export default function ServicesOverview() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nossos Serviços
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Da instalação à restauração, oferecemos soluções completas em pisos para todas as necessidades e orçamentos.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <Link 
                href={service.href}
                className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
              >
                Saiba Mais →
              </Link>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/services"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Ver Todos os Serviços
          </Link>
        </div>
      </div>
    </section>
  )
}