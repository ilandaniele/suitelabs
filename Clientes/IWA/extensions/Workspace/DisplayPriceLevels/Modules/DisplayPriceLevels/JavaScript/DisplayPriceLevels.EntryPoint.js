define('DisplayPriceLevels.EntryPoint', [
    'ProductViews.Price.View',
    'themehelper_product_views_price.tpl',
    'underscore'
], function DisplayPriceLevelsEntryPoint(
    ProductViewsPriceView,
    Template,
    _
) {
    'use strict';

    _.extend(ProductViewsPriceView.prototype, {
        render: _.wrap(ProductViewsPriceView.prototype.render, function render(fn) {
            if (this.template.Name !== 'themehelper_product_views_price') {
                this.template = Template;
            }

            return fn.apply(this, _.toArray(arguments).slice(1));
        })
    });

    return  {
        mountToApp: function mountToApp (container) {
            var pdpComponent = container.getComponent('PDP');
            var userProfileComponent = container.getComponent('UserProfile');
            var environmentComponent = container.getComponent("Environment");


            if(pdpComponent && userProfileComponent && environmentComponent) {
                userProfileComponent.getUserProfile().then(function(profileInformation) {
                    if (profileInformation.isloggedin === true) {
                        var usersPriceLevel = profileInformation.pricelevel;
                        var priceLevelConfiguration = environmentComponent.getConfig('priceLevels.textMapping');
                        var priceLevelData = _.findWhere(priceLevelConfiguration, { id: usersPriceLevel });
                        if (priceLevelData) {
                            pdpComponent.addToViewContextDefinition('ProductViews.Price.View', 'showPriceLevelName', 'boolean', function showPriceLevelNameCtxDef(context) {
                                return priceLevelData.enabled;
                            });
                            pdpComponent.addToViewContextDefinition('ProductViews.Price.View', 'priceLevelName', 'string', function priceLevelNameCtxDef(context) {
                                return priceLevelData.displayName;
                            });
                        }
                    }
                });
            }

        }
    };
});
