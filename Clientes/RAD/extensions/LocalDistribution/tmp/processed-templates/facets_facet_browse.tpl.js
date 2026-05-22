define('facets_facet_browse.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "	<div class=\"facets-facet-browse-content\">\n		<div class=\"facets-facet-browse-facets "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isDesktopDevice") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":41},"end":{"line":6,"column":79}}})) != null ? stack1 : "")
    + "\" data-action=\"pushable\" data-id=\"product-search-facets\">\n			<div data-cms-area=\"facet_navigation_top\" data-cms-area-filters=\"page_type\"></div>\n			<div class=\"custom-facets-container\">\n				<div data-view=\"Facets.FacetedNavigation\" data-exclude-facets=\"commercecategoryname,category\"></div>\n			</div>\n		</div>\n\n		<!--\n			Sample of how to add a particular facet into the HTML. It is important to specify the data-facet-id=\"<facet id>\"\n			properly <div data-view=\"Facets.FacetedNavigation.Item\" data-facet-id=\"custitem1\"></div>\n			 -->\n\n		<div class=\"facets-facet-browse-results\">\n\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isCategory") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":20,"column":3},"end":{"line":26,"column":10}}})) != null ? stack1 : "")
    + "\n			<header class=\"facets-facet-browse-header\">\n				<div data-view=\"Facets.Horizontal.View\"></div>\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showItems") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":30,"column":4},"end":{"line":86,"column":11}}})) != null ? stack1 : "")
    + "			</header>\n\n			<meta itemprop=\"name\" content=\""
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"title") || (depth0 != null ? compilerNameLookup(depth0,"title") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":89,"column":34},"end":{"line":89,"column":43}}}) : helper)))
    + "\" />\n\n			<div data-cms-area=\"facets_facet_browse_cms_area_1\" data-cms-area-filters=\"page_type\"></div>\n\n			<div id=\"banner-section-top\" class=\"content-banner banner-section-top\" data-cms-area=\"item_list_banner_top\"\n				data-cms-area-filters=\"path\"></div>\n\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showItems") : depth0),{"name":"if","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":96,"column":3},"end":{"line":104,"column":10}}})) != null ? stack1 : "")
    + "\n			<div class=\"facets-facet-browse-pagination\" data-view=\"GlobalViews.Pagination\"></div>\n\n			<div id=\"banner-section-results-bottom-this-page\" class=\"content-banner banner-section-bottom\"\n				data-cms-area=\"item_list_results_banner_bottom_this_page\" data-cms-area-filters=\"path\"></div>\n\n		</div>\n\n	</div>\n\n	<div class=\"facets-facet-browse-cms-area-2\" data-cms-area=\"facets_facet_browse_cms_area_2\"\n		data-cms-area-filters=\"page_type\"></div>\n\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "collapse";
},"4":function(container,depth0,helpers,partials,data) {
    return "			<!--div class=\"facets-facet-browse-category\">\n						<div data-view=\"Facets.Browse.CategoryHeading\"></div>\n\n						<div data-view=\"Facets.CategoryCells\"></div>\n					</div-->\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "				<p class=\"facets-facet-browse-title\" data-quantity=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"total") || (depth0 != null ? compilerNameLookup(depth0,"total") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"total","hash":{},"data":data,"loc":{"start":{"line":31,"column":56},"end":{"line":31,"column":65}}}) : helper)))
    + "\">\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"keywords") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(12, data, 0),"data":data,"loc":{"start":{"line":32,"column":5},"end":{"line":45,"column":12}}})) != null ? stack1 : "")
    + "				</p>\n\n				<nav class=\"facets-facet-browse-list-header\">\n					<!--div class=\"facets-facet-browse-list-header-actions\" data-view=\"Facets.ItemListDisplaySelector\"></div-->\n\n					<div class=\"facets-facet-browse-list-header-expander\">\n						<button class=\"facets-facet-browse-list-header-expander-button collapsed\" data-toggle=\"collapse\"\n							data-target=\"#list-header-filters\" aria-expanded=\"true\" aria-controls=\"list-header-filters\">\n							"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Sort & Filter",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":54,"column":7},"end":{"line":54,"column":36}}}))
    + "\n							<i class=\"facets-facet-browse-list-header-expander-icon\"></i>\n						</button>\n					</div>\n\n					<div class=\"facets-facet-browse-list-header-filters collapse\" id=\"list-header-filters\">\n						<div class=\"facets-facet-browse-list-header-filters-wrapper\">\n\n							<div class=\"facets-facet-browse-list-header-filters-row\">\n\n								<div class=\"facets-facet-browse-list-header-filter-column\"\n									data-view=\"Facets.ItemListShowSelector\">\n								</div>\n\n								<div class=\"facets-facet-browse-list-header-filter-column\"\n									data-view=\"Facets.ItemListSortSelector\">\n								</div>\n\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"hasItemsAndFacets") : depth0),{"name":"if","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":72,"column":8},"end":{"line":80,"column":15}}})) != null ? stack1 : "")
    + "							</div>\n\n						</div>\n					</div>\n				</nav>\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"isTotalProductsOne") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.program(10, data, 0),"data":data,"loc":{"start":{"line":33,"column":5},"end":{"line":38,"column":12}}})) != null ? stack1 : "");
},"8":function(container,depth0,helpers,partials,data) {
    return "					"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"1 Result for <span class=\"facets-facet-browse-title-alt\">$(0)</span>",(depth0 != null ? compilerNameLookup(depth0,"keywords") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":34,"column":5},"end":{"line":34,"column":98}}}))
    + "\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "					"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"$(0) Results for <span class=\"facets-facet-browse-title-alt\">$(1)</span>",(depth0 != null ? compilerNameLookup(depth0,"total") : depth0),(depth0 != null ? compilerNameLookup(depth0,"keywords") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":36,"column":5},"end":{"line":37,"column":15}}}))
    + "\n";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"isTotalProductsOne") : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.program(15, data, 0),"data":data,"loc":{"start":{"line":40,"column":5},"end":{"line":44,"column":12}}})) != null ? stack1 : "");
},"13":function(container,depth0,helpers,partials,data) {
    return "					"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"1 Product",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":41,"column":5},"end":{"line":41,"column":30}}}))
    + "\n";
},"15":function(container,depth0,helpers,partials,data) {
    return "					"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"$(0) Products",(depth0 != null ? compilerNameLookup(depth0,"total") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":43,"column":5},"end":{"line":43,"column":40}}}))
    + "\n";
},"17":function(container,depth0,helpers,partials,data) {
    return "								<div class=\"facets-facet-browse-list-header-filter-column\">\n									<button class=\"facets-facet-browse-list-header-filter-facets\" data-type=\"sc-pusher\"\n										data-target=\"product-search-facets\">\n										"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Narrow By",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":76,"column":10},"end":{"line":76,"column":35}}}))
    + "\n										<i class=\"facets-facet-browse-list-header-filter-facets-icon\"></i>\n									</button>\n								</div>\n";
},"19":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "			<div class=\"facets-facet-browse-narrowedby\" data-view=\"Facets.FacetsDisplay\"></div>\n\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"isEmptyList") : depth0),{"name":"if","hash":{},"fn":container.program(20, data, 0),"inverse":container.program(22, data, 0),"data":data,"loc":{"start":{"line":99,"column":3},"end":{"line":103,"column":10}}})) != null ? stack1 : "");
},"20":function(container,depth0,helpers,partials,data) {
    return "			<div data-view=\"Facets.Items.Empty\"></div>\n";
},"22":function(container,depth0,helpers,partials,data) {
    return "			<div class=\"facets-facet-browse-items\" data-view=\"Facets.Items\"></div>\n";
},"24":function(container,depth0,helpers,partials,data) {
    return "	<div class=\"facets-facet-browse-empty-items\" data-view=\"Facets.Items.Empty\"></div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<section class=\"facets-facet-browse\">\n	<div data-cms-area=\"item_list_category_banner\" data-cms-area-filters=\"path\"></div>\n\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"showResults") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(24, data, 0),"data":data,"loc":{"start":{"line":4,"column":1},"end":{"line":120,"column":8}}})) != null ? stack1 : "")
    + "\n	<div id=\"banner-section-bottom-this-page\"\n		class=\"content-banner banner-section-bottom facets-facet-browse-banner-section-bottom\"\n		data-cms-area=\"item_list_banner_bottom_this_page\" data-cms-area-filters=\"path\"></div>\n\n	<div id=\"banner-section-bottom\"\n		class=\"content-banner banner-section-bottom facets-facet-browse-banner-section-bottom\"\n		data-cms-area=\"item_list_banner_bottom\" data-cms-area-filters=\"page_type\"></div>\n\n</section>\n\n\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/AwaLabs/ReginaAndrewTheme/23.2.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'facets_facet_browse'; return template;});