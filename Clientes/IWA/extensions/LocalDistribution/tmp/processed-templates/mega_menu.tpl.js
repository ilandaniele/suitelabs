define('mega_menu.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"text") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":3},"end":{"line":47,"column":10}}})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "				<li "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"categories") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":9,"column":8},"end":{"line":9,"column":62}}})) != null ? stack1 : "")
    + ">\n					<a class=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"class") || (depth0 != null ? compilerNameLookup(depth0,"class") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"class","hash":{},"data":data,"loc":{"start":{"line":10,"column":15},"end":{"line":10,"column":24}}}) : helper)))
    + "\" "
    + alias3((compilerNameLookup(helpers,"objectToAtrributes")||(depth0 && compilerNameLookup(depth0,"objectToAtrributes"))||alias2).call(alias1,depth0,{"name":"objectToAtrributes","hash":{},"data":data,"loc":{"start":{"line":10,"column":26},"end":{"line":10,"column":53}}}))
    + ">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,(depth0 != null ? compilerNameLookup(depth0,"text") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":10,"column":54},"end":{"line":10,"column":72}}}))
    + "</a>\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"categories") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":5},"end":{"line":45,"column":12}}})) != null ? stack1 : "")
    + "				</li>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "data-toggle=\"categories-menu\"";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "					<ul class=\"header-menu-level-container\">\n						<li>\n							<ul class=\"header-menu-level2\">\n"
    + ((stack1 = compilerNameLookup(helpers,"each").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"categories") : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":15,"column":8},"end":{"line":28,"column":17}}})) != null ? stack1 : "")
    + "\n							</ul>\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"thumbnail") : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":31,"column":7},"end":{"line":41,"column":14}}})) != null ? stack1 : "")
    + "						</li>\n\n					</ul>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "								<li "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"categories") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":16,"column":12},"end":{"line":16,"column":66}}})) != null ? stack1 : "")
    + ">\n									<a class=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"class") || (depth0 != null ? compilerNameLookup(depth0,"class") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"class","hash":{},"data":data,"loc":{"start":{"line":17,"column":19},"end":{"line":17,"column":28}}}) : helper)))
    + "\" "
    + alias3((compilerNameLookup(helpers,"objectToAtrributes")||(depth0 && compilerNameLookup(depth0,"objectToAtrributes"))||alias2).call(alias1,depth0,{"name":"objectToAtrributes","hash":{},"data":data,"loc":{"start":{"line":17,"column":30},"end":{"line":17,"column":57}}}))
    + ">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,(depth0 != null ? compilerNameLookup(depth0,"text") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":17,"column":58},"end":{"line":17,"column":76}}}))
    + "</a>\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"categories") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":18,"column":10},"end":{"line":26,"column":17}}})) != null ? stack1 : "")
    + "								</li>\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "class=\"categories-menu-arrow\"";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "											<ul class=\"header-menu-level3\">\n"
    + ((stack1 = compilerNameLookup(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"categories") : depth0),{"name":"each","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":20,"column":12},"end":{"line":24,"column":21}}})) != null ? stack1 : "")
    + "											</ul>\n";
},"10":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "												<li>\n													<a class=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"class") || (depth0 != null ? compilerNameLookup(depth0,"class") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"class","hash":{},"data":data,"loc":{"start":{"line":22,"column":23},"end":{"line":22,"column":32}}}) : helper)))
    + "\" "
    + alias3((compilerNameLookup(helpers,"objectToAtrributes")||(depth0 && compilerNameLookup(depth0,"objectToAtrributes"))||alias2).call(alias1,depth0,{"name":"objectToAtrributes","hash":{},"data":data,"loc":{"start":{"line":22,"column":34},"end":{"line":22,"column":61}}}))
    + ">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,(depth0 != null ? compilerNameLookup(depth0,"text") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":22,"column":62},"end":{"line":22,"column":80}}}))
    + "</a>\n												</li>\n";
},"12":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "							<div class=\"categories-thummnail\">\n								<a href=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"thumbnailLink") || (depth0 != null ? compilerNameLookup(depth0,"thumbnailLink") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"thumbnailLink","hash":{},"data":data,"loc":{"start":{"line":33,"column":17},"end":{"line":33,"column":34}}}) : helper)))
    + "\">\n    								<img src=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"thumbnail") || (depth0 != null ? compilerNameLookup(depth0,"thumbnail") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"thumbnail","hash":{},"data":data,"loc":{"start":{"line":34,"column":22},"end":{"line":34,"column":35}}}) : helper)))
    + "\" />\n								</a>\n								<p>"
    + alias4(((helper = (helper = compilerNameLookup(helpers,"thumbnailCaption") || (depth0 != null ? compilerNameLookup(depth0,"thumbnailCaption") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"thumbnailCaption","hash":{},"data":data,"loc":{"start":{"line":36,"column":11},"end":{"line":36,"column":31}}}) : helper)))
    + "</p>\n								<a href=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"thumbnailLink") || (depth0 != null ? compilerNameLookup(depth0,"thumbnailLink") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"thumbnailLink","hash":{},"data":data,"loc":{"start":{"line":37,"column":17},"end":{"line":37,"column":34}}}) : helper)))
    + "\">\n									"
    + alias4((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Find out More »",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":38,"column":9},"end":{"line":38,"column":40}}}))
    + "\n								</a>\n							</div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n<nav class=\"header-menu-secondary-nav\">\n\n	<ul class=\"header-menu-level1\">\n\n"
    + ((stack1 = compilerNameLookup(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"categories") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":2},"end":{"line":48,"column":11}}})) != null ? stack1 : "")
    + "	</ul>\n</nav>\n\n\n\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/NSeComm/MegaMenu/1.0.3/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'mega_menu'; return template;});