
define('SuiteLabs.SEOEnhancements.Main', [
    'jQuery',
    'underscore',
    'Facets.Browse.View.FixMetaDescription',
    'CMSadapter.Impl.Enhanced.OpenGraph.Fix'
], function SuiteLabsSEOEnhancementsMain(
    jQuery,
    _
) {
    'use strict';

    // If the UA is google and main div is not empty (was pre-rendered) then unwrap the images for googlebot
    if (navigator.userAgent.match(/googlebot/i) && jQuery('#main') && String(jQuery('#main').html()).trim()) {
        jQuery('noscript').each(function eachNoScript() {
            jQuery(this).parent().append(
                jQuery(this).text()
            );
        });
    }

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');

            // Switch H1 and H5 content on the blog's categories to improve SEO metadata relevance
            layout.addToViewContextDefinition('SuiteCommerce.Blog.BlogHome.View', 'header', 'string', function updateHeader(context) {
                return context.postListTitle && context.postListTitle.label ? context.postListTitle.label : context.header;
            });

            layout.addToViewContextDefinition('SuiteCommerce.Blog.BlogHome.View', 'url', 'string', function updateUrl() {
                return '#';
            });

            layout.addToViewContextDefinition('SuiteCommerce.Blog.BlogHome.View', 'postListTitle', 'string', function updatePostList() {
                return {
                    label: _.translate('Articles')
                };
            });
            // -----------------------------------------------------------------------------------
        }
    };
});
