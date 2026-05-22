define('order_wizard_msr_shipmethod_module.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    return "	<div data-type=\"shipments-list\" data-view=\"Packages.Collection\"></div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "	<p class=\"order-wizard-msr-shipmethod-module-message\">\r\n		<i class=\"order-wizard-msr-shipmethod-module-message-icon\"></i>\r\n		"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"You haven't set any shipments yet",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":6,"column":2},"end":{"line":6,"column":52}}}))
    + "\r\n	</p>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"showPackages") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":8,"column":7}}})) != null ? stack1 : "")
    + "\r\n\r\n\r\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'order_wizard_msr_shipmethod_module'; return template;});