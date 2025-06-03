# 📏 Guide de Standardisation des Tailles d'Icônes Tooltip

## 🎯 Principe de Dimensionnement

Les icônes de tooltip doivent être dimensionnées selon leur **contexte d'utilisation** pour maintenir une hiérarchie visuelle cohérente et une lisibilité optimale.

## 📐 Tailles Standardisées

### 🔤 **Large (lg) - w-5 h-5 (20px)**
**Usage :** Titres principaux de page et headers majeurs

```tsx
// ✅ Headers de page principale
<div className="flex items-center gap-2 mb-2">
  <h1 className="text-3xl font-bold">Suivi de Croissance</h1>
  <CustomTooltip content="Explication de la page" position="auto">
    <InfoIcon size="lg" />
  </CustomTooltip>
</div>
```

**Contextes appropriés :**
- Titres H1 de page
- Headers de sections majeures
- Éléments de navigation principaux

### 🔤 **Medium (md) - w-4 h-4 (16px) - DÉFAUT**
**Usage :** Titres de sections et sous-headers

```tsx
// ✅ Titres de sections
<div className="flex items-center gap-2 mb-4">
  <h2 className="text-xl font-semibold">Métriques Clés</h2>
  <CustomTooltip content="Explication de la section" position="auto">
    <InfoIcon /> {/* Taille par défaut = md */}
  </CustomTooltip>
</div>
```

**Contextes appropriés :**
- Titres H2/H3 de sections
- Labels de configuration
- Éléments de navigation secondaires

### 🔤 **Small (sm) - w-3 h-3 (12px)**
**Usage :** Métriques, champs de formulaire et éléments compacts

```tsx
// ✅ Métriques et KPIs
<div className="flex items-center justify-between mb-2">
  <h3 className="font-medium text-blue-900">Score Actuel</h3>
  <CustomTooltip content="Explication de la métrique" position="auto">
    <InfoIcon size="sm" className="text-blue-600" />
  </CustomTooltip>
</div>

// ✅ Champs de formulaire
<div className="flex items-center gap-2">
  <label className="font-medium">Fréquence de scan</label>
  <CustomTooltip content="Explication du paramètre" position="auto">
    <InfoIcon size="sm" />
  </CustomTooltip>
</div>
```

**Contextes appropriés :**
- Métriques et KPIs
- Champs de formulaire
- Éléments de tableau
- Badges et chips
- Éléments dans des cartes compactes

## 📋 Règles d'Application

### ✅ **Règles Principales**

1. **Hiérarchie Visuelle**
   - Plus l'élément est important → Plus l'icône est grande
   - H1 → `size="lg"`, H2/H3 → `size="md"`, métriques → `size="sm"`

2. **Cohérence Contextuelle**
   - Tous les tooltips d'un même niveau hiérarchique = même taille
   - Métriques dans une même grille = `size="sm"`

3. **Espacement Visuel**
   - L'icône ne doit jamais dominer son contexte
   - Elle doit s'intégrer harmonieusement

### ❌ **Erreurs à Éviter**

```tsx
// ❌ Taille trop grande pour une métrique
<h3 className="font-medium">Score</h3>
<InfoIcon size="lg" /> // Disproportionné

// ❌ Taille trop petite pour un titre principal
<h1 className="text-3xl font-bold">Dashboard</h1>
<InfoIcon size="sm" /> // Pas assez visible

// ❌ Incohérence dans une même grille
<div className="grid grid-cols-3">
  <div><InfoIcon size="sm" /></div>
  <div><InfoIcon size="md" /></div> // ❌ Incohérent
  <div><InfoIcon size="sm" /></div>
</div>
```

## 🎨 Intégration avec le Design System

### **Couleurs Contextuelles**

```tsx
// Couleurs selon le contexte de la métrique
<InfoIcon size="sm" className="text-blue-600" />   // Métriques primaires
<InfoIcon size="sm" className="text-green-600" />  // Métriques positives
<InfoIcon size="sm" className="text-purple-600" /> // Métriques spécialisées
<InfoIcon size="sm" className="text-gray-400" />   // Métriques neutres
```

### **Responsive Design**

```tsx
// Adaptation mobile (optionnel pour les cas extrêmes)
<InfoIcon 
  size="sm" 
  className="w-3 h-3 md:w-4 md:h-4" // Plus grand sur desktop
/>
```

## 🔧 Mise en Application

### **Page Dashboard**
```tsx
// Header principal
<h1 className="text-3xl font-bold">Dashboard</h1>
<InfoIcon size="lg" />

// Section métriques
<h2 className="text-xl font-semibold">KPIs</h2>
<InfoIcon />

// Chaque métrique
<h3 className="font-medium">Score Global</h3>
<InfoIcon size="sm" />
```

### **Page Growth (Croissance)**
```tsx
// Header principal ✅
<h1 className="text-3xl font-bold">Suivi de Croissance</h1>
<InfoIcon size="lg" />

// Sections ✅
<h2 className="text-xl font-semibold">Métriques Clés</h2>
<InfoIcon />

// Métriques ✅
<h3 className="font-medium">Score Actuel</h3>
<InfoIcon size="sm" className="text-blue-600" />
```

### **Page Settings**
```tsx
// Sections principales
<h2 className="text-xl font-semibold">Configuration</h2>
<InfoIcon />

// Options de configuration
<label className="font-medium">Fréquence</label>
<InfoIcon size="sm" />
```

## 📊 Tableau de Référence Rapide

| Contexte | Élément | Taille | Classes CSS | Exemple |
|----------|---------|---------|-------------|---------|
| **Page** | H1 Principal | `lg` | `w-5 h-5` | Titre de page |
| **Section** | H2/H3 Secondaire | `md` | `w-4 h-4` | Titre de section |
| **Métrique** | KPI/Stat | `sm` | `w-3 h-3` | Score, mentions |
| **Formulaire** | Label/Input | `sm` | `w-3 h-3` | Champ config |
| **Tableau** | Header/Cell | `sm` | `w-3 h-3` | Colonne tableau |

## ✅ Checklist de Validation

### **Avant Publication**
- [ ] Tous les H1 utilisent `size="lg"`
- [ ] Tous les H2/H3 utilisent la taille par défaut (`md`)
- [ ] Toutes les métriques utilisent `size="sm"`
- [ ] Cohérence dans chaque grille/section
- [ ] Couleurs appropriées au contexte
- [ ] Test sur mobile et desktop

### **Révision de Code**
- [ ] Pas de mélange de tailles dans un même contexte
- [ ] Hiérarchie visuelle respectée
- [ ] Accessibilité maintenue (contraste, taille minimale)

Cette standardisation garantit une **expérience utilisateur cohérente** et **professionnelle** dans toute l'application Hubble. 