define('enhanced_global_views_star_rating.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "		<div class=\"global-views-star-rating-container\" data-action=\"scroll-to-reviews\">\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showLabelRating") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":3},"end":{"line":10,"column":10}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showLabel") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":12,"column":3},"end":{"line":18,"column":10}}})) != null ? stack1 : "")
    + "\n			<div id=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"name") || (depth0 != null ? compilerNameLookup(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":20,"column":12},"end":{"line":20,"column":20}}}) : helper)))
    + "\" class=\"global-views-star-rating-area "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isReviewMode") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":20,"column":59},"end":{"line":20,"column":127}}})) != null ? stack1 : "")
    + "\" data-toggle='rater' data-validation=\"control\" data-name=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"name") || (depth0 != null ? compilerNameLookup(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":20,"column":186},"end":{"line":20,"column":194}}}) : helper)))
    + "\" data-max=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"maxValue") || (depth0 != null ? compilerNameLookup(depth0,"maxValue") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"maxValue","hash":{},"data":data,"loc":{"start":{"line":20,"column":206},"end":{"line":20,"column":218}}}) : helper)))
    + "\" data-value=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"value") || (depth0 != null ? compilerNameLookup(depth0,"value") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"value","hash":{},"data":data,"loc":{"start":{"line":20,"column":232},"end":{"line":20,"column":241}}}) : helper)))
    + "\">\n\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isWritable") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":22,"column":4},"end":{"line":28,"column":11}}})) != null ? stack1 : "")
    + "\n				<div class=\"global-views-star-rating-area-empty\">\n					<div class=\"global-views-star-rating-area-empty-content\">\n"
    + ((stack1 = compilerNameLookup(helpers,"each").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"buttons") : depth0),{"name":"each","hash":{},"fn":container.program(11, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":32,"column":6},"end":{"line":34,"column":15}}})) != null ? stack1 : "")
    + "					</div>\n				</div>\n\n				<div class=\"global-views-star-rating-area-fill\" data-toggle='ratting-component-fill' "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isViewMode") : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":38,"column":89},"end":{"line":38,"column":143}}})) != null ? stack1 : "")
    + ">\n					<div class=\"global-views-star-rating-area-filled\">\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isReviewMode") : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0, blockParams, depths),"inverse":container.program(19, data, 0, blockParams, depths),"data":data,"loc":{"start":{"line":40,"column":6},"end":{"line":48,"column":13}}})) != null ? stack1 : "")
    + "					</div>\n				</div>\n			</div>\n\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showValue") : depth0),{"name":"if","hash":{},"fn":container.program(22, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":53,"column":3},"end":{"line":57,"column":10}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showRatingCount") : depth0),{"name":"if","hash":{},"fn":container.program(24, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":59,"column":3},"end":{"line":73,"column":10}}})) != null ? stack1 : "")
    + "		</div>\n\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showNoReviewsLink") : depth0),{"name":"if","hash":{},"fn":container.program(32, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":76,"column":2},"end":{"line":78,"column":9}}})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    return "				<div class=\"global-views-star-rating-content-rating\">\n					<span class=\"global-views-star-rating-label-visible\">\n						"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Rating",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":7,"column":6},"end":{"line":7,"column":28}}}))
    + "\n					</span>\n				</div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "				<div class=\"global-views-star-rating-content-label\">\n					<span class=\"global-views-star-rating-label\" for=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"name") || (depth0 != null ? compilerNameLookup(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":14,"column":55},"end":{"line":14,"column":63}}}) : helper)))
    + "\">\n						"
    + alias4(((helper = (helper = compilerNameLookup(helpers,"label") || (depth0 != null ? compilerNameLookup(depth0,"label") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data,"loc":{"start":{"line":15,"column":6},"end":{"line":15,"column":15}}}) : helper)))
    + "\n					</span>\n				</div>\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "global-views-star-rating-area-review-mode";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "					<div class=\"global-views-star-rating-area-writable"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"className") || (depth0 != null ? compilerNameLookup(depth0,"className") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"className","hash":{},"data":data,"loc":{"start":{"line":23,"column":55},"end":{"line":23,"column":68}}}) : helper)))
    + "\">\n"
    + ((stack1 = compilerNameLookup(helpers,"each").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"buttons") : depth0),{"name":"each","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":24,"column":6},"end":{"line":26,"column":15}}})) != null ? stack1 : "")
    + "					</div>\n";
},"9":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, alias4="function";

  return "							<button type=\"button\" aria-label=\""
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Rate this item with $(0) stars",(data && compilerNameLookup(data,"indexPlusOne")),"Button that allows to rate an item",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":25,"column":41},"end":{"line":25,"column":138}}}))
    + "\" data-action=\"rate\" name=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"name") || (depth0 != null ? compilerNameLookup(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":25,"column":165},"end":{"line":25,"column":173}}}) : helper)))
    + "\" value=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"indexPlusOne") || (data && compilerNameLookup(data,"indexPlusOne"))) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"indexPlusOne","hash":{},"data":data,"loc":{"start":{"line":25,"column":182},"end":{"line":25,"column":199}}}) : helper)))
    + "\"></button>\n";
},"11":function(container,depth0,helpers,partials,data) {
    var helper;

  return "							<i class=\"global-views-star-rating-empty"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"className") || (depth0 != null ? compilerNameLookup(depth0,"className") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"className","hash":{},"data":data,"loc":{"start":{"line":33,"column":47},"end":{"line":33,"column":60}}}) : helper)))
    + "\"></i>\n";
},"13":function(container,depth0,helpers,partials,data) {
    var helper;

  return " style=\"width: "
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"filledBy") || (depth0 != null ? compilerNameLookup(depth0,"filledBy") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"filledBy","hash":{},"data":data,"loc":{"start":{"line":38,"column":122},"end":{"line":38,"column":134}}}) : helper)))
    + "%\"";
},"15":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"ratedStars") : depth0),{"name":"each","hash":{},"fn":container.program(16, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":41,"column":7},"end":{"line":43,"column":16}}})) != null ? stack1 : "");
},"16":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "								<i class=\"global-views-star-rating-filled"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"className") || (depth0 != null ? compilerNameLookup(depth0,"className") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"className","hash":{},"data":data,"loc":{"start":{"line":42,"column":49},"end":{"line":42,"column":62}}}) : helper)))
    + " "
    + ((stack1 = compilerNameLookup(helpers,"unless").call(alias1,(depths[1] != null ? compilerNameLookup(depths[1],"isWritable") : depths[1]),{"name":"unless","hash":{},"fn":container.program(17, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":42,"column":63},"end":{"line":42,"column":141}}})) != null ? stack1 : "")
    + "\"></i>\n";
},"17":function(container,depth0,helpers,partials,data) {
    return "global-views-star-rating-filled-rated-star";
},"19":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"buttons") : depth0),{"name":"each","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":45,"column":7},"end":{"line":47,"column":16}}})) != null ? stack1 : "");
},"20":function(container,depth0,helpers,partials,data) {
    var helper;

  return "								<i class=\"global-views-star-rating-filled"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"className") || (depth0 != null ? compilerNameLookup(depth0,"className") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"className","hash":{},"data":data,"loc":{"start":{"line":46,"column":49},"end":{"line":46,"column":62}}}) : helper)))
    + "\"></i>\n";
},"22":function(container,depth0,helpers,partials,data) {
    var helper;

  return "				<span class=\"global-views-star-rating-value\">\n					"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"value") || (depth0 != null ? compilerNameLookup(depth0,"value") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"value","hash":{},"data":data,"loc":{"start":{"line":55,"column":5},"end":{"line":55,"column":14}}}) : helper)))
    + "\n				</span>\n";
},"24":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "				<span class=\"global-views-star-rating-review-total\">\n\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"ratingCountGreaterThan0") : depth0),{"name":"if","hash":{},"fn":container.program(25, data, 0),"inverse":container.program(30, data, 0),"data":data,"loc":{"start":{"line":62,"column":5},"end":{"line":71,"column":12}}})) != null ? stack1 : "")
    + "				</span>\n";
},"25":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"hasOneReview") : depth0),{"name":"if","hash":{},"fn":container.program(26, data, 0),"inverse":container.program(28, data, 0),"data":data,"loc":{"start":{"line":63,"column":6},"end":{"line":67,"column":13}}})) != null ? stack1 : "");
},"26":function(container,depth0,helpers,partials,data) {
    return "							<span class=\"global-views-star-rating-review-total-review\">"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"($(0) Review)",(depth0 != null ? compilerNameLookup(depth0,"ratingCount") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":64,"column":66},"end":{"line":64,"column":108}}}))
    + "</span>\n";
},"28":function(container,depth0,helpers,partials,data) {
    return "							<span class=\"global-views-star-rating-review-total-review\">"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"($(0) Reviews)",(depth0 != null ? compilerNameLookup(depth0,"ratingCount") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":66,"column":66},"end":{"line":66,"column":109}}}))
    + "</span>\n";
},"30":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "						<span class=\"global-views-star-rating-review-total-empty-number\">("
    + alias3(((helper = (helper = compilerNameLookup(helpers,"ratingCount") || (depth0 != null ? compilerNameLookup(depth0,"ratingCount") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"ratingCount","hash":{},"data":data,"loc":{"start":{"line":69,"column":72},"end":{"line":69,"column":87}}}) : helper)))
    + ")</span>\n						<span class=\"global-views-star-rating-review-total-no-review\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1," No Reviews yet",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":70,"column":68},"end":{"line":70,"column":100}}}))
    + "</span>\n";
},"32":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "			<a class=\"global-views-star-rating-no-reviews-link\" href=\"#\" data-touchpoint=\"home\" data-hashtag=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"newReviewLink") || (depth0 != null ? compilerNameLookup(depth0,"newReviewLink") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"newReviewLink","hash":{},"data":data,"loc":{"start":{"line":77,"column":101},"end":{"line":77,"column":118}}}) : helper)))
    + "\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,(depth0 != null ? compilerNameLookup(depth0,"newReviewLabel") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":77,"column":120},"end":{"line":77,"column":150}}}))
    + "</a>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "<div class=\"global-views-star-rating\" data-validation=\"control-group\">\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"showRating") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":1},"end":{"line":79,"column":8}}})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true,"useDepths":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/SuiteLabs/EnhancedProductReviews/1.0.1/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'enhanced_global_views_star_rating'; return template;});