FROM node:4.4.0-slim

RUN apt-get clean
RUN apt-get purge

COPY . /mnt

WORKDIR /mnt

RUN npm i --production

EXPOSE 3000

CMD ["node", "/mnt/index.js"]
