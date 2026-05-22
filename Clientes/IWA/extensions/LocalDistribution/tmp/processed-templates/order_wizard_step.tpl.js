define('order_wizard_step.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<header class=\"order-wizard-step-header\">\r\n	<h2 data-type=\"wizard-step-name-container\" class=\"order-wizard-step-title\">"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"title") || (depth0 != null ? compilerNameLookup(depth0,"title") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"title","hash":{},"data":data,"loc":{"start":{"line":5,"column":76},"end":{"line":5,"column":85}}}) : helper)))
    + "</h2>\r\n</header>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "		<small class=\"order-wizard-step-message "
    + alias4(((helper = (helper = compilerNameLookup(helpers,"bottomMessageClass") || (depth0 != null ? compilerNameLookup(depth0,"bottomMessageClass") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"bottomMessageClass","hash":{},"data":data,"loc":{"start":{"line":34,"column":42},"end":{"line":34,"column":64}}}) : helper)))
    + "\">\r\n			"
    + alias4(((helper = (helper = compilerNameLookup(helpers,"bottomMessage") || (depth0 != null ? compilerNameLookup(depth0,"bottomMessage") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"bottomMessage","hash":{},"data":data,"loc":{"start":{"line":35,"column":3},"end":{"line":35,"column":20}}}) : helper)))
    + "\r\n		</small>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return "			<button class=\"order-wizard-step-button-continue\" data-action=\"submit-step\">\r\n				"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"continueButtonLabel") || (depth0 != null ? compilerNameLookup(depth0,"continueButtonLabel") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"continueButtonLabel","hash":{},"data":data,"loc":{"start":{"line":43,"column":4},"end":{"line":43,"column":27}}}) : helper)))
    + "\r\n			</button>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "style=\"display:none;\"";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div data-action=\"skip-login-message\" class=\"order-wizard-step-guest-message\"></div>\r\n\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showTitle") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":0},"end":{"line":7,"column":7}}})) != null ? stack1 : "")
    + "\r\n<div data-type=\"alert-placeholder-step\"></div>\r\n\r\n<div class=\"order-wizard-step-review-wrapper\">\r\n\r\n	<section class=\"order-wizard-step-review-main\">\r\n		<div id=\"wizard-step-review-left\"></div>\r\n	</section>\r\n\r\n	<section id=\"wizard-step-review-right\" class=\"order-wizard-step-review-secondary\">\r\n	</section>\r\n\r\n</div>\r\n\r\n<div class=\"order-wizard-step-content-wrapper\">\r\n\r\n	<section id=\"wizard-step-content\" class=\"order-wizard-step-content-main\">\r\n	</section>\r\n\r\n	<div class=\"order-wizard-step-content-secondary-wrapper\">\r\n		<section id=\"wizard-step-content-right\" class=\"order-wizard-step-content-secondary\"></section>\r\n	</div>\r\n\r\n	<div class=\"order-wizard-step-actions\">\r\n\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showBottomMessage") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":33,"column":2},"end":{"line":37,"column":9}}})) != null ? stack1 : "")
    + "\r\n		<div class=\"order-wizard-step-button-container\">\r\n\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showContinueButton") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":41,"column":3},"end":{"line":45,"column":10}}})) != null ? stack1 : "")
    + "			<button class=\"order-wizard-step-button-back\" "
    + ((stack1 = compilerNameLookup(helpers,"unless").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showBackButton") : depth0),{"name":"unless","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":46,"column":49},"end":{"line":46,"column":107}}})) != null ? stack1 : "")
    + " data-action=\"previous-step\">\r\n				"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(alias1,"Back",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":47,"column":4},"end":{"line":47,"column":24}}}))
    + "\r\n			</button>\r\n		</div>\r\n	</div>\r\n</div>\r\n\r\n\r\n\r\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'order_wizard_step'; return template;});