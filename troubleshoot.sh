#!/bin/bash
# Troubleshooting script for QuickBet CSS issues

echo "🔍 Troubleshooting QuickBet CSS..."
echo ""

# Check if node_modules exists
if [ -d "node_modules" ]; then
    echo "✅ node_modules exists"
    
    # Check for key packages
    if [ -d "node_modules/tailwindcss" ]; then
        echo "✅ tailwindcss is installed"
    else
        echo "❌ tailwindcss is NOT installed"
    fi
    
    if [ -d "node_modules/postcss" ]; then
        echo "✅ postcss is installed"
    else
        echo "❌ postcss is NOT installed"
    fi
    
    if [ -d "node_modules/autoprefixer" ]; then
        echo "✅ autoprefixer is installed"
    else
        echo "❌ autoprefixer is NOT installed"
    fi
else
    echo "❌ node_modules does NOT exist - run 'npm install' first"
fi

echo ""
echo "📁 Config files present:"
ls -la | grep -E "(postcss|tailwind)\.config\.(js|mjs|cjs)"

echo ""
echo "🔧 Recommended fix:"
echo "1. Stop the dev server (Ctrl+C)"
echo "2. Clear cache: rm -rf node_modules/.vite"
echo "3. Reinstall: npm install"
echo "4. Start again: npm run dev"
echo ""
echo "If CSS still doesn't load, try:"
echo "- Clear browser cache"
echo "- Check browser console for errors"
echo "- Try incognito/private browsing mode"