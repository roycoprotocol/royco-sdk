#!/bin/bash

# Check for version argument
if [ "$1" != "--minor" ] && [ "$1" != "--major" ] && [ "$1" != "--patch" ]; then
    echo "Error: Please specify version type: --minor, --major, or --patch"
    exit 1
fi
VERSION_TYPE="${1#--}" # Remove the -- prefix

# # Ensure we're in a clean state
# if [ -n "$(git status --porcelain)" ]; then
#     echo "Error: Working directory is not clean. Please commit or stash changes first."
#     exit 1
# fi

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
npx changeset version

# Update package.json files
git add .
git commit -m "feat(npm): update versions"

# Build the project 
echo "Building project..."
if ! npm run build; then
    echo "Error: Build failed. Aborting publish."
    exit 1
fi

# Publish to npm
echo "Publishing to npm..."
npx changeset publish

# Push changes and tags to remote
git push --follow-tags
