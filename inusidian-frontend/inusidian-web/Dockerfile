FROM node:24-alpine

WORKDIR /frontapp

COPY package*.json .
RUN npm install

COPY . .

ENV NODE_ENV=production
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
