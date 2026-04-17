#!/bin/bash
set -e

echo "Mise à jour Portfolio Front..."
git pull origin main

echo "Installation des dépendances..."
npm ci

echo "Build..."
npm run build

echo "Déploiement terminé ✓"
