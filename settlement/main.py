"""
    Preprocess settlement data
"""
import json

ADELAIDE_CODES = [40150, 43650, 40310, 42030, 45680, 40120, 44550, 45340, 44340, 44060, 42600, 40700, 47980, 48410, 40070, 41060, 45290, 40910,
                  48260, 46510, 47700, 47140, 45890]
MELBOURNE_CODES = [25340, 21450, 21610, 22170, 22670, 23430, 20910, 22310, 24970, 25900, 26350, 23670, 27450, 27350, 21110, 26980, 24410, 21890,
                   20660, 24210, 25710, 27070, 24850, 25620, 24600, 25250, 23270, 24130, 25150, 27260, 24650, 23110, 21180, 23270, 25060, 24330]
BRISBANE_CODES = [36580, 35010,
                  31000, 36250, 34590, 36510, 34580, 33960]
SYDNEY_CODES = [18550, 13100, 14000, 16370, 18000, 14500, 17420, 13800, 10750, 16350, 10900, 14900, 18400, 16100, 11500, 11450, 17150, 10750, 12850,
                13950, 16250, 10350, 16700, 14100, 14700, 18250, 15950, 15350, 15150, 10200, 11520, 14800, 17200, 18500, 18050, 16550, 11100, 16650,
                14450, 14150, 17100, 11550, 11300, 10150, 15200]
PERTH_CODES = [50210, 50350, 50420, 50490, 51310.51330, 51750, 51820, 52170, 53150, 53430, 53780, 54170, 54200, 54830, 55110, 55320, 55740, 56090, 56230, 56580, 56930, 57080,
               57490, 57700, 57840, 57910, 58050, 57980, 58510, 58570, 58760]

ADELAIDE_NAME = "Adelaide"
MELBOURNE_NAME = "Melbourne"
BRISBANE_NAME = "Brisbane"
SYDNEY_NAME = "Sydney"
PERTH_NAME = "Perth"

state_to_name = {
    1: 'Sydney',
    2: 'Melbourne',
    3: 'Brisbane',
    4: 'Adelaide',
    5: 'Perth'
}
code_to_name = {}

lga_map = {
    ADELAIDE_NAME: ADELAIDE_CODES,
    MELBOURNE_NAME: MELBOURNE_CODES,
    SYDNEY_NAME: SYDNEY_CODES,
    PERTH_NAME: PERTH_CODES,
    BRISBANE_NAME: BRISBANE_CODES
}

for name, codes in lga_map.items():
    for code in codes:
        code_to_name[code] = name


def load_meta_data(path):
    with open(path, 'r') as file:
        meta_data = json.load(file)
    attributes = meta_data['selectedAttributes']
    # for key in attributes:
    #     print(key)


def process(path):
    init_dict = {
        'humanitarian': 0,
        'skilled': 0,
        'family': 0
    }
    output_json = {}
    with open(path, 'r') as file:
        datas = json.load(file)
    for data in datas['features']:

        code = int(data['properties']['lga_code11'])
        if code in code_to_name:
            city = code_to_name[code]
            if city not in output_json:
                output_json[city] = init_dict.copy()

            for key, value in data['properties'].items():
                if key in init_dict:
                    try:
                        output_json[city][key] += value
                    except:
                        pass

    for city, _ in lga_map.items():
        try:
            print(city, ": ", output_json[city])
        except:
            pass

    with open('output.json', 'w') as file:
        json.dump(output_json, file)


if __name__ == "__main__":
    a = 1
    load_meta_data('./metadata.json')
    process('./data.json')
