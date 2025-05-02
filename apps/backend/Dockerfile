FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install --frozen-lockfile

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
