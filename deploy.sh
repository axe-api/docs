#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run docs:build

cd docs/.vuepress/dist

git init
git add -A
git commit -m "Travis build."
git remote add origin git@github.com:axe-api/axe-api.github.io.git
git push -f origin master