var precision ;
var Bits = [16, 8, 4, 2, 1];
var Base32 = "0123456789bcdefghjkmnpqrstuvwxyz".split("");


//read map in json format
var fs=require('fs');
var map_file="./singapore_point_lonlat_2";
var maps = fs.readFileSync(map_file);
var lineReader = require('./line-reader');
var counter = 0;
lineReader.eachLine(map_file, function(line, last, cb) {
  	read_lonlat(line);
  	cb();
	console.log(++counter);
});



function read_lonlat(line){
	//var road_json= line;
	var nodes = line.split(","); 
	console.log(nodes);
	inputs(6,nodes[0],nodes[1]);
	
	/*var path_string = road_json.features;//.geometry.coordinates.substring(1,road_json.path.length-1);
console.log(path_string.length);
	for(var i=0; i<path_string.length; i++){
		//console.log(path_string[i].geometry.coordinates);
		var coordinates = path_string[i].geometry.coordinates;
		for(var j = 0; j <coordinates.length; j++){
			var point  = coordinates[j];
			inputs(14,point[0],point[1]);
		}
	}*/
	/*var point_arr = path_string.split(",");
	var path = [];
	for(var i=0; i< point_arr.length; i++){
		var point = point_arr[i].split(" ");
		inputs(14,point[0],point[1]);
		console.log(++counter);
		
	}*/
	
}

function inputs(input_p,longitude, latitude){
	precision = input_p;
	var cur_geohash = encode_geohash(longitude, latitude);
	var cur_lonlat = decode_geohash(cur_geohash);
	var declon = (cur_lonlat[0] + cur_lonlat[1])/2;
	var declat = (cur_lonlat[2] + cur_lonlat[3])/2;
	console.log("longitude:" + longitude +",latitude:" + latitude);
	console.log("encode_geohash:" + cur_geohash);
	console.log("decode_geohash_lon:" + declon + " decode_geohash_lat:" + declat);
	//解码后的经纬度取小数点后7位并四舍五入
	declon = declon * 10000000;
	declon = (Math.round(declon)/10000000).toFixed(5);
	declat = declat * 10000000;
	declat = (Math.round(declat)/10000000).toFixed(5);
	console.log("取小数点后7位并四舍五入后经纬度：");
	console.log("decode_geohash_lon:" + declon + " decode_geohash_lat:" + declat);
	longitude = longitude* 10000000;
	longitude = (Math.round(longitude)/10000000).toFixed(5);
	latitude = latitude* 10000000;
	latitude = (Math.round(latitude)/10000000).toFixed(5);
	var data  = [longitude,latitude,cur_geohash,declon,declat,"\n"];
	var data1  = [longitude,latitude+"\n"];
	var data2  = [declon,declat+"\n"];
	fs.writeFile('./geohash_ed_singapore_2_6_cut5',data,{flag:'a',encoding:'utf-8',mode:'0666'});
	//fs.writeFile('./geohash_ed_singapore_1_10_cut5before',data1,{flag:'a',encoding:'utf-8',mode:'0666'});
	//fs.writeFile('./geohash_ed_singapore_1_10_cut5after',data2,{flag:'a',encoding:'utf-8',mode:'0666'});
	
	
	
}

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

function has_intersection_linestring(path, bound){
	for(var i=0; i<path.length/2 - 1; i++){
		if(has_intersection(path[i*2], path[i*2+2], path[i*2+1], path[i*3], bound)){
			return true;
		}
	}
	return false;
}


function has_intersection(x1, x2, y1, y2, bound){
	//top edge
	var tx = (bound.min_y - y1) * (x2-x1)/(y2-x2) + x1;
	if((tx >= x1 && tx <= x2 || tx <= x1 && tx >= x2) && tx >= bound.min_x && tx <= bound.max_x){
		return true;
	}
	
	//bottom edge
	var bx = (bound.max_y - y1) * (x2-x1)/(y2-x2) + x1;
	if((bx >= x1 && bx <= x2 || bx <= x1 && bx >= x2) && bx >= bound.min_x && bx <= bound.max_x){
		return true;
	}
	//left edge
	var ly = (bound.min_x - x1) * (y2-x2) / (x2 - x1) + x1;
	if((ly >= y1 && ly <= y2 || ly <= y1 && ly >= y2) && ly >= bound.min_y && ly <= bound.max_y){
		return true;
	}
	//right edge
	var ry = (bound.max_x - x1) * (y2-x2) / (x2 - x1) + x1;
	if((ry >= y1 && ry <= y2 || ry <= y1 && ry >= y2) && ry >= bound.min_y && ry <= bound.max_y){
		return true;
	}
	return false;
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
