"use client"

import { Button } from "@/components/ui/button"
import { Bell, User, LogOut } from "lucide-react"

export default function Header() {
  // Mode développement - session simulée
  const mockUser = {
    name: "Utilisateur Demo",
    email: "demo@hubble.ai"
  }

  return (
    <header className="border-b bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Monitoring IA
          </h1>
          <p className="text-sm text-gray-600">
            Suivez la visibilité de votre marque dans les réponses IA
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>

          {/* User menu */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                <User className="h-4 w-4 text-gray-600" />
              </div>
              <div className="text-sm">
                <p className="font-medium text-gray-900">
                  {mockUser.name}
                </p>
                <p className="text-gray-500">
                  {mockUser.email}
                </p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.location.href = '/'}
              title="Se déconnecter"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export { Header } 