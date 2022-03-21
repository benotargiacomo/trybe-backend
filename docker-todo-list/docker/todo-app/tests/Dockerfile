FROM mjgargani/puppeteer:trybe1.0

RUN mkdir /tests
WORKDIR /tests

COPY . .
ADD node_modules.tar.gz .

RUN npm install

ENV FRONT_HOST todofrontend
ENV FRONT_PORT 3000

CMD ["npm", "test"]