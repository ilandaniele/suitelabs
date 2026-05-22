define('SuiteLabs.ResponsiveMerchZones.Main', [
    'underscore'
], function SuiteLabsResponsiveMerchZonesMain(
    _
) {
    'use strict';

    var CMSMerchzoneCCT;

    try {
        CMSMerchzoneCCT = require('CXExtensibility.CoreContent.CMSMerchzoneCCT.View');
    } catch (e) {
        console.log('Could not load the required CXExtensibility.CoreContent.CMSMerchzoneCCT.View module');
    }

    if (CMSMerchzoneCCT) {
        _.extend(CMSMerchzoneCCT.prototype, {
            renderGrid: function renderGrid() {
                var gridClass = 'cms-merchzone-grid';
                var numItems = parseInt(this.settings.custrecord_merchzone_numitems, 10) || 4;

                if (numItems >= 3 && numItems <= 6) {
                    gridClass += '-' + numItems + '-cols';
                } else {
                    gridClass = 'cms-merchzone-grid-4-cols';
                }

                this.$('.cms-merchzone-slider')
                    .removeClass('cms-merchzone-slider')
                    .addClass(gridClass)
                    .addClass('cms-merchzone-grid');
            }
        });
    }
});
