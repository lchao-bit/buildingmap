
##### Apache主配置文件  
1. 位置：geoserver下的/etc/apache2/sites-enabled/000-default.conf
2. [000-default.conf](https://github.com/lchao-bit/buildingmap/blob/master/about-apache2/000-default.conf)   
说明：添加映射关系。此处需添加geohash的映射方式，类似于vector方式  
	1. 
```
	Alias /geohashjson /home/lchao/osm/geohashjson  
		<Directory /home/lchao/osm/geohashjson>  
			Options  Indexes  
			AllowOverride AuthConfig FileInfo  
			Order allow,deny  
			Allow from all
			Require all granted
		</Directory>   
``` 

将geohash标记为h   
```
    CacheEnable disk /geoserver/h

	RewriteMap hashurl prg:/home/lchao/osm/transition_geohash.py
    RewriteRule "^/geoserver/h/([\d]+)/([\d]+)$" "http://localhost${hashurl:$1 $2}" [P,L,R=301]
```
此处需注意，([\d]+)/([\d]+)部分中，第一个是z为数字，用\d表示；第二个为geohash，为字母数字组合的字符串，需要更改正则表达式。修改后为：

```
RewriteRule "^/geoserver/h/([\d]+)/([b-z0-9]+)$" "http://localhost${hashurl:$1 $2}" [P,L,R=301]
```

注意：conf文件修改后要重启apache2才能重新加载新内容，重启命令为

```
sudo service apache2 restart
```

3. 转换脚本调用时，需要写入完整完整路径
    1. geohash转换脚本为：[transition_geohash.py](https://github.com/lchao-bit/buildingmap/blob/master/about-apache2/transition_geohash.py)
    2. 为了分开测试，此处先写一个只包含helloworld的脚本来测试，[transition_geohash_test.py](https://github.com/lchao-bit/buildingmap/blob/master/about-apache2/transition_geohash_test.py)
    3. 重启后，出现错误，查看apache2的log，命令为 

    
```
	cd /var/log/apache2  
	ls
	vi access.log //看访问  
	：q //退出vim编辑器  
```

   
提示错误为transition_geohash_test.py文件访问权限问题，重新设置访问权限；查看log时需要用键盘上下键来移动，鼠标无效  
	4. 正确结果为在/home/zchang/tmp/mypy.txt中显示“HELLO WORLD!”  
	5. 测试完成后，换回转换脚本transition_geohash.py进行测试  
	6. 注意Python中的缩进有严格的要求，都是以空格为缩进方式的，不能用tab键进行缩进  
	7. 在apache中无法对脚本进行编译，所以要在外部单独执行该脚本  
	
   
```
#运行脚本
    ./transition_geohash.py
    #输入参数
    12 wx4er4
    #查看运行错误，根据提示进行修改
    #进入修改模式
    vim transition_geohash.py
    #进入插入模式
    #i
    #修改完成，保存并退出
    esc  
    :wq
```

    8. 单独运行成功，放在配置文件中一起运行；运行结果都能够保存json文件，同时有数据写入

4. 目标：在浏览器中用url可以返回对应geohashjson的数据（类似瓦片返回geojson方式）
	1. 存在问题：文件系统写入，但是浏览器中未能返回正确结果。   
	   原因：在000-default.conf中RewriteMap和RewriteRule下面的hashcurl写的不一致，导致不能正确返回结果  
	   调试过程：
		1. 000-default.conf中添加LogLevel alert rewrite:trace3用来跟踪错误位置，在error.log中会增加调试信息
		2. LogLevel alert rewrite:trace3在调试阶段可以保留，在正常应用时要删除
	2. 调试参考值：v/14/13482/6213   h/wx4er4  
	   浏览器位置：http://os.cs.tsinghua.edu.cn/GeoServer/vectormap/geoserver/h/12/wx4er4  
        瓦片位置：http://os.cs.tsinghua.edu.cn/GeoServer/vectormap/geoserver/v/14/13482/6213
	3. 调用[geojson_2_geohashjson-server.js](https://github.com/lchao-bit/buildingmap/blob/master/about-apache2/geojson_2_geohashjson-server.js)文件时，参考  

```
os.system('jq -c \'del(.features[].properties | .[]| select(.==null)) | del(.features[].id) |del(.features[].geometry_name)\' '+ jsontmp + '> ' + jsonname);
os.system('rm -f ' + jsontmp + ' >> /dev/null 2>&1');
```
其中，system中内容为脚本文件执行的全部代码，（先测试脚本执行），添加在

```
sys.stdout.write('/geohash/' + str(int(z)) + '_' + str(geohash) + '.json' + '\n');
```
后面注意修改名称  
5. 脚本测试执行语句，后面跟的是待转换文件名（不包含后缀）

```
node geojson_2_geohashjson-server.js 14_13482_6213
```

6. 目前状态，在浏览器中可请求数据得到正确结果
##### Apache日志
1. 位置：/var/log/apache2/
2. 作用：方便调试
2. access.log看访问
3. error.log看错误报告

##### 修改客户端访问
    