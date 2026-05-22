define('order_wizard_paymentmethod_threedsecure_module.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\r\n    <div class=\"alert alert-error\">\r\n\r\n        "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"threeDSecureError") : depth0)) != null ? compilerNameLookup(stack1,"errorMessage") : stack1), depth0))
    + "\r\n\r\n    </div>\r\n\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "\r\n    "
    + ((stack1 = ((helper = (helper = compilerNameLookup(helpers,"iframe") || (depth0 != null ? compilerNameLookup(depth0,"iframe") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"iframe","hash":{},"data":data,"loc":{"start":{"line":13,"column":4},"end":{"line":13,"column":16}}}) : helper))) != null ? stack1 : "")
    + "\r\n\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"order-wizard-paymentmethod-threedsecure-module\">\r\n\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"threeDSecureError") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":3,"column":4},"end":{"line":15,"column":11}}})) != null ? stack1 : "")
    + "\r\n</div>\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'order_wizard_paymentmethod_threedsecure_module'; return template;});