#!/bin/bash

VERSIONS=("22.2.0") # Podés agregar más agregando nomas "23.2" y espacio, osea VERSIONS=("22.2.0" "2023.2")

for VERSION in "${VERSIONS[@]}"; do
  echo "Construyendo imagen base para SCA $VERSION..."
  docker build -f Dockerfile.base \
    --build-arg SCA_VERSION=$VERSION \
    -t sca-base:$VERSION .
done
