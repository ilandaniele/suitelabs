define('return_authorization_form.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    return "	<a href=\"/\" class=\"return-authorization-form-button-back\">\r\n		<i class=\"return-authorization-form-button-back-icon\"></i>\r\n		"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Back to Account",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":4,"column":2},"end":{"line":4,"column":33}}}))
    + "\r\n	</a>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "						"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"<b>$(0)</b> products selected",(depth0 != null ? compilerNameLookup(depth0,"activeLinesLength") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":36,"column":6},"end":{"line":36,"column":69}}}))
    + "\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "						"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"<b>$(0)</b> product selected",(depth0 != null ? compilerNameLookup(depth0,"activeLinesLength") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":38,"column":6},"end":{"line":38,"column":68}}}))
    + "\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "						"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"<b>$(0)</b> items in total to return",(depth0 != null ? compilerNameLookup(depth0,"itemsToReturnLength") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":45,"column":6},"end":{"line":45,"column":78}}}))
    + "\r\n";
},"9":function(container,depth0,helpers,partials,data) {
    return "						"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"<b>$(0)</b> item in total to return",(depth0 != null ? compilerNameLookup(depth0,"itemsToReturnLength") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":47,"column":6},"end":{"line":47,"column":77}}}))
    + "\r\n";
},"11":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "			<div class=\"return-authorization-form-accordion-divider\">\r\n				<div class=\"return-authorization-form-accordion-head\">\r\n					<a class=\"return-authorization-form-accordion-head-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#return-authorization-form-products\" aria-expanded=\"true\" aria-controls=\"return-authorization-form-products\">\r\n						"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Products from original order not eligible for return ($(0))",(depth0 != null ? compilerNameLookup(depth0,"invalidLinesLength") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":57,"column":6},"end":{"line":57,"column":100}}}))
    + "\r\n					<i class=\"return-authorization-form-accordion-toggle-icon\"></i>\r\n					</a>\r\n				</div>\r\n				<div class=\"return-authorization-form-accordion-body collapse\" id=\"return-authorization-form-products\" role=\"tabpanel\" data-target=\"#return-authorization-form-products\">\r\n					<div data-content=\"items-body\">\r\n							<table class=\"return-authorization-form-products-list\">\r\n								<thead class=\"return-authorization-form-table-products-header\">\r\n									<th class=\"return-authorization-form-table-products-header-image\"></th>\r\n									<th class=\"return-authorization-form-table-products-header-product\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Product",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":66,"column":77},"end":{"line":66,"column":100}}}))
    + "</th>\r\n									<th class=\"return-authorization-form-table-products-header-qty\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Qty",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":67,"column":73},"end":{"line":67,"column":92}}}))
    + "</th>\r\n									<th class=\"return-authorization-form-table-products-header-unit-price\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Unit price",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":68,"column":80},"end":{"line":68,"column":106}}}))
    + "</th>\r\n									<th class=\"return-authorization-form-table-products-header-amount\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Amount",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":69,"column":76},"end":{"line":69,"column":98}}}))
    + "</th>\r\n								</thead>\r\n								<tbody data-view=\"Invalid.Lines.Collection\"></tbody>\r\n							</table>\r\n					</div>\r\n				</div>\r\n			</div>\r\n";
},"13":function(container,depth0,helpers,partials,data) {
    return "disabled";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showBackToAccount") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":6,"column":7}}})) != null ? stack1 : "")
    + "\r\n<section class=\"return-authorization-form\">\r\n	<header>\r\n		<h2 class=\"return-authorization-form-title\">"
    + alias4(((helper = (helper = compilerNameLookup(helpers,"pageHeader") || (depth0 != null ? compilerNameLookup(depth0,"pageHeader") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pageHeader","hash":{},"data":data,"loc":{"start":{"line":10,"column":46},"end":{"line":10,"column":60}}}) : helper)))
    + "</h2>\r\n	</header>\r\n\r\n	<div data-type=\"alert-placeholder\"></div>\r\n\r\n	<form class=\"return-authorization-form-form\">\r\n		<fieldset class=\"return-authorization-form-items-fieldset\">\r\n\r\n			<p class=\"return-authorization-form-items-info\">\r\n				"
    + alias4((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"<label class=\"return-authorization-form-items-fieldset-from-label\">From: </label><a href=\"$(0)\">Purchase #$(1)</a>",(depth0 != null ? compilerNameLookup(depth0,"createdFromURL") : depth0),((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"tranid") : stack1),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":19,"column":4},"end":{"line":19,"column":162}}}))
    + "\r\n			</p>\r\n			<input type=\"hidden\" name=\"type\" value=\""
    + alias4(alias5(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"recordtype") : stack1), depth0))
    + "\">\r\n\r\n\r\n			<h5 class=\"return-authorization-form-products-title\">"
    + alias4((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Select products to return",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":24,"column":56},"end":{"line":24,"column":97}}}))
    + "</h5>\r\n			<input type=\"hidden\" name=\"id\" value=\""
    + alias4(alias5(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"internalid") : stack1), depth0))
    + "\">\r\n			<div data-view=\"ListHeader\"></div>\r\n\r\n			<div class=\"return-authorization-form-list\">\r\n				<table class=\"return-authorization-form-returnable-products-table md2sm\">\r\n						<tbody data-view=\"Returnable.Lines.Collection\"></tbody>\r\n				</table>\r\n			</div>\r\n			<p>\r\n				<small class=\"return-authorization-form-counter-legend\">\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"activeLinesLengthGreaterThan1") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data,"loc":{"start":{"line":35,"column":5},"end":{"line":39,"column":12}}})) != null ? stack1 : "")
    + "				</small>\r\n			</p>\r\n			<p>\r\n				<small class=\"return-authorization-form-counter-legend\">\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"itemsToReturnLengthGreaterThan1") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(9, data, 0),"data":data,"loc":{"start":{"line":44,"column":5},"end":{"line":48,"column":12}}})) != null ? stack1 : "")
    + "				</small>\r\n			</p>\r\n		</fieldset>\r\n\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showInvalidLines") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":53,"column":2},"end":{"line":76,"column":9}}})) != null ? stack1 : "")
    + "\r\n		<fieldset class=\"return-authorization-form-comment-fieldset\">\r\n			<label class=\"return-authorization-form-comment-label\" for=\"comment\">"
    + alias4((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Add a comment <span class=\"return-authorization-form-comment-label-optional\">(optional)</span>",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":79,"column":72},"end":{"line":79,"column":182}}}))
    + "</label>\r\n			<textarea data-action=\"comments\"  class=\"return-authorization-form-comment\" rows=\"4\">"
    + alias4(((helper = (helper = compilerNameLookup(helpers,"comments") || (depth0 != null ? compilerNameLookup(depth0,"comments") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"comments","hash":{},"data":data,"loc":{"start":{"line":80,"column":88},"end":{"line":80,"column":100}}}) : helper)))
    + "</textarea>\r\n		</fieldset>\r\n		<div class=\"form-actions\">\r\n			<button type=\"submit\" class=\"return-authorization-form-submit-button\" "
    + ((stack1 = compilerNameLookup(helpers,"unless").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"hasAtLeastOneActiveLine") : depth0),{"name":"unless","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":83,"column":73},"end":{"line":83,"column":127}}})) != null ? stack1 : "")
    + ">"
    + alias4((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Submit Request",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":83,"column":128},"end":{"line":83,"column":158}}}))
    + "</button>\r\n		</div>\r\n	</form>\r\n</section>\r\n\r\n\r\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'return_authorization_form'; return template;});