#! /bin/bash

docker build -t ddp-consumer .

if docker container ls | grep -q ddp-consumer; then
  # stop the container
  docker container stop ddp-consumer
  # torch the container
  docker container rm ddp-consumer
  echo "deleted ddp-consumer"
fi

docker run -itd --network ddp -p 2226:8080 --network-alias=ddp-consumer --name ddp-consumer ddp-consumer
