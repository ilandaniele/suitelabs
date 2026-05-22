define('paypal_options_cart_summary.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "			<div class=\"cart-summary-subtotal\">\n				<p class=\"cart-summary-grid-float\">\n					<span class=\"cart-summary-amount-subtotal\">\n						"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"summary") : depth0)) != null ? compilerNameLookup(stack1,"subtotal_formatted") : stack1), depth0))
    + "\n					</span>\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isSingleItem") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data,"loc":{"start":{"line":20,"column":6},"end":{"line":24,"column":13}}})) != null ? stack1 : "")
    + "				</p>\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showEstimate") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":26,"column":4},"end":{"line":30,"column":11}}})) != null ? stack1 : "")
    + "			</div>\n\n			<div data-view=\"CartPromocodeListView\"></div>\n\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showDiscountTotal") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":35,"column":3},"end":{"line":52,"column":10}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showGiftCertificates") : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":54,"column":3},"end":{"line":61,"column":10}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showPickupInStoreLabel") : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":63,"column":3},"end":{"line":70,"column":10}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = compilerNameLookup(helpers,"unless").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"areAllItemsPickupable") : depth0),{"name":"unless","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":72,"column":3},"end":{"line":167,"column":14}}})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    return "							"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Subtotal <span class=\"cart-summary-item-quantity-subtotal\">$(0) item</span>",(depth0 != null ? compilerNameLookup(depth0,"itemCount") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":21,"column":7},"end":{"line":21,"column":107}}}))
    + "\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "							"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Subtotal <span class=\"cart-summary-item-quantity-subtotal\">$(0) items</span>",(depth0 != null ? compilerNameLookup(depth0,"itemCount") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":23,"column":7},"end":{"line":23,"column":109}}}))
    + "\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "					<div class=\"cart-summary-subtotal-legend\">\n						"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Subtotal does not include shipping or tax",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":28,"column":6},"end":{"line":28,"column":63}}}))
    + "\n					</div>\n";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "				<div class=\"cart-summary-discount-applied\">\n					<p class=\"cart-summary-grid-float\">\n						<span class=\"cart-summary-amount-discount-total\">\n							"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"-$(0)",((stack1 = (depth0 != null ? compilerNameLookup(depth0,"summary") : depth0)) != null ? compilerNameLookup(stack1,"discounttotal_formatted") : stack1),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":39,"column":7},"end":{"line":39,"column":60}}}))
    + "\n						</span>\n							"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Discount",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":41,"column":7},"end":{"line":41,"column":31}}}))
    + "\n					</p>\n				</div>\n				<div class=\"cart-summary-discount-applied\">\n					<p class=\"cart-summary-grid-float\">\n						<span class=\"cart-summary-amount-discount-total\">\n							"
    + alias3(container.lambda(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"summary") : depth0)) != null ? compilerNameLookup(stack1,"discountedsubtotal_formatted") : stack1), depth0))
    + "\n						</span>\n							"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Subtotal",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":49,"column":7},"end":{"line":49,"column":31}}}))
    + "\n					</p>\n				</div>\n";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "				<div class=\"cart-summary-giftcertificate-applied\">\n					<h5 class=\"cart-summary-giftcertificate-applied-title\">\n						"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Gift Certificates Applied ($(0))",((stack1 = (depth0 != null ? compilerNameLookup(depth0,"giftCertificates") : depth0)) != null ? compilerNameLookup(stack1,"length") : stack1),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":57,"column":6},"end":{"line":57,"column":78}}}))
    + "\n					</h5>\n					<div data-view=\"GiftCertificates\"></div>\n				</div>\n";
},"12":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "				<div class=\"cart-summary-pickup-container\">\n					<p class=\"cart-summary-grid-float\">\n						"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Pick Up",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":66,"column":6},"end":{"line":66,"column":29}}}))
    + "\n						<span class=\"cart-summary-pickup-label-free\"> "
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"FREE",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":67,"column":52},"end":{"line":67,"column":72}}}))
    + "</span>\n					</p>\n				</div>\n";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"showEstimate") : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.program(27, data, 0),"data":data,"loc":{"start":{"line":73,"column":4},"end":{"line":166,"column":11}}})) != null ? stack1 : "");
},"15":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "					<div class=\"cart-summary-expander-container\">\n						<div class=\"cart-summary-expander-head\">\n							<a class=\"cart-summary-expander-head-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#estimate-shipping-form\" aria-expanded=\"false\" aria-controls=\"estimate-shipping-form\">\n								"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Estimate Tax &amp; Shipping",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":77,"column":8},"end":{"line":77,"column":51}}}))
    + " <i data-toggle=\"tooltip\" class=\"cart-summary-expander-tooltip\" title=\""
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"<b>Shipping Estimator</b><br>Shipping fees are based on your shipping location. Please enter your information to view estimated shipping costs.",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":77,"column":122},"end":{"line":77,"column":281}}}))
    + "\" ></i><i class=\"cart-summary-expander-toggle-icon\"></i>\n							</a>\n						</div>\n						<div class=\"cart-summary-expander-body collapse\" id=\"estimate-shipping-form\" role=\"tabpanel\">\n							<div class=\"cart-summary-expander-container\">\n								<form action=\"#\" data-action=\"estimate-tax-ship\">\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"singleCountry") : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.program(18, data, 0),"data":data,"loc":{"start":{"line":83,"column":9},"end":{"line":95,"column":16}}})) != null ? stack1 : "")
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isZipCodeRequire") : depth0),{"name":"if","hash":{},"fn":container.program(22, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":96,"column":9},"end":{"line":109,"column":16}}})) != null ? stack1 : "")
    + "									<button class=\"cart-summary-button-estimate\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Estimate",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":110,"column":54},"end":{"line":110,"column":78}}}))
    + "</button>\n								</form>\n							</div>\n						</div>\n					</div>\n";
},"16":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "										<span>"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Ship available only to $(0)",(depth0 != null ? compilerNameLookup(depth0,"singleCountryName") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":84,"column":16},"end":{"line":84,"column":77}}}))
    + "</span>\n										<input name=\"country\" id=\"country\" class=\"country\" value=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"singleCountryCode") || (depth0 != null ? compilerNameLookup(depth0,"singleCountryCode") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"singleCountryCode","hash":{},"data":data,"loc":{"start":{"line":85,"column":68},"end":{"line":85,"column":89}}}) : helper)))
    + "\" type=\"hidden\"/>\n";
},"18":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "										<div class=\"control-group\">\n											<label class=\"cart-summary-label\" for=\"country\">"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(alias1,"Select Country",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":88,"column":59},"end":{"line":88,"column":89}}}))
    + "</label>\n											<select name=\"country\" id=\"country\" class=\"cart-summary-estimate-input country\" data-action=\"estimate-tax-ship-country\">\n"
    + ((stack1 = compilerNameLookup(helpers,"each").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"countries") : depth0),{"name":"each","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":90,"column":12},"end":{"line":92,"column":21}}})) != null ? stack1 : "")
    + "											</select>\n										</div>\n";
},"19":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "													<option value=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"code") || (depth0 != null ? compilerNameLookup(depth0,"code") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"code","hash":{},"data":data,"loc":{"start":{"line":91,"column":28},"end":{"line":91,"column":36}}}) : helper)))
    + "\" "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"selected") : depth0),{"name":"if","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":91,"column":38},"end":{"line":91,"column":69}}})) != null ? stack1 : "")
    + ">"
    + alias4(((helper = (helper = compilerNameLookup(helpers,"name") || (depth0 != null ? compilerNameLookup(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":91,"column":70},"end":{"line":91,"column":78}}}) : helper)))
    + "</option>\n";
},"20":function(container,depth0,helpers,partials,data) {
    return "selected";
},"22":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "										<div data-validation=\"control-group\">\n											<label for=\"zip\" class=\"cart-summary-label\">\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isDefaultCountryUS") : depth0),{"name":"if","hash":{},"fn":container.program(23, data, 0),"inverse":container.program(25, data, 0),"data":data,"loc":{"start":{"line":99,"column":14},"end":{"line":103,"column":19}}})) != null ? stack1 : "")
    + "											</label>\n											<div data-validation=\"control\">\n												<input type=\"tel\" pattern=\"[0-9]*\" inputmode=\"numeric\" name=\"zip\" id=\"zip\" class=\"cart-summary-zip-code\" value=\""
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"shippingZipCode") || (depth0 != null ? compilerNameLookup(depth0,"shippingZipCode") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"shippingZipCode","hash":{},"data":data,"loc":{"start":{"line":106,"column":124},"end":{"line":106,"column":143}}}) : helper)))
    + "\" />\n											</div>\n										</div>\n";
},"23":function(container,depth0,helpers,partials,data) {
    return "													"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Ship to the following zip code",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":100,"column":13},"end":{"line":100,"column":59}}}))
    + "\n";
},"25":function(container,depth0,helpers,partials,data) {
    return "													"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Ship to the following postal code",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":102,"column":13},"end":{"line":102,"column":62}}}))
    + "\n";
},"27":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, alias4=container.lambda;

  return "					<div class=\"cart-summary-shipping-cost-applied\">\n						<div class=\"cart-summary-grid\">\n						</div>\n						<p class=\"cart-summary-grid-float "
    + ((stack1 = compilerNameLookup(helpers,"unless").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isLoggedIn") : depth0),{"name":"unless","hash":{},"fn":container.program(28, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":119,"column":40},"end":{"line":119,"column":79}}})) != null ? stack1 : "")
    + "\">\n							<span class=\"cart-summary-amount-shipping\">\n								"
    + alias3(((helper = (helper = compilerNameLookup(helpers,"totalShippingCost") || (depth0 != null ? compilerNameLookup(depth0,"totalShippingCost") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"totalShippingCost","hash":{},"data":data,"loc":{"start":{"line":121,"column":8},"end":{"line":121,"column":29}}}) : helper)))
    + "\n							</span>\n								"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Shipping",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":123,"column":8},"end":{"line":123,"column":32}}}))
    + "\n						</p>\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isDealer") : depth0),{"name":"if","hash":{},"fn":container.program(30, data, 0),"inverse":container.program(32, data, 0),"data":data,"loc":{"start":{"line":125,"column":6},"end":{"line":134,"column":13}}})) != null ? stack1 : "")
    + "\n                        <!-- Shipping and handling combined into totalShippingCost -->\n						<!--"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showHandlingCost") : depth0),{"name":"if","hash":{},"fn":container.program(34, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":137,"column":10},"end":{"line":144,"column":13}}})) != null ? stack1 : "")
    + "-->\n\n						<p class=\"cart-summary-grid-float "
    + ((stack1 = compilerNameLookup(helpers,"unless").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isLoggedIn") : depth0),{"name":"unless","hash":{},"fn":container.program(28, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":146,"column":40},"end":{"line":146,"column":79}}})) != null ? stack1 : "")
    + "\">\n							<span class=\"cart-summary-amount-tax\">\n								"
    + alias3(alias4(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"summary") : depth0)) != null ? compilerNameLookup(stack1,"taxtotal_formatted") : stack1), depth0))
    + "\n							</span>\n								"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Tax",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":150,"column":8},"end":{"line":150,"column":27}}}))
    + "\n						</p>\n					</div>\n\n					<div class=\"cart-summary-total "
    + ((stack1 = compilerNameLookup(helpers,"unless").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isLoggedIn") : depth0),{"name":"unless","hash":{},"fn":container.program(28, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":154,"column":36},"end":{"line":154,"column":75}}})) != null ? stack1 : "")
    + "\">\n						<p class=\"cart-summary-grid-float\">\n							<span class=\"cart-summary-amount-total\">\n								"
    + alias3(alias4(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"summary") : depth0)) != null ? compilerNameLookup(stack1,"total_formatted") : stack1), depth0))
    + "\n							</span>\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showLabelsAsEstimated") : depth0),{"name":"if","hash":{},"fn":container.program(36, data, 0),"inverse":container.program(38, data, 0),"data":data,"loc":{"start":{"line":159,"column":8},"end":{"line":163,"column":15}}})) != null ? stack1 : "")
    + "						</p>\n					</div>\n";
},"28":function(container,depth0,helpers,partials,data) {
    return "hidden";
},"30":function(container,depth0,helpers,partials,data) {
    return "";
},"32":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "							<div class=\"cart-summary-label-shipto\">\n								"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Ship to:",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":128,"column":8},"end":{"line":128,"column":32}}}))
    + "\n								<span class=\"cart-summary-label-shipto-success\">"
    + alias3(((helper = (helper = compilerNameLookup(helpers,"shipToText") || (depth0 != null ? compilerNameLookup(depth0,"shipToText") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"shipToText","hash":{},"data":data,"loc":{"start":{"line":129,"column":56},"end":{"line":129,"column":70}}}) : helper)))
    + "</span>\n								<a href=\"#\" data-action=\"remove-shipping-address\">\n									<span class=\"cart-summary-remove-action\"><i></i></span>\n								</a>\n							</div>\n";
},"34":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.escapeExpression;

  return "\n						<p class=\"cart-summary-grid-float\">\n							<span class=\"cart-summary-amount-handling\">\n								"
    + alias1(container.lambda(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"summary") : depth0)) != null ? compilerNameLookup(stack1,"handlingcost_formatted") : stack1), depth0))
    + "\n							</span>\n								"
    + alias1((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Handling",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":142,"column":8},"end":{"line":142,"column":32}}}))
    + "\n						</p>\n						";
},"36":function(container,depth0,helpers,partials,data) {
    return "									"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Estimated Total",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":160,"column":9},"end":{"line":160,"column":40}}}))
    + "\n";
},"38":function(container,depth0,helpers,partials,data) {
    return "									"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Total",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":162,"column":9},"end":{"line":162,"column":30}}}))
    + "\n";
},"40":function(container,depth0,helpers,partials,data) {
    return "			<div class=\"cart-summary-message cart-summary-msg-description\">\n				<p class=\"cart-summary-login-to-see-price\">\n					"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Please <a href=\"$(0)\">log in</a> to see prices or purchase items",(depth0 != null ? compilerNameLookup(depth0,"urlLogin") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":171,"column":5},"end":{"line":171,"column":94}}}))
    + "\n				</p>\n			</div>\n";
},"42":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "		<div class=\"cart-summary-grid cart-summary-shipping-method-container\">\n			<div class=\"cart-summary-expander-head\">\n				<a class=\"cart-summary-expander-head-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#shipping-method-container\" aria-expanded=\"false\" aria-controls=\"shipping-method-container\">\n					"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(alias1,"Shipping Methods:",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":182,"column":5},"end":{"line":182,"column":38}}}))
    + "\n					<i class=\"cart-summary-expander-toggle-icon-shippingmethods fa fa-var-angle-up\"></i>\n				</a>\n			</div>\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isDealer") : depth0),{"name":"if","hash":{},"fn":container.program(43, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":186,"column":3},"end":{"line":194,"column":10}}})) != null ? stack1 : "")
    + "\n			<div class=\"cart-summary-expander-body "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"noShipAddress") : depth0),{"name":"if","hash":{},"fn":container.program(45, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":196,"column":42},"end":{"line":196,"column":78}}})) != null ? stack1 : "")
    + "\" role=\"form\" id=\"shipping-method-container\" aria-expanded=\"false\">\n				<div data-view=\"Cart.ShippingMethods\"></div>\n			</div>\n		</div>\n";
},"43":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "			<div class=\"cart-summary-label-shipto\">\n				"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Ship to:",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":188,"column":4},"end":{"line":188,"column":28}}}))
    + "\n				<span class=\"cart-summary-label-shipto-success\">"
    + alias3(((helper = (helper = compilerNameLookup(helpers,"shipToText") || (depth0 != null ? compilerNameLookup(depth0,"shipToText") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"shipToText","hash":{},"data":data,"loc":{"start":{"line":189,"column":52},"end":{"line":189,"column":66}}}) : helper)))
    + "</span>\n				<a href=\"#\" data-action=\"remove-shipping-address\">\n					<span class=\"cart-summary-remove-action\"><i></i></span>\n				</a>\n			</div>\n";
},"45":function(container,depth0,helpers,partials,data) {
    return "collapse";
},"47":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "		<div class=\"cart-summary-grid cart-summary-promocode-container\">\n			<div class=\"cart-summary-expander-head\">\n				<a class=\"cart-summary-expander-head-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#promo-code-container\" aria-expanded=\"false\" aria-controls=\"promo-code-container\">\n							"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Have a Promo Code?",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":207,"column":7},"end":{"line":207,"column":41}}}))
    + "\n							<i data-toggle=\"tooltip\" class=\"cart-summary-expander-tooltip\" title=\""
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"<b>Promo Code</b><br>To redeem a promo code, simply enter your information and we will apply the offer to your purchase during checkout.",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":208,"column":77},"end":{"line":208,"column":229}}}))
    + "\"></i>\n							<i class=\"cart-summary-expander-toggle-icon-promocode\"></i>\n				</a>\n			</div>\n			<div class=\"cart-summary-expander-body collapse\" role=\"form\" id=\"promo-code-container\" aria-expanded=\"false\">\n				<div data-view=\"Cart.PromocodeFrom\"></div>\n			</div>\n		</div>\n";
},"49":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "		<div class=\"cart-summary-button-container\">\n			<a id=\"btn-proceed-checkout\" class=\"cart-summary-button-proceed-checkout "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showProceedButton") : depth0),{"name":"if","hash":{},"fn":container.program(50, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":220,"column":76},"end":{"line":220,"column":149}}})) != null ? stack1 : "")
    + "\" href=\"#\" data-touchpoint=\"checkout\" data-hashtag=\"#\">\n				"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(alias1,"Proceed to Checkout",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":221,"column":4},"end":{"line":221,"column":39}}}))
    + "\n			</a>\n\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showPaypalButton") : depth0),{"name":"if","hash":{},"fn":container.program(52, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":224,"column":3},"end":{"line":226,"column":10}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isWSDK") : depth0),{"name":"if","hash":{},"fn":container.program(54, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":228,"column":3},"end":{"line":232,"column":10}}})) != null ? stack1 : "")
    + "		</div>\n";
},"50":function(container,depth0,helpers,partials,data) {
    return " cart-summary-button-proceed-checkout-sb ";
},"52":function(container,depth0,helpers,partials,data) {
    return "				<div data-view=\"PayPalOptions.Messaging\"></div>\n";
},"54":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "				<a class=\"cart-summary-continue-shopping\" href=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"continueURL") || (depth0 != null ? compilerNameLookup(depth0,"continueURL") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"continueURL","hash":{},"data":data,"loc":{"start":{"line":229,"column":52},"end":{"line":229,"column":67}}}) : helper)))
    + "\">\n					"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Continue Shopping",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":230,"column":5},"end":{"line":230,"column":38}}}))
    + "\n				</a>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "\n<div class=\"cart-summary\">\n	<div class=\"cart-summary-container\">\n		<h3 class=\"cart-summary-title\">\n			"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(alias1,"Order Summary",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":11,"column":3},"end":{"line":11,"column":32}}}))
    + "\n		</h3>\n\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isPriceEnabled") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(40, data, 0),"data":data,"loc":{"start":{"line":14,"column":2},"end":{"line":174,"column":9}}})) != null ? stack1 : "")
    + "	</div>\n\n		\n"
    + ((stack1 = compilerNameLookup(helpers,"unless").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"noShipAddress") : depth0),{"name":"unless","hash":{},"fn":container.program(42, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":178,"column":2},"end":{"line":200,"column":13}}})) != null ? stack1 : "")
    + "		\n\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showPromocodeForm") : depth0),{"name":"if","hash":{},"fn":container.program(47, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":203,"column":1},"end":{"line":216,"column":8}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showActions") : depth0),{"name":"if","hash":{},"fn":container.program(49, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":218,"column":1},"end":{"line":234,"column":8}}})) != null ? stack1 : "")
    + "</div>\n\n\n\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/SuiteLabs/PayPalOptions/1.0.1/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'paypal_options_cart_summary'; return template;});