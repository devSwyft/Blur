FROM node:alpine

COPY . /app
WORKDIR /app

RUN rm -rf node_modules

RUN npm i -gf yarn
RUN yarn

RUN yarn build

CMD yarn start:prod