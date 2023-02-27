FROM ubuntu:20.04

RUN apt-get update

RUN apt-get install -y nodejs

RUN apt-get install -y npm

RUN apt-get install -y wget

RUN npm cache clean -f && npm install -g n && n stable

RUN npm install --global yarn react-scripts react

WORKDIR /app/client

COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn install
COPY ./docker/runner.sh ./docker/
RUN chmod +x  /app/client/docker/runner.sh
