import couchdb
import os
from analysis import TextClassifier
import json
from Map_Suburb import Map_Utils

boundary = {
    "syd": [149.971885992, -34.33117400499998, 151.63054702400007, -32.99606922499993],
    "melb": [144.33363404800002, -38.50298801599996, 145.8784120140001, -37.17509899299995],
    "brisbane": [152.07339276400012, -28.363962911999977, 153.54670756200005, -26.452339004999942],
    "ald": [138.435645001, -35.350296029999974, 139.04403010400003, -34.50022530299998]
}


Map = Map_Utils()
geo_dic = Map.get_geo_dic()


# specify ip or use host.docker.internal
server = couchdb.Server('http://admin:admin@host.docker.internal:5984')
try:
    tweet_db = server['tweet']
except:
    tweet_db = server.create('tweet')

def get_location(coordinates):
    x = 0
    y = 0
    for p in coordinates:
        x += p[0]
        y += p[1]
    x /= len(coordinates)
    y /= len(coordinates)
    for city in boundary:
        bound_xmin = boundary[city][0]
        bound_xmax = boundary[city][2]
        bound_ymin = boundary[city][1]
        bound_ymax = boundary[city][3]
        if bound_xmin< x <bound_xmax and bound_ymin< y < bound_ymax:
            if city=="melb":
                for suburb in geo_dic:
                    features = geo_dic[suburb]['features']
                    distance = Map.get_distance(x, y, features['avg_lo'], features['avg_la'])
                    if distance<features['max_dis']:
                        return suburb
            return city
    
    return "au"


def send_data_to_db(data, db = tweet_db):
    tweet = json.loads(data)
    tid = str(tweet['id'])
    if tid not in db:
        save_tweet = {}
        save_tweet["_id"] = tid
        save_tweet["location"] = get_location(tweet['place']['bounding_box']['coordinates'][0])
        text = tweet['text']
        p = TextClassifier()
        res = p.analyse(text)
        save_tweet['sentiment_score'] = res[0]
        save_tweet['polarity'] = res[1]['polarity']
        save_tweet['subjectivity'] = res[1]['subjectivity']
        save_tweet['text'] = text
        save_tweet['lexicon_score'] = res[2]
        if save_tweet is not None:
            try:
                db.save(save_tweet)
            except:
                pass
        
