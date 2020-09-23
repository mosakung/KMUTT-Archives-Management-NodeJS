import deepcut
from nltk.stem import WordNetLemmatizer 
from pythainlp.spell import correct
from spellchecker import SpellChecker
from pythainlp.util import isthai

spell = SpellChecker()

def unique(words):
    # intilize a null list
    unique_list = []

    # traverse for all elements
    for x in words:
        # check if exists in unique_list or not
        if x not in unique_list:
            unique_list.append(x)

    return unique_list

def lemmatizer(word):
    wordLema = WordNetLemmatizer().lemmatize(word)
    wordLemmatizer = WordNetLemmatizer().lemmatize(wordLema,'v')
    caseFloding = wordLemmatizer.casefold()

    return caseFloding

def spellCheckEnTh(word):
    fixCase = ['ฯ']
    for case in fixCase:
        if(word == case):
            return word
    thai = isthai(word)
    if(thai): 
        return correct(word)
    return spell.correction(word)

def cut(document):
    list_word = deepcut.tokenize(document)
    unnecessary_words = [" ", '\r\n']

    for word in list_word:
        # loop delete word
        for un_word in unnecessary_words:
            # find unnecessary word & delete
            if word == un_word:
                list_word.remove(word)

    return list_word

def createFrame(listWord, listUnique):
    keyFrame = dict.fromkeys(listUnique, 0)

    for word in listWord:
        keyFrame[word] += 1

    return keyFrame
