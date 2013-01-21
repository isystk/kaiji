// グローバルネームスペース
var Isystk = Isystk || {};

(function(window) {

	// Data type check

	// http://blog.livedoor.jp/dankogai/archives/51756459.html
	Isystk.typeOf = function(value) {
		if (value === null) return 'Null';
		if (value === undefined) return 'Undefined';
		var c = value.constructor;
		return c.hasOwnProperty('name') ? c.name : ('' + c).replace(/^\s*function\s*([^\(]*)[\S\s]+$/im, '$1');
	};

	Isystk.isObject = function(value) {
		return typeof value === 'object' && value !== null;
	};

	Isystk.isNumber = function(value) {
		return typeof value === 'number';
	};

	Isystk.isNumeric = function(value) {
		return !isNaN(value) && isFinite(value);
	};

	Isystk.isString = function(value) {
		return typeof value === 'string';
	};

	Isystk.isFunction = function(value) {
		return typeof value === 'function';
	};

	Isystk.isArray = function(value) {
		return Object.prototype.toString.call(value) === '[object Array]';
	};

	Isystk.isNull = function(value) {
		return value === null;
	};

	Isystk.isUndefined = function(value) {
		return typeof value === 'undefined';
	};

	Isystk.contains = function(array, value){
		for (var i in array) {
			if (array.hasOwnProperty(i) && array[i] === value) {
				return true;
			}
		}
		return false;
	};

	// Vendor

	Isystk.Vendor = (function() {
		var isystk = this;
		var vendor = {
			prefix : '',
			withoutPrefix : [],
			transitionend : 'transitionend',
			animationstart : 'animationstart',
			animationend : 'animationend',
			animationiteration : 'animationiteration',

			requestAnimationFrame: (function(){
				return  window.requestAnimationFrame	   ||
						window.webkitRequestAnimationFrame ||
						window.mozRequestAnimationFrame	||
						window.oRequestAnimationFrame	  ||
						window.msRequestAnimationFrame	 ||
						function (callback) {
							window.setTimeout(callback, 1000 / 60);
						};
			})(),
			cancelAnimationFrame: (function(){
				return  window.cancelAnimationFrame || window.cancelRequestAnimationFrame ||
						window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame ||
						window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame ||
						window.oCancelAnimationFrame || window.oCancelRequestAnimationFrame ||
						window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame ||
						function(id) {
							window.clearTimeout(id);
						};
			})(),

			// ベンダープレフィックス付きのプロパティを取得します。
			getProperty: function(property) {
				if (isystk.contains(vendor.withoutPrefix, property)) {
					return property;
				}
				return this.prefix ? '-' + this.prefix.charAt(0).toLowerCase() + '-' + property : property;
			},

			// ベンダープレフィックス付きのキーフレームプロパティを取得します。
			getKeyframeProperty: function(name) {
				return '@' + vendor.getProperty('keyframes') + ' ' + name;
			}
		};

		switch (true) {
			case (/webkit/i).test(navigator.appVersion):
				vendor.prefix = 'webkit';
				vendor.transitionend = 'webkitTransitionEnd';
				vendor.animationstart = 'webkitAnimationStart';
				vendor.animationend = 'webkitAnimationEnd';
				vendor.animationiteration = 'webkitAnimationIteration';
				break;
			case (/firefox/i).test(navigator.userAgent):
				vendor.prefix = 'Moz';
				vendor.withoutPrefix= ['transform'];
				break;
			case (/msie/i).test(navigator.userAgent):
				vendor.prefix = 'ms';
				vendor.transitionend = 'MSTransitionEnd';
				vendor.animationstart = 'MSAnimationStart';
				vendor.animationend = 'MSAnimationEnd';
				vendor.animationiteration = 'MSAnimationIteration';
				break;
			case 'opera' in window:
				vendor.prefix = 'O';
				vendor.transitionend = 'oTransitionEnd'; // otransitionend
				vendor.animationstart = 'oAnimationStart';
				vendor.animationend = 'oAnimationEnd';
				vendor.animationiteration = 'oAnimationIteration';
				vendor.withoutPrefix= ['transform'];
				break;
			default:
				break;
		}

		return vendor;
	})();

	// ランダムな整数を取得します
	Isystk.randInt = function (max, min) {
		if (min === undefined) min = 0;
		return Math.floor(Math.random() * (max - min + 1) + min);
	};

	// JS・CSSファイルを動的にロードします。
	Isystk.loadJsCssFile = function loadJsCssFile(file, type){
		var tag = undefined;
		if (type === 'js'){
			tag = document.createElement('script');
			tag.setAttribute('type','text/javascript');
			tag.setAttribute('src', file);
		} else if (type === 'css') {
			tag = document.createElement('link');
			tag.setAttribute('rel', 'stylesheet');
			tag.setAttribute('type', 'text/css');
			tag.setAttribute('href', file);
		}
		if (typeof tag !== 'undefined') {
			document.getElementsByTagName('head')[0].appendChild(tag);
		}
	};

	// CSSルールをスタイルシートに追加します
	Isystk.addCssRule = function(rule) {
		if( document.styleSheets && document.styleSheets.length && document.styleSheets[0].cssRules && document.styleSheets[0].cssRules.length) {
			var targetRuleIndex = document.styleSheets[0].cssRules.length;
			document.styleSheets[0].insertRule( rule, targetRuleIndex );
		} else {
			var s = document.createElement( 'style' );
			s.innerHTML = rule;
			document.getElementsByTagName( 'head' )[ 0 ].appendChild( s );
		}
	};


})(window);

