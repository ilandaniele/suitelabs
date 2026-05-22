/**
* @NApiVersion 2.x
* @NScriptType MapReduceScript
*/
define([
    'N/record',
    'N/search',
    'N/log',
    'N/file'
], function mrCategoryImagesImport(
    nRecord,
    nSearch,
    nLog,
	nFile
) {
    'use strict';

    function getInputData() {

		var data = {};
		var categories = [];
		var mappingFile = nFile.load({
			id: '469727' //'Web Site Hosting Files/Live Hosting Files/site/Category images/Commerce Category Images Mapping.csv'
		});

		var iterator = mappingFile.lines.iterator();
		// Skip the first line, which is the CSV header line
		iterator.each(function () {
            return false;
        });

		iterator.each(function (line) {
			var lineValues = line.value.split(',');
			data[lineValues[0].toLowerCase()] = lineValues[1]+'.jpg';
			return true;
		});

        var categoryNames = Object.keys(data);
        //487

		var myCategoriesSearch = nSearch.create({
            type: nSearch.Type.COMMERCE_CATEGORY,
            columns: [{
                name: 'internalid'
            }, {
                name: 'name'
            }]
        });

        var searchCategories = {};
        var csvSearchCategories = {};

        var found = false;

		myCategoriesSearch.run().each(function(category) {
			var name = category.getValue({name:'name'}).trim().toLowerCase();
            var i = 0;
            found = false;
            if(searchCategories[name]) {
                searchCategories[name]++;
            } else {
                searchCategories[name] = 1;
            }


            while (!found && i<categoryNames.length) {
                if(categoryNames[i] === name) {
                    if(csvSearchCategories[name]) {
                        csvSearchCategories[name]++;
                    } else {
                        csvSearchCategories[name] = 1;
                    }
                    categories.push(
                        {
                        'internalid': category.getValue({name:'internalid'}),
                        'name': name,
        				'image': data[name]
                        }
                    );
                    found = true;
                }
                i++;
            }

            return true;
        });



        var h = 0;
        var keyArray = Object.keys(searchCategories);
        var total = 0;
        for(h; h<keyArray.length; h++) {
            total = total + searchCategories[keyArray[h]];
        }


        var l = 0;
        var keyArray2 = Object.keys(csvSearchCategories);

        var total2 = 0;
        for(l; l<keyArray2.length; l++) {
            total2 = total2 + csvSearchCategories[keyArray2[l]];
        }


        i = 0;
        while (i<categoryNames.length) {
            found = false;
            h = 0;
            while(!found && h<keyArray.length) {
                if(keyArray[h] === categoryNames[i]) {
                    found = true;
                }
                h++;
            }

            if(!found) {
                nLog.debug('category from CSV not found',categoryNames[i]);
            }
            i++;
        }

        nLog.debug('CSV categories',categoryNames.length);
        nLog.debug('SEARCH categories without repeat',keyArray.length);
        nLog.debug('SEARCH categories + repeated', total);
        nLog.debug('FOUND SEARCH categories + repeated', total2);
        nLog.debug('FOUND SEARCH categories without repeat',keyArray2.length);
        nLog.debug('categories array',categories.length);

        return categories;
    }

    function reduce(context) {
        var data = JSON.parse(context.values[0]);
        nLog.debug('data',JSON.stringify(data));

        try {
            var commerceCategoryRecord = nRecord.load({
                type: nRecord.Type.COMMERCE_CATEGORY,
                id: data.internalid,
                isDynamic: true
            });

            var image = 'Web Site Hosting Files/Live Hosting Files/site/Category images/'+data.image;

            var file = nFile.load({
                id: image
            });

            commerceCategoryRecord.setValue({
                fieldId: 'thumbnail',
                value: file.id,
                ignoreFieldChange: false
            });

            commerceCategoryRecord.save({
                enableSourcing: true,
                ignoreMandatoryFields: true
            });

        } catch(ex) {
             nLog.error('error', JSON.stringify(ex));
        }
    }

    return {
        getInputData: getInputData,
        map: null,
        reduce: reduce,
        summarize: null
    };
});
