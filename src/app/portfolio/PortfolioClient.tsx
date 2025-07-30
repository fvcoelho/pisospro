'use client'

import { useState } from 'react'

const portfolioProjects = [
  {
    id: 1,
    title: 'Modern Kitchen Renovation',
    category: 'tile',
    location: 'Downtown Condo',
    description: 'Complete kitchen floor renovation with premium porcelain tiles featuring wood-look finish.',
    image: '🏠',
    details: {
      size: '250 sq ft',
      duration: '3 days',
      materials: 'Porcelain wood-look tiles',
      challenge: 'Working around existing cabinetry'
    }
  },
  {
    id: 2,
    title: 'Luxury Hardwood Installation',
    category: 'hardwood',
    location: 'Suburban Home',
    description: 'Beautiful oak hardwood flooring installation throughout main living areas.',
    image: '🪵',
    details: {
      size: '1,200 sq ft',
      duration: '5 days',
      materials: 'Solid oak hardwood',
      challenge: 'Multiple room transitions'
    }
  },
  {
    id: 3,
    title: 'Commercial Office Flooring',
    category: 'vinyl',
    location: 'Business District',
    description: 'Durable LVP installation for high-traffic commercial office space.',
    image: '🏢',
    details: {
      size: '3,500 sq ft',
      duration: '1 week',
      materials: 'Commercial-grade LVP',
      challenge: 'Weekend installation schedule'
    }
  },
  {
    id: 4,
    title: 'Bathroom Floor Transformation',
    category: 'tile',
    location: 'Master Suite',
    description: 'Elegant marble tile installation with custom mosaic accent border.',
    image: '🛁',
    details: {
      size: '120 sq ft',
      duration: '4 days',
      materials: 'Carrara marble with mosaic border',
      challenge: 'Waterproofing and drainage'
    }
  },
  {
    id: 5,
    title: 'Basement Family Room',
    category: 'laminate',
    location: 'Residential Basement',
    description: 'Moisture-resistant laminate flooring perfect for below-grade installation.',
    image: '🏠',
    details: {
      size: '600 sq ft',
      duration: '2 days',
      materials: 'Water-resistant laminate',
      challenge: 'Moisture mitigation'
    }
  },
  {
    id: 6,
    title: 'Restaurant Dining Area',
    category: 'hardwood',
    location: 'Historic Building',
    description: 'Restoration and installation of reclaimed hardwood in historic restaurant.',
    image: '🍽️',
    details: {
      size: '800 sq ft',
      duration: '1 week',
      materials: 'Reclaimed heart pine',
      challenge: 'Preserving historic character'
    }
  },
  {
    id: 7,
    title: 'Luxury Hotel Lobby',
    category: 'tile',
    location: 'Downtown Hotel',
    description: 'High-end natural stone installation with intricate pattern design.',
    image: '🏨',
    details: {
      size: '1,500 sq ft',
      duration: '2 weeks',
      materials: 'Travertine and marble',
      challenge: 'Complex geometric patterns'
    }
  },
  {
    id: 8,
    title: 'Cozy Bedroom Carpet',
    category: 'carpet',
    location: 'Family Home',
    description: 'Plush carpet installation for ultimate comfort and noise reduction.',
    image: '🛏️',
    details: {
      size: '300 sq ft',
      duration: '1 day',
      materials: 'Premium plush carpet',
      challenge: 'Stair carpeting included'
    }
  }
]

const categories = [
  { id: 'all', name: 'All Projects', icon: '🏗️' },
  { id: 'hardwood', name: 'Hardwood', icon: '🪵' },
  { id: 'tile', name: 'Tile & Stone', icon: '🏛️' },
  { id: 'vinyl', name: 'Vinyl & LVP', icon: '💧' },
  { id: 'laminate', name: 'Laminate', icon: '📋' },
  { id: 'carpet', name: 'Carpet', icon: '🏠' }
]

export default function PortfolioClient() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState<typeof portfolioProjects[0] | null>(null)

  const filteredProjects = selectedCategory === 'all' 
    ? portfolioProjects 
    : portfolioProjects.filter(project => project.category === selectedCategory)

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Portfolio
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our recent projects and see the quality craftsmanship that has made 
            PisosPro the trusted choice for flooring solutions.
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
                <div className="text-6xl">{project.image}</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-blue-600 font-semibold text-sm mb-2">{project.location}</p>
                <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                <div className="flex justify-between items-center">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {categories.find(cat => cat.id === project.category)?.name}
                  </span>
                  <span className="text-blue-600 text-sm font-medium">View Details →</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Project Statistics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">5,000+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">2M+</div>
              <div className="text-gray-600">Square Feet Installed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600">Customer Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">25+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for Your Dream Floor?</h2>
          <p className="text-xl mb-6">
            Let us transform your space with the same quality and attention to detail shown in our portfolio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact"
              className="bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
            >
              Start Your Project
            </a>
            <a 
              href="/services"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
            >
              View Services
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
                  <div className="text-8xl">{selectedProject.image}</div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Project Details</h3>
                    <p className="text-gray-600 mb-4">{selectedProject.description}</p>
                    <p className="text-blue-600 font-semibold">Location: {selectedProject.location}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Specifications</h3>
                    <div className="space-y-2 text-sm">
                      <div><strong>Size:</strong> {selectedProject.details.size}</div>
                      <div><strong>Duration:</strong> {selectedProject.details.duration}</div>
                      <div><strong>Materials:</strong> {selectedProject.details.materials}</div>
                      <div><strong>Challenge:</strong> {selectedProject.details.challenge}</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <a 
                    href="/contact"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex-1 text-center"
                  >
                    Start Similar Project
                  </a>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Close
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