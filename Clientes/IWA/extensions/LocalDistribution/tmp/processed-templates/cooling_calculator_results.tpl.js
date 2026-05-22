define('cooling_calculator_results.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    return "                    "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Preliminary Recommended Cooling Units",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":6,"column":20},"end":{"line":6,"column":73}}}))
    + "\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "                    "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Recommended Cooling Units for $(0)",(depth0 != null ? compilerNameLookup(depth0,"tlcId") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":8,"column":20},"end":{"line":8,"column":76}}}))
    + "\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "            <div class=\"reusable-components\">\n                <div class=\"reusable-larger-p\">\n                    <h3 class=\"reusable-larger-italic\">"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"This is a preview of your results. You can continue making edits by returning to the previous page.",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":16,"column":55},"end":{"line":16,"column":172}}}))
    + "</h3>\n                </div>\n            </div>\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"items") : depth0),{"name":"each","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":24,"column":8},"end":{"line":101,"column":17}}})) != null ? stack1 : "");
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "            <div class=\"row cooling-calc-results-header cooling-calc-desktop-only\">\n                <div class=\"col-md-5\" style=\"font-size: 1.4rem;\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"$(0)",(depth0 != null ? compilerNameLookup(depth0,"unitType") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":26,"column":65},"end":{"line":26,"column":96}}}))
    + "</div>\n                <div class=\"col-md-1\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Number of Units",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":27,"column":38},"end":{"line":27,"column":71}}}))
    + "</div>\n                <div class=\"col-md-1\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"BTUH per Unit",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":28,"column":38},"end":{"line":28,"column":69}}}))
    + "</div>\n                <div class=\"col-md-1\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Ductable Airflows",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":29,"column":38},"end":{"line":29,"column":73}}}))
    + "</div>\n                <div class=\"col-md-1\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Exposure",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":30,"column":38},"end":{"line":30,"column":64}}}))
    + "</div>\n                <div class=\"col-md-3\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Notes",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":31,"column":38},"end":{"line":31,"column":61}}}))
    + "</div>\n            </div>\n\n            <div class=\"row cooling-calc-results-header cooling-calc-mobile-only\">\n                <div class=\"col-md-12\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"$(0)",(depth0 != null ? compilerNameLookup(depth0,"unitType") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":35,"column":39},"end":{"line":35,"column":70}}}))
    + "</div>\n            </div>\n\n"
    + ((stack1 = compilerNameLookup(helpers,"each").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"itemList") : depth0),{"name":"each","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":38,"column":12},"end":{"line":100,"column":21}}})) != null ? stack1 : "");
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                <div class=\"row cooling-calc-results-row\">\n                    <div class=\"col-md-5\">\n                        <a href=\"#\" data-touchpoint=\"home\" data-hashtag=\"#product/"
    + alias4(((helper = (helper = compilerNameLookup(helpers,"id") || (depth0 != null ? compilerNameLookup(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":41,"column":82},"end":{"line":41,"column":88}}}) : helper)))
    + "\" class=\"thermal-load-item-link\">\n                            <img src=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"thumbnail") || (depth0 != null ? compilerNameLookup(depth0,"thumbnail") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"thumbnail","hash":{},"data":data,"loc":{"start":{"line":42,"column":38},"end":{"line":42,"column":51}}}) : helper)))
    + "\" alt=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"name") || (depth0 != null ? compilerNameLookup(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":42,"column":58},"end":{"line":42,"column":66}}}) : helper)))
    + "\">\n                            <span>"
    + alias4(((helper = (helper = compilerNameLookup(helpers,"name") || (depth0 != null ? compilerNameLookup(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":43,"column":34},"end":{"line":43,"column":42}}}) : helper)))
    + "</span>\n                        </a>\n                    </div>\n\n                    <div class=\"col-md-1\">\n                        <div class=\"cooling-calc-vertical-align\">\n                            <span class=\"cooling-calc-mobile-only\">"
    + alias4((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Number of Units:",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":49,"column":67},"end":{"line":49,"column":101}}}))
    + " </span>\n                            "
    + alias4(((helper = (helper = compilerNameLookup(helpers,"units") || (depth0 != null ? compilerNameLookup(depth0,"units") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"units","hash":{},"data":data,"loc":{"start":{"line":50,"column":28},"end":{"line":50,"column":37}}}) : helper)))
    + "\n                        </div>\n                    </div>\n\n                    <div class=\"col-md-1\">\n                        <div class=\"cooling-calc-vertical-align\">\n                            <span class=\"cooling-calc-mobile-only\">"
    + alias4((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"BTUH per Unit:",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":56,"column":67},"end":{"line":56,"column":99}}}))
    + " </span>\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"temp") : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.program(12, data, 0),"data":data,"loc":{"start":{"line":57,"column":28},"end":{"line":61,"column":35}}})) != null ? stack1 : "")
    + "                        </div>\n                    </div>\n\n                    <div class=\"col-md-1\">\n                        <div class=\"cooling-calc-vertical-align\">\n                            <span class=\"cooling-calc-mobile-only\">"
    + alias4((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Ductable Airflows:",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":67,"column":67},"end":{"line":67,"column":103}}}))
    + " </span>\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"airflowsHot") : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.program(19, data, 0),"data":data,"loc":{"start":{"line":68,"column":28},"end":{"line":80,"column":35}}})) != null ? stack1 : "")
    + "                        </div>\n                    </div>\n\n                    <div class=\"col-md-1\">\n                        <div class=\"cooling-calc-vertical-align\">\n                            <span class=\"cooling-calc-mobile-only\">"
    + alias4((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Exposure:",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":86,"column":67},"end":{"line":86,"column":94}}}))
    + " </span>\n                            "
    + alias4(((helper = (helper = compilerNameLookup(helpers,"exposure_text") || (depth0 != null ? compilerNameLookup(depth0,"exposure_text") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"exposure_text","hash":{},"data":data,"loc":{"start":{"line":87,"column":28},"end":{"line":87,"column":45}}}) : helper)))
    + "\n                        </div>\n                    </div>\n\n                    <div class=\"col-md-3\">\n                        <div class=\"cooling-calc-vertical-align\">\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showNotes") : depth0),{"name":"if","hash":{},"fn":container.program(24, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":93,"column":28},"end":{"line":96,"column":35}}})) != null ? stack1 : "")
    + "                        </div>\n                    </div>\n                </div>\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "                                "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"$(0) @ $(1)F",(depth0 != null ? compilerNameLookup(depth0,"btuh") : depth0),(depth0 != null ? compilerNameLookup(depth0,"temp") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":58,"column":32},"end":{"line":58,"column":70}}}))
    + "\n";
},"12":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                                "
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"btuh") || (depth0 != null ? compilerNameLookup(depth0,"btuh") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"btuh","hash":{},"data":data,"loc":{"start":{"line":60,"column":32},"end":{"line":60,"column":40}}}) : helper)))
    + "\n";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"airflowsCold") : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.program(17, data, 0),"data":data,"loc":{"start":{"line":69,"column":32},"end":{"line":73,"column":39}}})) != null ? stack1 : "");
},"15":function(container,depth0,helpers,partials,data) {
    return "                                    "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Hot / Cold",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":70,"column":36},"end":{"line":70,"column":62}}}))
    + "\n";
},"17":function(container,depth0,helpers,partials,data) {
    return "                                    "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Hot",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":72,"column":36},"end":{"line":72,"column":55}}}))
    + "\n";
},"19":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"airflowsCold") : depth0),{"name":"if","hash":{},"fn":container.program(20, data, 0),"inverse":container.program(22, data, 0),"data":data,"loc":{"start":{"line":75,"column":32},"end":{"line":79,"column":39}}})) != null ? stack1 : "");
},"20":function(container,depth0,helpers,partials,data) {
    return "                                    "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Cold",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":76,"column":36},"end":{"line":76,"column":56}}}))
    + "\n";
},"22":function(container,depth0,helpers,partials,data) {
    return "                                    "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"--",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":78,"column":36},"end":{"line":78,"column":54}}}))
    + "\n";
},"24":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing;

  return "                                <span class=\"cooling-calc-mobile-only\">"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Notes:",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":94,"column":71},"end":{"line":94,"column":95}}}))
    + " </span>\n                                "
    + ((stack1 = ((helper = (helper = compilerNameLookup(helpers,"notes") || (depth0 != null ? compilerNameLookup(depth0,"notes") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"notes","hash":{},"data":data,"loc":{"start":{"line":95,"column":32},"end":{"line":95,"column":43}}}) : helper))) != null ? stack1 : "")
    + "\n";
},"26":function(container,depth0,helpers,partials,data) {
    return "        <p>"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"There are no recommended units for this request, please try again later.",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":103,"column":11},"end":{"line":103,"column":101}}}))
    + "</p>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"container-fluid\">\n    <div class=\"row cooling-calc-results-title\">\n        <div class=\"col-md-12\">\n            <h2 class=\"row cooling-calc-results-title\">\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isPreview") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":5,"column":16},"end":{"line":9,"column":23}}})) != null ? stack1 : "")
    + "                <span class=\"cooling-calc-results-title-btuh\">"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"totalLoad") || (depth0 != null ? compilerNameLookup(depth0,"totalLoad") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"totalLoad","hash":{},"data":data,"loc":{"start":{"line":10,"column":62},"end":{"line":10,"column":75}}}) : helper)))
    + " BTUH</span>\n            </h2>\n            \n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isPreview") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":13,"column":12},"end":{"line":19,"column":19}}})) != null ? stack1 : "")
    + "        </div>\n    </div>\n\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"hasItems") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(26, data, 0),"data":data,"loc":{"start":{"line":23,"column":4},"end":{"line":104,"column":11}}})) != null ? stack1 : "")
    + "</div>";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/SuiteLabs/CoolingCalculator/1.0.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'cooling_calculator_results'; return template;});