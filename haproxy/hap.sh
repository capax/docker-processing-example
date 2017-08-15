#! /bin/bash

docker build -t ddp-haproxy .

if docker container ls -a | grep -q ddp-proxy; then
  # stop the container
  docker container stop ddp-proxy
  # torch the container
  docker container rm ddp-proxy
fi

docker run -itd --network ddp -p 80:2222 --hostname ddp-haproxy --name ddp-proxy ddp-haproxy


