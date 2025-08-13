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
    id: 'hardwood',
    name: 'Piso de Madeira',
    description: 'Madeira maciça e engenheirada premium dos principais fabricantes',
    image: '🪵',
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
    id: 'laminate',
    name: 'Piso Laminado',
    description: 'Laminado de alta qualidade com aparência de madeira e pedra verdadeiras',
    image: '📋',
    products: [
      { name: 'Laminado Efeito Madeira', price: 'R$ 30-75/m²', description: 'Padrões e texturas realistas de veios de madeira' },
      { name: 'Laminado Efeito Pedra', price: 'R$ 45-90/m²', description: 'Laminado com aparência de azulejo e pedra' },
      { name: 'Laminado Resistente à Água', price: 'R$ 60-105/m²', description: 'Perfeito para cozinhas e banheiros' },
      { name: 'Grau Comercial', price: 'R$ 45-120/m²', description: 'Laminado pesado para áreas de alto tráfego' }
    ]
  },
  {
    id: 'vinyl',
    name: 'Vinílico e LVT',
    description: 'Piso vinílico de luxo em régua e manta com durabilidade superior',
    image: '💧',
    products: [
      { name: 'Vinílico de Luxo em Régua', price: 'R$ 45-105/m²', description: 'LVP impermeável com aparência realista de madeira' },
      { name: 'Vinílico em Manta', price: 'R$ 30-60/m²', description: 'Piso vinílico contínuo para grandes áreas' },
      { name: 'Vinílico em Placa', price: 'R$ 30-75/m²', description: 'Placas vinílicas individuais em vários padrões' },
      { name: 'LVT Comercial', price: 'R$ 60-120/m²', description: 'Vinílico de luxo pesado para uso comercial' }
    ]
  },
  {
    id: 'carpet',
    name: 'Carpete',
    description: 'Carpetes confortáveis para espaços residenciais e comerciais',
    image: '🏠',
    products: [
      { name: 'Carpete Felpudo', price: 'R$ 30-90/m²', description: 'Carpete macio e luxuoso para quartos e salas' },
      { name: 'Carpete Berber', price: 'R$ 45-105/m²', description: 'Carpete de laço durável em tons neutros' },
      { name: 'Carpete Frieze', price: 'R$ 45-120/m²', description: 'Carpete de fibra torcida que esconde pegadas' },
      { name: 'Carpete Comercial', price: 'R$ 30-75/m²', description: 'Carpete resistente a manchas para escritórios' }
    ]
  }
]

export default function ProductsPage() {
  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nossos Produtos
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trabalhamos com produtos premium de pisos dos fabricantes mais confiáveis do setor, 
            garantindo qualidade e durabilidade para cada projeto.
          </p>
        </div>

        {/* Product Categories */}
        <div className="space-y-12">
          {productCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="text-5xl mr-6">{category.image}</div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h2>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.products.map((product, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-blue-600 font-bold mb-2">{product.price}</p>
                      <p className="text-gray-600 text-sm">{product.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Brands Section */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Marcas Confiáveis que Trabalhamos
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {[
              'Mohawk', 'Shaw', 'Armstrong', 'Pergo', 
              'Bruce', 'Mannington', 'Tarkett', 'Daltile',
              'American Olean', 'Congoleum', 'Karndean', 'Quick-Step'
            ].map((brand, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-100 rounded-lg p-4 h-20 flex items-center justify-center">
                  <span className="text-gray-600 font-semibold">{brand}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Precisa de Ajuda para Escolher?</h2>
          <p className="text-xl mb-6">
            Nossos especialistas em pisos ajudarão você a selecionar os produtos perfeitos para seu espaço e orçamento.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact"
              className="bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
            >
              Agendar Consultoria
            </a>
            <a 
              href="/services"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
            >
              Ver Serviços de Instalação
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}