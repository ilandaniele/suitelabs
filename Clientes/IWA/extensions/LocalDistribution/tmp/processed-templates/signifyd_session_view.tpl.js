define('signifyd_session_view.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "-->\r\n<!--    "
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"options") : stack1)) != null ? compilerNameLookup(stack1,"custbody_preferred_date") : stack1),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":7,"column":15}}})) != null ? stack1 : "")
    + "-->\r\n<!--    ";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "-->\r\n<!--    <p>"
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"options") : stack1)) != null ? compilerNameLookup(stack1,"custbody_preferred_date") : stack1), depth0))
    + "</p>-->\r\n<!--    ";
},"4":function(container,depth0,helpers,partials,data) {
    return "-->\r\n<!--    <p>"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"No date selected",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":6,"column":11},"end":{"line":6,"column":43}}}))
    + "</p>-->\r\n<!--    ";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "-->\r\n<!--    <input class=\"preferreddelivery-input\" type=\"date\" name=\"custbody_preferred_date\" data-todayhighlight=\"true\" value=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"options") : stack1)) != null ? compilerNameLookup(stack1,"custbody_preferred_date") : stack1), depth0))
    + "\">-->\r\n<!--    ";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div>\r\n<!--    "
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"isReview") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(6, data, 0),"data":data,"loc":{"start":{"line":2,"column":8},"end":{"line":10,"column":15}}})) != null ? stack1 : "")
    + "-->\r\n</div>\r\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/Folio3/Signifyd/1.0.1/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'signifyd_session_view'; return template;});