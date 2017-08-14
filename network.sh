#! /bin/bash

# check to see if network exists
if docker network list | grep -q ddp; then
  echo 'ddp network already exists.  skipping.'
  # if i ever come back and decide to remove it:
  # docker network rm ddp
else
  # create the network
  docker network create --driver bridge ddp
fi



