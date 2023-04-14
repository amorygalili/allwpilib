#!/usr/bin/env bash

source ./emsdk/emsdk_env.sh

mkdir ./build-emmake
cd ./build-emmake

export CFLAGS="-Wno-error"
export CXXFLAGS="-Wno-error"

# emconfigure cmake ../../
emcmake cmake ../../ -DWITH_JAVA=OFF -DWITH_SHARED_LIBS=OFF -DWITH_CSCORE=OFF -DWITH_NTCORE=OFF -DWITH_WPILIB=OFF -DWITH_EXAMPLES=OFF -DWITH_TESTS=OFF -DWITH_GUI=OFF -DWITH_SIMULATION_MODULES=OFF --disable-werror -Wunused-but-set-variable --disable-ewarning

# Run emmake with the normal make to generate wasm object files.


# https://www.ibm.com/docs/en/aix/7.2?topic=file-preventing-make-command-from-stopping-errors
emmake make -i
