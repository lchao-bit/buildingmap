var top_lonlat = [
[39.96103, 116.30213],
[39.96212, 116.30487],
[39.9636,  116.30878],
[39.96477, 116.3123],
[39.96572, 116.31505],
];
var right_lonlat = [
[39.96572, 116.31505],
[39.96487, 116.31535],
[39.96409, 116.31577],
[39.96301, 116.31612],
[39.9621,  116.3164],
[39.96107, 116.3165],
[39.95745, 116.31691],
[39.9557, 116.31723],
];
var buttom_lonlat = [
[39.9557, 116.31723],
[39.95551, 116.31659],
[39.95559, 116.31453],
[39.95566, 116.31056],
[39.95564, 116.30863],
[39.95567, 116.30651],
[39.95566, 116.30438],
[39.95566, 116.30309]
];
var left_lonlat = [
[39.95566, 116.30309],
[39.95697, 116.30286],
[39.95855, 116.30264],
[39.95919, 116.30247],
[39.95974,116.30234],
[39.96015, 116.3023],
[39.96051, 116.30221],
[39.96103, 116.30213]
];
top_lonlat = left_lonlat;
var topnodes = [],ta,tb,tm=[],mx,my;
var minx,maxx,miny,maxy,s,c;
//var fs=require('fs');
//点间隔设定
var ii=0.0001,jj;

for(var i=0;i<top_lonlat.length-1;i++){
		topnodes.push(top_lonlat[i]);
		//console.log(topnodes[topnodes.length-1]);
		ta = top_lonlat[i];
		tb = top_lonlat[i+1];
		
		//两点间距离小于0.0001时，不再插入点
		if((Math.abs(tb[0]-ta[0])+ Math.abs(tb[1]-ta[1])<2*ii)){
			break;
		}
		
		//计算斜率
		
			s = (tb[1]-ta[1])/(tb[0]-ta[0]);
			//计算常量
			c = ta[1] - s * ta[0];
		
		//判断斜率，正+负-
		if(s>0)
		{jj = ii;}
		else
		{jj = -ii;}
		
		console.log("s: "+s+" c: "+c);
		//添加第一个值		
		//判断线段是否平行与x轴或y轴

			mx = ta[0] + jj;
			my = s*mx + c;
			
		tm = [mx,my];
		topnodes.push(tm);
		var count=0;
		//while((Math.abs(tb[0]-mx)>ii)&&(Math.abs(tb[1]-my)>ii)){
		while((Math.abs(tb[0]-mx)+ Math.abs(tb[1]-my)>2*ii)){
			
				mx = mx + jj;
				my = s*mx + c;
			
			
			tm = [mx,my];
			topnodes.push(tm);
			//console.log(topnodes[topnodes.length-1]);
			count++;
			//if(count>20)break;
		}
		
		
		//console.log(topnodes.length);
		
}
topnodes.push(top_lonlat[top_lonlat.length-1]);
console.log(topnodes);

for(var i=0;i< topnodes.length;i++){
	var data  = [topnodes[i],"\n"];
	//fs.writeFile('./lonlat_topnodes_1',data,{flag:'a',encoding:'utf-8',mode:'0666'});
}