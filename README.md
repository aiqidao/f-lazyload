# f-lazyload
原生无依赖，懒加载插件(完善ing...)
兼容IE8(不包括IE8)以上

```
实现的主要功能:
1、支持img,canvas,div(能设置background-image属性)标签元素
2、支持img设置dataset属性
3、自定义加载完成动画
4、自定义loading图片和error图片
5、支持预加载
```

### 安装依赖

> npm install

### 开发

> gulp dev 浏览器自动打开localhost:3000

### 打包

> gulp build 查看dist目录


### 如何使用

1、页面引入
```
<script src="youpath/f-lazload.js"></script>
<script>
	var Flazyload = new Flazyload({
		container:String, //指定父容器 默认body,
		loadimg:String, //加载中图片 默认无图片
		errimg:String, //加载失败图片 默认无图片
		tag:String, //指定需要加载元素标签名称,默认img,如果全部懒加载的元素都是一种类型,最好指定一下类型
		mix:Boolean, //混杂模式,如果需要加载的元素包含img,canvas,div等则开启mix,默认false,开启混杂模式则不需要指定tag类型
	});
</script>
```
###or:

2、npm安装

> npm install --save f-lazyload

```
var Flazyload = require('f-lazyload');
var lazyload = new Flazyload({
	container:String, //指定父容器 默认body,
	loadimg:String, //加载中图片 默认无图片
	errimg:String, //加载失败图片 默认无图片
	tag:String, //指定需要加载元素标签名称,默认img,如果全部懒加载的元素都是一种类型,最好指定一下类型
	mix:Boolean, //混杂模式,如果需要加载的元素包含img,canvas,div等则开启mix,默认false,开启混杂模式则不需要指定tag类型
});
```



