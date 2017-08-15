#! /bin/bash

docker build -t ddp-mssql .

if docker container ls | grep -q ddp-mssql; then
  # stop the container
  docker container stop ddp-mssql
  # torch the container
  docker container rm ddp-mssql
  echo "deleted ddp-mssql"
fi

docker run \
  -itd \
  --network ddp \
  -p 1433:1433 \
  --network-alias=ddp-mssql \
  --hostname ddp-mssql \
  --name ddp-mssql \
  -e 'ACCEPT_EULA=Y' \
  -e 'SA_PASSWORD=Password123' \
  ddp-mssql

echo "waiting 20s..."
sleep 20

docker exec -t ddp-mssql /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P Password123 -d master -Q "create database sandbox"
