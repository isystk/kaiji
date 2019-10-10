
window.jQuery || loadJsCssFile('//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js', 'js');
window.Isystk || loadJsCssFile('//isystk.github.com/kaiji/js/isystk.js?d='+new Date().getMilliseconds(), 'js');

// JS・CSSファイルを動的にロードします。
function loadJsCssFile(file, type){
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
}

// DOM Ready
function initialise() {
	new Kaiji().run();
}

/* ここからカイジ */
function Kaiji() {
	this.setting = {
		url : 'http://isystk.github.com/kaiji/',
		img : {
			zawa: 'img/zawa.jpg',
			kaiji: 'img/kaiji.png'
		}
	};
	this.getImage = function(name) {
		return this.setting.url + this.setting.img[name];
	};
}

// 処理を実行します
Kaiji.prototype.run = function () {
	var kaiji = this,
		interval = 5000,
		initinterval = interval,
		timer = undefined,
		excute =  function() {
			if( 400 < interval ) {
				// 徐々にざわざわを増やしていく
				for (var i=0, len=(initinterval / interval); i<len; i++) {
					kaiji.zawazawa();
				}
				timer = setTimeout(excute, interval);
				interval = interval - (interval/10);
			} else {
				clearTimeout(timer);
				// ざわざわが終わったら、Webコンテンツを浮遊させる
				kaiji.zawazawa(function() {

					// Webコンテンツを浮遊させる
					kaiji.breakcontents();

					// カイジ登場
					kaiji.showKaiji();
				});
			}
		};
	excute();
};

// 画面表示エリアに「ざわ」を表示します。
Kaiji.prototype.zawazawa = function (callback) {
	var width = $(window).width(), // 表示領域幅
		height = $(window).height(), // 表示領域高さ
		scrollTop = $(window).scrollTop(), // スクロール上位置
		scrollLeft = $(window).scrollLeft(); // スクロール左位置

	$('<img src="'+ this.getImage('zawa')+'" />')
		.css('display', 'none')
		.bind('load', function() {
			var $img = $(this);
			$img.css('position', 'absolute')
				.css('top', Isystk.randInt(scrollTop, scrollTop+height-$img.height()))
				.css('left', Isystk.randInt(scrollLeft, scrollLeft+width-$img.width()))
				.css('z-index', 9999)
				.css('width', Isystk.randInt(100, 256))
				.css('border-radius', 20)
				.fadeIn(2000, function () {
					$img.fadeOut(2000, function() {
						$img.remove();
						if (callback) {
							callback();
						}
					});
				});
		})
		.appendTo('body');
};

// Web画面上のコンテンツを浮遊させます。
Kaiji.prototype.breakcontents = function() {
	var kaiji = this,
		width = $(window).width(), // 表示領域幅
		height = $(window).height(), // 表示領域高さ
		scrollTop = $(window).scrollTop(), // スクロール上位置
		scrollLeft = $(window).scrollLeft(), // スクロール左位置
		target = $('h1, h2, h3, h4, h5, p, li, dt, dd, pre, aside');

	target.each(function(i) {
		var $this = $(this),
			offset = $this.offset(),
			// 要素をランダム配置
			getRandomPosition = function() {
				return 'translateX(' + Isystk.randInt(width-offset.left, offset.left-width) + 'px) '+
					'translateY(' + Isystk.randInt(height-offset.top, offset.top-height) + 'px) '+
					'translateZ(' + Isystk.randInt(999, -999) + 'px) '+
					'rotateX(' + Isystk.randInt(360, -360) +  'deg) ' +
					'rotateY(' + Isystk.randInt(360, -360) +  'deg) ' +
					'rotateZ(' + Isystk.randInt(360, -360) +  'deg) ';
			},
			position1 = getRandomPosition(),
			position2 = getRandomPosition(),
			position3 = getRandomPosition();

		// トランジションでランダムな位置に１度だけ移動させる
		$this
		.css(Isystk.Vendor.getProperty('transition-property'), Isystk.Vendor.getProperty('transform'))
		.css(Isystk.Vendor.getProperty('transition-duration'), '3.0s')
		.css(Isystk.Vendor.getProperty('transition-timing-function'), 'cubic-bezier(0.610, -0.220, 0.555, 1.105)')
		.css(Isystk.Vendor.getProperty('transform'), position1)
		// トランジション終了時にアニメーションに処理を移行する
		.bind(Isystk.Vendor.transitionend, randomAnimation);

		// アニメーションでランダムな位置に連続で移動させる
		function randomAnimation() {
			var keyframe = [
				'0% {'+Isystk.Vendor.getProperty('transform')+': '+position1+' }',
				'30% {'+Isystk.Vendor.getProperty('transform')+': '+position2+' }',
				'60% {'+Isystk.Vendor.getProperty('transform')+': '+position3+' }',
				'100% {'+Isystk.Vendor.getProperty('transform')+': '+position1+' }'
			];

			var keyframes = Isystk.Vendor.getKeyframeProperty('move'+i) + '{' +
				keyframe.join(" ") +
				'}';

			// stylesheet オブジェクトの追加位置に keyframes を追加する
			Isystk.addCssRule(keyframes);

			$this
			.css(Isystk.Vendor.getProperty('animation-name'), 'move'+i)
			.css(Isystk.Vendor.getProperty('animation-timing-function'), 'cubic-bezier(0.0, 0.0, 1.0, 1.0)')
			.css(Isystk.Vendor.getProperty('animation-duration'), '60.0s')
			.css(Isystk.Vendor.getProperty('animation-iteration-count'), 'infinite');
		}

	});

	// クリックで元の位置に配置
	$('body').one('click', function(e) {
		e.preventDefault();
		$(target.selector).css(Isystk.Vendor.getProperty('animation-name'), '');
		setTimeout(function () {
			target.each(function() {
				var css = 'translateX(0px) translateY(0px) translateZ(0px) ' +
					'rotateX(0deg) rotateY(0deg) rotateZ(0deg)';
				$(this).unbind(Isystk.Vendor.transitionend)
				.css(Isystk.Vendor.getProperty('transform'), css)
			});
			// トランジション終了時にカイジを退場させる
			$('#kaijiMessage marquee').text('See You!!');
			// 少し送らせてフェードアウト
			$('.kaiji').delay(3000).fadeOut(3000);
			$('body').unbind('click');
			$('a').click(function(e) {
				e.preventDefault();
				window.open('//isystk.github.io/profile/');
			});
		},1000);
	});
};

// カイジを登場させます。
Kaiji.prototype.showKaiji = function () {
	var width = $(window).width(), // 表示領域幅
		height = $(window).height(), // 表示領域高さ
		scrollTop = $(window).scrollTop(), // スクロール上位置
		scrollLeft = $(window).scrollLeft(); // スクロール左位置

	$('<img class="kaiji" src="'+ this.getImage('kaiji')+'" width="'+256+'">')
		.css('display', 'none')
		.bind('load', function() {
			var $img = $(this);
			$img.css('position', 'absolute')
				.css('top', scrollTop+height-300)
				.css('left', scrollLeft+width-250)
				.css('z-index', 9999)
				.fadeIn(2000, function () {
					// 吹き出しを表示する
					(function() {
						var message = $(['<div id="kaijiMessage" class="kaiji">',
								'<div class="textinner">',
									'<p><marquee>XSSのセキュリティホールがあるようです。不具合の修正をお願いします！ by いせ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;クリックすると元に戻るよ</marquee></p>',
								'</div>',
								'<div class="triangle"></div>',
							'</div>'].join(''))
							.css('width', '250px')
							.css('position', 'absolute')
							.css('top', scrollTop+height-390)
							.css('left', scrollLeft+width-390)
							.css('z-index', 9999);
						message.find('.textinner')
							.css('padding', '20px')
							.css('background-color', '#ffffff')
							.css('border', '5px solid #000000')
							.css('border-radius', '30px');
						message.find('.textinner p')
							.css('color', '#000000')
							.css('text-align', 'center')
							.css('font-size', '30px');
						message.find('.triangle')
							.css('position', 'absolute')
							.css('left', '70%')
							.css('border-top', '20px solid #000000')
							.css('border-right', '20px solid transparent')
							.css('border-left', '20px solid transparent')
							.css('border-bottom', '20px solid transparent');
						$('body').append(message);
					})();

				});
			})
			.appendTo('body');
	};

// JSファイルがロードされるまで待機する
(function() {
	var timer = undefined;
	var waitjs =  function() {
		if( typeof( jQuery ) === 'undefined' ||
			typeof( Isystk ) === 'undefined' ) {
			timer = setTimeout( waitjs, 0 );
		} else {
			clearTimeout(timer);
			$ = jQuery;
			$(initialise);
		}
	};
	waitjs();
})();


