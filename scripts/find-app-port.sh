#!/bin/bash

# Script de détection du port de l'application Hubble
# Usage: ./scripts/find-app-port.sh

echo "🔍 Recherche du port de l'application Hubble..."

# Tester les ports habituels
for PORT in 3000 3001 3002 3003 3004; do
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:$PORT 2>/dev/null)
    if [ "$HTTP_CODE" = "200" ]; then
        echo "✅ Application trouvée sur http://localhost:$PORT"
        echo "📋 Page Growth: http://localhost:$PORT/growth"
        
        # Test spécifique de la page Growth
        GROWTH_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:$PORT/growth 2>/dev/null)
        if [ "$GROWTH_CODE" = "200" ]; then
            echo "✅ Page Growth opérationnelle"
        else
            echo "⚠️  Page Growth non accessible"
        fi
        
        exit 0
    fi
done

echo "❌ Application non trouvée sur les ports 3000-3004"
echo "🔧 Lancez l'application avec: npm run dev"
exit 1 