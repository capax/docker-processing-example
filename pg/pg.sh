#! /bin/bash

docker build -t ddp-pg .

if docker container ls -a | grep -q ddp-pg; then
  # stop the container
  docker container stop ddp-pg
  # torch the container
  docker container rm ddp-pg
  echo "deleted ddp-pg"
fi

docker run \
  -itd \
  --network ddp \
  -p 5432:5432 \
  --network-alias=ddp-pg \
  --hostname ddp-pg \
  --name ddp-pg \
  ddp-pg

npm install && node setup.js
