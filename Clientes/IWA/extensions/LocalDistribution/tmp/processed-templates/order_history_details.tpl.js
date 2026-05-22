define('order_history_details.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    return "	<div class=\"order-history-details-message-warning\" data-action=\"go-to-returns\">\r\n		"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"You have returns associated with this order. <a href=\"#\">View Details</a>",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":16,"column":2},"end":{"line":16,"column":91}}}))
    + "\r\n	</div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "	<div class=\"order-history-details-message-warning\">\r\n		"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"The checkout process of this purchase was not completed. To place order, please <a data-navigation=\"ignore-click\" href=\"$(0)\" >finalize your payment.</a>",((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"paymentevent") : stack1)) != null ? compilerNameLookup(stack1,"redirecturl") : stack1),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":22,"column":2},"end":{"line":22,"column":202}}}))
    + "\r\n	</div>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "				<p class=\"order-history-details-header-purchase-order-number-info\">\r\n					"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"<span class=\"order-history-details-header-purchase-order-info-purchase-order-number-label\">Purchase Order Number: </span> <span class=\"order-history-details-header-purchase-order-number\">$(0)</span>",((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"purchasenumber") : stack1),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":35,"column":5},"end":{"line":35,"column":240}}}))
    + "\r\n				</p>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "				<p class=\"order-history-details-header-quote-info\">\r\n					"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"<span class=\"order-history-details-header-quote-info-quote-label\">Created from: </span> <a href=\"$(0)\" class=\"order-history-details-header-date\">$(1)</a>",(depth0 != null ? compilerNameLookup(depth0,"quoteURL") : depth0),(depth0 != null ? compilerNameLookup(depth0,"quoteName") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":40,"column":5},"end":{"line":40,"column":192}}}))
    + "\r\n				</p>\r\n";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "\r\n			<div class=\"order-history-details-accordion-divider\">\r\n				<div class=\"order-history-details-accordion-head\">\r\n					<a class=\"order-history-details-accordion-head-toggle-secondary "
    + alias4(((helper = (helper = compilerNameLookup(helpers,"initiallyCollapsedArrow") || (depth0 != null ? compilerNameLookup(depth0,"initiallyCollapsedArrow") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"initiallyCollapsedArrow","hash":{},"data":data,"loc":{"start":{"line":67,"column":69},"end":{"line":67,"column":96}}}) : helper)))
    + "\" data-toggle=\"collapse\" data-target=\"#products-not-shipp\" aria-expanded=\"true\" aria-controls=\"products-not-shipp\">\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"nonShippableItemsLengthGreaterThan1") : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.program(12, data, 0),"data":data,"loc":{"start":{"line":68,"column":6},"end":{"line":72,"column":13}}})) != null ? stack1 : "")
    + "						<i class=\"order-history-details-accordion-toggle-icon-secondary\"></i>\r\n					</a>\r\n				</div>\r\n				<div class=\"order-history-details-accordion-body collapse "
    + alias4(((helper = (helper = compilerNameLookup(helpers,"initiallyCollapsed") || (depth0 != null ? compilerNameLookup(depth0,"initiallyCollapsed") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"initiallyCollapsed","hash":{},"data":data,"loc":{"start":{"line":76,"column":62},"end":{"line":76,"column":84}}}) : helper)))
    + "\" id=\"products-not-shipp\" role=\"tabpanel\" data-target=\"#products-not-shipp\">\r\n					<div class=\"order-history-details-accordion-container\" data-content=\"order-items-body\">\r\n						<table class=\"order-history-details-non-shippable-table\">\r\n							<tbody data-view=\"NonShippableLines\"></tbody>\r\n						</table>\r\n					</div>\r\n				</div>\r\n			</div>\r\n\r\n";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "						"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Products that don't require shipping ($(0))",((stack1 = (depth0 != null ? compilerNameLookup(depth0,"nonShippableLines") : depth0)) != null ? compilerNameLookup(stack1,"length") : stack1),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":69,"column":6},"end":{"line":69,"column":91}}}))
    + "\r\n";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "						"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Product that doesn't require shipping ($(0))",((stack1 = (depth0 != null ? compilerNameLookup(depth0,"nonShippableLines") : depth0)) != null ? compilerNameLookup(stack1,"length") : stack1),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":71,"column":6},"end":{"line":71,"column":92}}}))
    + "\r\n";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "						<div class=\"order-history-details-payment-info-cards\">\r\n							<div class=\"order-history-details-info-card\">\r\n								<h5 class=\"order-history-details-info-card-title\">\r\n									"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(alias1,"Payment Method",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":101,"column":9},"end":{"line":101,"column":39}}}))
    + "\r\n								</h5>\r\n								<div class=\"order-history-details-info-card-info\">\r\n									<div data-view='FormatPaymentMethod'></div>\r\n								</div>\r\n							</div>\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showBillAddress") : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":107,"column":7},"end":{"line":116,"column":14}}})) != null ? stack1 : "")
    + "						</div>\r\n";
},"15":function(container,depth0,helpers,partials,data) {
    return "							<div class=\"order-history-details-info-card\">\r\n								<h5 class=\"order-history-details-info-card-title\">\r\n									"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Bill to",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":110,"column":9},"end":{"line":110,"column":32}}}))
    + "\r\n								</h5>\r\n								<div class=\"order-history-details-info-card-info-billing\">\r\n									<div data-view=\"Billing.Address.View\"></div>\r\n								</div>\r\n							</div>\r\n";
},"17":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "			<!-- RETURNS AUTHORIZATIONS -->\r\n			<div class=\"order-history-details-accordion-divider\">\r\n				<div class=\"order-history-details-accordion-head collapsed\">\r\n					<a class=\"order-history-details-accordion-head-toggle-secondary\" data-toggle=\"collapse\" data-target=\"#returns-authorizations\" aria-expanded=\"true\" aria-controls=\"returns-authorizations\">\r\n						"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"<span>Returns ($(0))</span>",((stack1 = (depth0 != null ? compilerNameLookup(depth0,"returnAuthorizations") : depth0)) != null ? compilerNameLookup(stack1,"totalLines") : stack1),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":136,"column":6},"end":{"line":136,"column":81}}}))
    + "\r\n						<i class=\"order-history-details-accordion-toggle-icon-secondary\"></i>\r\n					</a>\r\n				</div>\r\n				<div class=\"order-history-details-accordion-body collapse\" id=\"returns-authorizations\" role=\"tabpanel\" data-target=\"#returns-authorizations\">\r\n					<div class=\"order-history-details-accordion-container\" data-content=\"order-items-body\">\r\n						<div data-view=\"ReturnAutorization\"></div>\r\n					</div>\r\n				</div>\r\n			</div>\r\n			<!-- RETURNS AUTHORIZATIONS ENDS -->\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, alias4="function", alias5=container.lambda;

  return "<a href=\"/purchases\" class=\"order-history-details-back-btn\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"&lt; Back to Purchases",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":1,"column":60},"end":{"line":1,"column":98}}}))
    + "</a>\r\n<section>\r\n	<header>\r\n		<h2 class=\"order-history-details-order-title\" data-origin='"
    + alias3(((helper = (helper = compilerNameLookup(helpers,"originName") || (depth0 != null ? compilerNameLookup(depth0,"originName") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"originName","hash":{},"data":data,"loc":{"start":{"line":4,"column":61},"end":{"line":4,"column":75}}}) : helper)))
    + "'>\r\n			<span class=\"order-history-details-order-title\">"
    + alias3(((helper = (helper = compilerNameLookup(helpers,"title") || (depth0 != null ? compilerNameLookup(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":5,"column":51},"end":{"line":5,"column":60}}}) : helper)))
    + " </span><b> <span class=\"order-history-details-order-number\">"
    + alias3(alias5(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"tranid") : stack1), depth0))
    + "</span></b>\r\n			<span class=\"order-history-details-total-formatted\">\r\n				"
    + alias3(alias5(((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"summary") : stack1)) != null ? compilerNameLookup(stack1,"total_formatted") : stack1), depth0))
    + "\r\n			</span>\r\n		</h2>\r\n	</header>\r\n\r\n	<div data-type=\"alert-placeholder\"></div>\r\n\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showReturnAuthorizations") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":14,"column":1},"end":{"line":18,"column":8}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showPaymentEventFail") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":20,"column":1},"end":{"line":24,"column":8}}})) != null ? stack1 : "")
    + "\r\n	<!-- HEADER INFORMATION -->\r\n	<div class=\"order-history-details-header-information\">\r\n		<div class=\"order-history-details-header-row\">\r\n			<div class=\"order-history-details-header-col-left\">\r\n				<p class=\"order-history-details-header-date-info\">\r\n					<span class=\"order-history-details-header-date-info-date-label\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Date:",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":31,"column":69},"end":{"line":31,"column":90}}}))
    + " </span> <span class=\"order-history-details-header-date\">"
    + alias3(alias5(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"trandate") : stack1), depth0))
    + "</span>\r\n				</p>\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showPurchaseOrderNumber") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":33,"column":4},"end":{"line":37,"column":11}}})) != null ? stack1 : "")
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showQuoteDetail") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":38,"column":4},"end":{"line":42,"column":11}}})) != null ? stack1 : "")
    + "			</div>\r\n			<div class=\"order-history-details-header-col-right\">\r\n				<p class=\"order-history-details-header-status-info\">\r\n					<strong>"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Status:",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":46,"column":13},"end":{"line":46,"column":36}}}))
    + " </strong> <span class=\"order-history-details-header-status\">"
    + alias3(alias5(((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"status") : stack1)) != null ? compilerNameLookup(stack1,"name") : stack1), depth0))
    + "</span>\r\n				</p>\r\n			</div>\r\n			<div class=\"order-history-details-header-amount\">\r\n				<p class=\"order-history-details-header-amount-info\">\r\n					"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"<span class=\"order-history-details-header-amount-info-amount-label\">Amount: </span> <span class=\"order-history-details-header-amount-number\">$(0)</span>",((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"summary") : stack1)) != null ? compilerNameLookup(stack1,"total_formatted") : stack1),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":51,"column":5},"end":{"line":51,"column":203}}}))
    + "\r\n				</p>\r\n			</div>\r\n\r\n		</div>\r\n	</div>\r\n\r\n	<div class=\"order-history-details-row\">\r\n		<div class=\"order-history-details-content-col\">\r\n\r\n			<div data-view=\"OrderPackages\"></div>\r\n\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showNonShippableLines") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":63,"column":3},"end":{"line":85,"column":10}}})) != null ? stack1 : "")
    + "\r\n			<!-- PAYMENT INFORMATION -->\r\n			<div class=\"order-history-details-accordion-divider\">\r\n				<div class=\"order-history-details-accordion-head\">\r\n					<a class=\"order-history-details-accordion-head-toggle-secondary  "
    + alias3(((helper = (helper = compilerNameLookup(helpers,"initiallyCollapsedArrow") || (depth0 != null ? compilerNameLookup(depth0,"initiallyCollapsedArrow") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"initiallyCollapsedArrow","hash":{},"data":data,"loc":{"start":{"line":90,"column":70},"end":{"line":90,"column":97}}}) : helper)))
    + "\" data-toggle=\"collapse\" data-target=\"#order-payment-info\" aria-expanded=\"true\" aria-controls=\"order-payment-info\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Payment Information",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":90,"column":212},"end":{"line":90,"column":247}}}))
    + "\r\n						<i class=\"order-history-details-accordion-toggle-icon-secondary\"></i>\r\n					</a>\r\n				</div>\r\n				<div class=\"order-history-details-accordion-body collapse "
    + alias3(((helper = (helper = compilerNameLookup(helpers,"initiallyCollapsed") || (depth0 != null ? compilerNameLookup(depth0,"initiallyCollapsed") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"initiallyCollapsed","hash":{},"data":data,"loc":{"start":{"line":94,"column":62},"end":{"line":94,"column":84}}}) : helper)))
    + "\" id=\"order-payment-info\" role=\"tabpanel\" data-target=\"#order-payment-info\">\r\n					<div class=\"order-history-details-accordion-container\" data-content=\"order-items-body\">\r\n\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showPaymentMethod") : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":97,"column":6},"end":{"line":118,"column":13}}})) != null ? stack1 : "")
    + "\r\n\r\n						<div class=\"order-history-details-payment\" data-view=\"Payments\"></div>\r\n\r\n						<div class=\"order-history-details-payment-others\" data-view=\"OtherPayments\"></div>\r\n\r\n					</div>\r\n				</div>\r\n			</div>\r\n\r\n			<!-- PAYMENT INFORMATION ENDS -->\r\n\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showReturnAuthorizations") : depth0),{"name":"if","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":131,"column":3},"end":{"line":147,"column":10}}})) != null ? stack1 : "")
    + "		</div>\r\n\r\n		<!-- SUMMARY -->\r\n		<div class=\"order-history-details-summary\" data-view=\"Summary\"></div>\r\n		<!-- SUMMARY ENDS -->\r\n	</div>\r\n</section>\r\n\r\n\r\n\r\n\r\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'order_history_details'; return template;});