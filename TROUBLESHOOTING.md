# 🔧 Guide de Résolution de Problèmes - Hubble

## 🚨 Problèmes Identifiés et Solutions

### 1. Erreur "Module not found: Can't resolve 'nodemailer'"

**Problème :** NextAuth nécessite nodemailer pour l'authentification par email.

**Solution :**
```bash
npm install nodemailer @types/nodemailer
```

**Alternative (Mode développement) :** L'authentification a été simplifiée pour éviter cette dépendance.

### 2. Erreur "Cannot apply unknown utility class 'border-border'"

**Problème :** Configuration Tailwind CSS incorrecte.

**Solution :** Le fichier `globals.css` a été corrigé pour utiliser les directives Tailwind standard.

### 3. Erreur PostCSS "@tailwindcss/postcss"

**Problème :** Configuration PostCSS incorrecte.

**Solution :**
```bash
npm install autoprefixer
```
Et correction du fichier `postcss.config.mjs`.

### 4. Schéma Prisma incompatible avec SQLite

**Problème :** SQLite ne supporte pas les arrays natifs.

**Solution :** Conversion du champ `tags` de `String[]` vers `String` avec séparateurs.

## 🛠 Solutions de Démarrage

### Option 1: Script de Démarrage Automatique
```bash
chmod +x start-dev.sh
./start-dev.sh
```

### Option 2: Démarrage Manuel
```bash
# 1. Nettoyer les processus existants
pkill -f "next dev"

# 2. Installer les dépendances
npm install

# 3. Générer Prisma
npx prisma generate

# 4. Démarrer l'application
npm run dev
```

### Option 3: Réinstallation Complète
```bash
# Nettoyer complètement
rm -rf node_modules package-lock.json .next

# Réinstaller
npm install

# Configurer la base de données
npx prisma generate
npx prisma db push

# Démarrer
npm run dev
```

## 🔍 Diagnostic

### Vérifier que l'application fonctionne
```bash
# Vérifier le processus
ps aux | grep next

# Tester la réponse
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000

# Voir les logs
tail -f .next/trace
```

### Ports et Processus
```bash
# Vérifier le port 3000
lsof -i :3000

# Tuer les processus sur le port 3000
kill -9 $(lsof -t -i:3000)
```

## 🎯 Mode Développement Simplifié

Pour éviter les problèmes de dépendances, l'application a été configurée en mode développement avec :

- ✅ **Authentification simplifiée** (pas de vérification de session stricte)
- ✅ **Page de connexion mock** pour accéder au dashboard
- ✅ **Données simulées** pour tous les composants
- ✅ **Configuration PostCSS standard**

## 🚀 Accès Direct

Si l'application ne démarre pas, vous pouvez :

1. **Accéder directement au dashboard :** http://localhost:3000/dashboard
2. **Voir la page de connexion :** http://localhost:3000/auth/signin
3. **Tester les prompts :** http://localhost:3000/prompts
4. **Voir le monitoring :** http://localhost:3000/monitoring

## 📞 Support

Si les problèmes persistent :

1. **Vérifiez les versions :**
   - Node.js 18+
   - npm 8+

2. **Nettoyez le cache :**
   ```bash
   npm cache clean --force
   rm -rf .next
   ```

3. **Vérifiez les permissions :**
   ```bash
   chmod -R 755 .
   ```

4. **Consultez les logs détaillés :**
   ```bash
   npm run dev 2>&1 | tee debug.log
   ```

---

**💡 L'application Hubble est conçue pour être robuste et fonctionner même avec des dépendances manquantes en mode développement.** 