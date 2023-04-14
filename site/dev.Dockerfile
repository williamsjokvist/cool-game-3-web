FROM node:alpine

EXPOSE 3000

WORKDIR /app

COPY . ./app

RUN npm install --loglevel verbose


CMD ["npm", "run", "dev", "--host 0.0.0.0"]