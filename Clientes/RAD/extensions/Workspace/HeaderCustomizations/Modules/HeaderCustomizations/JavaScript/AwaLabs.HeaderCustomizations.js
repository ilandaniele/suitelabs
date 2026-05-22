define('AwaLabs.HeaderCustomizations', [
    'underscore',
    'Profile.Model',
    'Header.Menu.View',
    'SC.Configuration',
    'Categories',
    'HeaderCustomizations.MyAccount.Menu',
    'HeaderCustomizations.Header.View'
], function HeaderCustomizations(
    _,
    ProfileModel,
    HeaderMenuView,
    Configuration,
    Categories,
    HeaderCustomizationsMyAccountMenu
) {
    'use strict';

    return {
        addImageToRootCategories: function addImageToRootCategories() {
            var arrayImagesObject = SC.ENVIRONMENT.published.SCCategoryConfiguration;
            var imageObject;
            _.each(Configuration.navigationData, function eachNav(nav) {
                imageObject = _.find(arrayImagesObject, function findImageObject(imageObj) {
                    return imageObj.siteCategory && imageObj.siteCategory.toUpperCase() === nav.text.toUpperCase();
                });
                if (imageObject) {
                    nav.image = imageObject;
                }
            });
        },
        mountToApp: function mountToApp(container) {
            var self = this;
            var layout = container.getComponent('Layout');
            var profile = ProfileModel.getInstance();
            var showMyAccount = !profile.get('contactId') || (!!profile.get('contactId')() && profile.allowPriceControl());
            Categories.getCategoriesPromise().done(function dnFn() {
                self.addImageToRootCategories();
            });
            if (!showMyAccount) {
                HeaderMenuView.removeChildView('Header.Menu.MyAccount', 'Header.Menu.MyAccount');
            }
            if (layout) {
                layout.addToViewContextDefinition('Header.Menu.View', 'showMyAccount', 'boolean', function fn() {
                    return showMyAccount;
                });

                layout.addToViewContextDefinition('RequestQuoteAccessPoints.HeaderLink.View', 'DisplayLink', 'boolean', function fn() {
                    return profile.get('isLoggedIn') === 'T';
                });
            }

            HeaderCustomizationsMyAccountMenu.mountToApp(container);
        }
    };
});
