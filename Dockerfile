FROM node:18.19.0-alpine3.18
WORKDIR /usr/app
COPY package.json .
RUN rm -rf node_modules && yarn install --frozen-lockfile
