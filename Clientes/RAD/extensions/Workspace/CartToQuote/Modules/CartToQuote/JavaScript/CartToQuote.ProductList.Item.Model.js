define('CartToQuote.ProductList.Item.Model', [
    'ProductList.Item.Model',
    'Item.Model',
    'Product.Model',
    'underscore'
], function CartToQuoteProductListItemModel(
    ProductListItemModel,
    Item,
    ProductModel,
    _
) {
    'use strict';

    _.extend(ProductListItemModel.prototype, {
        initialize: function initialize(attributes) {
            var itemAux;
            var itemOptions;
            // This workaround is made to maintain the compatility with product lists saving the child item in the record
            if (attributes && attributes.item && attributes.item.matrix_parent) {
                attributes.item.originalid = attributes.item.internalid;
                attributes.item = _.extend(attributes.item, attributes.item.matrix_parent);
                delete attributes.item.matrix_parent;
            }

            itemAux = new Item(attributes.item);
            itemOptions = itemAux.get('options');

            itemOptions.each(function itemOptionsEach(itemOption) {
                var option;
                var optionLine;
                _.any(attributes.options, function anyOption(opt, l) {
                    if (opt.cartOptionId === itemOption.get('cartOptionId')) {
                        option = opt;
                        optionLine = l;
                        return true;
                    }
                    return false;
                });
                if (!option) {
                    attributes.options.push(itemOption.toJSON());
                } else if (optionLine && _.isObject(option.value) && _.isEmpty(option.value)) {
                    attributes.options[optionLine] = itemOption.toJSON();
                }
            });

            ProductModel.prototype.initialize.apply(this, arguments);
        }
    });
});
