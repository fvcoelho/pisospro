import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">Pisos-Pró</h3>
            <p className="text-gray-300 mb-4">
              Soluções profissionais em pisos com mais de 25 anos de experiência. 
              Transformamos espaços com artesanato de qualidade e atendimento excepcional.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                📘
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                📷
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                💼
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">Início</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-white transition-colors">Serviços</Link></li>
              <li><Link href="/products" className="text-gray-300 hover:text-white transition-colors">Produtos</Link></li>
              <li><Link href="/portfolio" className="text-gray-300 hover:text-white transition-colors">Portfólio</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">Sobre</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contato</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Informações de Contato</h4>
            <div className="space-y-2 text-gray-300">
              <p>📞 (11) 94014-7157</p>
              <p>✉️ contato@pisospro.com.br</p>
              <p>📍 Rua Leonardo Mota, 100<br />São Paulo, SP 05586-090</p>
              <p>🕒 Seg-Sex: 8h-18h<br />Sáb: 9h-16h</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300">
              © 2024 Pisos-Pró. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                Política de Privacidade
              </Link>
              <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
                Termos de Serviço
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}