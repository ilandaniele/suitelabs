define('themehelper_facets_facet_browse.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isCategory") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":2},"end":{"line":13,"column":9}}})) != null ? stack1 : "")
    + "\n		<div class=\"facets-facet-browse-content "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"hasItemsAndFacets") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data,"loc":{"start":{"line":15,"column":42},"end":{"line":15,"column":90}}})) != null ? stack1 : "")
    + "\">\n\n			<div class=\"facets-facet-browse-facets\" data-action=\"pushable\" data-id=\"product-search-facets\">\n\n				<div data-cms-area=\"facet_navigation_top\" data-cms-area-filters=\"page_type\"></div>\n\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"hasItemsAndFacets") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":21,"column":4},"end":{"line":25,"column":11}}})) != null ? stack1 : "")
    + "\n				<div data-view=\"Facets.FacetedNavigation\" data-exclude-facets=\"commercecategoryname,category\"></div>\n\n				<div data-cms-area=\"facet_navigation_bottom\" data-cms-area-filters=\"page_type\"></div>\n			</div>\n\n			<!--\n			Sample of how to add a particular facet into the HTML. It is important to specify the data-facet-id=\"<facet id>\"\n			properly <div data-view=\"Facets.FacetedNavigation.Item\" data-facet-id=\"custitem1\"></div>\n			 -->\n\n			<div class=\"facets-facet-browse-results\">\n\n				<header class=\"facets-facet-browse-header "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isCategory") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":39,"column":46},"end":{"line":39,"column":91}}})) != null ? stack1 : "")
    + "\">\n\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showItems") : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":41,"column":5},"end":{"line":94,"column":12}}})) != null ? stack1 : "")
    + "				</header>\n\n				<div data-cms-area=\"facets_facet_browse_cms_area_1\" data-cms-area-filters=\"page_type\"></div>\n\n				<div id=\"banner-section-top\" class=\"content-banner banner-section-top\" data-cms-area=\"item_list_banner_top\" data-cms-area-filters=\"path\"></div>\n\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showItems") : depth0),{"name":"if","hash":{},"fn":container.program(26, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":101,"column":4},"end":{"line":109,"column":11}}})) != null ? stack1 : "")
    + "			</div>\n\n			<div class=\"facets-facet-browse-pagination\" data-view=\"GlobalViews.Pagination\"></div>\n		</div>\n\n		<div class=\"facets-facet-browse-cms-path-area-1\" data-cms-area=\"facets_facet_browse_cms_path_area_1\" data-cms-area-filters=\"path\"></div>\n		<div class=\"facets-facet-browse-cms-area-2\" data-cms-area=\"facets_facet_browse_cms_area_2\" data-cms-area-filters=\"page_type\"></div>\n\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "				<div class=\"facets-facet-browse-category\">\n						<div data-view=\"Facets.Browse.CategoryHeading\" class=\"facets-facet-browse-category-heading-container\"></div>\n						<div data-view=\"Facets.CategoryCells\"  class=\"facets-facet-browse-category-cells-container\"></div>\n				</div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "";
},"6":function(container,depth0,helpers,partials,data) {
    return "no-items";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"isCategory") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":22,"column":5},"end":{"line":24,"column":12}}})) != null ? stack1 : "");
},"9":function(container,depth0,helpers,partials,data) {
    return "						<div data-view=\"Facets.CategorySidebar\" class=\"facets-facet-browse-facets-sidebar\"></div>\n";
},"11":function(container,depth0,helpers,partials,data) {
    return "category-list-header";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "					<h1 class=\"facets-facet-browse-title\" data-quantity=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"total") || (depth0 != null ? compilerNameLookup(depth0,"total") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"total","hash":{},"data":data,"loc":{"start":{"line":42,"column":58},"end":{"line":42,"column":67}}}) : helper)))
    + "\">\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"keywords") : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.program(19, data, 0),"data":data,"loc":{"start":{"line":43,"column":6},"end":{"line":55,"column":13}}})) != null ? stack1 : "")
    + "					</h1>\n\n					<nav class=\"facets-facet-browse-list-header\">\n						<div class=\"facets-facet-browse-list-header-actions\" data-view=\"Facets.ItemListDisplaySelector\"></div>\n\n						<div class=\"facets-facet-browse-list-header-expander\">\n							<button class=\"facets-facet-browse-list-header-expander-button collapsed\" data-toggle=\"collapse\" data-target=\"#list-header-filters\" aria-expanded=\"true\" aria-controls=\"list-header-filters\">\n								"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Sort & Filter",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":63,"column":8},"end":{"line":63,"column":37}}}))
    + "\n								<i class=\"facets-facet-browse-list-header-expander-icon\"></i>\n							</button>\n						</div>\n\n						<div class=\"facets-facet-browse-list-header-filters collapse\" id=\"list-header-filters\">\n							<div class=\"facets-facet-browse-list-header-filters-wrapper\">\n\n								<div class=\"facets-facet-browse-list-header-filters-row\">\n\n									<div class=\"facets-facet-browse-list-header-filter-column\" data-view=\"Facets.ItemListShowSelector\">\n									</div>\n\n									<div class=\"facets-facet-browse-list-header-filter-column\" data-view=\"Facets.ItemListSortSelector\">\n									</div>\n\n                                    <div class=\"facets-facet-browse-list-header-actions-mobile\" data-view=\"Facets.ItemListDisplaySelector\"></div>\n\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"hasItemsAndFacets") : depth0),{"name":"if","hash":{},"fn":container.program(24, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":81,"column":9},"end":{"line":88,"column":16}}})) != null ? stack1 : "")
    + "								</div>\n\n							</div>\n						</div>\n					</nav>\n";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"isTotalProductsOne") : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.program(17, data, 0),"data":data,"loc":{"start":{"line":44,"column":7},"end":{"line":48,"column":14}}})) != null ? stack1 : "");
},"15":function(container,depth0,helpers,partials,data) {
    return "								"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"1 Result for <span class=\"facets-facet-browse-title-alt\">$(0)</span>",(depth0 != null ? compilerNameLookup(depth0,"keywords") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":45,"column":8},"end":{"line":45,"column":101}}}))
    + "\n";
},"17":function(container,depth0,helpers,partials,data) {
    return "								"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"$(0) Results for <span class=\"facets-facet-browse-title-alt\">$(1)</span>",(depth0 != null ? compilerNameLookup(depth0,"total") : depth0),(depth0 != null ? compilerNameLookup(depth0,"keywords") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":47,"column":8},"end":{"line":47,"column":111}}}))
    + "\n";
},"19":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"isTotalProductsOne") : depth0),{"name":"if","hash":{},"fn":container.program(20, data, 0),"inverse":container.program(22, data, 0),"data":data,"loc":{"start":{"line":50,"column":7},"end":{"line":54,"column":14}}})) != null ? stack1 : "");
},"20":function(container,depth0,helpers,partials,data) {
    return "								"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"1 Product",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":51,"column":8},"end":{"line":51,"column":33}}}))
    + "\n";
},"22":function(container,depth0,helpers,partials,data) {
    return "								"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"$(0) Products",(depth0 != null ? compilerNameLookup(depth0,"total") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":53,"column":8},"end":{"line":53,"column":43}}}))
    + "\n";
},"24":function(container,depth0,helpers,partials,data) {
    return "										<div class=\"facets-facet-browse-list-header-filter-column\">\n											<button class=\"facets-facet-browse-list-header-filter-facets\" data-type=\"sc-pusher\" data-target=\"product-search-facets\">\n												"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Narrow By",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":84,"column":12},"end":{"line":84,"column":37}}}))
    + "\n												<i class=\"facets-facet-browse-list-header-filter-facets-icon\"></i>\n											</button>\n										</div>\n";
},"26":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "					<div class=\"facets-facet-browse-narrowedby\" data-view=\"Facets.FacetsDisplay\"></div>\n\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"isEmptyList") : depth0),{"name":"if","hash":{},"fn":container.program(27, data, 0),"inverse":container.program(29, data, 0),"data":data,"loc":{"start":{"line":104,"column":5},"end":{"line":108,"column":12}}})) != null ? stack1 : "");
},"27":function(container,depth0,helpers,partials,data) {
    return "						<div class=\"facets-facet-browse-empty-items\" data-view=\"Facets.Items.Empty\"></div>\n";
},"29":function(container,depth0,helpers,partials,data) {
    return "						<div class=\"facets-facet-browse-items\" data-view=\"Facets.Items\"></div>\n";
},"31":function(container,depth0,helpers,partials,data) {
    return "		<div class=\"facets-facet-browse-empty-items\" data-view=\"Facets.Items.Empty\"></div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n<section class=\"facets-facet-browse\">\n	<div data-cms-area=\"item_list_banner\" data-cms-area-filters=\"page_type\"></div>\n    <div id=\"category-page-content\" data-cms-area=\"category_page_content\" data-cms-area-filters=\"path\"></div>\n\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"showResults") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(31, data, 0),"data":data,"loc":{"start":{"line":7,"column":1},"end":{"line":120,"column":8}}})) != null ? stack1 : "")
    + "\n	<div id=\"banner-section-bottom\" class=\"content-banner banner-section-bottom facets-facet-browse-banner-section-bottom\" data-cms-area=\"item_list_banner_bottom\" data-cms-area-filters=\"page_type\"></div>\n</section>\n\n\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/NSeComm/ThemeHelper/1.0.18/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'themehelper_facets_facet_browse'; return template;});