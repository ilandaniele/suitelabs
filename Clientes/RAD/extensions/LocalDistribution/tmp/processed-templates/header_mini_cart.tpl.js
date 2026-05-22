define('header_mini_cart.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    return "header-mini-cart-menu-cart-link-enabled";
},"3":function(container,depth0,helpers,partials,data) {
    return "		<span class=\"header-mini-cart-summary-cart-ellipsis\"></span>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "				"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"$(0)",(depth0 != null ? compilerNameLookup(depth0,"itemsInCart") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":8,"column":4},"end":{"line":8,"column":36}}}))
    + "\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "	 	<div data-view=\"Header.MiniCartItemCell\" class=\"header-mini-cart-container\"></div>\n		<div class=\"header-mini-cart-subtotal\">\n            <div class=\"header-mini-cart-subtotal-items\">\n                "
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"SUBTOTAL:",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":17,"column":16},"end":{"line":17,"column":41}}}))
    + "\n            </div>\n			<div class=\"header-mini-cart-subtotal-items\">\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showPluraLabel") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.program(10, data, 0),"data":data,"loc":{"start":{"line":20,"column":4},"end":{"line":24,"column":11}}})) != null ? stack1 : "")
    + "			</div>\n\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isPriceEnabled") : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":27,"column":12},"end":{"line":35,"column":19}}})) != null ? stack1 : "")
    + "            <div data-view=\"MiniCart.Subtotal\"></div>\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,((stack1 = (depth0 != null ? compilerNameLookup(depth0,"jewelry") : depth0)) != null ? compilerNameLookup(stack1,"active") : stack1),{"name":"if","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":37,"column":12},"end":{"line":54,"column":19}}})) != null ? stack1 : "")
    + "		</div>\n\n		<div class=\"header-mini-cart-buttons\">\n			<div class=\"header-mini-cart-buttons-left\">\n				<a href=\"#\" class=\"header-mini-cart-button-view-cart\" data-touchpoint=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"cartTouchPoint") || (depth0 != null ? compilerNameLookup(depth0,"cartTouchPoint") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"cartTouchPoint","hash":{},"data":data,"loc":{"start":{"line":59,"column":75},"end":{"line":59,"column":93}}}) : helper)))
    + "\" data-hashtag=\"#cart\" >\n					"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"View Cart",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":60,"column":5},"end":{"line":60,"column":30}}}))
    + "\n				</a>\n			</div>\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showProcedToCheckoutButton") : depth0),{"name":"if","hash":{},"fn":container.program(27, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":63,"column":9},"end":{"line":69,"column":16}}})) != null ? stack1 : "")
    + "            <div data-view=\"MiniCart.Actions\"></div>\n		</div>\n\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "					"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"$(0) RAD items",(depth0 != null ? compilerNameLookup(depth0,"radItems") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":21,"column":5},"end":{"line":21,"column":44}}}))
    + "\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "					"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"1 RAD item",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":23,"column":5},"end":{"line":23,"column":31}}}))
    + "\n";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                <div class=\"header-mini-cart-subtotal-amount\">\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"useRetailPrices") : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.program(15, data, 0),"data":data,"loc":{"start":{"line":29,"column":20},"end":{"line":33,"column":27}}})) != null ? stack1 : "")
    + "                </div>\n";
},"13":function(container,depth0,helpers,partials,data) {
    return "                        "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"$(0)",(depth0 != null ? compilerNameLookup(depth0,"retailSubTotalFormatted") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":30,"column":24},"end":{"line":30,"column":68}}}))
    + "\n";
},"15":function(container,depth0,helpers,partials,data) {
    return "                        "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"$(0)",(depth0 != null ? compilerNameLookup(depth0,"subtotalFormatted") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":32,"column":24},"end":{"line":32,"column":62}}}))
    + "\n";
},"17":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "                <div class=\"header-mini-cart-subtotal-items\">\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,((stack1 = (depth0 != null ? compilerNameLookup(depth0,"jewelry") : depth0)) != null ? compilerNameLookup(stack1,"singleItem") : stack1),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.program(20, data, 0),"data":data,"loc":{"start":{"line":39,"column":20},"end":{"line":43,"column":27}}})) != null ? stack1 : "")
    + "                </div>\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isPriceEnabled") : depth0),{"name":"if","hash":{},"fn":container.program(22, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":45,"column":16},"end":{"line":53,"column":23}}})) != null ? stack1 : "");
},"18":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                        "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"$(0) Jewelry item",((stack1 = (depth0 != null ? compilerNameLookup(depth0,"jewelry") : depth0)) != null ? compilerNameLookup(stack1,"jewelry_count") : stack1),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":40,"column":24},"end":{"line":40,"column":79}}}))
    + "\n";
},"20":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                        "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"$(0) Jewelry items",((stack1 = (depth0 != null ? compilerNameLookup(depth0,"jewelry") : depth0)) != null ? compilerNameLookup(stack1,"jewelry_count") : stack1),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":42,"column":24},"end":{"line":42,"column":80}}}))
    + "\n";
},"22":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                    <div class=\"header-mini-cart-subtotal-amount\">\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"useRetailPrices") : depth0),{"name":"if","hash":{},"fn":container.program(23, data, 0),"inverse":container.program(25, data, 0),"data":data,"loc":{"start":{"line":47,"column":24},"end":{"line":51,"column":31}}})) != null ? stack1 : "")
    + "                    </div>\n";
},"23":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                            "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"$(0)",((stack1 = (depth0 != null ? compilerNameLookup(depth0,"jewelry") : depth0)) != null ? compilerNameLookup(stack1,"jewelry_subtotal_formatted_retail") : stack1),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":48,"column":28},"end":{"line":48,"column":90}}}))
    + "\n";
},"25":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                            "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"$(0)",((stack1 = (depth0 != null ? compilerNameLookup(depth0,"jewelry") : depth0)) != null ? compilerNameLookup(stack1,"jewelry_subtotal_formatted") : stack1),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":50,"column":28},"end":{"line":50,"column":83}}}))
    + "\n";
},"27":function(container,depth0,helpers,partials,data) {
    return "			<div class=\"header-mini-cart-buttons-right\">\n				<a href=\"#\" class=\"header-mini-cart-button-checkout\" data-touchpoint=\"checkout\" data-hashtag=\"#\" >\n					"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Checkout",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":66,"column":5},"end":{"line":66,"column":29}}}))
    + "\n				</a>\n			</div>\n";
},"29":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "		<div class=\"header-mini-cart-empty\">\n			<a href=\"#\" data-touchpoint=\""
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"cartTouchPoint") || (depth0 != null ? compilerNameLookup(depth0,"cartTouchPoint") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"cartTouchPoint","hash":{},"data":data,"loc":{"start":{"line":75,"column":32},"end":{"line":75,"column":50}}}) : helper)))
    + "\" data-hashtag=\"#cart\">\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isLoading") : depth0),{"name":"if","hash":{},"fn":container.program(30, data, 0),"inverse":container.program(32, data, 0),"data":data,"loc":{"start":{"line":76,"column":4},"end":{"line":80,"column":11}}})) != null ? stack1 : "")
    + "			</a>\n		</div>\n";
},"30":function(container,depth0,helpers,partials,data) {
    return "					"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Your cart is loading",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":77,"column":5},"end":{"line":77,"column":41}}}))
    + "\n";
},"32":function(container,depth0,helpers,partials,data) {
    return "					"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Your cart is empty",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":79,"column":5},"end":{"line":79,"column":39}}}))
    + "\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "<a class=\"header-mini-cart-menu-cart-link "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showLines") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":42},"end":{"line":1,"column":105}}})) != null ? stack1 : "")
    + "\" data-type=\"mini-cart\" title=\""
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Cart",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":1,"column":136},"end":{"line":1,"column":156}}}))
    + "\" data-touchpoint=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"cartTouchPoint") || (depth0 != null ? compilerNameLookup(depth0,"cartTouchPoint") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"cartTouchPoint","hash":{},"data":data,"loc":{"start":{"line":1,"column":175},"end":{"line":1,"column":193}}}) : helper)))
    + "\" data-hashtag=\"#cart\" href=\"#\">\n	<!--<i class=\"header-mini-cart-menu-cart-icon\"></i>-->\n	<i class=\"header-mini-cart-menu-cart-icon-light\"></i>\n	<span class=\"header-mini-cart-menu-cart-legend\">\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isLoading") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data,"loc":{"start":{"line":5,"column":2},"end":{"line":9,"column":9}}})) != null ? stack1 : "")
    + "	</span>\n</a>\n<div class=\"header-mini-cart\">\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showLines") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(29, data, 0),"data":data,"loc":{"start":{"line":13,"column":2},"end":{"line":83,"column":8}}})) != null ? stack1 : "")
    + "</div>\n\n\n\n\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'header_mini_cart'; return template;});