
define('CartAvailabilityBISDate', [
]
, function CartAvailabilityBISDate(
    ) {
    'use strict';

    return {
        getNextBusinessDay: function getNextBusinessDay(today) {
            // Copy date so don't affect original
            var date = new Date(+today);
            // Add days until get not Sat or Sun
            do {
                date.setDate(date.getDate() + 1);
            } while (!(date.getDay() % 6));
            return this.getFormattedDate(date);
        },
        getFormattedDate: function getFormattedDate(date) {
            var day = date.getDate().toString();
            var month = (1 + date.getMonth()).toString();
            var year = date.getFullYear();

            month = month.length > 1 ? month : '0' + month;
            day = day.length > 1 ? day : '0' + day;
            return month + '/' + day + '/' + year;
        },
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            var self = this;

            layout.addToViewContextDefinition('Cart.Item.Summary.View', 'line', 'string', function fn(context) {
                var line = context.line;
                var cpl = context.line.item.custitem_current_price_list;
                var quantityAvailable = context.line.item.quantityavailable;
                line.quantityAvailable = context.line.item.quantityavailable;
                if (cpl === 'Discontinued') {
                    // If the item Current Price List field is “Discontinued” display “Discontinued”.
                    line.expectedShippingDate = 'Discontinued';
                } else if (quantityAvailable > 0 && cpl === 'Current Price List') {
                    // display the next business day
                    line.expectedShippingDate = self.getNextBusinessDay(new Date()).toLocaleString();
                } else if (!quantityAvailable || quantityAvailable === 0) {
                    // If the item has no quantity available and the Current Price List field is “Current Price List”, display the “Back in Stock Date”
                    line.expectedShippingDate = context.line.item.custitem_back_in_stock_date;
                    line.quantityAvailable = 0;
                }

                return line;
            });

            layout.addToViewContextDefinition('ProductLine.Sku.View', 'line', 'string', function fn(context) {
                var pdp = container.getComponent('PDP');
                var line = context.model.item;
                var cpl = line.custitem_current_price_list;
                var quantityAvailable = line.quantityavailable;
                line.notPDP = !pdp;
                line.quantityAvailable = line.quantityavailable;
                if (cpl === 'Discontinued') {
                    // If the item Current Price List field is “Discontinued” display “Discontinued”.
                    line.expectedShippingDate = 'Discontinued';
                } else if (quantityAvailable > 0 && cpl === 'Current Price List') {
                    // display the next business day
                    line.expectedShippingDate = self.getNextBusinessDay(new Date()).toLocaleString();
                } else if (!quantityAvailable || quantityAvailable === 0) {
                    // If the item has no quantity available and the Current Price List field is “Current Price List”, display the “Back in Stock Date”
                    line.expectedShippingDate = line.custitem_back_in_stock_date;
                    line.quantityAvailable = 0;
                }

                return line;
            });
        }
    };
});
