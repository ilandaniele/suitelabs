define('_store_locator_location_steps.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {});

  return "    <div>\n        <div class=\"adp-placemark\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"locationRouteModel") : depth0)) != null ? compilerNameLookup(stack1,"leg") : stack1)) != null ? compilerNameLookup(stack1,"start_address") : stack1), depth0))
    + "</div>\n        <div class=\"step-line\"><span>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"locationRouteModel") : depth0)) != null ? compilerNameLookup(stack1,"leg") : stack1)) != null ? compilerNameLookup(stack1,"distance") : stack1)) != null ? compilerNameLookup(stack1,"text") : stack1), depth0))
    + "</span><span> "
    + alias2((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(alias3,"About",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":5,"column":94},"end":{"line":5,"column":116}}}))
    + " "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"locationRouteModel") : depth0)) != null ? compilerNameLookup(stack1,"leg") : stack1)) != null ? compilerNameLookup(stack1,"duration") : stack1)) != null ? compilerNameLookup(stack1,"text") : stack1), depth0))
    + "</span></div>\n"
    + ((stack1 = compilerNameLookup(helpers,"each").call(alias3,((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"locationRouteModel") : depth0)) != null ? compilerNameLookup(stack1,"leg") : stack1)) != null ? compilerNameLookup(stack1,"steps") : stack1),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":8},"end":{"line":13,"column":17}}})) != null ? stack1 : "")
    + "        <div class=\"last-step\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"locationRouteModel") : depth0)) != null ? compilerNameLookup(stack1,"leg") : stack1)) != null ? compilerNameLookup(stack1,"end_address") : stack1), depth0))
    + "</div>\n    </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <div class=\"step-line\">\n            <span class=\"step-icon "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"maneuver") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":35},"end":{"line":8,"column":68}}})) != null ? stack1 : "")
    + " "
    + alias4(((helper = (helper = compilerNameLookup(helpers,"maneuver") || (depth0 != null ? compilerNameLookup(depth0,"maneuver") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"maneuver","hash":{},"data":data,"loc":{"start":{"line":8,"column":69},"end":{"line":8,"column":83}}}) : helper)))
    + "\"></span>\n            <span class=\"step-number\">"
    + alias4(((helper = (helper = compilerNameLookup(helpers,"indexPlusOne") || (data && compilerNameLookup(data,"indexPlusOne"))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"indexPlusOne","hash":{},"data":data,"loc":{"start":{"line":9,"column":38},"end":{"line":9,"column":57}}}) : helper)))
    + ".</span>\n            <span class=\"step-intructions\">"
    + ((stack1 = ((helper = (helper = compilerNameLookup(helpers,"instructions") || (depth0 != null ? compilerNameLookup(depth0,"instructions") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"instructions","hash":{},"data":data,"loc":{"start":{"line":10,"column":43},"end":{"line":10,"column":63}}}) : helper))) != null ? stack1 : "")
    + "</span>\n            <span class=\"step-distance\">"
    + alias4(container.lambda(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"distance") : depth0)) != null ? compilerNameLookup(stack1,"text") : stack1), depth0))
    + "</span>\n        </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return " with-icon";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<section class=\"location-steps-container\">\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"hasSteps") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":4},"end":{"line":16,"column":11}}})) != null ? stack1 : "")
    + "</section>\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/AwaLabs/StoreLocator/2.0.0/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = '_store_locator_location_steps'; return template;});