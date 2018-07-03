#! /usr/bin/python

def save_to_file(file_name, contents):
    fh = open(file_name, 'w')
    fh.write(contents)
    fh.close()

save_to_file('/home/zchang/tmp/mypy.txt', 'HELLO WORLD!')