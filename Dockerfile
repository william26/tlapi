FROM centos:centos6

RUN yum install -y epel-release
RUN yum install -y nodejs npm

COPY package.json /mnt/package.json
RUN cd /mnt; npm install

COPY . /mnt

EXPOSE  3000
WORKDIR /mnt
CMD ["node", "index.js"]
