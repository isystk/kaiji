
(function($) {

	// DOM Ready
	$(function(){

		// 画面右に Twitter Follow Badge を表示する。
		(function() {
			tfb.account = 'ise0615';
			tfb.label = 'follow-me';
			tfb.color = '#0f0';
			tfb.side = 'r';
			tfb.top = 136;
			tfb.showbadge();
		})();

		// ソースコード表示を見やすくするためにprettifyを利用する。
		(function() {
			function prettify() {
				prettyPrint();
			}
			if (window.addEventListener) {
				window.addEventListener("load", prettify, false);
			} else if (window.attachEvent) {
				window.attachEvent("onload", prettify);
			} else {
				window.onload = prettify;
			}
		})();
	});

})(jQuery);

