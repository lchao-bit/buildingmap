﻿var e = [116.30495,39.96217];
e = [116.30678,39.96052];

var polygonArr =[[116.30213,39.96103],
[116.30487,39.96212],
[116.30878,39.9636],
[116.3123,39.96477],
[116.31505,39.96572],
[116.31535,39.96487],
[116.31577,39.96409],
[116.31612,39.96301],
[116.3164,39.9621],
[116.3165,39.96107],
[116.31691,39.95745],
[116.31723,39.9557],
[116.31659,39.95551],
[116.31453,39.95559],
[116.31056,39.95566],
[116.30863,39.95564],
[116.30651,39.95567],
[116.30438,39.95566],
[116.30309,39.95566],
[116.30286,39.95697],
[116.30264,39.95855],
[116.30247,39.95919],
[116.30234,39.95974], 
[116.3023,39.96015],
[116.30221,39.96051]];

var j = polygonArr.length - 1;
        var isInArea = false;
        for (var i=0; i<polygonArr.length;i++ )
        {
            if( ( (polygonArr[i][0] < e[0] && polygonArr[j][0] >= e[0]) || (polygonArr[j][0] < e[0] && polygonArr[i][0] >= e[0]) ) ) {
                if( polygonArr[i][1] + (e[0] - polygonArr[i][0]) * (polygonArr[j][1] - polygonArr[i][1]) / (polygonArr[j][0] - polygonArr[i][0]) < e[1] ) {
                    isInArea = !isInArea;
                }
            }
            j = i;
        }
       console.log(isInArea);