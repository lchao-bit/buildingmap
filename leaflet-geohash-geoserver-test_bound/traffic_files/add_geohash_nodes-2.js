//1.计算多边形最小外接矩形
var fs=require('fs');
var map_file="./polygon_bit_more_change";
var map_file="./polygon_bit";
var maps = fs.readFileSync(map_file);
var lineReader = require('./line-reader');
var counter = 0;
var lonlats = [],xs = [],ys = [];
lineReader.eachLine(map_file, function(line, last, cb) {
  	read_lonlat(line);
  	cb();
		counter++;
		if(last) MBR(xs,ys);
});

var nodes,minx,miny,maxx,maxy,tm;
function read_lonlat(line){
	nodes = line.split(","); 
	tm = [nodes[1],nodes[0]];
	lonlats.push(tm);
	xs.push(nodes[1]);
	ys.push(nodes[0]);
}

function MBR(xs,ys){
	minx = Math.min.apply(null,xs);
	maxx = Math.max.apply(null,xs);
	miny = Math.min.apply(null,ys);
	maxy = Math.max.apply(null,ys);
	
//	console.log("minx: "+minx);
//	console.log("miny: "+miny);
//	console.log("maxx: "+maxx);
//	console.log("maxy: "+maxy);
	
	add_geohashs(minx,miny,maxx,maxy);
	
}

var precision = 8;
var tmq = [],queue=[],geohash,neighbours;
//2.根据最小外接矩形计算geohash覆盖，计算8位geohash,存储在queue中
function add_geohashs(min_x,min_y,max_x,max_y){
	//左下角开始
			/*4 corners 0(min_x,min_y),1(max_x,min_y),2(max_x,max_y),3(max_x,min_y)
 * 1   2
 *   x 
 * 0   3
 */
  var c0_h = encode_geohash(min_y, min_x);
  var c1_h = encode_geohash(min_y, max_x);
  var c2_h = encode_geohash(max_y, max_x);
  var c3_h = encode_geohash(max_y, min_x);
  tmq.push(c0_h);
	queue.push(c0_h);
  /*从0位置开始计算geohash值，先向1方向计算所有top邻居，直到与线（1,2）有交集为止，将所有geohash值存入queue中；
 	*再从0位置开始，计算每个queue中每个geoahsh的right邻居，直到right邻居与线（2,3）有交集为止，将所有right邻居存入queue
 	*/
 	 /*var tmps = decode_geohash(c0_h);
 	 var tmp_bound = {};
 	 tmp_bound.min_x = Math.min(tmps[2], tmps[3]);
 	 tmp_bound.max_x = Math.max(tmps[2], tmps[3]);
	 tmp_bound.min_y = Math.min(tmps[0], tmps[1]);
	 tmp_bound.max_y = Math.max(tmps[0], tmps[1]);*/
	 
	 //0所在的geohash块和线（1,2）是否相交
	 for(i=0;i<tmq.length;i++){
		 	geohash = tmq[i];
		 	neighbours = getNeighbour(geohash).concat(geohash);
			//得到每个块的top邻居
			tmq.push(neighbours[0]);
		  if((queue.indexOf(neighbours[0]) == -1)){
			  queue.push(neighbours[0]);
			}
			if(neighbours[0]==c1_h){
				break;
			}
		}
		
		//计算queue中每个geohash块的right邻居
		for(i=0;i<tmq.length;i++){
			//if(cq>0){
				geohash = tmq[i];
				neighbours = getNeighbour(geohash).concat(geohash);
				//得到每个块的right邻居
				tmq.push(neighbours[1]);
			  if((queue.indexOf(neighbours[1]) == -1)){
				  queue.push(neighbours[1]);
				}
				//当计算到c2时，结束计算
				if(neighbours[1]==c2_h){
					break;
				}
		}	
		console.log("queue.length:"+queue.length);
		for(i=0;i<queue.length;i++){
				fs.writeFile('./add_geohash_nodes_bit',"\""+queue[i]+"\""+","+"\n",{flag:'a'}, function(err) {
		    if (err) {
		        throw err;
		    }
		   });
		}
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
		sort_geohashs(queue,polygonArr);
}

//3.将queue中的geohash块按照在多边形外、和边界相交以及在多边形内部分为三类，只保留后两类geohash块
var newq = [],t,tmps,p1=[],p2=[],p3=[],p4=[];
function sort_geohashs(queue,lonlats){
		for(var i=0;i< queue.length;i++){
				t = queue[i];
				tmps = decode_geohash(t);
				//计算geohash块的四个边界点
//				p1 = [tmps[2],tmps[0]];
//				p2 = [tmps[2],tmps[1]];
//				p3 = [tmps[3],tmps[0]];
				p4 = [tmps[3],tmps[1]];
				p1 = [tmps[0],tmps[2]];
				p2 = [tmps[1],tmps[2]];
				p3 = [tmps[0],tmps[3]];
				p4 = [tmps[1],tmps[3]];
					
					
				//若四个边界点都不在多边形内，则geohash块在多边形外
				if(isInPolygon(p1, lonlats)||isInPolygon(p2, lonlats)||isInPolygon(p3, lonlats)||isInPolygon(p4, lonlats)){
					newq.push(t);
					//console.log("i:"+i);
				}
				
//				p1 = [116.394653,39.904074];
//				p2 = [39.96275, 116.30826];
//				p3 = [39.96123, 116.30213];
//				p4 = [39.96335, 116.30773 ];
//				
//				var ns =[[116.397857, 39.910612],[116.373567, 39.905938],[116.378116, 39.896917],[116.415281, 39.899485]];
				
				
				//console.log("p1:"+isInPolygon(p1, lonlats));	
//				console.log("p2:"+isInPolygon(p2, lonlats));
//				console.log("p3:"+isInPolygon(p3, lonlats));
//				console.log("p4:"+isInPolygon(p4, lonlats));
				//console.log("p1:"+p1);
				//console.log("lonlats[1]:"+lonlats[1]);
				//break;	
				
		}
		
		console.log("newq.length:"+newq.length);
		for(i=0;i<newq.length;i++){
				fs.writeFile('./sort_geohash_nodes_bit',"\""+newq[i]+"\""+","+"\n",{flag:'a'}, function(err) {
		    if (err) {
		        throw err;
		    }
		   });
		}
}

//判断点是否在多边形内
function isInPolygon(e, polygonArr) {
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
       return isInArea;
}


var Bits = [16, 8, 4, 2, 1];
var Base32 = "0123456789bcdefghjkmnpqrstuvwxyz".split("");

function encode_geohash(longitude, latitude){
	var geohash = "";
	var even = true;
	var bit = 0;
	var ch = 0;
	var pos = 0;
    var lat = [-90,90];
	var lon = [-180,180];
	while(geohash.length < precision){
		var mid;

        if (even)
        {
            mid = (lon[0] + lon[1])/2;
            if (longitude > mid)
            {
                ch |= Bits[bit];
                lon[0] = mid;
             }
            else
                lon[1] = mid;
        }
		else
        {
            mid = (lat[0] + lat[1])/2;
            if (latitude > mid)
            {
                ch |= Bits[bit];
                lat[0] = mid;
            }
            else
                lat[1] = mid;
		}
        even = !even;
        if (bit < 4)
            bit++;
        else
        {
            geohash += Base32[ch];
            bit = 0;
            ch = 0;
        }
	}
	return geohash;
}

function decode_geohash(geohash)
{
	var even = true;
    var lat = [-90,90];
	var lon = [-180,180];

	for(var i=0; i< geohash.length; i++)
	{
		var c= geohash[i];
		var cd = Base32.indexOf(c);
		for (var j = 0; j < 5; j++)
		{
			var mask = Bits[j];
			if (even)
			{
				RefineInterval(lon, cd, mask);
			}
			else
			{
				RefineInterval(lat, cd, mask);
			}
			even = !even;
		}
	}

	return new Array(lon[0], lon[1], lat[0], lat[1]);
}

var Neighbors = [[ "p0r21436x8zb9dcf5h7kjnmqesgutwvy", // Top
	"bc01fg45238967deuvhjyznpkmstqrwx", // Right
	"14365h7k9dcfesgujnmqp0r2twvyx8zb", // Bottom
	"238967debc01fg45kmstqrwxuvhjyznp", // Left
	], ["bc01fg45238967deuvhjyznpkmstqrwx", // Top
	"p0r21436x8zb9dcf5h7kjnmqesgutwvy", // Right
	"238967debc01fg45kmstqrwxuvhjyznp", // Bottom
	"14365h7k9dcfesgujnmqp0r2twvyx8zb", // Left
	]];

var Borders = [["prxz", "bcfguvyz", "028b", "0145hjnp"],
	["bcfguvyz", "prxz", "0145hjnp", "028b"]];


function getNeighbour(hash)
{
	var hash_neighbour = new Array();
	var hash_top = CalculateAdjacent(hash,0);
	hash_neighbour.push(hash_top);
	var hash_right = CalculateAdjacent(hash,1);
	hash_neighbour.push(hash_right);
	var hash_bottom = CalculateAdjacent(hash,2);
	hash_neighbour.push(hash_bottom);
	var hash_left = CalculateAdjacent(hash,3);
	hash_neighbour.push(hash_left);

	var hash_top_left = CalculateAdjacent(hash_top, 3);
	hash_neighbour.push(hash_top_left);
	var hash_top_right = CalculateAdjacent(hash_top, 1);
	hash_neighbour.push(hash_top_right);
	var hash_bottom_left = CalculateAdjacent(hash_bottom, 3);
	hash_neighbour.push(hash_bottom_left);
	var hash_bottom_right = CalculateAdjacent(hash_bottom, 1);
	hash_neighbour.push(hash_bottom_right);

	return hash_neighbour;
}


function CalculateAdjacent(hash, dir)
{
	var lastChr = hash[hash.length - 1];
	var type = hash.length % 2;
	var nHash = hash.substring(0, hash.length - 1);

	if (Borders[type][dir].indexOf(lastChr) != -1)
	{
		nHash = CalculateAdjacent(nHash, dir);
	}
	return nHash + Base32[Neighbors[type][dir].indexOf(lastChr)];
}

function RefineInterval(interval, cd, mask)
{
	if ((cd & mask) != 0)
	{
		interval[0] = (interval[0] + interval[1])/2;
	}
	else
	{
		interval[1] = (interval[0] + interval[1])/2;
	}
}