FROM node:22.3.0-alpine3.19

WORKDIR /app

COPY ./h24s_25 .

RUN npm ci && npm run build