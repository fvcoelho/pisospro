'use client'

import Link from 'next/link'

const finishingProducts = [
  {
    id: 'rodapes-branco',
    title: 'Rodapés Poliestireno Branco',
    specs: [
      'Espessura: 2cm',
      'Comprimento: 2,20m',
      'Alturas: 7cm | 10cm | 15cm | 20cm',
      'Atende todos os tipos de pisos',
      'Vendidos em barras com 2,20m'
    ],
    gradient: 'from-gray-100 to-gray-300'
  },
  {
    id: 'rodapes-preto',
    title: 'Rodapés Poliestireno Preto',
    specs: [
      'Alturas: 7cm | 10cm | 15cm',
      'Comprimento: 2,20m',
      'Atende todos os tipos de pisos',
      'Ideal para ambientes modernos',
      'Vendidos em barras com 2,20m'
    ],
    gradient: 'from-gray-700 to-gray-900'
  },
  {
    id: 'perfis-aluminio',
    title: 'Perfis de Alumínio',
    specs: [
      'Trilho de Portas',
      'Perfis para escada',
      'Perfis para bordas',
      'Acabamento profissional',
      'Alta durabilidade'
    ],
    gradient: 'from-gray-400 to-gray-600'
  },
  {
    id: 'transicoes',
    title: 'Transições e Acabamentos',
    specs: [
      'Soleiras - Transição entre pisos',
      'Baguetes - Portas de banheiros',
      'Junta Seca - Mesmo nível',
      'Entre Madeira e Piso Frio',
      'Acabamento perfeito'
    ],
    gradient: 'from-wood-400 to-wood-600'
  }
]

export default function FinishingsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
              Acabamentos e Acessórios
            </span>
          </h2>
          <p className="font-montserrat text-xl text-gray-600 max-w-3xl mx-auto">
            Detalhes que fazem a diferença. Rodapés, perfis e transições para um acabamento perfeito
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {finishingProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className={`h-24 bg-gradient-to-r ${product.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </div>
              
              <div className="p-6">
                <h3 className="font-cinzel text-lg font-bold text-gray-900 mb-4">
                  {product.title}
                </h3>
                
                <ul className="space-y-2 mb-6">
                  {product.specs.map((spec, index) => (
                    <li key={index} className="flex items-start text-gray-600 font-montserrat">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 mt-1.5 flex-shrink-0" />
                      <span className="text-sm">{spec}</span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href="/contact"
                  className="block text-center bg-gradient-to-r from-gray-600 to-gray-700 text-white px-4 py-2 rounded-lg font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-300 font-montserrat text-sm shadow-md group-hover:shadow-lg"
                >
                  Consultar
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl shadow-lg">
          <div className="text-center">
            <h3 className="font-cinzel text-2xl font-bold text-gray-900 mb-4">
              Acabamento Profissional para Todos os Tipos de Piso
            </h3>
            <p className="font-montserrat text-gray-600 mb-6 max-w-2xl mx-auto">
              Trabalhamos com acabamentos para pisos vinílicos, cerâmicos, mármores, granitos e madeira. 
              Garantimos a perfeita harmonia entre seu piso e os acabamentos escolhidos.
            </p>
            <Link 
              href="/contact"
              className="inline-block bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 font-montserrat shadow-lg"
            >
              Solicitar Catálogo Completo
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}