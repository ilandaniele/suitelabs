const doorAccessories = getQTable('DOOR_ACC');
for (let i = 1; i <= doorAccessories.getRowCount(); i++){
    const itemName = getValue('DOOR_ACC','ACC_OPTION_'+i);
    
    if (itemName && itemName !== '') {
		getData({ 
			type: 'inventoryitem', 
			filter: ['displayname', 'startsWith', itemName], 
			fields: ['displayname', 'internalid'],
			loadapi: true
		}).then(function (data) {
		    console.log('Setting new ID from the table', data[0].id);
			setValue('DOOR_ACC','ACC_ID_'+i,data[0].id);
		});
	}
}