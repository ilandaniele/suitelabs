define('was_price_view.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <div class=\"was-price-container\">\n        <span class=\"was-price-price\" data-rate=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"wasPrice") || (depth0 != null ? compilerNameLookup(depth0,"wasPrice") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"wasPrice","hash":{},"data":data,"loc":{"start":{"line":3,"column":49},"end":{"line":3,"column":61}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = compilerNameLookup(helpers,"wasPriceFormatted") || (depth0 != null ? compilerNameLookup(depth0,"wasPriceFormatted") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"wasPriceFormatted","hash":{},"data":data,"loc":{"start":{"line":3,"column":63},"end":{"line":3,"column":84}}}) : helper)))
    + "</span>\n        <p class=\"now\">"
    + alias4((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"NOW",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":4,"column":23},"end":{"line":4,"column":42}}}))
    + "</p>\n    </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"showWasPrice") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":6,"column":8}}})) != null ? stack1 : "");
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/SuiteLabs/WasPrice/1.0.0/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'was_price_view'; return template;});