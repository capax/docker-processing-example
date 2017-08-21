#!/bin/bash

# INFRASTRUCTURE ##########################################

# set up the network
# nb this has to be first because everything downstream is attached to the network
pushd ./network
./network.sh
popd

# set up pg
pushd ./pg
./pg.sh
popd

# set up rabbit
pushd ./rabbit
./rabbit.sh
popd

# set up the feeder services for rabbit
pushd ./queue-proxy
./queue-proxy.sh
popd

# set up ssol
pushd ./ssol
./ssol.sh
popd

echo "sleeping 15s..."
sleep 15s

# set up hap
# nb, hap has to be last so the rules don't cause it to crash
pushd ./haproxy
./hap.sh
popd


# DATA MOVEVMENT ##########################################

# set up the producer
pushd ./producer
./producer.sh
popd

# set up the consumer
pushd ./consumer
./consumer.sh
popd
