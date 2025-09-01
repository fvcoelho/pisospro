'use client'

import Link from 'next/link'

const vinylProducts = [
  {
    id: 'vinil-5mm',
    title: 'Piso Vinílico 5mm',
    subtitle: 'Clicado sem uso de cola',
    description: 'O piso vinílico rígido SPC tem na sua composição matéria prima à base de carbonato de cálcio, existente nos mármores, além de um percentual de plástico virgem, conferindo ao piso maior rigidez, estabilidade, dureza, e impermeabilidade. Único do mercado com tecnologia anti-mofo e bolor.',
    features: [
      'Tecnologia anti-mofo e bolor',
      'Resistente à umidade',
      'Ideal para cozinhas e áreas molhadas',
      'Perfeito para pets e crianças',
      'Instalação clicada sem cola'
    ],
    applications: 'Áreas residenciais e comerciais de tráfego moderado, lojas, academias, restaurantes, hotéis, brinquedotecas',
    gradient: 'from-blue-500 to-blue-700',
    popular: true
  },
  {
    id: 'vinil-2mm',
    title: 'Piso Vinílico 2/3mm',
    subtitle: 'Colado com cola PU',
    description: 'O piso vinílico 2mm é um revestimento produzido com a mais avançada tecnologia existente no mercado para produtos tipo LVT. Composto por PVC reciclado, plastificantes, estabilizantes e capa antiabrasiva de alta resistência com 0,2mm de espessura.',
    features: [
      'Produto Sustentável',
      'Resistente a Umidade',
      'Alta resistência ao Tráfego',
      'Acabamento UV Anti-Scratch',
      'Fácil Limpeza e Manutenção',
      'Hipoalergênicos',
      'Resistente a Cupins'
    ],
    applications: 'Áreas residenciais e comerciais, cozinhas, lojas, academias, restaurantes, hotéis',
    gradient: 'from-blue-400 to-blue-600',
    popular: false
  }
]

export default function VinylSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Pisos Vinílicos de Alta Performance
            </span>
          </h2>
          <p className="font-montserrat text-xl text-gray-600 max-w-3xl mx-auto">
            Tecnologia de ponta em pisos vinílicos, oferecendo resistência à água, durabilidade e praticidade para seu ambiente
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {vinylProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-2xl shadow-xl overflow-hidden relative group hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              {product.popular && (
                <div className="absolute top-6 right-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg z-10">
                  Recomendado
                </div>
              )}
              
              <div className={`h-32 bg-gradient-to-r ${product.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-2 opacity-20">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="w-12 h-12 bg-white/30 rounded" />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-8 -mt-8">
                <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
                  <h3 className="font-cinzel text-2xl font-bold text-gray-900 mb-1">
                    {product.title}
                  </h3>
                  <p className="text-blue-600 font-semibold text-lg">{product.subtitle}</p>
                </div>
                
                <p className="font-montserrat text-gray-600 mb-6 leading-relaxed text-sm">
                  {product.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="font-cinzel text-lg font-bold text-gray-900 mb-3">Benefícios:</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600 font-montserrat">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-8 p-4 bg-blue-50 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-2">Aplicações Recomendadas:</h4>
                  <p className="font-montserrat text-sm text-gray-600">
                    {product.applications}
                  </p>
                </div>
                
                <Link 
                  href="/contact"
                  className="block text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-montserrat shadow-lg group-hover:shadow-xl"
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