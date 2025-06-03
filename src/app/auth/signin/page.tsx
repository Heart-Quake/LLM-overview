"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Telescope } from "lucide-react"
import Link from "next/link"

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Telescope className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Hubble</span>
          </div>
          <CardTitle>Connexion</CardTitle>
          <CardDescription>
            Accédez à votre dashboard de surveillance IA
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">
              Mode développement - Authentification simplifiée
            </p>
            <Link href="/dashboard">
              <Button className="w-full">
                Accéder au Dashboard
              </Button>
            </Link>
          </div>
          
          <div className="text-center">
            <p className="text-xs text-gray-500">
              En mode production, l'authentification par email sera activée
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 