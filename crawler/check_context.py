import json
import pandas as pd

if __name__ == '__main__':
    context_list = []
    try:

        with open('ini_data.json', 'r')as f:
            lines = f.readlines()
            for line in lines:
                text = json.loads(line)
                context_list.append(text['text'])
        df_text = pd.DataFrame()
        df_text['text'] = context_list
        for text in context_list:
            print(text+"\n")

    except IOError:
        print("can not find the file")
        exit(1)