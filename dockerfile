FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i
COPY . .
RUN npx prisma generate
CMD ["npm","run","dev"]
