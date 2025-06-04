#!/bin/bash
# Fix CSS issues for QuickBet

echo "🔧 Fixing QuickBet CSS setup..."

# Stop any running processes
echo "⏹️  Please stop the dev server if it's running (Ctrl+C)"
sleep 2

# Clear Vite cache
echo "🗑️  Clearing Vite cache..."
rm -rf node_modules/.vite

# Remove old config files
echo "🗑️  Cleaning up config files..."
rm -f postcss.config.js postcss.config.cjs tailwind.config.js

# Use the .mjs versions
echo "✅ Using ESM config files..."

# Reinstall dependencies
echo "📦 Reinstalling dependencies..."
npm install

echo ""
echo "✅ Setup complete!"
echo ""
echo "🚀 Now run: npm run dev"
echo ""
echo "If you still see no styles:"
echo "1. Hard refresh the browser (Cmd+Shift+R or Ctrl+Shift+R)"
echo "2. Open browser DevTools and check the Console for errors"
echo "3. Check the Network tab to see if CSS files are loading"