#stage 1

FROM node:18.16.0 as node

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build --prod

#stage 2

FROM nginx:alpine

COPY --from=node /app/dist/front-end /usr/share/nginx/html