define('enhancedpdp_gallery.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"showImageSlider") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(6, data, 0),"data":data,"loc":{"start":{"line":3,"column":2},"end":{"line":34,"column":9}}})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "			<ul class=\"bxslider\" data-slider>\r\n"
    + ((stack1 = compilerNameLookup(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"images") : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":4},"end":{"line":19,"column":13}}})) != null ? stack1 : "")
    + "			</ul>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "					<li data-zoom class=\"product-details-image-gallery-container\" >\r\n						<a data-lightbox-elem href=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"main") || (depth0 != null ? compilerNameLookup(depth0,"main") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"main","hash":{},"data":data,"loc":{"start":{"line":7,"column":34},"end":{"line":7,"column":44}}}) : helper)))
    + "\" data-is-video=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"isVideo") || (depth0 != null ? compilerNameLookup(depth0,"isVideo") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"isVideo","hash":{},"data":data,"loc":{"start":{"line":7,"column":61},"end":{"line":7,"column":74}}}) : helper)))
    + "\">\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isVideo") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":7},"end":{"line":10,"column":14}}})) != null ? stack1 : "")
    + "							<img\r\n								src=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"main") || (depth0 != null ? compilerNameLookup(depth0,"main") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"main","hash":{},"data":data,"loc":{"start":{"line":12,"column":13},"end":{"line":12,"column":23}}}) : helper)))
    + "\"\r\n								alt=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"altimagetext") || (depth0 != null ? compilerNameLookup(depth0,"altimagetext") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"altimagetext","hash":{},"data":data,"loc":{"start":{"line":13,"column":13},"end":{"line":13,"column":31}}}) : helper)))
    + "\"\r\n								itemprop=\"image\"\r\n								data-loader=\"false\"\r\n								data-skip-zoom="
    + alias4(((helper = (helper = compilerNameLookup(helpers,"skipZoom") || (depth0 != null ? compilerNameLookup(depth0,"skipZoom") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"skipZoom","hash":{},"data":data,"loc":{"start":{"line":16,"column":23},"end":{"line":16,"column":37}}}) : helper)))
    + ">\r\n						</a>\r\n					</li>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "								<i class=\"yt-icon\"></i>\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"with").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"firstImage") : depth0),{"name":"with","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":22,"column":3},"end":{"line":33,"column":12}}})) != null ? stack1 : "");
},"7":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "				<div class=\"product-details-image-gallery-detailed-image\" data-zoom>\r\n					<a data-lightbox-elem href=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"main") || (depth0 != null ? compilerNameLookup(depth0,"main") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"main","hash":{},"data":data,"loc":{"start":{"line":24,"column":33},"end":{"line":24,"column":43}}}) : helper)))
    + "\">\r\n						<img\r\n							class=\"center-block\"\r\n							src=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"main") || (depth0 != null ? compilerNameLookup(depth0,"main") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"main","hash":{},"data":data,"loc":{"start":{"line":27,"column":12},"end":{"line":27,"column":22}}}) : helper)))
    + "\"\r\n							alt=\""
    + alias4(((helper = (helper = compilerNameLookup(helpers,"altimagetext") || (depth0 != null ? compilerNameLookup(depth0,"altimagetext") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"altimagetext","hash":{},"data":data,"loc":{"start":{"line":28,"column":12},"end":{"line":28,"column":30}}}) : helper)))
    + "\"\r\n							itemprop=\"image\"\r\n							data-loader=\"false\">\r\n					</a>\r\n				</div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"product-details-image-gallery product-details-lightbox-gallery gallery\">\r\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"showImages") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":1},"end":{"line":35,"column":8}}})) != null ? stack1 : "")
    + "</div>";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/SuiteLabs/EnhancedPDP/1.0.3/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'enhancedpdp_gallery'; return template;});