'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'

interface Project {
  id: number
  title: string
  description: string | null
  location: string | null
  completedAt: string | null
  isActive: boolean
  createdAt: string
  _count?: {
    media: number
  }
}

interface CreateProjectFormProps {
  onProjectCreated: () => void
  onCancel: () => void
}

interface EditProjectFormProps {
  project: Project
  onProjectUpdated: () => void
  onCancel: () => void
}

function CreateProjectForm({ onProjectCreated, onCancel }: CreateProjectFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [creating, setCreating] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim()) return

    setCreating(true)

    try {
      const response = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || null,
          location: location.trim() || null,
        }),
      })

      if (response.ok) {
        alert('Projeto criado com sucesso!')
        setTitle('')
        setDescription('')
        setLocation('')
        onProjectCreated()
      } else {
        const data = await response.json()
        alert(`Erro ao criar projeto: ${data.error || 'Erro desconhecido'}`)
      }
    } catch (error) {
      console.error('Error creating project:', error)
      alert('Erro ao criar projeto')
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Criar Novo Projeto</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Título *
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite o título do projeto"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descrição
          </label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Digite uma descrição para o projeto (opcional)"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Localização
          </label>
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Ex: São Paulo, SP"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <Button 
            type="submit" 
            disabled={!title.trim() || creating}
            className="flex-1"
          >
            {creating ? 'Criando...' : 'Criar Projeto'}
          </Button>
          <Button 
            type="button"
            variant="outline" 
            onClick={onCancel}
            className="flex-1"
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  )
}

function EditProjectForm({ project, onProjectUpdated, onCancel }: EditProjectFormProps) {
  const [title, setTitle] = useState(project.title)
  const [description, setDescription] = useState(project.description || '')
  const [location, setLocation] = useState(project.location || '')
  const [completedAt, setCompletedAt] = useState(
    project.completedAt ? new Date(project.completedAt).toISOString().split('T')[0] : ''
  )
  const [updating, setUpdating] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim()) return

    setUpdating(true)

    try {
      const response = await fetch(`/api/projects/${project.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || null,
          location: location.trim() || null,
          completedAt: completedAt || null,
        }),
      })

      if (response.ok) {
        alert('Projeto atualizado com sucesso!')
        onProjectUpdated()
      } else {
        const data = await response.json()
        alert(`Erro ao atualizar projeto: ${data.error || 'Erro desconhecido'}`)
      }
    } catch (error) {
      console.error('Error updating project:', error)
      alert('Erro ao atualizar projeto')
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Editar Projeto</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Título *
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite o título do projeto"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descrição
          </label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Digite uma descrição para o projeto (opcional)"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Localização
            </label>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ex: São Paulo, SP"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data de Conclusão
            </label>
            <Input
              type="date"
              value={completedAt}
              onChange={(e) => setCompletedAt(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button 
            type="submit" 
            disabled={!title.trim() || updating}
            className="flex-1"
          >
            {updating ? 'Atualizando...' : 'Atualizar Projeto'}
          </Button>
          <Button 
            type="button"
            variant="outline" 
            onClick={onCancel}
            className="flex-1"
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  )
}

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/admin/projects')
      if (response.ok) {
        const data = await response.json()
        setProjects(data.projects || [])
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
      // Fallback with mock data for now
      setProjects([
        {
          id: 1,
          title: 'Reforma de Cozinha Moderna',
          description: 'Reforma completa do piso da cozinha com porcelanato premium com acabamento madeirado.',
          location: 'Apart. Centro',
          completedAt: '2024-01-15T00:00:00.000Z',
          isActive: true,
          createdAt: '2024-01-10T00:00:00.000Z',
          _count: { media: 0 }
        },
        {
          id: 2,
          title: 'Instalação de Madeira de Luxo',
          description: 'Bela instalação de piso de carvalho maciço nas principais áreas sociais.',
          location: 'Casa Residencial',
          completedAt: '2024-02-20T00:00:00.000Z',
          isActive: true,
          createdAt: '2024-02-10T00:00:00.000Z',
          _count: { media: 0 }
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleProjectCreated = () => {
    fetchProjects()
    setShowCreateForm(false)
  }

  const handleProjectUpdated = () => {
    fetchProjects()
    setEditingProject(null)
  }

  const handleEditProject = (project: Project) => {
    setEditingProject(project)
    setShowCreateForm(false)
  }

  const handleDeleteProject = async (projectId: number, projectTitle: string) => {
    if (!confirm(`Tem certeza que deseja excluir o projeto "${projectTitle}"? Esta ação não pode ser desfeita.`)) {
      return
    }

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        alert('Projeto excluído com sucesso!')
        fetchProjects()
      } else {
        const data = await response.json()
        alert(`Erro ao excluir projeto: ${data.error || 'Erro desconhecido'}`)
      }
    } catch (error) {
      console.error('Error deleting project:', error)
      alert('Erro ao excluir projeto')
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">Carregando projetos...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Gerenciar Projetos</h1>
              <p className="text-gray-600">
                Gerencie os projetos do portfólio e suas mídias (imagens e vídeos)
              </p>
            </div>
            <Button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="whitespace-nowrap"
            >
              {showCreateForm ? 'Cancelar' : 'Criar Novo Projeto'}
            </Button>
          </div>

          {showCreateForm && (
            <CreateProjectForm
              onProjectCreated={handleProjectCreated}
              onCancel={() => setShowCreateForm(false)}
            />
          )}

          {editingProject && (
            <EditProjectForm
              project={editingProject}
              onProjectUpdated={handleProjectUpdated}
              onCancel={() => setEditingProject(null)}
            />
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Projetos ({projects.length})
            </h2>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">📁</div>
              <p className="text-lg">Nenhum projeto encontrado</p>
              <p className="text-sm">Os projetos aparecerão aqui quando adicionados ao banco de dados</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="border rounded-lg overflow-hidden bg-gray-50 hover:shadow-md transition-shadow">
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900 text-lg">{project.title}</h3>
                      <span className={`inline-block w-3 h-3 rounded-full ${
                        project.isActive ? 'bg-green-500' : 'bg-gray-400'
                      }`} title={project.isActive ? 'Ativo' : 'Inativo'}></span>
                    </div>
                    
                    {project.location && (
                      <p className="text-sm text-blue-600 mb-2">{project.location}</p>
                    )}
                    
                    {project.description && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {project.description}
                      </p>
                    )}
                    
                    <div className="mb-4">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {project._count?.media || 0} mídias
                      </span>
                      {project.completedAt && (
                        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full ml-2">
                          Concluído
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Link 
                        href={`/admin/projects/${project.id}/media`}
                        className="block"
                      >
                        <Button variant="outline" size="sm" className="w-full">
                          Gerenciar Mídias ({project._count?.media || 0})
                        </Button>
                      </Link>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditProject(project)}
                          className="flex-1 text-blue-600 hover:text-blue-800"
                        >
                          Editar
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteProject(project.id, project.title)}
                          className="flex-1"
                        >
                          Excluir
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}