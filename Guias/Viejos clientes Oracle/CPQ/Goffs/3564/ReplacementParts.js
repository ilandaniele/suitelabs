(function () {
    var orderNumber = getValue('ORIG_ORDER','NUMBER');
    
    getData({ 
    		type: 'salesorder',
    		filter: ['tranid', 'startsWith', orderNumber], 
    		fields: ['tranid'],
    		sublists: {
    			'item': ['item','description'] 
    		},
    		loadapi: true,
    		async: false
    }).then(function (data) {
    	
    	var table = getQTable('DOOR_ACC');
    	var tableRow = 1;
    	
    	var items = data[0].sublists.item;
    	for (var i = 0; i <= items.length; i++) {
    		if(items[i]) {
    			table.import({ ACC_OPTION: items[i].description, ACC_QTY: 0, ADD_MORE: true, ACC_ID: items[i].item});
    		}
    	}
    });
})();