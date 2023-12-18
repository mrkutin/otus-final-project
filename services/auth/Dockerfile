FROM node:20
WORKDIR /usr/src/app
COPY ./package.json .
RUN npm i
COPY ./*.mjs ./
COPY ./routers ./routers
COPY ./adapters ./adapters
COPY ./middlewares ./middlewares
CMD npm start