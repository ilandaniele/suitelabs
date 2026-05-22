define('facets_horizontal_view.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <div class=\"facets-horizontal-nav facets-faceted-navigation-item-facet-group-expander collapsed\" data-action=\"show-facet-menu\" data-facet-id=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"id") || (depth0 != null ? compilerNameLookup(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":3,"column":150},"end":{"line":3,"column":156}}}) : helper)))
    + "\">\n            "
    + alias4(((helper = (helper = compilerNameLookup(helpers,"name") || (depth0 != null ? compilerNameLookup(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":4,"column":12},"end":{"line":4,"column":20}}}) : helper)))
    + "\n            <i class=\"facets-faceted-navigation-item-facet-group-expander-icon\" data-action=\"show-facet-menu\" data-facet-id=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"id") || (depth0 != null ? compilerNameLookup(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":5,"column":125},"end":{"line":5,"column":131}}}) : helper)))
    + "\"></i>\n        </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"facets-horizontal-nav-container\">\n"
    + ((stack1 = compilerNameLookup(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"standaloneFacets") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":4},"end":{"line":7,"column":13}}})) != null ? stack1 : "")
    + "\n    <div class=\"facets-horizontal-more-filters\" data-action=\"show-facet-menu\" data-facet-id=\"all\">More Filters</div>\n</div>";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/SuiteLabs/HorizontalFacets/1.0.0/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'facets_horizontal_view'; return template;});