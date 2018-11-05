var t1 = "wx4eqd8tu5ct";
var t2 = "wx4eqdfs5zhe";
var t3 = "wx4eqg6k0pept5";
var t4,t5;
var Bits = [16, 8, 4, 2, 1];
var Base32 = "0123456789bcdefghjkmnpqrstuvwxyz".split("");

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

var top_bound = [ "wx4eqd8t",
									"wx4eqdfs5zhenx",
									"wx4eqejkz4bpyb",
								  "wx4eqg259j0gj4",
									"wx4eqgd11n5qnc"];
var top_lonlat = [
	[39.96103, 116.30213],
	[39.96212, 116.30487],
	[39.9636,  116.30878],
	[39.96477, 116.3123],
	[39.96572, 116.31505],
];

var tmp_top=[],tmp_right=[],tmp_buttom=[],tmp_left=[],i,k,neighbours,tg0,tg1;
var bound = {},tmp=[],x1,x2,y1,y2;
//top
for(i = 0;i< 2;i++){
	tmp_top.push(top_bound[i]);
	y1 = top_lonlat[i][0];
	x1 = top_lonlat[i][1];
	y2 = top_lonlat[i+1][0];
	x2 = top_lonlat[i+1][1];
	var newgeohash = ["wx4eqd8t","wx4eqd8w","wx4eqd8v","wx4eqd8s","wx4eqd8m","wx4eqd8q","wx4eqd8y"];
	for(j=0;j<newgeohash.length;j++){
		var pos = decode_geohash(newgeohash[j]);
					bound.min_x = Math.min(pos[0],pos[1]);
					bound.max_x = Math.max(pos[0],pos[1]);
					
					bound.min_y = Math.min(pos[2],pos[3]);
					bound.max_y = Math.max(pos[2],pos[3]);					
					
					if(has_intersection(x1, x2, y1, y2, bound)){
						console.log("pos:"+pos);
						console.log("has_intersection--"+j+":"+newgeohash[j]);
						}
	}
	
	
	for(k = tmp_top.length-1;k<10;k++){/*  tmp_top.length*/
		tg0 = tmp_top[k];
		console.log("1:top_bound["+i+"]:"+top_bound[i]);
		neighbours = getNeighbour(tg0).concat(tg0);
		console.log("top_bound["+i+"]_neighbours:"+neighbours);
			for(var j=0;j<8;j++){
					var pos = decode_geohash(neighbours[j]);
					bound.min_x = Math.min(pos[0],pos[1]);
					bound.max_x = Math.max(pos[0],pos[1]);
					
					bound.min_y = Math.min(pos[2],pos[3]);
					bound.max_y = Math.max(pos[2],pos[3]);
					
					if((has_intersection(x1, x2, y1, y2, bound))&&
						(tmp_top.indexOf(neighbours[j]) == -1)&&
						(neighbours[j] != top_bound[i+1]))
					{
						/*if(neighbours[j] == top_bound[i+1]){
							console.log("2:top_bound["+i+"+1]:"+top_bound[i+1]);
							console.log("3:neighbours["+j+"]:"+neighbours[j]);
							break;	
						}*/
						tmp_top.push(neighbours[j]);
						//console.log("4:neighbours["+j+"]:"+neighbours[j]);
						break;
					}
			}	
	}
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

//judge whether a road has intersection with an area described by a geohash value
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