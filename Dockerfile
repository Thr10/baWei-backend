FROM node

RUN rm -rf /app
RUN mkdir /app
WORKDIR /app

COPY . /app
RUN npm install --registry=http://registry.npmmirror.com
RUN npm install pm2 -g --registry=http://registry.npmmirror.com
EXPOSE 3333

CMD BUILD_ENV=docker pm2-runtime  ./bin/www