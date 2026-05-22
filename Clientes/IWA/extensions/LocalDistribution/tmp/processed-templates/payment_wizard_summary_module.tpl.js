define('payment_wizard_summary_module.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "				<div class=\"payment-wizard-summary-module-deposits-subtotal\">\r\n					<p class=\"payment-wizard-summary-module-grid-float\">\r\n						<span class=\"payment-wizard-summary-module-deposits-subtotal-value\">"
    + alias4(((helper = (helper = compilerNameLookup(helpers,"depositTotalFormatted") || (depth0 != null ? compilerNameLookup(depth0,"depositTotalFormatted") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"depositTotalFormatted","hash":{},"data":data,"loc":{"start":{"line":19,"column":74},"end":{"line":19,"column":99}}}) : helper)))
    + "</span>\r\n						"
    + alias4((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Deposits Subtotal",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":20,"column":6},"end":{"line":20,"column":39}}}))
    + "\r\n						\r\n					</p>\r\n				</div>\r\n				<div class=\"payment-wizard-summary-module-credits-subtotal\">\r\n					<p class=\"payment-wizard-summary-module-grid-float\">\r\n					<span class=\"payment-wizard-summary-module-credits-subtotal-value\">"
    + alias4(((helper = (helper = compilerNameLookup(helpers,"creditTotalFormatted") || (depth0 != null ? compilerNameLookup(depth0,"creditTotalFormatted") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"creditTotalFormatted","hash":{},"data":data,"loc":{"start":{"line":26,"column":72},"end":{"line":26,"column":96}}}) : helper)))
    + "</span>\r\n						"
    + alias4((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Credits Subtotal",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":27,"column":6},"end":{"line":27,"column":38}}}))
    + "\r\n						\r\n					</p>\r\n				</div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return "						<span class=\"payment-wizard-summary-module-estimated-total-value\">"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"invoiceTotalFormatted") || (depth0 != null ? compilerNameLookup(depth0,"invoiceTotalFormatted") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"invoiceTotalFormatted","hash":{},"data":data,"loc":{"start":{"line":35,"column":72},"end":{"line":35,"column":97}}}) : helper)))
    + "</span>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return "						<span class=\"payment-wizard-summary-module-estimated-total-value\">"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"paymentFormatted") || (depth0 != null ? compilerNameLookup(depth0,"paymentFormatted") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"paymentFormatted","hash":{},"data":data,"loc":{"start":{"line":37,"column":72},"end":{"line":37,"column":92}}}) : helper)))
    + "</span>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "				<div class=\"payment-wizard-summary-module-alert-information\">\r\n					"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Add your credit card security code (CSC/CVV) before submitting the payment",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":45,"column":5},"end":{"line":45,"column":95}}}))
    + "\r\n				</div>\r\n";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"showPaymentMethodRequireLabel") : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":48,"column":4},"end":{"line":52,"column":11}}})) != null ? stack1 : "");
},"10":function(container,depth0,helpers,partials,data) {
    return "					<div class=\"payment-wizard-summary-module-alert-information\">\r\n						"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Payment method is not required",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":50,"column":6},"end":{"line":50,"column":52}}}))
    + "\r\n					</div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, alias4="function";

  return "<div class=\"payment-wizard-summary-module\">\r\n	<div class=\"payment-wizard-summary-module-container\">\r\n		<header class=\"payment-wizard-summary-module-header\">\r\n			<h3 class=\"payment-wizard-summary-module-title\">\r\n				"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Payment Summary",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":5,"column":4},"end":{"line":5,"column":35}}}))
    + "\r\n			</h3>\r\n		</header>\r\n		<div class=\"payment-wizard-summary-module-body\">\r\n			<div class=\"payment-wizard-summary-module-invoices\">\r\n				<p class=\"payment-wizard-summary-module-grid-float\">\r\n					<span class=\"payment-wizard-summary-module-invoices-value\">"
    + alias3(((helper = (helper = compilerNameLookup(helpers,"invoiceTotalFormatted") || (depth0 != null ? compilerNameLookup(depth0,"invoiceTotalFormatted") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"invoiceTotalFormatted","hash":{},"data":data,"loc":{"start":{"line":11,"column":64},"end":{"line":11,"column":89}}}) : helper)))
    + "</span>\r\n					"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Invoices (<span class=\"payment-wizard-summary-module-invoices-number\">$(0)</span>)",(depth0 != null ? compilerNameLookup(depth0,"selectedInvoicesLength") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":12,"column":5},"end":{"line":12,"column":126}}}))
    + "\r\n					\r\n				</p>\r\n			</div>\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showTotalLabel") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":16,"column":3},"end":{"line":31,"column":10}}})) != null ? stack1 : "")
    + "			<div class=\"payment-wizard-summary-module-estimated\">\r\n				<p class=\"payment-wizard-summary-module-grid-float\">\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showEstimatedAsInvoiceTotal") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data,"loc":{"start":{"line":34,"column":5},"end":{"line":38,"column":12}}})) != null ? stack1 : "")
    + "					"
    + alias3(((helper = (helper = compilerNameLookup(helpers,"totalLabel") || (depth0 != null ? compilerNameLookup(depth0,"totalLabel") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"totalLabel","hash":{},"data":data,"loc":{"start":{"line":39,"column":5},"end":{"line":39,"column":19}}}) : helper)))
    + "\r\n				</p>\r\n			</div>\r\n\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showCreditCardInformatioRequrieLabel") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(9, data, 0),"data":data,"loc":{"start":{"line":43,"column":3},"end":{"line":53,"column":10}}})) != null ? stack1 : "")
    + "			\r\n		</div>\r\n	</div>\r\n	<div class=\"payment-wizard-summary-module-buttons-container\">\r\n		<button class=\"payment-wizard-summary-module-button-continue\" data-action=\"submit-step\" "
    + alias3(((helper = (helper = compilerNameLookup(helpers,"continueButtonDisabled") || (depth0 != null ? compilerNameLookup(depth0,"continueButtonDisabled") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"continueButtonDisabled","hash":{},"data":data,"loc":{"start":{"line":58,"column":90},"end":{"line":58,"column":116}}}) : helper)))
    + " >\r\n			"
    + alias3(((helper = (helper = compilerNameLookup(helpers,"continueButtonLabel") || (depth0 != null ? compilerNameLookup(depth0,"continueButtonLabel") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"continueButtonLabel","hash":{},"data":data,"loc":{"start":{"line":59,"column":3},"end":{"line":59,"column":26}}}) : helper)))
    + "\r\n		</button>\r\n	</div>\r\n</div>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'payment_wizard_summary_module'; return template;});