define('NSeComm.MultiAddToCart.Main', [
    'MultiAddToCart.View',
    'Backbone',
    'jQuery',
    'underscore'
], function NSeCommMultiAddToCartMain(
    MultiAddToCartView,
    Backbone,
    jQuery,
    _
) {
    'use strict';

    // Update navigation URL
    var multiAddToCartFullurls;

    function updateMenuCategoriesURL(categories) {
        var i;
        for (i = 0; i < categories.length; i++) {
            if (_.contains(multiAddToCartFullurls, categories[i].href)) {
                if (categories[i].data) {
                    categories[i].data.hashtag = '#multipleadd?' + categories[i].href;
                } else {
                    categories[i].dataHashtag = '#multipleadd?' + categories[i].href;
                }
                categories[i].href = '/multipleadd?' + categories[i].href;
            }
            if (categories[i].categories && categories[i].categories.length !== 0) {
                updateMenuCategoriesURL(categories[i].categories);
            }
        }
    }

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            var env = container.getComponent('Environment');
            var PageType = container.getComponent('PageType');
            if (layout) {
                // Extended Backbone History Navigate function to support check discard in multi add to page
                _.extend(Backbone.History.prototype, {
                    navigate: _.wrap(Backbone.History.prototype.navigate, function wrapNavigate(fn) {
                        var self = this;
                        var multiAddStatus = {
                            unaddedItems: false
                        };
                        var confirmed = '';
                        Backbone.trigger('multiaddto:discard', multiAddStatus);
                        if (multiAddStatus.unaddedItems) {
                            confirmed = window.confirm(multiAddStatus.msg || 'Your items have not been added to cart yet, are you sure to leave?');
                            if (confirmed) {
                                fn.apply(self, _.toArray(arguments).slice(1));
                            }
                        } else {
                            fn.apply(self, _.toArray(arguments).slice(1));
                        }
                    })
                });

                jQuery(window).bind('beforeunload', function beforeUnload() {
                    var multipleAddToStatus = {
                        unsavedEdits: false
                    };
                    Backbone.trigger('multiaddto:discard', multipleAddToStatus);
                    if (multipleAddToStatus.unaddedItems) {
                        return multipleAddToStatus.msg || _.translate('Your items have not been added to cart yet, are you sure to leave?');
                    }
                    return '';
                });

                multiAddToCartFullurls = env.getConfig('multipleAddToCart.commerceCategories');
                layout.addToViewContextDefinition('Header.Menu.View', 'categories', 'string', function addCategoriesToViewContextDefinition(context) {
                    var categories = context.categories;
                    updateMenuCategoriesURL(categories);
                    return categories;
                });
            }

            PageType.registerPageType({
                name: 'multiaddtocart',
                routes: ['multipleadd', 'multipleadd?*params'],
                view: MultiAddToCartView,
                options: { container: container },

                defaultTemplate: {
                    name: 'multiaddtocart.tpl',
                    displayName: ''
                }
            });
        }
    };
});
