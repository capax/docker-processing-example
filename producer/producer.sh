#! /bin/bash

docker build -t ddp-producer .

if docker container ls -a | grep -q ddp-producer; then
  # stop the container
  docker container stop ddp-producer
  # torch the container
  docker container rm ddp-producer
  echo "deleted ddp-producer"
fi

docker run -itd --network ddp -p 2225:8080 --network-alias=ddp-producer --name ddp-producer ddp-producer
