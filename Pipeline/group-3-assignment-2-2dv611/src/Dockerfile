FROM node:12-slim AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci
COPY . .

ENV MONGO_URL=mongodb://localhost:27017/calc

EXPOSE 3000
CMD ["node", "server.js"]
