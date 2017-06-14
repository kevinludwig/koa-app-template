FROM node:8-wheezy

RUN mkdir -p /opt/koa-app-template
WORKDIR /opt/koa-app-template

ADD package.json /opt/koa-app-template
RUN npm install

COPY config /opt/koa-app-template/config
COPY src /opt/koa-app-template/src
ADD gulpfile.js /opt/koa-app-template
ADD .eslintrc.json /opt/koa-app-template
ADD .nycrc /opt/koa-app-template

EXPOSE 8080 
CMD ["node", "src/boot.js"]
