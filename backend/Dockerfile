FROM python:3

WORKDIR /usr/scr/app

RUN apt-get update \
    && apt-get install -y nodejs npm

COPY . .

RUN npm install 

CMD npm start
