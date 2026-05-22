/* eslint-disable consistent-return */
define('FreeShippingMethod.Model', [
    'Application',
    'Configuration',
    'SiteSettings.Model',
    'Utils'
], function FreeShippingMethodModel(
    Application,
    Configuration,
    SiteSettingsModel,
    Utils
) {
    return {
        setItemExcludedFromShipping: function setItemExcludedFromShipping(cartItemId, excluded) {
            nlapiGetWebContainer().getShoppingSession().getOrder().setEnableItemLineShipping();
            nlapiGetWebContainer().getShoppingSession().getOrder().setItemExcludedFromShipping(cartItemId, excluded); //esto es commerce api
        }
    };
});
