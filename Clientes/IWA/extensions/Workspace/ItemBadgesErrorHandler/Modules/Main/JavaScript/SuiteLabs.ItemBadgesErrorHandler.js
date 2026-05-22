define('SuiteLabs.ItemBadgesErrorHandler', [
    'underscore'
], function ItemBadgesErrorHandler(
    _
) {
    'use strict';

    return {
        mountToApp: function mountToApp() {
            var ItemBadgesView;

            try {
                ItemBadgesView = require('SuiteCommerce.ItemBadges.View');

                if (ItemBadgesView) {
                    _(ItemBadgesView.prototype).extend({
                        registerInstrumentationLog: _(ItemBadgesView.prototype.registerInstrumentationLog).wrap(
                            function registerInstrumentationLog(fn) {
                                return this.badgeCollection ? fn.apply(this, _(arguments).toArray().slice(1)) : '';
                            }
                        ),
                        getContext: _(ItemBadgesView.prototype.getContext).wrap(
                            function getContext(fn) {
                                if (this.currentView === 'pdp' || _.isFunction(this.contextData.item)) {
                                    return fn.apply(this, _(arguments).toArray().slice(1));
                                }
                                return {
                                    position: '',
                                    hasBadges: false,
                                    hasThumbnailListAside: false
                                }
                            }
                        )
                    });
                }
            } catch (e) {
                // SuiteCommerce.ItemBadges.View not found
            }
        }
    };
});
