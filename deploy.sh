#!/bin/bash

# CrisPRO Deployment Script
echo "🚀 Starting CrisPRO deployment..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run linting
echo "🔍 Running linter..."
npm run lint

# Build the project
echo "🏗️  Building project..."
npm run build

echo "✅ Build completed successfully!"
echo "🌐 Ready for deployment to Netlify" 