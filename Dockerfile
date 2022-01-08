FROM ubuntu:20.04

RUN apt-get update

RUN apt-get install -y nodejs

RUN apt-get install -y npm

RUN apt-get install -y wget

RUN npm cache clean -f && npm install -g n && n stable

RUN npm install --global yarn

WORKDIR /app/client

COPY ./package.json ./yarn.lock /app/client/

RUN yarn install
