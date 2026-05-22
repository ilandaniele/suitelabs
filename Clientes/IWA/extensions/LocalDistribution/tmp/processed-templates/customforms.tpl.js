define('customforms.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<section class=\""
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"containerClass") || (depth0 != null ? compilerNameLookup(depth0,"containerClass") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"containerClass","hash":{},"data":data,"loc":{"start":{"line":1,"column":16},"end":{"line":1,"column":36}}}) : helper)))
    + "\" data-view=\"CustomForms.Form\"></section>\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/SuiteLabs/CustomForms/2.0.0/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'customforms'; return template;});