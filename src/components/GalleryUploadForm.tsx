'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'

interface GalleryUploadFormProps {
  onUploadSuccess?: (image: any) => void
}

const categories = [
  { value: '', label: 'Selecione uma categoria' },
  { value: 'hardwood', label: 'Madeira' },
  { value: 'tile', label: 'Cerâmica e Pedra' },
  { value: 'vinyl', label: 'Vinílico e LVT' },
  { value: 'laminate', label: 'Laminado' },
  { value: 'carpet', label: 'Carpete' }
]

export default function GalleryUploadForm({ onUploadSuccess }: GalleryUploadFormProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    category: '',
    file: null as File | null
  })
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, file }))
      
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.file || !formData.title) {
      alert('Por favor, selecione uma imagem e adicione um título.')
      return
    }

    setIsUploading(true)

    try {
      const uploadData = new FormData()
      uploadData.append('file', formData.file)
      uploadData.append('title', formData.title)
      uploadData.append('description', formData.description)
      uploadData.append('location', formData.location)
      uploadData.append('category', formData.category)

      const response = await fetch('/api/gallery/upload', {
        method: 'POST',
        body: uploadData,
      })

      const result = await response.json()

      if (response.ok) {
        alert('Imagem enviada com sucesso!')
        setFormData({
          title: '',
          description: '',
          location: '',
          category: '',
          file: null
        })
        setPreviewUrl(null)
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
      alert('Erro ao enviar imagem')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Adicionar Imagem à Galeria</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="file-input" className="block text-sm font-medium text-gray-700 mb-2">
            Imagem *
          </label>
          <Input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="cursor-pointer"
          />
          {previewUrl && (
            <div className="mt-4">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full max-w-md h-48 object-cover rounded-lg border"
              />
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
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            Localização
          </label>
          <Input
            id="location"
            type="text"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="Ex: Apartamento Centro, Casa Residencial"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Categoria
          </label>
          <Select
            id="category"
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={isUploading}
            className="flex-1"
          >
            {isUploading ? 'Enviando...' : 'Enviar Imagem'}
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setFormData({
                title: '',
                description: '',
                location: '',
                category: '',
                file: null
              })
              setPreviewUrl(null)
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