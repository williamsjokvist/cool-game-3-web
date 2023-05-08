FROM node:16-alpine

COPY proto ./proto

COPY ./next/*.json ./next/*.config.js ./next/
COPY ./next/public ./next/public
COPY ./next/src ./next/src

WORKDIR /next

RUN npm install --loglevel verbose

ENV PORT=3000
ENV HOST=0.0.0.0
ENV NODE_ENV development

EXPOSE 3000

CMD ["npm", "run", "dev", "--host 0.0.0.0"]