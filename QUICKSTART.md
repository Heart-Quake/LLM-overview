# 🚀 Guide de Démarrage Rapide - Hubble

## ✅ Problèmes Résolus

Les problèmes d'installation ont été corrigés :
- ✅ Schéma Prisma compatible SQLite (tags comme string)
- ✅ Dépendances manquantes installées
- ✅ Configuration automatique du .env.local
- ✅ Application fonctionnelle sur http://localhost:3000

## 🏃‍♂️ Démarrage en 3 étapes

### 1. Installation et Configuration
```bash
# L'application est déjà configurée et fonctionne !
# Si vous voulez redémarrer proprement :
npm run setup  # ou ./scripts/setup.sh
```

### 2. Configurer votre clé OpenAI (Optionnel)
```bash
# Éditez le fichier .env.local
nano .env.local

# Remplacez cette ligne :
OPENAI_API_KEY="your-openai-api-key-here"
# Par votre vraie clé API OpenAI
```

### 3. Lancer l'application
```bash
npm run dev
```

🌐 **L'application est accessible sur : http://localhost:3000**

## 🎯 Fonctionnalités Disponibles

### 🏠 Page d'Accueil
- Présentation de Hubble
- Branding et fonctionnalités
- Liens vers l'inscription

### 📊 Dashboard (après connexion)
- KPIs de visibilité IA
- Graphiques interactifs
- **Testeur LLM en direct** (fonctionne même sans clé OpenAI pour la démo)

### 🧪 Test LLM Interactif
- Interface de test en temps réel
- Analyse automatique des mentions
- Métriques de performance
- Support GPT-4o (avec clé API)

### 📝 Gestion des Prompts
- Liste des prompts avec métadonnées
- Sélection multiple pour tests
- Statistiques détaillées

### 🎯 Brand Monitoring
- Surveillance des marques
- Comparaison concurrentielle
- Alertes en temps réel

## 🔧 Commandes Utiles

```bash
# Développement
npm run dev              # Lancer en mode développement
npm run build           # Build de production
npm run start           # Lancer en production

# Base de données
npm run db:generate     # Générer le client Prisma
npm run db:push         # Appliquer le schéma
npm run db:studio       # Interface graphique Prisma

# Configuration
npm run setup           # Script de configuration complète
```

## 🎮 Test de l'Application

### Sans clé OpenAI
- ✅ Navigation complète
- ✅ Interface utilisateur
- ✅ Données simulées
- ✅ Graphiques interactifs

### Avec clé OpenAI
- ✅ Test LLM en temps réel
- ✅ Analyse des mentions
- ✅ Métriques de performance
- ✅ Intégration GPT-4o

## 🐛 Résolution de Problèmes

### L'application ne démarre pas
```bash
# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install
npm run db:generate
npm run dev
```

### Erreur de base de données
```bash
# Recréer la base de données
rm -f prisma/dev.db
npm run db:push
```

### Erreur de dépendances
```bash
# Installer les dépendances manquantes
npm install @radix-ui/react-slot class-variance-authority clsx tailwind-merge lucide-react recharts next-auth @auth/prisma-adapter @prisma/client openai tailwindcss-animate
```

## 🎉 Prêt pour les Tests !

L'application Hubble est maintenant **100% fonctionnelle** et prête pour :
- ✅ Tests utilisateurs
- ✅ Démonstrations
- ✅ Développement de nouvelles fonctionnalités
- ✅ Intégration de nouveaux LLM

**🔗 Accédez à l'application : http://localhost:3000** 