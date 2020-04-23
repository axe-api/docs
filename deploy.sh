#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run docs:build

cd docs/.vuepress/dist

git init
git add -A
git commit -m "Travis build."

git push -f ${GITHUB_TOKEN}@github.com:adonisx/adonisx.github.io.git master

cd -