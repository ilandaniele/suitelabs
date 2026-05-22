define('header_mini_favorites.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    return "header-mini-cart-menu-cart-link-enabled";
},"3":function(container,depth0,helpers,partials,data) {
    return "                <span class=\"header-mini-cart-summary-cart-ellipsis\"></span>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "                "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"$(0) ",(depth0 != null ? compilerNameLookup(depth0,"ItemsCount") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":8,"column":16},"end":{"line":8,"column":48}}}))
    + "\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "            <h4>"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Favorites",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":14,"column":16},"end":{"line":14,"column":41}}}))
    + "</h4>\n            <div data-view=\"Header.MiniFavoritesItemCell\" class=\"header-mini-cart-container\"></div>\n            <div class=\"header-mini-cart-subtotal\">\n                <div class=\"header-mini-cart-subtotal-items\">\n                    "
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"$(0) items",(depth0 != null ? compilerNameLookup(depth0,"ItemsCount") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":18,"column":20},"end":{"line":18,"column":57}}}))
    + "\n                </div>\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showCost") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":20,"column":16},"end":{"line":24,"column":23}}})) != null ? stack1 : "")
    + "            </div>\n            <div class=\"header-mini-cart-buttons\">\n                <div class=\"header-mini-cart-buttons-right\">\n                    <a href=\"#\" class=\"header-mini-cart-button-checkout\" data-touchpoint=\"customercenter\" data-hashtag=\"#/favoriteslist/"
    + alias3(((helper = (helper = compilerNameLookup(helpers,"id") || (depth0 != null ? compilerNameLookup(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":28,"column":136},"end":{"line":28,"column":142}}}) : helper)))
    + "\">\n                        "
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"View Favorites",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":29,"column":24},"end":{"line":29,"column":54}}}))
    + "\n                    </a>\n                </div>\n            </div>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "                    <div class=\"header-mini-cart-subtotal-amount\">\n                        "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Total Cost: $(0)",(depth0 != null ? compilerNameLookup(depth0,"totalCost") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":22,"column":24},"end":{"line":22,"column":66}}}))
    + "\n                    </div>\n";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "            <div class=\"header-mini-cart-empty\">\n                <a>\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"isLoading") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.program(13, data, 0),"data":data,"loc":{"start":{"line":36,"column":20},"end":{"line":40,"column":27}}})) != null ? stack1 : "")
    + "                </a>\n            </div>\n";
},"11":function(container,depth0,helpers,partials,data) {
    return "                        "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Your Favorites are loading",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":37,"column":24},"end":{"line":37,"column":66}}}))
    + "\n";
},"13":function(container,depth0,helpers,partials,data) {
    return "                        "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"You have no Favorites",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":39,"column":24},"end":{"line":39,"column":61}}}))
    + "\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "<div class=\"header-menu-favorites\">\n    <a class=\"header-menu-favorites-button dropdown-toggle "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showLines") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":59},"end":{"line":2,"column":122}}})) != null ? stack1 : "")
    + "\" role=\"button\" id=\"header-menu-favorites-dropdown\" data-type=\"mini-favorites\" href=\"#\" data-touchpoint=\"customercenter\" data-hashtag=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"url") || (depth0 != null ? compilerNameLookup(depth0,"url") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"url","hash":{},"data":data,"loc":{"start":{"line":2,"column":257},"end":{"line":2,"column":264}}}) : helper)))
    + "\" title=\""
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Favorites",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":2,"column":273},"end":{"line":2,"column":298}}}))
    + "\">\n        <i class=\"pdp-favorites-unselected-icon\" data-toggle=\"tooltip\"></i>\n        <span class=\"header-mini-cart-menu-cart-legend\">\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isLoading") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data,"loc":{"start":{"line":5,"column":12},"end":{"line":9,"column":19}}})) != null ? stack1 : "")
    + "        </span>\n    </a>\n    <div class=\"dropdown-menu header-menu-favorites-dropdown\" aria-labelledby=\"header-menu-favorites-dropdown\">\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showLines") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(10, data, 0),"data":data,"loc":{"start":{"line":13,"column":8},"end":{"line":43,"column":15}}})) != null ? stack1 : "")
    + "    </div>\n</div>\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/AwaLabs/FavoritesList/2.1.0/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'header_mini_favorites'; return template;});