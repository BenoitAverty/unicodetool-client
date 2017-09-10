#!/bin/bash

set -e

promoted_url=$1

if [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_EVENT_TYPE" == "push" ]; then
    >&2 echo "Promoting $promoted_url to production (unicodetool-client.now.sh)"
    >&2 now alias $promoted_url unicodetool-client.now.sh -t $NOW_TOKEN
else
    >&2 echo "Not on branch master. Skipping promotion."
fi