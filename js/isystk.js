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


	// Vendor

	Isystk.Vendor = (function() {
		var vendor = {
			prefix : '',
			transitionend : 'transitionend',
			animationstart : 'animationstart',
			animationend : 'animationend',
			animationiteration : 'animationiteration',

			// Caution!
			// 親が window でないとダメらしい
			// 使用しているスクリプトがあるので削除しないが, 使わないこと
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
				//return this.prefix ? this.prefix + property.charAt(0).toUpperCase() + property.slice(1) : property;
				return this.prefix ? '-' + this.prefix + '-' + property : property;
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
				vendor.prefix = 'moz';
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
	Isystk.loadjscssfile = function (filename, filetype) {
		if (filetype === 'js'){
			var fileref = document.createElement('script');
			fileref.setAttribute('type','text/javascript');
			fileref.setAttribute('src', filename);
		} else if (filetype === 'css') {
			var fileref=document.createElement('link');
			fileref.setAttribute('rel', 'stylesheet');
			fileref.setAttribute('type', 'text/css');
			fileref.setAttribute('href', filename);
		}
		if (typeof fileref !== 'undefined') {
			document.getElementsByTagName('head')[0].appendChild(fileref);
		}
	};

})(window);

