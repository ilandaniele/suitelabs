define('creditcard_edit.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    return "<a href=\"/\" class=\"creditcard-edit-button-back\">\r\n	<i class=\"creditcard-edit-button-back-icon\"></i>\r\n	"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Back to Account",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":4,"column":1},"end":{"line":4,"column":32}}}))
    + "\r\n</a>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "	<h2>\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isNew") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data,"loc":{"start":{"line":11,"column":2},"end":{"line":15,"column":9}}})) != null ? stack1 : "")
    + "	</h2>\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isCollectionEmpty") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":17,"column":1},"end":{"line":19,"column":8}}})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    return "		"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Add a new Credit Card",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":12,"column":2},"end":{"line":12,"column":39}}}))
    + "\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "		"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Edit Credit Card",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":14,"column":2},"end":{"line":14,"column":34}}}))
    + "\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "	<p>"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"For faster checkouts, please enter your payment information below",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":18,"column":4},"end":{"line":18,"column":85}}}))
    + "</p>\r\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "		<div class=\"creditcard-edit-body\">\r\n";
},"12":function(container,depth0,helpers,partials,data) {
    return "		</div>\r\n";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "		<div class=\""
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isModal") : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.program(17, data, 0),"data":data,"loc":{"start":{"line":34,"column":14},"end":{"line":34,"column":98}}})) != null ? stack1 : "")
    + "\">\r\n			<button type=\"submit\" class=\"creditcard-edit-form-button-submit\">\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isNew") : depth0),{"name":"if","hash":{},"fn":container.program(19, data, 0),"inverse":container.program(21, data, 0),"data":data,"loc":{"start":{"line":36,"column":4},"end":{"line":40,"column":11}}})) != null ? stack1 : "")
    + "			</button>\r\n\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isModalOrCollectionLength") : depth0),{"name":"if","hash":{},"fn":container.program(23, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":43,"column":3},"end":{"line":47,"column":10}}})) != null ? stack1 : "")
    + "		</div>\r\n";
},"15":function(container,depth0,helpers,partials,data) {
    return " creditcard-edit-footer-modal ";
},"17":function(container,depth0,helpers,partials,data) {
    return " creditcard-edit-footer ";
},"19":function(container,depth0,helpers,partials,data) {
    return "				"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Add Card",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":37,"column":4},"end":{"line":37,"column":28}}}))
    + "\r\n";
},"21":function(container,depth0,helpers,partials,data) {
    return "				"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Update Card",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":39,"column":4},"end":{"line":39,"column":31}}}))
    + "\r\n";
},"23":function(container,depth0,helpers,partials,data) {
    return "			<button class=\"creditcard-edit-form-button-cancel\" data-dismiss=\"modal\">\r\n				"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Cancel",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":45,"column":4},"end":{"line":45,"column":26}}}))
    + "\r\n			</button>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showBackToAccount") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":6,"column":7}}})) != null ? stack1 : "")
    + "\r\n<section class=\"creditcard-edit\">\r\n"
    + ((stack1 = compilerNameLookup(helpers,"unless").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isInModalOrHideHeader") : depth0),{"name":"unless","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":9,"column":1},"end":{"line":20,"column":12}}})) != null ? stack1 : "")
    + "\r\n	<form action=\"CreditCard.Service.ss\" method=\"POST\">\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isModal") : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":23,"column":2},"end":{"line":25,"column":10}}})) != null ? stack1 : "")
    + "\r\n			<div data-view=\"CreditCard.Form\"></div>\r\n\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isModal") : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":29,"column":3},"end":{"line":31,"column":9}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showFooter") : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":33,"column":2},"end":{"line":49,"column":9}}})) != null ? stack1 : "")
    + "\r\n	</form>\r\n</section>\r\n\r\n\r\n\r\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'creditcard_edit'; return template;});