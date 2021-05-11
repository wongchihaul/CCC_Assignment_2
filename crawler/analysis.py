import re
import os
from afinn import Afinn
from textblob import TextBlob

class TextClassifier():

    def __init__(self):
        
        cwd = os.getcwd()
        self.words_marks_pair = {}
        AFFINN_path = cwd + "/AFINN.txt"
        with open(AFFINN_path)as f:
            for line in f:
                word_marks = line.split()
                whole_word = ' '.join(word_marks[:-1])
                self.words_marks_pair[whole_word] = int(word_marks[-1])


    def clean_text(self, text):
        text = re.sub("https?:\/\/t.co\/[A-Za-z0-9]+", "", text)
        text = re.sub('["$%&\'()*+,-./:;<=>^_`{|}~\[\]!?\/\n“]+', ' ',text)
        return text

    def analyse(self, text):
        res = []
        afinn = Afinn()
        text = self.clean_text(text.lower())
        sentiment_score = afinn.score(text)
        text_blob = TextBlob(text)
        blob = {"polarity": text_blob.polarity,
                "subjectivity": text_blob.subjectivity}
        
        # max match
        words = text.split()
        lexicon_score = 0
        for word_len in range(2, -1, -1):
            del_list = []
            for i in range(len(words)-word_len):
                try:
                    word = ' '.join(words[i:word_len+i+1])
                except:
                    print("combine error")
                    print(words[i:word_len+i+1])

                try:
                    lexicon_score += self.words_marks_pair[word]
                    # print(word, words_marks_pair[word])
                    if word in words_marks_pair:
                        for k in range(i, i+word_len+1):
                            del_list.append(k)
                except:
                    continue

        res.append(sentiment_score)
        res.append(blob)
        res.append(lexicon_score)
        return res


if __name__ =="__main__":
    p = TextClassifier()
    print(p.analyse("i am really happy and i WANT TO abandon"))
