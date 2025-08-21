'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface Category {
  id: number
  name: string
  description: string | null
  slug: string
  imageUrl: string | null
  createdAt: string
  updatedAt: string
  _count?: {
    products: number
  }
}

interface CategoryFormProps {
  category?: Category | null
  onSave: (data: any) => void
  onCancel: () => void
}

function CategoryForm({ category, onSave, onCancel }: CategoryFormProps) {
  const [name, setName] = useState(category?.name || '')
  const [description, setDescription] = useState(category?.description || '')
  const [slug, setSlug] = useState(category?.slug || '')
  const [imageUrl, setImageUrl] = useState(category?.imageUrl || '')

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleNameChange = (value: string) => {
    setName(value)
    if (!category) {
      setSlug(generateSlug(value))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name || !slug) {
      alert('Nome e slug são obrigatórios')
      return
    }

    onSave({
      name,
      description: description || null,
      slug,
      imageUrl: imageUrl || null
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {category ? 'Editar Categoria' : 'Nova Categoria'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome *
          </label>
          <Input
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Ex: Pisos de Madeira"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Slug *
          </label>
          <Input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Ex: pisos-de-madeira"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            URL amigável para a categoria (usado em links)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descrição
          </label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrição da categoria"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            URL da Imagem
          </label>
          <Input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://exemplo.com/imagem.jpg"
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit" className="flex-1">
            {category ? 'Salvar Alterações' : 'Criar Categoria'}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  )
}

export default function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(data.categories || [])
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleCreateCategory = async (data: any) => {
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        alert('Categoria criada com sucesso!')
        fetchCategories()
        setShowForm(false)
      } else {
        const error = await response.json()
        alert(error.message || 'Erro ao criar categoria')
      }
    } catch (error) {
      console.error('Error creating category:', error)
      alert('Erro ao criar categoria')
    }
  }

  const handleUpdateCategory = async (data: any) => {
    if (!editingCategory) return

    try {
      const response = await fetch(`/api/categories/${editingCategory.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        alert('Categoria atualizada com sucesso!')
        fetchCategories()
        setEditingCategory(null)
      } else {
        const error = await response.json()
        alert(error.message || 'Erro ao atualizar categoria')
      }
    } catch (error) {
      console.error('Error updating category:', error)
      alert('Erro ao atualizar categoria')
    }
  }

  const handleDeleteCategory = async (id: number) => {
    if (!confirm('Tem certeza que deseja remover esta categoria? Isso removerá todos os produtos associados.')) return

    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        alert('Categoria removida com sucesso!')
        fetchCategories()
      } else {
        const error = await response.json()
        alert(error.message || 'Erro ao remover categoria')
      }
    } catch (error) {
      console.error('Error deleting category:', error)
      alert('Erro ao remover categoria')
    }
  }

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category)
    setShowForm(false)
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Gerenciar Categorias</h1>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">
              Gerencie as categorias de produtos do seu catálogo
            </p>
            <Button
              onClick={() => {
                setShowForm(!showForm)
                setEditingCategory(null)
              }}
              className="whitespace-nowrap"
            >
              {showForm ? 'Fechar Formulário' : '+ Nova Categoria'}
            </Button>
          </div>
        </div>

        {showForm && (
          <div className="mb-8">
            <CategoryForm
              onSave={handleCreateCategory}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        {editingCategory && (
          <div className="mb-8">
            <CategoryForm
              category={editingCategory}
              onSave={handleUpdateCategory}
              onCancel={() => setEditingCategory(null)}
            />
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Categorias ({categories.length})
            </h2>
          </div>

          {categories.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">📁</div>
              <p className="text-lg">Nenhuma categoria encontrada</p>
              <p className="text-sm">Crie sua primeira categoria para organizar os produtos</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Nome</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Slug</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Descrição</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Produtos</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          {category.imageUrl && (
                            <img
                              src={category.imageUrl}
                              alt={category.name}
                              className="w-10 h-10 rounded object-cover"
                            />
                          )}
                          <span className="font-medium text-gray-900">{category.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{category.slug}</td>
                      <td className="py-3 px-4 text-gray-600">
                        <span className="line-clamp-2">{category.description || '-'}</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {category._count?.products || 0}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2 justify-center">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditCategory(category)}
                          >
                            Editar
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteCategory(category.id)}
                          >
                            Remover
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}