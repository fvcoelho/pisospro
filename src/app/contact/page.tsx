import QuoteForm from '@/components/QuoteForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact PisosPro - Get Your Free Flooring Quote Today',
  description: 'Contact PisosPro for a free flooring consultation and quote. Call (555) 123-4567 or fill out our online form. Fast response, transparent pricing, satisfaction guaranteed.',
  keywords: 'contact pisospro, flooring quote, free estimate, flooring consultation, flooring contractor contact, get quote',
  openGraph: {
    title: 'Contact PisosPro - Free Flooring Quote',
    description: 'Get your free flooring consultation and quote today. Expert advice and transparent pricing.',
    type: 'website',
  },
}

const contactInfo = [
  {
    type: 'Phone',
    value: '(555) 123-4567',
    description: 'Call us for immediate assistance',
    icon: '📞',
    href: 'tel:555-123-4567'
  },
  {
    type: 'Email',
    value: 'info@pisospro.com',
    description: 'Send us your questions anytime',
    icon: '✉️',
    href: 'mailto:info@pisospro.com'
  },
  {
    type: 'Address',
    value: '123 Main Street\nYour City, ST 12345',
    description: 'Visit our showroom',
    icon: '📍',
    href: 'https://maps.google.com'
  },
  {
    type: 'Hours',
    value: 'Mon-Fri: 8AM-6PM\nSat: 9AM-4PM\nSun: Closed',
    description: 'Business hours',
    icon: '🕒',
    href: null
  }
]

const serviceAreas = [
  'Downtown Area', 'North Valley', 'East Side', 'West Hills',
  'Suburban Districts', 'Industrial Zone', 'Riverside', 'Hillcrest',
  'Garden District', 'Oak Park', 'Pine Ridge', 'Maple Heights'
]

export default function ContactPage() {
  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get Your Free Quote
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to transform your space? Contact us today for a free consultation 
            and detailed quote tailored to your project needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Quote Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Request a Quote</h2>
              <QuoteForm />
            </div>
          </div>

          {/* Contact Information & Sidebar */}
          <div className="space-y-8">
            {/* Contact Info Cards */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="text-2xl">{info.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{info.type}</h4>
                      {info.href ? (
                        <a 
                          href={info.href}
                          className="text-blue-600 hover:text-blue-800 transition-colors whitespace-pre-line"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-gray-600 whitespace-pre-line">{info.value}</p>
                      )}
                      <p className="text-sm text-gray-500 mt-1">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Service */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-red-800 mb-3">🚨 Emergency Service</h3>
              <p className="text-red-700 mb-4">
                Flood damage? Urgent repair needed? We offer 24/7 emergency flooring services.
              </p>
              <a 
                href="tel:555-999-0000"
                className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors inline-block"
              >
                Call Emergency Line
              </a>
            </div>

            {/* Service Areas */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Service Areas</h3>
              <p className="text-gray-600 mb-4">We proudly serve the greater metropolitan area including:</p>
              <div className="grid grid-cols-2 gap-2">
                {serviceAreas.map((area, index) => (
                  <div key={index} className="text-sm text-gray-600 flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    {area}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Don't see your area? Contact us anyway - we may still be able to help!
              </p>
            </div>

            {/* Financing */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-blue-800 mb-3">💳 Financing Available</h3>
              <p className="text-blue-700 mb-4">
                Flexible payment options and financing plans available for qualified customers.
              </p>
              <ul className="text-sm text-blue-600 space-y-1">
                <li>• 0% APR for 12 months</li>
                <li>• Extended payment plans</li>
                <li>• Quick approval process</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Why Choose Us for Contact */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Why Customers Choose PisosPro
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Fast Response</h3>
              <p className="text-gray-600">
                We respond to all inquiries within 24 hours and can often schedule consultations within 48 hours.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Transparent Pricing</h3>
              <p className="text-gray-600">
                No hidden fees or surprise charges. Our detailed quotes include everything you need to know.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Satisfaction Guaranteed</h3>
              <p className="text-gray-600">
                We stand behind our work with comprehensive warranties and a 100% satisfaction guarantee.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}