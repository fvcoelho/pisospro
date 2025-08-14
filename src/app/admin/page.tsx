'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface DashboardStats {
  gallery: {
    totalImages: number
    activeImages: number
    inactiveImages: number
  }
  analytics: {
    recentSessions: number
    totalSessions: number
    recentPageViews: number
    topPages: Array<{ page: string; visits: number }>
  }
  whatsapp: {
    activeConversations: number
    totalConversations: number
  }
  activity: {
    recentActivities: Array<{
      id: string
      page: string
      elementText?: string
      elementType?: string
      createdAt: string
      location?: string
      device?: string
      browser?: string
    }>
  }
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      const data = await response.json()
      
      if (data.success) {
        setStats(data.stats)
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const adminRoutes = [
    {
      title: 'Projetos',
      description: 'Gerenciar projetos do portfólio',
      href: '/admin/projects',
      icon: '🏗️',
      color: 'bg-gradient-to-r from-orange-500 to-orange-600',
      stat: null,
      statLabel: 'ver todos'
    },
    {
      title: 'Galeria',
      description: 'Gerenciar imagens da galeria',
      href: '/admin/gallery',
      icon: '🖼️',
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      stat: stats?.gallery.totalImages || 0,
      statLabel: 'imagens'
    },
    {
      title: 'Analytics',
      description: 'Visualizar dados de uso e sessões',
      href: '/admin/analytics',
      icon: '📊',
      color: 'bg-gradient-to-r from-green-500 to-green-600',
      stat: stats?.analytics.recentSessions || 0,
      statLabel: 'sessões (24h)'
    },
    {
      title: 'WhatsApp',
      description: 'Gerenciar conversas do WhatsApp',
      href: '/admin/whatsapp',
      icon: '💬',
      color: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
      stat: stats?.whatsapp.activeConversations || 0,
      statLabel: 'conversas ativas'
    },
    {
      title: 'Sessões Analytics',
      description: 'Visualizar todas as sessões de usuários',
      href: '/admin/analytics/sessions',
      icon: '👥',
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
      stat: null,
      statLabel: 'ver todas'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Painel Administrativo
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Gerencie todos os aspectos do sistema Pisos Pró
              </p>
            </div>
            <Link href="/">
              <Button variant="outline">
                ← Voltar ao Site
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats Overview */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Visão Geral - Últimas 24 Horas
          </h2>
          {loading ? (
            <div className="text-center py-8 text-gray-500">
              Carregando estatísticas...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <div className="text-2xl mr-3">🖼️</div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stats?.gallery.totalImages || 0}</p>
                    <p className="text-sm text-gray-500">Total de Imagens</p>
                    <p className="text-xs text-green-600 mt-1">{stats?.gallery.activeImages || 0} ativas</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <div className="text-2xl mr-3">📊</div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stats?.analytics.recentSessions || 0}</p>
                    <p className="text-sm text-gray-500">Sessões Recentes</p>
                    <p className="text-xs text-blue-600 mt-1">{stats?.analytics.recentPageViews || 0} visualizações</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <div className="text-2xl mr-3">💬</div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stats?.whatsapp.activeConversations || 0}</p>
                    <p className="text-sm text-gray-500">Conversas Ativas</p>
                    <p className="text-xs text-emerald-600 mt-1">{stats?.whatsapp.totalConversations || 0} total</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <div className="text-2xl mr-3">🎯</div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stats?.activity.recentActivities.length || 0}</p>
                    <p className="text-sm text-gray-500">Atividades Recentes</p>
                    <p className="text-xs text-purple-600 mt-1">ações do usuário</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Recent Activity Feed */}
        {stats?.activity.recentActivities.length && (
          <div className="mb-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Atividade Recente
              </h2>
              <div className="space-y-3">
                {stats.activity.recentActivities.slice(0, 5).map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {activity.elementText ? `"${activity.elementText}"` : activity.elementType || 'Interação'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {activity.page} • {activity.location && `${activity.location} • `}
                          {new Date(activity.createdAt).toLocaleString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    {activity.device && (
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                        {activity.device}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link href="/admin/analytics">
                  <Button variant="outline" size="sm">
                    Ver Todos os Dados
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Top Pages */}
        {stats?.analytics.topPages.length && (
          <div className="mb-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Páginas Mais Visitadas (24h)
              </h2>
              <div className="space-y-2">
                {stats.analytics.topPages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-700 w-6">
                        #{index + 1}
                      </span>
                      <span className="text-sm text-gray-900">
                        {page.page === '/' ? 'Página Inicial' : page.page}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-blue-600">
                      {page.visits} visitas
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Admin Routes Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Módulos Administrativos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {adminRoutes.map((route, index) => (
              <Link key={index} href={route.href}>
                <div className={`${route.color} rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 cursor-pointer`}>
                  <div className="p-6 text-white">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="text-3xl mr-3 opacity-90">
                            {route.icon}
                          </span>
                          <h3 className="text-xl font-bold">
                            {route.title}
                          </h3>
                        </div>
                        <p className="text-white/90 mb-4">
                          {route.description}
                        </p>
                        {route.stat !== null && (
                          <div className="flex items-center text-white/80">
                            <span className="text-2xl font-bold mr-2">
                              {route.stat}
                            </span>
                            <span className="text-sm">
                              {route.statLabel}
                            </span>
                          </div>
                        )}
                        {route.stat === null && (
                          <div className="text-white/80 text-sm">
                            {route.statLabel}
                          </div>
                        )}
                      </div>
                      <div className="text-white/60">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Ações Rápidas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Link href="/admin/gallery">
              <Button className="w-full" variant="outline">
                📷 Adicionar Nova Imagem
              </Button>
            </Link>
            <Link href="/admin/projects">
              <Button className="w-full" variant="outline">
                🏗️ Gerenciar Projetos
              </Button>
            </Link>
            <Link href="/admin/analytics">
              <Button className="w-full" variant="outline">
                📈 Ver Analytics Detalhado
              </Button>
            </Link>
            <Link href="/admin/whatsapp">
              <Button className="w-full" variant="outline">
                💬 Ver Conversas WhatsApp
              </Button>
            </Link>
            <Link href="/">
              <Button className="w-full" variant="outline">
                🌐 Visualizar Site
              </Button>
            </Link>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Pisos Pró Admin Dashboard - Versão 1.0</p>
          <p className="mt-1">
            Gerencie com facilidade todos os aspectos do seu negócio
          </p>
        </div>
      </div>
    </div>
  )
}