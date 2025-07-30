import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Professional Flooring Services - Installation & Renovation | PisosPro',
  description: 'Expert flooring installation services including hardwood, tile, laminate, vinyl, and carpet. Licensed professionals with 25+ years experience. Free quotes available.',
  keywords: 'flooring installation, hardwood installation, tile installation, laminate flooring, vinyl flooring, carpet installation, floor refinishing, professional flooring services',
  openGraph: {
    title: 'Professional Flooring Services | PisosPro',
    description: 'Transform your space with our expert flooring installation and renovation services.',
    type: 'website',
  },
}

const services = [
  {
    id: 'hardwood',
    title: 'Hardwood Installation',
    description: 'Premium hardwood flooring installation with expert craftsmanship. We work with all types of hardwood including oak, maple, cherry, and exotic species.',
    features: ['Site-finished & Pre-finished', 'Solid & Engineered Wood', 'Custom Staining', 'Professional Sanding'],
    price: 'Starting at $8/sq ft',
    image: '🪵',
    popular: true
  },
  {
    id: 'tile',
    title: 'Tile & Stone Installation',
    description: 'Beautiful ceramic, porcelain, and natural stone installation for kitchens, bathrooms, and living spaces.',
    features: ['Ceramic & Porcelain Tile', 'Natural Stone', 'Mosaic Patterns', 'Waterproof Installation'],
    price: 'Starting at $5/sq ft',
    image: '🏛️',
    popular: false
  },
  {
    id: 'laminate',
    title: 'Laminate Flooring',
    description: 'Affordable and durable laminate flooring that mimics the look of hardwood and tile at a fraction of the cost.',
    features: ['Click-Lock Installation', 'Water-Resistant Options', 'Multiple Finishes', 'Quick Installation'],
    price: 'Starting at $3/sq ft',
    image: '📋',
    popular: false
  },
  {
    id: 'vinyl',
    title: 'Vinyl & LVP',
    description: 'Luxury vinyl plank and sheet flooring perfect for high-moisture areas and heavy traffic zones.',
    features: ['100% Waterproof', 'Luxury Vinyl Plank', 'Sheet Vinyl', 'Commercial Grade'],
    price: 'Starting at $4/sq ft',
    image: '💧',
    popular: true
  },
  {
    id: 'carpet',
    title: 'Carpet Installation',
    description: 'Comfortable carpet installation for bedrooms, living rooms, and offices with professional padding and finishing.',
    features: ['Residential & Commercial', 'Premium Padding', 'Stain-Resistant Options', 'Custom Binding'],
    price: 'Starting at $2/sq ft',
    image: '🏠',
    popular: false
  },
  {
    id: 'refinishing',
    title: 'Floor Refinishing',
    description: 'Restore the beauty of your existing hardwood floors with professional sanding, staining, and finishing.',
    features: ['Complete Sanding', 'Custom Staining', 'Polyurethane Finish', 'Dust-Free Process'],
    price: 'Starting at $3/sq ft',
    image: '✨',
    popular: true
  }
]

export default function ServicesPage() {
  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional flooring installation and renovation services for residential and commercial properties.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-lg shadow-lg overflow-hidden relative">
              {service.popular && (
                <div className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
                  Popular
                </div>
              )}
              
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-4">{service.image}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                    <p className="text-blue-600 font-semibold">{service.price}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">What's Included:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex gap-4">
                  <Link 
                    href="/contact"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex-1 text-center"
                  >
                    Get Quote
                  </Link>
                  <Link 
                    href={`/services/${service.id}`}
                    className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-blue-900 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Space?</h2>
          <p className="text-xl mb-6">
            Get a free, no-obligation quote for your flooring project today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
            >
              Get Free Quote
            </Link>
            <Link 
              href="tel:555-123-4567"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
            >
              Call (555) 123-4567
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}