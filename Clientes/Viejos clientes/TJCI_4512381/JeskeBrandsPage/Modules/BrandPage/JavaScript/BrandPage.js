
define('BrandPage', [
    'BrandPage.List.View'],
    function (BrandPageListView) {
        'use strict';

        return {
            mountToApp: function mountToApp(container) {
                var PageType = container.getComponent('PageType');
                PageType.registerPageType({
                    name: 'brands_list',
                    routes: ['brands'],
                    view: BrandPageListView,
                    defaultTemplate: {
                        name: 'brands_list.tpl',
                        displayName: 'Brands Page List'
                    }
                });
            }
        };
    });
