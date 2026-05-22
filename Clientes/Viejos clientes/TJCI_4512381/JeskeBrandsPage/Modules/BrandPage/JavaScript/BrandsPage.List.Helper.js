define('BrandsPage.List.Helper', [
    'Utils'
], function (
    Utils
) {
    'use strict';

    return {
        getTypeOptions: function getTypeOptions() {
            return [
                { internalid: '1', name: Utils.translate('Color') },
                { internalid: '2', name: Utils.translate('Size') }
            ];
        }
    };
});
