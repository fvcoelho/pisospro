import { Metadata } from 'next'
import PortfolioClient from './PortfolioClient'

export const metadata: Metadata = {
  title: 'Portfólio de Pisos - 5000+ Projetos Concluídos | Pisos Pró',
  description: 'View our portfolio of completed flooring projects. madeira, tile, laminado, vinílico, and carpet installations for residential and commercial clients.',
  keywords: 'flooring portfolio, flooring projects, completed projects, flooring gallery, before and after, flooring examples',
  openGraph: {
    title: 'Portfólio de Pisos | Pisos Pró',
    description: 'Explore our extensive portfolio of beautiful flooring installations and transformations.',
    type: 'website',
  },
}

export default function PortfolioPage() {
  return <PortfolioClient />
}