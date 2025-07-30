import Link from 'next/link'

const services = [
  {
    title: 'Hardwood Installation',
    description: 'Expert installation of premium hardwood flooring with precision and care.',
    icon: '🪵',
    href: '/services/hardwood'
  },
  {
    title: 'Tile & Stone',
    description: 'Beautiful ceramic, porcelain, and natural stone tile installation.',
    icon: '🏛️',
    href: '/services/tile'
  },
  {
    title: 'Laminate Flooring',
    description: 'Affordable and durable laminate options for every space.',
    icon: '📋',
    href: '/services/laminate'
  },
  {
    title: 'Vinyl & LVP',
    description: 'Waterproof luxury vinyl plank and sheet flooring solutions.',
    icon: '💧',
    href: '/services/vinyl'
  },
  {
    title: 'Carpet Installation',
    description: 'Comfortable and cozy carpet installation for residential and commercial spaces.',
    icon: '🏠',
    href: '/services/carpet'
  },
  {
    title: 'Floor Refinishing',
    description: 'Restore the beauty of your existing hardwood floors.',
    icon: '✨',
    href: '/services/refinishing'
  }
]

export default function ServicesOverview() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From installation to refinishing, we provide comprehensive flooring solutions for every need and budget.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <Link 
                href={service.href}
                className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
              >
                Learn More →
              </Link>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/services"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  )
}