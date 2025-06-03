# 🔧 Gestion des Ports - Application Hubble

## 🎯 Problème Résolu

L'application était documentée comme fonctionnant sur le port **3004**, mais elle fonctionne réellement sur le port **3000**. Cette confusion a été complètement résolue.

## 📍 Comportement Next.js

### **Sélection Automatique des Ports**
Next.js recherche automatiquement le premier port disponible dans l'ordre :

1. **Port 3000** (par défaut)
2. **Port 3001** (si 3000 occupé)  
3. **Port 3002** (si 3001 occupé)
4. **Port 3003** (si 3002 occupé)
5. **Port 3004** (si 3003 occupé)

### **Message de Démarrage**
```bash
npm run dev
> hubble-ai-monitor@0.1.0 dev
> next dev --turbopack
   ▲ Next.js 15.3.3 (Turbopack)
   - Local:        http://localhost:3000    ← PORT AFFICHÉ ICI
   - Network:      http://192.168.x.x:3000
```

## 🔍 Détection du Port Actuel

### **Script Automatique**
```bash
./scripts/find-app-port.sh
```

**Sortie attendue :**
```
🔍 Recherche du port de l'application Hubble...
✅ Application trouvée sur http://localhost:3000
📋 Page Growth: http://localhost:3000/growth
✅ Page Growth opérationnelle
```

### **Détection Manuelle**
```bash
# Méthode 1: Test des ports courants
for port in 3000 3001 3002 3003 3004; do
  if curl -s http://localhost:$port >/dev/null 2>&1; then
    echo "Application trouvée sur port $port"
    break
  fi
done

# Méthode 2: Via lsof (macOS/Linux)
lsof -i :3000 | grep LISTEN

# Méthode 3: Test direct
curl -I http://localhost:3000 2>/dev/null | head -1
```

## 🚀 URLs Confirmées

### **Application Principale**
- **URL**: http://localhost:3000
- **Status**: ✅ 200 OK

### **Page Growth avec Tooltips**
- **URL**: http://localhost:3000/growth
- **Status**: ✅ 200 OK
- **Fonctionnalités**: 10 tooltips informatifs

### **Autres Pages**
- http://localhost:3000 (Dashboard)
- http://localhost:3000/competitors
- http://localhost:3000/sources
- http://localhost:3000/settings

## ⚡ Dépannage Rapide

### **Si Port 3000 ne Fonctionne Pas**
```bash
# 1. Vérifier si l'application tourne
./scripts/find-app-port.sh

# 2. Si non trouvée, relancer
npm run dev

# 3. Attendre le démarrage (10-15 secondes)
sleep 10 && ./scripts/find-app-port.sh
```

### **Si Application non Responsive**
```bash
# Nettoyage complet
rm -rf .next node_modules/.cache
npm run dev
```

### **Script de Récupération d'Urgence**
```bash
./scripts/fix-growth-page.sh
```

## 📋 Checklist de Validation

### ✅ **Tests de Fonctionnement**
```bash
# Test 1: Application principale
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
# Résultat attendu: 200

# Test 2: Page Growth
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/growth
# Résultat attendu: 200

# Test 3: Script de détection
./scripts/find-app-port.sh
# Résultat attendu: Application trouvée + Page Growth opérationnelle
```

### ✅ **Vérifications Visuelles**
1. Ouvrir http://localhost:3000 dans le navigateur
2. Navigation entre les pages fonctionnelle
3. Page Growth affiche les métriques avec tooltips
4. Tooltips s'affichent au survol des icônes ℹ️

## 🛡️ Prévention des Régressions

### **Documentation Mise à Jour**
Tous les fichiers de documentation ont été corrigés :
- ✅ `TROUBLESHOOTING_GROWTH_PAGE.md` 
- ✅ `RESOLUTION_SUMMARY.md`
- ✅ `TOOLTIPS_DOCUMENTATION.md`
- ✅ Scripts de récupération

### **Scripts Corrigés**
- ✅ `scripts/fix-growth-page.sh` - Syntaxe parenthèses corrigée
- ✅ `scripts/find-app-port.sh` - Nouveau script de détection

### **Tests Automatisés**
Tous les scripts testent automatiquement les ports 3000-3004 et affichent le port correct.

## 🔄 Commandes de Référence

### **Démarrage Standard**
```bash
cd hubble-ai-monitor
npm run dev
# Attendre message: "Local: http://localhost:XXXX"
```

### **Détection Port**
```bash
./scripts/find-app-port.sh
```

### **Test Rapide**
```bash
curl http://localhost:3000/growth
# Doit retourner du HTML (page Growth)
```

### **Récupération d'Urgence**
```bash
./scripts/fix-growth-page.sh
```

## 📊 État Final Confirmé

### ✅ **Application Opérationnelle**
- **Port principal**: 3000
- **Page Growth**: Fonctionnelle avec 10 tooltips
- **Toutes les pages**: Accessibles et opérationnelles
- **Scripts**: Corrigés et testés

### ✅ **Documentation Cohérente**
- Toutes les références de port mises à jour
- Scripts de test et récupération fonctionnels
- Procédures de dépannage validées

### ✅ **Protection Anti-Régression**
- Scripts de détection automatique
- Documentation complète
- Tests de validation intégrés

**L'application Hubble AI Monitor est maintenant parfaitement stable et documentée !** 🚀 