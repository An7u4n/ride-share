FROM node:18-alpine AS builder
ADD https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2.8.0/cloud-sql-proxy.linux.amd64 /cloud-sql-proxy
RUN chmod +x /cloud-sql-proxy
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i
COPY . .
RUN npx prisma generate
CMD ["/bin/sh", "-c", "/cloud-sql-proxy ride-share-454921:us-central1:ride-share-mysql & npm run dev"]
