
## tilelayer地图展示过程
1. 浏览器提供请求tilelayer所需的（x,y,z）给geoserver,geoserver返回给浏览器对应层级z的geojson格式地图数据。
2. leaflet根据得到的geojson数据和缩放等级z,将数据元素通过墨卡托投影方式投影在屏幕中。
3. 在不同缩放等级下的geojson数据没有对元数据进行对应的缩放，所有元数据的经纬度精度相同。不同层级的数据只有对逐条数据的筛选。

## geohash地图展示过程
1. 浏览器提供请求geohashlayer所需的geohash编码给geoserver，geoserver根据geohash长度选择对应的缩放等级z,再根据geohash解码后的经纬度范围返回给浏览器对应层级的geohashjson格式地图数据。
2. leaflet根据得到的geohashjson数据和geohash编码长度所对应的缩放等级z,将数据元素通过simple投影方式投影在屏幕中。
3. 与原始geojson数据对元数据没有对应层级缩放不同，geohashjson中的元数据的geohash编码长度随着层级变化而变化。精度最高级的元数据geohash编码长度为14，对应经纬度精度为小数点后7位；根据缩放等级的不同，应有元数据geohash编码长度的对应变化。


## 需求总结
1. 对不同层级地图元数据的geohash编码进行判定，通过对比对应层级中tilelayer数据和geohashlayer数据在地图上的投影位置对照关系，确定对应层级的元数据geohash编码长度。
2. 对simple投影和墨卡托投影中的缩放进行比对，修正缩放偏差。


## 比对过程
### 以新加坡的一条街道为例，（testroad2）中心点为（1.2683744,103.8242823）(所有对比在墨卡托投影上进行)

1. 经纬度转换为geohash的脚本为：
[change_latlng.js](https://github.com/lchao-bit/buildingmap/blob/master/contast_of_geohash%26lonlat/singapore_road_2/geohash2latlng_test/change_latlng.js)  
    1. 测试数据为：[singapore_point_latlng_2](https://github.com/lchao-bit/buildingmap/blob/master/contast_of_geohash%26lonlat/singapore_road_2/geohash2latlng_test/singapore_point_latlng_2)  
    2. 转换结果为：  
    [geohash_file_singapore_14](https://github.com/lchao-bit/buildingmap/blob/master/contast_of_geohash%26lonlat/singapore_road_2/geohash2latlng_test/geohash_file_singapore_14)  
    [geohash_file_singapore_7](https://github.com/lchao-bit/buildingmap/blob/master/contast_of_geohash%26lonlat/singapore_road_2/geohash2latlng_test/geohash_file_singapore_7)  
    3. 结果说明：   
在geohash编码长度为14位时，经纬度精度为小数点后7为；
在geohash编码长度为7时，经纬度精度为小数点后3位；
对比二者在不同缩放等级上的显示位置，当zoom=7时，二者保持一致。因此，可以设定geohash编码长度=7时，对应zoom=7。  
    4. 存在问题：  
精度压缩是在原始经纬度数据基础上进行的直接截取，未在geohash编解码后的经纬度数据上进行测试。由于geohash在编解码过程中存在误差，所以解码后数据与原始数据会有误差。
    5. 实际操作需求：需要以经纬度位数为7的精度上(latlng_org)进行geohash编码(ecode_geohash)；再解码(decode_latlng)，对解码后数据进行经纬度位数截取(round_latlng)；在相同缩放等级上显示latlng_org和round_latlng数据，看在哪个层级上能满足一致性需求
    6. 对相同latlng_org进行不同geohash编码长度对比，同一经纬度点的编码在相同长度下一致。即8位编码时，前7位和7位编码下一致。 

1. geohash编码长度选择标准，以是否超过一个字节为限度，不需要对中间长度进行划分。如7位，14位。因此，在对比时只需要对7位编码对应的层级进行判定即可。
    1. geohash在编码长度选择时，最好选择偶数位数，因为在奇数长度时解码后经度纬度的精度不同。因此，编码长度调整为10位、8位和6位的情况下进行对比。
    2. 找geohash对应关系就是找经纬度精度和缩放等级的对应关系. 

1. 对应关系：
    1. geohash编码长度为10，解码后经纬度精度为小数点后5位，中心点为latlng_org（1.26837,103.82428），round_latlng（1.26838,103.82428）

TopLeftPointPoint：  

  zoom|latlng_org | round_latlng
---|----|---
10 |206000, 129851| 206000, 129851
11| 412674, 260000| 412674, 260000
12| 4826023, 520296| 826023, 520296
13| 1652979, 1040890| 1652979, 1040890
14| 3306375, 2082076| 3306375, 2082076
15| 6613168, 4164449| 6613168, 4164449
16| 13226753, 8329195| 13226753, 8329195
17|26453923, 16658689|26453923, 16658688


point_array:

 zoom|latlng_org | round_latlng
---|----|---
10 |M690 294L675 297L678 292L666 295L670 298| M690 294L675 297L678 292L666 295L670 298
11| M706 290L675 297L683 286L658 292L667 299| M706 290L675 297L683 286L658 292L667 299
12| M737 285L675 297L690 276L641 287L658 302| M737 285L675 297L690 276L641 287L658 302
13| M541 272L417 297L447 255L350 277L383 306| M541 272L417 297L447 255L350 277L383 306
14|M666 247L418 297L477 213L283 257L350 316| M666 247L418 297L477 213L282 257L350 316
15| M913 197L417 297L537 129L147 217L282 334| M913 197L417 297L537 129L147 217L282 334
16| M1029 173.12084592145015L417 297L656 -40L-123 136L146 370| M1029 173.73716012084594L417 297L656 -39L-123 137L147 371
17|M-194 382.35064935064935L-124 443|M-194 382.7116451016636L-123 444
    
   总结：geohash编码长度为10，解码后经纬度精度为小数点后5位，当zoom=16时，出现差别；zoom<=15时解码前后屏幕坐标一致。因此，可以将geohash长度为10,对应zoom=15。
   
   
2. geohash编码长度为8，解码后经纬度精度为小数点后5位，中心点为lonlat_org（1.26837,103.82428），round_lonlat（1.26832,103.82441）
TopLeftPointPoint：

 zoom|latlng_org | round_latlng
---|----|---
16|13226753, 8329196 |13226759, 8329198
15|6613168, 4164449|6613171, 4164451
14| 3306375, 2082076|3306377, 2082077
13|1652979, 1040890 |1652980, 1040890
12|826281, 520296 |826281, 520296
11| 412932, 260000|412932, 260000
10|206257, 129851|206257, 129851

point_array:

 zoom|latlng_org | round_latlng
---|----|---
16|M1029 173.12084592145015L417 297L656 -40L-123 136L146 370 |M1029 173.61290322580646L417 297L657 -39L-127 137L145 369
15| M913 197L417 297L537 129L145 217L281 332|M913 197L417 297L537 129L145 217L281 332
14|M666 247L418 297L477 213L283 257L350 316 |M665 247L417 297L477 213L281 257L349 315
13|M541 272L417 297L447 255L350 277L383 306 |M541 272L417 297L447 255L349 277L383 306
12|M479 285L417 297L432 276L383 287L400 302|M479 285L418 297L433 276L383 287L401 302
11| M448 290L417 297L425 286L400 292L409 299|M448 290L417 297L425 286L400 292L409 299
10|M433 294L418 297L421 292L409 295L413 298|M433 294L418 297L421 292L409 295L413 298

总结：geohash编码长度为8，解码后经纬度精度为小数点后5位，当zoom=12时，出现差别；zoom<=11时解码前后屏幕坐标一致。因此，可以将geohash长度为8,对应zoom=11。 

   
3. geohash编码长度为6，解码后经纬度精度为小数点后5位，中心点为latlng_org（1.26837,103.82428），round_latlng（1.26617,103.82629）

TopLeftPointPoint：

 zoom|latlng_org | round_latlng
---|----|---
11|412932, 260000|412934, 260003
10|206257, 129851|206258, 129853
9|102920, 64777|102920, 64778
8|51251, 32240|51251, 32240
7|25417, 15972|25417, 15972
6|12500, 7837|12500, 7837

point_array:

zoom|latlng_org | round_latlng
---|----|---
11|M448 290L417 297L425 286L400 292L409 299|M450 289L418 297L418 281L402 289L402 297
10|M433 294L418 297L421 292L409 295L413 298|M434 293L418 297L418 289L410 293L410 297
9|M425 296L413 296L415 298|M426 295L418 297L418 293L414 295L414 297
8|M422 296L416 296L417 297|M422 296L418 297L418 295L416 297
7|M419 296L416 296L417 297|M420 296L417 297
6|M418 297L417 297|M418 297L417 297

总结：在geohash编码长度为6，解码后经纬度精度为小数点后5位时，解码后的经纬度点和原始点有较大差距，在屏幕显示时，发生比较大的形变。可以看到，在zoom<=6时，解码前后屏幕坐标一致。因此，可以将geohash长度为6,对应zoom=6。

1. 综合上述3轮对比，可将层级对比修改为下表所示

geohash编码长度| zoom区间
---|---
6| [1,6]
8| [7,11]
10|[12,15]
14|[16,19]

## 验证测试1
### 以新加坡的一条街道为例，以testroad2为例，中心点为（1.2683744,103.8242823）
#### 对比方式1-墨卡托VSsimple：
latlng_org使用墨卡托投影  
round_latlng使用simple投影
根据上面测试中的对应关系，在对应层级上修正Transformation参数  
L.Transformation
表示仿射变换：用一系列a、b、c、d的系数来将（x，y）形式转换为（ax+b，cy+d）的形式并进行反转  
在simple投影中，原始Transformation为(1, 0, -1, 0)  ，scale为Math.pow(2, zoom)  
在墨卡托投影中，原始Transformation为(0.5 / Math.PI, 0.5, -0.5 / Math.PI, 0.5)，scale为256*Math.pow(2, zoom)
在
1. geohash编码长度为6，解码后经纬度精度为小数点后5位，中心点为latlng_org（1.26837,103.82428），round_latlng（1.26617,103.82629）  
s_1_ed_6_5  
[代码位置](https://github.com/lchao-bit/buildingmap/tree/master/contast_of_geohash%26lonlat/singapore_road_2)

point_array:  

zoom|latlng_org | round_latlng|修正（0.61，0，-1,0）
---|----|---|---
6|M418 297L417 297|M419 297L417 297|M418 297L417 297

2.  geohash编码长度为8，解码后经纬度精度为小数点后5位，中心点为latlng_org（1.26837,103.82428），round_latlng（1.26832,103.82441）  
s_1_ed_8_5

point_array:  

zoom|lonlat_org | round_lonlat|修正
---|----|---|---
7|M419 296L416 296L417 297|M420 296L416 296L417 297|M419 296L416 296L417 297
8|M422 296L416 296L417 297|M422 296L414 296L416 298|M421 296L415 296L416 298
9|M425 296L413 296L415 298|M428 294L417 297L420 293L411 295L414 297|（0.71,0,-0.5,0）M425 296L413 296L415 298
10|M433 294L418 297L421 292L409 295L413 298|M439 293L417 297L422 290L405 294L411 299|(0.7, 0, -0.73, 0)M433 294L417 297L421 292L409 294L413 298
11| M448 290L417 297L425 286L400 292L409 299|M461 289L417 297L428 283L393 290L405 301|(0.7, 0, -0.73, 0)M448 290L418 297L425 286L401 292L409 299

**总结：** 此处修正zoom在7-11范围内情况，通过对修正参数的修改，可以实现部分点完全修正的情况。      
**存在问题：** 没有统一的修正参数对后续实际操作影响较大。
 3. 查看leaflet中的其他CRS方式，发现ESPG4326的方式和simple方式类似，所以采用ESPG4326的Transformation(1 / 360, 0.5, -1 / 360, 0.5)进行测试，但需要同时修改scale为256*Math.pow(2,zoom)。  geohash编码长度为10，解码后经纬度精度为小数点后5位，中心点为lonlat_org（1.26837,103.82428），round_lonlat（1.26838,103.82428）  
 s_1_ed_10_5  

point_array:

zoom|lonlat_org | round_lonlat|修正(1 / 360, 0.5, -1 / 360, 0.5)+256*Math.pow(2, zoom)
---|----|---|---
12 |M479 285L417 297L432 276L383 287L400 302|M504 279L417 297L438 267L370 283L393 303|M479 284L417 297L432 276L383 287L400 301
13|M541 272L417 297L447 255L350 277L383 306||M541 272L417 297L447 255L350 277L383 306
14|M666 247L418 297L477 213L283 257L350 316||M666 247L418 297L477 213L283 257L350 316
15|M913 197L417 297L537 129L147 217L282 334||913 197L417 297L537 129L147 217L282 333

**说明**：
- 对比一组数据后，发现效果不错，但不明白原理。  
- 随后查到介绍，osm的原始数据存储采用的是EPSG4326，而在提供tiles 和 the WMS webservice时采用的是EPSG3857。查看geoserver上提供的geojson数据后发现，"properties":{"name":"urn:ogc:def:crs:EPSG::4326"}中已经说明其原始数据采用的是EPSG4326。  

#### 对比方式2-墨卡托VSEPSG4326：
latlng_org使用墨卡托投影  
round_latlng使用EPSG4326投影  
1. geohash编码长度为6，解码后经纬度精度为小数点后5位，中心点为latlng_org（1.26837,103.82428），round_latlng（1.26617,103.82629）  
**表格说明**   
M:墨卡托  
E:EPSG4326  
s_2_org_5：原始latlng保留小数点后5位  
s_2_ed_6_5：6位geohash解码后的latlng保留小数点后5位  
代码为：  
[index-1_road-latlng-org5.html](https://github.com/lchao-bit/buildingmap/blob/master/contast_of_geohash%26lonlat/singapore_road_2/Spherical%20Mercator%20project/index-1_road-latlng-org5.html)  
[index-1_road-latlng_ed5.html](https://github.com/lchao-bit/buildingmap/blob/master/contast_of_geohash%26lonlat/singapore_road_2/Spherical%20Mercator%20project/index-1_road-latlng_ed5.html)  
[index-1_road-latlng_ed_E_5.html](https://github.com/lchao-bit/buildingmap/blob/master/contast_of_geohash%26lonlat/singapore_road_2/EPSG4326%20project/index-1_road-latlng_ed_E_5.html)

point_array:

zoom|s_2_org_5 M| s_2_ed_6_5 M|s_2_ed_6_5 E 
---|----|---|---
6|M676 297L675 297|M676 297L675 297|M676 297L675 297

2.  geohash编码长度为8，解码后经纬度精度为小数点后5位，中心点为latlng_org（1.26837,103.82428），round_latlng（1.26832,103.82441）   
**表格说明**   
M:墨卡托  
E:EPSG4326  
s_2_org_5：原始latlng保留小数点后5位  
s_2_ed_8_5：8位geohash解码后的latlng保留小数点后5位  

point_array:

zoom|s_2_org_5 M| s_2_ed_8_5 M|s_2_ed_8_5 E 
---|----|---|---
7|M677 296L674 296L675 297|M677 296L674 296L675 297|M677 296L674 296L675 297
8|M422 296L416 296L417 297|M422 296L416 296L417 297|M422 296L416 296L417 297
9|M425 296L413 296L415 298|M425 295L413 295L415 297|M425 296L413 296L415 298
10|M433 294L418 297L421 292L409 295L413 298|M`432 292`L`417 295`L`420 290`L`408 293`L`412 296`|M433 294L418 297L421 292L409 295L413 `299`
11|M448 290L417 297L425 286L400 292L409 299|M`446 287`L`415 294`L`423 283`L`398 289`L`407 296`|M448 `291`L417 297L425 286L400 292L409 299

3.  geohash编码长度为10，解码后经纬度精度为小数点后5位，中心点为latlng_org（1.26837,103.82428），round_latlng（1.26832,103.82441）   
**表格说明**   
M:墨卡托  
E:EPSG4326  
s_2_org_5：原始latlng保留小数点后5位  
s_2_ed_10_5：10位geohash解码后的latlng保留小数点后5位  

point_array:

zoom|s_2_org_5 M| s_2_ed_10_5 M|s_2_ed_10_5 E 
---|----|---|---
12|M479 285L417 297L432 276L383 287L400 302|M `474 278 `L `412 290 `L `427 269 `L `378 280 `L `395 295 `|M479  `284 `L417 297L432 276L383 287L400  `301 `
13|M541 272L417 297L447 255L350 277L383 306|M `530 260 `L `406 285 `L `436 243 `L `339 265 `L `372 294 `|M541 272L417 297L447 255L350 277L383 306
14|M666 247L418 297L477 213L283 257L350 316|M `643 221 `L `395 271 `L `454 187 `L `259 231 `L `327 290 `|M666 247L418 297L477 213L `282 ` 257L350 316
15|M913 197L417 297L537 129L147 217L282 334|M `867 145 `L `371 245 `L `491 77 `L `101 165 `L `236 282 `|M913 197L417 297L537 129L147 217L282  `333 `

**结果图：**  
s_2原始数据+经纬度保留小数点后5位+zoom=15+墨卡托  
![image](https://github.com/lchao-bit/buildingmap/blob/master/doc/contrast%20_of_geohash%26lonlat/result_image/s_2/s_2_org_5_M_15.png)  
s_2geohash解码后数据+geohash长度10+经纬度保留小数点后5位+zoom=15+墨卡托  
![image](https://github.com/lchao-bit/buildingmap/blob/master/doc/contrast%20_of_geohash%26lonlat/result_image/s_2/s_2_ed_10_5_M_15.png)  
s_2geohash解码后数据+geohash长度10+经纬度保留小数点后5位+zoom=15+EPSG4326  
![image](https://github.com/lchao-bit/buildingmap/blob/master/doc/contrast%20_of_geohash%26lonlat/result_image/s_2/s_2_ed_10_5_E_15.png) 

4.  geohash编码长度为14，解码后经纬度精度为小数点后5位，中心点为latlng_org（1.26837,103.82428），round_latlng（1.26832,103.82441）   
**表格说明**   
M:墨卡托  
E:EPSG4326  
s_2_org_7：原始latlng保留小数点后7位  
s_2_ed_14_7：10位geohash解码后的latlng保留小数点后7位  

point_array:

zoom|s_2_org_7 M| s_2_ed_14_7 M|s_2_ed_14_7 E 
---|----|---|---
16|M1286 173.32326283987913L675 297L914 -40L135 136L404 370|M1286  `172.9385699899295 `L675  `296 `L914 -40L135 136L `405 ` 370|M1286  `173.9385699899295 `L675 297L914  `-39 `L135  `137 `L `405 ` 371
17|M-194 383.35064935064935L-124 444|M-194  `382.7116451016636 `L  `-123 ` 444|M-194  `382.7116451016636 `L  `-123 ` 444
18|M1029 173.52090680100753L417 297L725.9598811292719 -138|M1029  `172.67506297229215 `L417  `296 `L `725.478810408922 ` -138|M `1029 172.67506297229215 `L417  `296 `L `725.7083333333333 ` -138
19|M1029 173.62906069000252L417 297L725.9130434782609 -138|M1029  `171.48910716534442L416 295L724.0435105987356 ` -138|M1029  `171.48910716534442L416 295L724.1581101190476 ` -138

5. 总结：
错误个数/总个数

zoom | s_2_ed_6_5 M	|s_2_ed_6_5 E
---|---|---
6 | 0/4| 0/4

zoom |s_2_ed_8_5 M	|s_2_ed_8_5 E
---|---|---
7 | 0/6| 0/6
8 | 0/6| 0/6
9 | 0/6| 0/6
10 | 10/10| 1/10
11 | 10/10| 1/10

zoom |s_2_ed_10_5 M	|s_2_ed_10_5 E
---|---|---
12 | 10/10| 1/10
13| 10/10| 0/10
14 | 10/10| 1/10
15 | 10/10| 2/10

**geohash14位，latlng7位的说明**   
- 由于zoom范围使得屏幕中只能显示部分点，且中心点未显示在屏幕上；  
-  从s_2_org_7 M和 s_2_ed_14_7的对比结果来看，两个latlng值完全相同，而显示结果差别很大  

s_2原始数据+经纬度保留小数点后7位+zoom=19+墨卡托  
![image](https://github.com/lchao-bit/buildingmap/blob/master/doc/contrast%20_of_geohash%26lonlat/result_image/s_2/s_2_org_7_M_19.png)  
s_2geohash解码后数据+geohash长度14+经纬度保留小数点后7位+zoom=19+墨卡托   
![image](https://github.com/lchao-bit/buildingmap/blob/master/doc/contrast%20_of_geohash%26lonlat/result_image/s_2/s_2_ed_14_7_M_19.png)  
s_2geohash解码后数据+geohash长度14+经纬度保留小数点后7位+zoom=19+EPSG4326  
![image](https://github.com/lchao-bit/buildingmap/blob/master/doc/contrast%20_of_geohash%26lonlat/result_image/s_2/s_2_ed_14_7_E_19.png)

**结论：** 该组实验结果随机性强，不具备可比性。


## 验证测试2
### 以北京的一个geohash块地图为例，中心点为（39.967620, 116.334145）zoom=15
1. 以原始EPSG4326显示时，屏幕坐标x值正确，而y值都偏大，显示为y轴方向压缩  
**代码位置：**    
[index-org.html](https://github.com/lchao-bit/buildingmap/blob/master/contast_of_geohash%26lonlat/bj_map/index-org.html)  
[index-new.html](https://github.com/lchao-bit/buildingmap/blob/master/contast_of_geohash%26lonlat/bj_map/index-new.html)  
**测试数据：**  [wx4er5](https://github.com/lchao-bit/buildingmap/blob/master/contast_of_geohash%26lonlat/bj_map/map_file/wx4er5)  
**对比图：**  
bj_wx4er5原始数据+经纬度保留小数点后7位+zoom=15+墨卡托  
![image](https://github.com/lchao-bit/buildingmap/blob/master/doc/contrast%20_of_geohash%26lonlat/result_image/bj_E3857vsE4326/bj_1_org.png)  
bj_wx4er5原始数据+经纬度保留小数点后7位+zoom=15+EPSG4326+原始参数  
![image](https://github.com/lchao-bit/buildingmap/blob/master/doc/contrast%20_of_geohash%26lonlat/result_image/bj_E3857vsE4326/bj_1_E.png)

1. 修改Transformation(1 / 360, 0.5, -1 / 276, 0.5)，显示基本一致  
**对比图：**  
bj_wx4er5原始数据+经纬度保留小数点后7位+zoom=15+EPSG4326+修改参数  
![image](https://github.com/lchao-bit/buildingmap/blob/master/doc/contrast%20_of_geohash%26lonlat/result_image/bj_E3857vsE4326/bj_1_E_change.png)   
**数据对比：**   
[bj_wx4er5原始数据+经纬度保留小数点后7位+zoom=15+墨卡托](https://github.com/lchao-bit/buildingmap/blob/master/doc/contrast%20_of_geohash%26lonlat/result_image/bj_E3857vsE4326/org_bj)   
[bj_wx4er5原始数据+经纬度保留小数点后7位+zoom=15+EPSG4326+修改参数](https://github.com/lchao-bit/buildingmap/blob/master/doc/contrast%20_of_geohash%26lonlat/result_image/bj_E3857vsE4326/new_bj)    
数据对比结果图：   
 ![image](https://github.com/lchao-bit/buildingmap/blob/master/doc/contrast%20_of_geohash%26lonlat/result_image/bj_E3857vsE4326/new_bj_vs_org_bj.png)

3. 将该结果转到新加坡数据中，存在较大误差，应该根据lat经度值范围选择不同的参数。  







