define('quick_order.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    return "collapsed";
},"3":function(container,depth0,helpers,partials,data) {
    return "in";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"quick-order\">\r\n	<div class=\"quick-order-divider\">\r\n		<div class=\"quick-order-expander-head\">\r\n			<a class=\"quick-order-expander-head-toggle "
    + ((stack1 = compilerNameLookup(helpers,"unless").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showOpenedAccordion") : depth0),{"name":"unless","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":46},"end":{"line":4,"column":97}}})) != null ? stack1 : "")
    + "\" data-toggle=\"collapse\" data-target=\"#quick-order\" aria-expanded=\"true\" aria-controls=\"quick-order\">\r\n				"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(alias1,"Quick Add",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":5,"column":4},"end":{"line":5,"column":29}}}))
    + "\r\n				<i class=\"quick-order-expander-toggle-icon\"></i>\r\n			</a>\r\n		</div>\r\n		<div class=\"quick-order-expander-body collapse "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showOpenedAccordion") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":9,"column":49},"end":{"line":9,"column":85}}})) != null ? stack1 : "")
    + "\" id=\"quick-order\" data-target=\"#quick-order\">\r\n			<div class=\"quick-order-expander-container\">\r\n				<div data-view=\"QuickAddView\"></div>\r\n			</div>\r\n		</div>\r\n	</div>\r\n</div>\r\n\r\n\r\n\r\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'quick_order'; return template;});