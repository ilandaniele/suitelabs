define('favorites_list_control_single.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    return "            <i class=\"pdp-favorites-unselected-icon item-added\"></i>\n            <span>"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Remove from Favorites",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":5,"column":18},"end":{"line":5,"column":55}}}))
    + "</span>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "            <i class=\"pdp-favorites-unselected-icon\"></i>\n            <span>"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Add to Favorites",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":8,"column":18},"end":{"line":8,"column":50}}}))
    + "</span>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"product-lists-single product-details-full-actions-addtowishlist\">\n    <button class=\"product-list-control-single-button-wishlist\" data-type=\"add-product-to-single-list\" data-action=\"add-product-to-single-list\" type=\"button\" >\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"isProductAlreadyAdded") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":9,"column":15}}})) != null ? stack1 : "")
    + "    </button>\n</div>";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/AwaLabs/FavoritesList/2.1.0/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'favorites_list_control_single'; return template;});