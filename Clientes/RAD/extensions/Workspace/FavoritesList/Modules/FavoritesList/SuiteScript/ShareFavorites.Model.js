define('ShareFavorites.Model', [
    'SC.Model',
    'ProductList.Model',
    'Models.Init',
    'Configuration',
    'underscore',
    'Utils'
], function ShareFavoritesModel(
    SCModel,
    ProductListModel,
    ModelsInit,
    Configuration,
    _
) {
    'use strict';

    var optionsMap = {
        'custcol_item_memo': 'Notes for this item'
    };

    return SCModel.extend({
        name: 'ShareFavorites',

        get: function get(listid, enablePrice, useRetailPrices, serviceResponse) {
            var userData = {
                id: nlapiGetUser()
            };
            var emailTemplateId = Configuration.get('favoritesList.template');
            var xml = this.getProjectListData(userData, listid, emailTemplateId, enablePrice, useRetailPrices);
            var file = nlapiXMLToPDF(xml);
            serviceResponse.setContentType('PDF', 'Project.pdf');
            serviceResponse.write(file.getValue());
            return file.getValue();
        },

        // we use an email template to generate the xml
        getProjectListData: function getProjectListData(userData, listid, tplid, enablePrice, useRetailPrices) {
            var list = ProductListModel.get(userData.id, listid);
            var emailMerger = nlapiCreateEmailMerger(tplid).merge();
            var emailBody = emailMerger.getBody().toString();
            var listName = !!list.type && !!list.type.name && list.type.name === 'quote' ? this.quoteListDefaultName : list.name;
            emailBody = this.itemListToXML(list.items || [], emailBody, enablePrice, useRetailPrices);
            return emailBody.replace(/{{PROJNAME}}/g, listName + ' (' + list.items.length + (list.items.length === 1 ? ' Product' : ' Products') + ')');
        },

        getItemFieldValue: function getItemFieldValue(item, fieldName, extras, useRetailPrices) {
            var data = item;
            var aux;
            var url;
            var retailPricelevel = Configuration.get('priceTogglePriceToggle');
            var retailprice = item[retailPricelevel];
            var retailpriceFormatted = item[retailPricelevel + '_formatted'];

            switch (fieldName) {
            case 'thumbnail':
                aux = data.itemimages_detail && data.itemimages_detail.thumbnail ? data.itemimages_detail.thumbnail : data.itemimages_detail;
                url = (aux.urls && aux.urls.length ? aux.urls[0].url : aux.url);
                if (!url) {
                    url = '/store/assets/img/store/img/no_image_available.jpeg';
                }
                return Configuration.get('favoritesList.imageBaseUrl') + url.substring(url.lastIndexOf('/') + 1);
            case 'url':
                return extras.homeUrl + '/' + data.urlcomponent;
            case 'cost':
                if (useRetailPrices) {
                    retailpriceFormatted = retailpriceFormatted || retailprice;
                    return {
                        onlinecustomerprice: retailprice,
                        onlinecustomerprice_formatted: retailpriceFormatted
                    };
                }
                return item.onlinecustomerprice_detail;
            default:
                return data[fieldName];
            }
        },

        itemListToXML: function itemListToXML(items, bodyEmail, enablePrice, useRetailPrices) {
            var emailBody = bodyEmail;
            var itemList = '';
            var itemListBoundaryIni = '<tbody data-name="item-list">';
            var itemListBoundaryEnd = '</tbody>';
            var self = this;

            var itemOptRow = '<p data-type="item_options">{{ITEMEXTRAS}}</p>';
            var itemCostRow = '<p class="cost">{{ITEMCOST}}</p>';
            var totalCostRow = '<p class="totalcost">Total Cost: {{TOTALCOST}}</p>';

            var ini = emailBody.indexOf(itemListBoundaryIni) + itemListBoundaryIni.length;
            var end = emailBody.indexOf(itemListBoundaryEnd, ini);
            var itemTpl = emailBody.substring(ini, end).trim();
            var totalCost = 0;

            _(items).each(function eachItem(itemData) {
                var item = itemData.item;
                var itemQty = itemData.quantity;
                var itemCost = self.getItemFieldValue(item, 'cost', null, useRetailPrices);
                var itemName = self.getItemFieldValue(item, 'displayname', null, false);
                var itemSKU = self.getItemFieldValue(item, 'itemid', null, false);
                var itemOpts = self.itemOptionsToHtml(itemData);
                var thumbnail = self.getItemFieldValue(item, 'thumbnail', null, false);
                var tempCell = itemTpl.replace(/{{ITEMIMG}}/g, thumbnail)
                    .replace(/{{ITEMNAME}}/g, itemName)
                    .replace(/{{ITEMSKU}}/g, itemSKU)
                    .replace(/{{ITEMQTY}}/g, itemQty);

                if (itemOpts.length) {
                    tempCell = tempCell.replace(/{{ITEMEXTRAS}}/g, itemOpts);
                } else { // remove empty optionValues
                    tempCell = tempCell.replace(itemOptRow, '');
                }

                if (enablePrice) {
                    tempCell = tempCell.replace(/{{ITEMCOST}}/g, itemCost.onlinecustomerprice_formatted);
                    totalCost += itemQty * itemCost.onlinecustomerprice;
                } else {
                    tempCell = tempCell.replace(itemCostRow, '');
                }

                itemList += tempCell;
            });
            if (enablePrice) {
                emailBody = emailBody.replace(/{{TOTALCOST}}/g, '$' + totalCost.toFixed(2));
            } else {
                emailBody = emailBody.replace(totalCostRow, '');
            }
            return emailBody.replace(itemTpl, itemList);
        },

        itemOptionsToHtml: function itemOptionsToHtml(itemData) {
            var optionValues = itemData.options;
            var optionFields = itemData.item.itemoptions_detail && itemData.item.itemoptions_detail.fields;
            var html = [];

            _(optionValues).each(function eachOptionValues(optionValue) {
                var optionFieldName = optionValue.cartOptionId;
                var optionField = _(optionFields).findWhere({ internalid: optionFieldName });
                var label = optionsMap[optionField.internalid] ? optionsMap[optionField.internalid] : optionField.label;
                if (optionValue.value && optionValue.value.displayvalue) {
                    html.push(label + ': ' + optionValue.value.displayvalue);
                }
            });

            return html.join('<br />');
        }
    });
});
