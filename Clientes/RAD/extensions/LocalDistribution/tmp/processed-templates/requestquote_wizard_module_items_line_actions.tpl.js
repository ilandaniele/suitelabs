define('requestquote_wizard_module_items_line_actions.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "       <a class=\"requestquote-wizard-module-items-line-actions-button-add\" data-line=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"lineId") || (depth0 != null ? compilerNameLookup(depth0,"lineId") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"lineId","hash":{},"data":data,"loc":{"start":{"line":6,"column":86},"end":{"line":6,"column":96}}}) : helper)))
    + "\" data-action=\"add-item-to-cart\">\n        "
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Move to cart",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":7,"column":8},"end":{"line":7,"column":36}}}))
    + "\n       </a>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"requestquote-wizard-module-items-line-actions\">\n	<a class=\"requestquote-wizard-module-items-line-actions-button-remove\" data-action=\"remove\">\n		"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(alias1,"Remove",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":3,"column":2},"end":{"line":3,"column":24}}}))
    + "\n	</a>\n"
    + ((stack1 = compilerNameLookup(helpers,"unless").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isTradeAndNotIsBackOrderable") : depth0),{"name":"unless","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":4},"end":{"line":9,"column":15}}})) != null ? stack1 : "")
    + "</div>\n\n\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'requestquote_wizard_module_items_line_actions'; return template;});