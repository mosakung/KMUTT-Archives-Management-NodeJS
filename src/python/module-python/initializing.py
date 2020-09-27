import sys
import os
import tensorflow as tf

print(tf.__version__)

root = os.path.abspath(os.getcwd())
sys.path.append(root + "./src/python/module-python/src-python")

import readfile as rf
import haddleTokenize
import calculate

""" directory = sys.argv[1]
documents = rf.readDirectory(directory) """
documents = rf.readDirectory('D:\\BearSouL\\Project\\prj-tf-idf-compact/src/documents/dummy')

docsCut = []

for key, value in documents.items():
  docCut = haddleTokenize.cut(value)
  docCut = list(map(haddleTokenize.lemmatizer, docCut))

  docsCut.extend(docCut)

print(docsCut)

tf.model

sys.stdout.flush()
