define('oau_item_relations_related.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div data-container=\"oau\" class=\"item-relations-related-oau-container\">\n	<aside class=\"item-relations-related\">\n        <h3 data-type=\"title\">"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"relatedItemsTitle") || (depth0 != null ? compilerNameLookup(depth0,"relatedItemsTitle") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"relatedItemsTitle","hash":{},"data":data,"loc":{"start":{"line":4,"column":30},"end":{"line":4,"column":51}}}) : helper)))
    + "</h3>\n		<div class=\"item-relations-related-row "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"noImages") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":41},"end":{"line":5,"column":73}}})) != null ? stack1 : "")
    + "\">\n			<div data-type=\"backbone.collection.view.rows\"></div>\n		</div>\n	</aside>\n</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "no-images";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"showCells") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":10,"column":7}}})) != null ? stack1 : "");
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/SuiteLabs/OptionsAndUpgrades/1.0.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'oau_item_relations_related'; return template;});