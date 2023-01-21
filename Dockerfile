FROM node:18

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install
RUN yarn build

COPY . .
EXPOSE 80
CMD ["node", "dist/main"]