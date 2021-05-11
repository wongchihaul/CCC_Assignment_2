FROM python:3

COPY . .
RUN pip3 install -r requirements.txt

CMD [ "python3", "./main_crawler.py"]
CMD tail -F /var/log/zookeeper.log
