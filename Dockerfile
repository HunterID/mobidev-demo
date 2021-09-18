FROM node:14.16.0

WORKDIR /usr/src

COPY package.json ./
COPY package-lock.json ./

RUN npm ci

COPY . .

EXPOSE 3000

CMD npm run start
