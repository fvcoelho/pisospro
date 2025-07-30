import { Metadata } from 'next'
import PortfolioClient from './PortfolioClient'

export const metadata: Metadata = {
  title: 'Flooring Portfolio - 5000+ Completed Projects | PisosPro',
  description: 'View our portfolio of completed flooring projects. Hardwood, tile, laminate, vinyl, and carpet installations for residential and commercial clients.',
  keywords: 'flooring portfolio, flooring projects, completed projects, flooring gallery, before and after, flooring examples',
  openGraph: {
    title: 'Flooring Portfolio | PisosPro',
    description: 'Explore our extensive portfolio of beautiful flooring installations and transformations.',
    type: 'website',
  },
}

export default function PortfolioPage() {
  return <PortfolioClient />
}