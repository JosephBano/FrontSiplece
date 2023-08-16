FROM node:18.16.0 as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

#//

FROM nginx:1.18.0

COPY --from=build-step /app/dist/FrontSiplece /usr/share/nginx/html