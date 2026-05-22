define('payment_wizard_invoice_action.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"payment-wizard-invoice-action-row\">\r\n	<a data-action=\"edit\" class=\"payment-wizard-invoice-action-button\" href=\"#\" >\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isPayfull") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data,"loc":{"start":{"line":4,"column":2},"end":{"line":8,"column":9}}})) != null ? stack1 : "")
    + "	</a>\r\n	<a data-action=\"remove\" class=\"payment-wizard-invoice-action\">\r\n		"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(alias1,"Remove",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":11,"column":2},"end":{"line":11,"column":24}}}))
    + "\r\n	</a>\r\n</div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "		"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Edit Payment",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":5,"column":2},"end":{"line":5,"column":30}}}))
    + "\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "		"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Partial Payment",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":7,"column":2},"end":{"line":7,"column":33}}}))
    + "\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"showAction") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":14,"column":7}}})) != null ? stack1 : "")
    + "\r\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'payment_wizard_invoice_action'; return template;});