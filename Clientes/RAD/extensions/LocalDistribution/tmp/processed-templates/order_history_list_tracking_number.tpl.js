define('order_history_list_tracking_number.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "    <div class=\"order-history-list-tracking-number-control\">\n        <button class=\"order-history-list-tracking-number-control-button\" data-toggle=\"dropdown\">\n            "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(alias1,"Track Packages",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":4,"column":12},"end":{"line":4,"column":42}}}))
    + "\n            <i class=\"order-history-list-tracking-number-control-toggle-icon\"></i>\n        </button>\n        <div class=\"order-history-list-tracking-number-control-numbers collapsed\">\n            <ul>\n"
    + ((stack1 = compilerNameLookup(helpers,"each").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"trackingNumbers") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":9,"column":16},"end":{"line":13,"column":25}}})) != null ? stack1 : "")
    + "            </ul>\n        </div>\n    </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.escapeExpression;

  return "                    <li>\n                        <a target=\"_blank\" class=\"order-history-list-tracking-number-control-numbers-link\" data-action=\"tracking-number\" href=\""
    + alias1(container.lambda(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"trackingNumber") : depth0)) != null ? compilerNameLookup(stack1,"value") : stack1), depth0))
    + "\">"
    + alias1((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Track Shipment",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":11,"column":169},"end":{"line":11,"column":200}}}))
    + "</a>\n                    </li>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"showTracking") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":17,"column":7}}})) != null ? stack1 : "");
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'order_history_list_tracking_number'; return template;});