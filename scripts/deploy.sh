#!/bin/sh

branch="master";

if [ ! -z $1 ]
then
        branch=$1;
fi

echo "Déploiement en production à partir de la branche $branch";

current_directory="$(dirname "$0")"
cd "$current_directory/repo"
git checkout $branch
git pull

tar -xf "/home/CantStopUsAll/repo/build/CantStopUsAll.tar.gz" -C "/home/CantStopUsAll/prod/"

cd "/home/CantStopUsAll/prod/bundle"
(cd programs/server && npm install)
export MONGO_URL='mongodb://localhost:27017/meteor'
export ROOT_URL='http://1337.kami.kiwi'
export PORT='1337'

echo "Now we restore meteor database"
mongorestore --verbose  '/home/CantStopUsAll/repo/dump/'


node main.js
