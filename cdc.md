# 📘 Cahier des charges – Application Web Hubble

## 🎯 Objectif principal

Hubble est une application SaaS permettant de **mesurer, analyser et optimiser la visibilité d’une marque dans les réponses générées par les IA conversationnelles** (ChatGPT, Claude, Gemini, Perplexity, etc.). L’outil suit la part de voix, les citations, le sentiment, les concurrents, et les sources influentes pour piloter une stratégie AEO (Answer Engine Optimization).

---

## 🧩 Modules fonctionnels

### 1. 🌟 Dashboard central
- Score de visibilité global
- Évolution temporelle (SOV)
- Classement des concurrents
- Sentiment global
- Alertes de variation

### 2. 🧭 Brand Monitoring
- Mentions de la marque dans les réponses IA
- Analyse de sentiment (positif / neutre / négatif)
- Classement implicite dans la réponse
- Support multi-produits
- Historique des performances

### 3. 🥇 Competitor Rank
- Part de voix concurrentielle
- Identification de challengers
- Graphiques inter-LLM
- Classement dynamique

### 4. 📍 Prompt Tracking
- Ajout manuel de prompts
- Génération auto longue traîne
- Taggage thématique (TOFU, MOFU, BOFU)
- Export CSV

### 5. 🔗 Source Analysis
- Extraction des URLs citées
- Classement des sources
- Catégorisation : blog / forum / presse
- Alerte sur sources non contrôlées

### 6. 📈 Growth Tracker
- Score de visibilité semaine par semaine
- Attribution du gain par produit / prompt
- Visualisation par segment

---

## 🧪 Fonctionnalités avancées

### 7. 🔍 Approche RAG (Recherche Web + LLM)
- Appel Bing/Serper/Brave API
- Injection des snippets dans le prompt
- Réponse ancrée dans les sources
- Affichage des sources utilisées

### 8. 💫 Prompt Variation Engine
- Génération automatique de 3-5 variantes
- Score de visibilité moyen cross-variation
- Analyse des formulations les plus robustes

### 9. 🧶 Benchmark multi-LLM
- Interrogation synchronisée (GPT-4o, Claude, Gemini…)
- Score de robustesse = % de LLMs citant la marque
- Comparateur visuel prompt x LLM x marque

### 10. 🔄 Intégration Google Search Console
- Connexion OAuth
- Import des top requêtes SEO
- Comparaison SEO vs IA
- Identification des gaps SEO / IA

### 11. 🧠 Recommandation AEO (IA)
- Conseils d’intentions à viser
- Pages manquantes
- Optimisations entité / contenu
- Génération de brief SEO automatique (option)

### 12. 🕸 Graphe d’entités
- Extraction des entités dans les réponses
- Visualisation du graphe
- Cooccurrences Marque ↔ Entité

### 13. 🧾 Historique & replay des réponses IA
- Archivage des réponses par timestamp
- Visualisation des évolutions
- Détection automatique des erreurs ou changements

### 14. 📥 Générateur de prompts via SERP (PAA / Suggest)
- Scraping des People Also Ask
- Conversion en prompts
- Classement par type (FAQ / comparatif / prix / avis)

---

## ⚙️ Stack technique recommandée

- **Frontend** : Next.js 14 (App Router) + Tailwind CSS
- **Backend** : API Routes Next.js ou FastAPI (optionnel)
- **Base de données** : SQLite (MVP), PostgreSQL (v1)
- **LLM** : GPT-4o, Claude, Perplexity, Gemini (via wrapper/API)
- **Search API** : Serper.dev, Bing, Brave Search
- **UI Kit** : shadcn/ui
- **Charts** : Recharts
- **Auth** : auth.js (email/password ou magic link)
- **Visualisation** : Graphe d’entités (force-directed)
- **Export** : CSV, PDF

---

## 🗺️ Roadmap par lots

### ✅ Lot 1 – MVP
- UI + API GPT-4o
- Dashboard, Prompt Tracking, Brand Monitoring
- Stockage JSON / Google Sheet

### 🔍 Lot 2 – Analyse concurrentielle
- Competitor Rank
- Sentiment scoring
- Export CSV

### 🧠 Lot 3 – IA avancée
- Prompt Variation Engine
- RAG module
- Source Analysis
- Growth Tracker

### 🔧 Lot 4 – AEO & SEO
- Connexion Google Search Console
- Graphe d’entités
- AEO Advisor
- Scraping SERP
- Replay des réponses IA

---

## 📦 Structure de fichiers proposée

app/
└─ layout.tsx
└─ page.tsx (home)
└─ dashboard/
└─ prompts/
└─ competitors/
└─ monitoring/
└─ growth/
└─ sources/
└─ settings/
components/
└─ PromptTable.tsx
└─ BrandScoreCard.tsx
lib/
└─ gpt.ts
└─ scorer.ts
└─ gsc.ts
└─ rag.ts
api/
└─ prompts/
└─ runPrompt/
└─ gsc/
prisma/
└─ schema.prisma
public/
styles/

---

## ✅ Résultat attendu

Hubble devient l’outil de référence pour piloter sa stratégie **AEO** (Answer Engine Optimization) face aux LLMs. Il permet aux marques et consultants SEO de :
- Mesurer leur visibilité sur les IA
- Détecter les gaps avec le SEO classique
- Identifier les intentions à travailler
- Construire des plans d’action efficaces et sourcés
- Suivre leur croissance IA au fil des semaines

---