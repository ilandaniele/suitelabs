define('global_views_star_rating.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    return "			<div class=\"global-views-star-rating-content-rating\">\r\n				<span class=\"global-views-star-rating-label-visible\">\r\n					"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Rating",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":6,"column":5},"end":{"line":6,"column":27}}}))
    + "\r\n				</span>\r\n			</div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "			<div class=\"global-views-star-rating-content-label\">\r\n				<span class=\"global-views-star-rating-label\" for=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"name") || (depth0 != null ? compilerNameLookup(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":13,"column":54},"end":{"line":13,"column":62}}}) : helper)))
    + "\">\r\n					"
    + alias4(((helper = (helper = compilerNameLookup(helpers,"label") || (depth0 != null ? compilerNameLookup(depth0,"label") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data,"loc":{"start":{"line":14,"column":5},"end":{"line":14,"column":14}}}) : helper)))
    + "\r\n				</span>\r\n			</div>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "				<div class=\"global-views-star-rating-area-writable"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"className") || (depth0 != null ? compilerNameLookup(depth0,"className") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"className","hash":{},"data":data,"loc":{"start":{"line":22,"column":54},"end":{"line":22,"column":67}}}) : helper)))
    + "\">\r\n"
    + ((stack1 = compilerNameLookup(helpers,"each").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"buttons") : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":23,"column":5},"end":{"line":25,"column":14}}})) != null ? stack1 : "")
    + "				</div>\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "						<button type=\"button\" data-action=\"rate\" name=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"name") || (depth0 != null ? compilerNameLookup(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":24,"column":53},"end":{"line":24,"column":61}}}) : helper)))
    + "\" value=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"indexPlusOne") || (data && compilerNameLookup(data,"indexPlusOne"))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"indexPlusOne","hash":{},"data":data,"loc":{"start":{"line":24,"column":70},"end":{"line":24,"column":87}}}) : helper)))
    + "\"></button>\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    var helper;

  return "						<i class=\"global-views-star-rating-empty"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"className") || (depth0 != null ? compilerNameLookup(depth0,"className") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"className","hash":{},"data":data,"loc":{"start":{"line":32,"column":46},"end":{"line":32,"column":59}}}) : helper)))
    + "\"></i>\r\n";
},"10":function(container,depth0,helpers,partials,data) {
    var helper;

  return "						<i class=\"global-views-star-rating-filled"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"className") || (depth0 != null ? compilerNameLookup(depth0,"className") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"className","hash":{},"data":data,"loc":{"start":{"line":40,"column":47},"end":{"line":40,"column":60}}}) : helper)))
    + "\"></i>\r\n";
},"12":function(container,depth0,helpers,partials,data) {
    var helper;

  return "			<span class=\"global-views-star-rating-value\">\r\n				"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"value") || (depth0 != null ? compilerNameLookup(depth0,"value") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"value","hash":{},"data":data,"loc":{"start":{"line":48,"column":4},"end":{"line":48,"column":13}}}) : helper)))
    + "\r\n			</span>\r\n";
},"14":function(container,depth0,helpers,partials,data) {
    return "\r\n";
},"16":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "			<span class=\"global-views-star-rating-review-total\">\r\n\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"ratingCountGreaterThan0") : depth0),{"name":"if","hash":{},"fn":container.program(17, data, 0),"inverse":container.program(22, data, 0),"data":data,"loc":{"start":{"line":57,"column":4},"end":{"line":67,"column":11}}})) != null ? stack1 : "")
    + "			</span>\r\n";
},"17":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "					<span class=\"global-views-star-rating-review-total-number\">"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"ratingCount") || (depth0 != null ? compilerNameLookup(depth0,"ratingCount") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"ratingCount","hash":{},"data":data,"loc":{"start":{"line":58,"column":64},"end":{"line":58,"column":79}}}) : helper)))
    + "</span>\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"hasOneReview") : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.program(20, data, 0),"data":data,"loc":{"start":{"line":59,"column":5},"end":{"line":63,"column":12}}})) != null ? stack1 : "");
},"18":function(container,depth0,helpers,partials,data) {
    return "						<span class=\"global-views-star-rating-review-total-review\">"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {})," Review",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":60,"column":65},"end":{"line":60,"column":89}}}))
    + "</span>\r\n";
},"20":function(container,depth0,helpers,partials,data) {
    return "						<span class=\"global-views-star-rating-review-total-review\">"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {})," Reviews",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":62,"column":65},"end":{"line":62,"column":90}}}))
    + "</span>\r\n";
},"22":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "					<span class=\"global-views-star-rating-review-total-empty-number\">("
    + alias3(((helper = (helper = compilerNameLookup(helpers,"ratingCount") || (depth0 != null ? compilerNameLookup(depth0,"ratingCount") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"ratingCount","hash":{},"data":data,"loc":{"start":{"line":65,"column":71},"end":{"line":65,"column":86}}}) : helper)))
    + ")</span>\r\n					<span class=\"global-views-star-rating-review-total-no-review\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1," No Reviews yet",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":66,"column":67},"end":{"line":66,"column":99}}}))
    + "</span>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"global-views-star-rating\" data-validation=\"control-group\">\r\n	<div class=\"global-views-star-rating-container\">\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showLabelRating") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":2},"end":{"line":9,"column":9}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showLabel") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":2},"end":{"line":17,"column":9}}})) != null ? stack1 : "")
    + "\r\n		<div id=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"name") || (depth0 != null ? compilerNameLookup(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":19,"column":11},"end":{"line":19,"column":19}}}) : helper)))
    + "\" class=\"global-views-star-rating-area\" data-toggle='rater' data-validation=\"control\" data-name=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"name") || (depth0 != null ? compilerNameLookup(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":19,"column":116},"end":{"line":19,"column":124}}}) : helper)))
    + "\" data-max=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"maxValue") || (depth0 != null ? compilerNameLookup(depth0,"maxValue") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"maxValue","hash":{},"data":data,"loc":{"start":{"line":19,"column":136},"end":{"line":19,"column":148}}}) : helper)))
    + "\" data-value=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"value") || (depth0 != null ? compilerNameLookup(depth0,"value") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"value","hash":{},"data":data,"loc":{"start":{"line":19,"column":162},"end":{"line":19,"column":171}}}) : helper)))
    + "\">\r\n\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isWritable") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":21,"column":3},"end":{"line":27,"column":10}}})) != null ? stack1 : "")
    + "\r\n			<div class=\"global-views-star-rating-area-empty\">\r\n				<div class=\"global-views-star-rating-area-empty-content\">\r\n"
    + ((stack1 = compilerNameLookup(helpers,"each").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"buttons") : depth0),{"name":"each","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":31,"column":5},"end":{"line":33,"column":14}}})) != null ? stack1 : "")
    + "				</div>\r\n			</div>\r\n\r\n			<div class=\"global-views-star-rating-area-fill\" data-toggle='ratting-component-fill' style=\"width: "
    + alias4(((helper = (helper = compilerNameLookup(helpers,"filledBy") || (depth0 != null ? compilerNameLookup(depth0,"filledBy") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"filledBy","hash":{},"data":data,"loc":{"start":{"line":37,"column":102},"end":{"line":37,"column":114}}}) : helper)))
    + "%\">\r\n				<div class=\"global-views-star-rating-area-filled\">\r\n"
    + ((stack1 = compilerNameLookup(helpers,"each").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"buttons") : depth0),{"name":"each","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":39,"column":5},"end":{"line":41,"column":14}}})) != null ? stack1 : "")
    + "				</div>\r\n			</div>\r\n		</div>\r\n\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showValue") : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.program(14, data, 0),"data":data,"loc":{"start":{"line":46,"column":2},"end":{"line":52,"column":9}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showRatingCount") : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":54,"column":2},"end":{"line":69,"column":9}}})) != null ? stack1 : "")
    + "	</div>\r\n</div>\r\n\r\n\r\n\r\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'global_views_star_rating'; return template;});