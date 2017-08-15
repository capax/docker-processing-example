#! /bin/bash

docker build -t ddp-haproxy .

if docker container ls | grep -q my-sweet-proxy; then
  # stop the container
  docker container stop my-sweet-proxy
  # torch the container
  docker container rm my-sweet-proxy
fi

docker run -itd --network ddp -p 80:2222 --name my-sweet-proxy ddp-haproxy


