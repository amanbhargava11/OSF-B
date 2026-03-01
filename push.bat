@echo off
echo Starting git initialization and push for backend...
git init
git add .
git commit -m "Initial backend commit"
git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/amanbhargava11/OSF-B.git
git push -u origin main
echo Done!
