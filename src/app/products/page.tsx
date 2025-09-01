import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Produtos Premium de Pisos - Madeira, Cerâmica, Laminado e Mais | Pisos Pró',
  description: 'Produtos de qualidade em pisos de marcas confiáveis. Opções em madeira, cerâmica, laminado, vinílico e carpete. Seleção especializada de produtos e serviços de instalação disponíveis.',
  keywords: 'produtos de pisos, piso de madeira, piso cerâmico, piso laminado, piso vinílico, carpete, materiais de pisos, marcas de pisos',
  openGraph: {
    title: 'Produtos Premium de Pisos | Pisos Pró',
    description: 'Descubra nossa ampla seleção de produtos de qualidade em pisos das principais marcas do setor.',
    type: 'website',
  },
}

const productCategories = [
  {
    id: 'madeira',
    name: 'Piso de Madeira',
    description: 'Madeira maciça e engenheirada premium dos principais fabricantes',
    gradient: 'from-wood-400 to-wood-600',
    products: [
      { name: 'Carvalho Maciço', price: 'R$ 120-180/m²', description: 'Carvalho americano clássico em vários tons' },
      { name: 'Maple Engenheirado', price: 'R$ 90-150/m²', description: 'Réguas de maple engenheirado duráveis' },
      { name: 'Madeira de Cerejeira', price: 'R$ 150-225/m²', description: 'Madeira de cerejeira rica com veios naturais' },
      { name: 'Madeiras Exóticas', price: 'R$ 180-300/m²', description: 'Opções em cerejeira brasileira, teca e bambu' }
    ]
  },
  // {
  //   id: 'tile',
  //   name: 'Cerâmica e Pedra',
  //   description: 'Azulejos cerâmicos, porcelanato e pedra natural para todas as aplicações',
  //   image: '🏛️',
  //   products: [
  //     { name: 'Porcelanato', price: 'R$ 45-120/m²', description: 'Porcelanato durável em múltiplos tamanhos e acabamentos' },
  //     { name: 'Cerâmica', price: 'R$ 30-90/m²', description: 'Azulejos cerâmicos clássicos para paredes e pisos' },
  //     { name: 'Pedra Natural', price: 'R$ 120-225/m²', description: 'Opções em mármore, granito e travertino' },
  //     { name: 'Pastilhas', price: 'R$ 150-375/m²', description: 'Padrões de mosaico em vidro, pedra e metal' }
  //   ]
  // },
  {
    id: 'laminado',
    name: 'Piso Laminado',
    description: 'Laminado de alta qualidade com aparência de madeira e pedra verdadeiras',
    gradient: 'from-wood-300 to-wood-500',
    products: [
      { name: 'Laminado Efeito Madeira', price: 'R$ 30-75/m²', description: 'Padrões e texturas realistas de veios de madeira' },
      { name: 'Laminado Efeito Pedra', price: 'R$ 45-90/m²', description: 'Laminado com aparência de azulejo e pedra' },
      { name: 'Laminado Resistente à Água', price: 'R$ 60-105/m²', description: 'Perfeito para cozinhas e banheiros' },
      { name: 'Grau Comercial', price: 'R$ 45-120/m²', description: 'Laminado pesado para áreas de alto tráfego' }
    ]
  },
  {
    id: 'vinílico',
    name: 'Vinílico e LVT',
    description: 'Piso vinílico de luxo em régua e manta com durabilidade superior',
    gradient: 'from-blue-400 to-blue-600',
    products: [
      { name: 'Vinílico de Luxo em Régua', price: 'R$ 45-105/m²', description: 'LVP impermeável com aparência realista de madeira' },
      { name: 'Vinílico em Manta', price: 'R$ 30-60/m²', description: 'Piso vinílico contínuo para grandes áreas' },
      { name: 'Vinílico em Placa', price: 'R$ 30-75/m²', description: 'Placas vinílicas individuais em vários padrões' },
      { name: 'LVT Comercial', price: 'R$ 60-120/m²', description: 'Vinílico de luxo pesado para uso comercial' }
    ]
  },
  {
    id: 'outros',
    name: 'Outros',
    description: 'Soluções especializadas e produtos sob medida',
    gradient: 'from-neutral-400 to-neutral-600',
    products: [
      { name: 'Piso Elevado', price: 'Sob consulta', description: 'Sistema modular para escritórios e data centers' },
      { name: 'Piso Esportivo', price: 'Sob consulta', description: 'Pisos especiais para quadras e academias' },
      { name: 'Revestimento Acústico', price: 'Sob consulta', description: 'Soluções para isolamento acústico' },
      { name: 'Projetos Especiais', price: 'Sob consulta', description: 'Soluções personalizadas para projetos únicos' }
    ]
  }
]

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-cinzel text-5xl md:text-6xl lg:text-7xl mb-6 tracking-wider font-light">
            <span className="text-gradient-gold">
              Nossos Produtos
            </span>
          </h1>
          <p className="font-montserrat text-xl md:text-2xl mb-8 font-light tracking-wide text-white/90 max-w-4xl mx-auto">
            Trabalhamos com produtos premium de pisos dos fabricantes mais confiáveis do setor, 
            garantindo qualidade e durabilidade em cada projeto
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Product Categories */}
        <div className="space-y-16">
          {productCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
              {/* Gradient Header */}
              <div className={`h-32 bg-gradient-to-r ${category.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              
              <div className="p-8 -mt-8 relative">
                <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
                  <h2 className="font-cinzel text-4xl font-bold text-gray-900 mb-4">{category.name}</h2>
                  <p className="font-montserrat text-gray-600 text-lg leading-relaxed">{category.description}</p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.products.map((product, index) => (
                    <div key={index} className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 hover:shadow-lg hover:scale-105 transition-all duration-300 border border-green-100 group">
                      <h3 className="font-cinzel text-xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors">{product.name}</h3>
                      <p className="text-green-600 font-bold text-lg mb-3">{product.price}</p>
                      <p className="font-montserrat text-gray-600 text-sm leading-relaxed">{product.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Brands Section */}
        <div className="mt-20 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl shadow-xl p-12">
          <h2 className="font-cinzel text-4xl font-bold text-center text-gray-900 mb-12">
            Marcas Confiáveis que Trabalhamos
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              'Mohawk', 'Shaw', 'Armstrong', 'Pergo', 
              'Bruce', 'Mannington', 'Tarkett', 'Daltile',
              'American Olean', 'Congoleum', 'Karndean', 'Quick-Step'
            ].map((brand, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white rounded-xl p-6 h-24 flex items-center justify-center shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 border border-green-200">
                  <span className="font-montserrat text-gray-700 font-semibold group-hover:text-green-700 transition-colors">{brand}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-green-900 via-green-800 to-green-700 text-white rounded-2xl shadow-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="relative p-12 text-center">
            <h2 className="font-cinzel text-4xl font-bold mb-6 text-white">
              Precisa de Ajuda para Escolher?
            </h2>
            <p className="font-montserrat text-xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
              Nossos especialistas em pisos ajudarão você a selecionar os produtos perfeitos para seu espaço e orçamento.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="/contact"
                className="bg-gradient-to-r from-gold-400 to-gold-500 text-black px-8 py-4 rounded-xl font-montserrat font-semibold hover:from-gold-300 hover:to-gold-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Agendar Consultoria
              </a>
              <a 
                href="/services"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-montserrat font-semibold hover:bg-white hover:text-green-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Ver Serviços de Instalação
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}