define('requestquote_wizard_module_comments.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "	<div class=\"requestquote-wizard-module-comments\">\n		<div class=\"requestquote-wizard-module-comments-box\">\n            <div class=\"requestquote-wizard-module-comments-title\">\n                <p>\n\n                        <strong>"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Note:",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":7,"column":32},"end":{"line":7,"column":53}}}))
    + "</strong> "
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"You are about to Submit a Quote.",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":7,"column":63},"end":{"line":7,"column":111}}}))
    + "<br>\n                    "
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Once that happens, the Quote cannot be Edited or Changed without your Salesperson or Customer Care Representative.",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":8,"column":20},"end":{"line":8,"column":150}}}))
    + "\n\n                </p>\n            </div>\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isReadOnly") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data,"loc":{"start":{"line":12,"column":3},"end":{"line":23,"column":10}}})) != null ? stack1 : "")
    + "		</div>\n	</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "				<div class=\"requestquote-wizard-module-comments-box-message\">\n					<p>"
    + container.escapeExpression((compilerNameLookup(helpers,"breaklines")||(depth0 && compilerNameLookup(depth0,"breaklines"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"memo") : depth0),{"name":"breaklines","hash":{},"data":data,"loc":{"start":{"line":14,"column":8},"end":{"line":14,"column":27}}}))
    + "</p>\n				</div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, alias4="function";

  return "				<p>\n					<label>"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Do you have any remarks or comments with this quote request?",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":18,"column":12},"end":{"line":18,"column":88}}}))
    + "</label>\n					<span>"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1," (Optional)",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":19,"column":11},"end":{"line":19,"column":38}}}))
    + "</span>\n				</p>\n				<textarea data-action=\"validate-textarea-length\" maxlength=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"maxLength") || (depth0 != null ? compilerNameLookup(depth0,"maxLength") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"maxLength","hash":{},"data":data,"loc":{"start":{"line":21,"column":64},"end":{"line":21,"column":77}}}) : helper)))
    + "\" data-type=\"memo-input\" class=\"requestquote-wizard-module-comments-box-textarea\">"
    + alias3(((helper = (helper = compilerNameLookup(helpers,"memo") || (depth0 != null ? compilerNameLookup(depth0,"memo") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"memo","hash":{},"data":data,"loc":{"start":{"line":21,"column":159},"end":{"line":21,"column":167}}}) : helper)))
    + "</textarea>\n				<small class=\"requestquote-wizard-module-comments-box-textarea-length\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Maximum 999 characters.",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":22,"column":75},"end":{"line":22,"column":114}}}))
    + "</small>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"unless").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"hideContent") : depth0),{"name":"unless","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":26,"column":11}}})) != null ? stack1 : "")
    + "\n\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'requestquote_wizard_module_comments'; return template;});