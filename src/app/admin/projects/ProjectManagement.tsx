'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

const categories = [
  { value: '', label: 'Selecione uma categoria' },
  { value: 'hardwood', label: 'Madeira' },
  { value: 'vinyl', label: 'Vinílico e LVT' },
  { value: 'laminate', label: 'Laminado' },
  { value: 'carpet', label: 'Carpete' }
]

interface GalleryImage {
  id: number
  title: string
  description: string | null
  imageUrl: string
  category: string | null
  isActive: boolean
  createdAt: string
}

interface Project {
  id: number
  title: string
  description: string | null
  location: string | null
  category: string | null
  imageUrls: string[]
  completedAt: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
  galleryImages?: GalleryImage[]
}

interface AddProjectFormProps {
  onSave: (data: any) => void
  onCancel: () => void
}

function AddProjectForm({ onSave, onCancel }: AddProjectFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [category, setCategory] = useState('')
  const [imageUrls, setImageUrls] = useState('')
  const [completedAt, setCompletedAt] = useState('')
  const [isActive, setIsActive] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim()) {
      alert('Título é obrigatório')
      return
    }

    const imageUrlsArray = imageUrls
      .split('\n')
      .map(url => url.trim())
      .filter(url => url.length > 0)

    onSave({
      title: title.trim(),
      description: description.trim() || null,
      location: location.trim() || null,
      category: category || null,
      imageUrls: imageUrlsArray,
      completedAt: completedAt || null,
      isActive
    })
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Adicionar Novo Projeto</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Título *
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o título do projeto"
              required
            />
          </div>

          <div>
            <Label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Localização
            </Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ex: São Paulo, SP"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Categoria
          </Label>
          <Select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Descrição
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descreva o projeto realizado"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="imageUrls" className="block text-sm font-medium text-gray-700 mb-2">
            URLs das Imagens (uma por linha)
          </Label>
          <Textarea
            id="imageUrls"
            value={imageUrls}
            onChange={(e) => setImageUrls(e.target.value)}
            placeholder="https://exemplo.com/imagem1.jpg&#10;https://exemplo.com/imagem2.jpg"
            rows={4}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="completedAt" className="block text-sm font-medium text-gray-700 mb-2">
              Data de Conclusão
            </Label>
            <Input
              id="completedAt"
              type="date"
              value={completedAt}
              onChange={(e) => setCompletedAt(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 pt-8">
            <input
              type="checkbox"
              id="isActive"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="isActive" className="text-sm font-medium text-gray-700">
              Projeto ativo (visível no portfólio)
            </Label>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="submit" className="flex-1">
            Salvar Projeto
          </Button>
          <Button variant="outline" type="button" onClick={onCancel} className="flex-1">
            Cancelar
          </Button>
        </div>
      </form>
    </Card>
  )
}

interface EditProjectFormProps {
  project: Project
  onSave: (data: any) => void
  onCancel: () => void
}

function EditProjectForm({ project, onSave, onCancel }: EditProjectFormProps) {
  const [title, setTitle] = useState(project.title)
  const [description, setDescription] = useState(project.description || '')
  const [location, setLocation] = useState(project.location || '')
  const [category, setCategory] = useState(project.category || '')
  const [imageUrls, setImageUrls] = useState(project.imageUrls.join('\n'))
  const [completedAt, setCompletedAt] = useState(
    project.completedAt ? new Date(project.completedAt).toISOString().split('T')[0] : ''
  )
  const [isActive, setIsActive] = useState(project.isActive)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim()) {
      alert('Título é obrigatório')
      return
    }

    const imageUrlsArray = imageUrls
      .split('\n')
      .map(url => url.trim())
      .filter(url => url.length > 0)

    onSave({
      title: title.trim(),
      description: description.trim() || null,
      location: location.trim() || null,
      category: category || null,
      imageUrls: imageUrlsArray,
      completedAt: completedAt || null,
      isActive
    })
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Editar Projeto</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 mb-2">
              Título *
            </Label>
            <Input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o título do projeto"
              required
            />
          </div>

          <div>
            <Label htmlFor="edit-location" className="block text-sm font-medium text-gray-700 mb-2">
              Localização
            </Label>
            <Input
              id="edit-location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ex: São Paulo, SP"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="edit-category" className="block text-sm font-medium text-gray-700 mb-2">
            Categoria
          </Label>
          <Select
            id="edit-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label htmlFor="edit-description" className="block text-sm font-medium text-gray-700 mb-2">
            Descrição
          </Label>
          <Textarea
            id="edit-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descreva o projeto realizado"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="edit-imageUrls" className="block text-sm font-medium text-gray-700 mb-2">
            URLs das Imagens (uma por linha)
          </Label>
          <Textarea
            id="edit-imageUrls"
            value={imageUrls}
            onChange={(e) => setImageUrls(e.target.value)}
            placeholder="https://exemplo.com/imagem1.jpg&#10;https://exemplo.com/imagem2.jpg"
            rows={4}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="edit-completedAt" className="block text-sm font-medium text-gray-700 mb-2">
              Data de Conclusão
            </Label>
            <Input
              id="edit-completedAt"
              type="date"
              value={completedAt}
              onChange={(e) => setCompletedAt(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 pt-8">
            <input
              type="checkbox"
              id="edit-isActive"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="edit-isActive" className="text-sm font-medium text-gray-700">
              Projeto ativo (visível no portfólio)
            </Label>
          </div>
        </div>

        {project.imageUrls.length > 0 && (
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Pré-visualização das Imagens Atuais
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {project.imageUrls.slice(0, 4).map((url, index) => (
                <div key={index} className="aspect-square relative border rounded-lg overflow-hidden">
                  <img
                    src={url}
                    alt={`${project.title} - ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none'
                    }}
                  />
                </div>
              ))}
              {project.imageUrls.length > 4 && (
                <div className="aspect-square border rounded-lg flex items-center justify-center bg-gray-50">
                  <span className="text-sm text-gray-500">
                    +{project.imageUrls.length - 4} mais
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex gap-4 pt-4">
          <Button type="submit" className="flex-1">
            Salvar Alterações
          </Button>
          <Button variant="outline" type="button" onClick={onCancel} className="flex-1">
            Cancelar
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default function ProjectManagement() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  const fetchProjects = async () => {
    try {
      const params = new URLSearchParams()
      if (selectedStatus !== 'all') params.append('status', selectedStatus)
      if (selectedCategory !== 'all') params.append('category', selectedCategory)
      if (searchTerm.trim()) params.append('search', searchTerm.trim())
      
      const response = await fetch(`/api/projects?${params.toString()}`)
      const data = await response.json()
      setProjects(data.projects || [])
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [selectedStatus, selectedCategory, searchTerm])

  const handleDeleteProject = async (id: number) => {
    if (!confirm('Tem certeza que deseja remover este projeto?')) return

    try {
      const response = await fetch(`/api/projects?id=${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        alert('Projeto removido com sucesso!')
        fetchProjects()
      } else {
        alert('Erro ao remover projeto')
      }
    } catch (error) {
      console.error('Error deleting project:', error)
      alert('Erro ao remover projeto')
    }
  }

  const handleAddProject = async (projectData: any) => {
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      })

      if (response.ok) {
        alert('Projeto adicionado com sucesso!')
        fetchProjects()
        setShowAddForm(false)
      } else {
        const error = await response.json()
        alert(error.error || 'Erro ao adicionar projeto')
      }
    } catch (error) {
      console.error('Error adding project:', error)
      alert('Erro ao adicionar projeto')
    }
  }

  const handleEditProject = (project: Project) => {
    setEditingProject(project)
    setShowAddForm(false)
  }

  const handleUpdateProject = async (updatedData: any) => {
    if (!editingProject) return

    try {
      const response = await fetch(`/api/projects/${editingProject.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      })

      if (response.ok) {
        alert('Projeto atualizado com sucesso!')
        fetchProjects()
        setEditingProject(null)
      } else {
        const error = await response.json()
        alert(error.error || 'Erro ao atualizar projeto')
      }
    } catch (error) {
      console.error('Error updating project:', error)
      alert('Erro ao atualizar projeto')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">Carregando...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Gerenciar Projetos</h1>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex gap-4 items-center">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todos os Status</option>
                <option value="active">Apenas Ativos</option>
                <option value="inactive">Apenas Inativos</option>
              </select>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todas as Categorias</option>
                {categories
                  .filter(cat => cat.value !== '')
                  .map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
              </select>
              
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por título, descrição ou localização..."
                className="w-64"
              />
            </div>
            <Button
              onClick={() => setShowAddForm(!showAddForm)}
              className="whitespace-nowrap"
            >
              {showAddForm ? 'Fechar Formulário' : 'Adicionar Novo Projeto'}
            </Button>
          </div>
        </div>

        {showAddForm && (
          <div className="mb-8">
            <AddProjectForm
              onSave={handleAddProject}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        )}

        {editingProject && (
          <div className="mb-8">
            <EditProjectForm
              project={editingProject}
              onSave={handleUpdateProject}
              onCancel={() => setEditingProject(null)}
            />
          </div>
        )}

        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Projetos ({projects.length})
            </h2>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">🏗️</div>
              <p className="text-lg">Nenhum projeto encontrado</p>
              <p className="text-sm">
                {searchTerm ? 'Tente ajustar sua busca ou' : ''} Adicione alguns projetos ao portfólio para começar
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="overflow-hidden bg-gray-50">
                  {project.galleryImages && project.galleryImages.length > 0 && (
                    <div className="aspect-video relative">
                      <img
                        src={project.galleryImages[0].imageUrl}
                        alt={project.galleryImages[0].title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none'
                        }}
                      />
                      {project.galleryImages.length > 1 && (
                        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                          +{project.galleryImages.length - 1} mais
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Fallback to imageUrls if no gallery images (backward compatibility) */}
                  {(!project.galleryImages || project.galleryImages.length === 0) && project.imageUrls.length > 0 && (
                    <div className="aspect-video relative">
                      <img
                        src={project.imageUrls[0]}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none'
                        }}
                      />
                      {project.imageUrls.length > 1 && (
                        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                          +{project.imageUrls.length - 1} mais (URL)
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{project.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        project.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {project.isActive ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                    
                    {project.location && (
                      <p className="text-sm text-blue-600 mb-2">{project.location}</p>
                    )}
                    
                    {project.category && (
                      <p className="text-sm text-purple-600 mb-2">
                        {categories.find(cat => cat.value === project.category)?.label || project.category}
                      </p>
                    )}
                    
                    {project.completedAt && (
                      <p className="text-sm text-gray-500 mb-2">
                        Concluído em: {new Date(project.completedAt).toLocaleDateString('pt-BR')}
                      </p>
                    )}
                    
                    {project.description && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {project.description}
                      </p>
                    )}
                    
                    {/* Gallery Images Info */}
                    {project.galleryImages && project.galleryImages.length > 0 && (
                      <p className="text-xs text-green-600 mb-2">
                        📷 {project.galleryImages.length} imagem{project.galleryImages.length !== 1 ? 's' : ''} da galeria
                      </p>
                    )}
                    
                    {/* Legacy imageUrls info */}
                    {project.imageUrls.length > 0 && (
                      <p className="text-xs text-orange-600 mb-2">
                        🔗 {project.imageUrls.length} URL{project.imageUrls.length !== 1 ? 's' : ''} legada{project.imageUrls.length !== 1 ? 's' : ''}
                      </p>
                    )}
                    
                    <div className="flex gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditProject(project)}
                        className="flex-1"
                      >
                        Editar
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteProject(project.id)}
                        className="flex-1"
                      >
                        Remover
                      </Button>
                    </div>
                    
                    <div className="text-xs text-gray-400 mt-2">
                      Criado em: {new Date(project.createdAt).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}