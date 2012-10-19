/*
 * kingubonbi
 *
 * Date: 2008/08/23
 * @author hisasann
 * @version 0.1
 *
 * Tested with jQuery 1.2.6
 *    On FF 3.0, Opera 9.5 and Safari 3.1 on Mac OS X.
 *       IE6.0, IE7.0, FF 3.0, Opera 9.5 and Safari 3.1 on Windows.
 *
 * Copyright (c) 2008 hisasann (hisasann.com/housetect/)
 * Open source under the BSD License. 
 *
 */
(function($){
	var bonbiCount = 30;
	var opts = null;

	var kingbonbi = function(options){
		opts = options;

		$("<div id='kingbonbi-frame'></div>")
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

		$("<div id='kingbonbi-wrap'></div>")
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
			.attr("id", "kingbonbiBig")
			.css({
				position: "absolute",
				cursor: "pointer",
				top: "-" + opts.big.height,
				zIndex: 5030
		 	})
			.click(function() {
				$("#kingbonbi-wrap")
					.animate({opacity: "0"},{queue: true, duration: 2000, easing: "swing", complete: function(){
						$("#kingbonbi-frame").remove();
						$("#kingbonbi-wrap").remove();
					}});
			})
			.appendTo("#kingbonbi-wrap");

		$("#kingbonbiBig")
			.css({
				top: "-" + $("#kingbonbiBig").height() + "px",
				display: "block"
		 	});

		var kLeft = 0;
		var kTop = 0;
		for(var i=0; i<bonbiCount; i++){
			kLeft = Math.floor(Math.random() * getWindowSize().width);
			kTop = Math.floor(Math.random() * getWindowSize().height);
			$("<img src='"+ opts.small.src +"' alt='"+ opts.small.alt +"' width='"+ opts.small.width +"' height='"+ opts.small.height +"' />")
				.attr("id", "kingbonbi"+i)
				.css({
					left: kLeft + "px",
					top: "-" + opts.small.height,
					position: "absolute",
					zIndex: 5010
				})
				.appendTo('#kingbonbi-wrap');

			animeDown("#kingbonbi"+i, kTop);
		}

		var interval = setInterval(function (){
				if(animeCount >= bonbiCount){
					clearInterval(interval);
					animeCount = 0;
					var left = Math.floor((getWindowSize().width - $("#kingbonbiBig").width()) / 2);
					var top = Math.floor((getWindowSize().height - $("#kingbonbiBig").height()) / 2);
					$("#kingbonbiBig")
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

	kingbonbi({small:{src:'./hogehack/img/gachapin_min.jpg'}, big:{src:'./hogehack/img/gachapin_big.jpg'}});

})(jQuery);
