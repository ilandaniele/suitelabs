#!/bin/bash

SCA_VERSION="$1"

NODE_VERSION=$(awk -F"|" -v version="$SCA_VERSION" '$1 == "SuiteCommerce Advanced — " version {gsub(/[^0-9.]/, "", $2); print $2}' versions-table.txt)


if [ -z "$NODE_VERSION" ]; then
  echo "⚠️  No se encontró versión de Node.js para SCA $SCA_VERSION"
  exit 1
fi

echo "$NODE_VERSION" > /NODE_VERSION
echo "✅ Node.js version para SCA $SCA_VERSION: $NODE_VERSION"
