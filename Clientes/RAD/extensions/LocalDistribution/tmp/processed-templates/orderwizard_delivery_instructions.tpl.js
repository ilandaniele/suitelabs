define('orderwizard_delivery_instructions.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    return "        <h4 class=\"order-wizard-deliveryinstructions-module-title\">"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Delivery Specifications",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":3,"column":67},"end":{"line":3,"column":106}}}))
    + "</h4>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function";

  return "            <label for=\"liftgate\">\n                <input\n                    "
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"isTemporarlyDisabled") || (depth0 != null ? compilerNameLookup(depth0,"isTemporarlyDisabled") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"isTemporarlyDisabled","hash":{},"data":data,"loc":{"start":{"line":8,"column":20},"end":{"line":8,"column":44}}}) : helper)))
    + "\n                        data-action=\"change-delivery-option\"\n                        data-option=\"liftGate\"\n                        type=\"checkbox\"\n                        name=\"liftgate\"\n                        id=\"liftgate\"\n                        class=\"order-wizard-shipmethod-module-checkbox\"\n                        "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"liftgateChecked") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":15,"column":24},"end":{"line":15,"column":61}}})) != null ? stack1 : "")
    + "\n                        value=\"T\"\n                        data-unchecked-value=\"F\"\n                />\n                <span>\n                "
    + ((stack1 = ((helper = (helper = compilerNameLookup(helpers,"liftGateTitle") || (depth0 != null ? compilerNameLookup(depth0,"liftGateTitle") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"liftGateTitle","hash":{},"data":data,"loc":{"start":{"line":20,"column":16},"end":{"line":20,"column":35}}}) : helper))) != null ? stack1 : "")
    + " "
    + ((stack1 = ((helper = (helper = compilerNameLookup(helpers,"liftGateDescription") || (depth0 != null ? compilerNameLookup(depth0,"liftGateDescription") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"liftGateDescription","hash":{},"data":data,"loc":{"start":{"line":20,"column":36},"end":{"line":20,"column":61}}}) : helper))) != null ? stack1 : "")
    + "\n                </span>\n            </label>\n\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "checked";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function";

  return "            <label for=\"residentialaddress\">\n                <input\n                    "
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"isTemporarlyDisabled") || (depth0 != null ? compilerNameLookup(depth0,"isTemporarlyDisabled") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"isTemporarlyDisabled","hash":{},"data":data,"loc":{"start":{"line":28,"column":20},"end":{"line":28,"column":44}}}) : helper)))
    + "\n                        data-action=\"change-delivery-option\"\n                        data-option=\"residentialAddress\"\n                        type=\"checkbox\"\n                        id=\"residentialaddress\"\n                        name=\"residentialaddress\"\n                        class=\"order-wizard-shipmethod-module-checkbox\"\n                        "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"residentialAddressChecked") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":35,"column":24},"end":{"line":35,"column":71}}})) != null ? stack1 : "")
    + "\n                        value=\"T\"\n                        data-unchecked-value=\"F\"\n                >\n                <span>\n                    "
    + ((stack1 = ((helper = (helper = compilerNameLookup(helpers,"residentialAddressTitle") || (depth0 != null ? compilerNameLookup(depth0,"residentialAddressTitle") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"residentialAddressTitle","hash":{},"data":data,"loc":{"start":{"line":40,"column":20},"end":{"line":40,"column":49}}}) : helper))) != null ? stack1 : "")
    + " "
    + ((stack1 = ((helper = (helper = compilerNameLookup(helpers,"residentialAddressDescription") || (depth0 != null ? compilerNameLookup(depth0,"residentialAddressDescription") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"residentialAddressDescription","hash":{},"data":data,"loc":{"start":{"line":40,"column":50},"end":{"line":40,"column":85}}}) : helper))) != null ? stack1 : "")
    + "\n                </span>\n            </label>\n";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=container.hooks.helperMissing;

  return "        <div class=\"white_glove_section\">\n            <label class=\"label_custbody_awa_white_glove "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"whiteGloveDisabled") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":46,"column":57},"end":{"line":46,"column":98}}})) != null ? stack1 : "")
    + "\" for=\"custbody_awa_white_glove\">\n                "
    + alias2(compilerNameLookup(helpers,"log").call(alias1,depth0,{"name":"log","hash":{},"data":data,"loc":{"start":{"line":47,"column":16},"end":{"line":47,"column":28}}}))
    + "\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isTrade") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":48,"column":16},"end":{"line":61,"column":23}}})) != null ? stack1 : "")
    + "                <span>\n                    "
    + alias2((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias3).call(alias1,(depth0 != null ? compilerNameLookup(depth0,"whiteGloveTitle") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":63,"column":20},"end":{"line":63,"column":49}}}))
    + "\n                </span>\n            </label>\n            <span class=\"wg-message\">"
    + alias2(((helper = (helper = compilerNameLookup(helpers,"whiteGloveMessage") || (depth0 != null ? compilerNameLookup(depth0,"whiteGloveMessage") : depth0)) != null ? helper : alias3),(typeof helper === "function" ? helper.call(alias1,{"name":"whiteGloveMessage","hash":{},"data":data,"loc":{"start":{"line":66,"column":37},"end":{"line":66,"column":58}}}) : helper)))
    + "</span>\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"whiteGloveChecked") : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":67,"column":12},"end":{"line":119,"column":19}}})) != null ? stack1 : "")
    + "        </div>\n";
},"9":function(container,depth0,helpers,partials,data) {
    return "disabled";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "                <input\n                        data-action=\"change-delivery-option\"\n                        data-option=\"custbody_awa_white_glove\"\n                        type=\"checkbox\"\n                        id=\"custbody_awa_white_glove\"\n                        name=\"custbody_awa_white_glove\"\n                        class=\"order-wizard-shipmethod-module-checkbox\"\n                    "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"whiteGloveChecked") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":56,"column":20},"end":{"line":56,"column":59}}})) != null ? stack1 : "")
    + "\n                    "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"whiteGloveDisabled") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":57,"column":20},"end":{"line":57,"column":61}}})) != null ? stack1 : "")
    + "\n                        value=\"T\"\n                        data-unchecked-value=\"F\"\n                >\n";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, alias4=container.lambda;

  return "                <div data-type=\"alert-placeholder-module\"></div>\n                <span class=\"wg-customer-information\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Please provide customer information for delivery updates:",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":69,"column":54},"end":{"line":69,"column":127}}}))
    + "</span>\n                <small class=\"wg-edit-fields\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Required",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":70,"column":46},"end":{"line":70,"column":70}}}))
    + "<span class=\"wg-fields-group-label-required\">*</span></small>\n                <div class=\"wg-fields-group\" data-validation=\"control-group\">\n                    <label for=\"custbody_wg_full_name\" class=\"wg-fields-group-label\">\n                        "
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Full Name",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":73,"column":24},"end":{"line":73,"column":49}}}))
    + "\n                        <span class=\"wg-fields-group-label-required\">*</span>\n                    </label>\n                    <div class=\"wg-fields-group-form-controls\" data-validation=\"control\">\n                        <input\n                                data-action=\"wg-input-field-option\"\n                                data-option=\"custbody_wg_full_name\"\n                                type=\"text\"\n                                id=\"custbody_wg_full_name\"\n                                name=\"custbody_wg_full_name\"\n                                value=\""
    + alias3(alias4(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"options") : depth0)) != null ? compilerNameLookup(stack1,"custbody_wg_full_name") : stack1), depth0))
    + "\"\n                        >\n                    </div>\n                </div>\n                <div class=\"wg-fields-group\" data-validation=\"control-group\">\n                    <label for=\"custbody_wg_email_address\" class=\"wg-fields-group-label\">\n                        "
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Email Address",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":89,"column":24},"end":{"line":89,"column":53}}}))
    + "\n                        <span class=\"wg-fields-group-label-required\">*</span>\n                    </label>\n                    <div class=\"wg-fields-group-form-controls\" data-validation=\"control\">\n                    <input\n                            data-action=\"wg-input-field-option\"\n                            data-option=\"custbody_wg_email_address\"\n                            type=\"text\"\n                            id=\"custbody_wg_email_address\"\n                            name=\"custbody_wg_email_address\"\n                            value=\""
    + alias3(alias4(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"options") : depth0)) != null ? compilerNameLookup(stack1,"custbody_wg_email_address") : stack1), depth0))
    + "\"\n                    >\n                    </div>\n                </div>\n                <div class=\"wg-fields-group\" data-validation=\"control-group\">\n                    <label for=\"custbody_wg_phone_number\" class=\"wg-fields-group-label\">\n                        "
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Phone Number",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":105,"column":24},"end":{"line":105,"column":52}}}))
    + "\n                        <span class=\"wg-fields-group-label-required\">*</span>\n                    </label>\n                    <div class=\"wg-fields-group-form-controls\" data-validation=\"control\">\n                        <input\n                                data-action=\"wg-input-field-option\"\n                                data-option=\"custbody_wg_phone_number\"\n                                type=\"text\"\n                                id=\"custbody_wg_phone_number\"\n                                name=\"custbody_wg_phone_number\"\n                                value=\""
    + alias3(alias4(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"options") : depth0)) != null ? compilerNameLookup(stack1,"custbody_wg_phone_number") : stack1), depth0))
    + "\"\n                        >\n                    </div>\n                </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"order-wizard-deliveryinstructions-module\">\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showTitle") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":4},"end":{"line":4,"column":11}}})) != null ? stack1 : "")
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"liftgateEnabled") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":4},"end":{"line":24,"column":11}}})) != null ? stack1 : "")
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"residentialAddressEnabled") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":25,"column":4},"end":{"line":43,"column":11}}})) != null ? stack1 : "")
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"whiteGloveEnabled") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":44,"column":4},"end":{"line":121,"column":11}}})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/AwaLabs/DeliveryInstructions/2.1.0/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'orderwizard_delivery_instructions'; return template;});