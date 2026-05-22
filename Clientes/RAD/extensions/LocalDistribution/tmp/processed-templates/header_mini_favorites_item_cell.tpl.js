define('header_mini_favorites_item_cell.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                <li class=\"header-mini-cart-item-cell-product-price\">"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"formattedPrice") || (depth0 != null ? compilerNameLookup(depth0,"formattedPrice") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"formattedPrice","hash":{},"data":data,"loc":{"start":{"line":12,"column":69},"end":{"line":12,"column":87}}}) : helper)))
    + "</li>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li class=\"header-mini-cart-item-cell\" data-item-id=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"itemId") || (depth0 != null ? compilerNameLookup(depth0,"itemId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"itemId","hash":{},"data":data,"loc":{"start":{"line":1,"column":53},"end":{"line":1,"column":63}}}) : helper)))
    + "\" data-item-type=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"itemType") || (depth0 != null ? compilerNameLookup(depth0,"itemType") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"itemType","hash":{},"data":data,"loc":{"start":{"line":1,"column":81},"end":{"line":1,"column":93}}}) : helper)))
    + "\">\n    <a "
    + ((stack1 = ((helper = (helper = compilerNameLookup(helpers,"linkAttributes") || (depth0 != null ? compilerNameLookup(depth0,"linkAttributes") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"linkAttributes","hash":{},"data":data,"loc":{"start":{"line":2,"column":7},"end":{"line":2,"column":27}}}) : helper))) != null ? stack1 : "")
    + ">\n        <div class=\"header-mini-cart-item-cell-image\">\n            <img src=\""
    + alias4((compilerNameLookup(helpers,"resizeImage")||(depth0 && compilerNameLookup(depth0,"resizeImage"))||alias2).call(alias1,(depth0 != null ? compilerNameLookup(depth0,"url") : depth0),"tinythumb",{"name":"resizeImage","hash":{},"data":data,"loc":{"start":{"line":4,"column":22},"end":{"line":4,"column":53}}}))
    + "?resizeh=60\" alt=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"altimagetext") || (depth0 != null ? compilerNameLookup(depth0,"altimagetext") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"altimagetext","hash":{},"data":data,"loc":{"start":{"line":4,"column":71},"end":{"line":4,"column":87}}}) : helper)))
    + "\">\n        </div>\n    </a>\n    <div class=\"header-mini-cart-item-cell-details\">\n        <ul>\n            <li class=\"header-mini-cart-item-cell-product-title\"><a "
    + ((stack1 = ((helper = (helper = compilerNameLookup(helpers,"linkAttributes") || (depth0 != null ? compilerNameLookup(depth0,"linkAttributes") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"linkAttributes","hash":{},"data":data,"loc":{"start":{"line":9,"column":68},"end":{"line":9,"column":88}}}) : helper))) != null ? stack1 : "")
    + " class=\"header-mini-cart-item-cell-title-navigable\">"
    + alias4(((helper = (helper = compilerNameLookup(helpers,"name") || (depth0 != null ? compilerNameLookup(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":9,"column":140},"end":{"line":9,"column":148}}}) : helper)))
    + "</a></li>\n\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isPriceEnabled") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":12},"end":{"line":13,"column":19}}})) != null ? stack1 : "")
    + "\n            <div data-view=\"Item.SelectedOptions\"></div>\n            <li class=\"header-mini-cart-item-cell-product-qty\">\n		    	<span class=\"header-mini-cart-item-cell-quantity-label\">\n                    "
    + alias4((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Quantity: ",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":18,"column":20},"end":{"line":18,"column":46}}}))
    + "\n                </span>\n                <span class=\"header-mini-cart-item-cell-quantity-value\">\n                    "
    + alias4(((helper = (helper = compilerNameLookup(helpers,"quantity") || (depth0 != null ? compilerNameLookup(depth0,"quantity") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"quantity","hash":{},"data":data,"loc":{"start":{"line":21,"column":20},"end":{"line":21,"column":32}}}) : helper)))
    + "\n                </span>\n            </li>\n        </ul>\n    </div>\n</li>\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/AwaLabs/FavoritesList/2.1.0/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'header_mini_favorites_item_cell'; return template;});