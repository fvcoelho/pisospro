const features = [
  {
    title: '25+ Anos de Experiência',
    description: 'Décadas de expertise em instalação e reforma de pisos.',
    icon: '⭐'
  },
  {
    title: 'Licenciado e Segurado',
    description: 'Profissionais totalmente licenciados com cobertura de seguro abrangente.',
    icon: '🛡️'
  },
  {
    title: 'Materiais de Qualidade',
    description: 'Usamos apenas materiais premium de fabricantes confiáveis.',
    icon: '💎'
  },
  {
    title: 'Orçamentos Gratuitos',
    description: 'Cotações sem compromisso com preços transparentes.',
    icon: '💰'
  },
  {
    title: 'Garantia Assegurada',
    description: 'Todo trabalho vem com nossa proteção de garantia abrangente.',
    icon: '✅'
  },
  {
    title: 'Suporte 24/7',
    description: 'Atendimento ao cliente 24 horas para sua tranquilidade.',
    icon: '📞'
  }
]

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Por Que Escolher a Pisos-Pró?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Estamos comprometidos em fornecer soluções excepcionais em pisos com qualidade e atendimento incomparáveis.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}