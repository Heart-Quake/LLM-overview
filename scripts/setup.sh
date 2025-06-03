#!/bin/bash

echo "🔭 Configuration de Hubble - Surveillance de Visibilité IA"
echo "========================================================="

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez installer Node.js 18+ avant de continuer."
    exit 1
fi

echo "✅ Node.js détecté: $(node --version)"

# Nettoyer les modules existants si nécessaire
if [ -d "node_modules" ]; then
    echo "🧹 Nettoyage des modules existants..."
    rm -rf node_modules package-lock.json
fi

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm install --no-optional

# Vérifier le fichier .env.local
if [ ! -f ".env.local" ]; then
    echo "⚠️  Fichier .env.local manquant"
    echo "📝 Création du fichier .env.local..."
    cat > .env.local << 'EOF'
# Database
DATABASE_URL="file:./dev.db"

# NextAuth.js
NEXTAUTH_SECRET="your-secret-key-here-change-this-in-production"
NEXTAUTH_URL="http://localhost:3000"

# OpenAI API
OPENAI_API_KEY="your-openai-api-key-here"

# Email (optionnel)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_FROM="noreply@hubble.ai"
EOF
    
    echo "📝 Fichier .env.local créé avec des valeurs par défaut"
    echo "🔑 N'oubliez pas d'ajouter votre clé API OpenAI !"
fi

# Générer le client Prisma
echo "🗄️ Configuration de la base de données..."
npx prisma generate

# Créer la base de données
echo "🔧 Création de la base de données..."
npx prisma db push

echo ""
echo "🎉 Configuration terminée !"
echo ""
echo "🚀 Pour démarrer l'application :"
echo "   npm run dev"
echo ""
echo "🌐 L'application sera disponible sur http://localhost:3000"
echo ""
echo "📚 Consultez le README.md pour plus d'informations" 