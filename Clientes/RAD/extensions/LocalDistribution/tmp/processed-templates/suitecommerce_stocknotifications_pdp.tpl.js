define('suitecommerce_stocknotifications_pdp.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing;

  return "<div class=\"stock-notifications-accordion accordion-head\">\n  <a class=\"accordion-head-toggle-custom"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isAccordionClosed") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":40},"end":{"line":3,"column":82}}})) != null ? stack1 : "")
    + "\"\n    data-toggle=\"collapse\"\n    data-target=\"#accordion-id\"\n    data-action=\"stocknotifications-dropdown-show\"\n    aria-expanded=\""
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isAccordionOpen") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data,"loc":{"start":{"line":7,"column":19},"end":{"line":7,"column":66}}})) != null ? stack1 : "")
    + "\"\n    aria-controls=\"accordion-id\"\n  >\n    "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Email me when item is back in stock",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":10,"column":4},"end":{"line":10,"column":55}}}))
    + "\n  </a>\n</div>\n<div id=\"accordion-id\"\n  class=\"accordion-body collapse"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isAccordionOpen") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":14,"column":32},"end":{"line":14,"column":65}}})) != null ? stack1 : "")
    + "\"\n  aria-expanded=\""
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isAccordionOpen") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data,"loc":{"start":{"line":15,"column":17},"end":{"line":15,"column":64}}})) != null ? stack1 : "")
    + "\"\n>\n  <div class=\"stocknotifications-form-wrapper\">\n    <p class=\"stocknotifications-subscribing-item\">"
    + ((stack1 = ((helper = (helper = compilerNameLookup(helpers,"subscribingToMessage") || (depth0 != null ? compilerNameLookup(depth0,"subscribingToMessage") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"subscribingToMessage","hash":{},"data":data,"loc":{"start":{"line":18,"column":51},"end":{"line":18,"column":77}}}) : helper))) != null ? stack1 : "")
    + "</p>\n    <div data-view=\"StockNotifications.Subscription.Create\"></div>\n  </div>\n</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return " collapsed";
},"4":function(container,depth0,helpers,partials,data) {
    return "true";
},"6":function(container,depth0,helpers,partials,data) {
    return "false";
},"8":function(container,depth0,helpers,partials,data) {
    return " in";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"showView") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":22,"column":7}}})) != null ? stack1 : "")
    + "\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/AwaLabs/BackInStockNotification/2.0.1/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'suitecommerce_stocknotifications_pdp'; return template;});