define('requestquote_wizard_module_items.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        <h3 class=\"requestquote-wizard-module-items-title\">\n            "
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"title") || (depth0 != null ? compilerNameLookup(depth0,"title") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"title","hash":{},"data":data,"loc":{"start":{"line":4,"column":12},"end":{"line":4,"column":21}}}) : helper)))
    + "\n        </h3>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, alias4="function";

  return "        <div data-type=\"alert-placeholder-header\"></div>\n        <button class=\"quote-wizard-actions-button-addtocart\" data-action=\"add-items-to-cart\" "
    + ((stack1 = compilerNameLookup(helpers,"unless").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isAtLeastOneItemChecked") : depth0),{"name":"unless","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":10,"column":94},"end":{"line":11,"column":62}}})) != null ? stack1 : "")
    + ">\n            "
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Add Items to Cart",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":12,"column":12},"end":{"line":12,"column":45}}}))
    + "\n        </button>\n        <button class=\"quote-wizard-actions-button-download\" "
    + ((stack1 = compilerNameLookup(helpers,"unless").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"allowShare") : depth0),{"name":"unless","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":14,"column":61},"end":{"line":14,"column":104}}})) != null ? stack1 : "")
    + ">\n            <a href=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"pdfUrl") || (depth0 != null ? compilerNameLookup(depth0,"pdfUrl") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"pdfUrl","hash":{},"data":data,"loc":{"start":{"line":15,"column":21},"end":{"line":15,"column":31}}}) : helper)))
    + "\" target=\"_blank\" data-action=\"print\">\n                <i class=\"print-icon\" data-toggle=\"tooltip\" title=\""
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Download Project",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":16,"column":67},"end":{"line":16,"column":99}}}))
    + "\"></i>\n            </a>\n        </button>\n\n        <table class=\"requestquote-wizard-module-items-table\">\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showHeaders") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":21,"column":12},"end":{"line":49,"column":19}}})) != null ? stack1 : "")
    + "            <tbody data-view=\"Items.Collection\" data-generalClass=\"requestquote-wizard-module-items-item\"></tbody>\n        </table>\n        <h3 class=\"item-list-total\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Total: ",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":52,"column":36},"end":{"line":52,"column":59}}}))
    + alias3(((helper = (helper = compilerNameLookup(helpers,"totalPrice") || (depth0 != null ? compilerNameLookup(depth0,"totalPrice") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"totalPrice","hash":{},"data":data,"loc":{"start":{"line":52,"column":59},"end":{"line":52,"column":73}}}) : helper)))
    + "</h3>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return " disabled ";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                <thead class=\"requestquote-wizard-module-items-header\" item-id=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"itemId") || (depth0 != null ? compilerNameLookup(depth0,"itemId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"itemId","hash":{},"data":data,"loc":{"start":{"line":22,"column":80},"end":{"line":22,"column":90}}}) : helper)))
    + "\" data-id=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"itemId") || (depth0 != null ? compilerNameLookup(depth0,"itemId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"itemId","hash":{},"data":data,"loc":{"start":{"line":22,"column":101},"end":{"line":22,"column":111}}}) : helper)))
    + "\">\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showSelectAll") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":23,"column":16},"end":{"line":35,"column":23}}})) != null ? stack1 : "")
    + "                <th class=\"requestquote-wizard-module-items-header-image\" name=\"item-image\">\n                    "
    + alias4((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Item",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":37,"column":20},"end":{"line":37,"column":40}}}))
    + "\n                </th>\n                <th class=\"requestquote-wizard-module-items-header-totalprice\" name=\"item-totalprice\">\n                    <!-- "
    + alias4((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"List Price",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":40,"column":25},"end":{"line":40,"column":51}}}))
    + " -->\n                </th>\n                <th class=\"requestquote-wizard-module-items-header-quantity\" name=\"item-quantity\">\n                    "
    + alias4((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Quantity",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":43,"column":20},"end":{"line":43,"column":44}}}))
    + "\n                </th>\n                <th class=\"requestquote-wizard-module-items-header-actions\" name=\"item-actions\">\n                    <!-- "
    + alias4((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Quantity",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":46,"column":25},"end":{"line":46,"column":49}}}))
    + " -->\n                </th>\n                </thead>\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                    <th class=\"list-header-view-select-all\">\n                        <label class=\"list-header-view-select-all-label\" for=\"select-all\">\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"unselectedLength") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.program(10, data, 0),"data":data,"loc":{"start":{"line":26,"column":28},"end":{"line":32,"column":35}}})) != null ? stack1 : "")
    + "                        </label>\n                    </th>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "                                <input type=\"checkbox\" name=\"select-all\" id=\"select-all\"\n                                       data-action=\"select-all\">"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Select All ($(0))",(depth0 != null ? compilerNameLookup(depth0,"collectionLength") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":28,"column":64},"end":{"line":28,"column":114}}}))
    + "\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "                                <input type=\"checkbox\" name=\"select-all\" id=\"select-all\" data-action=\"unselect-all\"\n                                       checked>"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Unselect All ($(0))",(depth0 != null ? compilerNameLookup(depth0,"collectionLength") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":31,"column":47},"end":{"line":31,"column":99}}}))
    + "\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"requestquote-wizard-module-items\">\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showTitle") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":4},"end":{"line":6,"column":11}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"hasItems") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":4},"end":{"line":53,"column":11}}})) != null ? stack1 : "")
    + "</div>\n\n\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'requestquote_wizard_module_items'; return template;});