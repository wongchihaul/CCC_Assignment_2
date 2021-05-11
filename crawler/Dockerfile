FROM python:3

WORKDIR /usr/scr/app

COPY . .
RUN pip3 install -r requirements.txt

CMD [ "python3", "./main_crawler.py"]&& tail -F /var/log/zookeeper.log
