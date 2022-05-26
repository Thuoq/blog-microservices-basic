FROM node:14.17.0

WORKDIR /blog-client-app
COPY package*.json /blog-client-app
RUN npm install 
COPY . .
CMD ["npm","start"]