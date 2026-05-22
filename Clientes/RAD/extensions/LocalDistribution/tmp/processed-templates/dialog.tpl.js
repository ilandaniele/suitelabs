define('dialog.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "     ns-dialog-name=\""
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"name") || (depth0 != null ? compilerNameLookup(depth0,"name") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"name","hash":{},"data":data,"loc":{"start":{"line":3,"column":21},"end":{"line":3,"column":29}}}) : helper)))
    + "\"\n     ";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<section class=\"dialog-header\">\n    <h2>"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"headerText") || (depth0 != null ? compilerNameLookup(depth0,"headerText") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"headerText","hash":{},"data":data,"loc":{"start":{"line":7,"column":8},"end":{"line":7,"column":22}}}) : helper)))
    + "</h2>\n</section>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return "    <button type=\"button\"\n            class=\"dialog-footer-cancel-button\"\n            data-dismiss=\"modal\"\n            aria-hidden=\"true\">"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"cancelButtonText") || (depth0 != null ? compilerNameLookup(depth0,"cancelButtonText") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"cancelButtonText","hash":{},"data":data,"loc":{"start":{"line":18,"column":31},"end":{"line":18,"column":51}}}) : helper)))
    + "\n    </button>\n";
},"7":function(container,depth0,helpers,partials,data) {
    var helper;

  return "    <button type=\"button\"\n            class=\"dialog-footer-ok-button\"\n            data-dismiss=\"modal\"\n            aria-hidden=\"true\">"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"okButtonText") || (depth0 != null ? compilerNameLookup(depth0,"okButtonText") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"okButtonText","hash":{},"data":data,"loc":{"start":{"line":25,"column":31},"end":{"line":25,"column":47}}}) : helper)))
    + "</button>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"dialog-content\"\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"hasName") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":5},"end":{"line":4,"column":12}}})) != null ? stack1 : "")
    + ">\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"hasHeaderText") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":0},"end":{"line":9,"column":7}}})) != null ? stack1 : "")
    + "<section class=\"dialog-body\">\n    "
    + ((stack1 = ((helper = (helper = compilerNameLookup(helpers,"bodyHtml") || (depth0 != null ? compilerNameLookup(depth0,"bodyHtml") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"bodyHtml","hash":{},"data":data,"loc":{"start":{"line":11,"column":4},"end":{"line":11,"column":18}}}) : helper))) != null ? stack1 : "")
    + "\n</section>\n<section class=\"dialog-footer\">\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"hasCancelButton") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":14,"column":4},"end":{"line":20,"column":11}}})) != null ? stack1 : "")
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"hasOkButton") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":21,"column":4},"end":{"line":26,"column":11}}})) != null ? stack1 : "")
    + "</section>\n</div>\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/AwaLabs/Dialog/2.0.0/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'dialog'; return template;});