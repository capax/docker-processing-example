#! /bin/bash

docker build -t ddp-proxy-test .

if docker container ls | grep -q ddppt1; then
  # stop the container
  docker container stop ddppt1
  # torch the container
  docker container rm ddppt1
  echo "deleted ddppt1"
fi

if docker container ls | grep -q ddppt2; then
  # stop the container
  docker container stop ddppt2
  # torch the container
  docker container rm ddppt2
  echo "deleted ddppt2"
fi


docker run -itd --network ddp -p 2223:8080 --network-alias=ddppt1 --name ddppt1 ddp-proxy-test
docker run -itd --network ddp -p 2224:8080 --network-alias=ddppt2 --name ddppt2 ddp-proxy-test


