import sys
import os
import tensorflow as tf

print(tf.__version__)

root = os.path.abspath(os.getcwd())
sys.path.append(root + "./src/python/module-python/src-python")

import readfile as rf
import haddleTokenize
import calculate

tf.test.is_gpu_available(cuda_only=False, min_cuda_compute_capability=None)

""" directory = sys.argv[1] """
documents = rf.readDirectory(root + '/src/documents/dummy')

docsCut = []

for key, value in documents.items():
  docCut = haddleTokenize.cut(value)
  docCut = list(map(haddleTokenize.lemmatizer, docCut))

  docsCut.extend(docCut)

print(docsCut)
