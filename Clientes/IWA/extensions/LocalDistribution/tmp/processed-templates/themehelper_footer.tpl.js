define('themehelper_footer.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "			<div class=\"footer-content-logo\">\n		        <img class=\"footer-logo-image\" src=\""
    + alias3((compilerNameLookup(helpers,"getThemeAssetsPathWithDefault")||(depth0 && compilerNameLookup(depth0,"getThemeAssetsPathWithDefault"))||alias2).call(alias1,((stack1 = (depth0 != null ? compilerNameLookup(depth0,"extraFooterView") : depth0)) != null ? compilerNameLookup(stack1,"logoUrl") : stack1),"img/SC_Logo.png",{"name":"getThemeAssetsPathWithDefault","hash":{},"data":data,"loc":{"start":{"line":16,"column":46},"end":{"line":16,"column":121}}}))
    + "\" alt=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"siteName") || (depth0 != null ? compilerNameLookup(depth0,"siteName") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"siteName","hash":{},"data":data,"loc":{"start":{"line":16,"column":128},"end":{"line":16,"column":140}}}) : helper)))
    + "\">\n			</div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "	        <div class=\"footer-content-social\">\n	            <ul class=\"footer-content-social-list\">\n"
    + ((stack1 = compilerNameLookup(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? compilerNameLookup(depth0,"extraFooterView") : depth0)) != null ? compilerNameLookup(stack1,"socialMediaLinks") : stack1),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":22,"column":13},"end":{"line":24,"column":22}}})) != null ? stack1 : "")
    + "	            </ul>\n	        </div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, alias4="function";

  return "	                <li><a "
    + alias3((compilerNameLookup(helpers,"objectToAtrributes")||(depth0 && compilerNameLookup(depth0,"objectToAtrributes"))||alias2).call(alias1,(depth0 != null ? compilerNameLookup(depth0,"item") : depth0),{"name":"objectToAtrributes","hash":{},"data":data,"loc":{"start":{"line":23,"column":24},"end":{"line":23,"column":51}}}))
    + " data-hashtag=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"datahashtag") || (depth0 != null ? compilerNameLookup(depth0,"datahashtag") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"datahashtag","hash":{},"data":data,"loc":{"start":{"line":23,"column":66},"end":{"line":23,"column":81}}}) : helper)))
    + "\" data-touchpoint=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"datatouchpoint") || (depth0 != null ? compilerNameLookup(depth0,"datatouchpoint") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"datatouchpoint","hash":{},"data":data,"loc":{"start":{"line":23,"column":100},"end":{"line":23,"column":118}}}) : helper)))
    + "\" data-target=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"datatarget") || (depth0 != null ? compilerNameLookup(depth0,"datatarget") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"datatarget","hash":{},"data":data,"loc":{"start":{"line":23,"column":133},"end":{"line":23,"column":147}}}) : helper)))
    + "\" target=\"_blank\">"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"icon") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data,"loc":{"start":{"line":23,"column":165},"end":{"line":23,"column":256}}})) != null ? stack1 : "")
    + "</a></li>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<i class=\"footer-content-social-icon icon-"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"icon") || (depth0 != null ? compilerNameLookup(depth0,"icon") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"icon","hash":{},"data":data,"loc":{"start":{"line":23,"column":219},"end":{"line":23,"column":227}}}) : helper)))
    + "\"></i>";
},"7":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"text") || (depth0 != null ? compilerNameLookup(depth0,"text") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"text","hash":{},"data":data,"loc":{"start":{"line":23,"column":241},"end":{"line":23,"column":249}}}) : helper)));
},"9":function(container,depth0,helpers,partials,data) {
    return "		<div id=\"footer-cms-area-1\" class=\"footer-cms-area-1\" data-cms-area=\"footer_cms_area_1\" data-cms-area-filters=\"global\"></div>\n        <div data-view=\"FooterContent\"></div>\n";
},"11":function(container,depth0,helpers,partials,data) {
    return "        <div class=\"newsletter-cct-area\" data-cms-area=\"newsletter-cct-area\" data-cms-area-filters=\"global\"></div>\n";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "	            <ul class=\"footer-content-nav-list\">\n"
    + ((stack1 = compilerNameLookup(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? compilerNameLookup(depth0,"extraFooterView") : depth0)) != null ? compilerNameLookup(stack1,"col1Links") : stack1),{"name":"each","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":44,"column":13},"end":{"line":50,"column":22}}})) != null ? stack1 : "")
    + "	            </ul>\n";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"href") : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.program(18, data, 0),"data":data,"loc":{"start":{"line":45,"column":13},"end":{"line":49,"column":20}}})) != null ? stack1 : "");
},"15":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, alias4="function";

  return "	                <li class=\"footer-column-link-listitem\"><a class=\"footer-column-link\" "
    + alias3((compilerNameLookup(helpers,"objectToAtrributes")||(depth0 && compilerNameLookup(depth0,"objectToAtrributes"))||alias2).call(alias1,(depth0 != null ? compilerNameLookup(depth0,"item") : depth0),{"name":"objectToAtrributes","hash":{},"data":data,"loc":{"start":{"line":46,"column":87},"end":{"line":46,"column":114}}}))
    + " data-hashtag=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"datahashtag") || (depth0 != null ? compilerNameLookup(depth0,"datahashtag") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"datahashtag","hash":{},"data":data,"loc":{"start":{"line":46,"column":129},"end":{"line":46,"column":144}}}) : helper)))
    + "\" data-touchpoint=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"datatouchpoint") || (depth0 != null ? compilerNameLookup(depth0,"datatouchpoint") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"datatouchpoint","hash":{},"data":data,"loc":{"start":{"line":46,"column":163},"end":{"line":46,"column":181}}}) : helper)))
    + "\" data-target=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"datatarget") || (depth0 != null ? compilerNameLookup(depth0,"datatarget") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"datatarget","hash":{},"data":data,"loc":{"start":{"line":46,"column":196},"end":{"line":46,"column":210}}}) : helper)))
    + "\" "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"datatarget") : depth0),{"name":"if","hash":{"includeZero":true},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":46,"column":212},"end":{"line":46,"column":269}}})) != null ? stack1 : "")
    + ">"
    + alias3(((helper = (helper = compilerNameLookup(helpers,"text") || (depth0 != null ? compilerNameLookup(depth0,"text") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"text","hash":{},"data":data,"loc":{"start":{"line":46,"column":270},"end":{"line":46,"column":278}}}) : helper)))
    + "</a></li>\n";
},"16":function(container,depth0,helpers,partials,data) {
    return "target=\"_blank\"";
},"18":function(container,depth0,helpers,partials,data) {
    var helper;

  return "	                <li class=\"footer-column-heading-listitem\"><h4 class=\"footer-column-heading\">"
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"text") || (depth0 != null ? compilerNameLookup(depth0,"text") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"text","hash":{},"data":data,"loc":{"start":{"line":48,"column":94},"end":{"line":48,"column":102}}}) : helper)))
    + "</h4></li>\n";
},"20":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "	            <ul class=\"footer-content-nav-list\">\n"
    + ((stack1 = compilerNameLookup(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? compilerNameLookup(depth0,"extraFooterView") : depth0)) != null ? compilerNameLookup(stack1,"col2Links") : stack1),{"name":"each","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":56,"column":13},"end":{"line":62,"column":22}}})) != null ? stack1 : "")
    + "	            </ul>\n";
},"22":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "	            <ul class=\"footer-content-nav-list\">\n"
    + ((stack1 = compilerNameLookup(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? compilerNameLookup(depth0,"extraFooterView") : depth0)) != null ? compilerNameLookup(stack1,"col3Links") : stack1),{"name":"each","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":68,"column":13},"end":{"line":74,"column":22}}})) != null ? stack1 : "")
    + "	            </ul>\n";
},"24":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "	            <ul class=\"footer-content-nav-list\">\n"
    + ((stack1 = compilerNameLookup(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? compilerNameLookup(depth0,"extraFooterView") : depth0)) != null ? compilerNameLookup(stack1,"col4Links") : stack1),{"name":"each","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":80,"column":13},"end":{"line":86,"column":22}}})) != null ? stack1 : "")
    + "	            </ul>\n";
},"26":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"unless").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"hide") : depth0),{"name":"unless","hash":{},"fn":container.program(27, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":96,"column":4},"end":{"line":108,"column":15}}})) != null ? stack1 : "");
},"27":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "    <section class=\"footer-content-copyright-wrapper\">\n        <div class=\"footer-content-copyright\">\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showRange") : depth0),{"name":"if","hash":{},"fn":container.program(28, data, 0, blockParams, depths),"inverse":container.program(30, data, 0, blockParams, depths),"data":data,"loc":{"start":{"line":99,"column":12},"end":{"line":104,"column":19}}})) != null ? stack1 : "")
    + "            <span class=\"footer-extra-info\">"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,((stack1 = (depths[1] != null ? compilerNameLookup(depths[1],"extraFooterView") : depths[1])) != null ? compilerNameLookup(stack1,"text") : stack1),{"name":"if","hash":{},"fn":container.program(32, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":105,"column":44},"end":{"line":105,"column":111}}})) != null ? stack1 : "")
    + "</span>\n        </div>\n    </section>\n";
},"28":function(container,depth0,helpers,partials,data) {
    return "                "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"&copy; $(0) &#8211; $(1) $(2)",(depth0 != null ? compilerNameLookup(depth0,"initialYear") : depth0),(depth0 != null ? compilerNameLookup(depth0,"currentYear") : depth0),(depth0 != null ? compilerNameLookup(depth0,"companyName") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":100,"column":16},"end":{"line":100,"column":97}}}))
    + "\n                <!-- an en dash &#8211; is used to indicate a range of values -->\n";
},"30":function(container,depth0,helpers,partials,data) {
    return "                "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"&copy; $(0) $(1)",(depth0 != null ? compilerNameLookup(depth0,"currentYear") : depth0),(depth0 != null ? compilerNameLookup(depth0,"companyName") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":103,"column":16},"end":{"line":103,"column":72}}}))
    + "\n";
},"32":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = container.lambda(((stack1 = (depths[1] != null ? compilerNameLookup(depths[1],"extraFooterView") : depths[1])) != null ? compilerNameLookup(stack1,"text") : stack1), depth0)) != null ? stack1 : "");
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "\n<div data-view=\"Global.BackToTop\"></div>\n<div class=\"footer-banner-wrapper\">\n	<div id=\"banner-footerFull\" class=\"content-banner banner-footer footer-banner\" data-cms-area=\"global_banner_footerFull\" data-cms-area-filters=\"global\"></div>\n	<div id=\"banner-footer1\" class=\"content-banner banner-footer footer-banner-1\" data-cms-area=\"global_banner_footer1\" data-cms-area-filters=\"global\"></div>\n	<div id=\"banner-footer5\" class=\"content-banner banner-footer footer-banner-5\" data-cms-area=\"global_banner_footer5\" data-cms-area-filters=\"global\"></div>\n</div>\n\n\n<section class=\"footer-wrapper\">\n	<div class=\"footer-content-wrapper\">\n		<div class=\"footer-logo-social\">\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,((stack1 = (depth0 != null ? compilerNameLookup(depth0,"extraFooterView") : depth0)) != null ? compilerNameLookup(stack1,"logoUrl") : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":14,"column":3},"end":{"line":18,"column":10}}})) != null ? stack1 : "")
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,((stack1 = (depth0 != null ? compilerNameLookup(depth0,"extraFooterView") : depth0)) != null ? compilerNameLookup(stack1,"socialMediaLinks") : stack1),{"name":"if","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":19,"column":3},"end":{"line":27,"column":16}}})) != null ? stack1 : "")
    + "			<div id=\"footer-cms-area\" class=\"footer-cms-area\" data-cms-area=\"footer_cms_area\" data-cms-area-filters=\"global\"></div>\n		</div>\n\n		<div class=\"footer-content-newsletter\">\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,((stack1 = (depth0 != null ? compilerNameLookup(depth0,"extraFooterView") : depth0)) != null ? compilerNameLookup(stack1,"showLegacyNewsletter") : stack1),{"name":"if","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.program(11, data, 0, blockParams, depths),"data":data,"loc":{"start":{"line":32,"column":6},"end":{"line":37,"column":13}}})) != null ? stack1 : "")
    + "\n		</div>\n		<div class=\"footer-content\">\n			<div class=\"footer-content-nav\">\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,((stack1 = (depth0 != null ? compilerNameLookup(depth0,"extraFooterView") : depth0)) != null ? compilerNameLookup(stack1,"col1Links") : stack1),{"name":"if","hash":{},"fn":container.program(13, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":42,"column":4},"end":{"line":52,"column":20}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,((stack1 = (depth0 != null ? compilerNameLookup(depth0,"extraFooterView") : depth0)) != null ? compilerNameLookup(stack1,"col2Links") : stack1),{"name":"if","hash":{},"fn":container.program(20, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":54,"column":13},"end":{"line":64,"column":20}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,((stack1 = (depth0 != null ? compilerNameLookup(depth0,"extraFooterView") : depth0)) != null ? compilerNameLookup(stack1,"col3Links") : stack1),{"name":"if","hash":{},"fn":container.program(22, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":66,"column":13},"end":{"line":76,"column":20}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,((stack1 = (depth0 != null ? compilerNameLookup(depth0,"extraFooterView") : depth0)) != null ? compilerNameLookup(stack1,"col4Links") : stack1),{"name":"if","hash":{},"fn":container.program(24, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":78,"column":13},"end":{"line":88,"column":20}}})) != null ? stack1 : "")
    + "			</div>\n			<div id=\"footer-cms-area-2\" class=\"footer-cms-area-2\" data-cms-area=\"footer_cms_area_2\" data-cms-area-filters=\"global\"></div>\n		</div>\n	</div>\n</section>\n\n"
    + ((stack1 = compilerNameLookup(helpers,"with").call(alias1,((stack1 = (depth0 != null ? compilerNameLookup(depth0,"extraFooterView") : depth0)) != null ? compilerNameLookup(stack1,"copyright") : stack1),{"name":"with","hash":{},"fn":container.program(26, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":95,"column":0},"end":{"line":109,"column":9}}})) != null ? stack1 : "")
    + "\n\n";
},"useData":true,"useDepths":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/NSeComm/ThemeHelper/1.0.18/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'themehelper_footer'; return template;});