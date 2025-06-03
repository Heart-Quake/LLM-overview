# 🔍 Hubble AI Monitor - Suivi de Visibilité IA

**Application de surveillance de votre présence dans les réponses des modèles d'IA (ChatGPT, Claude, Gemini, etc.)**

## 🎯 Vue d'Ensemble

Hubble AI Monitor vous permet de **suivre et analyser** votre visibilité dans les réponses générées par les principaux modèles d'IA, offrant des insights précieux sur votre positionnement numérique dans l'écosystème IA.

## ✨ Fonctionnalités Principales

### 📊 **Dashboard Complet**
- **Score de visibilité** global avec tendances
- **Métriques KPI** : mentions, position moyenne, évolution
- **Graphiques interactifs** pour visualiser les performances
- **Tooltips intelligents** avec positionnement automatique

### 📈 **Suivi de Croissance**
- Évolution temporelle de votre visibilité
- Objectifs personnalisables avec suivi de progression
- Jalons et étapes importantes
- Métriques de performance détaillées

### 👥 **Monitoring Concurrentiel**
- Surveillance temps réel de votre marque vs concurrents
- Alertes automatiques sur les changements importants
- Classements et comparaisons de performance
- Analyse de part de voix

### 🌐 **Analyse des Sources**
- Identification des sites/articles cités par les IA
- Scoring de fiabilité et d'autorité des sources
- Détection de sources problématiques
- Recommandations d'optimisation

## 🚀 Démarrage Rapide

### **Prérequis**
- Node.js 18+ et npm
- Clé API OpenAI (pour les tests LLM)

### **Installation**

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer l'environnement
cp .env.local.example .env.local
# Ajouter votre OPENAI_API_KEY dans .env.local

# 3. Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur **http://localhost:3000**

### **Production**

```bash
# Construire l'application
npm run build

# Lancer en production
npm start
```

## 📁 Structure du Projet

```
LLM overview/
├── src/
│   ├── app/                    # Pages Next.js App Router
│   │   ├── (dashboard)/        # Groupement dashboard
│   │   │   ├── dashboard/      # Page d'accueil
│   │   │   ├── growth/         # Suivi croissance
│   │   │   ├── monitoring/     # Surveillance marques
│   │   │   ├── sources/        # Analyse sources
│   │   │   ├── competitors/    # Analyse concurrentielle
│   │   │   └── settings/       # Configuration
│   │   ├── api/               # API routes
│   │   └── auth/              # Authentification
│   ├── components/
│   │   ├── ui/                # Composants UI réutilisables
│   │   ├── features/          # Composants métier
│   │   └── layout/            # Composants de mise en page
│   └── lib/                   # Utilitaires et configuration
├── public/                    # Assets statiques
├── prisma/                    # Schema base de données
└── docs/                     # Documentation complète
```

## 🎨 Système de Design

### **Tooltips Standardisés**
- `size="lg"` (20px) : Titres H1 principaux
- `size="md"` (16px) : Sections H2/H3 (défaut)
- `size="sm"` (12px) : Métriques KPI et formulaires

### **Couleurs Contextuelles**
- Bleu (`text-blue-600`) : Métriques primaires
- Vert (`text-green-600`) : Métriques positives  
- Violet (`text-purple-600`) : Métriques spécialisées
- Gris (`text-gray-400`) : Métriques neutres

## 🔧 Configuration

### **Variables d'Environnement (.env.local)**
```bash
# Base de données
DATABASE_URL="file:./dev.db"

# NextAuth.js
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# OpenAI API (obligatoire pour tests LLM)
OPENAI_API_KEY="sk-your-openai-api-key"

# Email (optionnel)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT=587
EMAIL_FROM="noreply@hubble.ai"
```

## 📚 Documentation

- **[GUIDE_TEST_COMPLET.md](./GUIDE_TEST_COMPLET.md)** - Guide de test complet
- **[TOOLTIP_SIZE_GUIDE.md](./TOOLTIP_SIZE_GUIDE.md)** - Guide des tailles d'icônes
- **[ENVIRONMENT.md](./ENVIRONMENT.md)** - Configuration environnement
- **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Résolution de problèmes

## 🛠️ Scripts Disponibles

```bash
npm run dev          # Développement
npm run build        # Construction production
npm start            # Lancement production
npm run lint         # Linting ESLint
npm run type-check   # Vérification TypeScript
```

## 🔍 Fonctionnalités Avancées

### **Testeur LLM Intégré**
- Interface de test en temps réel
- Support multi-modèles (ChatGPT, Claude, Gemini)
- Analyse automatique des mentions
- Détection de position dans les réponses

### **Système d'Alertes**
- Notifications automatiques
- Seuils configurables
- Alertes concurrentielles
- Détection d'anomalies

### **Analytics Avancés**
- Tendances temporelles
- Corrélations de données
- Prédictions de performance
- Rapports exportables

## 🎯 Roadmap

- [ ] **API REST complète** pour intégrations externes
- [ ] **Webhooks** pour notifications temps réel
- [ ] **Multi-langues** (EN/FR/ES)
- [ ] **Mobile app** React Native
- [ ] **Extensions navigateur** pour capture automatique
- [ ] **IA personnalisée** pour insights prédictifs

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalité`)
3. Commiter les changements (`git commit -am 'Ajout nouvelle fonctionnalité'`)
4. Pusher la branche (`git push origin feature/nouvelle-fonctionnalité`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

- **Issues GitHub** : Pour les bugs et demandes de fonctionnalités
- **Documentation** : Consultez les fichiers markdown dans `/docs`
- **Email** : support@hubble-ai.com

---

**Développé avec ❤️ pour améliorer votre visibilité dans l'écosystème IA**
