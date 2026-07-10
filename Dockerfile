FROM node:22-alpine

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY bootstrap ./bootstrap
COPY config ./config
COPY app ./app
COPY routes ./routes
COPY middleware ./middleware
COPY database ./database
COPY src ./src

RUN mkdir -p database

EXPOSE 8007

ENV NODE_ENV=production
ENV PORT=8007
ENV APP_HOST=0.0.0.0

CMD ["node", "src/server.js"]
