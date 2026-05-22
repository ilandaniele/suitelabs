define('MyDownloadsSection', [
    'MyDownloadsSection.View',
    'underscore'
], function MyDownloadsSection(
    MyDownloadsSectionView,
    _
) {
    'use strict';

    var MENU_GROUP_INDEX = 2;

    return {
        mountToApp: function mountToApp(container) {
            var pageTypeComponent = container.getComponent('PageType');
            var myAccountMenuComponent = container.getComponent('MyAccountMenu');

            var cfgGroup = {
                id: 'downloads',
                name: _('Downloads').translate(),
                index: MENU_GROUP_INDEX
            };

            var cfgEntryCustomerRecord = {
                id: 'my-downloads',
                groupid: cfgGroup.id,
                name: _('My Downloads').translate(),
                index: 1,
                url: 'downloads'
            };

            myAccountMenuComponent.addGroup(cfgGroup);
            myAccountMenuComponent.addGroupEntry(cfgEntryCustomerRecord);

            pageTypeComponent.registerPageType({
                name: 'MyDownloadsCustomerRecord',
                routes: [
                    cfgEntryCustomerRecord.url,
                    cfgEntryCustomerRecord.url + '?:options'
                ],
                view: MyDownloadsSectionView,
                options: {
                    title: cfgEntryCustomerRecord.name,
                    source: 'customer',
                    groupEntryId: cfgEntryCustomerRecord.id
                },
                defaultTemplate: {
                    name: 'section-mydownloads.tpl',
                    displayName: cfgEntryCustomerRecord.name,
                    thumbnail: ''
                }
            });

            // var cfgEntrySavedSearch = {
            //     id: 'my-downloads-saved-search',
            //     groupid: cfgGroup.id,
            //     name: _('Downloadable Items (from Saved Search)').translate(),
            //     index: 2,
            //     url: 'mydownloads-search'
            // };
            // myAccountMenuComponent.addGroupEntry(cfgEntrySavedSearch);
            // pageTypeComponent.registerPageType({
            //     name: 'MyDownloadsSavedSearch',
            //     routes: [
            //         cfgEntrySavedSearch.url,
            //         cfgEntrySavedSearch.url + '?:options'
            //     ],
            //     view: MyDownloadsSectionView,
            //     options: {
            //         title: cfgEntrySavedSearch.name,
            //         source: 'search',
            //         groupEntryId: cfgEntrySavedSearch.id
            //     },
            //     defaultTemplate: {
            //         name: 'section-mydownloads.tpl',
            //         displayName: cfgEntrySavedSearch.name,
            //         thumbnail: ''
            //     }
            // });
        }
    };
});
