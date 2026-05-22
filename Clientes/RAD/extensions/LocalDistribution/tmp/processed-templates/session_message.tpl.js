define('session_message.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "    <div class=\"modal-body modal-body-session-message\">\n        <h5 class=\"session-login-explanation\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"You have been logged out due to inactivity.",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":3,"column":46},"end":{"line":3,"column":105}}}))
    + "</h5>\n    </div>\n\n    <div class=\"modal-footer\">\n        <a class=\"header-profile-login-mobile-link\" data-touchpoint=\"login\" data-hashtag=\"login-register\" href=\"#\">\n            "
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Login to see the entire RAD collection",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":8,"column":12},"end":{"line":8,"column":66}}}))
    + "\n        </a>\n    </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"sessionMantained") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data,"loc":{"start":{"line":12,"column":4},"end":{"line":29,"column":11}}})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    return "        <div class=\"modal-body modal-body-session-message\">\n            <h5 class=\"session-login-explanation\">"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Your session was maintained.",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":14,"column":50},"end":{"line":14,"column":94}}}))
    + "</h5>\n        </div>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "        <div class=\"modal-body modal-body-session-message\">\n            <div class=\"session-login-explanation\">\n                "
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"You are being timed out due to inactivity.",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":19,"column":16},"end":{"line":19,"column":74}}}))
    + "</br>\n                "
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Please choose to stay signed in or to logoff.",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":20,"column":16},"end":{"line":20,"column":77}}}))
    + "</br>\n                "
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Otherwise, you will be logged off automatically.",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":21,"column":16},"end":{"line":21,"column":80}}}))
    + "\n            </div>\n        </div>\n\n        <div class=\"modal-footer\">\n            <a type=\"button\" class=\"session-message-logout-button button-medium button-primary\" data-touchpoint=\"logout\" data-hashtag=\"login\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Log Off",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":26,"column":142},"end":{"line":26,"column":165}}}))
    + "</a>\n            <button type=\"button\" class=\"session-message-maintain-button button-medium button-primary\" data-action=\"maintain-session\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Stay Logged In",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":27,"column":134},"end":{"line":27,"column":164}}}))
    + "</button>\n        </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"sessionExpired") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":30,"column":7}}})) != null ? stack1 : "");
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/AwaLabs/InactivityMessage/2.1.0/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'session_message'; return template;});