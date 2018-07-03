#!/usr/bin/python

import binascii
import sys
import math
import time
import urllib
import os
import subprocess

#global variable
#Base32 = "0123456789bcdefghjkmnpqrstuvwxyz".split("");
Base32 = "0123456789bcdefghjkmnpqrstuvwxyz";
Bits = [16, 8, 4, 2, 1];


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


def checklocal(x,y, z, db):
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
   
  
def decode_geohash(geohash):
   even = True;
   lat = [-90.0,90.0];
   lon = [-180.0,180.0];
   for i in range(len(geohash)):
      c= geohash[i];
      cd = Base32.index(c);
      for j in range(0,5):
         mask = Bits[j];
         if even:
            RefineInterval(lon, cd, mask);
         else:
            RefineInterval(lat, cd, mask);
         even = not even;
   return (lon[0], lon[1], lat[0], lat[1]);

def RefineInterval(interval, cd, mask):
   if (cd & mask) != 0:
      interval[0] = (interval[0] + interval[1])/2;
   else:
      interval[1] = (interval[0] + interval[1])/2;

def save_to_file(file_name, contents):
    fh = open(file_name, 'a+')
    fh.write(contents)
    fh.close()
  
while True:
   (z,geohash) = map(str,sys.stdin.readline().split());
   jsonname = '/home/lchao/osm/geohash/'+ str(int(z)) + '_' + str(geohash) + '.json';
   geohashjsonname='/home/lchao/osm/geohashjson/'+ str(int(z)) + '_' + str(geohash) + '.json';
   if os.path.exists(geohashjsonname):
      sys.stdout.write('/geohashjson/' + str(int(z)) + '_' + str(geohash) + '.json' + '\n');
      sys.stdout.flush();
      continue;
   else:
      (long1,long2,lat1,lat2)=decode_geohash(geohash);
      if (lat1 < 40.2108419673093) and (lat2 > 39.7203276628608) and (long1 > 116.035690317589) and (long2 < 116.744768659913):
         geourl='http://localhost:8080/geoserver/osm_ubuntu/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=osm_ubuntu:osm_beijing&outputFormat=application/json' + '&viewparams=' + 'long1:' + str(long1) +';' + 'lat1:' + str(lat1) + ';' + 'long2:' + str(long2) + ';' + 'lat2:' + str(lat2)+ ';' + 'minzoom:' + str(int(z));
         jsontmp = '/home/lchao/tmp/'+ str(int(z)) + '_' + str(geohash) + '.json';
         try:
            urllib.urlretrieve(geourl, jsontmp);
         except:
            continue;
         os.system('jq -c \'del(.features[].properties | .[]| select(.==null)) | del(.features[].id) |del(.features[].geometry_name)\' '+ jsontmp + '> ' + jsonname);
         os.system('rm -f ' + jsontmp + ' >> /dev/null 2>&1');
         #sys.stdout.write('/geohash/' + str(int(z)) + '_' + str(geohash) + '.json' + '\n');
         #sys.stdout.flush();
         #add exchange code
         jsonfilename = str(int(z)) + '_' + str(geohash);
         geohashjsonname = '/home/lchao/osm/geohashjson/' + jsonfilename + '.json';
         #os.system('node /home/lchao/osm/geojson_2_geohashjson-server.js'+ jsonfilename + '> ' + geohashjsonname);
         os.system('node /home/lchao/osm/geojson_2_geohashjson-server.js '+ jsonfilename + '> ' + geohashjsonname);
	 #os.system('rm -f ' + '/home/lchao/osm/geohash/'+jsonfilename + ' >> /dev/null 2>&1');
         sys.stdout.write('/geohashjson/' + str(int(z)) + '_' + str(geohash) + '.json' + '\n');
         #sys.stdout.write(geohashjsonname + '\n');
         sys.stdout.flush();
         continue;
      else:##exceeding the scope of bejing, ignore this for the moment. 
         coord = toregion(int(x), int(y), int(z));
         foreigndb = 'osm_outside_' + str(coord);
         args='psql -d ' + foreigndb + ' -U postgres -c \'select * from exist_data where z=' + str(z) + ' and ' + 'geohash=' + str(geohash) + ';\'| wc -l';
         sqlline = subprocess.Popen(args, stdout=subprocess.PIPE, shell=True);
         count = int(sqlline.stdout.read())-4;
         availoc = checklocal(int(x), int(y), int(z), str(foreigndb));
         if availoc == 1:
               os.system('psql -d ' + foreigndb + ' -U postgres -c \'insert into exist_data VALUES(' + str(z) +',' + str(geohash) + ')\'');
         if (count != 0) or (availoc == 1):
            geourl='http://localhost:8080/geoserver/osm_ubuntu/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=osm_ubuntu:osm_outside_' + str(coord) + '&outputFormat=application/json' + '&viewparams=' + 'long1:' + str(long1) +';' + 'lat1:' + str(lat1) + ';' + 'long2:' + str(long2) + ';' + 'lat2:' + str(lat2) + ';' + 'minzoom:' + str(int(z));
            jsontmp = '/home/lchao/tmp/'+ str(int(z)) + '_' + str(geohash) + '.json';
            try:
               urllib.urlretrieve(geourl, jsontmp);
            except:
               continue;
            os.system('jq -c \'del(.features[].properties | .[]| select(.==null)) | del(.features[].id) |del(.features[].geometry_name)\' '+ jsontmp + '> ' + jsonname);
            os.system('rm -f ' + jsontmp + ' >> /dev/null 2>&1');
            sys.stdout.write('/geohash/' + str(int(z)) + '_' + str(geohash) + '.json' + '\n');
            sys.stdout.flush();
            continue;
         else:
            sys.stdout.write('/void/void.json' + '\n');
            sys.stdout.flush();
            if int(z) < 12:
               continue;
            else:
               os.system('/home/lchao/osm/bkg_geohash.py ' + str(z) + ' ' + str(geohash) + ' &');
