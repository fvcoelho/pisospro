import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sobre a Pisos Pró - 15+ Anos de Excelência Profissional em Pisos',
  description: 'Conheça os 15+ anos de expertise em pisos da Pisos Pró. Nossa equipe de profissionais qualificados completou mais de 5000 projetos com 98% de satisfação do cliente.',
  keywords: 'sobre pisos-pro, empresa de pisos, empreiteiros de pisos, equipe profissional de pisos, experiência em pisos, história da empresa',
  openGraph: {
    title: 'Sobre a Pisos Pró - Especialistas Profissionais em Pisos',
    description: 'Descubra nossa história, equipe e compromisso com o artesanato excepcional em pisos.',
    type: 'website',
  },
}

const team = [
  {
    name: 'Michael Rodriguez',
    role: 'Fundador & Instalador Master',
    experience: '15+ anos',
    specialties: ['Madeira', 'Instalação Personalizada'],
    description: 'Fundou a Pisos Pró com a visão de fornecer artesanato excepcional em pisos.',
    gradient: 'from-wood-400 to-wood-600'
  },
  {
    name: 'Sarah Chen',
    role: 'Consultora de Design',
    experience: '15+ anos',
    specialties: ['Design de Interiores', 'Harmonização de Cores'],
    description: 'Ajuda clientes a escolher o piso perfeito para seu estilo e necessidades.',
    gradient: 'from-gold-400 to-gold-600'
  },
  {
    name: 'David Thompson',
    role: 'Gerente de Projetos',
    experience: '12+ anos',
    specialties: ['Projetos Comerciais', 'Gestão de Cronograma'],
    description: 'Garante que cada projeto seja concluído no prazo e com perfeição.',
    gradient: 'from-green-400 to-green-600'
  },
  {
    name: 'Maria Santos',
    role: 'Relacionamento com Cliente',
    experience: '8+ anos',
    specialties: ['Atendimento ao Cliente', 'Coordenação de Orçamentos'],
    description: 'Seu primeiro ponto de contato para um atendimento excepcional.',
    gradient: 'from-blue-400 to-blue-600'
  }
]

const stats = [
  { number: '15+', label: 'Anos de Mercado' },
  { number: '5000+', label: 'Projetos Concluídos' },
  { number: '98%', label: 'Satisfação do Cliente' },
  { number: '50+', label: 'Membros da Equipe' }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-cinzel text-5xl md:text-6xl lg:text-7xl mb-6 tracking-wider font-light">
            <span className="text-gradient-gold">
              Sobre a Pisos Pró
            </span>
          </h1>
          <p className="font-montserrat text-xl md:text-2xl mb-8 font-light tracking-wide text-white/90 max-w-4xl mx-auto">
            Há mais de 15 anos transformando casas e empresas com soluções premium 
            em pisos e artesanato excepcional.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Company Story */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-20">
          {/* Gradient Header */}
          <div className="h-32 bg-gradient-to-r from-wood-400 to-wood-600 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
          </div>
          
          <div className="p-12 -mt-8 relative">
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
              <h2 className="font-cinzel text-4xl font-bold text-gray-900 mb-4">Nossa História</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-6 text-gray-600">
                  <p className="font-montserrat text-lg leading-relaxed">
                    Fundada em 2008 pelo mestre artesão Michael Rodriguez, a Pisos Pró começou como uma pequena 
                    empresa familiar com uma missão simples: fornecer instalação de pisos da mais alta qualidade 
                    e atendimento ao cliente na região.
                  </p>
                  <p className="font-montserrat text-lg leading-relaxed">
                    O que começou como uma operação individual cresceu para se tornar uma empresa de pisos 
                    de serviço completo com mais de 50 profissionais qualificados, atendendo milhares de 
                    clientes satisfeitos nos mercados residencial e comercial.
                  </p>
                  <p className="font-montserrat text-lg leading-relaxed">
                    Hoje, temos o orgulho de ser reconhecidos como a principal empresa de pisos da nossa região, 
                    conhecida pela atenção aos detalhes, uso de materiais premium e compromisso em superar 
                    as expectativas dos clientes em cada projeto.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl p-8 shadow-lg">
                  <h3 className="font-cinzel text-2xl font-bold text-white mb-4">Qualidade Premiada</h3>
                  <p className="font-montserrat text-white/90 leading-relaxed">
                    Reconhecidos por associações da indústria e plataformas de avaliação de clientes 
                    por nosso artesanato excepcional e serviço.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gradient-to-br from-green-50 to-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl hover:scale-105 transition-all duration-300 border border-green-100">
              <div className="font-cinzel text-4xl font-bold text-green-600 mb-3">{stat.number}</div>
              <div className="font-montserrat text-gray-700 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission & Values */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-20">
          {/* Gradient Header */}
          <div className="h-32 bg-gradient-to-r from-green-400 to-green-600 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
          </div>
          
          <div className="p-12 -mt-8 relative">
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
              <h2 className="font-cinzel text-4xl font-bold text-center text-gray-900 mb-4">
                Nossa Missão & Valores
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-gradient-to-br from-wood-400 to-wood-600 rounded-xl p-6 mb-6">
                  <h3 className="font-cinzel text-xl font-bold text-white mb-3">Nossa Missão</h3>
                </div>
                <p className="font-montserrat text-gray-600 leading-relaxed">
                  Transformar espaços com soluções premium em pisos, fornecendo 
                  atendimento excepcional ao cliente e artesanato que supera expectativas.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl p-6 mb-6">
                  <h3 className="font-cinzel text-xl font-bold text-white mb-3">Qualidade em Primeiro</h3>
                </div>
                <p className="font-montserrat text-gray-600 leading-relaxed">
                  Usamos apenas os melhores materiais e empregamos artesãos qualificados que 
                  se orgulham de entregar instalações impecáveis que resistem ao teste do tempo.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-xl p-6 mb-6">
                  <h3 className="font-cinzel text-xl font-bold text-white mb-3">Foco no Cliente</h3>
                </div>
                <p className="font-montserrat text-gray-600 leading-relaxed">
                  Cada projeto começa e termina com nosso compromisso com a satisfação do cliente. 
                  Sua visão se torna nossa missão.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <h2 className="font-cinzel text-4xl font-bold text-center text-gray-900 mb-12">Conheça Nossa Equipe</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
                {/* Gradient Header */}
                <div className={`h-24 bg-gradient-to-r ${member.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                
                <div className="p-6 -mt-6 relative">
                  <div className="bg-white rounded-xl p-4 shadow-lg mb-4 text-center">
                    <h3 className="font-cinzel text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-green-600 font-montserrat font-semibold text-sm mb-1">{member.role}</p>
                    <p className="text-xs text-gray-500">{member.experience} de experiência</p>
                  </div>
                  
                  <p className="font-montserrat text-gray-600 text-sm mb-4 leading-relaxed">{member.description}</p>
                  
                  <div className="space-y-1">
                    {member.specialties.map((specialty, idx) => (
                      <span key={idx} className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-1 font-montserrat">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-gradient-to-r from-green-900 via-green-800 to-green-700 text-white rounded-2xl shadow-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
          <div className="relative p-12 text-center">
            <h2 className="font-cinzel text-4xl font-bold mb-8">Certificações & Parcerias</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
              <div>
                <div className="bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl p-4 mb-3 mx-auto w-16 h-16 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white/20 rounded-full" />
                </div>
                <p className="font-montserrat font-semibold">Licenciado & Garantido</p>
              </div>
              <div>
                <div className="bg-gradient-to-br from-wood-400 to-wood-600 rounded-xl p-4 mb-3 mx-auto w-16 h-16 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white/20 rounded-full" />
                </div>
                <p className="font-montserrat font-semibold">Totalmente Segurado</p>
              </div>
              <div>
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-4 mb-3 mx-auto w-16 h-16 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white/20 rounded-full" />
                </div>
                <p className="font-montserrat font-semibold">Nota A+ no BBB</p>
              </div>
              <div>
                <div className="bg-gradient-to-br from-neutral-400 to-neutral-600 rounded-xl p-4 mb-3 mx-auto w-16 h-16 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white/20 rounded-full" />
                </div>
                <p className="font-montserrat font-semibold">Prêmios da Indústria</p>
              </div>
            </div>
            <p className="font-montserrat text-lg mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
              Mantemos os mais altos padrões da indústria e somos instaladores certificados 
              dos principais fabricantes de pisos.
            </p>
            <a 
              href="/contact"
              className="bg-gradient-to-r from-gold-400 to-gold-500 text-black px-8 py-4 rounded-xl font-montserrat font-semibold hover:from-gold-300 hover:to-gold-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 inline-block"
            >
              Comece Seu Projeto Hoje
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}