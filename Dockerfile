FROM node:12

RUN mkdir -p /opt/app
WORKDIR /opt/app

ADD package.json /opt/app
RUN npm install

COPY config /opt/app/config
COPY src /opt/app/src
ADD .eslintrc.json /opt/app
ADD .nycrc /opt/app

EXPOSE 8080 
CMD ["node", "src/boot.js"]
