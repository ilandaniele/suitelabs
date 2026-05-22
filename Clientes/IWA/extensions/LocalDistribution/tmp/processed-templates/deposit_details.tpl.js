define('deposit_details.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    return "in";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, alias4="function";

  return "				<table class=\"deposit-details-invoice-table\">\r\n					<thead class=\"deposit-details-invoice-table-heading\">\r\n						<th class=\"deposit-details-invoice-table-heading-number\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Number",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":47,"column":63},"end":{"line":47,"column":85}}}))
    + "</th>\r\n						<th class=\"deposit-details-invoice-table-heading-date\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Invoice Date",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":48,"column":61},"end":{"line":48,"column":89}}}))
    + "</th>\r\n						<th class=\"deposit-details-invoice-table-heading-date-applied\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Date Applied",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":49,"column":69},"end":{"line":49,"column":97}}}))
    + "</th>\r\n						<th class=\"deposit-details-invoice-table-heading-amount\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Amount",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":50,"column":63},"end":{"line":50,"column":85}}}))
    + "</th>\r\n					</thead>\r\n					<tbody data-view=\"Invoices.Collection\"></tbody>\r\n\r\n					<tfoot>\r\n						<tr>\r\n							<td colspan=\"4\" class=\"deposit-details-applied-amount\">\r\n								<span class=\"deposit-details-applied-amount-label\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Applied Amount:",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":57,"column":59},"end":{"line":57,"column":90}}}))
    + " </span>\r\n								<span class=\"deposit-details-applied-amount-value\">"
    + alias3(((helper = (helper = compilerNameLookup(helpers,"paidFormatted") || (depth0 != null ? compilerNameLookup(depth0,"paidFormatted") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"paidFormatted","hash":{},"data":data,"loc":{"start":{"line":58,"column":59},"end":{"line":58,"column":77}}}) : helper)))
    + "</span>\r\n							</td>\r\n						</tr>\r\n\r\n						<tr>\r\n							<td colspan=\"4\" class=\"deposit-details-remaining-amount\">\r\n								<span class=\"deposit-details-remaining-amount-label\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Remaining Amount:",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":64,"column":61},"end":{"line":64,"column":94}}}))
    + " </span>\r\n								<span class=\"deposit-details-remaining-amount-value\">"
    + alias3(((helper = (helper = compilerNameLookup(helpers,"remainingFormatted") || (depth0 != null ? compilerNameLookup(depth0,"remainingFormatted") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"remainingFormatted","hash":{},"data":data,"loc":{"start":{"line":65,"column":61},"end":{"line":65,"column":84}}}) : helper)))
    + "</span>\r\n							</td>\r\n						</tr>\r\n					</tfoot>\r\n				</table>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "				<div class=\"deposit-details-row\">\r\n					<div class=\"deposit-details-deposit-message\">\r\n					"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"This Deposit has not been applied to any invoices yet.",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":73,"column":5},"end":{"line":73,"column":75}}}))
    + "\r\n					</div>\r\n				</div>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "								<div class=\"deposit-details-method\">\r\n									<div data-view=\"PaymentMethod\"></div>\r\n								</div>\r\n";
},"9":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "						<div class=\"deposit-details-info-card-grid\">\r\n							<div class=\"deposit-details-info-card\">\r\n								<span class=\"deposit-details-memo-title\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Memo:",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":102,"column":49},"end":{"line":102,"column":70}}}))
    + "</span>\r\n								<span class=\"deposit-details-memo-value\">"
    + alias3(((helper = (helper = compilerNameLookup(helpers,"memo") || (depth0 != null ? compilerNameLookup(depth0,"memo") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"memo","hash":{},"data":data,"loc":{"start":{"line":103,"column":49},"end":{"line":103,"column":57}}}) : helper)))
    + "</span>\r\n							</div>\r\n						</div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, alias4="function";

  return "<section class=\"deposit-details\">\r\n	<header>\r\n		<h2 class=\"deposit-details-header-title\">\r\n			"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Deposit <span class=\"deposit-details-number\">#$(0)</span>",(depth0 != null ? compilerNameLookup(depth0,"tranId") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":4,"column":3},"end":{"line":4,"column":83}}}))
    + "\r\n			<span class=\"deposit-details-deposit-payment\">"
    + alias3(((helper = (helper = compilerNameLookup(helpers,"paymentFormatted") || (depth0 != null ? compilerNameLookup(depth0,"paymentFormatted") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"paymentFormatted","hash":{},"data":data,"loc":{"start":{"line":5,"column":49},"end":{"line":5,"column":69}}}) : helper)))
    + "</span>\r\n		</h2>\r\n		<a href=\"/transactionhistory\" class=\"deposit-details-back-btn\">\r\n			"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"&lt; Back to Transaction History",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":8,"column":3},"end":{"line":8,"column":51}}}))
    + "\r\n		</a>\r\n	</header>\r\n\r\n	<div class=\"deposit-details-header-information\">\r\n		<div class=\"deposit-details-row\">\r\n			<div class=\"deposit-details-header-col-left\">\r\n				<p class=\"deposit-details-date-info\">\r\n					<span class=\"deposit-details-date-label\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Date: ",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":16,"column":46},"end":{"line":16,"column":68}}}))
    + "</span>\r\n					<span class=\"deposit-details-date-value\"> "
    + alias3(((helper = (helper = compilerNameLookup(helpers,"tranDate") || (depth0 != null ? compilerNameLookup(depth0,"tranDate") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"tranDate","hash":{},"data":data,"loc":{"start":{"line":17,"column":47},"end":{"line":17,"column":59}}}) : helper)))
    + "</span>\r\n				</p>\r\n			</div>\r\n			<div class=\"deposit-details-header-col-right\">\r\n				<p class=\"deposit-details-status-info\">\r\n					 <span class=\"deposit-details-status-label\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Status: ",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":22,"column":49},"end":{"line":22,"column":73}}}))
    + "</span>\r\n					 <span class=\"deposit-details-status-value\">"
    + alias3(((helper = (helper = compilerNameLookup(helpers,"status") || (depth0 != null ? compilerNameLookup(depth0,"status") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"status","hash":{},"data":data,"loc":{"start":{"line":23,"column":49},"end":{"line":23,"column":59}}}) : helper)))
    + "</span>\r\n				</p>\r\n			</div>\r\n		</div>\r\n\r\n		<div class=\"deposit-details-row\">\r\n			<div class=\"deposit-details-button-container\">\r\n			<a href=\""
    + ((stack1 = ((helper = (helper = compilerNameLookup(helpers,"downloadPDFURL") || (depth0 != null ? compilerNameLookup(depth0,"downloadPDFURL") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"downloadPDFURL","hash":{},"data":data,"loc":{"start":{"line":30,"column":12},"end":{"line":30,"column":32}}}) : helper))) != null ? stack1 : "")
    + "\" target=\"_blank\" class=\"deposit-details-button-download-as-pdf\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Download as PDF",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":30,"column":97},"end":{"line":30,"column":128}}}))
    + "</a>\r\n			</div>\r\n		</div>\r\n	</div>\r\n\r\n	<div class=\"deposit-details-accordion-divider\">\r\n		<div class=\"deposit-details-accordion-head\">\r\n			<a class=\"deposit-details-accordion-head-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#deposit-applied-to-invoices\" aria-expanded=\"true\" aria-controls=\"deposit-applied-to-invoices\">\r\n				"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Applied to Invoices",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":38,"column":4},"end":{"line":38,"column":39}}}))
    + "\r\n				<i class=\"deposit-details-accordion-toggle-icon\"></i>\r\n			</a>\r\n		</div>\r\n		<div class=\"deposit-details-accordion-body collapse "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showOpenedAccordion") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":42,"column":54},"end":{"line":42,"column":90}}})) != null ? stack1 : "")
    + "\" id=\"deposit-applied-to-invoices\" role=\"tabpanel\" data-target=\"#deposit-applied-to-invoices\">\r\n			<div class=\"deposit-details-accordion-container-table\">\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showInvoices") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data,"loc":{"start":{"line":44,"column":4},"end":{"line":76,"column":11}}})) != null ? stack1 : "")
    + "			</div>\r\n		</div>\r\n	</div>\r\n\r\n	<div class=\"deposit-details-accordion-divider\">\r\n		<div class=\"deposit-details-accordion-head\">\r\n			<a class=\"deposit-details-accordion-head-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#deposit-billing\" aria-expanded=\"true\" aria-controls=\"deposit-billing\">\r\n				"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Billing & Payment Method",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":84,"column":4},"end":{"line":84,"column":44}}}))
    + "\r\n				<i class=\"deposit-details-accordion-toggle-icon\"></i>\r\n			</a>\r\n		</div>\r\n		<div class=\"deposit-details-accordion-body collapse "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showOpenedAccordion") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":88,"column":54},"end":{"line":88,"column":90}}})) != null ? stack1 : "")
    + "\" id=\"deposit-billing\" role=\"tabpanel\" data-target=\"#deposit-billing\">\r\n			<div class=\"deposit-details-accordion-container\">\r\n				<div class=\"deposit-details-row\">\r\n					<div class=\"deposit-details-info-card-grid\">\r\n						<div class=\"deposit-details-info-card\">\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showPaymentMethod") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":93,"column":7},"end":{"line":97,"column":14}}})) != null ? stack1 : "")
    + "						</div>\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showMemo") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":99,"column":6},"end":{"line":106,"column":13}}})) != null ? stack1 : "")
    + "					</div>\r\n				</div>\r\n			</div>\r\n		</div>\r\n	</div>\r\n</section>\r\n\r\n\r\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'deposit_details'; return template;});