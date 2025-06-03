#!/bin/bash

echo "🧹 Nettoyage des caches TypeScript et Next.js..."

# Nettoyer les caches TypeScript
echo "Suppression du cache TypeScript..."
rm -f tsconfig.tsbuildinfo
rm -f .next/types/**/*.ts 2>/dev/null

# Nettoyer le cache Next.js
echo "Suppression du cache Next.js..."
rm -rf .next

# Nettoyer node_modules TypeScript
echo "Nettoyage des types..."
rm -rf node_modules/.cache 2>/dev/null

# Vérifier la configuration TypeScript
echo "Vérification de la configuration TypeScript..."
npx tsc --noEmit --skipLibCheck

echo "✅ Nettoyage terminé !"
echo "💡 Redémarrez votre IDE (VSCode/Cursor) pour appliquer les changements." 