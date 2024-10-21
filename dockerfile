

FROM node:14

WORKDIR /app

RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]