define('order_history_summary.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.escapeExpression;

  return "            <p class=\"order-history-summary-summary-grid-float\">\n\n                "
    + alias1((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? compilerNameLookup(depth0,"jewelry") : depth0)) != null ? compilerNameLookup(stack1,"text") : stack1),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":21,"column":16},"end":{"line":21,"column":42}}}))
    + "\n                <span class=\"order-history-summary-summary-amount-handling\">\n                    "
    + alias1(container.lambda(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"jewelry") : depth0)) != null ? compilerNameLookup(stack1,"flatrate_formatted") : stack1), depth0))
    + "\n                </span>\n            </p>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.escapeExpression;

  return "			<p class=\"order-history-summary-summary-grid-float\">\n				<span class=\"order-history-summary-summary-amount-handling\">\n					"
    + alias1(container.lambda(((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"summary") : stack1)) != null ? compilerNameLookup(stack1,"handlingcost_formatted") : stack1), depth0))
    + "\n				</span>\n				"
    + alias1((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Handling Total",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":33,"column":4},"end":{"line":33,"column":34}}}))
    + "\n			</p>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.escapeExpression;

  return "			<p class=\"order-history-summary-summary-grid-float\">\n				<span class=\"order-history-summary-summary-amount-certificate\">\n					"
    + alias1(container.lambda(((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"summary") : stack1)) != null ? compilerNameLookup(stack1,"giftcertapplied_formatted") : stack1), depth0))
    + "\n				</span>\n				"
    + alias1((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Gift Cert Total",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":42,"column":4},"end":{"line":42,"column":35}}}))
    + "\n			</p>\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "			<div data-view=\"CartPromocodeListView\"></div>\n";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.escapeExpression;

  return "			<p class=\"order-history-summary-summary-grid-float\">\n				<span class=\"order-history-summary-summary-amount-discount\">\n					"
    + alias1(container.lambda(((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"summary") : stack1)) != null ? compilerNameLookup(stack1,"discounttotal_formatted") : stack1), depth0))
    + "\n				</span>\n				"
    + alias1((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Discount Total",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":55,"column":4},"end":{"line":55,"column":34}}}))
    + "\n			</p>\n";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.escapeExpression;

  return "			<p class=\"order-history-summary-summary-grid-float\">\n				<span class=\"order-history-summary-summary-amount-shipping\">\n					"
    + alias1(container.lambda(((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"summary") : stack1)) != null ? compilerNameLookup(stack1,"shippingcost_formatted") : stack1), depth0))
    + "\n				</span>\n				"
    + alias1((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Shipping Total",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":64,"column":4},"end":{"line":64,"column":34}}}))
    + "\n			</p>\n";
},"13":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "			<p class=\"order-history-summary-summary-grid-float\">\n				"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Pick Up",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":69,"column":4},"end":{"line":69,"column":27}}}))
    + "\n				<span class=\"order-history-summary-pickup-label-free\"> "
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"FREE",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":70,"column":59},"end":{"line":70,"column":79}}}))
    + "</span>\n			</p>\n";
},"15":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"taxesPerType") : stack1),{"name":"each","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":74,"column":28},"end":{"line":81,"column":11}}})) != null ? stack1 : "");
},"16":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "\n			<p class=\"order-history-summary-summary-grid-float\">\n				<span class=\"order-history-summary-summary-amount-tax\">\n					"
    + alias3(((helper = (helper = compilerNameLookup(helpers,"taxTotal") || (depth0 != null ? compilerNameLookup(depth0,"taxTotal") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"taxTotal","hash":{},"data":data,"loc":{"start":{"line":77,"column":5},"end":{"line":77,"column":17}}}) : helper)))
    + "\n				</span>\n				"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,(depth0 != null ? compilerNameLookup(depth0,"taxTypeName") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":79,"column":4},"end":{"line":79,"column":29}}}))
    + "\n			</p>\n		";
},"18":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.escapeExpression;

  return "		<p class=\"order-history-summary-summary-grid-float\">\n			<span class=\"order-history-summary-summary-amount-tax\">\n				"
    + alias1(container.lambda(((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"summary") : stack1)) != null ? compilerNameLookup(stack1,"taxtotal_formatted") : stack1), depth0))
    + "\n			</span>\n			"
    + alias1((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"taxLabel") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":88,"column":3},"end":{"line":88,"column":25}}}))
    + "\n		</p>\n";
},"20":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.escapeExpression;

  return "		<p class=\"order-history-summary-summary-grid-float\">\n			<span class=\"order-history-summary-summary-amount-tax\">\n				"
    + alias1(container.lambda(((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"summary") : stack1)) != null ? compilerNameLookup(stack1,"tax2total_formatted") : stack1), depth0))
    + "\n			</span>\n			"
    + alias1((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"PST",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":97,"column":3},"end":{"line":97,"column":22}}}))
    + "\n		</p>\n";
},"22":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "			<!-- REORDER ALL ITEMS -->\n			<a href=\"/reorderItems?order_id="
    + alias2(alias1(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"internalid") : stack1), depth0))
    + "&order_number="
    + alias2(alias1(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"tranid") : stack1), depth0))
    + "\" class=\"order-history-summary-button-reorder\">\n				"
    + alias2((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Reorder All Items",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":114,"column":4},"end":{"line":114,"column":37}}}))
    + "\n			</a>\n";
},"24":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "			<a data-permissions=\"transactions.tranRtnAuth.2\" href=\"/returns/new/"
    + alias2(alias1(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"recordtype") : stack1), depth0))
    + "/"
    + alias2(alias1(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"internalid") : stack1), depth0))
    + "\" class=\"order-history-summary-button-request-return\">\n				"
    + alias2((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Request a Return",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":125,"column":4},"end":{"line":125,"column":36}}}))
    + "\n			</a>\n";
},"26":function(container,depth0,helpers,partials,data) {
    return "			<a class=\"order-history-summary-button-cancel-order\" data-action=\"cancel\">\n				"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Cancel Purchase",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":131,"column":4},"end":{"line":131,"column":35}}}))
    + "\n			</a>\n";
},"28":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "			<a data-permissions=\"\" href=\"/invoices/"
    + alias2(alias1(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"invoiceModel") : depth0)) != null ? compilerNameLookup(stack1,"internalid") : stack1), depth0))
    + "\" data-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"invoiceModel") : depth0)) != null ? compilerNameLookup(stack1,"internalid") : stack1), depth0))
    + "\" class=\"order-history-summary-button-view-invoice\">\n				"
    + alias2((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"View Invoice",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":137,"column":4},"end":{"line":137,"column":32}}}))
    + "\n			</a>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, alias4=container.lambda;

  return "<div class=\"order-history-summary-summary-col\">\n	<div class=\"order-history-summary-summary-container\">\n		<!-- SUMMARY -->\n		<h3 class=\"order-history-summary-summary-title\">\n			"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Summary",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":5,"column":3},"end":{"line":5,"column":26}}}))
    + "\n		</h3>\n        <div data-view=\"PurchaseDetailsSummary.AfterTitle\"></div>\n		<div class=\"order-history-summary-summary-subtotal\">\n			<p class=\"order-history-summary-summary-grid-float\">\n				<span class=\"order-history-summary-summary-amount-subtotal\">\n					"
    + alias3(alias4(((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"summary") : stack1)) != null ? compilerNameLookup(stack1,"subtotal_formatted") : stack1), depth0))
    + "\n				</span>\n				"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Subtotal",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":13,"column":4},"end":{"line":13,"column":28}}}))
    + "\n\n			</p>\n		</div>\n        <div data-view=\"PurchaseDetailsSummary.AfterSubtotal\"></div>\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,((stack1 = (depth0 != null ? compilerNameLookup(depth0,"jewelry") : depth0)) != null ? compilerNameLookup(stack1,"active") : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":18,"column":8},"end":{"line":26,"column":15}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showSummaryHandlingCost") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":28,"column":2},"end":{"line":35,"column":9}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showSummaryGiftCertificateTotal") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":37,"column":2},"end":{"line":44,"column":9}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showSummaryPromocode") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":46,"column":2},"end":{"line":48,"column":9}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showSummaryDiscount") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":50,"column":2},"end":{"line":57,"column":9}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showSummaryShippingCost") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":59,"column":2},"end":{"line":66,"column":9}}})) != null ? stack1 : "")
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showSummaryPickupCost") : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":67,"column":2},"end":{"line":72,"column":9}}})) != null ? stack1 : "")
    + "\n		"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"taxesPerType") : stack1),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":74,"column":2},"end":{"line":81,"column":18}}})) != null ? stack1 : "")
    + "\n\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"summary") : stack1)) != null ? compilerNameLookup(stack1,"taxtotal") : stack1),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":83,"column":2},"end":{"line":90,"column":9}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"summary") : stack1)) != null ? compilerNameLookup(stack1,"tax2total") : stack1),{"name":"if","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":92,"column":2},"end":{"line":99,"column":9}}})) != null ? stack1 : "")
    + "		<div class=\"order-history-summary-summary-total\">\n			<p class=\"order-history-summary-summary-grid-float\">\n				<span class=\"order-history-summary-summary-amount-total\">\n					"
    + alias3(alias4(((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"summary") : stack1)) != null ? compilerNameLookup(stack1,"total_formatted") : stack1), depth0))
    + "\n				</span>\n				"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Total",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":105,"column":4},"end":{"line":105,"column":25}}}))
    + "\n			</p>\n		</div>\n	</div>\n\n	<div class=\"order-history-summary-row-fluid\">\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showReorderAllItemsButton") : depth0),{"name":"if","hash":{},"fn":container.program(22, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":111,"column":2},"end":{"line":116,"column":9}}})) != null ? stack1 : "")
    + "\n		<!-- DOWNLOAD AS PDF -->\n		<a href=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"pdfUrl") || (depth0 != null ? compilerNameLookup(depth0,"pdfUrl") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"pdfUrl","hash":{},"data":data,"loc":{"start":{"line":119,"column":11},"end":{"line":119,"column":21}}}) : helper)))
    + "\" target=\"_blank\" class=\"order-history-summary-button-download-pdf\">\n			"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Download PDF",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":120,"column":3},"end":{"line":120,"column":31}}}))
    + "\n		</a>\n\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showRequestReturnButton") : depth0),{"name":"if","hash":{},"fn":container.program(24, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":123,"column":2},"end":{"line":127,"column":9}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showCancelButton") : depth0),{"name":"if","hash":{},"fn":container.program(26, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":129,"column":2},"end":{"line":133,"column":9}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showViewInvoiceButton") : depth0),{"name":"if","hash":{},"fn":container.program(28, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":135,"column":2},"end":{"line":139,"column":9}}})) != null ? stack1 : "")
    + "	</div>\n</div>\n\n\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'order_history_summary'; return template;});