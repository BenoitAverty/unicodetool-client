#!/bin/sh

set -e

deploy_url=$(cd out/ && now -p --static --name unicodetool-client -t $NOW_TOKEN)

if [[ "$TRAVIS_PULL_REQUEST" != "false" ]]; then
    now alias $deploy_url pr$TRAVIS_PULL_REQUEST-unicodetool-client.now.sh -t $NOW_TOKEN > /dev/null
    deploy_url=pr$TRAVIS_PULL_REQUEST-unicodetool-client.now.sh
fi

echo $deploy_url