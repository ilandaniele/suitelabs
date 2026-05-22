define('BulbUpsell.View', [
    'Profile.Model',
    'jQuery',
    'SCView',
    'bulb_upsell.tpl',
    'underscore'
], function BulbUpsellViewModule(
    ProfileModel,
    jQuery,
    SCViewComponent,
    BulbUpsellTpl,
    _
) {
    'use strict';

    var SCView = SCViewComponent.SCView;

    function BulbUpsellView(options) {
        var self = this;

        SCView.call(this);

        this.options = options || {};
        this.template = BulbUpsellTpl;
        this.contextDataRequest = ['item'];

        this.pdp = options.application.getComponent('PDP');
        this.environment = options.application.getComponent('Environment');
        this.search = options.application.getComponent('Search');

        this.profile = ProfileModel.getInstance();

        this.pdp.on('afterOptionSelection', function afterOptionSelection(event) {
            var matrixDimension;

            matrixDimension = self.getMatrixDimension();

            if (event && matrixDimension && matrixDimension.cartOptionId === event.cartOptionId) {
                self.render();
            }
        });

        this.pdp.on('afterQuantityChange', function afterQuantityChange() {
            self.render();
        });
    }

    BulbUpsellView.prototype = Object.create(SCView.prototype);

    BulbUpsellView.prototype.constructor = BulbUpsellView;

    BulbUpsellView.prototype.getEvents = function getEvents() {
        return {
            'click [data-action="select-bulb"]': 'selectBulb'
        };
    };

    BulbUpsellView.prototype.getBulbPreferences = function getBulbPreferences() {
        var customFields;
        var selectedBulb;
        var normalBulb;
        var frostedBulb;
        var noBulb;

        if (this.profile.get('isLoggedIn') === 'T') {
            customFields = this.profile.get('customfields');
            normalBulb = _.findWhere(customFields, { name: 'custentity_bulb_option_selected' }) || {};
            frostedBulb = _.findWhere(customFields, { name: 'custentity_bulb_frosted_selected' }) || {};
            noBulb = _.findWhere(customFields, { name: 'custentity_no_bulb_option_selected' }) || {};

            normalBulb = (noBulb.value === 'F' && normalBulb.value === 'T')
                || (noBulb.value === 'F' && normalBulb.value === 'F' && frostedBulb.value === 'F');
            frostedBulb = noBulb.value === 'F' && frostedBulb.value === 'T';
        } else {
            selectedBulb = localStorage.getItem('selectedBulb');
            noBulb = selectedBulb === 'none';
            normalBulb = !selectedBulb || (!noBulb && selectedBulb === 'normal');
            frostedBulb = selectedBulb && !noBulb && selectedBulb === 'frosted';
        }

        return {
            normal: normalBulb,
            frosted: frostedBulb
        };
    };

    BulbUpsellView.prototype.selectBulb = function selectBulb(e) {
        var $target = jQuery(e.currentTarget);
        var $input = $target.find('input');
        var selectedBulb = $target.data('type');
        var self = this;
        var isChecked = $input.prop('checked');
        var selectedValue;

        if (jQuery(e.target).is('label')) {
            this.$('.bulbupsell-main-wrapper input').prop('checked', false);
            $input.prop('checked', !isChecked);
        } else {
            this.$('.bulbupsell-main-wrapper input').not(e.target).prop('checked', false);
        }

        if ($input.prop('checked') && selectedBulb === 'normal') {
            selectedValue = 'normal';
        } else if ($input.prop('checked') && selectedBulb === 'frosted') {
            selectedValue = 'frosted';
        } else {
            selectedValue = 'none';
        }

        if (this.profile.get('isLoggedIn') === 'T') {
            this.$('.bulbupsell-main-wrapper input').prop('disabled', true);
            this.profile.set('selectedBulb', selectedValue);
            this.profile.set('skipLoginDontUpdateProfile', true);

            this.profile.save().then(function afterProfileSave() {
                self.profile.unset('skipLoginDontUpdateProfile', { silent: true });
                self.$('.bulbupsell-main-wrapper input').prop('disabled', false);
                self.render();
            });
        } else {
            localStorage.setItem('selectedBulb', selectedValue);
            this.render();
        }
    };

    BulbUpsellView.prototype.getAvailableBulbsPrices = function getAvailableBulbsPrices(availableBulbs) {
        var promise = jQuery.Deferred();
        var searchUrl;
        var self = this;

        if (availableBulbs && availableBulbs.length) {
            searchUrl = this.search.getUrl({
                id: _.pluck(availableBulbs, 'internalid').join(','),
                fieldset: 'bulbs',
                apiMasterOptions: 'bulbs'
            });

            jQuery
            .get(searchUrl)
            .done(function afterBulbsRequest(response) {
                var price;
                var bulb;
                var i;

                if (response.items) {
                    for (i = 0; i < response.items.length; i++) {
                        bulb = _.findWhere(availableBulbs, { internalid: response.items[i].internalid });
                        price = self.bulbQty * parseFloat(response.items[i].onlinecustomerprice);

                        if (bulb) {
                            bulb.price = price;
                            bulb.priceFormatted = _.formatCurrency(price);
                        }
                    }
                }

                promise.resolve(availableBulbs);
            })
            .fail(function afterBulbsRequestFail(jqXhr) {
                jqXhr.preventDefault = true;
            });
        }

        return promise;
    };

    BulbUpsellView.prototype.getAvailableBulbs = function getAvailableBulbs() {
        var availableBulbs = [];
        var promise = jQuery.Deferred();
        var bulbPreference = this.getBulbPreferences();

        if (this.item.custitem_bulb_id) {
            availableBulbs.push({
                internalid: this.item.custitem_bulb_id,
                label: this.item.custitem_bulb_upsell_label
                    || this.environment.getConfig('bulbs.bulbText')
                    || '',
                bulbQty: this.bulbQty,
                type: 'normal',
                checked: bulbPreference.normal
                    || (bulbPreference.frosted && !this.item.custitem_bulb_frosted_id)
            });
        }

        if (this.item.custitem_bulb_frosted_id) {
            availableBulbs.push({
                internalid: this.item.custitem_bulb_frosted_id,
                label: this.item.custitem_bubl_upsell_label_frosted
                    || this.environment.getConfig('bulbs.bulbFrostedText')
                    || '',
                bulbQty: this.bulbQty,
                type: 'frosted',
                checked: bulbPreference.frosted
                    || (bulbPreference.normal && !this.item.custitem_bulb_id)
            });
        }

        this.getAvailableBulbsPrices(availableBulbs).done(function afterGettingBulbPrices(availableBulbsWithPrices) {
            promise.resolve(availableBulbsWithPrices);
        });

        return promise;
    };

    BulbUpsellView.prototype.setBulbOption = function setBulbOption(bulbItem) {
        var product = this.pdp.getItemInfo();
        var bulbItemOption = _.findWhere(product.options, { cartOptionId: 'custcol_bulb_item' });
        var bulbQtyOption = _.findWhere(product.options, { cartOptionId: 'custcol_bulb_qty' });
        var bulbItemOptionValue = bulbItemOption
            && bulbItemOption.value
            && bulbItemOption.value.internalid
            ? bulbItemOption.value.internalid
            : null;

        var bulbQtyOptionValue = bulbQtyOption
            && bulbQtyOption.value
            && bulbQtyOption.value.internalid
            ? bulbQtyOption.value.internalid
            : null;

        if (bulbItem !== bulbItemOptionValue) {
            this.pdp.setOption('custcol_bulb_item', bulbItem ? String(bulbItem) : null);
        }

        if (this.bulbQty !== bulbQtyOptionValue) {
            this.pdp.setOption('custcol_bulb_qty', String(this.bulbQty));
        }
    };

    BulbUpsellView.prototype.getMatrixDimension = function getMatrixDimension() {
        var product = this.pdp.getItemInfo();
        var matrixDimension = _.findWhere(product.options, { isMatrixDimension: true });

        return matrixDimension;
    };

    BulbUpsellView.prototype.getItem = function getItem() {
        var isMatrix = this.pdp.getAllMatrixChilds().length > 0;
        var selectedMatrixChildren;
        var product;
        var item;

        if (isMatrix) {
            selectedMatrixChildren = this.pdp.getSelectedMatrixChilds();

            if (selectedMatrixChildren.length === 1) {
                item = selectedMatrixChildren[0];
            }
        } else {
            product = this.pdp.getItemInfo();
            item = product && product.item;
        }

        return item;
    };

    BulbUpsellView.prototype.hideBulbOption = function hideBulbOption() {
        var isOutOfStock = !this.pdp.getStockInfo().isInStock;
        var isRetailOrLoggedOut = !this.profile.get('isTrade') || !this.profile.get('isLoggedIn');
        var validOutOfStockBehavior = this.item.outofstockbehavior === '- Default -'
            || this.item.outofstockbehavior === 'Disallow back orders but display out-of-stock message';
        var bulbAlreadyIncluded = this.item.custitem_bulb_included === 'Yes';

        return (isOutOfStock && isRetailOrLoggedOut && validOutOfStockBehavior)
            || bulbAlreadyIncluded
            || !this.bulbQty;
    };

    BulbUpsellView.prototype.render = function render() {
        var product = this.pdp.getItemInfo();
        var args = arguments;
        var self = this;

        this.item = this.getItem();
        this.bulbQty = this.item.custitem18 * product.quantity;

        this.getAvailableBulbs().done(function afterGetBulbs(availableBulbs) {
            var preferred = _.findWhere(availableBulbs, { checked: true });
            self.availableBulbs = availableBulbs;

            if (!self.hideBulbOption() && availableBulbs && availableBulbs.length) {
                self.setBulbOption(preferred ? preferred.internalid : null);

                SCView.prototype.render.apply(self, args);
            }
        });
    };

    BulbUpsellView.prototype.getContext = function getContext() {
        return {
            availableBulbs: this.availableBulbs || [],
            bulbQty: this.bulbQty
        };
    };

    return BulbUpsellView;
});
