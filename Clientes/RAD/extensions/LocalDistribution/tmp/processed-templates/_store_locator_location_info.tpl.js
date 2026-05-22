define('_store_locator_location_info.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=container.hooks.helperMissing;

  return "<section>\n    <div>\n        <h3 class=\"store-title\">"
    + alias2(alias1(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"name") : stack1), depth0))
    + "</h3>\n    </div>\n    <div class=\"store-address-section\">\n        <div>\n            <h4>"
    + alias2((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias4).call(alias3,"STORE ADDRESS",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":7,"column":16},"end":{"line":7,"column":45}}}))
    + "</h4>\n        </div>\n        <div>\n            "
    + alias2(alias1(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"address1") : stack1), depth0))
    + "\n        </div>\n        <div>\n            "
    + alias2(alias1(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"address2") : stack1), depth0))
    + "\n        </div>\n        <div>\n            "
    + alias2(alias1(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"city") : stack1), depth0))
    + ", "
    + alias2(alias1(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"state") : stack1), depth0))
    + ", "
    + alias2(alias1(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"zip") : stack1), depth0))
    + "\n        </div>\n        <div>\n            <span>"
    + alias2(alias1(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"country") : stack1), depth0))
    + "</span>\n        </div>\n    </div>\n    <div class=\"store-phone-section\">\n        <div>\n            <h4>"
    + alias2((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias4).call(alias3,"PHONE",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":24,"column":16},"end":{"line":24,"column":37}}}))
    + "</h4>\n        </div>\n        <div>\n            "
    + alias2(alias1(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"phone") : stack1), depth0))
    + "\n        </div>\n    </div>\n    <div class=\"store-opening-section\">\n        <div>\n            <h4>"
    + alias2((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias4).call(alias3,"OPENING TIMES",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":32,"column":16},"end":{"line":32,"column":45}}}))
    + "</h4>\n        </div>\n        <div>\n            "
    + ((stack1 = alias1(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"openHours") : stack1), depth0)) != null ? stack1 : "")
    + "\n        </div>\n    </div>\n</section>\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/AwaLabs/StoreLocator/2.0.0/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = '_store_locator_location_info'; return template;});