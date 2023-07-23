Tengo GITIGNORE configurado para ignorar .env pero igualmente se sube al repo, no encontré por qué. Lo borré con el comando: 

git rm .env --cached
git commit -m "Removing env file"