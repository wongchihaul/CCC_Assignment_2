import json
import os
import tweepy as tw
import io
import pandas as pd
import time
from time import gmtime, strftime
import csv
from multiprocessing import Process
from DB_CONN import send_data_to_db


class StreamListener(tw.StreamListener):

    def __init__(self, city):
        super(tw.StreamListener, self).__init__()
        self.city = city
        self.date_since = strftime("%Y-%m-%d_%H:%M:%S", gmtime())
        self.file_name = city+"_data.json"
        self.target_file = io.open(self.file_name, 'a', encoding='utf-8')

    def on_data(self, data):
        try:
            place = json.loads(data)['place']
            if  place != None:
                send_data_to_db(data)
                # self.target_file.write(data)

        except BaseException as e:
            # Exception is rare but possible. A potential explanation is multiple retweets that will crash the program
            # Chance of happening about 0.1%. Printed the whole json file in terminal for manual log if needed
            print("Exception made. Data printed below")
            print(data)
            print(e)
            return True

        return True

    # Nothing in here. Leave for potential uses
    def on_status(self, status):
        if status.retweeted:
            return

    # Haven't been into unexpected error after 24hrs of testing. Leave it handled for potential twitter crashes
    def on_error(self, status_code):
        print(status_code)

        if status_code == 420:
            time.sleep(10)
        if status_code == 429:
            print("Waiting on limit")
            time.sleep(15*60 + 1)
        else:
            print("unexpected error. See error code above. Retry in 10 s")
            time.sleep(10)

def getAccess():
    res = []
    try:

        with open('config.json', 'r')as f:
            try:
                configs = json.load(f)
            except:
                print(configs," is not a json file")
                exit(1)

            for owner in configs:
                config = configs[owner]
                if 'account' not in config:
                    print("account not found")
                    exit(1)
                if 'search_words' not in config:
                    print("search word not found")
                    exit(1)
                res.append(config)

    except IOError:
        print("can not find the file")
        exit(1)

    return res

def stream_live(config):
    listener = StreamListener(config['locations']['city'])
    account, keywords, locations = config['account'], config['search_words'], config['locations']['coordinators']
    auth = tw.OAuthHandler(consumer_key=account["consumer_key"], consumer_secret=account["consumer_secret"])
    auth.set_access_token(account["access_token"], account["access_token_secret"])
    stream = tw.Stream(auth, listener, tweet_mode='extended')
    stream.filter(languages = ["en"],track=['melb','mel','melbourne'], is_async=True, locations= locations )

if __name__ == "__main__":
    cfgs = getAccess()
    jobs = []
    # stream_live(cfgs[2])
    for i in range(len(cfgs)):
        config = cfgs[i]
        p = Process(target=stream_live, args=(config,), daemon=True)
        jobs.append(p)
        p.start()

    [p.join() for p in jobs]