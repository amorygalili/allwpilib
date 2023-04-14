#!/usr/bin/env bash

source ./emsdk/emsdk_env.sh
cd ./hello_world

emmake

# emcc ./hello_world.c
# node a.out.js

emcc hello_world.c -o index.html
npx --yes http-server

