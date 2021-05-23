"""
    Preprocess labour market summary data
"""
import json




def process_sa4(path):
    init_dict = {
        # Youth Unemployment Rate (15-24)
        'yth_unemp_rt_15_24': 0,

        # Employment rate (15-64)
        'mpy_rt_15_64': 0,

        # Working age population (15-64)
        'working_age_pop_15_64': 0,

        # Unemployment rate (15+)
        'unemp_rt_15': 0,

        # Participation rate (15+)
        'ptic_rt_15': 0
    }
    output_json = {}
    with open(path, 'r') as file:
        datas = json.load(file)
    for data in datas['features']:    
        sa4 = data['properties']['sa4_name_2016']
        if sa4 not in output_json:
            output_json[sa4] = init_dict.copy()

        for key, value in data['properties'].items():
            if key in init_dict:
                try:
                    output_json[sa4][key] = value
                except:
                    pass



    with open('output_sa4.json', 'w') as file:
        json.dump(output_json, file)


if __name__ == "__main__":
    a = 1
    # load_meta_data('./metadata.json')
    process_sa4('./summary.json')
