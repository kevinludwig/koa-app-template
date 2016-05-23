FROM node:6.2-wheezy

RUN mkdir -p /opt/koa-app-template
WORKDIR /opt/koa-app-template

ADD package.json /opt/koa-app-template
RUN npm install

COPY config /opt/koa-app-template/config
COPY src /opt/koa-app-template/src
ADD gulpfile.js /opt/koa-app-template
ADD .eslintrc /opt/koa-app-template
RUN npm run build

EXPOSE 3000 
CMD ["node", "build/boot.js"]
