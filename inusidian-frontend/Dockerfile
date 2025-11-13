FROM node:18-alpine

WORKDIR /inusidian-frontend

COPY package*.json .
RUN npm install

COPY . .

ENV NODE_ENV=production
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
