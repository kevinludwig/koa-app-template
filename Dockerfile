FROM node:6.2-slim

RUN mkdir -p /opt/koa-app-template
WORKDIR /opt/koa-app-template

COPY package.json /opt/koa-app-template
RUN npm install

COPY build /opt/koa-app-template
EXPOSE 8080

CMD "node boot.js"
