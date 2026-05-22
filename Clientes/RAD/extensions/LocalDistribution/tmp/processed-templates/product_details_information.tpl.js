define('product_details_information.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "			<div class=\"product-details-information-content-container\">\n				<div id=\"banner-content-top\" class=\"content-banner banner-content-top\"></div>\n                    <div class=\"item-details-tab-content\">\n"
    + ((stack1 = compilerNameLookup(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"details") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":24},"end":{"line":25,"column":33}}})) != null ? stack1 : "")
    + "                </div>\n			</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                            <div class=\"item-details-tab-content-panel\">\n                                <button class=\"collapsed\" type=\"button\" data-toggle=\"collapse\" data-target=\"#product-details-information-tab-"
    + alias4(((helper = (helper = compilerNameLookup(helpers,"index") || (data && compilerNameLookup(data,"index"))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data,"loc":{"start":{"line":8,"column":141},"end":{"line":8,"column":151}}}) : helper)))
    + "\" aria-expanded=\"false\" aria-controls=\"#product-details-information-tab-"
    + alias4(((helper = (helper = compilerNameLookup(helpers,"index") || (data && compilerNameLookup(data,"index"))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data,"loc":{"start":{"line":8,"column":223},"end":{"line":8,"column":233}}}) : helper)))
    + "\">\n                                    <span class=\"item-details-tab-content-panel-title\">"
    + alias4(((helper = (helper = compilerNameLookup(helpers,"name") || (depth0 != null ? compilerNameLookup(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":9,"column":87},"end":{"line":9,"column":95}}}) : helper)))
    + "<i class=\"toggle-icon\"></i></span>\n                                </button>\n                                <div class=\"collapsed collapse\" id=\"product-details-information-tab-"
    + alias4(((helper = (helper = compilerNameLookup(helpers,"index") || (data && compilerNameLookup(data,"index"))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data,"loc":{"start":{"line":11,"column":100},"end":{"line":11,"column":110}}}) : helper)))
    + "\">\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(data && compilerNameLookup(data,"first")),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data,"loc":{"start":{"line":12,"column":36},"end":{"line":22,"column":43}}})) != null ? stack1 : "")
    + "                                </div>\n                            </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "                                        <div class=\"item-details-content\">\n                                            <div data-view=\"PDPCustomFields\"></div>\n                                            <br>\n                                            "
    + ((stack1 = ((helper = (helper = compilerNameLookup(helpers,"content") || (depth0 != null ? compilerNameLookup(depth0,"content") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"content","hash":{},"data":data,"loc":{"start":{"line":16,"column":44},"end":{"line":16,"column":57}}}) : helper))) != null ? stack1 : "")
    + "\n                                        </div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "                                        <div class=\"card card-body\">\n                                            "
    + ((stack1 = ((helper = (helper = compilerNameLookup(helpers,"content") || (depth0 != null ? compilerNameLookup(depth0,"content") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"content","hash":{},"data":data,"loc":{"start":{"line":20,"column":44},"end":{"line":20,"column":57}}}) : helper))) != null ? stack1 : "")
    + "\n                                        </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"product-details-information-content\">\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"showInformation") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":1},"end":{"line":28,"column":8}}})) != null ? stack1 : "")
    + "</div>\n\n\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'product_details_information'; return template;});