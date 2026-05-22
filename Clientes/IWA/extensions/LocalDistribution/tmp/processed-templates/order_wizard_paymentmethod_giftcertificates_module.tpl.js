define('order_wizard_paymentmethod_giftcertificates_module.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "	<header class=\"order-wizard-paymentmethod-giftcertificates-module-step-header\">\r\n		<h2 class=\"order-wizard-paymentmethod-giftcertificates-module-section-header\">\r\n			"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"pageHeader") || (depth0 != null ? compilerNameLookup(depth0,"pageHeader") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"pageHeader","hash":{},"data":data,"loc":{"start":{"line":5,"column":3},"end":{"line":5,"column":17}}}) : helper)))
    + "\r\n		</h2>\r\n	</header>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "			"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Add other Gift Certificate",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":13,"column":3},"end":{"line":13,"column":45}}}))
    + "\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "			"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Apply a Gift Certificate",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":15,"column":3},"end":{"line":15,"column":43}}}))
    + "\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "	<table class=\"order-wizard-paymentmethod-giftcertificates-module-table\">\r\n		<thead class=\"order-wizard-paymentmethod-giftcertificates-module-table-header\">\r\n		<tr>\r\n			<th class=\"order-wizard-paymentmethod-giftcertificates-module-row-number\">\r\n				<span>"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Gift Certificate number",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":43,"column":10},"end":{"line":43,"column":49}}}))
    + "</span>\r\n			</th>\r\n			<th class=\"order-wizard-paymentmethod-giftcertificates-module-row-amount\">\r\n				<span>"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Amount applied",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":46,"column":10},"end":{"line":46,"column":40}}}))
    + "</span>\r\n			</th>\r\n			<th class=\"order-wizard-paymentmethod-giftcertificates-module-row-remaining\">\r\n				<span>"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Remaining balance",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":49,"column":10},"end":{"line":49,"column":43}}}))
    + "</span>\r\n			</th>\r\n			<th class=\"order-wizard-paymentmethod-giftcertificates-module-row-actions\"></th>\r\n		</tr>\r\n		</thead>\r\n		<tbody class=\"order-wizard-paymentmethod-giftcertificates-module-table-body\" data-view=\"GiftCertificatesRecords\"></tbody>\r\n	</table>\r\n\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"order-wizard-paymentmethod-giftcertificates-module\">\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"pageHeader") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":1},"end":{"line":8,"column":8}}})) != null ? stack1 : "")
    + "\r\n	<div class=\"order-wizard-paymentmethod-giftcertificates-module-expander-head\">\r\n		<a class=\"order-wizard-paymentmethod-giftcertificates-module-expander-head-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#gift-certificate-form\" aria-expanded=\"false\" aria-controls=\"gift-certificate-form\">\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"hasGiftCertificates") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data,"loc":{"start":{"line":12,"column":3},"end":{"line":16,"column":10}}})) != null ? stack1 : "")
    + "			<i class=\"order-wizard-paymentmethod-giftcertificates-module-expander-icon\"></i>\r\n		</a>\r\n	</div>\r\n	<form id=\"gift-certificate-form\" class=\"order-wizard-paymentmethod-giftcertificates-module-form collapse\" data-action=\"gift-certificate-form\">\r\n		<div class=\"order-wizard-paymentmethod-giftcertificates-module-form-expander-container\">\r\n			<fieldset>\r\n\r\n				<div class=\"order-wizard-paymentmethod-giftcertificates-module-form-input-container\">\r\n					<input type=\"text\" class=\"order-wizard-paymentmethod-giftcertificates-module-form-input\" name=\"code\">\r\n				</div>\r\n				<div class=\"order-wizard-paymentmethod-giftcertificates-module-form-submit-container\">\r\n					<button type=\"submit\" class=\"order-wizard-paymentmethod-giftcertificates-module-form-submit\">\r\n						"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(alias1,"Apply",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":29,"column":6},"end":{"line":29,"column":27}}}))
    + "\r\n					</button>\r\n				</div>\r\n\r\n				<div data-type=\"alert-placeholder-gif-certificate\"></div>\r\n			</fieldset>\r\n		</div>\r\n	</form>\r\n\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"hasGiftCertificates") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":38,"column":1},"end":{"line":57,"column":8}}})) != null ? stack1 : "")
    + "	<div data-cms-area=\"order_wizard_paymentmethod_giftcertificates_cms_area_1\" data-cms-area-filters=\"page_type\"></div>\r\n</div>\r\n\r\n\r\n\r\n\r\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'order_wizard_paymentmethod_giftcertificates_module'; return template;});