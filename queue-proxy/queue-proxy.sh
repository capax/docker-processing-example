#! /bin/bash

docker build -t ddp-queue-proxy .

if docker container ls | grep -q ddp-qp1; then
  # stop the container
  docker container stop ddp-qp1
  # torch the container
  docker container rm ddp-qp1
  echo "deleted ddp-qp1"
fi

if docker container ls | grep -q ddp-qp2; then
  # stop the container
  docker container stop ddp-qp2
  # torch the container
  docker container rm ddp-qp2
  echo "deleted ddp-qp2"
fi


docker run -itd --network ddp -p 2223:8080 --network-alias=ddp-qp1 --name ddp-qp1 ddp-queue-proxy
docker run -itd --network ddp -p 2224:8080 --network-alias=ddp-qp2 --name ddp-qp2 ddp-queue-proxy
