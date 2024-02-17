#!/usr/bin/env bash

source ./emsdk/emsdk_env.sh

mkdir ./build-emmake
mkdir ./build-output
cd ./build-emmake

export CFLAGS="-Wno-error"
export CXXFLAGS="-Wno-error"

# emconfigure cmake ../../
emcmake cmake ../../ -DWITH_JAVA=OFF -DWITH_CSCORE=OFF -DWITH_NTCORE=OFF -DWITH_WPILIB=OFF -DWITH_EXAMPLES=OFF -DWITH_TESTS=OFF -DWITH_GUI=OFF -DWITH_SIMULATION_MODULES=OFF

# Run emmake with the normal make to generate wasm object files.


# https://www.ibm.com/docs/en/aix/7.2?topic=file-preventing-make-command-from-stopping-errors
emmake make -i


emcc -lembind ./wpimath/CMakeFiles/wpimath.dir/src/main/native/cpp/geometry/Pose2d.cpp.o -o ../build-output/index.html
