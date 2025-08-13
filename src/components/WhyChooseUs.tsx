'use client'

const features = [
  {
    title: '15+ Anos de Experiência',
    description: 'Décadas de expertise em instalação e restauração de pisos de madeira com técnicas tradicionais e modernas.',
    stats: '15+ Anos',
    color: 'gold'
  },
  {
    title: 'Certificado e Licenciado',
    description: 'Profissionais qualificados com todas as licenças necessárias e seguro completo para sua proteção.',
    stats: '100% Legal',
    color: 'wood'
  },
  {
    title: 'Madeira Premium',
    description: 'Trabalhamos exclusivamente com madeiras de alta qualidade de fornecedores certificados e sustentáveis.',
    stats: 'Qualidade A+',
    color: 'gold'
  },
  {
    title: 'Orçamento Transparente',
    description: 'Avaliação gratuita com preços claros, sem taxas ocultas ou surpresas no final do projeto.',
    stats: 'Sem Taxas Ocultas',
    color: 'wood'
  },
  {
    title: 'Garantia Total',
    description: 'Todos os nossos trabalhos incluem garantia abrangente de instalação e acabamento.',
    stats: 'Garantia Vitalícia',
    color: 'gold'
  },
  {
    title: 'Atendimento Especializado',
    description: 'Suporte técnico completo desde a escolha do material até a manutenção pós-instalação.',
    stats: 'Suporte Total',
    color: 'wood'
  }
]

export default function WhyChooseUs() {

  return (
    <section className="py-20 relative bg-gradient-to-br from-wood-900 via-wood-800 to-wood-700">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-gold-400 font-semibold text-sm uppercase tracking-wider bg-gold-400/10 px-4 py-2 rounded-full">
              Nossa Diferença
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Por Que Escolher a
            <span className="block text-gradient-gold mt-2">Pisos Pró?</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Combinamos tradição artesanal com técnicas modernas para entregar 
            pisos de madeira excepcionais que resistem ao tempo.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group text-center transition-all duration-300 hover:shadow-lg"
            >
              <div className="glass-enhanced p-8 rounded-2xl h-full">
                {/* Stats badge */}
                <div className="mb-6">
                  <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${
                    feature.color === 'gold' 
                      ? 'bg-gradient-gold text-wood-900' 
                      : 'bg-gradient-wood text-white'
                  }`}>
                    {feature.stats}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gold-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors">
                  {feature.description}
                </p>

                {/* Decorative line */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className={`w-12 h-1 mx-auto rounded-full ${
                    feature.color === 'gold' ? 'bg-gradient-gold' : 'bg-gradient-wood'
                  }`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-20 text-center">
          <div className="glass-enhanced p-12 rounded-3xl max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-6">
              Pronto Para Transformar Seu Espaço?
            </h3>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de clientes satisfeitos que confiaram na Pisos Pró 
              para criar ambientes únicos e duradouros.
            </p>
            
            {/* Trust indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-gold-400">5000+</div>
                <div className="text-white/70">Projetos Concluídos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gold-400">98%</div>
                <div className="text-white/70">Satisfação do Cliente</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gold-400">15+</div>
                <div className="text-white/70">Anos de Experiência</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-gold text-wood-900 px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-opacity duration-300 shadow-elegant">
                Solicitar Orçamento Grátis
              </button>
              <button className="glass-enhanced text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-colors duration-300 border-2 border-white/20">
                Falar com Especialista
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}