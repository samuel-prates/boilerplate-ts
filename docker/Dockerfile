FROM node:10.22.1-alpine3.11

ENV NODE_ENV=prod
COPY ./dist ./
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm ci --prod
RUN npm install --no-dev

EXPOSE 3000
CMD ["node", "index.js"]