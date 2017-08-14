#! /bin/bash

docker build -t ddp-haproxy .

if docker container ls -al | grep -q my-sweet-proxy; then
  docker container rm my-sweet-proxy
fi

docker run -itd --network ddp --name my-sweet-proxy ddp-haproxy


