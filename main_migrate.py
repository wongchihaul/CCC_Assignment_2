import json
import os
import io
import pandas as pd
import time
from time import gmtime, strftime
import csv
# from DB_CONN_local import send_data_to_db
from Map_Suburb import get_suburb
import ijson
import argparse


parser = argparse.ArgumentParser(description='Path of files to be processed')
parser.add_argument('--data', type=str,  default='melbGrid.json',
                    help='Path to local data json file')
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
    print("getting suburb...")
    suburb_by_city = get_suburb(city_list)
    cities = [c for c in city_list if c in suburb_by_city.keys()]
    print(path)

    with open(path, 'r', encoding='utf-8') as f:
        death_obj = json.load(f)
        # for item in ijson.items(f, 'item', multiple_values=True):
        #     for key in item:
        #         print(key, ": ", item[key])
        #     break
        for key in death_obj:
            print(key)
            # for sub_keys in death_obj[key]:
            #     print(sub_keys)
            print("=====")
            # if key != 'crs':
            # print(key, ": ", death_obj[key])


if __name__ == "__main__":
    print("Start")
    path = args.data
    stream_local(path)
