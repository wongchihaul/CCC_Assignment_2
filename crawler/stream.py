import tweepy as tw
import io
import pandas as pd
import time
import json
from time import gmtime, strftime
import csv

class StreamListener(tw.StreamListener):
    date_since = strftime("%Y-%m-%d_%H:%M:%S", gmtime())

    file_name = "ini_data.json" #TODO: Change
    target_file = io.open(file_name, 'a', encoding='utf-8')

    def on_data(self, data):
        try:
            place = json.loads(data)['place']
            if  place != None:
                self.target_file.write(data)

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


if __name__ == '__main__':

    try:

        with open('config.json', 'r')as f:
            config = json.load(f)

            if 'account' not in config:
                print("account not found")
                exit(1)
            if 'search_words' not in config:
                print("search word not found")
                exit(1)

            account = config['account']
            search_words = config['search_words']
            print(search_words)

    except IOError:
        print("can not find the file")
        exit(1)

    print("stream ini")
    listener = StreamListener()
    auth = tw.OAuthHandler(consumer_key=account["consumer_key"], consumer_secret=account["consumer_secret"])
    auth.set_access_token(account["access_token"], account["access_token_secret"])

    stream = tw.Stream(auth, listener, tweeet_mode='extended')
    stream.filter(languages = ["en"], track=search_words, is_async=True, locations=[
                  112.28, -44.36, 155.23, -10.37])