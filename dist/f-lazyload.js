/*!
 * f-lazyload v0.0.3
 * 原生无依赖, 实现图片懒加载
 * Repo: https://github.com/ifir/f-lazyload
 */
;(function(global, factory){
	//AMD || CMD
	if(typeof define === 'function' && define.amd === 'object' && define.amd){
		define([], factory);
	}else if(typeof module === "object" && typeof module.exports === "object" && module.exports){
		module.exports = factory();
	}else{
		global.Flazyload = factory();
	}
})(typeof window !== 'undefined' ? window : this, function(){
	'use strict';

	function Flazyload(opts){
		opts = arguments.length > 0 ? opts : {};
		var _this = this;
		//指定父容器
		_this.container = opts.container || 'body';
		//默认添加data-src属性开启懒加载
		_this.src = opts.sign || 'data-src';
		//srcset属性
		_this.srcset = 'data-srcset';
		//默认img标签
		_this.tag = opts.tag ||'img';
		//获取需要懒加载的dom
		//_this.eles = document.querySelectorAll(_this.container+' '+ _this.tag+'['+_this.src+']');
		_this.eles = document.querySelectorAll(_this.container+' *['+_this.src+']');
		_this.length = _this.eles.length;
		//是否在页面首次载入就判断是否有需要懒加载的图片在可视区域
		_this.preload = opts.proload || true;
		//屏幕可视宽和高
		_this.winW = window.innerWidth;
		_this.winH = window.innerHeight;

		//loading 图片
		_this.loadimg = opts.loadimg || false;
		//error 图片
		_this.errimg = opts.errimg || false;

		_this.init(opts);

		_this.addEvents(_this);
		//_this.eles.srcset = _this.eles.getAttribute(_this.srcset);
	}


	Flazyload.prototype = {
		//修正constructor
		constructor: Flazyload,
		//初始化
		init: function(opts){
			var _this = this;
			//设置loading图片
			if(_this.loadimg){
				for(var i = 0; i < _this.length; i++){
					_this.eles[i].setAttribute('src', _this.loadimg);
				}
			}
			//首次载入页面是否判断懒加载元素是否在可视区域内
			_this.preload && _this.onread(_this);
		},
		//是否在可视区域
		isVisible: function(ele){
			var rect = ele.getBoundingClientRect();
			var eTop = rect.top;
			var eLeft = rect.left;
			var eWidth = rect.width;
			var eHeight = rect.height;
			return eTop < this.winH && eTop + eHeight >= 0 && eLeft < this.winW && eLeft + eWidth >= 0;
		},
		//需要执行的懒加载
		onread: function(_this){
			var isload = false, remove = false;
			for(var i = 0; i < _this.length; i++){
				if(_this.isVisible(_this.eles[i])){
					_this.lazyload(_this.eles[i], _this);
					isload = true;
				}
			}
			if(isload){
				_this.eles = document.querySelectorAll(_this.container+' *['+_this.src+']');
				_this.length = _this.eles.length;
				isload = false;
			}
			//没有需要懒加载的图片则移除事件绑定
			if(_this.length <= 0 && !remove){
				_this.removeEvents(_this);
				remove = true;
			}
		},
		//懒加载
		lazyload: function(ele, _this){
			var dataSrc = _this.src;
			var src = ele.getAttribute(dataSrc) || '';
			var img = new Image();
			//图片加载完成
			img.addEventListener('load', function(){
				ele.src = src;
				ele.setAttribute(dataSrc, '');
				ele.removeAttribute(dataSrc);
			}, false);
			//图片加载失败
			img.addEventListener('error', function(){
				//设置图片加载失败图片
				if(_this.errimg){
					var timer = null;
					clearTimeout(timer);
					timer = setTimeout(function(){
						ele.setAttribute('src', _this.errimg);
						ele.removeAttribute(dataSrc);
						clearTimeout(timer);
					},2000);
				}else{
					ele.removeAttribute(dataSrc);
					//ele.setAttribute('alt', '图片加载失败');
				}
			}, false);
			//发起请求
			src !== '' && (img.src = src);
		},
		//绑定事件
		addEvents: function(_this){
			window.addEventListener('scroll', function(){
				_this.onread(_this);
			}, false);
		},
		//移除事件绑定
		removeEvents: function(_this){
			window.removeEventListener('scroll', function(){
				_this.onread(_this);
			}, false);
		}
	}

	return Flazyload;
})
