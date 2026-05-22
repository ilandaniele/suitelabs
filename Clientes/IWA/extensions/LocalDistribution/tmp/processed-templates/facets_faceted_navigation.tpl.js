define('facets_faceted_navigation.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    return "	<div class=\"facets-faceted-navigation-facet-group\">\r\n		<div class=\"facets-faceted-navigation-title\">\r\n			"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Shop: $(0)",(depth0 != null ? compilerNameLookup(depth0,"categoryItemId") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":6,"column":3},"end":{"line":6,"column":44}}}))
    + "\r\n		</div>\r\n		<div class=\"facets-faceted-navigation-category-wrapper\">\r\n			<div data-type=\"facet\" data-facet-id=\"category\"></div>\r\n		</div>\r\n	</div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "    <div class=\"facets-faceted-navigation-title-container\">\r\n        <h3 class=\"facets-faceted-navigation-title\">"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(alias1,"Filter",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":16,"column":52},"end":{"line":16,"column":74}}}))
    + "</h3>\r\n\r\n        <h4 class=\"facets-faceted-navigation-results\">\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"keywords") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(9, data, 0),"data":data,"loc":{"start":{"line":19,"column":12},"end":{"line":31,"column":19}}})) != null ? stack1 : "")
    + "        </h4>\r\n\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"hasAppliedFacets") : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":34,"column":8},"end":{"line":39,"column":15}}})) != null ? stack1 : "")
    + "    </div>\r\n\r\n	<div data-view=\"Facets.FacetedNavigationItems\"></div>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"isTotalProductsOne") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data,"loc":{"start":{"line":20,"column":16},"end":{"line":24,"column":23}}})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    return "                    "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"1 Result for <span class=\"facets-faceted-navigation-title-alt\">$(0)</span>",(depth0 != null ? compilerNameLookup(depth0,"keywords") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":21,"column":20},"end":{"line":21,"column":119}}}))
    + "\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "                    "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"$(0) Results for <span class=\"facets-faceted-navigation-title-alt\">$(1)</span>",(depth0 != null ? compilerNameLookup(depth0,"totalProducts") : depth0),(depth0 != null ? compilerNameLookup(depth0,"keywords") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":23,"column":20},"end":{"line":23,"column":137}}}))
    + "\r\n";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"isTotalProductsOne") : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.program(12, data, 0),"data":data,"loc":{"start":{"line":26,"column":16},"end":{"line":30,"column":23}}})) != null ? stack1 : "");
},"10":function(container,depth0,helpers,partials,data) {
    return "                    "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"1 Product",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":27,"column":20},"end":{"line":27,"column":45}}}))
    + "\r\n";
},"12":function(container,depth0,helpers,partials,data) {
    return "                    "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"$(0) Products",(depth0 != null ? compilerNameLookup(depth0,"totalProducts") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":29,"column":20},"end":{"line":29,"column":63}}}))
    + "\r\n";
},"14":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "            <a href=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"clearAllFacetsLink") || (depth0 != null ? compilerNameLookup(depth0,"clearAllFacetsLink") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"clearAllFacetsLink","hash":{},"data":data,"loc":{"start":{"line":35,"column":21},"end":{"line":35,"column":43}}}) : helper)))
    + "\" class=\"facets-faceted-navigation-facets-clear\">\r\n                <span>"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Clear All",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":36,"column":22},"end":{"line":36,"column":47}}}))
    + "</span>\r\n            </a>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"hasCategories") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":0},"end":{"line":12,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"hasFacetsOrAppliedFacets") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":14,"column":0},"end":{"line":43,"column":7}}})) != null ? stack1 : "")
    + "\r\n\r\n\r\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'facets_faceted_navigation'; return template;});