FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install
RUN npm install pm2 -g

COPY ./dist .

EXPOSE 4001  

CMD ["pm2-runtime","index.js"]
