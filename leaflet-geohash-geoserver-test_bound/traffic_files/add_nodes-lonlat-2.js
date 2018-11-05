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

var fs=require('fs');

top_lonlat = left_lonlat;
var topnodes = [],X0,Y0,X1,Y1,nDisX,nDisY,tm=[];
//点间隔设定
var ii=0.0001,jj;

for(var i=0;i<top_lonlat.length-1;i++){
	topnodes.push([top_lonlat[i][1],top_lonlat[i][0]]);
	
	X0 = top_lonlat[i][0];
	Y0 = top_lonlat[i][1];

	X1 = top_lonlat[i+1][0];
	Y1 = top_lonlat[i+1][1];
	
	nDisX = Math.abs(X1-X0);
	nDisY = Math.abs(Y1-Y0);
	
	    if (nDisX >= nDisY)//如果x轴方向距离较远，则以x轴坐标计算步长
    {
        if (X0 == X1)
        {
            return;
        }

        var StepLength = 0;
        if (X0 > X1)
        {
            StepLength = -0.0001;
        }
        else
        {
            StepLength = 0.0001;
        }
        var XTemp = X0+StepLength;
        for( ; X0>X1?XTemp>X1:XTemp<X1;XTemp += StepLength)
        { 
            var YTemp = 1.0*(Y1-Y0)/(X1-X0)*(XTemp-X0)+Y0;
            tm = [YTemp,XTemp];
            topnodes.push(tm);
        }
    }
    else //如果y轴方向距离较远，则以y轴坐标计算步长
    {
        var StepLength = 0;
        if (Y0 > Y1)
        {
            StepLength = -0.0001;
        }
        else
        {
            StepLength = 0.0001;
        }

        var YTemp = Y0+StepLength;
        for ( ; Y0>Y1? YTemp>Y1:YTemp<Y1; YTemp += StepLength)
        {
            var XTemp = 1.0*(YTemp-Y0)*(X1-X0)/(Y1-Y0)+X0;
            tm = [YTemp,XTemp];
            topnodes.push(tm);           
        }
    }
}

topnodes.push(top_lonlat[top_lonlat.length-1]);
//console.log(topnodes);

for(var i=0;i< topnodes.length;i++){
	var data  = [topnodes[i]];//,"\n"
	fs.writeFile('./add_lonlat_left', "["+data+"],\n", { 'flag': 'a' }, function(err) {
    if (err) {
        throw err;
    }
   });
}
    
