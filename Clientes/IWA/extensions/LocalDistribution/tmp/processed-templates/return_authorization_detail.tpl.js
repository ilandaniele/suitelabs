define('return_authorization_detail.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "					<p class=\"return-authorization-detail-header-info-from\">\r\n						<span class=\"return-authorization-detail-header-info-from-label\">\r\n							"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(alias1,"Created from:",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":19,"column":7},"end":{"line":19,"column":36}}}))
    + " \r\n						</span>\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showCreatedFromLink") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data,"loc":{"start":{"line":21,"column":6},"end":{"line":27,"column":13}}})) != null ? stack1 : "")
    + "					</p>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "						<a href=\"/purchases/view/"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"createdfrom") : stack1)) != null ? compilerNameLookup(stack1,"recordtype") : stack1), depth0))
    + "/"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"createdfrom") : stack1)) != null ? compilerNameLookup(stack1,"internalid") : stack1), depth0))
    + "\">\r\n							"
    + alias2((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Purchase #$(0)",((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"createdfrom") : stack1)) != null ? compilerNameLookup(stack1,"tranid") : stack1),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":23,"column":7},"end":{"line":23,"column":62}}}))
    + "\r\n						</a>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "							"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Purchase #$(0)",((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"createdfrom") : stack1)) != null ? compilerNameLookup(stack1,"name") : stack1),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":26,"column":7},"end":{"line":26,"column":60}}}))
    + "\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "							"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Returned Products ($(0))",(depth0 != null ? compilerNameLookup(depth0,"linesLength") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":58,"column":7},"end":{"line":58,"column":59}}}))
    + "\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "							"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Returned Product",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":60,"column":7},"end":{"line":60,"column":39}}}))
    + "\r\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "in";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "				<div class=\"return-authorization-detail-comments-row\">\r\n					<div class=\"return-authorization-detail-comments\">\r\n						<p>"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Comments:",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":85,"column":9},"end":{"line":85,"column":34}}}))
    + "</p>\r\n					\r\n							<blockquote>"
    + alias3((compilerNameLookup(helpers,"breaklines")||(depth0 && compilerNameLookup(depth0,"breaklines"))||alias2).call(alias1,((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"memo") : stack1),{"name":"breaklines","hash":{},"data":data,"loc":{"start":{"line":87,"column":19},"end":{"line":87,"column":44}}}))
    + "</blockquote>\r\n						\r\n					</div>\r\n				</div>\r\n";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "			<div class=\"return-authorization-detail-creditmemo-accordion-row\">\r\n				<div class=\"return-authorization-detail-creditmemo-accordion-divider\">\r\n					<div class=\"return-authorization-detail-creditmemo-accordion-head\">\r\n						<a class=\"return-authorization-detail-creditmemo-accordion-head-toggle "
    + alias4(((helper = (helper = compilerNameLookup(helpers,"initiallyCollapsedArrow") || (depth0 != null ? compilerNameLookup(depth0,"initiallyCollapsedArrow") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"initiallyCollapsedArrow","hash":{},"data":data,"loc":{"start":{"line":97,"column":77},"end":{"line":97,"column":104}}}) : helper)))
    + "\" data-toggle=\"collapse\" data-target=\"#creditmemo-applied-invoices\" aria-expanded=\"true\" aria-controls=\"creditmemo-applied-invoices\">\r\n							"
    + alias4((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Applied to Transactions",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":98,"column":7},"end":{"line":98,"column":46}}}))
    + "\r\n						<i class=\"return-authorization-detail-creditmemo-accordion-toggle-icon\"></i>\r\n						</a>\r\n					</div>\r\n					<div class=\"return-authorization-detail-creditmemo-accordion-body collapse "
    + alias4(((helper = (helper = compilerNameLookup(helpers,"initiallyCollapsed") || (depth0 != null ? compilerNameLookup(depth0,"initiallyCollapsed") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"initiallyCollapsed","hash":{},"data":data,"loc":{"start":{"line":102,"column":80},"end":{"line":102,"column":102}}}) : helper)))
    + "\" id=\"creditmemo-applied-invoices\" role=\"tabpanel\" data-target=\"#creditmemo-applied-invoices\">\r\n						<div data-content=\"items-body\">\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showInvoicesDetails") : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.program(17, data, 0),"data":data,"loc":{"start":{"line":104,"column":6},"end":{"line":135,"column":13}}})) != null ? stack1 : "")
    + "						</div>\r\n					</div>\r\n				</div>\r\n			</div>\r\n";
},"15":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, alias4=container.lambda;

  return "\r\n							<table class=\"return-authorization-detail-creditmemo-table-product\">\r\n								<thead class=\"return-authorization-detail-creditmemo-table-invoices-header\">\r\n									<th class=\"return-authorization-detail-creditmemo-table-invoices-header-title-record\"></th>\r\n									<th class=\"return-authorization-detail-creditmemo-table-invoices-header-date-record\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Date",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":109,"column":94},"end":{"line":109,"column":114}}}))
    + "</th>\r\n									<th class=\"return-authorization-detail-creditmemo-table-invoices-header-amount-record\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Amount",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":110,"column":96},"end":{"line":110,"column":118}}}))
    + "</th>\r\n								</thead>\r\n\r\n\r\n								<tbody data-view=\"Invoices.Collection\"></tbody>\r\n\r\n								<tfoot>\r\n								<tr>\r\n								<td class=\"return-authorization-detail-creditmemo-accordion-body-container-payment-total\" colspan=\"3\">\r\n									<p>\r\n										<span class=\"return-authorization-detail-creditmemo-accordion-body-container-payment-total-label\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Applied Subtotal: ",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":120,"column":108},"end":{"line":120,"column":142}}}))
    + "</span> \r\n										<span class=\"return-authorization-detail-creditmemo-accordion-body-container-payment-subtotal-value\">"
    + alias3(alias4(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"amountpaid_formatted") : stack1), depth0))
    + "</span>\r\n									</p>\r\n									<p>\r\n										<span class=\"return-authorization-detail-creditmemo-accordion-body-container-payment-total-label\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Remaining subtotal: ",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":124,"column":108},"end":{"line":124,"column":144}}}))
    + "</span> \r\n										<span class=\"return-authorization-detail-creditmemo-accordion-body-container-payment-total-value-remaining\">"
    + alias3(alias4(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"amountremaining_formatted") : stack1), depth0))
    + "</span>\r\n									</p>\r\n								</td>\r\n								</tr>\r\n								</tfoot>\r\n							</table>\r\n";
},"17":function(container,depth0,helpers,partials,data) {
    return "							<div class=\"return-authorization-detail-creditmemo-accordion-body-container-message\">\r\n								<p>"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"This return has not been applied yet.",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":133,"column":11},"end":{"line":133,"column":64}}}))
    + "</p>\r\n							</div>\r\n";
},"19":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "							"
    + alias3(((helper = (helper = compilerNameLookup(helpers,"itemsQuantityNumber") || (depth0 != null ? compilerNameLookup(depth0,"itemsQuantityNumber") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"itemsQuantityNumber","hash":{},"data":data,"loc":{"start":{"line":156,"column":7},"end":{"line":156,"column":30}}}) : helper)))
    + " "
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Items",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":156,"column":31},"end":{"line":156,"column":52}}}))
    + "\r\n";
},"21":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "							"
    + alias3(((helper = (helper = compilerNameLookup(helpers,"itemsQuantityNumber") || (depth0 != null ? compilerNameLookup(depth0,"itemsQuantityNumber") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"itemsQuantityNumber","hash":{},"data":data,"loc":{"start":{"line":158,"column":7},"end":{"line":158,"column":30}}}) : helper)))
    + " "
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Item",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":158,"column":31},"end":{"line":158,"column":51}}}))
    + "\r\n";
},"23":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.escapeExpression;

  return "				<p class=\"return-authorization-detail-summary-grid-float\">\r\n					<span class=\"return-authorization-detail-summary-amount-discount\">\r\n						"
    + alias1(container.lambda(((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"summary") : stack1)) != null ? compilerNameLookup(stack1,"discounttotal_formatted") : stack1), depth0))
    + "\r\n					</span>\r\n						"
    + alias1((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Discount Total",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":168,"column":6},"end":{"line":168,"column":36}}}))
    + "\r\n				</p>\r\n";
},"25":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.escapeExpression;

  return "				<p class=\"return-authorization-detail-summary-grid-float\">\r\n					<span class=\"return-authorization-detail-summary-amount-handling\">\r\n						"
    + alias1(container.lambda(((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"summary") : stack1)) != null ? compilerNameLookup(stack1,"handlingcost_formatted") : stack1), depth0))
    + "\r\n					</span>\r\n						"
    + alias1((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Handling Cost",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":183,"column":6},"end":{"line":183,"column":35}}}))
    + "\r\n				</p>\r\n";
},"27":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.escapeExpression;

  return "				<p class=\"return-authorization-detail-summary-grid-float\">\r\n					<span class=\"return-authorization-detail-summary-amount-shipping\">\r\n						"
    + alias1(container.lambda(((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"summary") : stack1)) != null ? compilerNameLookup(stack1,"shippingcost_formatted") : stack1), depth0))
    + "\r\n					</span>\r\n						"
    + alias1((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Shipping Cost",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":192,"column":6},"end":{"line":192,"column":35}}}))
    + "\r\n				</p>\r\n";
},"29":function(container,depth0,helpers,partials,data) {
    return "					<div class=\"return-authorization-detail-summary-cancel-request\">\r\n						<button class=\"return-authorization-detail-summary-cancel-request-button\" data-action=\"cancel\">"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Cancel Request",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":214,"column":101},"end":{"line":214,"column":131}}}))
    + "</button>\r\n					</div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, alias4=container.lambda, alias5="function";

  return "<a href=\"/returns\" class=\"return-authorization-detail-back\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"&lt; Back to Returns",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":1,"column":60},"end":{"line":1,"column":96}}}))
    + "</a>\r\n\r\n<article class=\"return-authorization-detail\">\r\n	<header>\r\n		<h2 class=\"return-authorization-detail-title\">\r\n			"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Return <span class=\"return-authorization-detail-number\">#$(0)</span>",((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"tranid") : stack1),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":6,"column":3},"end":{"line":6,"column":100}}}))
    + "\r\n			<span class=\"return-authorization-detail-header-total\"> "
    + alias3(alias4(((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"summary") : stack1)) != null ? compilerNameLookup(stack1,"total_formatted") : stack1), depth0))
    + " </span>\r\n		</h2>\r\n	</header>\r\n\r\n	<div data-type=\"alert-placeholder\"></div>\r\n\r\n	<div class=\"return-authorization-detail-header-info\">\r\n		<div class=\"return-authorization-detail-header-row\">\r\n			<div class=\"return-authorization-detail-header-info-left\">\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showCreatedFrom") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":16,"column":4},"end":{"line":29,"column":11}}})) != null ? stack1 : "")
    + "				<p class=\"return-authorization-detail-header-info-return-date\">\r\n					"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Date:",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":31,"column":5},"end":{"line":31,"column":26}}}))
    + " \r\n					<span class=\"return-authorization-detail-header-info-return-date-value\">"
    + alias3(alias4(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"trandate") : stack1), depth0))
    + "</span>\r\n				</p>\r\n				<p class=\"return-authorization-detail-header-info-amount\">\r\n					"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Amount: <span class=\"return-authorization-detail-header-info-amount-value\">$(0)</span>",((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"summary") : stack1)) != null ? compilerNameLookup(stack1,"total_formatted") : stack1),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":35,"column":5},"end":{"line":35,"column":137}}}))
    + "\r\n				</p>\r\n			</div>\r\n			<div class=\"return-authorization-detail-header-info-right\">\r\n				<p class=\"return-authorization-detail-status\">\r\n					<span class=\"return-authorization-detail-header-info-status-label\">\r\n						"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Status:",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":41,"column":6},"end":{"line":41,"column":29}}}))
    + "\r\n					</span>\r\n					<span class=\"return-authorization-detail-header-info-status-value\">\r\n						"
    + alias3(alias4(((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"status") : stack1)) != null ? compilerNameLookup(stack1,"name") : stack1), depth0))
    + "\r\n					</span>\r\n				</p>\r\n			</div>\r\n		</div>\r\n	</div>\r\n\r\n	<div class=\"return-authorization-detail-row\" name=\"return-content-layout\">\r\n		<div class=\"return-authorization-detail-content-col\">\r\n\r\n			<div class=\"return-authorization-detail-accordion-divider\">\r\n				<div class=\"return-authorization-detail-accordion-head\">	\r\n					<a href=\"#\" class=\"return-authorization-detail-head-toggle "
    + alias3(((helper = (helper = compilerNameLookup(helpers,"initiallyCollapsedArrow") || (depth0 != null ? compilerNameLookup(depth0,"initiallyCollapsedArrow") : depth0)) != null ? helper : alias2),(typeof helper === alias5 ? helper.call(alias1,{"name":"initiallyCollapsedArrow","hash":{},"data":data,"loc":{"start":{"line":56,"column":64},"end":{"line":56,"column":91}}}) : helper)))
    + "\" data-toggle=\"collapse\" data-target=\"#return-products\" aria-expanded=\"true\" aria-controls=\"return-products\">\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"linesLengthGreaterThan1") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.program(8, data, 0),"data":data,"loc":{"start":{"line":57,"column":6},"end":{"line":61,"column":13}}})) != null ? stack1 : "")
    + "						<i class=\"return-authorization-detail-head-toggle-icon\"></i>\r\n					</a>\r\n				</div>\r\n				<div class=\"return-authorization-detail-body collapse "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showOpenedAccordion") : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":65,"column":58},"end":{"line":65,"column":94}}})) != null ? stack1 : "")
    + "\" id=\"return-products\" role=\"tabpanel\" data-target=\"#return-products\">\r\n\r\n					<table class=\"return-authorization-detail-products-table lg2sm-first\">\r\n						<thead class=\"return-authorization-detail-headers\">\r\n					        <tr>\r\n					          	<th class=\"return-authorization-detail-headers-image\"></th>\r\n								<th class=\"return-authorization-detail-headers-product\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Product",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":71,"column":64},"end":{"line":71,"column":87}}}))
    + "</th>\r\n								<th class=\"return-authorization-detail-headers-quantity\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Qty",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":72,"column":65},"end":{"line":72,"column":84}}}))
    + "</th>\r\n								<th class=\"return-authorization-detail-headers-reason\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Reason",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":73,"column":63},"end":{"line":73,"column":85}}}))
    + "</th>\r\n								<th class=\"return-authorization-detail-headers-amount\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Amount",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":74,"column":63},"end":{"line":74,"column":85}}}))
    + "</th>\r\n					        </tr>\r\n				      	</thead>\r\n				      	<tbody data-view=\"Items.Collection\"></tbody>\r\n					</table>\r\n				</div>\r\n			</div>\r\n\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showComments") : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":82,"column":3},"end":{"line":91,"column":10}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showAppliesSection") : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":93,"column":3},"end":{"line":140,"column":10}}})) != null ? stack1 : "")
    + "		</div>\r\n\r\n		<div class=\"return-authorization-detail-summary-col\">\r\n			<div class=\"return-authorization-detail-summary-container\">\r\n				<h3 class=\"return-authorization-detail-summary-title\">\r\n					"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"ITEMS SUMMARY",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":146,"column":5},"end":{"line":146,"column":34}}}))
    + "\r\n				</h3>\r\n\r\n				<p class=\"return-authorization-detail-summary-grid-float\">\r\n					<span class=\"return-authorization-detail-summary-subtotal\">\r\n						"
    + alias3(alias4(((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"summary") : stack1)) != null ? compilerNameLookup(stack1,"subtotal_formatted") : stack1), depth0))
    + "\r\n					</span>\r\n					"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Subtotal",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":153,"column":5},"end":{"line":153,"column":29}}}))
    + "\r\n					<span class=\"return-authorization-detail-summary-subtotal-items\">\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"linesitemsNumberGreaterThan1") : depth0),{"name":"if","hash":{},"fn":container.program(19, data, 0),"inverse":container.program(21, data, 0),"data":data,"loc":{"start":{"line":155,"column":6},"end":{"line":159,"column":13}}})) != null ? stack1 : "")
    + "					</span>\r\n				</p>\r\n				\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showDiscountTotal") : depth0),{"name":"if","hash":{},"fn":container.program(23, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":163,"column":4},"end":{"line":170,"column":11}}})) != null ? stack1 : "")
    + "\r\n				<p class=\"return-authorization-detail-summary-grid-float\">\r\n					<span class=\"return-authorization-detail-summary-amount-tax\">\r\n						"
    + alias3(alias4(((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"summary") : stack1)) != null ? compilerNameLookup(stack1,"taxtotal_formatted") : stack1), depth0))
    + "\r\n					</span>\r\n						"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Tax Total",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":176,"column":6},"end":{"line":176,"column":31}}}))
    + "\r\n				</p>\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showHandlingTotal") : depth0),{"name":"if","hash":{},"fn":container.program(25, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":178,"column":4},"end":{"line":185,"column":11}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showShippingTotal") : depth0),{"name":"if","hash":{},"fn":container.program(27, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":187,"column":4},"end":{"line":194,"column":11}}})) != null ? stack1 : "")
    + "\r\n				<div class=\"return-authorization-detail-summary-total\">\r\n					<p class=\"return-authorization-detail-summary-grid-float\">\r\n						<span class=\"return-authorization-detail-summary-amount-total\">\r\n							"
    + alias3(alias4(((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"summary") : stack1)) != null ? compilerNameLookup(stack1,"total_formatted") : stack1), depth0))
    + "\r\n						</span>\r\n						"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"TOTAL",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":201,"column":6},"end":{"line":201,"column":27}}}))
    + "\r\n					</p>\r\n				</div>\r\n			</div>\r\n				<!-- DOWNLOAD AS PDF -->\r\n				<div class=\"return-authorization-detail-summary-pdf\">\r\n					<a class=\"return-authorization-detail-summary-pdf-download-button\" data-stdnav target=\"_blank\" href=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"downloadPDFURL") || (depth0 != null ? compilerNameLookup(depth0,"downloadPDFURL") : depth0)) != null ? helper : alias2),(typeof helper === alias5 ? helper.call(alias1,{"name":"downloadPDFURL","hash":{},"data":data,"loc":{"start":{"line":207,"column":106},"end":{"line":207,"column":124}}}) : helper)))
    + "\">\r\n						"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Download as PDF",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":208,"column":6},"end":{"line":208,"column":37}}}))
    + "\r\n					</a>\r\n				</div>\r\n\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isCancelable") : depth0),{"name":"if","hash":{},"fn":container.program(29, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":212,"column":4},"end":{"line":216,"column":11}}})) != null ? stack1 : "")
    + "			</div>\r\n	</div>\r\n</div>\r\n\r\n\r\n\r\n\r\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'return_authorization_detail'; return template;});