import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About PisosPro - 25+ Years of Professional Flooring Excellence',
  description: 'Learn about PisosPro\'s 25+ years of flooring expertise. Our team of skilled professionals has completed 5000+ projects with 98% customer satisfaction.',
  keywords: 'about pisospro, flooring company, flooring contractors, professional flooring team, flooring experience, flooring history',
  openGraph: {
    title: 'About PisosPro - Professional Flooring Experts',
    description: 'Discover our story, team, and commitment to exceptional flooring craftsmanship.',
    type: 'website',
  },
}

const team = [
  {
    name: 'Michael Rodriguez',
    role: 'Founder & Master Installer',
    experience: '25+ years',
    specialties: ['Hardwood', 'Custom Installation'],
    description: 'Started PisosPro with a vision to provide exceptional flooring craftsmanship.',
    image: '👨‍🔧'
  },
  {
    name: 'Sarah Chen',
    role: 'Design Consultant',
    experience: '15+ years',
    specialties: ['Interior Design', 'Color Matching'],
    description: 'Helps clients choose the perfect flooring to match their style and needs.',
    image: '👩‍🎨'
  },
  {
    name: 'David Thompson',
    role: 'Project Manager',
    experience: '12+ years',
    specialties: ['Commercial Projects', 'Timeline Management'],
    description: 'Ensures every project is completed on time and to perfection.',
    image: '👨‍💼'
  },
  {
    name: 'Maria Santos',
    role: 'Customer Relations',
    experience: '8+ years',
    specialties: ['Customer Service', 'Quote Coordination'],
    description: 'Your first point of contact for exceptional customer service.',
    image: '👩‍💼'
  }
]

const stats = [
  { number: '25+', label: 'Years in Business' },
  { number: '5000+', label: 'Projects Completed' },
  { number: '98%', label: 'Customer Satisfaction' },
  { number: '50+', label: 'Team Members' }
]

export default function AboutPage() {
  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About PisosPro
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            For over 25 years, we've been transforming homes and businesses with 
            premium flooring solutions and exceptional craftsmanship.
          </p>
        </div>

        {/* Company Story */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 1998 by master craftsman Michael Rodriguez, PisosPro began as a small 
                  family business with a simple mission: to provide the highest quality flooring 
                  installation and customer service in the region.
                </p>
                <p>
                  What started as a one-man operation has grown into a full-service flooring company 
                  with over 50 skilled professionals, serving thousands of satisfied customers across 
                  residential and commercial markets.
                </p>
                <p>
                  Today, we're proud to be recognized as the premier flooring contractor in our area, 
                  known for our attention to detail, use of premium materials, and commitment to 
                  exceeding customer expectations on every project.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="text-8xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Award-Winning Quality</h3>
              <p className="text-gray-600">
                Recognized by industry associations and customer review platforms 
                for our exceptional workmanship and service.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission & Values */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Mission & Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
              <p className="text-gray-600">
                To transform spaces with premium flooring solutions while providing 
                exceptional customer service and craftsmanship that exceeds expectations.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">💎</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality First</h3>
              <p className="text-gray-600">
                We use only the finest materials and employ skilled craftsmen who 
                take pride in delivering flawless installations that stand the test of time.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Customer Focus</h3>
              <p className="text-gray-600">
                Every project begins and ends with our commitment to customer satisfaction. 
                Your vision becomes our mission.
              </p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-2">{member.role}</p>
                <p className="text-sm text-gray-500 mb-3">{member.experience} experience</p>
                <p className="text-gray-600 text-sm mb-4">{member.description}</p>
                <div className="space-y-1">
                  {member.specialties.map((specialty, idx) => (
                    <span key={idx} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-1">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-blue-900 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Certifications & Partnerships</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-4xl mb-2">🏅</div>
              <p className="font-semibold">Licensed & Bonded</p>
            </div>
            <div>
              <div className="text-4xl mb-2">🛡️</div>
              <p className="font-semibold">Fully Insured</p>
            </div>
            <div>
              <div className="text-4xl mb-2">⭐</div>
              <p className="font-semibold">BBB A+ Rating</p>
            </div>
            <div>
              <div className="text-4xl mb-2">🏆</div>
              <p className="font-semibold">Industry Awards</p>
            </div>
          </div>
          <p className="text-lg mb-6">
            We maintain the highest industry standards and are certified installers 
            for major flooring manufacturers.
          </p>
          <a 
            href="/contact"
            className="bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors inline-block"
          >
            Start Your Project Today
          </a>
        </div>
      </div>
    </div>
  )
}