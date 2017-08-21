#!/bin/bash
set -e
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE USER ddp WITH PASSWORD 'Password123';
    CREATE DATABASE sandbox;
    GRANT ALL PRIVILEGES ON DATABASE sandbox TO ddp;
    --create table ddp.public.sample (id serial primary key, stuff varchar(4000))
    \c sandbox;
    create table sample (id serial primary key, stuff varchar(4000));
    grant all privileges on table sample to ddp;
EOSQL


