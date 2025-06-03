import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Telescope, BarChart3, Monitor, TrendingUp, Users, MessageSquare } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Telescope className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Hubble</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/signin">
                <Button variant="ghost">Se connecter</Button>
              </Link>
              <Link href="/auth/signin">
                <Button>Commencer</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Surveillez votre visibilité dans l'ère de l'IA
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Hubble vous permet de suivre la visibilité de votre marque dans les réponses 
            générées par les IA comme ChatGPT, Claude, Perplexity et Gemini. 
            Analysez votre part de voix, surveillez vos concurrents et optimisez votre présence IA.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/auth/signin">
              <Button size="lg" className="px-8">
                Démarrer gratuitement
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-8">
              Voir la démo
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Fonctionnalités clés
          </h2>
          <p className="text-lg text-gray-600">
            Tout ce dont vous avez besoin pour surveiller votre présence IA
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Monitor className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>Monitoring en temps réel</CardTitle>
              <CardDescription>
                Surveillez automatiquement les mentions de votre marque dans les réponses IA
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle>Analyse de performance</CardTitle>
              <CardDescription>
                Mesurez votre score de visibilité et suivez vos KPIs dans le temps
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-10 w-10 text-purple-600 mb-2" />
              <CardTitle>Benchmark concurrentiel</CardTitle>
              <CardDescription>
                Comparez votre visibilité avec celle de vos concurrents
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <MessageSquare className="h-10 w-10 text-orange-600 mb-2" />
              <CardTitle>Gestion des prompts</CardTitle>
              <CardDescription>
                Créez et gérez vos prompts de test pour une surveillance ciblée
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="h-10 w-10 text-red-600 mb-2" />
              <CardTitle>Suivi de croissance</CardTitle>
              <CardDescription>
                Visualisez l'évolution de votre visibilité avec des graphiques détaillés
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Telescope className="h-10 w-10 text-indigo-600 mb-2" />
              <CardTitle>Multi-LLM</CardTitle>
              <CardDescription>
                Support de ChatGPT, Claude, Gemini, Perplexity et plus encore
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à surveiller votre visibilité IA ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Rejoignez les entreprises qui utilisent déjà Hubble pour optimiser leur présence IA
          </p>
          <Link href="/auth/signin">
            <Button size="lg" variant="secondary" className="px-8">
              Commencer maintenant
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Telescope className="h-6 w-6 text-blue-400" />
              <span className="text-lg font-bold text-white">Hubble</span>
            </div>
            <p className="text-gray-400">
              © 2024 Hubble. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
