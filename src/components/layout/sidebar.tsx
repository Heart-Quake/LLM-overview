"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  BarChart3, 
  MessageSquare, 
  Monitor, 
  TrendingUp, 
  Users, 
  Globe,
  Settings,
  Telescope 
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Prompts", href: "/prompts", icon: MessageSquare },
  { name: "Brand Monitoring", href: "/monitoring", icon: Monitor },
  { name: "Concurrents", href: "/competitors", icon: Users },
  { name: "Croissance", href: "/growth", icon: TrendingUp },
  { name: "Sources", href: "/sources", icon: Globe },
  { name: "Paramètres", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-gray-200">
        <Link href="/" className="flex items-center space-x-2">
          <Telescope className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">Hubble</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          <p>Hubble v1.0</p>
          <p>Surveillance IA</p>
        </div>
      </div>
    </div>
  )
} 