FROM node:16-alpine

WORKDIR /next

COPY *.json *.config.js ./
COPY public src ./

RUN npm install --loglevel verbose

ENV PORT=3000
ENV HOST=0.0.0.0
ENV NODE_ENV development

EXPOSE 3000

CMD ["npm", "run", "dev", "--host 0.0.0.0"]