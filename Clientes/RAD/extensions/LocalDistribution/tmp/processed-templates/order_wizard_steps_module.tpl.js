define('order_wizard_steps_module.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <div class=\"order-wizard-steps-step "
    + alias4(((helper = (helper = compilerNameLookup(helpers,"elClass") || (depth0 != null ? compilerNameLookup(depth0,"elClass") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"elClass","hash":{},"data":data,"loc":{"start":{"line":2,"column":40},"end":{"line":2,"column":51}}}) : helper)))
    + "\">\n        <a href=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"linkUrl") || (depth0 != null ? compilerNameLookup(depth0,"linkUrl") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"linkUrl","hash":{},"data":data,"loc":{"start":{"line":3,"column":17},"end":{"line":3,"column":28}}}) : helper)))
    + "\" class=\"order-wizard-steps-step-name\">\n            <span class=\"order-wizard-steps-step-number\">"
    + alias4(((helper = (helper = compilerNameLookup(helpers,"counter") || (depth0 != null ? compilerNameLookup(depth0,"counter") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"counter","hash":{},"data":data,"loc":{"start":{"line":4,"column":57},"end":{"line":4,"column":68}}}) : helper)))
    + "</span>\n            "
    + alias4(((helper = (helper = compilerNameLookup(helpers,"name") || (depth0 != null ? compilerNameLookup(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":5,"column":12},"end":{"line":5,"column":20}}}) : helper)))
    + "\n            <i class=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"iconClass") || (depth0 != null ? compilerNameLookup(depth0,"iconClass") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"iconClass","hash":{},"data":data,"loc":{"start":{"line":6,"column":22},"end":{"line":6,"column":35}}}) : helper)))
    + "\"></i>\n        </a>\n    </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"stepGroups") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":9,"column":9}}})) != null ? stack1 : "");
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/AwaLabs/CheckoutSteps/2.0.0/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'order_wizard_steps_module'; return template;});