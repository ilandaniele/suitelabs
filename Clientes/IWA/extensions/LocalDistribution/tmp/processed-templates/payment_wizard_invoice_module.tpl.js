define('payment_wizard_invoice_module.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "	<div class=\"payment-wizard-invoice-module-list-subheader\">\r\n		<table class=\"payment-wizard-invoice-module-table\">\r\n			<thead class=\"payment-wizard-invoice-module-table-header\">\r\n			<tr>\r\n				<th class=\"payment-wizard-invoice-module-table-invoice-number\">\r\n					<span>"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Invoice No.",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":10,"column":11},"end":{"line":10,"column":38}}}))
    + "</span>\r\n				</th>\r\n				<th class=\"payment-wizard-invoice-module-table-invoice-due-date\">\r\n					<span>"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Due date",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":13,"column":11},"end":{"line":13,"column":35}}}))
    + "</span>\r\n				</th>\r\n				<th class=\"payment-wizard-invoice-module-table-invoice-amount\">\r\n					<span>"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Amount Due",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":16,"column":11},"end":{"line":16,"column":37}}}))
    + "</span>\r\n				</th>\r\n				<th class=\"payment-wizard-invoice-module-table-invoice-action\">\r\n					&nbsp;\r\n				</th>\r\n			</tr>\r\n			</thead>\r\n			<tbody class=\"payment-wizard-invoice-module-table-body\" data-view=\"Invoices.Collection\"></tbody>\r\n		</table>\r\n	</div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "	<p class=\"payment-wizard-invoice-module-list-empty\">\r\n	<h5>"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"No invoices selected",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":28,"column":5},"end":{"line":28,"column":41}}}))
    + "</h5>\r\n	</p>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div data-view=\"ListHeader.View\"></div>\r\n\r\n<div class=\"payment-wizard-invoice-module-payment-list\">\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"isInvoiceLengthGreaterThan0") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":4,"column":1},"end":{"line":30,"column":8}}})) != null ? stack1 : "")
    + "</div>\r\n\r\n\r\n\r\n\r\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'payment_wizard_invoice_module'; return template;});