#!/bin/bash

# Stage and commit any changes
echo "Committing any unstaged changes..."
git add .
if [ -n "$(git status --porcelain)" ]; then
    git commit -m "feat(sdk): automated commits"
fi

# Switch to main and pull latest
echo "Switching to main branch and pulling latest changes..."
git checkout main
git pull origin main

# Check for version argument
if [ "$1" != "--minor" ] && [ "$1" != "--major" ] && [ "$1" != "--patch" ]; then
    echo "Error: Please specify version type: --minor, --major, or --patch"
    exit 1
fi
VERSION_TYPE="${1#--}" # Remove the -- prefix

# Create a new changeset with automated message
CURRENT_TIME=$(date -u +"%Y-%m-%d %H:%M:%S UTC")
echo "Creating new changeset..."
echo "---
\"royco\": ${VERSION_TYPE}
---

New SDK version @ ${CURRENT_TIME}" > .changeset/automated-${VERSION_TYPE}-release.md

# Add and commit the changeset
git add .changeset/*.md
git commit -m "feat(npm): add changeset"

# Create release
echo "Creating release..."
pnpm changeset version

# Update package.json files
git add .
git commit -m "feat(npm): update versions"

# Run preparation scripts
echo "Running preparation scripts..."
pnpm run prepare:market-map
pnpm run prepare:token-map

# Build the project 
echo "Building project..."
if ! pnpm run build; then
    echo "Error: Build failed. Aborting publish."
    exit 1
fi

# Publish to npm
echo "Publishing to npm..."
pnpm changeset publish

# Push changes and tags to remote
git push --follow-tags

# Create GitHub release from the latest tag
echo "Creating GitHub release..."
LATEST_TAG=$(git describe --tags --abbrev=0)
gh release create "$LATEST_TAG" --generate-notes
