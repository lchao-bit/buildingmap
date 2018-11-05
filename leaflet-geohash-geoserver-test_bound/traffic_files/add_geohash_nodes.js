/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	//上边界
	"wx4eqd8tu5ct5e",
	"wx4eqdfs5zhenx",
	"wx4eqejkz4bpyb",
	"wx4eqg259j0gj4",
	"wx4eqgd11n5qnc",
	//右边界
	"wx4eqg6k0pept5",
	"wx4eqg4x9yk6dx",
	"wx4eqg4c6j123b",
	"wx4eqfgh0e65gj",
	"wx4eqf53h2w3s4",
	"wx4eqfen4gketp",
	"wx4eqcewgfkfrt",
	//下边界
	"wx4eqcejsyzv09",
	"wx4eqc9whvzdr0",
	"wx4eq9wy86z7z4",
	"wx4eq9tq7x0ke8",
	"wx4eq9eydhex6r",
	"wx4eq9dq86z7fd",
	"wx4eq99qd6v7y4",
	//左边界
	"wx4eq9cnjp1fq0",
	"wx4eqd0zrvtgkd",
	"wx4eqd2g5uzjh6",
	"wx4eqd2tv2y37n",
	"wx4eqd8b8pb7ey",
	"wx4eqd8dvfvr0q"  
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/* 0   1
 *   x 
 * 3   2
 */
/*从多边形的左上角0-1开始计算，先是计算边界点的右上、右和右下邻近geohash值，看哪个距离下一个边界点最近；  
  右边界1-2则计算左下、下、右下；  
  下边界2-3计算左上、左、左下；  
  左边界3-0计算左上、上和右上。
*/
var top_bound = [ "wx4eqd8tu5ct5e",
									"wx4eqdfs5zhenx",
									"wx4eqejkz4bpyb",
								  "wx4eqg259j0gj4",
									"wx4eqgd11n5qnc"];
var right_bound = [ "wx4eqgd11n5qnc",
									  "wx4eqg6k0pept5",
										"wx4eqg4x9yk6dx",
										"wx4eqg4c6j123b",
										"wx4eqfgh0e65gj",
										"wx4eqf53h2w3s4",
										"wx4eqfen4gketp",
										"wx4eqcewgfkfrt"];
var buttom_bound = [	"wx4eqcewgfkfrt",
											"wx4eqcejsyzv09",
											"wx4eqc9whvzdr0",
											"wx4eq9wy86z7z4",
											"wx4eq9tq7x0ke8",
											"wx4eq9eydhex6r",
											"wx4eq9dq86z7fd",
											"wx4eq99qd6v7y4"];
var left_bound = [  "wx4eq99qd6v7y4",
									  "wx4eq9cnjp1fq0",
										"wx4eqd0zrvtgkd",
										"wx4eqd2g5uzjh6",
										"wx4eqd2tv2y37n",
										"wx4eqd8b8pb7ey",
										"wx4eqd8dvfvr0q",
										"wx4eqd8tu5ct5e"];
var top_lonlat = [
	[39.96103, 116.30213],
	[39.96212, 116.30487],
	[39.9636,  116.30878],
	[39.96477, 116.3123],
	[39.96572, 116.31505],
];
var tmp_top=[],tmp_right=[],tmp_buttom=[],tmp_left=[],i=0,neighbours,tg0,tg1;
var bound = {},tmp=[],x1,x2,y1,y2;
//top
tmp_top.push(top_bound[0]);
for(i = 0;i< top_bound.length-1;i++){
		tg0 = top_bound[i];
		x1 = top_lonlat[i][0];
		y1 = top_lonlat[i][1];
		x2 = top_lonlat[i+1][0];
		y2 = top_lonlat[i+1][1];
		console.log(tg0);
		neighbours = getNeighbour(tg0).concat(tg0);
			//得到每个块的top_right,right,bottom_right邻居5,1,7
			tmp.push(neighbours[5]);
			tmp.push(neighbours[1]);
			tmp.push(neighbours[7]);
			for(var j=0;j<3;j++){
					var pos = decode_geohash(tmp[j]);
					bound.min_x = Math.min(pos[0],pos[1]);
					bound.max_x = Math.max(pos[0],pos[1]);
					
					bound.min_y = Math.min(pos[2],pos[3]);
					bound.max_y = Math.max(pos[2],pos[3]);
					
					if(has_intersection(x1, x2, y1, y2, bound)){
						tmp_top.push(tmp[j]);
						console.log(tmp[j]);
						break;
					}
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

function getNeighbour(hash)
{
	console.log("hash:"+hash);
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