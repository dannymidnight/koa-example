#!/bin/bash

set -o monitor

if [ -f /env.sh ] ; then
  source /env.sh
fi

exec "$@"
