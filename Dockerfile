FROM node:alpine3.19

RUN mkdir /app/

WORKDIR ./app/

COPY . .

RUN npm install

RUN npm install -g nodemon

CMD ["npm", "start"]
