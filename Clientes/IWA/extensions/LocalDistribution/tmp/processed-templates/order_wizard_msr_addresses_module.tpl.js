define('order_wizard_msr_addresses_module.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "	<h3 class=\"order-wizard-msr-addresses-module-section-header\">\r\n		"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"title") || (depth0 != null ? compilerNameLookup(depth0,"title") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"title","hash":{},"data":data,"loc":{"start":{"line":3,"column":2},"end":{"line":3,"column":11}}}) : helper)))
    + "\r\n	</h3>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "	<a class=\"order-wizard-msr-addresses-module-address-link\" data-action=\"add-edit-addreses-link\">"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Add/Edit Addresses",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":11,"column":96},"end":{"line":11,"column":130}}}))
    + "</a>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"isAddressListLengthGreaterThan0") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.program(12, data, 0),"data":data,"loc":{"start":{"line":14,"column":0},"end":{"line":47,"column":8}}})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "	<div id=\"address-module-list-placeholder\" "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showManageValue") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":15,"column":43},"end":{"line":15,"column":102}}})) != null ? stack1 : "")
    + " class=\"order-wizard-msr-addresses-module-container\">\r\n\r\n		<div data-view=\"Address.List\"></div>\r\n\r\n"
    + ((stack1 = compilerNameLookup(helpers,"unless").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"hasEnoughValidAddresses") : depth0),{"name":"unless","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":19,"column":3},"end":{"line":31,"column":13}}})) != null ? stack1 : "")
    + "	</div>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    var helper;

  return "data-manage=\""
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"manageValue") || (depth0 != null ? compilerNameLookup(depth0,"manageValue") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"manageValue","hash":{},"data":data,"loc":{"start":{"line":15,"column":79},"end":{"line":15,"column":94}}}) : helper)))
    + "\"";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "			<p class=\"order-wizard-msr-addresses-module-new-address-title\">"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(alias1,"New Address",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":20,"column":66},"end":{"line":20,"column":93}}}))
    + "</p>\r\n			<div id=\"address-module-form-placeholder\" "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showManageValue") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":21,"column":45},"end":{"line":21,"column":104}}})) != null ? stack1 : "")
    + " class=\"order-wizard-msr-addresses-module-form-placeholder\">\r\n				<div data-view=\"New.Address.Form\"></div>\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showSaveButton") : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":23,"column":4},"end":{"line":29,"column":11}}})) != null ? stack1 : "")
    + "			</div>\r\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "					<div class=\"form-actions\">\r\n						<button type=\"submit\" class=\"order-wizard-msr-addresses-module-save-button\" data-action=\"submit\">\r\n							"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Save Address",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":26,"column":7},"end":{"line":26,"column":35}}}))
    + "\r\n						</button>\r\n					</div>\r\n";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "		<p class=\"order-wizard-msr-addresses-module-new-address-title\">"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(alias1,"New Address",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":34,"column":65},"end":{"line":34,"column":92}}}))
    + "</p>\r\n		<div id=\"address-module-form-placeholder\" "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showManageValue") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":35,"column":44},"end":{"line":35,"column":103}}})) != null ? stack1 : "")
    + " class=\"order-wizard-msr-addresses-module-form-placeholder\">\r\n\r\n			<div data-view=\"New.Address.Form\"></div>\r\n\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showSaveButton") : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":39,"column":3},"end":{"line":45,"column":10}}})) != null ? stack1 : "")
    + "		</div>\r\n";
},"13":function(container,depth0,helpers,partials,data) {
    return "				<div class=\"form-actions\">\r\n					<button type=\"submit\" class=\"order-wizard-msr-addresses-module-save-button\" data-action=\"submit\">\r\n						"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Save Address",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":42,"column":6},"end":{"line":42,"column":34}}}))
    + "\r\n					</button>\r\n				</div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showTitle") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":5,"column":7}}})) != null ? stack1 : "")
    + "\r\n<div data-type=\"alert-placeholder-module\"></div>\r\n\r\n\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showCollapsedView") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data,"loc":{"start":{"line":10,"column":0},"end":{"line":48,"column":7}}})) != null ? stack1 : "")
    + "\r\n\r\n\r\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'order_wizard_msr_addresses_module'; return template;});