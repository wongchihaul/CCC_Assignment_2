import couchdb
import os
from analysis import TextClassifier
import json
from Map_Suburb import Map_Utils
import datetime

boundary = {
    # "syd": [149.971885992, -34.33117400499998, 151.63054702400007, -32.99606922499993],
    # "melb": [144.33363404800002, -38.50298801599996, 145.8784120140001, -37.17509899299995],
    # "brisbane": [152.07339276400012, -28.363962911999977, 153.54670756200005, -26.452339004999942],
    # "ald": [138.435645001, -35.350296029999974, 139.04403010400003, -34.50022530299998],
    "queensland": [138.03, -28.53, 153.35, -10],
    "south": [129, -38, 140, -26],
    "nsw": [141, -34, 154, -28],
    "western": [113,-35, 128, -19],
    "vic": [139,-36, 149,-38]

}


Map = Map_Utils()
geo_dic = Map.get_geo_dic()


# specify ip or use host.docker.internal
server = couchdb.Server('http://admin:admin@localhost:5984')
try:
    tweet_db = server['tweet_user']
except:
    tweet_db = server.create('tweet_user')


def send_data_to_db(data, db = tweet_db):
    tweet = data
    uid = tweet['doc']['user']['id_str']

    if uid not in db:
        save_tweet = {}
        save_tweet["_id"] = uid
        save_tweet['location'] = tweet['user_location']
        save_tweet['tweet_count'] = 1
        

        text = tweet['doc']['text']
        p = TextClassifier()
        res = p.analyse(text)
        save_tweet['sentiment_score'] = res[0]
        save_tweet['polarity'] = res[1]['polarity']
        save_tweet['subjectivity'] = res[1]['subjectivity']
        save_tweet['lexicon_score'] = res[2]


        user_date = tweet['doc']['user']['created_at']
        user_date = str(datetime.datetime.strptime(user_date, '%a %b %d %H:%M:%S %z %Y')).split() # ['2018-01-01', '00:00:00+00:00']
        year_mon_day = user_date[0].split('-')
        created_at = {}
        created_at['year'] = year_mon_day[0]
        created_at['month'] = year_mon_day[1]
        created_at['day'] = year_mon_day[2]

        tweet_date = tweet['doc']['created_at']
        tweet_date = str(datetime.datetime.strptime(tweet_date, '%a %b %d %H:%M:%S %z %Y')).split()
        year = tweet_date[0].split('-')[0]

        timeline = {}
        timeline['_2021_'] = {
            'statuses_count': 0,
            'followers_count': 0,
            'friends_count': 0
            
        }
        timeline['_2020_'] = {
            'statuses_count': 0,
            'followers_count': 0,
            'friends_count': 0
        }
        timeline['_2019_'] = {
            'statuses_count': 0,
            'followers_count': 0,
            'friends_count': 0
        }

        group_by_year(year, timeline, tweet)
        
        save_tweet['user'] = tweet['doc']['user']['name']
        save_tweet['created_at'] = created_at
        save_tweet['timeline'] = timeline
        if len(save_tweet) > 0:
            try:
                db.save(save_tweet)
            except:
                pass
    else:  ## saw this person before
        doc = db[uid]
        
        count = doc['tweet_count']
        doc['tweet_count'] += 1

        text = tweet['doc']['text']
        p = TextClassifier()
        res = p.analyse(text)

        doc['sentiment_score'] = (doc['sentiment_score'] * count + res[0]) / doc['tweet_count']
        doc['polarity'] = (doc['polarity'] * count + res[1]['polarity']) / doc['tweet_count']
        doc['subjectivity'] = (doc['subjectivity'] * count + res[1]['subjectivity']) / doc['tweet_count']
        doc['lexicon_score'] = (doc['lexicon_score'] * count + res[2]) / doc['tweet_count']

        tweet_date = tweet['doc']['created_at']
        tweet_date = str(datetime.datetime.strptime(tweet_date, '%a %b %d %H:%M:%S %z %Y')).split()
        year = tweet_date[0].split('-')[0]

        group_by_year(year, doc['timeline'], tweet)        

        db[uid] = doc



def group_by_year(year, timeline, tweet):
    num = eval(year)
    for i in range(num, 2022):
        year_str = '_'+str(i)+'_'
        timeline[year_str]['statuses_count'] = tweet['doc']['user']['statuses_count'] if timeline[year_str]['statuses_count'] == 0 else timeline[year_str]['statuses_count']
        timeline[year_str]['followers_count'] = tweet['doc']['user']['followers_count'] if timeline[year_str]['followers_count'] == 0 else timeline[year_str]['followers_count']
        timeline[year_str]['friends_count'] = tweet['doc']['user']['friends_count'] if timeline[year_str]['friends_count'] == 0 else timeline[year_str]['friends_count']
