FROM node:17-alpine3.14

RUN mkdir /backend
WORKDIR /backend

COPY . .
ADD node_modules.tar.gz .

RUN npm install
EXPOSE 3001

CMD ["npm", "start"]
