FROM node:10

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --production

COPY . .

EXPOSE 8001

CMD ["node", "index.js"]