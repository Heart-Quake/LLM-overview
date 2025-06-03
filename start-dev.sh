#!/bin/bash

echo "🔭 Démarrage de Hubble en mode développement..."

# Tuer les processus Next.js existants
pkill -f "next dev" 2>/dev/null || true

# Attendre un peu
sleep 2

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "package.json" ]; then
    echo "❌ Erreur: package.json non trouvé. Assurez-vous d'être dans le répertoire hubble-ai-monitor"
    exit 1
fi

# Installer les dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
fi

# Générer Prisma si nécessaire
if [ ! -f "node_modules/.prisma/client/index.js" ]; then
    echo "🗄️ Génération du client Prisma..."
    npx prisma generate
fi

# Démarrer l'application
echo "🚀 Démarrage de l'application sur http://localhost:3000"
npm run dev 