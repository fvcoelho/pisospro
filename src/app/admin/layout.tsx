import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navigation Bar */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/admin" className="flex items-center space-x-2">
                <span className="text-xl font-bold text-gray-900">
                  🏠 Admin
                </span>
              </Link>
              
              <div className="hidden md:flex items-center space-x-4">
                <Link href="/admin/categorias">
                  <Button variant="ghost" size="sm">
                    📁 Categorias
                  </Button>
                </Link>
                <Link href="/admin/projects">
                  <Button variant="ghost" size="sm">
                    🏗️ Projetos
                  </Button>
                </Link>
                <Link href="/admin/gallery">
                  <Button variant="ghost" size="sm">
                    🖼️ Galeria
                  </Button>
                </Link>
                <Link href="/admin/analytics">
                  <Button variant="ghost" size="sm">
                    📊 Analytics
                  </Button>
                </Link>
                <Link href="/admin/whatsapp">
                  <Button variant="ghost" size="sm">
                    💬 WhatsApp
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" size="sm">
                  ← Site
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <main>
        {children}
      </main>
    </div>
  )
}