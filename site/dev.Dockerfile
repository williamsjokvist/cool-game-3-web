FROM node:16-alpine

WORKDIR /cg3-site

COPY package.json src public astro.config.mjs ./

RUN npm install --loglevel verbose

ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV development

EXPOSE 3000

CMD ["npm", "run", "dev", "--host 0.0.0.0"]