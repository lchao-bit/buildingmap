//1.计算多边形最小外接矩形
var fs=require('fs');
var map_file="./lonlat12";
//var map_file="./polygon_bit";
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
				fs.writeFile('./geohash_nodes_lonlat12',"\""+queue[i]+"\""+","+"\n",{flag:'a'}, function(err) {
		    if (err) {
		        throw err;
		    }
		   });
		}
		var polygonArr =[[116.347674655942996, 39.980079931285303 ], [ 116.347915399876001, 39.9800890002073 ], [ 116.348745799678994, 39.980114299935202 ], [ 116.349595200357996, 39.980133299911898 ], [ 116.349912800436002, 39.980145599939497 ], [ 116.350823900002993, 39.980182900220697 ], [ 116.352027200094994, 39.980232299980699 ], [ 116.352095800380994, 39.9802298996903 ], [ 116.352163700095005, 39.980226799727099 ], [ 116.352659300287002, 39.980247500322001 ], [ 116.353179100334998, 39.980269200063702 ], [ 116.353611499771006, 39.9802871999944 ], [ 116.354519600098996, 39.9803102001556 ], [ 116.354983900286996, 39.980323500229503 ], [ 116.355553799768003, 39.980339900266301 ], [ 116.355637200196995, 39.9803422996576 ], [ 116.355688500224005, 39.980343799726597 ], [ 116.358836600429001, 39.980434499952402 ], [ 116.359484300259993, 39.980453099730802 ], [ 116.359489199766998, 39.9803205999158 ], [ 116.359509400338993, 39.979779299774897 ], [ 116.359528900339001, 39.978988700368298 ], [ 116.359502499841, 39.975408199828699 ], [ 116.359502349653994, 39.975258996005998 ], [ 116.359386136561, 39.9752581803208 ], [ 116.358519993203004, 39.975250981247797 ], [ 116.356242748803993, 39.975231932707601 ], [ 116.353779550685999, 39.9752113742056 ], [ 116.353479468502996, 39.975208856103997 ], [ 116.349321408956001, 39.975174188138404 ], [ 116.348129499677, 39.975168749038602 ], [ 116.348125834040005, 39.975168731951499 ], [ 116.347994902642995, 39.975168044869399 ], [ 116.347992931329003, 39.975168034077697 ], [ 116.347957233638994, 39.975167847018497 ], [ 116.347987186460003, 39.975316046298502 ], [ 116.347825967245001, 39.975639591344198 ], [ 116.347851592976994, 39.9757657783681 ], [ 116.347877306393002, 39.976013920206299 ], [ 116.347879367638996, 39.976316852340901 ], [ 116.347794040861999, 39.977942171893901 ], [ 116.347787888599996, 39.978104324155296 ], [ 116.347764942398001, 39.978665772707302 ], [ 116.347745391136996, 39.9789716726047 ], [ 116.347674655942996, 39.980079931285303]];
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
//				p4 = [tmps[3],tmps[1]];
				p1 = [tmps[0],tmps[2]];
				p2 = [tmps[1],tmps[2]];
				p3 = [tmps[0],tmps[3]];
				p4 = [tmps[1],tmps[3]];
					
					
				//若四个边界点都不在多边形内，则geohash块在多边形外
				if(isInPolygon(p1, lonlats)||isInPolygon(p2, lonlats)||isInPolygon(p3, lonlats)||isInPolygon(p4, lonlats)){
					newq.push(t);
				}				
		}
		
		console.log("newq.length:"+newq.length);
		for(i=0;i<newq.length;i++){
				fs.writeFile('./sort_geohash_lonlat12',"\""+newq[i]+"\""+","+"\n",{flag:'a'}, function(err) {
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