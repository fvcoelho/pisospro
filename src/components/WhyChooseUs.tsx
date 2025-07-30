const features = [
  {
    title: '25+ Years Experience',
    description: 'Decades of expertise in flooring installation and renovation.',
    icon: '⭐'
  },
  {
    title: 'Licensed & Insured',
    description: 'Fully licensed professionals with comprehensive insurance coverage.',
    icon: '🛡️'
  },
  {
    title: 'Quality Materials',
    description: 'We only use premium materials from trusted manufacturers.',
    icon: '💎'
  },
  {
    title: 'Free Estimates',
    description: 'No-obligation quotes with transparent pricing.',
    icon: '💰'
  },
  {
    title: 'Warranty Guarantee',
    description: 'All work comes with our comprehensive warranty protection.',
    icon: '✅'
  },
  {
    title: '24/7 Support',
    description: 'Round-the-clock customer support for your peace of mind.',
    icon: '📞'
  }
]

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose PisosPro?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're committed to delivering exceptional flooring solutions with unmatched quality and service.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}