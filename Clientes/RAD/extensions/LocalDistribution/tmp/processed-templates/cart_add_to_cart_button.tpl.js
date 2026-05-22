define('cart_add_to_cart_button.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "	<div class=\"cart-add-to-cart-button-container\">\n		<div class=\"cart-add-to-cart-button\">\n			<button type=\"submit\" data-type=\"add-to-cart\" data-action=\"sticky\" class=\"cart-add-to-cart-button-button\" "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isTradeAndNotIsBackOrderable") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":109},"end":{"line":6,"column":19}}})) != null ? stack1 : "")
    + ">\n				"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isUpdate") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data,"loc":{"start":{"line":7,"column":4},"end":{"line":7,"column":84}}})) != null ? stack1 : "")
    + "\n			</button/>\n		</div>\n	</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "\n                disabled=\"disabled\"\n            ";
},"4":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Update",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":7,"column":20},"end":{"line":7,"column":42}}}));
},"6":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Add to Cart",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":7,"column":50},"end":{"line":7,"column":77}}}));
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"isCurrentItemPurchasable") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":11,"column":7}}})) != null ? stack1 : "")
    + "\n\n\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'cart_add_to_cart_button'; return template;});