FROM node:slim

WORKDIR /cg3-site

COPY package.json src public astro.config.mjs ./

RUN npm install --loglevel verbose

EXPOSE 3000

CMD ["npm", "run", "dev", "--host 0.0.0.0"]