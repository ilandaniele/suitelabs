define('pdp_custom_field_stock_messaging.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "    <p class=\"inventory-display-stock-information-in-stock inventory-display-message-text\">\n        <span class=\"inventory-display-stock-information-in-stock icon\"><i>&nbsp;</i></span>\n        <span class=\"inventory-display-message-in-stock \">"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"stockMessage") || (depth0 != null ? compilerNameLookup(depth0,"stockMessage") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"stockMessage","hash":{},"data":data,"loc":{"start":{"line":4,"column":58},"end":{"line":4,"column":74}}}) : helper)))
    + "</span>\n    </p>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"stockMessage") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":6,"column":7}}})) != null ? stack1 : "");
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/AwaLabs/PDPCustomFields/2.2.0/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'pdp_custom_field_stock_messaging'; return template;});