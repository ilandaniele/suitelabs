define('product_list_edit_item.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    return "				<div class=\"product-list-edit-item-rating\" itemprop=\"aggregateRating\">\r\n					<div data-view=\"GlobalViews.StarRating\"></div>\r\n				</div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "				<small class=\"product-list-edit-item-quantity-help\">\r\n					"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"(Minimum of $(0) required)",(depth0 != null ? compilerNameLookup(depth0,"minQuantity") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":40,"column":5},"end":{"line":40,"column":59}}}))
    + "\r\n				</small>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "				<small class=\"product-list-edit-item-quantity-help\">\r\n					"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"(Maximum of $(0) required)",(depth0 != null ? compilerNameLookup(depth0,"maxQuantity") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":46,"column":5},"end":{"line":46,"column":59}}}))
    + "\r\n				</small>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "selected";
},"9":function(container,depth0,helpers,partials,data) {
    return "disabled";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, alias4="function";

  return "<form method=\"POST\">\r\n	<div class=\"product-list-edit-item-modal-body\">\r\n		<div class=\"product-list-edit-item-image\">\r\n			<img src=\""
    + alias3((compilerNameLookup(helpers,"resizeImage")||(depth0 && compilerNameLookup(depth0,"resizeImage"))||alias2).call(alias1,((stack1 = (depth0 != null ? compilerNameLookup(depth0,"thumbnail") : depth0)) != null ? compilerNameLookup(stack1,"url") : stack1),"thumbnail",{"name":"resizeImage","hash":{},"data":data,"loc":{"start":{"line":4,"column":13},"end":{"line":4,"column":54}}}))
    + "\" alt=\""
    + alias3(container.lambda(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"thumbnail") : depth0)) != null ? compilerNameLookup(stack1,"altimagetext") : stack1), depth0))
    + "\">\r\n		</div>\r\n\r\n		<div class=\"product-list-edit-item-details\">\r\n			<div class=\"product-list-edit-item-basic\">\r\n				<h5 class=\"product-list-edit-item-name\">\r\n					<a class=\"product-list-edit-item-anchor-name\" href=\"#\" data-touchpoint=\"home\" data-hashtag=\"product/"
    + alias3(((helper = (helper = compilerNameLookup(helpers,"productId") || (depth0 != null ? compilerNameLookup(depth0,"productId") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"productId","hash":{},"data":data,"loc":{"start":{"line":10,"column":105},"end":{"line":10,"column":118}}}) : helper)))
    + "\"> "
    + alias3(((helper = (helper = compilerNameLookup(helpers,"productName") || (depth0 != null ? compilerNameLookup(depth0,"productName") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"productName","hash":{},"data":data,"loc":{"start":{"line":10,"column":121},"end":{"line":10,"column":136}}}) : helper)))
    + "</a>\r\n				</h5>\r\n\r\n				<div class=\"product-list-edit-item-added\">\r\n					<small>"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Added on",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":14,"column":12},"end":{"line":14,"column":36}}}))
    + ": "
    + alias3(((helper = (helper = compilerNameLookup(helpers,"itemCreatedDate") || (depth0 != null ? compilerNameLookup(depth0,"itemCreatedDate") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"itemCreatedDate","hash":{},"data":data,"loc":{"start":{"line":14,"column":38},"end":{"line":14,"column":57}}}) : helper)))
    + "</small>\r\n				</div>\r\n\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showRating") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":17,"column":4},"end":{"line":21,"column":11}}})) != null ? stack1 : "")
    + "\r\n				<div class=\"product-list-edit-item-price\">\r\n					<div data-view=\"ItemViews.Price\"></div>\r\n				</div>\r\n			</div>\r\n\r\n			<div class=\"product-list-edit-item-options\">\r\n				<div data-view=\"ItemDetails.Options\"></div>\r\n			</div>\r\n\r\n			<div class=\"product-list-edit-item-quantity\">\r\n				<label class=\"product-list-edit-item-label\" for=\"product-list-edit-item-quantity\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Desired Quantity",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":33,"column":86},"end":{"line":33,"column":118}}}))
    + "</label>\r\n				<button class=\"product-list-edit-item-button-quantity-minus\" data-ui-action=\"minus\">-</button>\r\n				<input class=\"product-list-edit-item-input-quantity\" type=\"number\" min=\"1\" name=\"quantity\" id=\"product-list-edit-item-quantity\" placeholder=\""
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Desired Quantity",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":35,"column":145},"end":{"line":35,"column":177}}}))
    + "\" value=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"quantity") || (depth0 != null ? compilerNameLookup(depth0,"quantity") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"quantity","hash":{},"data":data,"loc":{"start":{"line":35,"column":186},"end":{"line":35,"column":198}}}) : helper)))
    + "\">\r\n				<button class=\"product-list-edit-item-button-quantity-add\" data-ui-action=\"add\">+</button>\r\n			</div>\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showMinimumQuantity") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":38,"column":3},"end":{"line":42,"column":10}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showMaximumQuantity") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":44,"column":3},"end":{"line":48,"column":10}}})) != null ? stack1 : "")
    + "\r\n			<div class=\"product-list-edit-item-priority\">\r\n				<label class=\"product-list-edit-item-label\" for=\"product-list-edit-item-priority\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Priority",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":51,"column":86},"end":{"line":51,"column":110}}}))
    + "</label>\r\n				<select class=\"product-list-edit-item-select-priority product-list-edit-item-priority-input\" name=\"priority\" id=\"product-list-edit-item-priority\">\r\n					<option value=\"1\" "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isPriority1") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":53,"column":23},"end":{"line":53,"column":57}}})) != null ? stack1 : "")
    + ">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"High",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":53,"column":58},"end":{"line":53,"column":78}}}))
    + "</option>\r\n					<option value=\"2\" "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isPriority2") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":54,"column":23},"end":{"line":54,"column":57}}})) != null ? stack1 : "")
    + ">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Medium",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":54,"column":58},"end":{"line":54,"column":80}}}))
    + "</option>\r\n					<option value=\"3\" "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isPriority3") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":55,"column":23},"end":{"line":55,"column":57}}})) != null ? stack1 : "")
    + ">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Low",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":55,"column":58},"end":{"line":55,"column":77}}}))
    + "</option>\r\n				</select>\r\n			</div>\r\n\r\n			<div class=\"product-list-edit-item-notes\" data-validation=\"control-group\">\r\n				<label class=\"product-list-edit-item-label\" for=\"product-list-edit-item-description\">\r\n					"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Notes for this item",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":61,"column":5},"end":{"line":61,"column":40}}}))
    + "\r\n					<span class=\"product-list-edit-item-label-optional\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"(optional)",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":62,"column":57},"end":{"line":62,"column":83}}}))
    + "</span>\r\n				</label>\r\n				<div data-validation=\"control\">\r\n					<textarea class=\"product-list-edit-item-textarea\" name=\"description\" id=\"product-list-edit-item-description\" placeholder=\""
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Add a note or description for your item",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":65,"column":127},"end":{"line":65,"column":182}}}))
    + "\">"
    + alias3(((helper = (helper = compilerNameLookup(helpers,"description") || (depth0 != null ? compilerNameLookup(depth0,"description") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"description","hash":{},"data":data,"loc":{"start":{"line":65,"column":184},"end":{"line":65,"column":199}}}) : helper)))
    + "</textarea>\r\n				</div>\r\n			</div>\r\n\r\n		</div>\r\n	</div>\r\n\r\n	<div class=\"product-list-edit-item-modal-footer\">\r\n		<button type=\"submit\" class=\"product-list-edit-item-button-edit\" data-action=\"edit\" "
    + ((stack1 = compilerNameLookup(helpers,"unless").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isSelectionCompleteForEdit") : depth0),{"name":"unless","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":73,"column":86},"end":{"line":73,"column":143}}})) != null ? stack1 : "")
    + ">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Save",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":73,"column":144},"end":{"line":73,"column":164}}}))
    + "</button>\r\n		<button type=\"reset\" class=\"product-list-edit-item-button-cancel\" data-dismiss=\"modal\" aria-hidden=\"true\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Cancel",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":74,"column":108},"end":{"line":74,"column":130}}}))
    + "</button>\r\n	</div>\r\n</form>\r\n\r\n\r\n\r\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'product_list_edit_item'; return template;});