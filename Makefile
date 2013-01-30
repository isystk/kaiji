all: all_js_pack

ALL_JS_TARGETS := ./google-code-prettify/prettify.js ./twitterfollowbadge/badge.js ./js/common.js
ALL_JS_EXPORT = ./js/all.js
all_js_pack: $(ALL_JS_TARGETS)
	rm -Rf $(ALL_JS_EXPORT)
	java -jar ./bin/compiler.jar --compilation_level SIMPLE_OPTIMIZATIONS $(addprefix --js=,$^) > $(ALL_JS_EXPORT)

.PHONY: all all_js_pack
