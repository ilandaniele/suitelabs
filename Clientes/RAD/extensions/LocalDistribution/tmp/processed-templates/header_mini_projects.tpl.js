define('header_mini_projects.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    return "header-mini-cart-menu-cart-link-enabled";
},"3":function(container,depth0,helpers,partials,data) {
    return "            <span class=\"header-mini-cart-summary-cart-ellipsis\"></span>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "            "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"$(0) ",(depth0 != null ? compilerNameLookup(depth0,"projectsCount") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":8,"column":12},"end":{"line":8,"column":47}}}))
    + "\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "        <h4>Projects</h4>\n        <div data-view=\"Header.MiniProjectsItemCell\" class=\"header-mini-projects-container\"></div>\n";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "        <div class=\"header-mini-cart-empty\">\n            <a>\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"isLoading") : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.program(12, data, 0),"data":data,"loc":{"start":{"line":19,"column":16},"end":{"line":23,"column":23}}})) != null ? stack1 : "")
    + "            </a>\n        </div>\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "                    "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Your projects are loading",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":20,"column":20},"end":{"line":20,"column":61}}}))
    + "\n";
},"12":function(container,depth0,helpers,partials,data) {
    return "                    "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"You have no projects",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":22,"column":20},"end":{"line":22,"column":56}}}))
    + "\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<a class=\"header-mini-cart-menu-cart-link "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showLines") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":42},"end":{"line":1,"column":105}}})) != null ? stack1 : "")
    + "\" data-type=\"mini-projects\" href=\"#\" data-touchpoint=\"customercenter\" data-hashtag=\"#overview\" title=\""
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(alias1,"Projects",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":1,"column":207},"end":{"line":1,"column":231}}}))
    + "\">\n    <i class=\"header-menu-projects-icon\" data-toggle=\"tooltip\"></i>\n    <span class=\"header-mini-cart-menu-cart-legend\">\n\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isLoading") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data,"loc":{"start":{"line":5,"column":8},"end":{"line":9,"column":15}}})) != null ? stack1 : "")
    + "    </span>\n</a>\n<div class=\"header-mini-cart\">\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showLines") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(9, data, 0),"data":data,"loc":{"start":{"line":13,"column":4},"end":{"line":26,"column":11}}})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/AwaLabs/FavoritesList/2.1.0/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'header_mini_projects'; return template;});