#!/bin/bash

# Script de récupération d'urgence pour la page Growth
# Usage: ./scripts/fix-growth-page.sh

echo "🚨 Script de récupération d'urgence - Page Growth"
echo "================================================"

# Étape 1: Arrêter le serveur de développement
echo "1️⃣ Arrêt du serveur..."
pkill -f "next dev" 2>/dev/null || echo "Aucun serveur Next.js en cours"

# Étape 2: Nettoyage complet
echo "2️⃣ Nettoyage du cache..."
rm -rf .next
rm -rf node_modules/.cache
echo "✅ Cache nettoyé"

# Étape 3: Vérifier si le fichier de sauvegarde existe
BACKUP_FILE="src/app/(dashboard)/growth/page.backup.tsx"
TARGET_FILE="src/app/(dashboard)/growth/page.tsx"

if [ -f "$BACKUP_FILE" ]; then
    echo "3️⃣ Restauration depuis la sauvegarde..."
    cp "$BACKUP_FILE" "$TARGET_FILE"
    echo "✅ Fichier restauré depuis la sauvegarde"
else
    echo "❌ Fichier de sauvegarde introuvable!"
    echo "Recréation manuelle nécessaire - voir TROUBLESHOOTING_GROWTH_PAGE.md"
    exit 1
fi

# Étape 4: Vérification de la syntaxe avec Next.js
echo "4️⃣ Vérification de la syntaxe..."
timeout 30 npm run build > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Syntaxe et compilation Next.js valides"
else
    echo "⚠️  Compilation échouée mais on continue (peut être dû au timeout)"
fi

# Étape 5: Redémarrage du serveur
echo "5️⃣ Redémarrage du serveur..."
npm run dev > /dev/null 2>&1 &
SERVER_PID=$!

# Attendre que le serveur démarre
echo "⏳ Attente du démarrage du serveur..."
sleep 15

# Étape 6: Test de fonctionnement
echo "6️⃣ Test de fonctionnement..."
for i in {1..5}; do
    # Test des ports par ordre de préférence
    for PORT in 3000 3001 3002 3003 3004; do
        HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:$PORT/growth 2>/dev/null)
        if [ "$HTTP_CODE" = "200" ]; then
            echo "✅ Page Growth accessible sur http://localhost:$PORT/growth"
            echo "🎉 Récupération réussie!"
            echo "📋 URL finale : http://localhost:$PORT"
            exit 0
        fi
    done
    
    echo "⏳ Tentative $i/5..."
    sleep 3
done

echo "❌ Échec de la récupération automatique"
echo "📋 Actions manuelles nécessaires:"
echo "   1. Vérifier les logs du serveur"
echo "   2. Consulter TROUBLESHOOTING_GROWTH_PAGE.md"
echo "   3. Redémarrer manuellement: npm run dev"
echo "   4. Tester manuellement: curl http://localhost:3000/growth"

exit 1 