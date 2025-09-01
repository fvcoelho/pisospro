'use client'

import Link from 'next/link'

const safetyProducts = {
  outdoor: {
    title: 'USO EXTERNO',
    subtitle: 'Playground e Quadras',
    products: [
      {
        id: 'super-slim',
        name: 'SUPER SLIM',
        features: ['Baixo custo', 'Segurança', 'Fácil instalação', 'Pouco amortecimento', 'Finos mas emborrachados']
      },
      {
        id: 'soft-25',
        name: 'SOFT 25',
        features: ['Baixo custo', 'Segurança', 'Fácil instalação', 'Pouco amortecimento', 'Figuras geométricas (mono cor)']
      },
      {
        id: 'soft-50',
        name: 'SOFT 50 - BLOCOS INTERTRAVADO',
        features: ['Baixo custo', 'Segurança', 'Fácil instalação', 'Amortecimento', 'Não encharca']
      },
      {
        id: 'mulch',
        name: 'MULCH',
        features: ['Médio custo', 'Segurança', 'Fácil instalação', 'Amortecimento', 'Drenante']
      },
      {
        id: 'duplo-t',
        name: 'DUPLO T',
        features: ['Médio custo', 'Segurança', 'Fácil instalação', 'Amortecimento', 'Várias formas e tamanhos (com encaixes)']
      },
      {
        id: 'soft-pip',
        name: 'SOFT P.I.P',
        features: ['Médio custo', 'Segurança', 'Fácil instalação', 'Amortecimento', 'Monolítico', 'Drenante']
      },
      {
        id: 'sport-ground',
        name: 'SOFT SPORT GROUND',
        features: ['Baixo custo', 'Segurança', 'Fácil instalação', 'Amortecimento', 'Perfeito para crianças - Brincadeiras']
      },
      {
        id: 'roll-performance',
        name: 'ROLL - ALTA PERFORMANCE',
        features: ['Médio custo', 'Segurança', 'Fácil instalação', 'Amortecimento e Antiderrapante', 'Perfeito para esportes com bola']
      }
    ]
  },
  indoor: {
    title: 'USO INTERNO',
    subtitle: 'Academias e Ambientes Corporativos',
    products: [
      {
        id: 'soft-peso-livre',
        name: 'SOFT PESO LIVRE',
        features: ['Baixo custo', 'Segurança', 'Fácil instalação', 'Alta resistência', 'Ideal para Academia e Crossfit', 'Placas: 50x50 / 1mx1m']
      },
      {
        id: 'soft-grafico',
        name: 'SOFT PESO LIVRE GRÁFICO',
        features: ['Baixo custo', 'Segurança', 'Fácil instalação', 'Alta resistência', 'Ideal para Academia e Crossfit', 'Placas: 50x50 / 1mx1m', 'Personalização com desenhos']
      },
      {
        id: 'hall-performance',
        name: 'HALL ALTA PERFORMANCE',
        features: ['Baixo custo', 'Segurança', 'Fácil instalação', 'Alta resistência', 'Ideal para Academia e Crossfit', 'Rolo emborrachado', 'Conforto']
      },
      {
        id: 'roll-academia',
        name: 'ROLL FORMATOS ACADEMIA',
        features: ['Baixo custo', 'Segurança', 'Fácil instalação', 'Alta resistência', 'Ideal para Academia e Crossfit', 'Encaixes']
      },
      {
        id: 'roll-alta',
        name: 'ROLL ALTA PERFORMANCE',
        features: ['Baixo custo', 'Segurança', 'Fácil instalação', 'Alta resistência', 'Ideal para Academia e Crossfit', 'Rolo emborrachado', 'Conforto']
      },
      {
        id: 'roll-corporativo',
        name: 'ROLL FORMATOS CORPORATIVOS',
        features: ['Baixo custo', 'Segurança', 'Fácil instalação', 'Alta resistência', 'Ideal para Academia e Crossfit', 'Encaixes']
      }
    ]
  }
}

export default function SafetyFlooringSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
              Pisos de Absorção de Impacto
            </span>
          </h2>
          <p className="font-montserrat text-xl text-gray-600 max-w-3xl mx-auto">
            Segurança e conforto para áreas esportivas, playgrounds e academias. 
            O piso é um dos principais fatores de segurança em cada ambiente.
          </p>
        </div>

        {/* Outdoor Products */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="font-cinzel text-3xl font-bold text-gray-900 mb-2">
              {safetyProducts.outdoor.title}
            </h3>
            <p className="font-montserrat text-lg text-gray-600">
              {safetyProducts.outdoor.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {safetyProducts.outdoor.products.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="h-20 bg-gradient-to-r from-orange-400 to-orange-600 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                </div>
                
                <div className="p-5">
                  <h4 className="font-cinzel text-md font-bold text-gray-900 mb-3">
                    {product.name}
                  </h4>
                  
                  <ul className="space-y-1 mb-4">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-gray-600 font-montserrat">
                        <div className="w-1 h-1 bg-orange-500 rounded-full mr-2 mt-1.5 flex-shrink-0" />
                        <span className="text-xs">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indoor Products */}
        <div>
          <div className="text-center mb-8">
            <h3 className="font-cinzel text-3xl font-bold text-gray-900 mb-2">
              {safetyProducts.indoor.title}
            </h3>
            <p className="font-montserrat text-lg text-gray-600">
              {safetyProducts.indoor.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {safetyProducts.indoor.products.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="h-20 bg-gradient-to-r from-purple-400 to-purple-600 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                </div>
                
                <div className="p-5">
                  <h4 className="font-cinzel text-md font-bold text-gray-900 mb-3">
                    {product.name}
                  </h4>
                  
                  <ul className="space-y-1 mb-4">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-gray-600 font-montserrat">
                        <div className="w-1 h-1 bg-purple-500 rounded-full mr-2 mt-1.5 flex-shrink-0" />
                        <span className="text-xs">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 p-8 bg-gradient-to-r from-orange-100 to-purple-100 rounded-2xl shadow-lg">
          <div className="text-center">
            <h3 className="font-cinzel text-2xl font-bold text-gray-900 mb-4">
              Segurança em Primeiro Lugar
            </h3>
            <p className="font-montserrat text-gray-600 mb-6 max-w-2xl mx-auto">
              Cada espaço requer um tipo de cuidado diferente. Nossa equipe especializada 
              ajuda você a escolher o piso ideal considerando o exercício a ser realizado, 
              sempre priorizando segurança e conforto.
            </p>
            <Link 
              href="/contact"
              className="inline-block bg-gradient-to-r from-orange-600 to-orange-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-orange-700 hover:to-orange-800 transition-all duration-300 font-montserrat shadow-lg"
            >
              Consultoria Especializada
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}