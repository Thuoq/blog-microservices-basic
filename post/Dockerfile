FROM node:14.17.0

WORKDIR /post

COPY index.js package.json package-lock.json ./

RUN npm install

CMD ["sh","-c","npm run start"]
