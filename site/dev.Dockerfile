FROM node:alpine

COPY . ./app

WORKDIR /app

RUN npm i

CMD ["npm", "run", "dev", "--host 0.0.0.0"]