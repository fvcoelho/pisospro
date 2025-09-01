import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-wood-900 via-wood-800 to-wood-900 text-white overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-wood-texture opacity-5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-3xl font-bold text-gradient-gold mb-2">Pisos Pró</h3>
              <div className="w-20 h-1 bg-gradient-gold rounded-full mb-4"></div>
            </div>
            <p className="text-white/80 mb-6 leading-relaxed text-lg">
              Especialistas em pisos de madeira com mais de 15 anos de experiência. 
              Transformamos espaços com artesanato de excelência e atendimento personalizado 
              em toda região metropolitana de São Paulo.
            </p>
            
            {/* Trust indicators */}
            {/* <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center glass-enhanced p-3 rounded-lg">
                <div className="text-2xl font-bold text-gold-400">15+</div>
                <div className="text-xs text-white/70">Anos</div>
              </div>
              <div className="text-center glass-enhanced p-3 rounded-lg">
                <div className="text-2xl font-bold text-gold-400">5K+</div>
                <div className="text-xs text-white/70">Projetos</div>
              </div>
              <div className="text-center glass-enhanced p-3 rounded-lg">
                <div className="text-2xl font-bold text-gold-400">98%</div>
                <div className="text-xs text-white/70">Satisfação</div>
              </div>
            </div> */}

            {/* Social Links */}
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/pisosprobrasil" 
                target="_blank"
                rel="noopener noreferrer"
                className="glass-enhanced w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-600/20 transition-all duration-300 hover:scale-110"
              >
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              {/* <a 
                href="https://instagram.com/pisospro" 
                target="_blank"
                rel="noopener noreferrer"
                className="glass-enhanced w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110"
              >
                <span className="sr-only">Instagram</span>
                📷
              </a>
              <a 
                href="https://linkedin.com/company/pisospro" 
                target="_blank"
                rel="noopener noreferrer"
                className="glass-enhanced w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110"
              >
                <span className="sr-only">LinkedIn</span>
                💼
              </a> */}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Navegação</h4>
            <ul className="space-y-3">
              <li><FooterLink href="/">Início</FooterLink></li>
              <li><FooterLink href="/portfolio">Portfólio</FooterLink></li>
              <li><FooterLink href="/services">Serviços</FooterLink></li>
              {/* <li><FooterLink href="/products">Produtos</FooterLink></li> */}
              <li><FooterLink href="/about">Sobre Nós</FooterLink></li>
              <li><FooterLink href="/contact">Contato</FooterLink></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Contato</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-gradient-gold p-2 rounded-lg mt-1">
                  <span className="text-wood-900">📞</span>
                </div>
                <div>
                  <a 
                    href="https://wa.me/5511940147157?text=Olá! Gostaria de solicitar um orçamento para pisos de madeira."
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track-id="footer-whatsapp-link"
                    className="text-gold-300 hover:text-gold-200 font-semibold transition-colors block"
                  >
                    (11) 94014-7157
                  </a>
                  <span className="text-white/70 text-sm">WhatsApp</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-gradient-gold p-2 rounded-lg mt-1">
                  <span className="text-wood-900">✉️</span>
                </div>
                <div>
                  <a 
                    href="mailto:contato@pisospro.com.br"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    contato@pisospro.com.br
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-gradient-gold p-2 rounded-lg mt-1">
                  <span className="text-wood-900">📍</span>
                </div>
                <div className="text-white/80">
                  <p>São Paulo, SP</p>
                  <p className="text-sm text-white/60">Atendemos toda RMSP</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-gradient-gold p-2 rounded-lg mt-1">
                  <span className="text-wood-900">🕒</span>
                </div>
                <div className="text-white/80 text-sm">
                  <p>Seg-Sex: 8h às 18h</p>
                  <p>Sáb: 9h às 16h</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="border-t border-white/10 pt-8 mt-12">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-center lg:text-left">
              <p className="text-white/70">
                © {new Date().getFullYear()} Pisos Pró. Todos os direitos reservados.
              </p>
              <p className="text-white/50 text-sm mt-1">
                Especialistas em pisos de madeira desde 1998
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center lg:justify-end space-x-6">
              <Link href="/politica-privacidade" className="text-white/70 hover:text-white transition-colors text-sm">
                Política de Privacidade
              </Link>
              {/* <Link href="/terms" className="text-white/70 hover:text-white transition-colors text-sm">
                Termos de Serviço
              </Link> */}
              {/* <Link href="/sitemap" className="text-white/70 hover:text-white transition-colors text-sm">
                Mapa do Site
              </Link> */}
            </div>
          </div>

          {/* Certificate badges */}
          {/* <div className="flex justify-center space-x-6 mt-8 pt-6 border-t border-white/10">
            <div className="flex items-center space-x-2 text-white/60">
              <span className="text-gold-500">🏅</span>
              <span className="text-xs">Licenciado CREA</span>
            </div>
            <div className="flex items-center space-x-2 text-white/60">
              <span className="text-gold-500">🛡️</span>
              <span className="text-xs">Totalmente Segurado</span>
            </div>
            <div className="flex items-center space-x-2 text-white/60">
              <span className="text-gold-500">🌱</span>
              <span className="text-xs">Madeira Sustentável</span>
            </div>
          </div> */}

          {/* Developer credit */}
          <div className="flex justify-center mt-6 pt-4 border-t border-white/10">
            <p className="text-white/50 text-xl text-center">
              Desenvolvido com ❤️ por{' '}
              <a 
                href="https://pegue.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gold-400 hover:text-gold-300 transition-colors font-medium"
              >
                pegue.app
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Helper component for footer links
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="text-white/70 hover:text-gold-300 transition-all duration-300 hover:translate-x-1 inline-block"
    >
      {children}
    </Link>
  )
}