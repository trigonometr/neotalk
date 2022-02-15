FROM node:16.14

WORKDIR /front/

COPY ./package.json /front/package.json
RUN npm install --prefix /front/
COPY . /front/