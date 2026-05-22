define('AwaLabs.StoreLocator', [
    'Utils',
    'ReferenceMap.Configuration',
    'StoreLocator.Upgrade.View',
    'ReferenceMap',
    'StoreLocator.List.All.View',
    'StoreLocator.Details.View',
    'ErrorManagement.PageNotFound.View',
    'StoreLocator.Search.View.BoundsFix',
    'StoreLocator.StoreLocator.Details.View',
    'StoreLocator.StoreLocator.List.All.Store.View'
], function AwaLabsStoreLocator(
    Utils,
    ReferenceConfiguration,
    StoreLocatorUpgradeView,
    ReferenceMap,
    StoreLocatorListAllView,
    StoreLocatorDetailsView,
    ErrorManagementPageNotFoundView
) {
    'use strict';


    return {
        mountToApp: function mountToApp(application) {
            var pageType = application.getComponent('PageType');
            var referenceMap = new ReferenceMap();
            if (ReferenceConfiguration.isEnabled() && window.location.protocol === 'https:') {
                if (Utils.oldIE(8)) {
                    // remove previous route
                    pageType.registerPageType({
                        name: 'StoreLocatorUpgrade',
                        routes: ['stores', 'stores/details/:id', 'stores/all', 'stores/all?:options'],
                        view: ErrorManagementPageNotFoundView,
                        defaultTemplate: {
                            name: 'store_locator_upgrade.tpl',
                            displayName: 'Browser Upgrade',
                            thumbnail: Utils.getThemeAbsoluteUrlOfNonManagedResources(
                                '/path/to/store_locator_upgrade_tpl.png'
                            )
                        }
                    });
                    // add new route
                    pageType.registerPageType({
                        name: 'StoreLocatorUpgrade',
                        routes: ['stores', 'stores/:id', 'storelist', 'storelist?:options'],
                        view: StoreLocatorUpgradeView,
                        defaultTemplate: {
                            name: 'store_locator_upgrade.tpl',
                            displayName: 'Browser Upgrade',
                            thumbnail: Utils.getThemeAbsoluteUrlOfNonManagedResources(
                                '/path/to/store_locator_upgrade_tpl.png'
                            )
                        }
                    });
                } else {
                    // remove previous route
                    pageType.registerPageType({
                        name: 'StoreLocatorListAll',
                        routes: ['stores/all', 'stores/all?:options'],
                        view: ErrorManagementPageNotFoundView,
                        defaultTemplate: {
                            name: 'store_locator_list_all.tpl',
                            displayName: ReferenceConfiguration.title(),
                            thumbnail: Utils.getThemeAbsoluteUrlOfNonManagedResources(
                                'img/default-layout-store-locator-list.png'
                            )
                        }
                    });
                    // add new route
                    pageType.registerPageType({
                        name: 'StoreLocatorListAll',
                        routes: ['storelist', 'storelist?:options'],
                        view: StoreLocatorListAllView,
                        defaultTemplate: {
                            name: 'store_locator_list_all.tpl',
                            displayName: ReferenceConfiguration.title(),
                            thumbnail: Utils.getThemeAbsoluteUrlOfNonManagedResources(
                                'img/default-layout-store-locator-list.png'
                            )
                        }
                    });
                    // remove previous route
                    pageType.registerPageType({
                        name: 'StoreLocatorDetails',
                        routes: ['stores/details/:id'],
                        view: ErrorManagementPageNotFoundView,
                        defaultTemplate: {
                            name: 'store_locator_details.tpl',
                            displayName: referenceMap.configuration.title(),
                            thumbnail: Utils.getThemeAbsoluteUrlOfNonManagedResources(
                                'img/default-layout-store-locator-details.png'
                            )
                        }
                    });
                    // add new route
                    pageType.registerPageType({
                        name: 'StoreLocatorDetails',
                        routes: ['stores/:id'],
                        view: StoreLocatorDetailsView,
                        defaultTemplate: {
                            name: 'store_locator_details.tpl',
                            displayName: referenceMap.configuration.title(),
                            thumbnail: Utils.getThemeAbsoluteUrlOfNonManagedResources(
                                'img/default-layout-store-locator-details.png'
                            )
                        }
                    });
                }
            }
        }
    };
});
