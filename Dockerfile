# Стадия сборки
FROM node:18.19.0-alpine3.18 AS builder
WORKDIR /usr/app
COPY . .
RUN rm -rf node_modules && yarn install --frozen-lockfile
RUN yarn build

# Стадия запуска — nginx
FROM nginx:stable-alpine
COPY --from=builder /usr/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
