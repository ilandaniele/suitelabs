define('global_views_breadcrumb.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(data && compilerNameLookup(data,"last")),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data,"loc":{"start":{"line":4,"column":2},"end":{"line":16,"column":9}}})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var helper;

  return "			<li class=\"global-views-breadcrumb-item-active\">\r\n				"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"text") || (depth0 != null ? compilerNameLookup(depth0,"text") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"text","hash":{},"data":data,"loc":{"start":{"line":6,"column":4},"end":{"line":6,"column":12}}}) : helper)))
    + "\r\n			</li>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "			<li class=\"global-views-breadcrumb-item\">\r\n				<a href=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"href") || (depth0 != null ? compilerNameLookup(depth0,"href") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"href","hash":{},"data":data,"loc":{"start":{"line":10,"column":13},"end":{"line":10,"column":21}}}) : helper)))
    + "\" \r\n					"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"hasDataTouchpoint") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":5},"end":{"line":11,"column":76}}})) != null ? stack1 : "")
    + "\r\n					"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"hasDataHashtag") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":12,"column":5},"end":{"line":12,"column":67}}})) != null ? stack1 : "")
    + "\r\n				> "
    + alias4(((helper = (helper = compilerNameLookup(helpers,"text") || (depth0 != null ? compilerNameLookup(depth0,"text") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data,"loc":{"start":{"line":13,"column":6},"end":{"line":13,"column":14}}}) : helper)))
    + " </a>\r\n			</li>\r\n			<li class=\"global-views-breadcrumb-divider\"><span class=\"global-views-breadcrumb-divider-icon\"></span></li>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return " data-touchpoint=\""
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"data-touchpoint") || (depth0 != null ? compilerNameLookup(depth0,"data-touchpoint") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"data-touchpoint","hash":{},"data":data,"loc":{"start":{"line":11,"column":48},"end":{"line":11,"column":67}}}) : helper)))
    + "\" ";
},"7":function(container,depth0,helpers,partials,data) {
    var helper;

  return " data-hashtag=\""
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"data-hashtag") || (depth0 != null ? compilerNameLookup(depth0,"data-hashtag") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"data-hashtag","hash":{},"data":data,"loc":{"start":{"line":12,"column":42},"end":{"line":12,"column":58}}}) : helper)))
    + "\" ";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"banner-breadcrumb-top\" class=\"content-banner banner-breadcrumb-top\" data-cms-area=\"breadcrumb_top\" data-cms-area-filters=\"global\"></div>\r\n<ul class=\"global-views-breadcrumb\" itemprop=\"breadcrumb\">\r\n"
    + ((stack1 = compilerNameLookup(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"pages") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":1},"end":{"line":17,"column":10}}})) != null ? stack1 : "")
    + "</ul>\r\n<div id=\"banner-breadcrumb-bottom\" class=\"content-banner banner-breadcrumb-bottom\" data-cms-area=\"breadcrumb_bottom\" data-cms-area-filters=\"global\"></div>\r\n\r\n\r\n\r\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'global_views_breadcrumb'; return template;});