# Build
FROM node:lts-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run lint && \
    npm run build

# Prod
FROM nginx:stable as prod

COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
