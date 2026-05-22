/**
* @NApiVersion 2.x
* PDFGenerator.Model.js
*/

define([
    'N/search',
    'N/file',
    'N/render',
    'N/record',
    'N/commerce/recordView'
], function PDFGeneratorModel(
    Search,
    File,
    Render,
    Record,
    RecordView
) {
    'use strict';

    var config = {
        item: {
            pdfTemplate: 'custitem_new_tear_sheet_type'
        },

        template: {
            record: 'customrecord_sc_ns_spec_sheet_tp',

            fields: {
                xmlTemplate: 'custrecord_spec_sheet_xml_tpl'
            }
        },

        mainImgSuffix: ['-1.jpg', '_1.jpg'],

        bottomImageSuffix: ['-90.jpg', '_90.jpg', '-91.jpg', '_91.jpg']
    };

    var getTemplateByItemId = function getTemplateByItemId(itemId) {
        var itemLookupResult;
        var templateLookupResult;
        var itemTemplate;
        var template;

        try {
            itemLookupResult = Search.lookupFields({
                type: 'item',
                id: itemId,
                columns: [config.item.pdfTemplate]
            });

            itemTemplate = itemLookupResult[config.item.pdfTemplate][0];

            templateLookupResult = Search.lookupFields({
                type: config.template.record,
                id: parseInt(itemTemplate.value, 10),
                columns: [config.template.fields.xmlTemplate]
            });

            template = templateLookupResult[config.template.fields.xmlTemplate][0].value;
        } catch (e) {
            log.error('There was an error in the PDFGenerator model', e.message);
        }

        return template;
    };

    var getItemImages = function getItemImages(item, itemId, dimension) {
        var itemAPIResponse;
        var itemImages;
        var parentItemId;
        var matrixOption;
        var bottomImg;
        var mainImg;
        var img;
        var i = 0;
        var j = 0;

        try {
            if (dimension) {
                parentItemId = item.getValue({ fieldId: 'parent' });
                matrixOption = item.getText({ fieldId: dimension });

                itemAPIResponse = JSON.stringify(RecordView.viewItems({
                    ids: [parseInt(parentItemId, 10)],
                    fields: ['itemimages_detail']
                }));

                itemImages = JSON.parse(itemAPIResponse)[parentItemId].itemimages_detail[matrixOption];
            } else {
                itemAPIResponse = JSON.stringify(RecordView.viewItems({
                    ids: [parseInt(itemId, 10)],
                    fields: ['itemimages_detail']
                }));

                itemImages = JSON.parse(itemAPIResponse)[itemId].itemimages_detail;
            }

            while ((!bottomImg || !mainImg) && i < itemImages.urls.length) {
                img = itemImages.urls[i].url;

                while (!mainImg && j < config.mainImgSuffix.length) {
                    if (img.indexOf(config.mainImgSuffix[j]) >= 0) {
                        mainImg = img;
                    }

                    j++;
                }

                j = 0;

                while (!bottomImg && j < config.bottomImageSuffix.length) {
                    if (img.indexOf(config.bottomImageSuffix[j]) >= 0) {
                        bottomImg = img;
                    }

                    j++;
                }
                i++;
            }
        } catch (e) {
            log.error('There was an error in the PDFGenerator service while fetching images', e.message);
        }

        return {
            mainImg: encodeURI(mainImg),
            bottomImg: encodeURI(bottomImg)
        };
    };

    var generate = function generate(itemId, dimension) {
        var template = getTemplateByItemId(itemId);
        var xmlTemplateFile = File.load(template);
        var renderer = Render.create();
        var itemType = Search.lookupFields({
            type: 'item',
            id: itemId,
            columns: ['recordtype']
        }).recordtype;
        var file;

        var item = Record.load({
            type: itemType,
            id: itemId
        });

        renderer.templateContent = xmlTemplateFile.getContents();
        renderer.addRecord('item', item);
        renderer.addCustomDataSource({
            format: Render.DataSource.OBJECT,
            alias: 'images',
            data: getItemImages(item, itemId, dimension)
        });

        file = renderer.renderAsPdf();
        file.name = 'Item-Information-Regina.pdf';

        return file;
    };

    return {
        generate: generate
    };
});
