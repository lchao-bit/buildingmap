function SphericalMercator (latlng) {
	MAX_LATITUDE: 85.0511287798,
	DEG_TO_RAD: Math.PI / 180,
	
		var d = DEG_TO_RAD,
		    max = MAX_LATITUDE,
		    lat = Math.max(Math.min(max, latlng.lat), -max),
		    x = latlng.lng * d,
		    y = lat * d;

		y = Math.log(Math.tan((Math.PI / 4) + (y / 2)));

		return (x, y);

};

function simple(latlng) {
		return (latlng.lng, latlng.lat);
	}