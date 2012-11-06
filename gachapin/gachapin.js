/*
 * gachapin
 */
(function($){
	var gachapinCount = 30;
	var opts = null;

	var gachapin = function(options){
		opts = options;

		$("<div id='gachapin-frame'></div>")
			.css({
				overflow: "hidden",
				width: getWindowSize().width + "px",
				height: getWindowSize().height + "px",
				position: "absolute",
				top: getScroll().y + "px",
				left: getScroll().x + "px",
				backgroundColor: "#000000",
				opacity: 0,
				zIndex: 5000
			})
			.appendTo("body");

		$("<div id='gachapin-wrap'></div>")
			.css({
				overflow: "hidden",
				width: getWindowSize().width + "px",
				height: getWindowSize().height + "px",
				position: "absolute",
				top: getScroll().y + "px",
				left: getScroll().x + "px",
				zIndex: 5001
			})
			.appendTo("body");

		$("<img src='"+ opts.big.src +"' alt='"+ opts.big.alt +"' width='"+ opts.big.width +"' height='"+ opts.big.height +"' />")
			.attr("id", "gachapinBig")
			.css({
				position: "absolute",
				cursor: "pointer",
				top: "-" + opts.big.height,
				zIndex: 5030
		 	})
			.click(function() {
				$("#gachapin-wrap")
					.animate({opacity: "0"},{queue: true, duration: 2000, easing: "swing", complete: function(){
						$("#gachapin-frame").remove();
						$("#gachapin-wrap").remove();
					}});
			})
			.appendTo("#gachapin-wrap");

		$("#gachapinBig")
			.css({
				top: "-" + $("#gachapinBig").height() + "px",
				display: "block"
		 	});

		var kLeft = 0;
		var kTop = 0;
		for(var i=0; i<gachapinCount; i++){
			kLeft = Math.floor(Math.random() * getWindowSize().width);
			kTop = Math.floor(Math.random() * getWindowSize().height);
			$("<img src='"+ opts.small.src +"' alt='"+ opts.small.alt +"' width='"+ opts.small.width +"' height='"+ opts.small.height +"' />")
				.attr("id", "gachapin"+i)
				.css({
					left: kLeft + "px",
					top: "-" + opts.small.height,
					position: "absolute",
					zIndex: 5010
				})
				.appendTo('#gachapin-wrap');

			animeDown("#gachapin"+i, kTop);
		}

		var interval = setInterval(function (){
			if(animeCount >= gachapinCount){
				clearInterval(interval);
				animeCount = 0;
				var left = Math.floor((getWindowSize().width - $("#gachapinBig").width()) / 2);
				var top = Math.floor((getWindowSize().height - $("#gachapinBig").height()) / 2);
				$("#gachapinBig")
					.css({
						"left": left + "px"
					 })
					.animate({top: top + "px"},{queue: true, duration: 3000, easing: "easeOutElastic", complete: function(){}});
				}
			}
		, 500);
	}

	var animeCount = 0;
	function animeDown(objStr, kTop){
		var rand = (Math.random() * 100) * 100;
		setTimeout(function(){
			$(objStr)
				.animate({top: kTop + "px"},{queue: true, duration: 3500, easing: "easeOutBounce", complete: function(){
					animeCount++;
				}});
		}, rand);
	}

	function getWindowSize(){
		return {
			height: (jQuery.browser.opera ? 
					document.documentElement.clientHeight : $(window).height()),
			width: 		(jQuery.browser.opera ? 
							document.documentElement.clientWidth : $(window).width())
		}
	}

	function getScroll(){
	   return {
	      x: document.body.scrollLeft || document.documentElement.scrollLeft,
	      y: document.body.scrollTop  || document.documentElement.scrollTop
	   };
	};

	gachapin({small:{src:'./gachapin/img/gachapin_min.jpg'}, big:{src:'./gachapin/img/gachapin_big.jpg'}});

})(jQuery);
