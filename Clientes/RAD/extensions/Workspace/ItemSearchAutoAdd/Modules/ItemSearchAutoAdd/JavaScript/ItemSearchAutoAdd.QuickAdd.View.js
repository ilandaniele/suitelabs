define('ItemSearchAutoAdd.QuickAdd.View', [
    'QuickAdd.View',
    'underscore'
], function ItemSearchAutoAddQuickAddView(
    QuickAddView,
    _
) {
    'use strict';

    _.extend(QuickAddView.prototype, {
        initialize: _.wrap(QuickAddView.prototype.initialize, function fnInitialize(fn) {
            fn.apply(this, _.toArray(arguments).slice(1));
            this.itemsSearcherComponent.on('itemSelectedAutoAdd', this.onItemSelectedAutoAdd, this);
        }),

        onItemSelectedAutoAdd: function onItemSelectedAutoAdd(result) {
            var item = result.selectedItem;
            var selectedValue;
            var possibleOptions;
            var options;
            var minimumQuantity;
            var selectedItem = item && item.getSelectedMatrixChilds();

            if (selectedItem && selectedItem.length === 1) {
                possibleOptions = item.getVisibleOptions();
                options = item.get('options');
                item.set('item', selectedItem[0]);
                item.set('options', options);
                _.each(possibleOptions, function eachOption(option) {
                    if (option.get('isMatrixDimension') && option.get('itemOptionId')) {
                        selectedValue = option.get('values') && _.findWhere(option.get('values'), {
                            label: selectedItem[0].get(option.get('itemOptionId'))
                        });
                        if (selectedValue && selectedValue.internalid) {
                            item.setOption(option.get('cartOptionId'), selectedValue.internalid);
                        }
                    }
                });
            }

            if (item && item.get('item')) {
                this.model.set('quickaddSearch', item.get('item').get('_name'));
                this.model.set('selectedProduct', item);
                this.setDefaultQuantity(
                    item.get('item').get('_minimumQuantity', true),
                    item.get('item').get('internalid')
                );
                this.$('[name="quantity"]').focus();
                this.selectAll();

                minimumQuantity = this.model.get('selectedProduct').get('_minimumQuantity', true);
                if (minimumQuantity > 1) {
                    this.$('.quick-add-box-minimum').html(
                        _('Minimum of $(0) required').translate(minimumQuantity)
                    );
                }

                this.$('[data-validation-error="block"]').remove();
                this.$('[data-type="search-input"]').val(item.get('item').get('_sku'));
                this.$el.find('form').submit();
            } else {
                this.model.unset('selectedProduct');
                this.$('.quick-add-box-minimum').empty();
            }
        }
    });
});
