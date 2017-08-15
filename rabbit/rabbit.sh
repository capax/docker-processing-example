#! /bin/bash

docker build -t ddp-rabbit .

if docker container ls | grep -q ddp-rabbit; then
  # stop the container
  docker container stop ddp-rabbit
  # torch the container
  docker container rm ddp-rabbit
  echo "deleted ddp-rabbit"
fi

docker run -itd --network ddp -p 5672:5672 --network-alias=ddp-rabbit --hostname ddp-rabbit --name ddp-rabbit ddp-rabbit


