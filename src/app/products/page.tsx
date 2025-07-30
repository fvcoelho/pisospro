import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Premium Flooring Products - Hardwood, Tile, Laminate & More | PisosPro',
  description: 'Quality flooring products from trusted brands. Hardwood, tile, laminate, vinyl, and carpet options. Expert product selection and installation services available.',
  keywords: 'flooring products, hardwood flooring, tile flooring, laminate flooring, vinyl flooring, carpet, flooring materials, flooring brands',
  openGraph: {
    title: 'Premium Flooring Products | PisosPro',
    description: 'Discover our extensive selection of quality flooring products from industry-leading brands.',
    type: 'website',
  },
}

const productCategories = [
  {
    id: 'hardwood',
    name: 'Hardwood Flooring',
    description: 'Premium solid and engineered hardwood from top manufacturers',
    image: '🪵',
    products: [
      { name: 'Oak Solid Hardwood', price: '$8-12/sq ft', description: 'Classic American oak in various stains' },
      { name: 'Maple Engineered', price: '$6-10/sq ft', description: 'Durable engineered maple planks' },
      { name: 'Cherry Hardwood', price: '$10-15/sq ft', description: 'Rich cherry wood with natural grain' },
      { name: 'Exotic Hardwoods', price: '$12-20/sq ft', description: 'Brazilian cherry, teak, and bamboo options' }
    ]
  },
  {
    id: 'tile',
    name: 'Tile & Stone',
    description: 'Ceramic, porcelain, and natural stone tiles for every application',
    image: '🏛️',
    products: [
      { name: 'Porcelain Tile', price: '$3-8/sq ft', description: 'Durable porcelain in multiple sizes and finishes' },
      { name: 'Ceramic Tile', price: '$2-6/sq ft', description: 'Classic ceramic tiles for walls and floors' },
      { name: 'Natural Stone', price: '$8-15/sq ft', description: 'Marble, granite, and travertine options' },
      { name: 'Mosaic Tiles', price: '$10-25/sq ft', description: 'Glass, stone, and metal mosaic patterns' }
    ]
  },
  {
    id: 'laminate',
    name: 'Laminate Flooring',
    description: 'High-quality laminate that looks like real wood and stone',
    image: '📋',
    products: [
      { name: 'Wood-Look Laminate', price: '$2-5/sq ft', description: 'Realistic wood grain patterns and textures' },
      { name: 'Stone-Look Laminate', price: '$3-6/sq ft', description: 'Tile and stone appearance laminate' },
      { name: 'Water-Resistant Laminate', price: '$4-7/sq ft', description: 'Perfect for kitchens and bathrooms' },
      { name: 'Commercial Grade', price: '$3-8/sq ft', description: 'Heavy-duty laminate for high-traffic areas' }
    ]
  },
  {
    id: 'vinyl',
    name: 'Vinyl & LVP',
    description: 'Luxury vinyl plank and sheet flooring with superior durability',
    image: '💧',
    products: [
      { name: 'Luxury Vinyl Plank', price: '$3-7/sq ft', description: 'Waterproof LVP with realistic wood looks' },
      { name: 'Vinyl Sheet', price: '$2-4/sq ft', description: 'Seamless vinyl flooring for large areas' },
      { name: 'Vinyl Tile', price: '$2-5/sq ft', description: 'Individual vinyl tiles in various patterns' },
      { name: 'Commercial LVT', price: '$4-8/sq ft', description: 'Heavy-duty luxury vinyl for commercial use' }
    ]
  },
  {
    id: 'carpet',
    name: 'Carpet',
    description: 'Comfortable carpeting for residential and commercial spaces',
    image: '🏠',
    products: [
      { name: 'Plush Carpet', price: '$2-6/sq ft', description: 'Soft, luxurious carpet for bedrooms and living areas' },
      { name: 'Berber Carpet', price: '$3-7/sq ft', description: 'Durable loop pile carpet in neutral tones' },
      { name: 'Frieze Carpet', price: '$3-8/sq ft', description: 'Twisted fiber carpet that hides footprints' },
      { name: 'Commercial Carpet', price: '$2-5/sq ft', description: 'Stain-resistant carpet for office spaces' }
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
            Our Products
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We carry premium flooring products from the industry's most trusted manufacturers, 
            ensuring quality and durability for every project.
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
            Trusted Brands We Carry
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
          <h2 className="text-3xl font-bold mb-4">Need Help Choosing?</h2>
          <p className="text-xl mb-6">
            Our flooring experts will help you select the perfect products for your space and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact"
              className="bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
            >
              Schedule Consultation
            </a>
            <a 
              href="/services"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
            >
              View Installation Services
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}