'use client'

import { useState, useEffect } from 'react'
import GalleryUploadForm from '@/components/GalleryUploadForm'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface GalleryImage {
  id: number
  title: string
  description: string | null
  location: string | null
  imageUrl: string
  publicId: string
  category: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
}

const categories = [
  { value: 'all', label: 'Todas as Categorias' },
  { value: 'hardwood', label: 'Madeira' },
  //{ value: 'tile', label: 'Cerâmica e Pedra' },
  { value: 'vinyl', label: 'Vinílico e LVT' },
  { value: 'laminate', label: 'Laminado' },
  { value: 'carpet', label: 'Carpete' }
]

interface EditImageFormProps {
  image: GalleryImage
  categories: { value: string; label: string }[]
  onSave: (data: any) => void
  onCancel: () => void
}

function EditImageForm({ image, categories, onSave, onCancel }: EditImageFormProps) {
  const [title, setTitle] = useState(image.title)
  const [description, setDescription] = useState(image.description || '')
  const [location, setLocation] = useState(image.location || '')
  const [category, setCategory] = useState(image.category || '')
  const [isActive, setIsActive] = useState(image.isActive)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      title,
      description: description || null,
      location: location || null,
      category: category || null,
      isActive
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Editar Imagem</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título *
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o título da imagem"
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
              placeholder="Digite uma descrição para a imagem"
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoria
            </label>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Selecione uma categoria</option>
              {categories
                .filter(cat => cat.value !== 'all')
                .map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="rounded"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
              Imagem ativa (visível na galeria)
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pré-visualização
            </label>
            <div className="aspect-video relative border rounded-lg overflow-hidden">
              <img
                src={image.imageUrl}
                alt={image.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <Button onClick={handleSubmit} className="flex-1">
          Salvar Alterações
        </Button>
        <Button variant="outline" onClick={onCancel} className="flex-1">
          Cancelar
        </Button>
      </div>
    </div>
  )
}

export default function GalleryManagement() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null)

  const fetchImages = async () => {
    try {
      const response = await fetch(`/api/gallery?category=${selectedCategory}`)
      const data = await response.json()
      setImages(data.images || [])
    } catch (error) {
      console.error('Error fetching images:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchImages()
  }, [selectedCategory])

  const handleDeleteImage = async (id: number) => {
    if (!confirm('Tem certeza que deseja remover esta imagem?')) return

    try {
      const response = await fetch(`/api/gallery?id=${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        alert('Imagem removida com sucesso!')
        fetchImages()
      } else {
        alert('Erro ao remover imagem')
      }
    } catch (error) {
      console.error('Error deleting image:', error)
      alert('Erro ao remover imagem')
    }
  }

  const handleUploadSuccess = () => {
    fetchImages()
    setShowUploadForm(false)
  }

  const handleEditImage = (image: GalleryImage) => {
    setEditingImage(image)
    setShowUploadForm(false)
  }

  const handleUpdateImage = async (updatedData: any) => {
    if (!editingImage) return

    try {
      const response = await fetch(`/api/gallery/${editingImage.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      })

      if (response.ok) {
        alert('Imagem atualizada com sucesso!')
        fetchImages()
        setEditingImage(null)
      } else {
        alert('Erro ao atualizar imagem')
      }
    } catch (error) {
      console.error('Error updating image:', error)
      alert('Erro ao atualizar imagem')
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Gerenciar Galeria</h1>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex gap-4 items-center">
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-48"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </Select>
            </div>
            <Button
              onClick={() => setShowUploadForm(!showUploadForm)}
              className="whitespace-nowrap"
            >
              {showUploadForm ? 'Fechar Formulário' : 'Adicionar Nova Imagem'}
            </Button>
          </div>
        </div>

        {showUploadForm && (
          <div className="mb-8">
            <GalleryUploadForm onUploadSuccess={handleUploadSuccess} />
          </div>
        )}

        {editingImage && (
          <div className="mb-8">
            <EditImageForm
              image={editingImage}
              categories={categories}
              onSave={handleUpdateImage}
              onCancel={() => setEditingImage(null)}
            />
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Imagens ({images.length})
            </h2>
          </div>

          {images.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">📷</div>
              <p className="text-lg">Nenhuma imagem encontrada</p>
              <p className="text-sm">Adicione algumas imagens à galeria para começar</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {images.map((image) => (
                <div key={image.id} className="border rounded-lg overflow-hidden bg-gray-50">
                  <div className="aspect-video relative">
                    <img
                      src={image.imageUrl}
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{image.title}</h3>
                    {image.location && (
                      <p className="text-sm text-blue-600 mb-2">{image.location}</p>
                    )}
                    {image.description && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {image.description}
                      </p>
                    )}
                    {image.category && (
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-3">
                        {categories.find(cat => cat.value === image.category)?.label || image.category}
                      </span>
                    )}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditImage(image)}
                        className="flex-1"
                      >
                        Editar
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteImage(image.id)}
                        className="flex-1"
                      >
                        Remover
                      </Button>
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