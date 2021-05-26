import json
import os
import io
import pandas as pd
import time
from time import gmtime, strftime
import csv
from DB_CONN_local import send_data_to_db
from Map_Suburb import get_suburb
import ijson
import argparse


parser = argparse.ArgumentParser(description='Path of files to be processed')
parser.add_argument('--data', type=str,  default='melbGrid.json', help='Path to local data json file')
args = parser.parse_args()

def stream_local(path):

    keywords = [
            "vaccine",
            "side effect",
            "covid test",
            "Pfizer",
            "Oxford vaccine",
            "Unemployed",
            "homeless",
            "rent",
            "immigration",
            "work",
            "apartment",
            "salary",
            "sport",
            "game",
            "look for a job",
            "lose job",
            "afford",
            "coronavirus",
            "corona",
            "isolation"
        ]
    city_list = [
        'melbourne',
        'sydney',
        'brisbane',
        'perth'
    ]

    state_city = {
        'melbourne' : 'Victoria',
        'sydney' : 'New South Wales',
        'brisbane' : 'Queensland',
        'perth' : 'Western Australia'
    }
    suburb_by_city = get_suburb(city_list)
    cities = [c for c in city_list if c in suburb_by_city.keys()]
    

    with open(path, 'r', encoding='utf-8') as f:
        for row in ijson.items(f, 'rows.item', multiple_values=True):
            try:
                location = row['doc']['user']['location']
                if location != '':
                    for city in cities:
                        subs = suburb_by_city[city]
                        for sub in subs:
                            if sub in location:
                                user_location = {}
                                user_location['suburb'] = sub
                                user_location['city'] = city.capitalize()
                                user_location['state'] = state_city[city]
                                row['user_location'] = user_location
                                send_data_to_db(row)
                                break
            except:
                pass

if __name__ == "__main__":
    path = args.data
    stream_local(path)