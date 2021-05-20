"""
    Preprocess employment projection data
"""
import json

ref_dic = {}

def process_meta(path):
    with open(path, 'r') as file:
        meta_data = json.load(file)
    attributes = meta_data['selectedAttributes']
    for attribute in attributes:
        ref_dic[attribute['name']] = attribute['title']


def process(path):
    init_dict = {
        "proj_empy_grth_five_yrs_may_2022_000_admt_supp": 11.255313,
        "proj_empy_grth_five_yrs_may_2022_pr100_whsl_trade": 0.0931333,
        "proj_empy_grth_five_yrs_may_2022_pr100_trns_pstl_whse": 8.8720665,
        "proj_empy_grth_five_yrs_may_2022_000_agri_frsty_fish": 0.33624938,
        "proj_empy_grth_five_yrs_may_2022_000_utility": -1.0158374,
        "proj_empy_grth_five_yrs_may_2022_pr100_accom_food": 14.142522,
        "proj_empy_grth_five_yrs_may_2022_000_finc_insur": 6.68669,
        "proj_empy_grth_five_yrs_may_2022_pr100_info_med_coms": -2.757029,
        "proj_empy_grth_five_yrs_may_2022_000_edu_training": 30.845291,
        "proj_empy_grth_five_yrs_may_2022_pr100_tot_industry": 9.8200445,
        "proj_empy_grth_five_yrs_may_2022_000_manu": -14.902143,
        "proj_empy_grth_five_yrs_may_2022_000_tot_industry": 232.97926,
        "proj_empy_grth_five_yrs_may_2022_000_pro_sci_tech": 35.697823,
        "proj_empy_grth_five_yrs_may_2022_pr100_manu": -6.799372,
        "proj_empy_grth_five_yrs_may_2022_000_arts_rec": 2.9698799,
        "proj_empy_grth_five_yrs_may_2022_pr100_admt_supp": 12.589514,
        "proj_empy_grth_five_yrs_may_2022_000_info_med_coms": -1.4020272,
        "proj_empy_grth_five_yrs_may_2022_pr100_hlth_care_soc_asst": 20.149015,
        "proj_empy_grth_five_yrs_may_2022_pr100_pro_sci_tech": 14.660844,
        "proj_empy_grth_five_yrs_may_2022_000_rent_hiring_rlst": 4.559234,
        "proj_empy_grth_five_yrs_may_2022_000_accom_food": 22.56646,
        "proj_empy_grth_five_yrs_may_2022_000_pub_admt_safety": 15.88539,
        "proj_empy_grth_five_yrs_may_2022_pr100_arts_rec": 6.2515974,
        "proj_empy_grth_five_yrs_may_2022_pr100_utility": -3.6078892,
        "proj_empy_grth_five_yrs_may_2022_pr100_rent_hiring_rlst": 11.530921,
        "proj_empy_grth_five_yrs_may_2022_pr100_oth": 3.4179943,
        "proj_empy_grth_five_yrs_may_2022_pr100_cons": 13.3542,
        "proj_empy_grth_five_yrs_may_2022_pr100_agri_frsty_fish": 2.2567036,
        "proj_empy_grth_five_yrs_may_2022_000_whsl_trade": 0.09024349,
        "proj_empy_grth_five_yrs_may_2022_pr100_rtl_trade": 7.688847,
        "proj_empy_grth_five_yrs_may_2022_pr100_pub_admt_safety": 13.632853,
        "proj_empy_grth_five_yrs_may_2022_000_hlth_care_soc_asst": 60.282303,
        "proj_empy_grth_five_yrs_may_2022_pr100_mining": -4.770681,
        "proj_empy_grth_five_yrs_may_2022_pr100_edu_training": 15.676771,
        "proj_empy_grth_five_yrs_may_2022_000_mining": -0.28034034,
        "proj_empy_grth_five_yrs_may_2022_000_cons": 26.154655,
        "proj_empy_grth_five_yrs_may_2022_000_rtl_trade": 19.63421,
        "proj_empy_grth_five_yrs_may_2022_000_trns_pstl_whse": 10.702772,
        "proj_empy_grth_five_yrs_may_2022_pr100_finc_insur": 6.2147894,
        "proj_empy_grth_five_yrs_may_2022_000_oth": 2.913102
    }

    output_json = {}

    with open(path, 'r') as file:
        datas = json.load(file)
    for data in datas['features']:    
        city = data['properties']['gcc_name11']
        if city not in output_json:
            output_json[city] = init_dict.copy()

        for key, value in data['properties'].items():
            if key in init_dict:
                try:
                    output_json[city][key] = value
                except:
                    pass

    output_json_title = {}
    for _ in output_json:
        output_json_title[_] = {}
        for key, value in output_json[_].items():
            output_json_title[_][ref_dic[key]] = value


    with open('output.json', 'w') as file:
        json.dump(output_json_title, file)


if __name__ == "__main__":
    a = 1
    process_meta('./metadata.json')
    process('./projection.json')
