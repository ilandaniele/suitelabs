define('TrackingNumbers.OrderHistory.Model', [
    'OrderHistory.Model',
    'underscore',
    'Application',
    'SC.Models.Init',
    'bignumber',
    'Utils'
], function TrackingNumbersOrderHistoryModel(
    OrderHistoryModel,
    _,
    Application,
    ModelsInit,
    BigNumber,
    Utils
) {
    'use strict';

    _.extend(OrderHistoryModel, {
        getFulfillments: function getFulfillments() {
            var location;
            var self = this;
            var filters;
            var columns;
            var pickPackShipIsEnabled;
            var isUomEnabled;
            var fulfillmentId;
            var lineInternalid;
            var line;
            var quantity;
            var quantityUom;
            var quantityFulfilled;
            var quantityPicked;
            var quantityPacked;
            var zero = new BigNumber(0);
            var shipaddress;
            var conversionUnits;

            if (this.result.recordtype !== 'salesorder') {
                location = this.record.getFieldValue('location');

                // eslint-disable-next-line no-shadow
                _.each(this.result.lines, function eachLine(line) {
                    line.quantityfulfilled = line.quantity;
                    line.location = location;
                });

                return;
            }

            this.result.fulfillments = {};

            self = this;
            filters = [
                new nlobjSearchFilter('internalid', null, 'is', this.result.internalid),
                new nlobjSearchFilter('mainline', null, 'is', 'F'),
                new nlobjSearchFilter('shipping', null, 'is', 'F'),
                new nlobjSearchFilter('taxline', null, 'is', 'F')
            ];
            columns = [
                new nlobjSearchColumn('line'),
                new nlobjSearchColumn('fulfillingtransaction'),
                new nlobjSearchColumn('quantityshiprecv'),

                new nlobjSearchColumn('actualshipdate'),
                new nlobjSearchColumn('quantity'),
                new nlobjSearchColumn('item', 'fulfillingtransaction'),
                new nlobjSearchColumn('shipmethod', 'fulfillingtransaction'),
                new nlobjSearchColumn('shipto', 'fulfillingtransaction'),
                new nlobjSearchColumn('trackingnumbers', 'fulfillingtransaction'),
                new nlobjSearchColumn('trandate', 'fulfillingtransaction'),
                new nlobjSearchColumn('status', 'fulfillingtransaction'),

                // Ship Address
                new nlobjSearchColumn('shipaddress', 'fulfillingtransaction'),
                new nlobjSearchColumn('shipaddress1', 'fulfillingtransaction'),
                new nlobjSearchColumn('shipaddress2', 'fulfillingtransaction'),
                new nlobjSearchColumn('shipaddressee', 'fulfillingtransaction'),
                new nlobjSearchColumn('shipattention', 'fulfillingtransaction'),
                new nlobjSearchColumn('shipcity', 'fulfillingtransaction'),
                new nlobjSearchColumn('shipcountry', 'fulfillingtransaction'),
                new nlobjSearchColumn('shipstate', 'fulfillingtransaction'),
                new nlobjSearchColumn('shipzip', 'fulfillingtransaction'),
                // custom
                new nlobjSearchColumn('custbody_pacejet_if_carrier_tracking', 'fulfillingtransaction')
            ];

            pickPackShipIsEnabled = !!Utils.isFeatureEnabled('PICKPACKSHIP');
            isUomEnabled =
                ModelsInit.context.getSetting('FEATURE', 'UNITSOFMEASURE') === 'T';

            if (pickPackShipIsEnabled) {
                columns.push(new nlobjSearchColumn('quantitypicked'));
                columns.push(new nlobjSearchColumn('quantitypacked'));
            }

            if (isUomEnabled) {
                columns.push(new nlobjSearchColumn('quantityuom'));
            }

            Application.getAllSearchResults('salesorder', filters, columns).forEach(function eachFn(
                ffline
            ) {
                fulfillmentId = ffline.getValue('fulfillingtransaction');
                lineInternalid = self.result.internalid + '_' + ffline.getValue('line');
                line = _.findWhere(self.result.lines, {
                    internalid: lineInternalid
                });
                quantity = new BigNumber(ffline.getValue('quantity'));
                quantityUom = ffline.getValue('quantityuom') ?
                    new BigNumber(ffline.getValue('quantityuom')) :
                    quantity;
                quantityFulfilled = new BigNumber(ffline.getValue('quantityshiprecv'));
                quantityPicked = new BigNumber(ffline.getValue('quantitypicked'));
                quantityPacked = new BigNumber(ffline.getValue('quantitypacked'));
                zero = new BigNumber(0);

                if (fulfillmentId) {
                    shipaddress = self.addAddress({
                        internalid: ffline.getValue('shipaddress', 'fulfillingtransaction'),
                        country: ffline.getValue('shipcountry', 'fulfillingtransaction'),
                        state: ffline.getValue('shipstate', 'fulfillingtransaction'),
                        city: ffline.getValue('shipcity', 'fulfillingtransaction'),
                        zip: ffline.getValue('shipzip', 'fulfillingtransaction'),
                        addr1: ffline.getValue('shipaddress1', 'fulfillingtransaction'),
                        addr2: ffline.getValue('shipaddress2', 'fulfillingtransaction'),
                        attention: ffline.getValue('shipattention', 'fulfillingtransaction'),
                        addressee: ffline.getValue('shipaddressee', 'fulfillingtransaction')
                    },
                        self.result
                    );

                    self.result.fulfillments[fulfillmentId] = self.result.fulfillments[
                        fulfillmentId
                        ] || {
                            internalid: fulfillmentId,
                            shipaddress: shipaddress,
                            shipmethod: self.addShippingMethod({
                                internalid: ffline.getValue('shipmethod', 'fulfillingtransaction'),
                                name: ffline.getText('shipmethod', 'fulfillingtransaction')
                            }),
                            date: ffline.getValue('actualshipdate'),
                            lines: [],
                            trackingnumbers: [{
                                text: ffline.getText('custbody_pacejet_if_carrier_tracking', 'fulfillingtransaction'),
                                value: ffline.getValue('custbody_pacejet_if_carrier_tracking', 'fulfillingtransaction')
                            }],
                            status: {
                                internalid: ffline.getValue('status', 'fulfillingtransaction'),
                                name: ffline.getText('status', 'fulfillingtransaction')
                            }
                        };

                    self.result.fulfillments[fulfillmentId].lines.push({
                        internalid: lineInternalid,
                        quantity: quantityFulfilled.toNumber()
                    });
                }

                if (line) {
                    conversionUnits =
                        quantity.gt(zero) && quantityUom.gt(zero) ?
                            quantity.dividedBy(quantityUom) :
                            new BigNumber(1);
                    line.quantityfulfilled = quantityFulfilled;

                    if (line.fulfillmentChoice && line.fulfillmentChoice === 'pickup') {
                        line.quantitypicked = pickPackShipIsEnabled ?
                            quantityPicked.minus(line.quantityfulfilled) :
                            zero;
                        line.quantitybackordered = quantity
                            .minus(line.quantityfulfilled)
                            .minus(line.quantitypicked);
                    } else {
                        line.quantitypacked = pickPackShipIsEnabled ?
                            quantityPacked.minus(line.quantityfulfilled) :
                            zero;
                        line.quantitypicked = pickPackShipIsEnabled ?
                            quantityPicked
                                .minus(line.quantitypacked)
                                .minus(line.quantityfulfilled) :
                            zero;
                        line.quantitybackordered = quantity
                            .minus(line.quantityfulfilled)
                            .minus(line.quantitypacked)
                            .minus(line.quantitypicked);
                        line.quantitypacked = line.quantitypacked
                            .dividedBy(conversionUnits)
                            .toNumber();
                    }

                    line.quantityfulfilled = line.quantityfulfilled
                        .dividedBy(conversionUnits)
                        .toNumber();
                    line.quantitypicked = line.quantitypicked
                        .dividedBy(conversionUnits)
                        .toNumber();
                    line.quantitybackordered = line.quantitybackordered
                        .dividedBy(conversionUnits)
                        .toNumber();
                }
            });

            this.result.fulfillments = _.values(this.result.fulfillments);
        }
    });
});
