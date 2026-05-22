define('stock_status_extension.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "<div class=\"facets-item-stock-availability\">\r\n    <label>"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Availability:",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":3,"column":11},"end":{"line":3,"column":41}}}))
    + " </label> <span>"
    + alias3(((helper = (helper = compilerNameLookup(helpers,"stockStatus") || (depth0 != null ? compilerNameLookup(depth0,"stockStatus") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"stockStatus","hash":{},"data":data,"loc":{"start":{"line":3,"column":57},"end":{"line":3,"column":72}}}) : helper)))
    + "</span>\r\n</div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "<div class=\"facets-item-stock-availability\">\r\n    <label>"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"In Stock Date:",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":9,"column":11},"end":{"line":9,"column":42}}}))
    + " </label> <span>"
    + alias3(((helper = (helper = compilerNameLookup(helpers,"inStockDate") || (depth0 != null ? compilerNameLookup(depth0,"inStockDate") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"inStockDate","hash":{},"data":data,"loc":{"start":{"line":9,"column":58},"end":{"line":9,"column":73}}}) : helper)))
    + "</span>\r\n</div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"stockStatus") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":5,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"inStockDate") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":0},"end":{"line":11,"column":7}}})) != null ? stack1 : "");
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/SSD/StockStatusExtension/1.0.3/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'stock_status_extension'; return template;});