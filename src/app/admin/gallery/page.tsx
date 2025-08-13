import { Metadata } from 'next'
import GalleryManagement from './GalleryManagement'

export const metadata: Metadata = {
  title: 'Gerenciar Galeria | Admin | PisosPró',
  description: 'Adicionar e gerenciar imagens da galeria',
}

export default function GalleryAdminPage() {
  return <GalleryManagement />
}