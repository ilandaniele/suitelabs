define('cart_item_actions.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isEditable") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":12},"end":{"line":6,"column":19}}})) != null ? stack1 : "")
    + "                    <button type=\"button\" class=\"cart-toggle-button dropdown-toggle button-secondary button-small\" id=\"dropdownMenuButton\" data-toggle=\"dropdown\" aria-expanded=\"false\"><i></i></button>\n            <ul class=\"dropdown-menu cart-item-actions-item-list-actionable-edit-content\" aria-labelledby=\"dropdownMenuButton\" role=\"menu\">\n                <li>\n                    <a class=\"cart-item-actions-item-list-actionable-edit-content-remove\" data-action=\"remove-item\" data-internalid=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"lineId") || (depth0 != null ? compilerNameLookup(depth0,"lineId") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"lineId","hash":{},"data":data,"loc":{"start":{"line":10,"column":133},"end":{"line":10,"column":143}}}) : helper)))
    + "\">\n                        "
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Remove",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":11,"column":24},"end":{"line":11,"column":46}}}))
    + "\n                    </a>\n                </li>\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showSaveForLateButton") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":14,"column":16},"end":{"line":20,"column":23}}})) != null ? stack1 : "")
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isTrade") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":21,"column":16},"end":{"line":27,"column":23}}})) != null ? stack1 : "")
    + "            </ul>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "                <a href=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"editUrl") || (depth0 != null ? compilerNameLookup(depth0,"editUrl") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"editUrl","hash":{},"data":data,"loc":{"start":{"line":5,"column":25},"end":{"line":5,"column":36}}}) : helper)))
    + "\" class=\"button-secondary button-small\" data-toggle=\"show-in-modal\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Edit",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":5,"column":104},"end":{"line":5,"column":124}}}))
    + "</a>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "                    <li>\n                        <a class=\"cart-item-actions-item-list-actionable-edit-content-saveforlater\" data-action=\"save-for-later-item\" data-internalid=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"lineId") || (depth0 != null ? compilerNameLookup(depth0,"lineId") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"lineId","hash":{},"data":data,"loc":{"start":{"line":16,"column":151},"end":{"line":16,"column":161}}}) : helper)))
    + "\">\n                            "
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Move to Favorites",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":17,"column":28},"end":{"line":17,"column":61}}}))
    + "\n                        </a>\n                    </li>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "                    <li>\n                        <a class=\"cart-item-actions-item-list-actionable-edit-content-move-market-wizard\" data-action=\"move-market-wizard\" data-internalid=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"lineId") || (depth0 != null ? compilerNameLookup(depth0,"lineId") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"lineId","hash":{},"data":data,"loc":{"start":{"line":23,"column":156},"end":{"line":23,"column":166}}}) : helper)))
    + "\">\n                            "
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Move to Market Wizard",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":24,"column":28},"end":{"line":24,"column":65}}}))
    + "\n                        </a>\n                    </li>\n";
},"8":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "            <a class=\"cart-item-actions-item-list-actionable-edit-content-remove\" data-action=\"remove-item\" data-internalid=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"lineId") || (depth0 != null ? compilerNameLookup(depth0,"lineId") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"lineId","hash":{},"data":data,"loc":{"start":{"line":30,"column":125},"end":{"line":30,"column":135}}}) : helper)))
    + "\">\n                "
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Remove",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":31,"column":16},"end":{"line":31,"column":38}}}))
    + "\n            </a>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"cart-item-actions-links\">\n    <div class=\"cart-item-actions-item-list-actionable-edit-button dropdown\">\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"isAdvanced") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(8, data, 0),"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":33,"column":15}}})) != null ? stack1 : "")
    + "\n    </div>\n</div>\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'cart_item_actions'; return template;});