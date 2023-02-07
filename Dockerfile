FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install

CMD ["node","app.js"]

EXPOSE 3002

