/* globals nlapiGetWebContainer */
define('CSVToCart.Model', [
], function CSVToCartModel(
) {
    return {
        getFilters: function getFilters(itemArray) {
            var searchFilters = [];
            var k;

            for (k = 0; k < itemArray.length - 1; k++) {
                searchFilters.push([
                    'itemid', 'is', itemArray[k]
                ], 'or');
            }
            searchFilters.push(['itemid', 'is', itemArray[itemArray.length - 1]]);

            return searchFilters;
        },

        addCSVToCart: function addCSVToCart(file) {
            var searchResults;
            var searchFilters = [];
            var searchColumns = [];
            var i;
            var j;
            var k;
            var itemSku;
            var internalId;
            var orderItemId;
            var items;
            var itemsToAdd;
            var itemSkus;
            var rowsAffected = {
                processed: 0,
                added: 0,
                skipped: 0
            };

            var fileValues = file.getValue().split('\r\n');
            var fileNameRaw = file.getName().split('.');
            var fileNameExtension = fileNameRaw.pop();
            var fileSize = file.getSize() / 1024 / 1024;

            if (fileNameExtension !== 'csv') {
                throw new Error('Unsupported file type');
            }

            if (fileSize > 10) {
                throw new Error('File is too large, size limit is 10MB');
            }


            items = fileValues.filter(function filterElements(el) {
                var elementRaw = el.split(',');
                if (elementRaw[1] === 'Quantity' || el === '') {
                    return false;
                }

                return true;
            }).map(function mapElements(el) {
                return {
                    sku: el.split(',')[0],
                    quantity: el.split(',')[1],
                    id: '',
                    added: false
                };
            });

            itemSkus = items.map(function readElements(el) {
                return el.sku;
            });


            searchColumns.push(new nlobjSearchColumn('internalid'));
            searchColumns.push(new nlobjSearchColumn('itemid'));
            searchColumns.push(new nlobjSearchColumn('externalid'));
            searchFilters = this.getFilters(itemSkus);

            searchResults = nlapiSearchRecord('item', null, searchFilters, searchColumns);

            if (searchResults === null) {
                nlapiLogExecution('DEBUG', 'Script', 'no results on search');
            } else {
                for (i = 0; i < searchResults.length; i++) {
                    internalId = searchResults[i].getId();
                    itemSku = searchResults[i].getValue('externalid');

                    for (j = 0; j < items.length; j++) {
                        if (items[j].sku === itemSku) {
                            items[j].id = internalId;
                            break;
                        }
                    }
                }
            }

            itemsToAdd = items.filter(function filterItems(item) {
                rowsAffected.processed += 1;
                if (item.id !== '') {
                    return true;
                }
                rowsAffected.skipped += 1;
                return false;
            }).map(function mapItems(item) {
                return {
                    internalid: item.id,
                    quantity: item.quantity,
                    options: []
                };
            });

            for (k = 0; k < itemsToAdd.length; k++) {
                try {
                    orderItemId = nlapiGetWebContainer().getShoppingSession().getOrder().addItem(itemsToAdd[k]);

                    if (orderItemId) {
                        rowsAffected.added += 1;
                    }
                } catch (e) {
                    rowsAffected.skipped += 1;
                }
            }

            return JSON.stringify(rowsAffected);
        }
    };
});
