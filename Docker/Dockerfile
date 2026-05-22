FROM ubuntu:22.04

WORKDIR /app

# Dependencias necesarias
RUN apt-get update && \
    apt-get install -y curl unzip gawk ca-certificates xz-utils jq && \
    apt-get clean

# Archivos base
COPY versions-table.txt .
COPY scripts/detect-version.sh .
COPY scripts/entrypoint.sh /entrypoint.sh
ARG SCA_VERSION=2024.1
ENV SCA_VERSION=${SCA_VERSION}

# Detectar la versión de Node.js
RUN chmod +x detect-version.sh && ./detect-version.sh "$SCA_VERSION"

# Instalar Node.js según la versión detectada
RUN NODE_BASE_VERSION=$(cat /NODE_VERSION) && \
    echo "🔍 Buscando versión completa para Node.js $NODE_BASE_VERSION..." && \
    NODE_VERSION=$(curl -s https://nodejs.org/dist/index.json | jq -r --arg base "$NODE_BASE_VERSION" '.[] | select(.version | startswith("v" + $base + ".")) | .version' | head -n1 | sed 's/^v//') && \
    echo "📦 Instalando Node.js $NODE_VERSION..." && \
    curl -fsSL "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz" -o node.tar.xz && \
    mkdir -p /usr/local/lib/nodejs && \
    tar -xJf node.tar.xz -C /usr/local/lib/nodejs && \
    rm node.tar.xz && \
    ln -s /usr/local/lib/nodejs/node-v$NODE_VERSION-linux-x64/bin/node /usr/bin/node && \
    ln -s /usr/local/lib/nodejs/node-v$NODE_VERSION-linux-x64/bin/npm /usr/bin/npm && \
    node -v && npm -v

# Copiar y descomprimir los ZIP en sus carpetas correspondientes
COPY sca-${SCA_VERSION}.zip .
RUN mkdir -p core && yes | unzip -o "sca-${SCA_VERSION}.zip" -d core && rm "sca-${SCA_VERSION}.zip"

COPY ExtensionDevelopmentTools-24.2.50.zip .
RUN mkdir -p extensions && yes | unzip -o ExtensionDevelopmentTools-24.2.50.zip -d extensions && rm ExtensionDevelopmentTools-24.2.50.zip

COPY ThemeDevelopmentTools-24.2.50.zip .
RUN mkdir -p themes && yes | unzip -o ThemeDevelopmentTools-24.2.50.zip -d themes && rm ThemeDevelopmentTools-24.2.50.zip

# Instalar dependencias del proyecto y ESLint (si hay package.json)
RUN npm install && \
    npm i --save-dev eslint@3.9.1 eslint-config-airbnb@13.0.0 eslint-plugin-requirejs@3.0.0

# RUN cd extensions && npm install (problema con las exxtension development tools 24 que tiene otra version y no se banca ese node)
RUN chmod +x /entrypoint.sh
# Mensaje final
CMD ["/entrypoint.sh"]
