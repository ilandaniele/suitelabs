define('social-media.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        <li class=\"social-item\"><a href=\""
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"instagramUrl") || (depth0 != null ? compilerNameLookup(depth0,"instagramUrl") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"instagramUrl","hash":{},"data":data,"loc":{"start":{"line":3,"column":41},"end":{"line":3,"column":57}}}) : helper)))
    + "\" class=\"instagram-footer-icon\" aria-label=\"Instagram\"></a></li>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        <li class=\"social-item\"><a href=\""
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"facebookUrl") || (depth0 != null ? compilerNameLookup(depth0,"facebookUrl") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"facebookUrl","hash":{},"data":data,"loc":{"start":{"line":6,"column":41},"end":{"line":6,"column":56}}}) : helper)))
    + "\" class=\"facebook-footer-icon\" aria-label=\"Facebook\"></a></li>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        <li class=\"social-item\"><a href=\""
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"pinterestUrl") || (depth0 != null ? compilerNameLookup(depth0,"pinterestUrl") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"pinterestUrl","hash":{},"data":data,"loc":{"start":{"line":9,"column":41},"end":{"line":9,"column":57}}}) : helper)))
    + "\" class=\"pinterest-footer-icon\" aria-label=\"Pinterest\"></a></li>\n";
},"7":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        <li class=\"social-item\"><a href=\""
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"linkedinUrl") || (depth0 != null ? compilerNameLookup(depth0,"linkedinUrl") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"linkedinUrl","hash":{},"data":data,"loc":{"start":{"line":12,"column":41},"end":{"line":12,"column":56}}}) : helper)))
    + "\" class=\"linkedin-footer-icon\" aria-label=\"LinkedIn\"></a></li>\n";
},"9":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        <li class=\"social-item\"><a href=\""
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"youtubeUrl") || (depth0 != null ? compilerNameLookup(depth0,"youtubeUrl") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"youtubeUrl","hash":{},"data":data,"loc":{"start":{"line":15,"column":41},"end":{"line":15,"column":55}}}) : helper)))
    + "\" class=\"youtube-footer-icon\" aria-label=\"YouTube\"></a></li>\n";
},"11":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        <li class=\"social-item\"><a href=\""
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"googleUrl") || (depth0 != null ? compilerNameLookup(depth0,"googleUrl") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"googleUrl","hash":{},"data":data,"loc":{"start":{"line":18,"column":41},"end":{"line":18,"column":54}}}) : helper)))
    + "\" class=\"googlePlus-footer-icon\" aria-label=\"Google\"></a></li>\n";
},"13":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        <li class=\"social-item\"><a href=\""
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"twitterUrl") || (depth0 != null ? compilerNameLookup(depth0,"twitterUrl") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"twitterUrl","hash":{},"data":data,"loc":{"start":{"line":21,"column":41},"end":{"line":21,"column":55}}}) : helper)))
    + "\" class=\"twitter-footer-icon\" aria-label=\"Twitter\"></a></li>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<ul class=\"social\">\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"instagramUrl") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":4},"end":{"line":4,"column":11}}})) != null ? stack1 : "")
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"facebookUrl") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":4},"end":{"line":7,"column":11}}})) != null ? stack1 : "")
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"pinterestUrl") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":4},"end":{"line":10,"column":11}}})) != null ? stack1 : "")
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"linkedinUrl") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":4},"end":{"line":13,"column":11}}})) != null ? stack1 : "")
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"youtubeUrl") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":14,"column":4},"end":{"line":16,"column":11}}})) != null ? stack1 : "")
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"googleUrl") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":17,"column":4},"end":{"line":19,"column":11}}})) != null ? stack1 : "")
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"twitterUrl") : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":20,"column":4},"end":{"line":22,"column":11}}})) != null ? stack1 : "")
    + "</ul>\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/AwaLabs/SocialMedia/2.1.0/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'social-media'; return template;});