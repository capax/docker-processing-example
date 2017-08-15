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

# set up ssol
pushd ./ssol
./ssol.sh
popd

# set up hap
# nb, hap has to be last so the rules don't cause it to crash
pushd ./haproxy
./hap.sh
popd


