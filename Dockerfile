FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm run

COPY . . 

EXPOSE 3000

CMD ["npm","dev"]