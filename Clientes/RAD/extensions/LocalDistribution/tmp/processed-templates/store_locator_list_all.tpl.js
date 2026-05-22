define('store_locator_list_all.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    return "		<ul data-view=\"StoreLocatorListAllStoreView\" class=\"store-locator-list-all-container clearfix\"></ul>\n        <div>\n            <a href=\"/storelist\" data-hashtag=\"#stores\" data-touchpoint=\"home\" class=\"button-secondary button-medium\">"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Back to store locator",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":7,"column":118},"end":{"line":7,"column":155}}}))
    + "</a>\n        </div>\n        <br>\n		<div data-view=\"GlobalViews.Pagination\"></div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "		<div class=\"store-locator-list-all-container\">\n			<p>"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"The list of stores is not available.",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":13,"column":6},"end":{"line":13,"column":58}}}))
    + "</p>\n		</div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"store-locator-list-all-main\">\n	<h3>"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(alias1,"Store List",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":2,"column":5},"end":{"line":2,"column":31}}}))
    + "</h3>\n\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showList") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":4,"column":1},"end":{"line":15,"column":8}}})) != null ? stack1 : "")
    + "</div>\n\n\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'store_locator_list_all'; return template;});