define('facets_empty.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    return "            "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Please login to see available products.",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":4,"column":12},"end":{"line":4,"column":67}}}))
    + "\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "            "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Sorry, we couldn't find any products.",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":6,"column":12},"end":{"line":6,"column":66}}}))
    + "\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "            "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"We were unable to find results for <strong>$(0)</strong>. Please check your spelling or try searching for similar terms.",(depth0 != null ? compilerNameLookup(depth0,"keywords") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":11,"column":12},"end":{"line":11,"column":157}}}))
    + "\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"facets-empty\">\n    <h1 class=\"facets-empty-title\">\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"displayNotLoggedInCatagoryMessage") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":7,"column":15}}})) != null ? stack1 : "")
    + "    </h1>\n    <p>\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"keywords") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":10,"column":8},"end":{"line":12,"column":15}}})) != null ? stack1 : "")
    + "    </p>\n    <div class=\"facets-empty-merchandising-zone\">\n        <div data-type=\"merchandising-zone\" data-id=\"newArrivals\"></div>\n    </div>\n</div>\n\n\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'facets_empty'; return template;});