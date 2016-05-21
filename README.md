### koa-app-template

Basic app template with koa and gulp

### Setup

Install [node 6.2](https://nodejs.org/en/download/current/') or better

```
npm install
npm test
npm start
```

### Docker setup

* Install [Docker](https://www.docker.com/products/docker-toolbox)
* Create a docker VM `docker-machine create --driver virtualbox default`
* Put the following in your `.bash_profile`: `eval "$(docker-machine env default)"`
* build a docker container for this project: `docker build -t koa-app-template`
* run it: `docker run -i -t koa-app-template`

### TODO

* Integrate the doc api middleware
