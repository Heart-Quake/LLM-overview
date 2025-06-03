# 🔧 Configuration des Variables d'Environnement

## Fichier .env.local requis

Créez un fichier `.env.local` dans le répertoire racine avec les variables suivantes :

```bash
# Base de données
DATABASE_URL="file:./dev.db"

# NextAuth.js - Authentification
NEXTAUTH_SECRET="your-secret-key-here-generate-a-random-string"
NEXTAUTH_URL="http://localhost:3000"

# OpenAI API - Obligatoire pour les tests LLM
# Obtenez votre clé sur : https://platform.openai.com/api-keys
OPENAI_API_KEY="sk-your-openai-api-key-here"

# Email (Optionnel - pour l'authentification par email)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_FROM="noreply@hubble.ai"
```

## Variables Obligatoires

### 🗄️ DATABASE_URL
- **Description** : URL de connexion à la base de données SQLite
- **Valeur par défaut** : `"file:./dev.db"`
- **Obligatoire** : ✅

### 🔐 NEXTAUTH_SECRET
- **Description** : Clé secrète pour NextAuth.js
- **Génération** : Utilisez `openssl rand -base64 32` ou un générateur en ligne
- **Obligatoire** : ✅

### 🌐 NEXTAUTH_URL
- **Description** : URL de base de l'application
- **Développement** : `"http://localhost:3000"`
- **Production** : Votre domaine de production
- **Obligatoire** : ✅

### 🤖 OPENAI_API_KEY
- **Description** : Clé API OpenAI pour les tests LLM
- **Obtention** : [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- **Format** : `sk-...`
- **Obligatoire** : ✅ (pour les fonctionnalités LLM)

## Variables Optionnelles

### 📧 Email (pour l'authentification par email)
- `EMAIL_SERVER_HOST` : Serveur SMTP (ex: smtp.gmail.com)
- `EMAIL_SERVER_PORT` : Port SMTP (ex: 587)
- `EMAIL_SERVER_USER` : Adresse email
- `EMAIL_SERVER_PASSWORD` : Mot de passe d'application
- `EMAIL_FROM` : Adresse email d'expédition

## Variables Futures

### 🔍 APIs de Recherche (prévues pour les prochaines versions)
```bash
# Bing Search API
BING_SEARCH_API_KEY="your-bing-search-api-key"

# Serper.dev API
SERPER_API_KEY="your-serper-api-key"
```

## 🚀 Démarrage Rapide

1. **Copiez le template** :
   ```bash
   cp ENVIRONMENT.md .env.local
   ```

2. **Modifiez les valeurs** dans `.env.local`

3. **Générez NEXTAUTH_SECRET** :
   ```bash
   openssl rand -base64 32
   ```

4. **Obtenez votre clé OpenAI** sur [platform.openai.com](https://platform.openai.com/api-keys)

5. **Lancez l'application** :
   ```bash
   npm run dev
   ```

## 🔒 Sécurité

- ⚠️ **Jamais de commit** de `.env.local` dans Git
- 🔄 **Rotation régulière** des clés API
- 🛡️ **Permissions minimales** pour les clés API
- 📝 **Documentation** des accès en équipe 