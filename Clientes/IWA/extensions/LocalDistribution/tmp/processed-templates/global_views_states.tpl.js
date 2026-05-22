define('global_views_states.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "	<label class=\"global-views-states-group-label is-required\" for=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"manage") || (depth0 != null ? compilerNameLookup(depth0,"manage") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"manage","hash":{},"data":data,"loc":{"start":{"line":2,"column":65},"end":{"line":2,"column":75}}}) : helper)))
    + "state\">\r\n		"
    + alias4((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"State",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":3,"column":2},"end":{"line":3,"column":23}}}))
    + " <span class=\"global-views-states-input-required\">*</span>\r\n	</label>\r\n	<div  class=\"global-views-states-group-form-controls\" data-validation=\"control\">\r\n		<select class=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"inputClass") || (depth0 != null ? compilerNameLookup(depth0,"inputClass") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"inputClass","hash":{},"data":data,"loc":{"start":{"line":6,"column":17},"end":{"line":6,"column":31}}}) : helper)))
    + " global-views-states-group-select\" id=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"manage") || (depth0 != null ? compilerNameLookup(depth0,"manage") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"manage","hash":{},"data":data,"loc":{"start":{"line":6,"column":70},"end":{"line":6,"column":80}}}) : helper)))
    + "state\" name=\"state\" data-type=\"selectstate\" data-action=\"selectstate\" >\r\n			<option value=\"\">\r\n				"
    + alias4((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"-- Select --",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":8,"column":4},"end":{"line":8,"column":32}}}))
    + "\r\n			</option>\r\n"
    + ((stack1 = compilerNameLookup(helpers,"each").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"states") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":10,"column":3},"end":{"line":14,"column":12}}})) != null ? stack1 : "")
    + "		</select>\r\n	</div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "				<option value=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"code") || (depth0 != null ? compilerNameLookup(depth0,"code") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"code","hash":{},"data":data,"loc":{"start":{"line":11,"column":19},"end":{"line":11,"column":27}}}) : helper)))
    + "\" "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isSelected") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":29},"end":{"line":11,"column":64}}})) != null ? stack1 : "")
    + " >\r\n					"
    + alias4(((helper = (helper = compilerNameLookup(helpers,"name") || (depth0 != null ? compilerNameLookup(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":12,"column":5},"end":{"line":12,"column":13}}}) : helper)))
    + "\r\n				</option>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return " selected ";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "	<label class=\"global-views-states-group-label\" for=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"manage") || (depth0 != null ? compilerNameLookup(depth0,"manage") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"manage","hash":{},"data":data,"loc":{"start":{"line":18,"column":53},"end":{"line":18,"column":63}}}) : helper)))
    + "state\">\r\n		"
    + alias4((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"State/Province/Region",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":19,"column":2},"end":{"line":19,"column":39}}}))
    + "\r\n		<p class=\"global-views-states-optional-label\">"
    + alias4((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"(optional)",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":20,"column":48},"end":{"line":20,"column":74}}}))
    + "</p>\r\n	</label>\r\n	<div  class=\"global-views-states-group-form-controls\" data-validation=\"control\">\r\n		<input\r\n			type=\"text\"\r\n			id=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"manage") || (depth0 != null ? compilerNameLookup(depth0,"manage") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"manage","hash":{},"data":data,"loc":{"start":{"line":25,"column":7},"end":{"line":25,"column":17}}}) : helper)))
    + "state\"\r\n			name=\"state\"\r\n			class=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"inputClass") || (depth0 != null ? compilerNameLookup(depth0,"inputClass") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"inputClass","hash":{},"data":data,"loc":{"start":{"line":27,"column":10},"end":{"line":27,"column":24}}}) : helper)))
    + " global-views-states-group-input\"\r\n			value=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"selectedState") || (depth0 != null ? compilerNameLookup(depth0,"selectedState") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"selectedState","hash":{},"data":data,"loc":{"start":{"line":28,"column":10},"end":{"line":28,"column":27}}}) : helper)))
    + "\"\r\n			data-action=\"inputstate\"\r\n		>\r\n	</div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"isCountryAndStatePresent") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(5, data, 0),"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":32,"column":7}}})) != null ? stack1 : "")
    + "\r\n\r\n\r\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'global_views_states'; return template;});