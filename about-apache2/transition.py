#!/usr/bin/python

import binascii
import sys
import math
import time
import urllib
import os
import subprocess

def toregion(xtile, ytile, zoom):
   times = zoom - 3;
   for i in range(times):
      if (xtile % 2 == 1):
         xtile = (xtile - 1) / 2;
      else:
         xtile = xtile / 2;
      if (ytile % 2 ==1):
         ytile = (ytile - 1) / 2;
      else:
         ytile = ytile / 2;
   coord = xtile + 8 * ytile;
   return (coord);


def checklocal(x, y, z, db):
   avail = 0;
   args='psql -d ' + str(db) + ' -U postgres -c \'select * from exist_data where z=' + str(int(z+1)) + ' and ' + 'x=' + str(int(x)*2) + ' and ' + 'y=' + str(int(y)*2) + ';\'| wc -l';
   sqlline = subprocess.Popen(args, stdout=subprocess.PIPE, shell=True);
   avail = int(sqlline.stdout.read())-4;
   if avail == 0:
      return 0;
   args='psql -d ' + str(db) + ' -U postgres -c \'select * from exist_data where z=' + str(int(z+1)) + ' and ' + 'x=' + str(int(x)*2+1) + ' and ' + 'y=' + str(int(y)*2) + ';\'| wc -l';
   sqlline = subprocess.Popen(args, stdout=subprocess.PIPE, shell=True);
   avail = int(sqlline.stdout.read())-4;
   if avail == 0:
      return 0;
   args='psql -d ' + str(db) + ' -U postgres -c \'select * from exist_data where z=' + str(int(z+1)) + ' and ' + 'x=' + str(int(x)*2) + ' and ' + 'y=' + str(int(y)*2+1) + ';\'| wc -l';
   sqlline = subprocess.Popen(args, stdout=subprocess.PIPE, shell=True);
   avail = int(sqlline.stdout.read())-4;
   if avail == 0:
      return 0;
   args='psql -d ' + str(db) + ' -U postgres -c \'select * from exist_data where z=' + str(int(z+1)) + ' and ' + 'x=' + str(int(x)*2+1) + ' and ' + 'y=' + str(int(y)*2+1) + ';\'| wc -l';
   sqlline = subprocess.Popen(args, stdout=subprocess.PIPE, shell=True);
   avail = int(sqlline.stdout.read())-4;
   if avail == 0:
      return 0;
   return 1;
   

def num2deg(xtile, ytile, zoom):
   n = 2.0 ** zoom
   lon_deg = xtile / n * 360.0 - 180.0
   lat_rad = math.atan(math.sinh(math.pi * (1 - 2 * ytile / n)))
   lat_deg = math.degrees(lat_rad)
   return (lat_deg, lon_deg)
  
while True:
   (z,x,y) = map(int,sys.stdin.readline().split());
   jsonname='/home/lchao/osm/vector/'+ str(int(z)) + '_' + str(int(x)) + '_' + str(int(y)) + '.json';
   if os.path.exists(jsonname):
      sys.stdout.write('/vector/' + str(int(z)) + '_' + str(int(x)) + '_' + str(int(y)) + '.json' + '\n');
      sys.stdout.flush();
      continue;
   else:
      fx=float(x);
      fy=float(y);
      fz=float(z);
      (lat1, long1)=num2deg(fx,fy,fz);
      (lat2, long2)=num2deg(fx+1,fy+1,fz);
      if (lat1 < 40.2108419673093) and (lat2 > 39.7203276628608) and (long1 > 116.035690317589) and (long2 < 116.744768659913):
         geourl='http://localhost:8080/geoserver/osm_ubuntu/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=osm_ubuntu:osm_beijing&outputFormat=application/json' + '&viewparams=' + 'long1:' + str(long1) +';' + 'lat1:' + str(lat1) + ';' + 'long2:' + str(long2) + ';' + 'lat2:' + str(lat2)+ ';' + 'minzoom:' + str(int(z));
         jsontmp = '/home/lchao/tmp/'+ str(int(z)) + '_' + str(int(x)) + '_' + str(int(y)) + '.json';
         try:
            urllib.urlretrieve(geourl, jsontmp);
         except:
            continue;
         os.system('jq -c \'del(.features[].properties | .[]| select(.==null)) | del(.features[].id) |del(.features[].geometry_name)\' '+ jsontmp + '> ' + jsonname);
         os.system('rm -f ' + jsontmp + ' >> /dev/null 2>&1');
         sys.stdout.write('/vector/' + str(int(z)) + '_' + str(int(x)) + '_' + str(int(y)) + '.json' + '\n');
         sys.stdout.flush();
         continue;
      else:
         coord = toregion(int(x), int(y), int(z));
         foreigndb = 'osm_outside_' + str(coord);
         args='psql -d ' + foreigndb + ' -U postgres -c \'select * from exist_data where z=' + str(z) + ' and ' + 'x=' + str(x) + ' and ' + 'y=' + str(y) + ';\'| wc -l';
         sqlline = subprocess.Popen(args, stdout=subprocess.PIPE, shell=True);
         count = int(sqlline.stdout.read())-4;
         availoc = checklocal(int(x), int(y), int(z), str(foreigndb));
         if availoc == 1:
               os.system('psql -d ' + foreigndb + ' -U postgres -c \'insert into exist_data VALUES(' + str(z) +',' + str(x) + ',' + str(y) + ')\'');
         if (count != 0) or (availoc == 1):
            geourl='http://localhost:8080/geoserver/osm_ubuntu/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=osm_ubuntu:osm_outside_' + str(coord) + '&outputFormat=application/json' + '&viewparams=' + 'long1:' + str(long1) +';' + 'lat1:' + str(lat1) + ';' + 'long2:' + str(long2) + ';' + 'lat2:' + str(lat2) + ';' + 'minzoom:' + str(int(z));
            jsontmp = '/home/lchao/tmp/'+ str(int(z)) + '_' + str(int(x)) + '_' + str(int(y)) + '.json';
            try:
               urllib.urlretrieve(geourl, jsontmp);
            except:
               continue;
            os.system('jq -c \'del(.features[].properties | .[]| select(.==null)) | del(.features[].id) |del(.features[].geometry_name)\' '+ jsontmp + '> ' + jsonname);
            os.system('rm -f ' + jsontmp + ' >> /dev/null 2>&1');
            sys.stdout.write('/vector/' + str(int(z)) + '_' + str(int(x)) + '_' + str(int(y)) + '.json' + '\n');
            sys.stdout.flush();
            continue;
         else:
            sys.stdout.write('/void/void.json' + '\n');
            sys.stdout.flush();
            if int(z) < 12:
               continue;
            else:
               os.system('/home/lchao/osm/bkg.py ' + str(z) + ' ' + str(x) + ' ' + str(y) + ' &');