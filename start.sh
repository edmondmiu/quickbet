#!/bin/bash
# Make this file executable: chmod +x start.sh

# QuickBet Setup and Run Script

echo "🚀 Setting up QuickBet..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
else
    echo "✅ Dependencies already installed"
fi

# Start the development server
echo "🎮 Starting QuickBet..."
echo "📱 Open http://localhost:3000 in your browser"
npm run dev