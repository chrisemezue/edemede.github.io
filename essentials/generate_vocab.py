from collections import Counter
import re,string


def add_text_to_vocab(w,vocab):
    list = [words for words in w.split(' ')]
    token_list =[]
    for i in range(len(list)):
        #load file
        #tokens = clean_doc(list[i])
        #token_list.append(tokens)
        vocab.update(list)
    return token_list

def save_vocab(vocab,filename):
    tokens = [k for k, c in vocab.items()]
    # print(len(tokens))
    file = open(filename, 'w+')
    for token in tokens:
        file.write(token)
        file.write('\n')
        #file.write(data)
    file.close()
    
    
def preprocess(w):
    w = w.lower().strip()

    # creating a space between a word and the punctuation following it
    # eg: "he is a boy." => "he is a boy ."
    # Reference:-
    # https://stackoverflow.com/questions/3645931/python-padding-punctuation-with-white-spaces-keeping-punctuation
    w= w.replace("<p>", " ")
    w = w.replace("</p>", " ")
    w = re.sub(r"([?.!,¿])", r" \1 ", w)
    w = re.sub(r'[" "]+', " ", w)

    re_punc = re.compile('[%s]' % re.escape(string.punctuation))
    w = re_punc.sub('', w)

    lines_str = w.replace("”", "")

    lines_str = lines_str.replace("“", "")
    lines_str = lines_str.replace("’", "'")
    lines_str = lines_str.replace("«", "")
    lines_str = lines_str.replace("»", "")
    # #
    lines_str = ' '.join([word for word in lines_str.split() if word.isalpha()])
    # # replacing everything with space except (a-z, A-Z, ".", "?", "!", ",")
    # # w = re.sub(r"[^a-zA-Z?.!,¿]+", " ", w)
    #
    # w = lines_str

    # adding a start and an end token to the sentence
    # so that the model know when to start and stop predicting.
    w = lines_str
    #tokens = [words for words in w.split(' ')]
    #add_text_to_vocab(tokens,vocab)
    return w

vocab_src = Counter()

with open('C:/Users/USER/Downloads/Compressed/json/igbo_data10000.txt', 'r') as src:
    lines = src.readlines()
    for line in lines:
        add_text_to_vocab(preprocess(line),vocab_src)

save_vocab(vocab_src,'C:/xampp/htdocs/IgboKeyboard/essentials/ig-vocab.txt')
print("All done")