define('product_reviews_preview_review.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    return "			<div data-view=\"Global.StarRatingAttribute\" class=\"product-reviews-preview-review-rating-attribute\"></div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "				- <i class=\"product-reviews-preview-review-icon-ok-sign\"></i> "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"verified purchaser",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":17,"column":66},"end":{"line":17,"column":100}}}))
    + "\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"product-reviews-preview-review\" data-id=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"reviewId") || (depth0 != null ? compilerNameLookup(depth0,"reviewId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"reviewId","hash":{},"data":data,"loc":{"start":{"line":1,"column":53},"end":{"line":1,"column":65}}}) : helper)))
    + "\">\r\n	<div class=\"product-reviews-preview-review-rating\">\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isReviewRatingPerAttributesLegthGreaterThan0") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":2},"end":{"line":5,"column":9}}})) != null ? stack1 : "")
    + "\r\n		<div data-view=\"Global.StarRating\"></div>\r\n	</div>\r\n	<div class=\"product-reviews-preview-review-content\">\r\n\r\n		<h4>\r\n			"
    + alias4(((helper = (helper = compilerNameLookup(helpers,"reviewTitle") || (depth0 != null ? compilerNameLookup(depth0,"reviewTitle") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"reviewTitle","hash":{},"data":data,"loc":{"start":{"line":12,"column":3},"end":{"line":12,"column":18}}}) : helper)))
    + "\r\n		</h4>\r\n		<p class=\"product-reviews-preview-review-content-username\">\r\n			"
    + alias4((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Will be posted publicly as <span>$(0)</span>",(depth0 != null ? compilerNameLookup(depth0,"reviewAuthor") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":15,"column":3},"end":{"line":15,"column":76}}}))
    + "\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isReviewVerified") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":16,"column":3},"end":{"line":18,"column":10}}})) != null ? stack1 : "")
    + "		</p>\r\n		<div class=\"product-reviews-preview-review-content-description\">\r\n			<p>\r\n				"
    + ((stack1 = ((helper = (helper = compilerNameLookup(helpers,"reviewText") || (depth0 != null ? compilerNameLookup(depth0,"reviewText") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"reviewText","hash":{},"data":data,"loc":{"start":{"line":22,"column":4},"end":{"line":22,"column":20}}}) : helper))) != null ? stack1 : "")
    + "\r\n			</p>\r\n		</div>\r\n	</div>\r\n</div>\r\n\r\n\r\n\r\n\r\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'product_reviews_preview_review'; return template;});