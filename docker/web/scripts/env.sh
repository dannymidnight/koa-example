#!/bin/bash

set -e

export_env_unless_empty() {
  local data=$1
  local name=$2
  if [ -n "$data" ]; then
    # `declare` for dynamically generated variable names
    # -x for export, -g for global (i.e. visibility outside function)
    declare -xg $name="$data"
  fi
}

build_database_url() {
  local auth
  local host
  local name
  local port

  # Docker link for address
  if [ -n "$DB_1_PORT_5432_TCP_ADDR" ]; then
    host="$DB_1_PORT_5432_TCP_ADDR"
  fi

  # Ability to specify user/pass; defaults to none.
  if [ -n "$DB_USER" -o -n "$DB_PASSWORD" ]; then
    auth="$DB_USER:$DATABASE_PASSWORD@"
  fi

  # Docker link for port number.
  if [ -n "$DB_1_PORT_5432_TCP_PORT" ]; then
    port="$DB_1_PORT_5432_TCP_PORT"
  fi

  # Specify database name
  if [ -n "$DB_NAME" ]; then
    name="$DB_NAME"
  fi

  if [ -n "$host" -a -n "$port" -a -n "$name" ]; then
    echo "postgresql://$auth$host:$port/$name"
  fi
}

# Guess default root username and password if not provided
if [ -z "$DB_USER" ]; then
  if [ -n "$DB_1_PORT_5432_TCP_ADDR" ]; then
    DB_USER="postgres"
  fi
fi

if [ -z "$DATABASE_URL" ]; then
  export_env_unless_empty "$(build_database_url)" "DATABASE_URL"
fi

# libPQ CLI client variables
export_env_unless_empty "$DB_1_PORT_5432_TCP_ADDR" "PGHOSTADDR"
export_env_unless_empty "$DB_1_PORT_5432_TCP_PORT" "PGPORT"
export_env_unless_empty "$DB_USER" "PGUSER"
export_env_unless_empty "$DB_PASSWORD" "PGPASSWORD"
