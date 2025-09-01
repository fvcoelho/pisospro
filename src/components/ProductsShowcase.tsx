'use client'

import Link from 'next/link'

const woodProducts = [
  {
    id: 'madeira-macica',
    title: 'Piso de Madeira Maciça',
    subtitle: 'Cumaru, Ipê e Sucupira',
    description: 'São pisos prontos, isto é vem direto da fábrica com 9 camadas de verniz industrial à base d\'água são antialérgicos, além de proteção contra raios ultravioleta.',
    features: [
      '9 camadas de verniz industrial',
      'Antialérgicos',
      'Proteção UV',
      'Instalação flutuante sobre manta',
      'Isolamento térmico e acústico'
    ],
    gradient: 'from-wood-600 to-wood-800',
    popular: true
  },
  {
    id: 'madeira-estruturado',
    title: 'Pisos de Madeira Estruturado',
    subtitle: 'Cumaru, Sucupira e Muiracatiara',
    description: 'O piso estruturado de madeira maciça (também chamado de engenheirado) é a evolução do piso maciço. Possui uma base de compensado naval, que garante melhor proteção contra umidade, e uma capa da madeira maciça.',
    features: [
      'Base de compensado naval',
      'Proteção contra umidade',
      'Pode ser lixado e envernizado',
      '9 camadas de verniz industrial',
      'Instalação flutuante sobre manta EVA'
    ],
    gradient: 'from-wood-500 to-wood-700',
    popular: true
  },
  {
    id: 'decks',
    title: 'Decks de Madeira',
    subtitle: 'Cumaru, Teca, Jatobá e Itaúba',
    description: 'Deck de madeira, com uma linha de madeira sustentável, certificada que é sinônimo de sustentabilidade ambiental. A beleza natural do Deck de Madeira reflete a alta resistência da madeira.',
    features: [
      'Madeira sustentável certificada',
      'Alta resistência e durabilidade',
      'Verniz de alta resistência',
      'Pouca manutenção necessária',
      'Ótimo custo-benefício'
    ],
    gradient: 'from-wood-400 to-wood-600',
    popular: false
  },
  {
    id: 'paineis',
    title: 'Painéis de Madeira',
    subtitle: 'Sucupira',
    description: 'Explorada em grandes espaços como colunas e paredes, os painéis enriquecem qualquer decoração. Além da função decorativa, pode-se instalar suportes de TV, prateleiras, caixas de som.',
    features: [
      'Função decorativa e funcional',
      'Suporte para TV e prateleiras',
      'Verniz de alta resistência',
      'Alta durabilidade',
      'Ótimo custo-benefício'
    ],
    gradient: 'from-gold-500 to-gold-700',
    popular: false
  },
  {
    id: 'forro',
    title: 'Forro de Madeira',
    subtitle: 'Bambu e Cedrinho',
    description: 'O forro de madeira é um acabamento capaz de gerar conforto e beleza ajudam na manutenção da temperatura e do nível de ruído do ambiente.',
    features: [
      'Conforto térmico e acústico',
      'Material de fácil instalação',
      'Durabilidade por muitos anos',
      'Manutenção simples',
      'Mão de obra especializada'
    ],
    gradient: 'from-wood-300 to-wood-500',
    popular: false
  },
  {
    id: 'pergolado',
    title: 'Projetos Especiais - Pergolado',
    subtitle: 'Estruturas Personalizadas',
    description: 'É uma construção decorativa através de vigas e pilares para semi cobertura de áreas externas como jardins, áreas de descanso e entretenimento, churrasqueiras.',
    features: [
      'Design personalizado',
      'Áreas externas',
      'Jardins e churrasqueiras',
      'Playground e entretenimento',
      'Também conhecido como caramanchão'
    ],
    gradient: 'from-green-500 to-green-700',
    popular: false
  },
  {
    id: 'escadas',
    title: 'Revestimento em Escada',
    subtitle: 'Todos os tipos de madeira',
    description: 'A escada de madeira tem a função de interligação entre andares. Podemos executar trabalho com assoalhos, pisos prontos, pisos vinílicos ou pisos laminados.',
    features: [
      'Escadas em madeira maciça',
      'Revestimento sobre concreto',
      'Diversos tipos de madeira',
      'Assoalhos e pisos prontos',
      'Instalação especializada'
    ],
    gradient: 'from-wood-400 to-wood-700',
    popular: false
  }
]

export default function ProductsShowcase() {
  return (
    <section className="py-20 bg-gradient-to-br from-neutral-50 via-white to-wood-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-gradient-gold">Pisos e Revestimentos em Madeira</span>
          </h2>
          <p className="font-montserrat text-xl text-gray-600 max-w-3xl mx-auto">
            Trabalhamos com as melhores madeiras do mercado, oferecendo qualidade, durabilidade e beleza natural para seu ambiente
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {woodProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-2xl shadow-xl overflow-hidden relative group hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              {product.popular && (
                <div className="absolute top-6 right-6 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg z-10">
                  Mais Procurado
                </div>
              )}
              
              <div className={`h-32 bg-gradient-to-r ${product.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              
              <div className="p-8 -mt-8">
                <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
                  <h3 className="font-cinzel text-2xl font-bold text-gray-900 mb-1">
                    {product.title}
                  </h3>
                  <p className="text-green-600 font-semibold text-lg">{product.subtitle}</p>
                </div>
                
                <p className="font-montserrat text-gray-600 mb-6 leading-relaxed">
                  {product.description}
                </p>
                
                <div className="mb-8">
                  <h4 className="font-cinzel text-lg font-bold text-gray-900 mb-4">Características:</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600 font-montserrat">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Link 
                  href="/contact"
                  className="block text-center bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 font-montserrat shadow-lg group-hover:shadow-xl"
                >
                  Solicitar Orçamento
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}