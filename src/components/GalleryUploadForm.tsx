'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'

interface Project {
  id: number
  title: string
  isActive: boolean
}

interface GalleryUploadFormProps {
  onUploadSuccess?: (image: any) => void
}


export default function GalleryUploadForm({ onUploadSuccess }: GalleryUploadFormProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [loadingProjects, setLoadingProjects] = useState(true)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    projectId: '',
    file: null as File | null
  })
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [fileType, setFileType] = useState<'image' | 'video' | null>(null)

  // Fetch projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects?status=active')
        const data = await response.json()
        setProjects(data.projects || [])
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoadingProjects(false)
      }
    }

    fetchProjects()
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, file }))
      
      // Determine file type
      const isVideo = file.type.startsWith('video/')
      const isImage = file.type.startsWith('image/')
      
      if (isVideo) {
        setFileType('video')
        setPreviewUrl(URL.createObjectURL(file))
      } else if (isImage) {
        setFileType('image')
        const reader = new FileReader()
        reader.onload = (e) => {
          setPreviewUrl(e.target?.result as string)
        }
        reader.readAsDataURL(file)
      } else {
        alert('Por favor, selecione apenas arquivos de imagem ou vídeo.')
        e.target.value = ''
        return
      }
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.file || !formData.title || !formData.projectId) {
      alert('Por favor, selecione uma mídia (imagem ou vídeo), adicione um título e escolha um projeto.')
      return
    }

    setIsUploading(true)

    try {
      const uploadData = new FormData()
      uploadData.append('file', formData.file)
      uploadData.append('title', formData.title)
      uploadData.append('description', formData.description)
      uploadData.append('location', '') // Keep empty for compatibility
      uploadData.append('category', '') // Keep empty for compatibility  
      uploadData.append('projectId', formData.projectId)

      const response = await fetch('/api/gallery/upload', {
        method: 'POST',
        body: uploadData,
      })

      const result = await response.json()

      if (response.ok) {
        alert('Mídia enviada com sucesso!')
        setFormData({
          title: '',
          description: '',
          projectId: '',
          file: null
        })
        setPreviewUrl(null)
        setFileType(null)
        onUploadSuccess?.(result.image)
        
        const fileInput = document.getElementById('file-input') as HTMLInputElement
        if (fileInput) {
          fileInput.value = ''
        }
      } else {
        alert(`Erro: ${result.error}`)
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Erro ao enviar mídia')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Adicionar Mídia à Galeria</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="file-input" className="block text-sm font-medium text-gray-700 mb-2">
            Imagem ou Vídeo *
          </label>
          <Input
            id="file-input"
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            required
            className="cursor-pointer"
          />
          <p className="text-xs text-gray-500 mt-1">
            Formatos suportados: Imagens (JPG, PNG, GIF, WebP) e Vídeos (MP4, WebM, MOV)
          </p>
          {previewUrl && (
            <div className="mt-4">
              {fileType === 'video' ? (
                <video
                  src={previewUrl}
                  controls
                  className="w-full max-w-md h-48 object-cover rounded-lg border"
                >
                  Seu navegador não suporta o elemento de vídeo.
                </video>
              ) : (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full max-w-md h-48 object-cover rounded-lg border"
                />
              )}
              <div className="mt-2 text-sm text-gray-600">
                <strong>Tipo:</strong> {fileType === 'video' ? 'Vídeo' : 'Imagem'}
                {formData.file && (
                  <>
                    {' • '}
                    <strong>Tamanho:</strong> {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Título *
          </label>
          <Input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Ex: Reforma de Cozinha Moderna"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Descrição
          </label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Descreva os detalhes do projeto..."
            rows={3}
          />
        </div>

        <div>
          <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-2">
            Projeto *
          </label>
          {loadingProjects ? (
            <div className="text-sm text-gray-500">Carregando projetos...</div>
          ) : (
            <Select
              id="project"
              value={formData.projectId}
              onChange={(e) => handleInputChange('projectId', e.target.value)}
              required
            >
              <option value="">Selecione um projeto</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id.toString()}>
                  {project.title}
                </option>
              ))}
            </Select>
          )}
        </div>

        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={isUploading}
            className="flex-1"
          >
            {isUploading ? 'Enviando...' : 'Enviar Mídia'}
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setFormData({
                title: '',
                description: '',
                projectId: '',
                file: null
              })
              setPreviewUrl(null)
              setFileType(null)
              const fileInput = document.getElementById('file-input') as HTMLInputElement
              if (fileInput) {
                fileInput.value = ''
              }
            }}
          >
            Limpar
          </Button>
        </div>
      </form>
    </div>
  )
}