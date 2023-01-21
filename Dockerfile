FROM node:18

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install
COPY . .
RUN yarn build

EXPOSE 80
CMD ["node", "dist/main"]