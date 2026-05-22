define('themehelper_product_reviews_center.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var t = {"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "				<div class=\"product-reviews-center-container\">\n					<div class=\"product-reviews-center-container-header\">\n                        <div class=\"product-reviews-center-container-header-title-container\">\n                            <h2 class=\"product-reviews-center-container-header-title\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Ratings &amp; Reviews",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":15,"column":86},"end":{"line":15,"column":123}}}))
    + "</h2>\n                        </div>\n                        \n                        <div class=\"product-reviews-center-container-header-button\">\n                            <a href=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"itemUrl") || (depth0 != null ? compilerNameLookup(depth0,"itemUrl") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"itemUrl","hash":{},"data":data,"loc":{"start":{"line":19,"column":37},"end":{"line":19,"column":48}}}) : helper)))
    + "/newReview\" class=\"product-reviews-center-container-footer-button\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Write a Review",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":19,"column":115},"end":{"line":19,"column":145}}}))
    + "</a>\n                        </div>\n\n                        <div class=\"product-reviews-center-container-wrapper\">\n                            <div class=\"product-reviews-center-container-left\">\n                                <div class=\"product-reviews-center-global-views-star-rating-container\" data-view=\"Global.StarRating\"></div>\n                            </div>\n                            <div class=\"product-reviews-center-container-right\">\n                                <h3 class=\"product-reviews-center-container-header-number\">\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"hasOneReview") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data,"loc":{"start":{"line":28,"column":36},"end":{"line":32,"column":43}}})) != null ? stack1 : "")
    + "                                </h3>\n                                <div class=\"product-reviews-center-global-views-rating-by-star-container\" data-view=\"Global.RatingByStar\"></div>\n                            </div>\n                        </div>\n					</div>\n\n                    <section class=\"product-reviews-center-list\">\n                         <div class=\"product-reviews-center-container-list-header-view-container\" data-view=\"ListHeader.View\"></div>\n\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"totalRecords") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.program(8, data, 0),"data":data,"loc":{"start":{"line":42,"column":24},"end":{"line":46,"column":31}}})) != null ? stack1 : "")
    + "\n                        <div class=\"product-reviews-center-container-footer\">\n                        </div>\n                    </section>\n				</div>\n\n				<div class=\"product-reviews-center-footer\">\n					<div data-view=\"GlobalViews.Pagination\"></div>\n				</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "                                        "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"1 Review",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":29,"column":40},"end":{"line":29,"column":64}}}))
    + "\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "                                        "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"$(0) Reviews",(depth0 != null ? compilerNameLookup(depth0,"itemCount") : depth0),{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":31,"column":40},"end":{"line":31,"column":78}}}))
    + "\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "                            <div data-view=\"ProductReviews.Review\" class=\"product-reviews-center-review-container\"></div>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "                            "
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"There are no reviews available for your selection",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":45,"column":28},"end":{"line":45,"column":93}}}))
    + "\n";
},"10":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression;

  return "				<div class=\"product-reviews-center-container\">\n					<div class=\"product-reviews-center-container-header product-reviews-center-container-header-no-reviews-available\">\n						<h3 class=\"product-reviews-center-container-header-title\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Ratings &amp; Reviews",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":59,"column":64},"end":{"line":59,"column":101}}}))
    + "</h3>\n						<h4 class=\"product-reviews-center-container-header-title-no-reviews\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"No reviews available",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":60,"column":75},"end":{"line":60,"column":111}}}))
    + "</h4>\n						<p>"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Be the first to",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":61,"column":9},"end":{"line":61,"column":40}}}))
    + " <a href=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"itemUrl") || (depth0 != null ? compilerNameLookup(depth0,"itemUrl") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"itemUrl","hash":{},"data":data,"loc":{"start":{"line":61,"column":50},"end":{"line":61,"column":61}}}) : helper)))
    + "/newReview\" class=\"product-reviews-center-container-button\">"
    + alias3((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||alias2).call(alias1,"Write a Review",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":61,"column":121},"end":{"line":61,"column":151}}}))
    + "</a></p>\n					</div>\n				</div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "\n<section class=\"product-reviews-center-content\">\n	<button class=\"product-reviews-center-pusher\" data-target=\"product-reviews-center-review\" data-type=\"sc-pusher\">\n		<span class=\"product-reviews-center-pusher-title\">"
    + container.escapeExpression((compilerNameLookup(helpers,"translate")||(depth0 && compilerNameLookup(depth0,"translate"))||container.hooks.helperMissing).call(alias1,"Reviews",{"name":"translate","hash":{},"data":data,"loc":{"start":{"line":5,"column":52},"end":{"line":5,"column":77}}}))
    + "</span>\n		<div class=\"product-reviews-center-pusher-rating\" data-view=\"Global.StarRating\"></div>\n		<i class=\"product-reviews-center-pusher-icon\"></i>\n	</button>\n	<div class=\"product-reviews-center-more-info-content-container\" data-action=\"pushable\" data-id=\"product-reviews-center-review\">\n		<div class=\"product-reviews-center\">\n"
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"itemCount") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(10, data, 0),"data":data,"loc":{"start":{"line":11,"column":3},"end":{"line":64,"column":10}}})) != null ? stack1 : "")
    + "		</div>\n	</div>\n</section>\n\n\n\n";
},"useData":true}; var main = t.main; t.main = function(){ arguments[1] = arguments[1] || {}; var ctx = arguments[1]; ctx._extension_path = 'http://localhost:7777/tmp/extensions/NSeComm/ThemeHelper/1.0.18/'; ctx._theme_path = 'http://localhost:7777/tmp/extensions/SC/Posh/3.5.2/'; return main.apply(this, arguments); }; var template = Handlebars.template(t); template.Name = 'themehelper_product_reviews_center'; return template;});