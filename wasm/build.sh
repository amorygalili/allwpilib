#!/usr/bin/env bash

source ./emsdk/emsdk_env.sh

mkdir ./build-emmake
cd ./build-emmake

# emconfigure cmake ../../
emcmake cmake ../../ -DWITH_JAVA=OFF -DWITH_SHARED_LIBS=OFF -DWITH_CSCORE=OFF -DWITH_NTCORE=OFF -DWITH_WPILIB=OFF -DWITH_EXAMPLES=OFF -DWITH_TESTS=OFF -DWITH_GUI=OFF -DWITH_SIMULATION_MODULES=OFF

# Run emmake with the normal make to generate wasm object files.
emmake make -Werror -Wunused-but-set-variable
