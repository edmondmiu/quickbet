#!/bin/bash

# Initialize Git repository and push to GitHub
echo "🚀 Setting up QuickBet repository..."

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "feat: initial project setup with modular architecture

- Complete documentation (README, Architecture, Modules, Contributing)
- Module system with dependency injection
- Mock data structure for development
- Emotional design system
- TypeScript and React configuration"

# Add remote (update with your GitHub username)
echo "📝 Add your GitHub remote:"
echo "git remote add origin https://github.com/YOUR_USERNAME/quickbet.git"
echo ""
echo "Then push with:"
echo "git branch -M main"
echo "git push -u origin main"

echo ""
echo "✅ Project ready! Next steps:"
echo "1. Create repository on GitHub"
echo "2. Run the remote commands above"
echo "3. Run 'npm install' to install dependencies"
echo "4. Run 'npm run dev' to start development"