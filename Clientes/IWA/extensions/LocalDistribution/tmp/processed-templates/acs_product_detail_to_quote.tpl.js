define('acs_product_detail_to_quote.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    return "	<div class=\"product-detail-to-quote-add-to-quote\">\r\n		<div class=\"product-detail-to-quote-loading\">"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Loading...",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":3,"column":47},"end":{"line":3,"column":73}}}))
    + "</div>\r\n	</div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"isQuotable") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":1},"end":{"line":20,"column":8}}})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "		<div class=\"product-detail-to-quote-add-to-quote\">\r\n			<button data-type=\"add-to-quote\" class=\"product-detail-to-quote-add-to-quote-button\" "
    + ((stack1 = compilerNameLookup(helpers,"unless").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isReadyForQuote") : depth0),{"name":"unless","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":88},"end":{"line":8,"column":136}}})) != null ? stack1 : "")
    + ">\r\n				"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(alias1,"Add to Quote",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":9,"column":4},"end":{"line":9,"column":32}}}))
    + "\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isLoggedIn") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(9, data, 0),"data":data,"loc":{"start":{"line":10,"column":4},"end":{"line":14,"column":11}}})) != null ? stack1 : "")
    + "			</button>\r\n		</div>\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showMessage") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":17,"column":2},"end":{"line":19,"column":9}}})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    return " disabled ";
},"7":function(container,depth0,helpers,partials,data) {
    return "					<div class=\"add-to-quote-subtext\">"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Select Options If Any",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":11,"column":39},"end":{"line":11,"column":76}}}))
    + "</div>\r\n";
},"9":function(container,depth0,helpers,partials,data) {
    return "					<div class=\"add-to-quote-subtext\">"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"You must be logged in to create a quote.",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":13,"column":39},"end":{"line":13,"column":95}}}))
    + "</div>\r\n";
},"11":function(container,depth0,helpers,partials,data) {
    return "			<div data-view=\"GlobalViews.FeedbackMessage\"></div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"isLoading") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":21,"column":7}}})) != null ? stack1 : "")
    + "\r\n\r\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/ACS/QuoteButton/1.0.1/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'acs_product_detail_to_quote'; return template;});