define('order_wizard_showpayments_module.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "        <div class=\"order-wizard-showpayments-module-billing-address\">\n            <h3 class=\"order-wizard-showpayments-module-section-header\">\n                "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(alias1,"Billing Address",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":7,"column":16},"end":{"line":7,"column":47}}}))
    + "\n            </h3>\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showBillingAddress") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data,"loc":{"start":{"line":9,"column":12},"end":{"line":15,"column":19}}})) != null ? stack1 : "")
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showEditBillingButton") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":16,"column":12},"end":{"line":20,"column":19}}})) != null ? stack1 : "")
    + "        </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "            <div data-view=\"Billing.Address\"></div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "            <a class=\"order-wizard-showpayments-module-billing-address-edit\" data-action=\"edit-module\" href=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"editBillingUrl") || (depth0 != null ? compilerNameLookup(depth0,"editBillingUrl") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"editBillingUrl","hash":{},"data":data,"loc":{"start":{"line":12,"column":109},"end":{"line":12,"column":127}}}) : helper)))
    + "?force=true\">\n                "
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Please select a valid billing address",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":13,"column":16},"end":{"line":13,"column":69}}}))
    + "\n            </a>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "            <a class=\"order-wizard-showpayments-module-billing-address-edit\" data-action=\"edit-module\" href=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"editBillingUrl") || (depth0 != null ? compilerNameLookup(depth0,"editBillingUrl") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"editBillingUrl","hash":{},"data":data,"loc":{"start":{"line":17,"column":109},"end":{"line":17,"column":127}}}) : helper)))
    + "?force=true\">\n                "
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Back to edit billing information",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":18,"column":16},"end":{"line":18,"column":64}}}))
    + "\n            </a>\n";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "            <h3 class=\"order-wizard-showpayments-module-section-header\">\n                "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(alias1,"Payment Type",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":27,"column":16},"end":{"line":27,"column":44}}}))
    + "\n            </h3>\n            <div class=\"order-wizard-showpayments-module-payment-methods-summary\">\n                <div data-view=\"PaymentMethods.Collection\"></div>\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showGiftcertificates") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":31,"column":16},"end":{"line":35,"column":23}}})) != null ? stack1 : "")
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showGuestEmail") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":36,"column":16},"end":{"line":40,"column":23}}})) != null ? stack1 : "")
    + "            </div>\n";
},"9":function(container,depth0,helpers,partials,data) {
    return "                <br>\n                <b>"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Gift Certificates",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":33,"column":19},"end":{"line":33,"column":52}}}))
    + "</b><br>\n                <div data-view=\"GiftCertificates.Collection\"></div>\n";
},"11":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                <div>\n                    <h5>"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"guestEmail") || (depth0 != null ? compilerNameLookup(depth0,"guestEmail") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"guestEmail","hash":{},"data":data,"loc":{"start":{"line":38,"column":24},"end":{"line":38,"column":38}}}) : helper)))
    + "</h5>\n                </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<section class=\"order-wizard-showpayments-module-details\">\n    <div class=\"order-wizard-showpayments-module-details-body\">\n\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showBilling") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":8},"end":{"line":22,"column":15}}})) != null ? stack1 : "")
    + "\n        <div class=\"order-wizard-showpayments-module-payment-method\">\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showPayments") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":25,"column":12},"end":{"line":42,"column":19}}})) != null ? stack1 : "")
    + "        </div>\n    </div>\n</section>\n\n\n\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'order_wizard_showpayments_module'; return template;});