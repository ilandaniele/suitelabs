define('header_profile.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "    <a class=\"header-menu-myaccount-signout-link\" href=\"#\" data-touchpoint=\"logout\" name=\"signout\">\n        "
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Logout",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":3,"column":30}}}))
    + "\n    </a>\n    <a class=\"header-profile-welcome-link\" href=\"/overview\" data-touchpoint=\"customercenter\" data-hashtag=\"#overview\" name=\"Overview\">\n        "
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"My Account",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":6,"column":8},"end":{"line":6,"column":34}}}))
    + "\n    </a>\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showMyAccountMenu") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":4},"end":{"line":12,"column":11}}})) != null ? stack1 : "")
    + "\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "        <ul class=\"header-profile-menu-myaccount-container\">\n            <li data-view=\"Header.Menu.MyAccount\"></li>\n        </ul>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"showLoginMenu") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(8, data, 0),"data":data,"loc":{"start":{"line":16,"column":4},"end":{"line":33,"column":11}}})) != null ? stack1 : "")
    + "\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"showLogin") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":17,"column":8},"end":{"line":27,"column":15}}})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    return "            <div class=\"header-profile-menu-login-container\">\n                <ul class=\"header-profile-menu-login\">\n                    <li>\n                        <a class=\"header-profile-login-link\" data-touchpoint=\"login\" data-hashtag=\"login-register\" href=\"#\">\n                            "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Login / Register",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":22,"column":28},"end":{"line":22,"column":60}}}))
    + "\n                        </a>\n                    </li>\n                </ul>\n            </div>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "        <a class=\"header-profile-loading-link\">\n            <i class=\"header-profile-loading-icon\"></i>\n            <span class=\"header-profile-loading-indicator\"></span>\n        </a>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"showExtendedMenu") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":35,"column":7}}})) != null ? stack1 : "")
    + "\n\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'header_profile'; return template;});