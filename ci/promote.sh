#!/bin/sh

set -e

promoted_url=$1

if [[ "$TRAVIS_BRANCH" == "master" ]]; then
    now alias $promoted_url unicodetool-client.now.sh -t $NOW_TOKEN
else
    echo "Not on branch master. Skipping promotion."
fi