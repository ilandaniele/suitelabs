define('product_list_details_favorites.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "    <a href=\"/wishlist\" class=\"product-list-details-button-back\">\n        <i class=\"product-list-details-button-back-icon\"></i>\n        "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(alias1,"Go to Product Lists",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":4,"column":8},"end":{"line":4,"column":43}}}))
    + "\n    </a>\n    <div data-confirm-message class=\"product-list-details-confirm-message\"></div>\n    <section class=\"product-list-details\">\n        <header class=\"product-list-details-header\">\n            <h2 class=\"product-list-details-title\">\n                "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isTypePredefined") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data,"loc":{"start":{"line":10,"column":16},"end":{"line":10,"column":89}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"hasItems") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":16},"end":{"line":13,"column":23}}})) != null ? stack1 : "")
    + "            </h2>\n            <div data-view=\"ListHeader\" style=\""
    + ((stack1 = compilerNameLookup(helpers,"unless").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showListHeader") : depth0),{"name":"unless","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":15,"column":47},"end":{"line":15,"column":96}}})) != null ? stack1 : "")
    + "\"></div>\n        </header>\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"hasItems") : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.program(16, data, 0),"data":data,"loc":{"start":{"line":17,"column":8},"end":{"line":26,"column":15}}})) != null ? stack1 : "")
    + "\n\n    </section>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "aaaa"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"name") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":10,"column":44},"end":{"line":10,"column":62}}}));
},"4":function(container,depth0,helpers,partials,data) {
    var helper;

  return "bbbb"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"name") || (depth0 != null ? compilerNameLookup(depth0,"name") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"name","hash":{},"data":data,"loc":{"start":{"line":10,"column":74},"end":{"line":10,"column":82}}}) : helper)));
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "                <span class=\"product-list-details-count\">("
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"itemsLength") || (depth0 != null ? compilerNameLookup(depth0,"itemsLength") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"itemsLength","hash":{},"data":data,"loc":{"start":{"line":12,"column":58},"end":{"line":12,"column":73}}}) : helper)))
    + " "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"hasOneItem") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(9, data, 0),"data":data,"loc":{"start":{"line":12,"column":74},"end":{"line":12,"column":154}}})) != null ? stack1 : "")
    + ")</span>\n";
},"7":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Product",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":12,"column":92},"end":{"line":12,"column":115}}}));
},"9":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Products",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":12,"column":123},"end":{"line":12,"column":147}}}));
},"11":function(container,depth0,helpers,partials,data) {
    return "display:none";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "            <table class=\"product-list-details-list-items "
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"isChecked") : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":18,"column":58},"end":{"line":18,"column":88}}})) != null ? stack1 : "")
    + "\" data-type=\"product-list-items\">\n                <tbody data-view=\"ProductList.DynamicDisplay\">\n                </tbody>\n            </table>\n";
},"14":function(container,depth0,helpers,partials,data) {
    return "active";
},"16":function(container,depth0,helpers,partials,data) {
    return "            <div class=\"product-list-details-no-items\">\n                <h5>"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"You do not have any Favorites listed yet. Please explore the website or search for an item you would like to add..",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":24,"column":20},"end":{"line":24,"column":150}}}))
    + "</h5>\n            </div>\n";
},"18":function(container,depth0,helpers,partials,data) {
    return "    <h1 class=\"product-list-main-title\"> "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Favorites have been deleted",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":32,"column":41},"end":{"line":32,"column":84}}}))
    + "</h1>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = compilerNameLookup(helpers,"unless").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"deleted") : depth0),{"name":"unless","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":30,"column":11}}})) != null ? stack1 : "")
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"deleted") : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":31,"column":0},"end":{"line":33,"column":7}}})) != null ? stack1 : "")
    + "\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/AwaLabs/FavoritesList/2.1.0/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'product_list_details_favorites'; return template;});