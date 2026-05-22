define('enhanced_search.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "  <div class=\"typeahead-trending-container\">\n    <div class=\"typeahead-trending-wrapper\">\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"hasCategories") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":6},"end":{"line":17,"column":13}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"hasProducts") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":19,"column":6},"end":{"line":36,"column":13}}})) != null ? stack1 : "")
    + "    </div>\n  </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "        <div class=\"typeahead-section\">\n            <div class=\"typeahead-section-title\"><strong>"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"trendingCategoriesLabel") || (depth0 != null ? compilerNameLookup(depth0,"trendingCategoriesLabel") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"trendingCategoriesLabel","hash":{},"data":data,"loc":{"start":{"line":6,"column":57},"end":{"line":6,"column":84}}}) : helper)))
    + "</strong></div>\n            <ul class=\"typeahead-category-list\">\n"
    + ((stack1 = compilerNameLookup(helpers,"each").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"categories") : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":16},"end":{"line":14,"column":25}}})) != null ? stack1 : "")
    + "            </ul>\n        </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                  <li class=\"typeahead-category-item\">\n                      <a href=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"url") || (depth0 != null ? compilerNameLookup(depth0,"url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data,"loc":{"start":{"line":10,"column":31},"end":{"line":10,"column":38}}}) : helper)))
    + "\" class=\"typeahead-category-link\">\n                          <span class=\"typeahead-checkmark\">✔</span> "
    + alias4(((helper = (helper = compilerNameLookup(helpers,"name") || (depth0 != null ? compilerNameLookup(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":11,"column":69},"end":{"line":11,"column":77}}}) : helper)))
    + "\n                      </a>\n                  </li>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "        <div class=\"typeahead-section\">\n          <div class=\"typeahead-section-title\"><strong>"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"trendingProductsLabel") || (depth0 != null ? compilerNameLookup(depth0,"trendingProductsLabel") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"trendingProductsLabel","hash":{},"data":data,"loc":{"start":{"line":21,"column":55},"end":{"line":21,"column":80}}}) : helper)))
    + "</strong></div>\n          <ul class=\"typeahead-product-list\">\n"
    + ((stack1 = compilerNameLookup(helpers,"each").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"products") : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":23,"column":14},"end":{"line":33,"column":23}}})) != null ? stack1 : "")
    + "          </ul>\n        </div>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                <li class=\"typeahead-product-item\">\n                    <a href=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"url") || (depth0 != null ? compilerNameLookup(depth0,"url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data,"loc":{"start":{"line":25,"column":29},"end":{"line":25,"column":36}}}) : helper)))
    + "\" class=\"typeahead-product-link\">\n                        <div class=\"typeahead-product-info\">\n                            <div class=\"typeahead-product-name\">"
    + alias4(((helper = (helper = compilerNameLookup(helpers,"name") || (depth0 != null ? compilerNameLookup(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":27,"column":64},"end":{"line":27,"column":72}}}) : helper)))
    + "</div>\n                            <div class=\"typeahead-product-sku\">SKU: "
    + alias4(((helper = (helper = compilerNameLookup(helpers,"sku") || (depth0 != null ? compilerNameLookup(depth0,"sku") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sku","hash":{},"data":data,"loc":{"start":{"line":28,"column":68},"end":{"line":28,"column":75}}}) : helper)))
    + "</div>\n                            <div class=\"typeahead-product-manufacturer\">Manufactured by "
    + alias4(((helper = (helper = compilerNameLookup(helpers,"manufacturer") || (depth0 != null ? compilerNameLookup(depth0,"manufacturer") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"manufacturer","hash":{},"data":data,"loc":{"start":{"line":29,"column":88},"end":{"line":29,"column":104}}}) : helper)))
    + "</div>\n                        </div>\n                    </a>\n                </li>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"show") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":39,"column":7}}})) != null ? stack1 : "");
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/SuiteLabs/EnhancedSearch/1.0.0/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'enhanced_search'; return template;});