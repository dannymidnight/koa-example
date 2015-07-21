#!/bin/bash

gosu postgres postgres --single <<- EOSQL
   CREATE DATABASE example;
   CREATE USER example;
   GRANT ALL PRIVILEGES ON DATABASE example to example;
   ALTER USER example WITH SUPERUSER
EOSQL
