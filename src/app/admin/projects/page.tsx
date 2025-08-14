import { Metadata } from 'next'
import ProjectManagement from './ProjectManagement'

export const metadata: Metadata = {
  title: 'Gerenciar Projetos | Admin | Pisos Pró',
  description: 'Adicionar e gerenciar projetos do portfólio',
}

export default function ProjectsAdminPage() {
  return <ProjectManagement />
}