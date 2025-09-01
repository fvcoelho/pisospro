'use client'

import { useEffect, useState, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import Hero from '@/components/Hero'
import ServicesOverview from '@/components/ServicesOverview'
import ProductsShowcase from '@/components/ProductsShowcase'
import VinylSection from '@/components/VinylSection'
import SpecialtySection from '@/components/SpecialtySection'
import FinishingsSection from '@/components/FinishingsSection'
import SafetyFlooringSection from '@/components/SafetyFlooringSection'
import Link from 'next/link'
import Image from 'next/image'

// Services data from services page
const services = [
  {
    id: 'madeira',
    title: 'Instalação de Pisos de Madeira',
    description: 'Instalação premium de piso de madeira com artesanato especializado. Trabalhamos com todos os tipos de madeira incluindo carvalho, maple, cerejeira e espécies exóticas.',
    features: ['Acabamento no Local e Pré-acabado', 'Madeira Maciça e Engenheirada', 'Tingimento Personalizado', 'Lixamento Profissional'],
    price: 'A partir de R$ 120/m²',
    gradient: 'from-wood-400 to-wood-600',
    popular: true
  },
  {
    id: 'laminado',
    title: 'Piso Laminado',
    description: 'Piso laminado acessível e durável que imita a aparência da madeira e cerâmica por uma fração do custo.',
    features: ['Instalação Click', 'Opções Resistentes à Água', 'Múltiplos Acabamentos', 'Instalação Rápida'],
    price: 'A partir de R$ 50/m²',
    gradient: 'from-wood-300 to-wood-500',
    popular: false
  },
  {
    id: 'vinílico',
    title: 'Vinílico e LVT',
    description: 'Piso vinílico de luxo em régua e manta perfeito para áreas de alta umidade e tráfego intenso.',
    features: ["100% À Prova d'Água", 'Vinílico de Luxo em Régua', 'Vinílico em Manta', 'Grau Comercial'],
    price: 'A partir de R$ 65/m²',
    gradient: 'from-blue-400 to-blue-600',
    popular: true
  },
  {
    id: 'outros',
    title: 'Outros Serviços',
    description: 'Soluções especializadas em pisos para atender suas necessidades específicas.',
    features: ['Consulta Personalizada', 'Projetos Especiais', 'Soluções Sob Medida', 'Acabamento Premium'],
    price: 'Sob consulta',
    gradient: 'from-neutral-400 to-neutral-600',
    popular: false
  },
  {
    id: 'reacabamentoing',
    title: 'Restauração de Pisos',
    description: 'Restaure a beleza dos seus pisos de madeira existentes com lixamento, tingimento e acabamento profissionais.',
    features: ['Lixamento Completo', 'Tingimento Personalizado', 'Acabamento Poliuretano', 'Processo Sem Poeira'],
    price: 'A partir de R$ 45/m²',
    gradient: 'from-gold-400 to-gold-600',
    popular: true
  }
]

// Product categories data from products page
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
      { name: 'Vinílico de Luxo em Régua', price: 'R$ 45-105/m²', description: 'LVP impermeável com aparência realista de madeira' },
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

// Portfolio projects data (simplified)
const portfolioProjects = [
  {
    id: 1,
    title: 'Residência Moderna',
    type: 'Residencial',
    flooring: 'Piso de Madeira',
    area: '250m²',
    gradient: 'from-wood-400 to-wood-600'
  },
  {
    id: 2,
    title: 'Escritório Corporativo',
    type: 'Comercial',
    flooring: 'Vinílico LVT',
    area: '500m²',
    gradient: 'from-blue-400 to-blue-600'
  },
  {
    id: 3,
    title: 'Loja de Varejo',
    type: 'Comercial',
    flooring: 'Laminado',
    area: '180m²',
    gradient: 'from-wood-300 to-wood-500'
  },
  {
    id: 4,
    title: 'Casa de Praia',
    type: 'Residencial',
    flooring: 'Madeira Tratada',
    area: '320m²',
    gradient: 'from-gold-400 to-gold-600'
  }
]

// Stats data from about page
const stats = [
  { number: '15+', label: 'Anos de Mercado' },
  { number: '5000+', label: 'Projetos Concluídos' },
  { number: '98%', label: 'Satisfação do Cliente' },
  { number: '50+', label: 'Membros da Equipe' }
]

export default function Home() {
  const [visibleSections, setVisibleSections] = useState<number[]>([0])
  const [isLoading, setIsLoading] = useState(false)
  const sectionsRef = useRef<(HTMLElement | null)[]>([])
  
  // Define all sections
  const sections = [
    { id: 'hero', component: Hero },
    { id: 'portfolio', component: PortfolioSection },
    { id: 'services-overview', component: ServicesOverview },
    { id: 'products-showcase', component: ProductsShowcase },
    { id: 'vinyl-section', component: VinylSection },
    { id: 'specialty-section', component: SpecialtySection },
    { id: 'finishings-section', component: FinishingsSection },
    { id: 'safety-flooring', component: SafetyFlooringSection },
    
    { id: 'about', component: AboutSection },
    //{ id: 'contact', component: ContactSection }
  ]

  // Intersection observer for the last visible section
  const { ref: lastSectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  })

  // Load more sections when reaching the bottom
  useEffect(() => {
    if (inView && !isLoading && visibleSections.length < sections.length) {
      setIsLoading(true)
      setTimeout(() => {
        setVisibleSections(prev => [...prev, prev.length])
        setIsLoading(false)
      }, 300) // Small delay for smooth loading
    }
  }, [inView, isLoading, visibleSections.length, sections.length])

  // Smooth scroll to section when clicking navigation
  const scrollToSection = (sectionId: string) => {
    const sectionIndex = sections.findIndex(s => s.id === sectionId)
    if (sectionIndex !== -1) {
      // Make sure section is visible
      if (!visibleSections.includes(sectionIndex)) {
        const newSections = []
        for (let i = 0; i <= sectionIndex; i++) {
          newSections.push(i)
        }
        setVisibleSections(newSections)
      }
      
      // Scroll to section after a brief delay
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }

  // Add scroll to section functionality to navbar
  useEffect(() => {
    const handleNavClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')
      if (link && link.getAttribute('href')?.startsWith('#')) {
        e.preventDefault()
        const sectionId = link.getAttribute('href')?.slice(1)
        if (sectionId) {
          scrollToSection(sectionId)
        }
      }
    }

    document.addEventListener('click', handleNavClick)
    return () => document.removeEventListener('click', handleNavClick)
  }, [])

  return (
    <div className="relative">
      {/* Render visible sections */}
      {visibleSections.map((sectionIndex, idx) => {
        const Section = sections[sectionIndex].component
        const isLast = idx === visibleSections.length - 1
        return (
          <section
            key={sections[sectionIndex].id}
            id={sections[sectionIndex].id}
            ref={isLast ? lastSectionRef : null}
            className="scroll-mt-20"
          >
            <Section />
          </section>
        )
      })}
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      )}
      
      {/* End of content message */}
      {/* {visibleSections.length === sections.length && (
        <div className="text-center py-12 text-gray-500">
          <p className="font-montserrat">Você chegou ao fim do conteúdo</p>
        </div>
      )} */}
    </div>
  )
}

// Services Section Component
function ServicesSection() {
  return (
    <div className="py-20 bg-gradient-to-br from-green-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-gradient-gold">Nossos Serviços</span>
          </h2>
          <p className="font-montserrat text-xl text-gray-600 max-w-3xl mx-auto">
            Serviços especializados de instalação e reforma de pisos com mais de 15 anos de experiência
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-2xl shadow-xl overflow-hidden relative group hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              {service.popular && (
                <div className="absolute top-6 right-6 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg z-10">
                  Mais Popular
                </div>
              )}
              
              <div className={`h-24 bg-gradient-to-r ${service.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              
              <div className="p-8 -mt-6 relative">
                <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
                  <div className="mb-4">
                    <h3 className="font-cinzel text-3xl font-bold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-green-600 font-bold text-xl">{service.price}</p>
                  </div>
                </div>
                
                <p className="font-montserrat text-gray-600 mb-8 leading-relaxed">{service.description}</p>
                
                <div className="mb-8">
                  <h4 className="font-cinzel text-lg font-bold text-gray-900 mb-4">O que está incluído:</h4>
                  <ul className="space-y-3">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600 font-montserrat">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Link 
                  href="/contact"
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 text-center font-montserrat shadow-lg group-hover:shadow-xl block"
                >
                  Solicitar Orçamento
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Products Section Component
function ProductsSection() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-gradient-gold">Nossos Produtos</span>
          </h2>
          <p className="font-montserrat text-xl text-gray-600 max-w-3xl mx-auto">
            Trabalhamos com produtos premium de pisos dos fabricantes mais confiáveis do setor
          </p>
        </div>

        <div className="space-y-16">
          {productCategories.slice(0, 3).map((category) => (
            <div key={category.id} className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <div className={`h-32 bg-gradient-to-r ${category.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              
              <div className="p-8 -mt-8 relative">
                <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
                  <h3 className="font-cinzel text-4xl font-bold text-gray-900 mb-4">{category.name}</h3>
                  <p className="font-montserrat text-gray-600 text-lg leading-relaxed">{category.description}</p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.products.map((product, index) => (
                    <div key={index} className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 hover:shadow-lg hover:scale-105 transition-all duration-300 border border-green-100 group">
                      <h4 className="font-cinzel text-xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors">{product.name}</h4>
                      <p className="text-green-600 font-bold text-lg mb-3">{product.price}</p>
                      <p className="font-montserrat text-gray-600 text-sm leading-relaxed">{product.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link 
            href="/products"
            className="inline-block bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 font-montserrat shadow-lg"
          >
            Ver Todos os Produtos
          </Link>
        </div>
      </div>
    </div>
  )
}

// Portfolio Section Component
function PortfolioSection() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [projects, setProjects] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        // Fetch categories
        const catResponse = await fetch('/api/categories')
        const catData = await catResponse.json()
        setCategories(catData.categories || [])
        
        // Fetch projects
        const projResponse = await fetch('/api/projects?status=active')
        const projData = await projResponse.json()
        setProjects(projData.projects || [])
      } catch (error) {
        console.error('Error loading portfolio data:', error)
      }
      setLoading(false)
    }
    loadData()
  }, [])

  // Filter projects
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => {
        const selectedCat = categories.find(cat => cat.slug === selectedCategory)
        return project.category === selectedCategory || 
               project.category === selectedCat?.name ||
               project.category === selectedCat?.slug
      })

  const categoryGradients = [
    'from-wood-400 to-wood-600',
    'from-gold-400 to-gold-600', 
    'from-blue-400 to-blue-600',
    'from-wood-300 to-wood-500',
    'from-neutral-300 to-neutral-500'
  ]

  const getCategoryGradient = (category: string | null) => {
    switch (category) {
      case 'madeira': return 'from-wood-400 to-wood-600'
      case 'vinílico': return 'from-blue-400 to-blue-600'
      case 'laminado': return 'from-wood-300 to-wood-500'
      case 'acabamento': return 'from-gold-400 to-gold-600'
      case 'outros': return 'from-neutral-300 to-neutral-500'
      default: return 'from-green-400 to-green-600'
    }
  }

  if (loading) {
    return (
      <div className="py-20 bg-gradient-to-br from-green-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="text-gradient-gold">Nosso Portfólio</span>
            </h2>
            <p className="font-montserrat text-xl text-gray-600 max-w-3xl mx-auto">
              Carregando nossos projetos...
            </p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-20 bg-gradient-to-br from-green-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-gradient-gold">Nosso Portfólio</span>
          </h2>
          <p className="font-montserrat text-xl text-gray-600 max-w-3xl mx-auto">
            Explore nossos projetos recentes e veja o artesanato de qualidade que fez da 
            Pisos Pró a escolha confiável para soluções em pisos premium
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`relative overflow-hidden px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
              selectedCategory === 'all'
                ? `bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg`
                : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-700 shadow-md hover:shadow-lg'
            }`}
          >
            <span className="relative z-10">Todos os Projetos</span>
          </button>
          
          {categories.map((category, index) => {
            const gradient = categoryGradients[index % categoryGradients.length]
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className={`relative overflow-hidden px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.slug
                    ? `bg-gradient-to-r ${gradient} text-white shadow-lg`
                    : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-700 shadow-md hover:shadow-lg'
                }`}
              >
                <span className="relative z-10">{category.name}</span>
              </button>
            )
          })}
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredProjects.slice(0, 6).map((project) => {
            const images = project.galleryImages?.filter((img: any) => img.isActive) || []
            const gradient = getCategoryGradient(project.category)
            
            return (
              <div 
                key={project.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
                onClick={() => setSelectedProject(project)}
              >
                <div className={`h-56 bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden`}>
                  {images.length > 0 ? (
                    <div className="relative w-full h-full">
                      {images[0]?.fileType === 'video' ? (
                        <video
                          src={images[0]?.imageUrl}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                        />
                      ) : (
                        <img
                          src={images[0]?.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      )}
                      {images.length > 1 && (
                        <div className="absolute top-3 right-3 bg-black/60 text-white text-sm px-2 py-1 rounded">
                          +{images.length - 1} fotos
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center text-white/70">
                      <div className="text-center">
                        <div className="text-6xl mb-2">🏗️</div>
                        <p className="text-lg">Imagens em breve</p>
                      </div>
                    </div>
                  )}
                  
                  {project.category && (
                    <div className="absolute bottom-3 left-3">
                      <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-montserrat">
                        {project.category}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="font-cinzel text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                  {project.description && (
                    <p className="font-montserrat text-gray-600 text-sm mb-2 line-clamp-2">{project.description}</p>
                  )}
                  {project.location && (
                    <p className="font-montserrat text-gray-500 text-sm">📍 {project.location}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Stats Section */}
        {/* <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl shadow-xl p-12 mb-12">
          <h3 className="font-cinzel text-3xl font-bold text-center text-gray-900 mb-8">
            Nossa Experiência em Números
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                5,000+
              </div>
              <div className="font-montserrat text-gray-700 font-medium">Projetos Concluídos</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-bold bg-gradient-to-r from-wood-500 to-wood-700 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                200k+
              </div>
              <div className="font-montserrat text-gray-700 font-medium">Metros Quadrados</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-bold bg-gradient-to-r from-gold-500 to-gold-700 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                98%
              </div>
              <div className="font-montserrat text-gray-700 font-medium">Satisfação do Cliente</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                15+
              </div>
              <div className="font-montserrat text-gray-700 font-medium">Anos de Experiência</div>
            </div>
          </div>
        </div> */}

        <div className="text-center">
          <Link 
            href="/portfolio"
            className="inline-block bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 font-montserrat shadow-lg"
          >
            Ver Portfólio Completo
          </Link>
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <ProjectModal 
            project={selectedProject}
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </div>
    </div>
  )
}

// Project Modal Component
function ProjectModal({ project, onClose }: { project: any; onClose: () => void }) {
  const images = project.galleryImages?.filter((img: any) => img.isActive) || []
  const [currentIndex, setCurrentIndex] = useState(0)
  const modalVideoRef = useRef<HTMLVideoElement>(null)
  
  const getCategoryGradient = (category: string | null) => {
    switch (category) {
      case 'madeira': return 'from-wood-400 to-wood-600'
      case 'vinílico': return 'from-blue-400 to-blue-600'
      case 'laminado': return 'from-wood-300 to-wood-500'
      case 'acabamento': return 'from-gold-400 to-gold-600'
      case 'outros': return 'from-neutral-300 to-neutral-500'
      default: return 'from-green-400 to-green-600'
    }
  }

  const gradient = getCategoryGradient(project.category)

  // Handle video autoplay when modal opens or index changes
  useEffect(() => {
    if (modalVideoRef.current && images[currentIndex]?.fileType === 'video') {
      const video = modalVideoRef.current
      video.muted = true
      video.currentTime = 0
      
      const playVideo = async () => {
        try {
          await video.play()
        } catch (error) {
          console.log('Video autoplay failed, will try on user interaction:', error)
        }
      }
      
      if (video.readyState >= 3) {
        playVideo()
      } else {
        video.addEventListener('loadeddata', playVideo, { once: true })
      }
    }
  }, [currentIndex, images])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft' && images.length > 1) {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
      } else if (e.key === 'ArrowRight' && images.length > 1) {
        setCurrentIndex((prev) => (prev + 1) % images.length)
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [onClose, images.length])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <h2 className="font-cinzel text-3xl font-bold text-gray-900">{project.title}</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-3xl transition-colors p-2"
            >
              ✕
            </button>
          </div>
          
          {/* Image Carousel */}
          <div className={`h-96 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mb-8 relative overflow-hidden`}>
            {images.length > 0 ? (
              <div className="relative w-full h-full">
                {images[currentIndex]?.fileType === 'video' ? (
                  <video
                    ref={modalVideoRef}
                    src={images[currentIndex]?.imageUrl}
                    controls
                    autoPlay
                    muted
                    loop
                    className="w-full h-full object-cover rounded-2xl"
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <img
                    src={images[currentIndex]?.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                )}
                
                {images.length > 1 && (
                  <>
                    <button
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-300"
                      onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
                    >
                      ←
                    </button>
                    
                    <button
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-300"
                      onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
                    >
                      →
                    </button>

                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {images.map((_: any, index: number) => (
                        <button
                          key={index}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentIndex ? 'bg-white w-8' : 'bg-white/50'
                          }`}
                          onClick={() => setCurrentIndex(index)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center text-white/70">
                <div className="text-center">
                  <div className="text-8xl mb-4">🏗️</div>
                  <p className="text-xl">Imagens em breve</p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4 mb-6">
            {project.description && (
              <p className="font-montserrat text-gray-600 leading-relaxed">{project.description}</p>
            )}
            <div className="grid grid-cols-2 gap-4 text-sm">
              {project.location && (
                <div>
                  <span className="font-semibold text-gray-700">Local:</span>
                  <span className="ml-2 text-gray-600">{project.location}</span>
                </div>
              )}
              {/* {project.category && (
                <div>
                  <span className="font-semibold text-gray-700">Categoria:</span>
                  <span className="ml-2 text-gray-600">{project.category}</span>
                </div>
              )} */}
              {project.completedAt && (
                <div>
                  <span className="font-semibold text-gray-700">Concluído em:</span>
                  <span className="ml-2 text-gray-600">
                    {new Date(project.completedAt).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              )}
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
              onClick={onClose}
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors font-montserrat"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// About Section Component
function AboutSection() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-gradient-gold">Sobre a Pisos Pró</span>
          </h2>
          <p className="font-montserrat text-xl text-gray-600 max-w-3xl mx-auto">
            Há mais de 15 anos transformando casas e empresas com soluções premium em pisos
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gradient-to-br from-green-50 to-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl hover:scale-105 transition-all duration-300 border border-green-100">
              <div className="font-cinzel text-4xl font-bold text-green-600 mb-3">{stat.number}</div>
              <div className="font-montserrat text-gray-700 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Company Story */}
        <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-xl p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-cinzel text-3xl font-bold text-gray-900 mb-6">Nossa História</h3>
              <div className="space-y-4 text-gray-600">
                <p className="font-montserrat text-lg leading-relaxed">
                  Fundada em 2008, a Pisos Pró começou como uma pequena empresa familiar com uma missão simples: 
                  fornecer instalação de pisos da mais alta qualidade e atendimento ao cliente na região.
                </p>
                <p className="font-montserrat text-lg leading-relaxed">
                  Hoje, somos reconhecidos como a principal empresa de pisos da nossa região, conhecida pela 
                  atenção aos detalhes, uso de materiais premium e compromisso em superar as expectativas dos 
                  clientes em cada projeto.
                </p>
              </div>
            </div>
            <div>
              <div className="bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl p-8 shadow-lg text-white">
                <h4 className="font-cinzel text-2xl font-bold mb-4">Por que nos escolher?</h4>
                <ul className="space-y-3 font-montserrat">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-white rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span>Mais de 15 anos de experiência comprovada</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-white rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span>Equipe de profissionais certificados</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-white rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span>Garantia de qualidade em todos os projetos</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-white rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span>Atendimento personalizado do início ao fim</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link 
            href="/about"
            className="inline-block bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 font-montserrat shadow-lg"
          >
            Conheça Nossa Equipe
          </Link>
        </div>
      </div>
    </div>
  )
}

// Contact Section Component
function ContactSection() {
  return (
    <div className="py-20 bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-gold">Pronto para Transformar seu Espaço?</span>
          </h2>
          <p className="font-montserrat text-xl text-white/90 max-w-3xl mx-auto">
            Entre em contato hoje para um orçamento gratuito e descubra como podemos ajudar em seu projeto
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
              <div className="bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl p-4 mb-4 mx-auto w-16 h-16 flex items-center justify-center">
                <div className="w-8 h-8 bg-white/20 rounded-full" />
              </div>
              <h3 className="font-cinzel text-xl font-bold mb-2">Telefone</h3>
              <p className="font-montserrat text-white/90">(11) 3113-7934</p>
              <p className="font-montserrat text-white/70 text-sm mt-1">Tales</p>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
              <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-xl p-4 mb-4 mx-auto w-16 h-16 flex items-center justify-center">
                <div className="w-8 h-8 bg-white/20 rounded-full" />
              </div>
              <h3 className="font-cinzel text-xl font-bold mb-2">WhatsApp</h3>
              <p className="font-montserrat text-white/90">(11) 94014-7157</p>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-4 mb-4 mx-auto w-16 h-16 flex items-center justify-center">
                <div className="w-8 h-8 bg-white/20 rounded-full" />
              </div>
              <h3 className="font-cinzel text-xl font-bold mb-2">Horário</h3>
              <p className="font-montserrat text-white/90">Seg-Sex: 8h-18h</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link 
            href="/contact"
            className="bg-gradient-to-r from-gold-400 to-gold-500 text-black px-12 py-4 rounded-xl font-montserrat font-semibold hover:from-gold-300 hover:to-gold-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-center text-lg"
          >
            Solicitar Orçamento Grátis
          </Link>
          <Link 
            href="https://wa.me/5511940147157"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-white text-white px-12 py-4 rounded-xl font-montserrat font-semibold hover:bg-white hover:text-green-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-center text-lg"
          >
            WhatsApp
          </Link>
          <a 
            href="tel:+551131137934"
            className="bg-gradient-to-r from-wood-400 to-wood-600 text-white px-12 py-4 rounded-xl font-montserrat font-semibold hover:from-wood-500 hover:to-wood-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-center text-lg"
          >
            Ligar Agora
          </a>
        </div>
      </div>
    </div>
  )
}