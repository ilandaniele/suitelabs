define('product_line_sku.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    return "			<div data-view=\"GlobalMessageNoLongerAvailable\"></div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, alias4=container.lambda;

  return "\n		<div class=\"cart-item-summary-item-list-actionable-amount\">\n			<span class=\"cart-item-summary-item-list-actionable-amount-label\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Available:",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":22,"column":69},"end":{"line":22,"column":95}}}))
    + " </span>\n				<span class=\"cart-item-summary-amount-value\">"
    + alias3(alias4(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"line") : depth0)) != null ? compilerNameLookup(stack1,"quantityAvailable") : stack1), depth0))
    + "</span>\n		</div>\n\n		<div class=\"cart-item-summary-item-list-actionable-amount\">\n			<span class=\"cart-item-summary-item-list-actionable-amount-label\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Expected Ship Date:",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":27,"column":69},"end":{"line":27,"column":104}}}))
    + " </span>\n				<span class=\"cart-item-summary-amount-value\">"
    + alias3(alias4(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"line") : depth0)) != null ? compilerNameLookup(stack1,"expectedShippingDate") : stack1), depth0))
    + "</span>\n		</div>\n\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression;

  return "\n		<div class=\"cart-item-summary-item-list-actionable-amount\">\n			<span class=\"cart-item-summary-item-list-actionable-amount-label\">"
    + alias2((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(alias1,"Available:",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":34,"column":69},"end":{"line":34,"column":95}}}))
    + " </span>\n			<span class=\"cart-item-summary-amount-value\">"
    + alias2(container.lambda(((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"item") : stack1)) != null ? compilerNameLookup(stack1,"quantityavailable") : stack1), depth0))
    + "</span>\n		</div>\n\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"item") : stack1)) != null ? compilerNameLookup(stack1,"quantityavailable") : stack1),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.program(8, data, 0),"data":data,"loc":{"start":{"line":38,"column":2},"end":{"line":44,"column":9}}})) != null ? stack1 : "")
    + "\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.escapeExpression;

  return "			<div class=\"cart-item-summary-item-list-actionable-amount\">\n				<span class=\"cart-item-summary-item-list-actionable-amount-label\">"
    + alias1((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Expected Ship Date:",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":41,"column":70},"end":{"line":41,"column":105}}}))
    + " </span>\n				<span class=\"cart-item-summary-amount-value\">"
    + alias1(container.lambda(((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"item") : stack1)) != null ? compilerNameLookup(stack1,"custitem_back_in_stock_date") : stack1), depth0))
    + "</span>\n			</div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "<style>\n.product-details-full-main-content .cart-item-summary-item-list-actionable-amount,\n.product-details-quickview-details .cart-item-summary-item-list-actionable-amount { display: none; }\n</style>\n\n<div class=\"product-line-sku-container\">\n	<span class=\"product-line-sku-label\">\n		"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Item:",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":8,"column":2},"end":{"line":8,"column":23}}}))
    + "\n	</span>\n	<span class=\"product-line-sku-value\" itemprop=\"sku\">\n		"
    + alias3(((helper = (helper = compilerNameLookup(helpers,"sku") || (depth0 != null ? compilerNameLookup(depth0,"sku") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"sku","hash":{},"data":data,"loc":{"start":{"line":11,"column":2},"end":{"line":11,"column":9}}}) : helper)))
    + "\n	</span>\n	<div data-type=\"alert-placeholder\">\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"noLongerAvailable") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":14,"column":2},"end":{"line":16,"column":9}}})) != null ? stack1 : "")
    + "	</div>\n	\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,((stack1 = (depth0 != null ? compilerNameLookup(depth0,"line") : depth0)) != null ? compilerNameLookup(stack1,"notPDP") : stack1),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data,"loc":{"start":{"line":19,"column":1},"end":{"line":46,"column":8}}})) != null ? stack1 : "")
    + "</div>\n\n\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'product_line_sku'; return template;});