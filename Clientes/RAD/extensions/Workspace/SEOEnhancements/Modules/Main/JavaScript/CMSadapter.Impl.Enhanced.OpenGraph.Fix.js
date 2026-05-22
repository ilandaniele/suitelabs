define('CMSadapter.Impl.Enhanced.OpenGraph.Fix', [
    'CMSadapter.Impl.Enhanced',
    'jQuery',
    'underscore'
], function CMSadapterImplEnhancedOpenGraphFix(
    CMSadapterImplEnhanced,
    jQuery,
    _
) {
    'use strict';

    var seoTitle = function seoTitle(layout) {
        var title = layout.$('[itemprop="name"]:eq(0)').text();

        if (!title) {
            title = document.title;
        }

        return title && title.length ? String(title).trim() : '';
    };

    var seoDescription = function seoDescription(layout) {
        var socialDescription = layout
            .$('[data-type="social-description"], [itemprop="description"]')
            .first()
            .text();

        socialDescription = String(socialDescription).trim().replace(/\s+/g, ' ');

        if (!socialDescription) {
            socialDescription = layout
            && layout.currentView
            && layout.currentView.getMetaDescription
            && layout.currentView.getMetaDescription();
        }

        return socialDescription && socialDescription.length ? socialDescription : '';
    };

    function clearOpenGraphTagsByConfiguration(openGraphConfiguration) {
        var metaTag;

        _.each(openGraphConfiguration, function eachTag(fn, name) {
            metaTag = jQuery('meta[property="' + name + '"]');

            if (metaTag) {
                metaTag.remove();
            }
        });
    }

    function setMetaTagsByConfiguration(layout, metaTagConfiguration) {
        _.each(metaTagConfiguration, function eachMetaTag(fn, name) {
            var content = fn(layout);

            jQuery('<meta />', {
                property: name,
                content: content || ''
            }).appendTo(jQuery('head'));
        });
    }

    _.extend(CMSadapterImplEnhanced.prototype, {
        'enhancePage': _.wrap(CMSadapterImplEnhanced.prototype.enhancePage, function enhancePage(fn, view, layout) {
            var metaTags = {
                'og:title': seoTitle,
                'og:description': seoDescription
            };

            fn.apply(this, _.toArray(arguments).slice(1));

            clearOpenGraphTagsByConfiguration(metaTags);
            setMetaTagsByConfiguration(layout, metaTags);
        })
    });
});
