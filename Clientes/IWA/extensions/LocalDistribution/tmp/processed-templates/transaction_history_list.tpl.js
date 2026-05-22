define('transaction_history_list.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    return "	<a href=\"/\" class=\"transaction-history-list-button-back\">\r\n		<i class=\"transaction-history-list-button-back-icon\"></i>\r\n		"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Back to Account",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":4,"column":2},"end":{"line":4,"column":33}}}))
    + "\r\n	</a>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "				<table class=\"transaction-history-list-results-table\">\r\n					<thead class=\"transaction-history-list-headers\">\r\n						<tr>\r\n							<th class=\"transaction-history-list-headers-number\">\r\n								<span>"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Number",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":21,"column":14},"end":{"line":21,"column":36}}}))
    + "</span>\r\n							</th>\r\n							<th class=\"transaction-history-list-headers-date\">\r\n								<span>"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Date",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":24,"column":14},"end":{"line":24,"column":34}}}))
    + "</span>\r\n							</th>\r\n							<th class=\"transaction-history-list-headers-amount\">\r\n								<span>"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Amount",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":27,"column":14},"end":{"line":27,"column":36}}}))
    + "</span>\r\n							</th>\r\n							<th class=\"transaction-history-list-headers-status\">\r\n								<span>"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Status",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":30,"column":14},"end":{"line":30,"column":36}}}))
    + "</span>\r\n							</th>\r\n						</tr>\r\n					</thead>\r\n					<tbody data-view=\"Records.Collection\"></tbody>\r\n				</table>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"isLoading") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.program(8, data, 0),"data":data,"loc":{"start":{"line":37,"column":4},"end":{"line":43,"column":11}}})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    return "					<p class=\"transaction-history-list-empty\">"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Loading...",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":38,"column":47},"end":{"line":38,"column":73}}}))
    + "</p>\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "					<div class=\"transaction-history-list-empty-section\">\r\n						<h5>"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"No transactions were found",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":41,"column":10},"end":{"line":41,"column":52}}}))
    + "</h5>\r\n					</div>\r\n";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "			<div class=\"transaction-history-list-paginator\">\r\n				<div data-view=\"GlobalViews.Pagination\"></div>\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"showCurrentPage") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":50,"column":4},"end":{"line":52,"column":11}}})) != null ? stack1 : "")
    + "			</div>\r\n";
},"11":function(container,depth0,helpers,partials,data) {
    return "					<div data-view=\"GlobalViews.ShowCurrentPage\"></div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showBackToAccount") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":6,"column":7}}})) != null ? stack1 : "")
    + "\r\n<section class=\"transaction-history-list\">\r\n	<header class=\"transaction-history-list-header\">\r\n		<h2>"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"pageHeader") || (depth0 != null ? compilerNameLookup(depth0,"pageHeader") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"pageHeader","hash":{},"data":data,"loc":{"start":{"line":10,"column":6},"end":{"line":10,"column":20}}}) : helper)))
    + "</h2>		\r\n	</header>\r\n\r\n		<div data-view=\"ListHeader.View\"></div>\r\n\r\n		<div class=\"transaction-history-list-results-container\">\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isThereAnyResult") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data,"loc":{"start":{"line":16,"column":3},"end":{"line":44,"column":10}}})) != null ? stack1 : "")
    + "		</div>\r\n\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showPagination") : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":47,"column":2},"end":{"line":54,"column":9}}})) != null ? stack1 : "")
    + "</section>\r\n\r\n\r\n\r\n\r\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'transaction_history_list'; return template;});