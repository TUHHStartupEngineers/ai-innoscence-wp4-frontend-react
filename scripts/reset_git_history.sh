#!/bin/bash
set -e

# Configuration
REMOTE_URL="https://github.com/TUHHStartupEngineers/ai-innoscence-wp4-frontend-react.git"
BRANCH="main"

echo "⚠️  WARNING: This will destroy the entire git history and replace it with the current state."
echo "Remote: $REMOTE_URL"
echo "Branch: $BRANCH"

# 1. Remove existing git history
echo "💥 Removing .git directory..."
rm -rf .git

# 2. Re-initialize
echo "🌱 Initializing new git repository..."
git init
git checkout -b "$BRANCH"

# 3. Add files
echo "📦 Adding files..."
git add .

# 4. Commit
echo "💾 Creating initial commit..."
git commit -m "Initial commit: Fresh start with verified data"

# 5. Add remote
echo "🔗 Adding remote..."
git remote add origin "$REMOTE_URL"

# 6. Force push
echo "🚀 Pushing to remote..."
git push -f origin "$BRANCH"

echo "✅ Done! History has been reset."
