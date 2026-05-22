define('login_register_register.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "<p class=\"login-register-register-form-description\">\r\n	"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Create an account and take advantage of faster checkouts and other great benefits.",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":3,"column":1},"end":{"line":3,"column":99}}}))
    + "\r\n</p>\r\n\r\n<form class=\"login-register-register-form\" method=\"POST\" novalidate>\r\n	<small class=\"login-register-register-required\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Required <span class=\"login-register-register-form-required\">*</span>",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":7,"column":49},"end":{"line":7,"column":134}}}))
    + "</small>\r\n\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return " autofocus ";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "		<div class=\"login-register-register-form-controls-group\" data-validation=\"control-group\">\r\n			<label class=\"login-register-register-form-label\" for=\"register-company\">\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"isCompanyFieldRequire") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.program(8, data, 0),"data":data,"loc":{"start":{"line":32,"column":4},"end":{"line":36,"column":11}}})) != null ? stack1 : "")
    + "			</label>\r\n			<div class=\"login-register-register-form-controls\" data-validation=\"control\">\r\n				<input type=\"text\" name=\"company\" id=\"register-company\" class=\"login-register-register-form-input\"/>\r\n			</div>\r\n		</div>\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "					"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Company <small class=\"login-register-register-form-required\">*</small>",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":33,"column":5},"end":{"line":33,"column":91}}}))
    + "\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "					"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Company",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":35,"column":5},"end":{"line":35,"column":28}}}))
    + " <small class=\"login-register-register-form-optional\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"(optional)",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":35,"column":82},"end":{"line":35,"column":108}}}))
    + "</small>\r\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "		<div class=\"login-register-register-form-controls-group\" data-validation=\"control-group\">\r\n			<div class=\"login-register-register-form-controls\" data-validation=\"control\">\r\n				<input value=\"true\" type=\"hidden\" name=\"redirect\">\r\n			</div>\r\n		</div>\r\n";
},"12":function(container,depth0,helpers,partials,data) {
    return " checked ";
},"14":function(container,depth0,helpers,partials,data) {
    return "	<div class=\"login-register-register-form-controls-group\">\r\n		<button type=\"submit\" class=\"login-register-register-form-submit\">\r\n			"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Create Account",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":97,"column":3},"end":{"line":97,"column":33}}}))
    + "\r\n		</button>\r\n	</div>\r\n</form>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return ((stack1 = compilerNameLookup(helpers,"unless").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showFormFieldsOnly") : depth0),{"name":"unless","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":9,"column":11}}})) != null ? stack1 : "")
    + "\r\n	<div class=\"login-register-register-form-controls-group\" data-validation=\"control-group\">\r\n		<label class=\"login-register-register-form-label\" for=\"register-firstname\">\r\n			"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"First Name <small class=\"login-register-register-form-required\">*</small>",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":13,"column":3},"end":{"line":13,"column":92}}}))
    + "\r\n		</label>\r\n		<div class=\"login-register-register-form-controls\" data-validation=\"control\">\r\n			<input "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"hasAutoFocus") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":16,"column":10},"end":{"line":16,"column":48}}})) != null ? stack1 : "")
    + " type=\"text\" name=\"firstname\" id=\"register-firstname\" class=\"login-register-register-form-input\">\r\n		</div>\r\n	</div>\r\n\r\n	<div class=\"login-register-register-form-controls-group\" data-validation=\"control-group\">\r\n		<label class=\"login-register-register-form-label\" for=\"register-lastname\">\r\n			"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Last Name <small class=\"login-register-register-form-required\">*</small>",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":22,"column":3},"end":{"line":22,"column":91}}}))
    + "\r\n		</label>\r\n		<div class=\"login-register-register-form-controls\" data-validation=\"control\">\r\n			<input type=\"text\" name=\"lastname\" id=\"register-lastname\" class=\"login-register-register-form-input\">\r\n		</div>\r\n	</div>\r\n\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showCompanyField") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":29,"column":1},"end":{"line":42,"column":8}}})) != null ? stack1 : "")
    + "\r\n	<div class=\"login-register-register-form-controls-group\" data-validation=\"control-group\">\r\n		<label class=\"login-register-register-form-label\" for=\"register-email\">\r\n			"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Email Address <small class=\"login-register-register-form-required\">*</small>",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":46,"column":3},"end":{"line":46,"column":95}}}))
    + "\r\n		</label>\r\n		<div class=\"login-register-register-form-controls\" data-validation=\"control\">\r\n			<input type=\"email\" name=\"email\" id=\"register-email\" class=\"login-register-register-form-input\" placeholder=\""
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"your@email.com",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":49,"column":112},"end":{"line":49,"column":142}}}))
    + "\">\r\n			<p class=\"login-register-register-form-help-block\">\r\n				<small>\r\n					"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"We need your email address to contact you about your order.",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":52,"column":5},"end":{"line":52,"column":80}}}))
    + "\r\n				</small>\r\n			</p>\r\n		</div>\r\n	</div>\r\n	<div class=\"login-register-register-form-controls-group\" data-validation=\"control-group\">\r\n		<label class=\"login-register-register-form-label\" for=\"register-password\">\r\n			"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Password <small class=\"login-register-register-form-required\">*</small>",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":59,"column":3},"end":{"line":59,"column":90}}}))
    + "\r\n		</label>\r\n		<div class=\"login-register-register-form-controls\" data-validation=\"control\">\r\n			<input type=\"password\" name=\"password\" id=\"register-password\" class=\"login-register-register-form-input\">\r\n		</div>\r\n	</div>\r\n\r\n	<div class=\"login-register-register-form-controls-group\" data-validation=\"control-group\">\r\n		<label class=\"login-register-register-form-label\" for=\"register-password2\">\r\n			"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Re-Enter Password <small class=\"login-register-register-form-required\">*</small>",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":68,"column":3},"end":{"line":68,"column":99}}}))
    + "\r\n		</label>\r\n		<div class=\"login-register-register-form-controls\" data-validation=\"control\">\r\n			<input type=\"password\" name=\"password2\" id=\"register-password2\" class=\"login-register-register-form-input\">\r\n		</div>\r\n	</div>\r\n\r\n	<div data-view=\"Register.CustomFields\"></div>\r\n\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isRedirect") : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":77,"column":1},"end":{"line":83,"column":8}}})) != null ? stack1 : "")
    + "\r\n	<div class=\"login-register-register-form-controls-group\">\r\n		<label class=\"login-register-register-form-label\">\r\n			<input type=\"checkbox\" name=\"emailsubscribe\" id=\"register-emailsubscribe\" value=\"T\" "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isEmailSubscribeChecked") : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":87,"column":87},"end":{"line":87,"column":134}}})) != null ? stack1 : "")
    + ">\r\n			"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Yes, Please sign me up for $(0) exclusive offers and promotions",(depth0 != null ? compilerNameLookup(depth0,"siteName") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":88,"column":3},"end":{"line":88,"column":91}}}))
    + "\r\n		</label>\r\n	</div>\r\n\r\n	<div class=\"login-register-register-form-messages\" data-type=\"alert-placeholder\"></div>\r\n\r\n"
    + ((stack1 = compilerNameLookup(helpers,"unless").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showFormFieldsOnly") : depth0),{"name":"unless","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":94,"column":0},"end":{"line":101,"column":11}}})) != null ? stack1 : "")
    + "\r\n<div data-cms-area=\"cms_login_register_login_area\" data-cms-area-filters=\"path\"></div>\r\n\r\n\r\n\r\n\r\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'login_register_register'; return template;});