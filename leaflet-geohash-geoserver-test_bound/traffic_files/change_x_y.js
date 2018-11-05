var fs=require('fs');
var map_file="./polygon_bit_more";
var maps = fs.readFileSync(map_file);
var lineReader = require('./line-reader');

lineReader.eachLine(map_file, function(line, last, cb) {
	  	read_lonlat(line);
	  	cb();
	});

var str;
function read_lonlat(line){
	str = line.split(',');
	fs.writeFile('./polygon_bit_more_change', str[1]+","+str[0]+",\n", { 'flag': 'a' }, function(err) {
    if (err) {
        throw err;
    }
   });
}
