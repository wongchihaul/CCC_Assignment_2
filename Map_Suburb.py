import json
import os
import math


def get_suburb(city_list):
    cwd = os.getcwd()
    suburb_by_city = {}
    for city in city_list:
        try:
            with open(cwd + "/" + city + ".txt") as file:
                # with open(os.getcwd() + '/vic_geo.json') as file:
                lines = file.read().splitlines()
                suburb_by_city[city] = lines
        except:
            print('no data about ', city)
            pass
    return suburb_by_city


class Map_Utils():
    # def __init__(self):
    #     cwd = os.getcwd()
    #     with open(cwd+'/vic_geo.json') as file:
    #     # with open(os.getcwd() + '/vic_geo.json') as file:
    #         self.data = json.load(file)

    def get_distance(self, lat1, lon1, lat2, lon2):
        radius = 6371  # km

        dlat = math.radians(lat2 - lat1)
        dlon = math.radians(lon2 - lon1)
        a = math.sin(dlat / 2) * math.sin(dlat / 2) + math.cos(math.radians(lat1)) \
            * math.cos(math.radians(lat2)) * math.sin(dlon / 2) * math.sin(dlon / 2)
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        d = radius * c

        return d

    def get_geo_dic(self):
        geo_dic = {}
        # for line in self.data['features']:
        #     ct_name = line['properties']['vic_loca_2']
        #     coordinates = line['geometry']['coordinates'][0]
        #     # print('ct_name  :   ', ct_name)
        #     # print('coordinate  :   ', coordinates)
        #     avg_la = 0.0
        #     avg_lo = 0.0
        #     for coordinate in coordinates:
        #         avg_la += coordinate[1]
        #         avg_lo += coordinate[0]
        #     avg_la = avg_la / len(coordinates)
        #     avg_lo = avg_lo / len(coordinates)
        #     # print (avg_la, avg_lo)
        #     max_dis = 0
        #     for i in range(len(coordinates)):
        #         for j in range(len(coordinates)):
        #             if i != j:
        #                 dis = self.get_distance(coordinates[i][0], coordinates[i][1], coordinates[j][0], coordinates[j][1])
        #                 if dis > max_dis:
        #                     max_dis = dis
        #     geo_code = {}
        #     geo_code["features"] ={"avg_la": avg_la, "avg_lo": avg_lo, "max_dis": max_dis/2}
        #     geo_dic[ct_name] = geo_code
        return geo_dic


if __name__ == '__main__':
    Map = Map_Utils()
    geo_dic = Map.get_geo_dic()
    print(geo_dic)
