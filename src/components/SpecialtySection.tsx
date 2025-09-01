'use client'

import Link from 'next/link'

const specialtyProducts = [
  {
    id: 'grama-sintetica',
    title: 'Grama Sintética',
    subtitle: 'Jardim perfeito o ano todo',
    description: 'A grama sintética é a escolha perfeita para quem quer ter um jardim bonito e verde sem os incômodos da manutenção diária. Com a aparência natural de grama verdadeira, nossa grama sintética é resistente às condições climáticas adversas.',
    features: [
      'Aparência natural de grama verdadeira',
      'Resistente a sol forte e chuva',
      'Não precisa de luz solar para prosperar',
      'Não requer rega ou poda',
      'Ecológica - sem uso de água, adubo ou pesticidas',
      'Alta frequência de uso',
      'Economia a longo prazo'
    ],
    gradient: 'from-green-500 to-green-700',
    icon: '🌿'
  },
  {
    id: 'granilite',
    title: 'Piso Granilite',
    subtitle: 'Terrazzo Veneziano',
    description: 'O granilite consiste em uma mistura de diferentes materiais: fragmentos de mármore, granito, azulejo, pedras naturais e vidro colorido. O resultado é uma superfície lisa com vários fragmentos de diferentes cores e tamanhos.',
    features: [
      'Cada peça é única',
      'Variadas cores e padrões',
      'Superfície lisa e elegante',
      'Tradição desde o século XV',
      'Tendência na decoração atual',
      'Alta durabilidade',
      'Originalidade na decoração'
    ],
    gradient: 'from-neutral-500 to-neutral-700',
    icon: '💎'
  }
]

export default function SpecialtySection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-gradient-gold">Soluções Especiais</span>
          </h2>
          <p className="font-montserrat text-xl text-gray-600 max-w-3xl mx-auto">
            Produtos diferenciados para necessidades específicas, unindo beleza, praticidade e tecnologia
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {specialtyProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-2xl shadow-xl overflow-hidden relative group hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              <div className={`h-40 bg-gradient-to-r ${product.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl opacity-30">{product.icon}</div>
                </div>
              </div>
              
              <div className="p-8 -mt-10">
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
                  <h4 className="font-cinzel text-lg font-bold text-gray-900 mb-4">Vantagens:</h4>
                  <ul className="grid grid-cols-1 gap-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-gray-600 font-montserrat">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-1.5 flex-shrink-0" />
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