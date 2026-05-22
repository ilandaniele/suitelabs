define('header_reorganization_header_profile.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "	<ul class=\"header-profile-menu-login\">\r\n		<li class=\"header-profile-menu-item header-profile-menu-item-track\">\r\n			<a href=\"/orders\" data-hashtag=\"orders\" data-touchpoint=\"home\">\r\n				"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Track Order",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":5,"column":4},"end":{"line":5,"column":31}}}))
    + "\r\n			</a>\r\n		</li>\r\n		<li class=\"header-profile-menu-item  header-profile-menu-login-register\">\r\n			<a class=\"header-profile-link-welcome\" href=\"#\" data-toggle=\"dropdown\">\r\n				"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Welcome <strong class=\"header-profile-welcome-link-name\">$(0)</strong>",(depth0 != null ? compilerNameLookup(depth0,"displayName") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":10,"column":4},"end":{"line":10,"column":102}}}))
    + "\r\n			</a>\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showMyAccountMenu") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":12,"column":3},"end":{"line":16,"column":10}}})) != null ? stack1 : "")
    + "		</li>\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"headerWelcomeText") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":18,"column":2},"end":{"line":23,"column":9}}})) != null ? stack1 : "")
    + "	</ul>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "				<ul class=\"header-profile-menu-myaccount-container\">\r\n					<li data-view=\"Header.Menu.MyAccount\"></li>\r\n				</ul>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    var helper;

  return "			<li class=\"header-profile-menu-item-break\"></li>\r\n			<li class=\"header-profile-message header-profile-menu-item\">\r\n				"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"headerWelcomeText") || (depth0 != null ? compilerNameLookup(depth0,"headerWelcomeText") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"headerWelcomeText","hash":{},"data":data,"loc":{"start":{"line":21,"column":4},"end":{"line":21,"column":25}}}) : helper)))
    + "\r\n			</li>\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"showLoginMenu") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(13, data, 0),"data":data,"loc":{"start":{"line":26,"column":1},"end":{"line":60,"column":8}}})) != null ? stack1 : "");
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"showLogin") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":27,"column":2},"end":{"line":54,"column":9}}})) != null ? stack1 : "");
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "			<div class=\"header-profile-menu-login-container\">\r\n				<ul class=\"header-profile-menu-login\">\r\n					<li class=\"header-profile-menu-item header-profile-menu-item-track\">\r\n						<a href=\"/orders\" data-hashtag=\"orders\" data-touchpoint=\"home\">\r\n							"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Track Order",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":32,"column":7},"end":{"line":32,"column":34}}}))
    + "\r\n						</a>\r\n					</li>\r\n					<li class=\"header-profile-menu-item header-profile-menu-login-register\">\r\n						<a class=\"header-profile-login-link\" data-touchpoint=\"login\" data-hashtag=\"login-register\" href=\"#\">\r\n							"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Login",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":37,"column":7},"end":{"line":37,"column":28}}}))
    + "\r\n						</a>\r\n						<span class=\"header-profile-menu-pipe\">|</span>\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showRegister") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":40,"column":6},"end":{"line":44,"column":13}}})) != null ? stack1 : "")
    + "					</li>\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"headerWelcomeText") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":46,"column":5},"end":{"line":51,"column":12}}})) != null ? stack1 : "")
    + "				</ul>\r\n			</div>\r\n";
},"9":function(container,depth0,helpers,partials,data) {
    return "							<a class=\"header-profile-register-link\" data-touchpoint=\"register\" data-hashtag=\"login-register\" href=\"#\">\r\n								"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Register",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":42,"column":8},"end":{"line":42,"column":32}}}))
    + "\r\n							</a>\r\n";
},"11":function(container,depth0,helpers,partials,data) {
    var helper;

  return "						<li class=\"header-profile-menu-item-break\"></li>\r\n						<li class=\"header-profile-message header-profile-menu-item\">\r\n							"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"headerWelcomeText") || (depth0 != null ? compilerNameLookup(depth0,"headerWelcomeText") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"headerWelcomeText","hash":{},"data":data,"loc":{"start":{"line":49,"column":7},"end":{"line":49,"column":28}}}) : helper)))
    + "\r\n						</li>\r\n";
},"13":function(container,depth0,helpers,partials,data) {
    return "		<a class=\"header-profile-loading-link\">\r\n			<i class=\"header-profile-loading-icon\"></i>\r\n			<span class=\"header-profile-loading-indicator\"></span>\r\n		</a>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"showExtendedMenu") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(6, data, 0),"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":61,"column":7}}})) != null ? stack1 : "");
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/SuiteLabs/HeaderReorganization/1.0.1/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'header_reorganization_header_profile'; return template;});