define('facets_facets_display.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "	<span class=\"facets-facets-display-narrowedby-title\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Filtered By:",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":4,"column":54},"end":{"line":4,"column":82}}}))
    + "</span>\r\n\r\n"
    + ((stack1 = compilerNameLookup(helpers,"each").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"values") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":1},"end":{"line":17,"column":10}}})) != null ? stack1 : "")
    + "\r\n	<div class=\"facets-facets-display-clear-wrapper\">\r\n		<a href=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"clearAllFacetsLink") || (depth0 != null ? compilerNameLookup(depth0,"clearAllFacetsLink") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"clearAllFacetsLink","hash":{},"data":data,"loc":{"start":{"line":20,"column":11},"end":{"line":20,"column":33}}}) : helper)))
    + "\" class=\"facets-facets-display-clear\">\r\n			<span>"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Clear All",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":21,"column":9},"end":{"line":21,"column":34}}}))
    + "</span>\r\n			<i class=\"facets-facets-display-clear-icon\"></i>\r\n		</a>\r\n	</div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "		<a class=\"facets-facets-display-filter\" data-type=\"facet-selected\" data-facet-id=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"facetValue") || (depth0 != null ? compilerNameLookup(depth0,"facetValue") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"facetValue","hash":{},"data":data,"loc":{"start":{"line":7,"column":84},"end":{"line":7,"column":98}}}) : helper)))
    + "\" href=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"facetValueUrl") || (depth0 != null ? compilerNameLookup(depth0,"facetValueUrl") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"facetValueUrl","hash":{},"data":data,"loc":{"start":{"line":7,"column":106},"end":{"line":7,"column":123}}}) : helper)))
    + "\">\r\n			<span>\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"facetValueIsObject") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data,"loc":{"start":{"line":9,"column":4},"end":{"line":13,"column":11}}})) != null ? stack1 : "")
    + "			</span>\r\n			<i class=\"facets-facets-display-filter-delete-icon\" title=\""
    + alias4((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Clear filter",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":15,"column":62},"end":{"line":15,"column":90}}}))
    + "\"></i>\r\n		</a>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "					"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"$(0) to $(1)",(depth0 != null ? compilerNameLookup(depth0,"from") : depth0),(depth0 != null ? compilerNameLookup(depth0,"to") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":10,"column":5},"end":{"line":10,"column":41}}}))
    + "\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return "					"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"valueLabel") || (depth0 != null ? compilerNameLookup(depth0,"valueLabel") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"valueLabel","hash":{},"data":data,"loc":{"start":{"line":12,"column":5},"end":{"line":12,"column":19}}}) : helper)))
    + "\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"hasFacets") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":0},"end":{"line":25,"column":7}}})) != null ? stack1 : "")
    + "\r\n\r\n\r\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'facets_facets_display'; return template;});