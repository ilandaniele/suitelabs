define('awalabs_assambly_instructions.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "  <a class=\"product-assambly-instructions\""
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isUserLoggedIn") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data,"loc":{"start":{"line":2,"column":42},"end":{"line":2,"column":155}}})) != null ? stack1 : "")
    + ">\n    <i class=\"icon-assambly\"></i>\n    <span>"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(alias1,"Installation Guide",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":4,"column":10},"end":{"line":4,"column":44}}}))
    + "</span>\n  </a>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper;

  return " href=\""
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"assamblyInstrucitonsLink") || (depth0 != null ? compilerNameLookup(depth0,"assamblyInstrucitonsLink") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"assamblyInstrucitonsLink","hash":{},"data":data,"loc":{"start":{"line":2,"column":71},"end":{"line":2,"column":99}}}) : helper)))
    + "\" target=\"_blank\"";
},"4":function(container,depth0,helpers,partials,data) {
    return " data-action=\"showModal\"";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"assamblyInstrucitonsLink") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":6,"column":7}}})) != null ? stack1 : "");
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/AwaLabs/AssamblyInstructions/2.0.1/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'awalabs_assambly_instructions'; return template;});