'use client'

import { useState, useEffect } from 'react'
import ProjectMediaGallery from '@/components/ProjectMediaGallery'

const portfolioProjects = [
  {
    id: 1,
    title: 'Reforma de Cozinha Moderna',
    category: 'tile',
    location: 'Apart. Centro',
    description: 'Reforma completa do piso da cozinha com porcelanato premium com acabamento madeirado.',
    image: null, // Placeholder for gradient background
    gradient: 'from-neutral-400 to-neutral-600',
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
    image: null, // Placeholder for gradient background
    gradient: 'from-wood-400 to-wood-600',
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
    image: null, // Placeholder for gradient background
    gradient: 'from-blue-400 to-blue-600',
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
    image: null, // Placeholder for gradient background
    gradient: 'from-gold-400 to-gold-600',
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
    image: null, // Placeholder for gradient background
    gradient: 'from-wood-300 to-wood-500',
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
    image: null, // Placeholder for gradient background
    gradient: 'from-wood-500 to-wood-700',
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
    image: null, // Placeholder for gradient background
    gradient: 'from-gold-300 to-gold-500',
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
    image: null, // Placeholder for gradient background
    gradient: 'from-neutral-300 to-neutral-500',
    details: {
      size: '28 m²',
      duration: '1 dia',
      materials: 'Carpete felpudo premium',
      challenge: 'Carpete de escada incluído'
    }
  }
]

const categories = [
  { id: 'all', name: 'Todos os Projetos', gradient: 'from-green-400 to-green-600' },
  { id: 'hardwood', name: 'Madeira', gradient: 'from-wood-400 to-wood-600' },
  //{ id: 'tile', name: 'Cerâmica e Pedra', gradient: 'from-neutral-400 to-neutral-600' },
  { id: 'vinyl', name: 'Vinílico e LVT', gradient: 'from-blue-400 to-blue-600' },
  { id: 'laminate', name: 'Laminado', gradient: 'from-wood-300 to-wood-500' },
  { id: 'carpet', name: 'Carpete', gradient: 'from-neutral-300 to-neutral-500' }
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

interface ProjectMedia {
  id: number
  title: string
  description: string | null
  mediaUrl: string
  mediaType: 'IMAGE' | 'VIDEO'
  displayOrder: number
  fileSize: number | null
  duration: number | null
  isCover: boolean
}

export default function PortfolioClient() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [projectMediaMap, setProjectMediaMap] = useState<Record<number, ProjectMedia[]>>({})
  const [loading, setLoading] = useState(true)

  const fetchGalleryImages = async () => {
    try {
      const response = await fetch(`/api/gallery?category=${selectedCategory}`)
      const data = await response.json()
      setGalleryImages(data.images || [])
    } catch (error) {
      console.error('Error fetching gallery images:', error)
    }
  }

  const fetchProjectMedia = async () => {
    const mediaMap: Record<number, ProjectMedia[]> = {}
    
    try {
      // Fetch media for each portfolio project
      const mediaPromises = portfolioProjects.map(async (project) => {
        try {
          const response = await fetch(`/api/projects/${project.id}/media`)
          const data = await response.json()
          if (data.success && data.media) {
            mediaMap[project.id] = data.media
          }
        } catch (error) {
          console.error(`Error fetching media for project ${project.id}:`, error)
          mediaMap[project.id] = []
        }
      })

      await Promise.all(mediaPromises)
      setProjectMediaMap(mediaMap)
    } catch (error) {
      console.error('Error fetching project media:', error)
    }
  }

  const fetchAllData = async () => {
    setLoading(true)
    try {
      await Promise.all([
        fetchGalleryImages(),
        fetchProjectMedia()
      ])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (selectedCategory === 'all') {
      fetchAllData()
    } else {
      fetchGalleryImages().then(() => setLoading(false))
    }
  }, [selectedCategory])

  const allProjects = [
    ...portfolioProjects.map(project => {
      const projectMedia = projectMediaMap[project.id] || []
      // Prioritize cover image, then any image
      const coverImage = projectMedia.find(m => m.isCover)?.mediaUrl
      const primaryImage = coverImage || projectMedia.find(m => m.mediaType === 'IMAGE')?.mediaUrl
      return {
        ...project,
        isGalleryImage: false,
        projectMedia,
        image: primaryImage || project.image,
        hasMedia: projectMedia.length > 0
      }
    }),
    ...galleryImages.map(img => ({
      id: `gallery-${img.id}`,
      title: img.title,
      category: img.category || 'other',
      location: img.location || 'Localização não informada',
      description: img.description || 'Sem descrição',
      image: img.imageUrl,
      gradient: 'from-green-400 to-green-600', // Default gradient for gallery images
      isGalleryImage: true,
      projectMedia: [],
      hasMedia: false,
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <div className="font-montserrat text-2xl text-gray-700 mb-2">Carregando Portfólio</div>
          <div className="font-montserrat text-gray-500">Preparando nossos melhores projetos...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-cinzel text-5xl md:text-6xl lg:text-7xl mb-6 tracking-wider font-light">
            <span className="text-gradient-gold">
              Nosso Portfólio
            </span>
          </h1>
          <p className="font-montserrat text-xl md:text-2xl mb-8 font-light tracking-wide text-white/90 max-w-4xl mx-auto">
            Explore nossos projetos recentes e veja o artesanato de qualidade que fez da 
            Pisos Pró a escolha confiável para soluções em pisos premium
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`relative overflow-hidden px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category.id
                  ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg`
                  : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-700 shadow-md hover:shadow-lg'
              }`}
            >
              <span className="relative z-10">{category.name}</span>
              {selectedCategory === category.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
              )}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
              onClick={() => setSelectedProject(project)}
            >
              <div className={`h-56 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}>
                {(project.hasMedia && project.image) || (project.isGalleryImage && project.image) ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                
                {/* Media count indicator */}
                {project.hasMedia && (
                  <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-sm font-medium">
                    {project.projectMedia.length} mídias
                  </div>
                )}
                
                {/* Media type indicators */}
                {project.hasMedia && (
                  <div className="absolute top-4 left-4 flex gap-2">
                    {project.projectMedia.some(m => m.mediaType === 'IMAGE') && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                        📷 Fotos
                      </span>
                    )}
                    {project.projectMedia.some(m => m.mediaType === 'VIDEO') && (
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">
                        🎥 Vídeos
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-cinzel text-xl font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                  {project.title}
                </h3>
                <p className="text-green-600 font-semibold text-sm mb-3">{project.location}</p>
                <p className="text-gray-600 text-sm mb-6 line-clamp-3">{project.description}</p>
                <div className="flex justify-between items-center">
                  <span className="inline-block bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">
                    {categories.find(cat => cat.id === project.category)?.name}
                  </span>
                  <span className="text-green-600 text-sm font-medium group-hover:text-green-700">
                    Ver Detalhes →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl shadow-xl p-12 mb-16">
          <h2 className="font-cinzel text-4xl font-bold text-center text-gray-900 mb-12">
            Nossa Experiência em Números
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                1,000+
              </div>
              <div className="font-montserrat text-gray-700 font-medium">Projetos Concluídos</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl font-bold bg-gradient-to-r from-wood-500 to-wood-700 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                200k+
              </div>
              <div className="font-montserrat text-gray-700 font-medium">Metros Quadrados</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl font-bold bg-gradient-to-r from-gold-500 to-gold-700 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                98%
              </div>
              <div className="font-montserrat text-gray-700 font-medium">Satisfação do Cliente</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                15+
              </div>
              <div className="font-montserrat text-gray-700 font-medium">Anos de Experiência</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-900 via-green-800 to-green-700 text-white rounded-2xl p-12 text-center shadow-2xl">
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient-gold">
              Pronto para Transformar seu Espaço?
            </span>
          </h2>
          <p className="font-montserrat text-xl md:text-2xl mb-8 font-light text-white/90 max-w-3xl mx-auto">
            Deixe-nos criar o projeto dos seus sonhos com a mesma excelência e dedicação 
            demonstradas em nosso portfólio
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="/contact"
              className="group relative px-12 py-4 overflow-hidden bg-green-600 hover:bg-green-700 transition-colors duration-300 rounded font-montserrat font-semibold text-lg"
            >
              <span className="relative z-10">Iniciar seu Projeto</span>
            </a>
            <a 
              href="/services"
              className="group relative px-12 py-4 border-2 border-white text-white hover:bg-white hover:text-green-900 transition-all duration-300 rounded font-montserrat font-semibold text-lg"
            >
              <span className="relative z-10">Explorar Serviços</span>
            </a>
          </div>
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl max-w-6xl w-full max-h-screen overflow-y-auto shadow-2xl">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="font-cinzel text-4xl font-bold text-gray-900">{selectedProject.title}</h2>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="text-gray-400 hover:text-gray-600 text-3xl transition-colors p-2"
                  >
                    ✕
                  </button>
                </div>
                
                {/* Project Media Gallery */}
                {selectedProject.hasMedia && selectedProject.projectMedia.length > 0 ? (
                  <div className="mb-8">
                    <ProjectMediaGallery media={selectedProject.projectMedia} />
                  </div>
                ) : selectedProject.isGalleryImage && selectedProject.image ? (
                  <div className="mb-8">
                    <div className="aspect-video relative overflow-hidden rounded-2xl">
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ) : (
                  <div className={`h-72 bg-gradient-to-br ${selectedProject.gradient} rounded-2xl flex items-center justify-center mb-8 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                    <div className="text-center text-white">
                      <div className="text-6xl mb-4">🏗️</div>
                      <p className="font-montserrat text-xl">Projeto em Desenvolvimento</p>
                      <p className="font-montserrat text-sm opacity-75">Mídias serão adicionadas em breve</p>
                    </div>
                  </div>
                )}
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="font-cinzel text-xl font-bold text-gray-900 mb-4">Detalhes do Projeto</h3>
                    <p className="font-montserrat text-gray-600 mb-4 leading-relaxed">{selectedProject.description}</p>
                    <p className="text-green-600 font-semibold">📍 {selectedProject.location}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-cinzel text-xl font-bold text-gray-900 mb-4">Especificações</h3>
                    <div className="space-y-3 font-montserrat">
                      <div className="flex justify-between">
                        <strong className="text-gray-700">Tamanho:</strong>
                        <span className="text-gray-600">{selectedProject.details.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <strong className="text-gray-700">Duração:</strong>
                        <span className="text-gray-600">{selectedProject.details.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <strong className="text-gray-700">Materiais:</strong>
                        <span className="text-gray-600">{selectedProject.details.materials}</span>
                      </div>
                      <div className="flex justify-between">
                        <strong className="text-gray-700">Desafio:</strong>
                        <span className="text-gray-600">{selectedProject.details.challenge}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <a 
                    href="/contact"
                    className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 flex-1 text-center font-montserrat shadow-lg"
                  >
                    Iniciar Projeto Semelhante
                  </a>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors font-montserrat"
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