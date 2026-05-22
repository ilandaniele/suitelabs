/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */
define([
    'N/https',
    'N/record',
    'N/runtime',
    'N/search'
], function Punchout2GoInvoiceUserEvent(
    nHttps,
    nRecord,
    nRuntime,
    nSearch
) {
    function isOrderFromPunchout2Go(salesOrderRecord) {
        return salesOrderRecord.getValue({ fieldId: 'custbody_nssc_p2go_order_request_id' }) &&
            salesOrderRecord.getValue({ fieldId: 'custbody_nssc_p2go_po_order_id' });
    }

    function collectInvoiceItems(invoiceRecord) {
        var itemLength = invoiceRecord.getLineCount('item');
        var items = [];
        var i = 0;

        for (; i < itemLength; i++) {
            items.push({
                inv_line_number: invoiceRecord.getSublistValue('item', 'line', i),
                line_number: invoiceRecord.getSublistValue('item', 'custcol_nssc_p2go_po_line_number', i),
                quantity: invoiceRecord.getSublistValue('item', 'quantity', i),
                part_id: invoiceRecord.getSublistText('item', 'item', i),
                aux_part_id: invoiceRecord.getSublistValue('item', 'item', i),
                description: invoiceRecord.getSublistValue('item', 'description', i),
                price: invoiceRecord.getSublistValue('item', 'rate', i),
                subtotal: invoiceRecord.getSublistValue('item', 'amount', i),
                tax: {
                    rate: String(invoiceRecord.getSublistValue('item', 'taxrate1', i)) + '%',
                    code: invoiceRecord.getSublistText('item', 'taxcode', i)
                },
                // discount: null,
                row_total: invoiceRecord.getSublistValue('item', 'amount', i),
                uom: invoiceRecord.getSublistText('item', 'units', i)
                // "comment": ""
            });
        }

        return items;
    }

    function getAddressFromRecord(recordType, recordId) {
        var addressFields = nSearch.lookupFields({
            type: recordType,
            id: recordId,
            columns: [
                'address.addressee',
                'address.address1',
                'address.address2',
                'address.city',
                'address.state',
                'address.phone',
                'address.zip',
                'address.countrycode'
            ]
        });

        return {
            deliver_to: addressFields['address.addressee'],
            address1: addressFields['address.address1'],
            address2: addressFields['address.address2'],
            city: addressFields['address.city'],
            state: addressFields['address.state'],
            postalcode: addressFields['address.zip'],
            country_code: addressFields['address.countrycode'],
            phone: addressFields['address.phone']
        };
    }

    function getCompanyAddress() {
        return getAddressFromRecord(nSearch.Type.SUBSIDIARY, 1);
    }

    function getShipToAddress(invoiceRecord) {
        var shippingAddress = invoiceRecord.getSubrecord({
            fieldId: 'shippingaddress'
        });

        return {
            deliver_to: shippingAddress.getValue({ fieldId: 'addressee' }),
            address1: shippingAddress.getValue({ fieldId: 'addr1' }),
            address2: shippingAddress.getValue({ fieldId: 'addr2' }),
            city: shippingAddress.getValue({ fieldId: 'city' }),
            state: shippingAddress.getValue({ fieldId: 'state' }),
            postalcode: shippingAddress.getValue({ fieldId: 'zip' }),
            country_code: shippingAddress.getValue({ fieldId: 'country' }),
            phone: shippingAddress.getValue({ fieldId: 'addrphone' })
        };
    }

    function getBillToAddress(invoiceRecord) {
        var billingAddress = invoiceRecord.getSubrecord({
            fieldId: 'billingaddress'
        });
        return {
            deliver_to: billingAddress.getValue({ fieldId: 'addressee' }),
            address1: billingAddress.getValue({ fieldId: 'addr1' }),
            address2: billingAddress.getValue({ fieldId: 'addr2' }),
            city: billingAddress.getValue({ fieldId: 'city' }),
            state: billingAddress.getValue({ fieldId: 'state' }),
            postalcode: billingAddress.getValue({ fieldId: 'zip' }),
            country_code: billingAddress.getValue({ fieldId: 'country' }),
            phone: billingAddress.getValue({ fieldId: 'addrphone' })
        };
    }

    function getWarehouseAddress(invoiceRecord) {
        var locationId = invoiceRecord.getValue({ fieldId: 'location' });
        return getAddressFromRecord(nSearch.Type.LOCATION, locationId);
    }

    function getTermDetails(termId) {
        var termDetails = nSearch.lookupFields({
            type: nSearch.Type.TERM,
            id: termId,
            columns: ['name', 'daysuntilnetdue', 'discountpercent']
        });

        return {
            name: termDetails.name,
            daysUntilNetDue: termDetails.daysuntilnetdue,
            discountPercent: termDetails.discountpercent || '0'
        };
    }

    function collectInvoiceData(invoiceRecord, salesOrderRecord) {
        var items = collectInvoiceItems(invoiceRecord);
        var currencyId = invoiceRecord.getValue('currency');
        
        var currency = nSearch.lookupFields({
            type: nSearch.Type.CURRENCY,
            id: currencyId,
            columns: ['symbol']
        });
        
        var invoiceFields = nSearch.lookupFields({
            type: nSearch.Type.INVOICE,
            id: invoiceRecord.id,
            columns: ['tranid']
        });
        var companyAddress = getCompanyAddress();
        var shipToAddress = getShipToAddress(invoiceRecord);
        var billToAddress = getBillToAddress(invoiceRecord);
        var warehouseAddress = getWarehouseAddress(invoiceRecord);

        return {
            order_request_id: salesOrderRecord.getValue({ fieldId: 'custbody_nssc_p2go_order_request_id' }),
            po_order_id: salesOrderRecord.getValue({ fieldId: 'custbody_nssc_p2go_po_order_id' }),
            invoice: {
                header: {
                    ext_order_id: salesOrderRecord.id,
                    ext_invoice_id: invoiceFields.tranid,
                    po_order_id: salesOrderRecord.getValue({ fieldId: 'custbody_nssc_p2go_po_order_id' }),
                    invoice_date: invoiceRecord.getValue({ fieldId: 'trandate' }).toISOString().split('T')[0],
                    po_payload_id: salesOrderRecord.getValue({ fieldId: 'custbody_nssc_p2go_po_payload_id' }),
                    // comments: "Comments go here",
                    payment_terms: getTermDetails(invoiceRecord.getValue({ fieldId: 'terms' })),
                    ship_to: shipToAddress,
                    bill_to: billToAddress,
                    remit_to: companyAddress,
                    from_address: companyAddress,
                    bill_from: companyAddress,
                    sold_to: billToAddress,
                    ship_from: warehouseAddress
                },
                details: {
                    currency: currency.symbol,
                    subtotal: invoiceRecord.getValue({ fieldId: 'subtotal' }),
                    total: invoiceRecord.getValue({ fieldId: 'total' }),
                    tax: invoiceRecord.getValue({ fieldId: 'taxtotal' }),
                    tax_title: 'Tax',
                    discount: invoiceRecord.getValue({ fieldId: 'discounttotal' }),
                    discount_title: 'Discount',
                    shipping: invoiceRecord.getValue({ fieldId: 'shippingcost' }),
                    shipping_title: invoiceRecord.getText({ fieldId: 'shipmethod' })
                },
                items: items
            }
        };
    }

    function sendToTradeCentric(apiKey, invoiceData) {
        var payload = {
            apikey: apiKey,
            version: '1.0',
            params: invoiceData
        };
        var response = nHttps.post({
            url: 'https://connect.tradecentric.com/gateway/order/invoice',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        var responseBody = response.body;
        var responseCode = response.code;

        log.debug({
            title: 'Payload',
            details: payload
        });

        log.debug({
            title: 'Response',
            details: {
                code: responseCode,
                body: JSON.parse(responseBody || '{}')
            }
        });
    }

    function afterSubmit(context) {
        var invoiceRecord;
        var salesOrderRecord;
        var invoiceData;
        var scriptObj = nRuntime.getCurrentScript();
        var apiKey = scriptObj.getParameter({ name: 'custscript_nssc_p2go_invoice_api_key' });

        try {
            invoiceRecord = context.newRecord;
            salesOrderRecord = nRecord.load({
                type: nRecord.Type.SALES_ORDER,
                id: invoiceRecord.getValue({ fieldId: 'createdfrom' }),
                isDynamic: true
            });

            if (isOrderFromPunchout2Go(salesOrderRecord)) {
                invoiceData = collectInvoiceData(invoiceRecord, salesOrderRecord);
                sendToTradeCentric(apiKey, invoiceData);
            }
        } catch (e) {
            log.error({
                title: 'Error sending invoice to Trade Centric',
                details: e
            });
        }
    }

    return {
        afterSubmit: afterSubmit
    };
});
