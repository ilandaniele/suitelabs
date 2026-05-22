define('product_views_price.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"isPriceVisible") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(17, data, 0),"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":54,"column":15}}})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"isPriceRange") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(14, data, 0),"data":data,"loc":{"start":{"line":4,"column":12},"end":{"line":39,"column":15}}})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "                <span class=\"product-views-price-range\" itemprop=\"offers\">\n                    <meta itemprop=\"priceCurrency\" content=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"currencyCode") || (depth0 != null ? compilerNameLookup(depth0,"currencyCode") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"currencyCode","hash":{},"data":data,"loc":{"start":{"line":6,"column":60},"end":{"line":6,"column":76}}}) : helper)))
    + "\"/>\n                    <!-- Price Range -->\n                    <span class=\"product-views-price-lead\" data-role=\"product-view-price-lead\">\n                        "
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"<span itemprop=\"lowPrice\" data-rate=\"$(0)\" >$(1)</span> to <span itemprop=\"highPrice\" data-rate=\"$(2)\">$(3)</span>",(depth0 != null ? compilerNameLookup(depth0,"minPrice") : depth0),(depth0 != null ? compilerNameLookup(depth0,"minPriceFormatted") : depth0),(depth0 != null ? compilerNameLookup(depth0,"maxPrice") : depth0),(depth0 != null ? compilerNameLookup(depth0,"maxPriceFormatted") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":9,"column":24},"end":{"line":11,"column":87}}}))
    + "\n                    </span>\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showComparePrice") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":13,"column":20},"end":{"line":17,"column":27}}})) != null ? stack1 : "")
    + "                    <link itemprop=\"availability\"\n                          href=\""
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isPurchasable") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.program(12, data, 0),"data":data,"loc":{"start":{"line":19,"column":32},"end":{"line":20,"column":172}}})) != null ? stack1 : "")
    + "\"/>\n                </span>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                        <small class=\"product-views-price-old\">\n                            "
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"comparePriceFormatted") || (depth0 != null ? compilerNameLookup(depth0,"comparePriceFormatted") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"comparePriceFormatted","hash":{},"data":data,"loc":{"start":{"line":15,"column":28},"end":{"line":15,"column":53}}}) : helper)))
    + "\n                        </small>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"isInStock") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(9, data, 0),"data":data,"loc":{"start":{"line":19,"column":53},"end":{"line":20,"column":128}}})) != null ? stack1 : "");
},"7":function(container,depth0,helpers,partials,data) {
    return "https://schema.org/InStock";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"backOrderPreOrder") : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.program(7, data, 0),"data":data,"loc":{"start":{"line":19,"column":104},"end":{"line":20,"column":121}}})) != null ? stack1 : "");
},"10":function(container,depth0,helpers,partials,data) {
    return "https://schema.org/PreOrder";
},"12":function(container,depth0,helpers,partials,data) {
    return "https://schema.org/OutOfStock";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <span class=\"product-views-price-exact\" itemprop=\"offers\">\n				<meta itemprop=\"priceCurrency\" content=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"currencyCode") || (depth0 != null ? compilerNameLookup(depth0,"currencyCode") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"currencyCode","hash":{},"data":data,"loc":{"start":{"line":24,"column":44},"end":{"line":24,"column":60}}}) : helper)))
    + "\"/>\n                <!-- Single -->\n                <span class=\"product-views-price-lead\" itemprop=\"price\" data-rate=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"price") || (depth0 != null ? compilerNameLookup(depth0,"price") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"price","hash":{},"data":data,"loc":{"start":{"line":26,"column":83},"end":{"line":26,"column":92}}}) : helper)))
    + "\"\n                      data-role=\"price-lead-formatted\">\n					"
    + alias4(((helper = (helper = compilerNameLookup(helpers,"priceFormatted") || (depth0 != null ? compilerNameLookup(depth0,"priceFormatted") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"priceFormatted","hash":{},"data":data,"loc":{"start":{"line":28,"column":5},"end":{"line":28,"column":23}}}) : helper)))
    + " "
    + alias4(((helper = (helper = compilerNameLookup(helpers,"frequency") || (depth0 != null ? compilerNameLookup(depth0,"frequency") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"frequency","hash":{},"data":data,"loc":{"start":{"line":28,"column":24},"end":{"line":28,"column":37}}}) : helper)))
    + "\n				</span>\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showComparePrice") : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":30,"column":16},"end":{"line":34,"column":23}}})) != null ? stack1 : "")
    + "                <link itemprop=\"availability\"\n                      href=\""
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isPurchasable") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.program(12, data, 0),"data":data,"loc":{"start":{"line":36,"column":28},"end":{"line":37,"column":168}}})) != null ? stack1 : "")
    + "\"/>\n			</span>\n";
},"15":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                    <small class=\"product-views-price-old\">\n                        "
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"comparePriceFormatted") || (depth0 != null ? compilerNameLookup(depth0,"comparePriceFormatted") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"comparePriceFormatted","hash":{},"data":data,"loc":{"start":{"line":32,"column":24},"end":{"line":32,"column":49}}}) : helper)))
    + "\n                    </small>\n";
},"17":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"isLoggedIn") : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.program(20, data, 0),"data":data,"loc":{"start":{"line":41,"column":12},"end":{"line":53,"column":19}}})) != null ? stack1 : "");
},"18":function(container,depth0,helpers,partials,data) {
    return "                    <div class=\"product-views-price-login-to-see-prices\">\n                        <p class=\"product-views-price-message\">\n                            "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Price not available. Contact us for pricing",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":44,"column":28},"end":{"line":44,"column":87}}}))
    + "\n                        </p>\n                    </div>\n";
},"20":function(container,depth0,helpers,partials,data) {
    return "                    <div class=\"product-views-price-login-to-see-prices\">\n                        <p class=\"product-views-price-message\">\n                            "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"<a href=\"$(0)\" data-navigation=\"ignore-click\">Log in</a> to see price",(depth0 != null ? compilerNameLookup(depth0,"urlLogin") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":50,"column":28},"end":{"line":50,"column":122}}}))
    + "\n                        </p>\n                    </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"product-views-price\">\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"isPriceEnabled") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":4},"end":{"line":55,"column":11}}})) != null ? stack1 : "")
    + "</div>\n\n\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'product_views_price'; return template;});