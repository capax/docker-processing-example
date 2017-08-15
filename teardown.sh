#!/bin/bash

# INFRASTRUCTURE ##########################################

# tear down all ddp* instances
instances=$(docker container ls -a --format '{{ json .}}' | /usr/bin/jq -r '.Names' | grep 'ddp' | sed 's/:.*//')
for instance in ${instances}; do
  echo "stopping $instance..."
  docker container stop $instance
done;

for instance in ${instances}; do
  echo "deleting $instance..."
  docker container rm -f $instance
done;

# tear down all ddp* images
images=$(docker image ls -a --format '{{ json .}}' | /usr/bin/jq -r '.Repository' | grep 'ddp')
for image in ${images}; do
  echo "deleting image $image..."
  docker image rm -f $image
done;

# tear down the ddp network
networks=$(docker network ls --format '{{json .}}' | /usr/bin/jq -r '.Name' | grep 'ddp')
for network in ${networks}; do
  echo "deleting network $network...."
  docker network rm $network;
done;

echo "====== ddp torched. ======";

