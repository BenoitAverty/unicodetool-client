#!/bin/bash

set -e

deploy_url=$(cd out/ && now -p --static --name unicodetool-client -t $NOW_TOKEN)

if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
    >&2 echo "Not a pull request. Skipping alias creation"
else
    >&2 echo Aliasing deployment with pull request url...
    >&2 now alias $deploy_url pr$TRAVIS_PULL_REQUEST-unicodetool-client.now.sh -t $NOW_TOKEN
fi

echo $deploy_url