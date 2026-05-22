define('login_register.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    return " class=\"login-register-body\" ";
},"3":function(container,depth0,helpers,partials,data) {
    return " class=\"login-register-body-colored\" ";
},"5":function(container,depth0,helpers,partials,data) {
    return "            <div class=\"login-register-column\">\n                <div class=\"login-register-wrapper-column-login\">\n                    <div class=\"login-register-wrapper-login\" data-view=\"Login\"></div>\n                </div>\n            </div>\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "            <div class=\"login-register-column\">\n                <div class=\"login-register-wrapper-column-register\">\n                    <div class=\"login-register-wrapper-register\">\n                        <div data-cms-area=\"register-cms-text-right\" data-cms-area-filters=\"path\">\n\n                        </div>\n\n\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showCheckoutAsGuest") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":27,"column":24},"end":{"line":29,"column":31}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showRegister") : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":31,"column":24},"end":{"line":33,"column":31}}})) != null ? stack1 : "")
    + "                    </div>\n                </div>\n            </div>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "                            <div class=\"login-register-wrapper-guest\" data-view=\"CheckoutAsGuest\"></div>\n";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                            <div class=\""
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"showCheckoutAsGuest") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":32,"column":40},"end":{"line":32,"column":82}}})) != null ? stack1 : "")
    + " \" data-view=\"Register\" id=\"register-view\"></div>\n";
},"11":function(container,depth0,helpers,partials,data) {
    return "collapse";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<section class=\"login-register\" >\n\n	<header class=\"login-register-header\">\n        <div data-cms-area=\"login-register-top-text\" data-cms-area-filters=\"path\">\n\n        </div>\n	</header>\n	<div "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showRegister") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":8,"column":6},"end":{"line":8,"column":107}}})) != null ? stack1 : "")
    + ">\n\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showLogin") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":10,"column":2},"end":{"line":16,"column":9}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showRegisterOrGuest") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":18,"column":2},"end":{"line":37,"column":9}}})) != null ? stack1 : "")
    + "\n	</div>\n</section>\n\n\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'login_register'; return template;});