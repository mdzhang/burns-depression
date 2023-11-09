FROM node:18.14-slim

# Install for mTLS root certificates
RUN apt-get update && apt-get install -y \
  ca-certificates \
  gcc \
  g++ \
  make \
  openssl \
  git \
  python3 \
  autoconf \
  automake && \
  rm -rf /var/lib/apt/lists/*

RUN mkdir -p /frontend
WORKDIR /frontend

COPY ./package.json /frontend/
COPY ./yarn.lock /frontend/
RUN yarn install --ignore-optional
