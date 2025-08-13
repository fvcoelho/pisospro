'use client'

import { useState, useEffect } from 'react'

const portfolioProjects = [
  {
    id: 1,
    title: 'Reforma de Cozinha Moderna',
    category: 'tile',
    location: 'Apart. Centro',
    description: 'Reforma completa do piso da cozinha com porcelanato premium com acabamento madeirado.',
    image: '🏠',
    details: {
      size: '23 m²',
      duration: '3 dias',
      materials: 'Porcelanato efeito madeira',
      challenge: 'Trabalho ao redor dos armários existentes'
    }
  },
  {
    id: 2,
    title: 'Instalação de Madeira de Luxo',
    category: 'hardwood',
    location: 'Casa Residencial',
    description: 'Bela instalação de piso de carvalho maciço nas principais áreas sociais.',
    image: '🪵',
    details: {
      size: '110 m²',
      duration: '5 dias',
      materials: 'Carvalho maciço',
      challenge: 'Transições entre múltiplos ambientes'
    }
  },
  {
    id: 3,
    title: 'Piso Comercial para Escritório',
    category: 'vinyl',
    location: 'Centro Empresarial',
    description: 'Instalação durável de LVT para escritório comercial de alto tráfego.',
    image: '🏢',
    details: {
      size: '325 m²',
      duration: '1 semana',
      materials: 'LVT grau comercial',
      challenge: 'Instalação nos finais de semana'
    }
  },
  {
    id: 4,
    title: 'Transformação de Banheiro',
    category: 'tile',
    location: 'Suíte Master',
    description: 'Elegante instalação de mármore com borda decorativa de mosaico personalizada.',
    image: '🛁',
    details: {
      size: '11 m²',
      duration: '4 dias',
      materials: 'Mármore Carrara com borda de mosaico',
      challenge: 'Impermeabilização e drenagem'
    }
  },
  {
    id: 5,
    title: 'Sala Familiar no Subsolo',
    category: 'laminate',
    location: 'Porão Residencial',
    description: 'Piso laminado resistente à umidade perfeito para instalação subterrânea.',
    image: '🏠',
    details: {
      size: '55 m²',
      duration: '2 dias',
      materials: 'Laminado resistente à água',
      challenge: 'Mitigação da umidade'
    }
  },
  {
    id: 6,
    title: 'Área de Jantar do Restaurante',
    category: 'hardwood',
    location: 'Edifício Histórico',
    description: 'Restauração e instalação de madeira de demolição em restaurante histórico.',
    image: '🍽️',
    details: {
      size: '74 m²',
      duration: '1 semana',
      materials: 'Pinho de demolição',
      challenge: 'Preservar o caráter histórico'
    }
  },
  {
    id: 7,
    title: 'Lobby de Hotel de Luxo',
    category: 'tile',
    location: 'Hotel Centro',
    description: 'Instalação de pedra natural de alto padrão com design de padrões intrincados.',
    image: '🏨',
    details: {
      size: '140 m²',
      duration: '2 semanas',
      materials: 'Travertino e mármore',
      challenge: 'Padrões geométricos complexos'
    }
  },
  {
    id: 8,
    title: 'Carpete Aconchegante para Quarto',
    category: 'carpet',
    location: 'Casa Familiar',
    description: 'Instalação de carpete felpudo para máximo conforto e redução de ruído.',
    image: '🛏️',
    details: {
      size: '28 m²',
      duration: '1 dia',
      materials: 'Carpete felpudo premium',
      challenge: 'Carpete de escada incluído'
    }
  }
]

const categories = [
  { id: 'all', name: 'Todos os Projetos', icon: '🏗️' },
  { id: 'hardwood', name: 'Madeira', icon: '🪵' },
  { id: 'tile', name: 'Cerâmica e Pedra', icon: '🏛️' },
  { id: 'vinyl', name: 'Vinílico e LVT', icon: '💧' },
  { id: 'laminate', name: 'Laminado', icon: '📋' },
  { id: 'carpet', name: 'Carpete', icon: '🏠' }
]

interface GalleryImage {
  id: number
  title: string
  description: string | null
  location: string | null
  imageUrl: string
  category: string | null
  createdAt: string
}

export default function PortfolioClient() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)

  const fetchGalleryImages = async () => {
    try {
      const response = await fetch(`/api/gallery?category=${selectedCategory}`)
      const data = await response.json()
      setGalleryImages(data.images || [])
    } catch (error) {
      console.error('Error fetching gallery images:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGalleryImages()
  }, [selectedCategory])

  const allProjects = [
    ...portfolioProjects.map(project => ({ ...project, isGalleryImage: false })),
    ...galleryImages.map(img => ({
      id: `gallery-${img.id}`,
      title: img.title,
      category: img.category || 'other',
      location: img.location || 'Localização não informada',
      description: img.description || 'Sem descrição',
      image: img.imageUrl,
      isGalleryImage: true,
      details: {
        size: 'N/A',
        duration: 'N/A',
        materials: 'N/A',
        challenge: 'N/A'
      }
    }))
  ]

  const filteredProjects = selectedCategory === 'all' 
    ? allProjects 
    : allProjects.filter(project => project.category === selectedCategory)

  if (loading) {
    return (
      <div className="py-12 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-2xl mb-4">Carregando galeria...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nosso Portfólio
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore nossos projetos recentes e veja o artesanato de qualidade que fez da 
            PisosPró a escolha confiável para soluções em pisos.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                {project.isGalleryImage ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-6xl">{project.image}</div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-blue-600 font-semibold text-sm mb-2">{project.location}</p>
                <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                <div className="flex justify-between items-center">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {categories.find(cat => cat.id === project.category)?.name}
                  </span>
                  <span className="text-blue-600 text-sm font-medium">Ver Detalhes →</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Estatísticas dos Projetos
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">5,000+</div>
              <div className="text-gray-600">Projetos Concluídos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">200k+</div>
              <div className="text-gray-600">Metros Quadrados Instalados</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600">Satisfação do Cliente</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
              <div className="text-gray-600">Anos de Experiência</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para o Piso dos seus Sonhos?</h2>
          <p className="text-xl mb-6">
            Deixe-nos transformar seu espaço com a mesma qualidade e atenção aos detalhes mostrados em nosso portfólio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact"
              className="bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
            >
              Iniciar seu Projeto
            </a>
            <a 
              href="/services"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
            >
              Ver Serviços
            </a>
          </div>
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-3xl font-bold text-gray-900">{selectedProject.title}</h2>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="h-64 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mb-6">
                  {selectedProject.isGalleryImage ? (
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-8xl">{selectedProject.image}</div>
                  )}
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Detalhes do Projeto</h3>
                    <p className="text-gray-600 mb-4">{selectedProject.description}</p>
                    <p className="text-blue-600 font-semibold">Localização: {selectedProject.location}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Especificações</h3>
                    <div className="space-y-2 text-sm">
                      <div><strong>Tamanho:</strong> {selectedProject.details.size}</div>
                      <div><strong>Duração:</strong> {selectedProject.details.duration}</div>
                      <div><strong>Materiais:</strong> {selectedProject.details.materials}</div>
                      <div><strong>Desafio:</strong> {selectedProject.details.challenge}</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <a 
                    href="/contact"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex-1 text-center"
                  >
                    Iniciar Projeto Semelhante
                  </a>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}