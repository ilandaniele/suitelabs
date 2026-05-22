define('suitecommerce_stocknotifications_subscription_create.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "    <div>\n        <label for=\"subscribeToAll\">\n            <input\n                    id=\"subscribeToAll\"\n                    data-action=\"stocknotifications-subscribeToAll\"\n                    class=\"input-checkbox\"\n                    type=\"checkbox\"\n                    name=\"subscribeToAll\"\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"subscribeToAll") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":13,"column":20},"end":{"line":15,"column":27}}})) != null ? stack1 : "")
    + "            >"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"subscribeToAllLabel") || (depth0 != null ? compilerNameLookup(depth0,"subscribeToAllLabel") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"subscribeToAllLabel","hash":{},"data":data,"loc":{"start":{"line":16,"column":13},"end":{"line":16,"column":36}}}) : helper)))
    + "\n        </label>\n    </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "                    checked\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "            <small class=\"stocknotifications-subscribe-required\"> "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"(required)",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":23,"column":66},"end":{"line":23,"column":92}}}))
    + "</small>\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "          <small class=\"stocknotifications-subscribe-required\"> "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"(required)",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":37,"column":64},"end":{"line":37,"column":90}}}))
    + "</small>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, alias4="function";

  return "<form novalidate>\n  <fieldset>\n    <div class=\"stocknotifications-subscribe-control-wrapper\" data-validation=\"control-group\">\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showSubscribeToAll") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":4},"end":{"line":19,"column":11}}})) != null ? stack1 : "")
    + "      <label for=\"firstname\" class=\"stocknotifications-subscribe-label\">\n          "
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,(depth0 != null ? compilerNameLookup(depth0,"nameLabel") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":21,"column":10},"end":{"line":21,"column":33}}}))
    + "\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"mandatoryName") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":22,"column":10},"end":{"line":24,"column":17}}})) != null ? stack1 : "")
    + "      </label>\n      <input\n        id=\"firstname\"\n        class=\"stocknotifications-subscribe-input\"\n        type=\"text\"\n        name=\"firstname\"\n        value=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"firstname") || (depth0 != null ? compilerNameLookup(depth0,"firstname") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"firstname","hash":{},"data":data,"loc":{"start":{"line":31,"column":15},"end":{"line":31,"column":28}}}) : helper)))
    + "\"\n        placeholder=\""
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,(depth0 != null ? compilerNameLookup(depth0,"namePlaceholder") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":32,"column":21},"end":{"line":32,"column":50}}}))
    + "\"\n        data-validation=\"control\">\n      <!--label for=\"lastname\" class=\"stocknotifications-subscribe-label\">\n        "
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,(depth0 != null ? compilerNameLookup(depth0,"lastNameLabel") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":35,"column":8},"end":{"line":35,"column":35}}}))
    + "\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"mandatoryLastName") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":36,"column":8},"end":{"line":38,"column":15}}})) != null ? stack1 : "")
    + "      </label-->\n      <input\n        id=\"lastname\"\n        class=\"stocknotifications-subscribe-input\"\n        type=\"text\"\n        name=\"lastname\"\n        value=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"lastname") || (depth0 != null ? compilerNameLookup(depth0,"lastname") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"lastname","hash":{},"data":data,"loc":{"start":{"line":45,"column":15},"end":{"line":45,"column":27}}}) : helper)))
    + "\"\n        placeholder=\""
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,(depth0 != null ? compilerNameLookup(depth0,"lastNamePlaceholder") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":46,"column":21},"end":{"line":46,"column":54}}}))
    + "\"\n        data-validation=\"control\">\n    </div>\n    <div class=\"stocknotifications-subscribe-control-wrapper\" data-validation=\"control-group\">\n      <label for=\"bis-email\" class=\"stocknotifications-subscribe-label\" >\n        "
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,(depth0 != null ? compilerNameLookup(depth0,"emailLabel") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":51,"column":8},"end":{"line":51,"column":32}}}))
    + "\n        <small class=\"stocknotifications-subscribe-required\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"(required)",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":52,"column":61},"end":{"line":52,"column":87}}}))
    + "</small>\n      </label>\n      <input\n        id=\"bis-email\"\n        class=\"stocknotifications-subscribe-input\"\n        type=\"email\"\n        name=\"email\"\n        value=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"email") || (depth0 != null ? compilerNameLookup(depth0,"email") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"email","hash":{},"data":data,"loc":{"start":{"line":59,"column":15},"end":{"line":59,"column":24}}}) : helper)))
    + "\"\n        placeholder=\""
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,(depth0 != null ? compilerNameLookup(depth0,"emailPlaceholder") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":60,"column":21},"end":{"line":60,"column":51}}}))
    + "\"\n        data-validation=\"control\">\n    </div>\n    <input\n      id=\"item\"\n      type=\"hidden\"\n      name=\"item\"\n      value=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"selectedProduct") || (depth0 != null ? compilerNameLookup(depth0,"selectedProduct") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"selectedProduct","hash":{},"data":data,"loc":{"start":{"line":67,"column":13},"end":{"line":67,"column":32}}}) : helper)))
    + "\">\n    <input\n      id=\"matrix-parent-id\"\n      type=\"hidden\"\n      name=\"matrixparent\"\n      value=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"matrixParentId") || (depth0 != null ? compilerNameLookup(depth0,"matrixParentId") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"matrixParentId","hash":{},"data":data,"loc":{"start":{"line":72,"column":13},"end":{"line":72,"column":31}}}) : helper)))
    + "\">\n    <input\n      id=\"subscription-data-helper\"\n      type=\"hidden\"\n      name=\"datahelper\"\n      value=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"subscriptionDataHelper") || (depth0 != null ? compilerNameLookup(depth0,"subscriptionDataHelper") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"subscriptionDataHelper","hash":{},"data":data,"loc":{"start":{"line":77,"column":13},"end":{"line":77,"column":39}}}) : helper)))
    + "\">\n    <!--div>\n      <label for=\"subscribeToMails\">\n        <input\n          id=\"subscribeToMails\"\n          class=\"input-checkbox\"\n          data-action=\"stocknotifications-subscribeToMails\"\n          type=\"checkbox\"\n          name=\"subscribeToMails\"\n          checked>"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,(depth0 != null ? compilerNameLookup(depth0,"agreementLabel") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":86,"column":18},"end":{"line":86,"column":46}}}))
    + "\n      </label>\n    </div-->\n    <button type=\"submit\" class=\"stocknotifications-subscribe-submit-button-custom\">\n      "
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"NOTIFY ME!",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":90,"column":6},"end":{"line":90,"column":32}}}))
    + "\n    </button>\n    <div\n      class=\"stocknotifications-subscribe-message stocknotifications-subscribe-message-success\"\n      data-confirm-bin-message=\"\"\n    ></div>\n  </fieldset>\n</form>\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/AwaLabs/BackInStockNotification/2.0.1/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'suitecommerce_stocknotifications_subscription_create'; return template;});