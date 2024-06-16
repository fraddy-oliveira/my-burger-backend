FROM node:20.12.2-alpine3.19 AS dependencies
WORKDIR /usr/src/app
RUN npm install -g nodemon
COPY package.json package-lock.json ./
RUN npm install
COPY . .

FROM node:20.12.2-alpine3.19 AS builder
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY . .

FROM node:20.12.2-alpine3.19 AS production
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/package-lock.json ./package-lock.json
RUN npm ci
COPY --from=builder /usr/src/app/bin ./bin
COPY --from=builder /usr/src/app/routes ./routes
COPY --from=builder /usr/src/app/middleware ./middleware
COPY --from=builder /usr/src/app/app.js ./app.js
EXPOSE 5001
CMD [ "npm", "run", "start" ]
