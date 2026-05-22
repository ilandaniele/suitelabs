define('header_mini_cart.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    return "header-mini-cart-menu-cart-link-enabled";
},"3":function(container,depth0,helpers,partials,data) {
    return "		<span class=\"header-mini-cart-summary-cart-ellipsis\"></span>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "				"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"$(0)",(depth0 != null ? compilerNameLookup(depth0,"itemsInCart") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":9,"column":4},"end":{"line":9,"column":36}}}))
    + "\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "	 	<div data-view=\"Header.MiniCartItemCell\" class=\"header-mini-cart-container\"></div>\r\n		<div class=\"header-mini-cart-subtotal\">\r\n			<div class=\"header-mini-cart-subtotal-items\">\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showPluraLabel") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.program(10, data, 0),"data":data,"loc":{"start":{"line":18,"column":4},"end":{"line":22,"column":11}}})) != null ? stack1 : "")
    + "			</div>\r\n\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isPriceEnabled") : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":25,"column":3},"end":{"line":29,"column":10}}})) != null ? stack1 : "")
    + "			<div data-view=\"MiniCart.Subtotal\"></div>\r\n		</div>\r\n\r\n		<div class=\"header-mini-cart-buttons\" data-view=\"MiniCart.Actions\">\r\n			<div class=\"header-mini-cart-buttons-left\">\r\n				<a href=\"#\" class=\"header-mini-cart-button-view-cart\" data-touchpoint=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"cartTouchPoint") || (depth0 != null ? compilerNameLookup(depth0,"cartTouchPoint") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"cartTouchPoint","hash":{},"data":data,"loc":{"start":{"line":35,"column":75},"end":{"line":35,"column":93}}}) : helper)))
    + "\" data-hashtag=\"#cart\" >\r\n					"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"View Cart",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":36,"column":5},"end":{"line":36,"column":30}}}))
    + "\r\n				</a>\r\n			</div>\r\n			<div class=\"header-mini-cart-buttons-right\">\r\n				<a href=\"#\" class=\"header-mini-cart-button-checkout\" data-touchpoint=\"checkout\" data-hashtag=\"#\" >\r\n					"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Checkout",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":41,"column":5},"end":{"line":41,"column":29}}}))
    + "\r\n				</a>\r\n			</div>\r\n		</div>\r\n\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "					"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"$(0) items",(depth0 != null ? compilerNameLookup(depth0,"itemsInCart") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":19,"column":5},"end":{"line":19,"column":43}}}))
    + "\r\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "					"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"1 item",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":21,"column":5},"end":{"line":21,"column":27}}}))
    + "\r\n";
},"12":function(container,depth0,helpers,partials,data) {
    return "			<div class=\"header-mini-cart-subtotal-amount\">\r\n				"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"SUBTOTAL: $(0)",(depth0 != null ? compilerNameLookup(depth0,"subtotalFormatted") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":27,"column":4},"end":{"line":27,"column":52}}}))
    + "\r\n			</div>\r\n";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "		<div class=\"header-mini-cart-empty\">\r\n			<a href=\"#\" data-touchpoint=\""
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"cartTouchPoint") || (depth0 != null ? compilerNameLookup(depth0,"cartTouchPoint") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"cartTouchPoint","hash":{},"data":data,"loc":{"start":{"line":48,"column":32},"end":{"line":48,"column":50}}}) : helper)))
    + "\" data-hashtag=\"#cart\">\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isLoading") : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.program(17, data, 0),"data":data,"loc":{"start":{"line":49,"column":4},"end":{"line":53,"column":11}}})) != null ? stack1 : "")
    + "			</a>\r\n		</div>\r\n";
},"15":function(container,depth0,helpers,partials,data) {
    return "					"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Your cart is loading",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":50,"column":5},"end":{"line":50,"column":41}}}))
    + "\r\n";
},"17":function(container,depth0,helpers,partials,data) {
    return "					"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Your cart is empty",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":52,"column":5},"end":{"line":52,"column":39}}}))
    + "\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "<a class=\"header-mini-cart-menu-cart-link "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showLines") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":42},"end":{"line":1,"column":105}}})) != null ? stack1 : "")
    + "\" data-type=\"mini-cart\" title=\""
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Cart",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":1,"column":136},"end":{"line":1,"column":156}}}))
    + "\" data-touchpoint=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"cartTouchPoint") || (depth0 != null ? compilerNameLookup(depth0,"cartTouchPoint") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"cartTouchPoint","hash":{},"data":data,"loc":{"start":{"line":1,"column":175},"end":{"line":1,"column":193}}}) : helper)))
    + "\" data-hashtag=\"#cart\" href=\"#\">\r\n	<i class=\"header-mini-cart-menu-cart-icon\">\r\n		<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1100 1100\" class=\"svg-shopping-bag\"><path class=\"svg-path-shopping-bag\" d=\"M787.1 1038.2h-549.1c-48.4 0-90.7-17.3-125-52s-52-76.6-52-125v-543.3h183.2v-36.5c0-48.4 11.9-93.9 35.8-135.1s56.7-74.1 97.5-97.5c82.4-47.3 188.2-47.3 270.6 0 41.2 23.8 74.1 56.4 97.5 97.5s35.8 86.7 35.8 135.1v36.5h182.8v543c0 48.4-17.3 90.7-52 125s-76.6 52.4-125 52.4zM110.1 366.9v494.2c0 35.4 12.3 65 37.6 90.3s54.9 37.6 90.3 37.6h549.1c35.4 0 65-12.3 90.3-37.6s37.6-54.9 37.6-90.3v-494.2h-183.2v-85.6c0-40.1-9.8-77.3-29.3-110.5-19.1-33.6-46.2-60.3-79.5-79.5-66.8-39-153.9-39-221.5-0.4-33.6 19.1-60.3 45.9-79.5 79.5s-29.3 70.8-29.3 110.5v85.6h-182.8zM695.7 534.5c-19.1 0-36.5-7.2-49.9-20.6s-20.6-30.7-20.6-49.9c0-19.1 7.2-36.1 20.6-49.9 27.1-27.1 72.6-27.1 99.7 0 13.4 13.4 20.6 30.7 20.6 49.9s-7.2 36.5-20.6 49.9c-13.7 13.7-30.7 20.6-49.9 20.6zM695.7 443.1c-6.1 0-10.8 1.8-15.2 6.1s-6.1 9-6.1 15.2 1.8 10.8 6.1 15.2c8.3 8.3 21.7 8.7 30 0 4.3-4.3 6.1-9 6.1-15.2s-1.8-10.8-6.1-15.2c-4-4.3-8.7-6.1-14.8-6.1zM329.3 534.5c-19.1 0-36.5-7.2-49.9-20.6s-20.6-30.7-20.6-49.9c0-19.1 7.2-36.1 20.6-49.9 27.1-27.1 72.6-27.1 99.7 0 13.4 13.4 20.6 30.7 20.6 49.9s-7.2 36.5-20.6 49.9c-13.4 13.7-30.7 20.6-49.9 20.6zM329.3 443.1c-6.1 0-10.8 1.8-15.2 6.1s-6.1 9-6.1 15.2 1.8 10.8 6.1 15.2c8.7 8.3 21.3 8.7 30 0 4.3-4.3 6.1-9 6.1-15.2s-1.8-10.8-6.1-15.2c-4-4.3-8.3-6.1-14.8-6.1zM659.2 366.9h-293v-85.6c0-39.4 14.5-74.1 43.4-103s63.6-43.4 103.3-43.4c39.7 0 74.4 14.5 103 43.4 28.9 28.9 43.4 63.6 43.4 103v85.6zM415 317.8h195.1v-36.5c0-26.4-9.4-48.8-28.9-68.3-39-39-97.9-39-136.9 0-19.5 19.5-28.9 41.9-28.9 68.3v36.5z\"/></svg>\r\n	</i>\r\n	<span class=\"header-mini-cart-menu-cart-legend\">\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isLoading") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data,"loc":{"start":{"line":6,"column":2},"end":{"line":10,"column":9}}})) != null ? stack1 : "")
    + "	</span>\r\n</a>\r\n<div class=\"header-mini-cart\">\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showLines") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(14, data, 0),"data":data,"loc":{"start":{"line":14,"column":2},"end":{"line":56,"column":8}}})) != null ? stack1 : "")
    + "</div>\r\n\r\n\r\n\r\n\r\n\r\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'header_mini_cart'; return template;});