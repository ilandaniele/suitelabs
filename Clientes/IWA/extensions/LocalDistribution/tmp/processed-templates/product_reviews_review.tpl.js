define('product_reviews_review.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    return "			- <i class=\"product-reviews-review-icon-ok-sign\" data-toggle=\"tooltip\" data-placement=\"right\" title=\""
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"verified purchaser",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":8,"column":104},"end":{"line":8,"column":138}}}))
    + "\"></i>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "                <div class=\"product-reviews-review-rating-per-attribute\">\r\n                    <div data-view=\"Global.StarRatingAttribute\"></div>\r\n                </div>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, alias4="function";

  return "        <div class=\"product-reviews-review-comment-footer\">\r\n            <p>"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Was this review helpful?",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":37,"column":15},"end":{"line":37,"column":56}}}))
    + "</p>\r\n\r\n            <button class=\"product-reviews-review-comment-footer-button "
    + alias3(((helper = (helper = compilerNameLookup(helpers,"usefulButtonClass") || (depth0 != null ? compilerNameLookup(depth0,"usefulButtonClass") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"usefulButtonClass","hash":{},"data":data,"loc":{"start":{"line":39,"column":72},"end":{"line":39,"column":93}}}) : helper)))
    + "\" type=\"button\" data-action=\"vote\" data-type=\"mark-as-useful\" data-review-id=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"reviewId") || (depth0 != null ? compilerNameLookup(depth0,"reviewId") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"reviewId","hash":{},"data":data,"loc":{"start":{"line":39,"column":171},"end":{"line":39,"column":183}}}) : helper)))
    + "\">\r\n                <!-- <i class=\"product-reviews-review-comment-footer-button-icon-like\"></i>\r\n\r\n                <span>\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"usefulCountGreaterThan0") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":43,"column":20},"end":{"line":45,"column":27}}})) != null ? stack1 : "")
    + "                </span>\r\n                -->\r\n\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"usefulCountGreaterThan0") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.program(10, data, 0),"data":data,"loc":{"start":{"line":49,"column":16},"end":{"line":53,"column":23}}})) != null ? stack1 : "")
    + "            </button>\r\n\r\n            <button class=\"product-reviews-review-comment-footer-button "
    + alias3(((helper = (helper = compilerNameLookup(helpers,"notUsefulButtonClass") || (depth0 != null ? compilerNameLookup(depth0,"notUsefulButtonClass") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"notUsefulButtonClass","hash":{},"data":data,"loc":{"start":{"line":56,"column":72},"end":{"line":56,"column":96}}}) : helper)))
    + "\" type=\"button\" data-action=\"vote\" data-type=\"mark-as-not-useful\" data-review-id=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"reviewId") || (depth0 != null ? compilerNameLookup(depth0,"reviewId") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"reviewId","hash":{},"data":data,"loc":{"start":{"line":56,"column":178},"end":{"line":56,"column":190}}}) : helper)))
    + "\">\r\n                <!-- <i class=\"product-reviews-review-comment-footer-button-icon-unlike\"></i>\r\n\r\n                <span>\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"notusefulCountGreater") : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":60,"column":20},"end":{"line":62,"column":27}}})) != null ? stack1 : "")
    + "                </span> -->\r\n\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"notusefulCountGreater") : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.program(16, data, 0),"data":data,"loc":{"start":{"line":65,"column":16},"end":{"line":69,"column":23}}})) != null ? stack1 : "")
    + "            </button>\r\n        </div>\r\n        <div data-type=\"alert-placeholder\"></div>\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "                        "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {})," ($(0))",(depth0 != null ? compilerNameLookup(depth0,"usefulCount") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":44,"column":24},"end":{"line":44,"column":60}}}))
    + "\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "                    "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Yes ($(0))",(depth0 != null ? compilerNameLookup(depth0,"usefulCount") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":50,"column":20},"end":{"line":50,"column":59}}}))
    + "\r\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "                    "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Yes",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":52,"column":20},"end":{"line":52,"column":39}}}))
    + "\r\n";
},"12":function(container,depth0,helpers,partials,data) {
    return "                        "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {})," ($(0))",(depth0 != null ? compilerNameLookup(depth0,"notUsefulCount") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":61,"column":24},"end":{"line":61,"column":62}}}))
    + "\r\n";
},"14":function(container,depth0,helpers,partials,data) {
    return "                    "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"No ($(0))",(depth0 != null ? compilerNameLookup(depth0,"notUsefulCount") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":66,"column":20},"end":{"line":66,"column":60}}}))
    + "\r\n";
},"16":function(container,depth0,helpers,partials,data) {
    return "                    "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"No",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":68,"column":20},"end":{"line":68,"column":38}}}))
    + "\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "\r\n<div class=\"product-reviews-review\" data-id=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"reviewId") || (depth0 != null ? compilerNameLookup(depth0,"reviewId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"reviewId","hash":{},"data":data,"loc":{"start":{"line":3,"column":45},"end":{"line":3,"column":57}}}) : helper)))
    + "\">\r\n	<div class=\"product-reviews-review-comment-item-cell\">\r\n        <p class=\"product-reviews-review-comment-username\">\r\n		"
    + alias4((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"<span>$(0)</span>",(depth0 != null ? compilerNameLookup(depth0,"reviewAuthor") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":6,"column":2},"end":{"line":6,"column":48}}}))
    + "\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isReviewVerified") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":2},"end":{"line":9,"column":9}}})) != null ? stack1 : "")
    + "	    </p>\r\n        <p class=\"product-reviews-review-comment-item-cell-date\">\r\n            "
    + alias4(((helper = (helper = compilerNameLookup(helpers,"reviewCreatedOn") || (depth0 != null ? compilerNameLookup(depth0,"reviewCreatedOn") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"reviewCreatedOn","hash":{},"data":data,"loc":{"start":{"line":12,"column":12},"end":{"line":12,"column":33}}}) : helper)))
    + "\r\n        </p>\r\n	</div>\r\n	<div class=\"product-reviews-review-review\">\r\n        <div class=\"product-reviews-review-review-global-star-rating-container\">\r\n		    <div data-view=\"ProductReview.Review.Global.StarRating\"></div>\r\n        </div>\r\n\r\n	    <h4 class=\"product-reviews-review-title\">\r\n		    "
    + alias4(((helper = (helper = compilerNameLookup(helpers,"reviewTitle") || (depth0 != null ? compilerNameLookup(depth0,"reviewTitle") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"reviewTitle","hash":{},"data":data,"loc":{"start":{"line":21,"column":6},"end":{"line":21,"column":21}}}) : helper)))
    + "\r\n	    </h4>\r\n\r\n		<p class=\"product-reviews-review-review-description\">\r\n            "
    + ((stack1 = (compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,(depth0 != null ? compilerNameLookup(depth0,"reviewText") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":25,"column":12},"end":{"line":25,"column":38}}})) != null ? stack1 : "")
    + "\r\n		</p>\r\n		<div class=\"product-reviews-review-review-rating\">\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isReviewRatingPerAttributesLegthGreaterThan0") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":28,"column":12},"end":{"line":32,"column":19}}})) != null ? stack1 : "")
    + "		</div>\r\n\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showActionButtons") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":35,"column":8},"end":{"line":73,"column":15}}})) != null ? stack1 : "")
    + "	</div>\r\n</div>\r\n\r\n\r\n\r\n\r\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'product_reviews_review'; return template;});