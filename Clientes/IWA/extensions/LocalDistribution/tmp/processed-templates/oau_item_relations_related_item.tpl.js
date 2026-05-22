define('oau_item_relations_related_item.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "	<a class=\"item-relations-related-item-thumbnail\" "
    + ((stack1 = ((helper = (helper = compilerNameLookup(helpers,"itemURL") || (depth0 != null ? compilerNameLookup(depth0,"itemURL") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"itemURL","hash":{},"data":data,"loc":{"start":{"line":3,"column":50},"end":{"line":3,"column":63}}}) : helper))) != null ? stack1 : "")
    + ">\n		<img src=\""
    + alias3((compilerNameLookup(helpers,"resizeImage")||(depth0 && compilerNameLookup(depth0,"resizeImage"))||alias2).call(alias1,((stack1 = (depth0 != null ? compilerNameLookup(depth0,"thumbnail") : depth0)) != null ? compilerNameLookup(stack1,"url") : stack1),"thumbnail",{"name":"resizeImage","hash":{},"data":data,"loc":{"start":{"line":4,"column":12},"end":{"line":4,"column":53}}}))
    + "\" alt=\""
    + alias3(container.lambda(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"thumbnail") : depth0)) != null ? compilerNameLookup(stack1,"altimagetext") : stack1), depth0))
    + "\" />\n	</a>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "		<div class=\"item-relations-related-item-rate\" data-view=\"Global.StarRating\">\n		</div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "		<div class=\"item-relations-addtocart-actions\">\n			<input type=\"checkbox\" name=\"relateditems_queue\" id=\"relateditem_"
    + alias4(((helper = (helper = compilerNameLookup(helpers,"timestamp") || (depth0 != null ? compilerNameLookup(depth0,"timestamp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data,"loc":{"start":{"line":19,"column":68},"end":{"line":19,"column":81}}}) : helper)))
    + "\" data-action=\"add\" data-item-id=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"itemId") || (depth0 != null ? compilerNameLookup(depth0,"itemId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"itemId","hash":{},"data":data,"loc":{"start":{"line":19,"column":115},"end":{"line":19,"column":125}}}) : helper)))
    + "\">\n			<label for=\"relateditem_"
    + alias4(((helper = (helper = compilerNameLookup(helpers,"timestamp") || (depth0 != null ? compilerNameLookup(depth0,"timestamp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data,"loc":{"start":{"line":20,"column":27},"end":{"line":20,"column":40}}}) : helper)))
    + "\">"
    + alias4((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,(depth0 != null ? compilerNameLookup(depth0,"addToCartText") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":20,"column":42},"end":{"line":20,"column":69}}}))
    + "</label>\n		</div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"related-item-container\" itemprop=\"itemListElement\" data-item-id=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"itemId") || (depth0 != null ? compilerNameLookup(depth0,"itemId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"itemId","hash":{},"data":data,"loc":{"start":{"line":1,"column":77},"end":{"line":1,"column":87}}}) : helper)))
    + "\" data-track-productlist-list=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"track_productlist_list") || (depth0 != null ? compilerNameLookup(depth0,"track_productlist_list") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"track_productlist_list","hash":{},"data":data,"loc":{"start":{"line":1,"column":118},"end":{"line":1,"column":144}}}) : helper)))
    + "\" data-track-productlist-category=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"track_productlist_category") || (depth0 != null ? compilerNameLookup(depth0,"track_productlist_category") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"track_productlist_category","hash":{},"data":data,"loc":{"start":{"line":1,"column":179},"end":{"line":1,"column":209}}}) : helper)))
    + "\" data-track-productlist-position=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"track_productlist_position") || (depth0 != null ? compilerNameLookup(depth0,"track_productlist_position") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"track_productlist_position","hash":{},"data":data,"loc":{"start":{"line":1,"column":244},"end":{"line":1,"column":274}}}) : helper)))
    + "\" data-sku=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"sku") || (depth0 != null ? compilerNameLookup(depth0,"sku") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sku","hash":{},"data":data,"loc":{"start":{"line":1,"column":286},"end":{"line":1,"column":293}}}) : helper)))
    + "\">\n"
    + ((stack1 = compilerNameLookup(helpers,"unless").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"noImages") : depth0),{"name":"unless","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":4},"end":{"line":6,"column":15}}})) != null ? stack1 : "")
    + "	<a "
    + ((stack1 = ((helper = (helper = compilerNameLookup(helpers,"itemURL") || (depth0 != null ? compilerNameLookup(depth0,"itemURL") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"itemURL","hash":{},"data":data,"loc":{"start":{"line":7,"column":4},"end":{"line":7,"column":17}}}) : helper))) != null ? stack1 : "")
    + " class=\"item-relations-related-item-title\">\n		<span itemprop=\"name\">"
    + alias4(((helper = (helper = compilerNameLookup(helpers,"itemName") || (depth0 != null ? compilerNameLookup(depth0,"itemName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"itemName","hash":{},"data":data,"loc":{"start":{"line":8,"column":24},"end":{"line":8,"column":36}}}) : helper)))
    + "</span>\n	</a>\n	<div class=\"item-relations-related-item-price\" data-view=\"Item.Price\">\n	</div>\n\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showRating") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":13,"column":1},"end":{"line":16,"column":8}}})) != null ? stack1 : "")
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showATC") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":17,"column":1},"end":{"line":22,"column":8}}})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/SuiteLabs/OptionsAndUpgrades/1.0.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'oau_item_relations_related_item'; return template;});