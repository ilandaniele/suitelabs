define('error_management_logged_out.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<section class=\"error-management-logged-out-modal-content\">\r\n	<div class=\"error-management-logged-out\">\r\n		<h4>\r\n			<span class=\"error-management-logged-out-warning-icon\"></span>\r\n			"
    + alias2(alias1(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"labels") : depth0)) != null ? compilerNameLookup(stack1,"title") : stack1), depth0))
    + "\r\n		</h4>\r\n	    <p>"
    + alias2(alias1(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"labels") : depth0)) != null ? compilerNameLookup(stack1,"explanation") : stack1), depth0))
    + "</p>\r\n	</div>\r\n	<p>\r\n	  	<a class=\"error-management-logged-out-close-button\" href=\"#login\">"
    + alias2(alias1(((stack1 = (depth0 != null ? compilerNameLookup(depth0,"labels") : depth0)) != null ? compilerNameLookup(stack1,"login") : stack1), depth0))
    + "</a>\r\n	</p>\r\n</section>\r\n\r\n\r\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'error_management_logged_out'; return template;});