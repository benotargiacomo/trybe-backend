FROM node:17-alpine3.14

RUN mkdir /frontend
WORKDIR /frontend

COPY . .
ADD node_modules.tar.gz .

RUN npm install

ENV REACT_APP_API_HOST todobackend
ENV REACT_APP_API_PORT 3001

EXPOSE 3000
CMD ["npm", "start"]