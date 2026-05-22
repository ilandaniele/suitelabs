define('product_details_image_gallery.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"showImageSlider") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.program(8, data, 0, blockParams, depths),"data":data,"loc":{"start":{"line":3,"column":2},"end":{"line":41,"column":9}}})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "			<ul class=\"bxslider\" data-slider>\n"
    + ((stack1 = compilerNameLookup(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"images") : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":4},"end":{"line":21,"column":13}}})) != null ? stack1 : "")
    + "			</ul>\n";
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"isVideo") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.program(6, data, 0, blockParams, depths),"data":data,"loc":{"start":{"line":6,"column":20},"end":{"line":20,"column":27}}})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                        <li class=\"product-details-image-gallery-container\">\n                            <div class=\"videoContainer\">\n                                <iframe src=\""
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"url") || (depth0 != null ? compilerNameLookup(depth0,"url") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"url","hash":{},"data":data,"loc":{"start":{"line":9,"column":45},"end":{"line":9,"column":52}}}) : helper)))
    + "\" width=\"555\" height=\"555\" frameborder=\"0\" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>\n                            </div>\n                        </li>\n";
},"6":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "                        <li data-zoom class=\"product-details-image-gallery-container\">\n                            <img\n                                src=\""
    + alias3((compilerNameLookup(helpers,"resizeImage")||(depth0 && compilerNameLookup(depth0,"resizeImage"))||alias2).call(alias1,(depth0 != null ? compilerNameLookup(depth0,"url") : depth0),(depths[1] != null ? compilerNameLookup(depths[1],"imageResizeId") : depths[1]),{"name":"resizeImage","hash":{},"data":data,"loc":{"start":{"line":15,"column":37},"end":{"line":15,"column":73}}}))
    + "\"\n                                alt=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"altimagetext") || (depth0 != null ? compilerNameLookup(depth0,"altimagetext") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"altimagetext","hash":{},"data":data,"loc":{"start":{"line":16,"column":37},"end":{"line":16,"column":53}}}) : helper)))
    + "\"\n                                itemprop=\"image\"\n                                data-loader=\"false\">\n                        </li>\n";
},"8":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"with").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"firstImage") : depth0),{"name":"with","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":24,"column":3},"end":{"line":39,"column":12}}})) != null ? stack1 : "")
    + "\n";
},"9":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"isVideo") : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0, blockParams, depths),"inverse":container.program(12, data, 0, blockParams, depths),"data":data,"loc":{"start":{"line":25,"column":16},"end":{"line":38,"column":23}}})) != null ? stack1 : "");
},"10":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                    <div class=\"videoContainer\">\n                        <iframe src=\""
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"url") || (depth0 != null ? compilerNameLookup(depth0,"url") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"url","hash":{},"data":data,"loc":{"start":{"line":27,"column":37},"end":{"line":27,"column":44}}}) : helper)))
    + "\" width=\"555\" height=\"555\" frameborder=\"0\" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>\n                    </div>\n";
},"12":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "                    <div class=\"product-details-image-gallery-detailed-image\" data-zoom>\n                        <img\n                            class=\"center-block\"\n                            src=\""
    + alias3((compilerNameLookup(helpers,"resizeImage")||(depth0 && compilerNameLookup(depth0,"resizeImage"))||alias2).call(alias1,(depth0 != null ? compilerNameLookup(depth0,"url") : depth0),(depths[1] != null ? compilerNameLookup(depths[1],"imageResizeId") : depths[1]),{"name":"resizeImage","hash":{},"data":data,"loc":{"start":{"line":33,"column":33},"end":{"line":33,"column":69}}}))
    + "\"\n                            alt=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"altimagetext") || (depth0 != null ? compilerNameLookup(depth0,"altimagetext") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"altimagetext","hash":{},"data":data,"loc":{"start":{"line":34,"column":33},"end":{"line":34,"column":49}}}) : helper)))
    + "\"\n                            itemprop=\"image\"\n                            data-loader=\"false\">\n                    </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "<div class=\"product-details-image-gallery\">\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"showImages") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":1},"end":{"line":42,"column":8}}})) != null ? stack1 : "")
    + "	<!--div data-view=\"SocialSharing.Flyout.Hover\"></div-->\n</div>\n\n\n\n\n";
},"useData":true,"useDepths":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'product_details_image_gallery'; return template;});