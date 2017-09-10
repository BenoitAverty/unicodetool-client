#!/bin/bash

set -e

npm run lint:check
npm run test
npm run build
