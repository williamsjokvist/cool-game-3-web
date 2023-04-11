FROM node:alpine

COPY package.json ./app
COPY tsconfig.json ./app
COPY src ./app/src

WORKDIR /app

RUN npm i

CMD ["npm", "run", "dev", "--host 0.0.0.0"]