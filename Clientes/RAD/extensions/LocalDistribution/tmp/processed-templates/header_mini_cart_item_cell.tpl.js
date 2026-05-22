define('header_mini_cart_item_cell.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    return "		    		<span class=\"header-mini-cart-item-cell-free-badge\">"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"FREE",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":6,"column":60},"end":{"line":6,"column":80}}}))
    + "</span>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "                        <a "
    + ((stack1 = ((helper = (helper = compilerNameLookup(helpers,"linkAttributes") || (depth0 != null ? compilerNameLookup(depth0,"linkAttributes") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"linkAttributes","hash":{},"data":data,"loc":{"start":{"line":15,"column":27},"end":{"line":15,"column":47}}}) : helper))) != null ? stack1 : "")
    + " class=\"header-mini-cart-item-cell-title-navigable\">"
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"line") : depth0)) != null ? compilerNameLookup(stack1,"item") : stack1)) != null ? compilerNameLookup(stack1,"_name") : stack1), depth0))
    + "</a>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                        <span class=\"header-mini-cart-item-cell-title-viewonly\">"
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"line") : depth0)) != null ? compilerNameLookup(stack1,"item") : stack1)) != null ? compilerNameLookup(stack1,"_name") : stack1), depth0))
    + "</span>\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"isFreeGift") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.program(13, data, 0),"data":data,"loc":{"start":{"line":22,"column":7},"end":{"line":37,"column":14}}})) != null ? stack1 : "");
},"8":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"useRetailPrices") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(11, data, 0),"data":data,"loc":{"start":{"line":23,"column":20},"end":{"line":27,"column":27}}})) != null ? stack1 : "");
},"9":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                        <li class=\"header-mini-cart-item-cell-product-price\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"line") : depth0)) != null ? compilerNameLookup(stack1,"retailTotalFormatted") : stack1), depth0))
    + "</li>\n";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                        <li class=\"header-mini-cart-item-cell-product-price\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"line") : depth0)) != null ? compilerNameLookup(stack1,"total_formatted") : stack1), depth0))
    + "</li>\n";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "                    <li class=\"header-mini-cart-item-cell-product-price\">\n                        "
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"rateFormatted") || (depth0 != null ? compilerNameLookup(depth0,"rateFormatted") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"rateFormatted","hash":{},"data":data,"loc":{"start":{"line":30,"column":24},"end":{"line":30,"column":41}}}) : helper)))
    + "\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showComparePrice") : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":31,"column":24},"end":{"line":35,"column":31}}})) != null ? stack1 : "")
    + "                    </li>\n";
},"14":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                            <small class=\"product-views-price-old\">\n                                "
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"comparePriceFormatted") || (depth0 != null ? compilerNameLookup(depth0,"comparePriceFormatted") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"comparePriceFormatted","hash":{},"data":data,"loc":{"start":{"line":33,"column":32},"end":{"line":33,"column":57}}}) : helper)))
    + "\n                            </small>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<li class=\"header-mini-cart-item-cell\" data-item-id=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"itemId") || (depth0 != null ? compilerNameLookup(depth0,"itemId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"itemId","hash":{},"data":data,"loc":{"start":{"line":1,"column":53},"end":{"line":1,"column":63}}}) : helper)))
    + "\" data-item-type=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"itemType") || (depth0 != null ? compilerNameLookup(depth0,"itemType") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"itemType","hash":{},"data":data,"loc":{"start":{"line":1,"column":81},"end":{"line":1,"column":93}}}) : helper)))
    + "\">\n		<a "
    + ((stack1 = ((helper = (helper = compilerNameLookup(helpers,"linkAttributes") || (depth0 != null ? compilerNameLookup(depth0,"linkAttributes") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"linkAttributes","hash":{},"data":data,"loc":{"start":{"line":2,"column":5},"end":{"line":2,"column":25}}}) : helper))) != null ? stack1 : "")
    + ">\n			<div class=\"header-mini-cart-item-cell-image\">\n                <div data-view=\"ItemThumbnail\"></div>\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isFreeGift") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":7},"end":{"line":7,"column":14}}})) != null ? stack1 : "")
    + "				<img src=\""
    + alias4((compilerNameLookup(helpers,"resizeImage")||(depth0 && compilerNameLookup(depth0,"resizeImage"))||alias2).call(alias1,((stack1 = (depth0 != null ? compilerNameLookup(depth0,"thumbnail") : depth0)) != null ? compilerNameLookup(stack1,"url") : stack1),"tinythumb",{"name":"resizeImage","hash":{},"data":data,"loc":{"start":{"line":8,"column":14},"end":{"line":8,"column":55}}}))
    + "?resizeh=60\" alt=\""
    + alias4(alias5(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"thumbnail") : depth0)) != null ? compilerNameLookup(stack1,"altimagetext") : stack1), depth0))
    + "\">\n			</div>\n		</a>\n		<div class=\"header-mini-cart-item-cell-details\">\n			<ul>\n				<li class=\"header-mini-cart-item-cell-product-title\">\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isNavigable") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data,"loc":{"start":{"line":14,"column":20},"end":{"line":18,"column":27}}})) != null ? stack1 : "")
    + "                </li>\n\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isPriceEnabled") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":21,"column":6},"end":{"line":38,"column":13}}})) != null ? stack1 : "")
    + "\n				<div data-view=\"Item.SelectedOptions\"></div>\n\n			    <li class=\"header-mini-cart-item-cell-product-qty\">\n		    	<span class=\"header-mini-cart-item-cell-quantity-label\">\n		    		"
    + alias4((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Quantity: ",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":44,"column":8},"end":{"line":44,"column":34}}}))
    + "\n		    	</span>\n			    	<span class=\"header-mini-cart-item-cell-quantity-value\">\n			    		"
    + alias4(alias5(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"line") : depth0)) != null ? compilerNameLookup(stack1,"quantity") : stack1), depth0))
    + "\n			    	</span>\n			    </li>\n		    </ul>\n		</div>\n</li>\n\n\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'header_mini_cart_item_cell'; return template;});