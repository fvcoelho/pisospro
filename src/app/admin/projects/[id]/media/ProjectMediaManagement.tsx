'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'

interface ProjectMedia {
  id: number
  title: string
  description: string | null
  mediaUrl: string
  mediaType: 'IMAGE' | 'VIDEO'
  displayOrder: number
  fileSize: number | null
  duration: number | null
  isCover: boolean
  createdAt: string
}

interface Project {
  id: number
  title: string
  description: string | null
  location: string | null
}

const MAX_MEDIA_PER_PROJECT = 10
const MAX_IMAGE_SIZE = 10 * 1024 * 1024 // 10MB
const MAX_VIDEO_SIZE = 50 * 1024 * 1024 // 50MB

interface MediaUploadFormProps {
  projectId: number
  mediaCount: number
  onUploadSuccess: () => void
}

function MediaUploadForm({ projectId, mediaCount, onUploadSuccess }: MediaUploadFormProps) {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const canUpload = mediaCount < MAX_MEDIA_PER_PROJECT

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    const files = e.dataTransfer.files
    if (files && files[0]) {
      setFile(files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const getFileValidation = (file: File) => {
    const isImage = file.type.startsWith('image/')
    const isVideo = file.type.startsWith('video/')
    const maxSize = isImage ? MAX_IMAGE_SIZE : MAX_VIDEO_SIZE
    const allowedTypes = isImage 
      ? ['image/jpeg', 'image/png', 'image/webp']
      : ['video/mp4', 'video/webm', 'video/mov']

    if (!isImage && !isVideo) {
      return 'Apenas imagens e vídeos são permitidos'
    }

    if (!allowedTypes.includes(file.type)) {
      return `Tipo não permitido. Tipos aceitos: ${allowedTypes.join(', ')}`
    }

    if (file.size > maxSize) {
      return `Arquivo muito grande. Tamanho máximo: ${maxSize / 1024 / 1024}MB`
    }

    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!file || !title || !canUpload) return

    const validation = getFileValidation(file)
    if (validation) {
      alert(validation)
      return
    }

    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('title', title)
      formData.append('description', description)

      const response = await fetch(`/api/projects/${projectId}/media/upload`, {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        alert('Mídia carregada com sucesso!')
        setFile(null)
        setTitle('')
        setDescription('')
        onUploadSuccess()
      } else {
        alert(`Erro no upload: ${data.error}`)
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Erro no upload da mídia')
    } finally {
      setUploading(false)
    }
  }

  if (!canUpload) {
    return (
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-center">
        <div className="text-orange-600 mb-2">Limite de mídias atingido</div>
        <p className="text-sm text-orange-700">
          Este projeto já possui {mediaCount} de {MAX_MEDIA_PER_PROJECT} mídias permitidas.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Adicionar Nova Mídia</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Arquivo (Imagem ou Vídeo) *
          </label>
          <div 
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              dragActive ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={() => setDragActive(true)}
            onDragLeave={() => setDragActive(false)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            {file ? (
              <div>
                <div className="flex items-center justify-center mb-2">
                  {file.type.startsWith('image/') ? (
                    <img 
                      src={URL.createObjectURL(file)} 
                      alt="Preview" 
                      className="h-20 w-20 object-cover rounded"
                    />
                  ) : (
                    <div className="h-20 w-20 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-2xl">🎥</span>
                    </div>
                  )}
                </div>
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)}MB
                </p>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="text-red-600 text-sm hover:underline mt-2"
                >
                  Remover
                </button>
              </div>
            ) : (
              <div>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="media-upload"
                />
                <label 
                  htmlFor="media-upload"
                  className="cursor-pointer"
                >
                  <div className="text-6xl mb-4">📎</div>
                  <p className="text-lg font-medium mb-2">
                    Clique para selecionar ou arraste aqui
                  </p>
                  <p className="text-sm text-gray-500">
                    Imagens: JPG, PNG, WebP (máx. 10MB)<br/>
                    Vídeos: MP4, WebM, MOV (máx. 50MB)
                  </p>
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Título *
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite o título da mídia"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descrição
          </label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Digite uma descrição para a mídia (opcional)"
            rows={3}
          />
        </div>

        <Button 
          type="submit" 
          disabled={!file || !title || uploading}
          className="w-full"
        >
          {uploading ? 'Carregando...' : 'Carregar Mídia'}
        </Button>
      </form>
    </div>
  )
}

interface EditMediaFormProps {
  media: ProjectMedia
  onSave: (data: any) => void
  onCancel: () => void
}

function EditMediaForm({ media, onSave, onCancel }: EditMediaFormProps) {
  const [title, setTitle] = useState(media.title)
  const [description, setDescription] = useState(media.description || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ title, description: description || null })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Editar Mídia</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título *
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o título da mídia"
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
              placeholder="Digite uma descrição para a mídia"
              rows={3}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pré-visualização
            </label>
            <div className="aspect-video relative border rounded-lg overflow-hidden">
              {media.mediaType === 'IMAGE' ? (
                <img
                  src={media.mediaUrl}
                  alt={media.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={media.mediaUrl}
                  className="w-full h-full object-cover"
                  controls
                />
              )}
            </div>
            <div className="text-xs text-gray-500 mt-2">
              {media.mediaType} • {media.fileSize ? `${(media.fileSize / 1024 / 1024).toFixed(2)}MB` : 'Tamanho desconhecido'}
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

export default function ProjectMediaManagement({ projectId }: { projectId: number }) {
  const [project, setProject] = useState<Project | null>(null)
  const [media, setMedia] = useState<ProjectMedia[]>([])
  const [loading, setLoading] = useState(true)
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [editingMedia, setEditingMedia] = useState<ProjectMedia | null>(null)

  const fetchProject = async () => {
    // Mock project data for now
    setProject({
      id: projectId,
      title: projectId === 1 ? 'Reforma de Cozinha Moderna' : 'Instalação de Madeira de Luxo',
      description: projectId === 1 
        ? 'Reforma completa do piso da cozinha com porcelanato premium'
        : 'Bela instalação de piso de carvalho maciço',
      location: projectId === 1 ? 'Apart. Centro' : 'Casa Residencial'
    })
  }

  const fetchMedia = async () => {
    try {
      const response = await fetch(`/api/projects/${projectId}/media`)
      const data = await response.json()
      
      if (data.success) {
        setMedia(data.media || [])
      }
    } catch (error) {
      console.error('Error fetching project media:', error)
      setMedia([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProject()
    fetchMedia()
  }, [projectId])

  const handleDeleteMedia = async (mediaId: number) => {
    if (!confirm('Tem certeza que deseja remover esta mídia?')) return

    try {
      const response = await fetch(`/api/projects/${projectId}/media/${mediaId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        alert('Mídia removida com sucesso!')
        fetchMedia()
      } else {
        alert('Erro ao remover mídia')
      }
    } catch (error) {
      console.error('Error deleting media:', error)
      alert('Erro ao remover mídia')
    }
  }

  const handleUploadSuccess = () => {
    fetchMedia()
    setShowUploadForm(false)
  }

  const handleEditMedia = (mediaItem: ProjectMedia) => {
    setEditingMedia(mediaItem)
    setShowUploadForm(false)
  }

  const handleUpdateMedia = async (updatedData: any) => {
    if (!editingMedia) return

    try {
      const response = await fetch(`/api/projects/${projectId}/media/${editingMedia.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      })

      if (response.ok) {
        alert('Mídia atualizada com sucesso!')
        fetchMedia()
        setEditingMedia(null)
      } else {
        alert('Erro ao atualizar mídia')
      }
    } catch (error) {
      console.error('Error updating media:', error)
      alert('Erro ao atualizar mídia')
    }
  }

  const handleSetCover = async (mediaId: number, isCover: boolean) => {
    try {
      const response = await fetch(`/api/projects/${projectId}/media/${mediaId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isCover }),
      })

      if (response.ok) {
        alert(isCover ? 'Mídia definida como capa!' : 'Capa removida!')
        fetchMedia()
      } else {
        alert('Erro ao atualizar capa')
      }
    } catch (error) {
      console.error('Error updating cover:', error)
      alert('Erro ao atualizar capa')
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
          <div className="flex items-center gap-4 mb-4">
            <Link 
              href="/admin/projects"
              className="text-blue-600 hover:text-blue-800"
            >
              ← Voltar para Projetos
            </Link>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {project?.title || `Projeto ${projectId}`}
          </h1>
          <p className="text-gray-600">
            Gerencie as mídias (imagens e vídeos) deste projeto • {media.length}/{MAX_MEDIA_PER_PROJECT} mídias
          </p>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <Button
              onClick={() => setShowUploadForm(!showUploadForm)}
              disabled={media.length >= MAX_MEDIA_PER_PROJECT}
              className="whitespace-nowrap"
            >
              {showUploadForm ? 'Fechar Formulário' : 'Adicionar Nova Mídia'}
            </Button>
          </div>

          {showUploadForm && (
            <MediaUploadForm
              projectId={projectId}
              mediaCount={media.length}
              onUploadSuccess={handleUploadSuccess}
            />
          )}

          {editingMedia && (
            <EditMediaForm
              media={editingMedia}
              onSave={handleUpdateMedia}
              onCancel={() => setEditingMedia(null)}
            />
          )}

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Mídias do Projeto ({media.length})
              </h2>
            </div>

            {media.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <div className="text-6xl mb-4">📷</div>
                <p className="text-lg">Nenhuma mídia encontrada</p>
                <p className="text-sm">Adicione algumas mídias ao projeto para começar</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {media.map((mediaItem) => (
                  <div key={mediaItem.id} className="border rounded-lg overflow-hidden bg-gray-50">
                    <div className="aspect-video relative">
                      {mediaItem.mediaType === 'IMAGE' ? (
                        <img
                          src={mediaItem.mediaUrl}
                          alt={mediaItem.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <video
                          src={mediaItem.mediaUrl}
                          className="w-full h-full object-cover"
                          controls
                        />
                      )}
                      <div className="absolute top-2 right-2 flex gap-2">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          mediaItem.mediaType === 'IMAGE' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {mediaItem.mediaType}
                        </span>
                        {mediaItem.isCover && (
                          <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                            CAPA
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1">{mediaItem.title}</h3>
                      {mediaItem.description && (
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {mediaItem.description}
                        </p>
                      )}
                      <div className="text-xs text-gray-500 mb-3">
                        {mediaItem.fileSize && `${(mediaItem.fileSize / 1024 / 1024).toFixed(2)}MB`}
                        {mediaItem.duration && ` • ${mediaItem.duration}s`}
                      </div>
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditMedia(mediaItem)}
                            className="flex-1"
                          >
                            Editar
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteMedia(mediaItem.id)}
                            className="flex-1"
                          >
                            Remover
                          </Button>
                        </div>
                        <Button
                          variant={mediaItem.isCover ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleSetCover(mediaItem.id, !mediaItem.isCover)}
                          className="w-full"
                        >
                          {mediaItem.isCover ? '✓ Capa do Projeto' : 'Definir como Capa'}
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
    </div>
  )
}