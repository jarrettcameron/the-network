FROM node:18 AS client-builder
WORKDIR /app

COPY . .

RUN npm install
RUN npm run build