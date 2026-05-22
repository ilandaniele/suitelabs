(function () {
	$('.sole-container').before('<div id="ws-loader" style="padding-top: 5%; background: rgba(255,255,255,0.8); position: fixed; width: 100%; height: 100%; text-align: center; font-size: 30px; z-index: 999; display: none;">Processing...</div>'); 
	setTimeout(window.showProcessing(),0);
	if(getAnswerCode('ORDER_TYPE1') === 'NEW_DOOR') {
		let sequenceNumber = 1;
		const doorModel = getAnswerName('DOOR_MODEL');
		const doorSubModel = getAnswerName('DOOR_TYPE');
		let template = 'Template - ';
		
		if (doorModel === 'G1 Doors' || 'G2 Doors') {
			template+= doorSubModel.replace(' -','') + ' Door';
		} else {
			template+= doorModel + ' Door';
		}
		
		const table = getQTable('DOOR_ACC');
		let members = [];

		for (let k = 1; k <= table.getRowCount(); k++) {
			const itemName = getValue('DOOR_ACC','ACC_OPTION_'+k);
			const qty = getValue('DOOR_ACC','ACC_QTY_'+k);
			const accessoryID = getValue('DOOR_ACC','ACC_ID_'+k);
			console.log('accessoryID: ',accessoryID);
			
			if (itemName && itemName !== '' && qty && qty > 0) {
				console.log('Data passed: ',itemName);
				members.push({
					item: accessoryID,
					quantity: parseInt(qty)
				});
			}
		}
									
		
		let itemID = 'Custom ' + doorSubModel + ' Door - ';
		
		let itemIDSearch = itemID + String(sequenceNumber).padStart(5, '0');
		
		let itemType = 'Custom ' + doorSubModel + ' Door';
		let itemTypeSequentialNumberRecord = {};
		let existsSequentialNumber = false;
		
		getData({
			type: 'customrecord_item_sequential_number', 
			filter: ['custrecord_item_type_name', 'is', itemType], 
			fields: ['custrecord_item_type_name','custrecord_item_type_sequential_number'],
			async: false
		}).then(function (data) {
			
			if(data[0]) {
				console.log('Previous Assembly with number ' + String(data[0].custrecord_item_type_sequential_number).padStart(5,'0') + ' exists');
				itemID = itemID + String(parseFloat(data[0].custrecord_item_type_sequential_number)+1).padStart(5,'0');
				itemTypeSequentialNumberRecord = data[0];
				existsSequentialNumber = true;
			} else {
				itemID = itemID + '00001';
			}
			
			console.log('Will create a new Assembly with name:',itemID);
		
			let bomComponents = [];
			let bomID;
			
			console.log('Template name: ',template);
			console.log('Item ID: ',itemID);
			
			getData({
				type: 'bom',
				filter: ['memo', 'is', template],
				fields: ['memo', 'revisionname'],
				async: false
			}).then(function (data) {
				if (data[0].revisionname) {
					let revisionName = data[0].revisionname;
					
					getData({ 
						type: 'bomrevision', 
						filter: ['name', 'is', revisionName], 
						fields: ['name'], 
						sublists: {
							'component': ['item','bomquantity']
						},
						loadapi: true,
						async: false
					}).then(function (data) {
						const components = data[0].sublists.component;
						for (let i = 0; i < components.length; i++) {
							if(components[i]) {	
								getData({ 
									type: 'item',
									filter: ['internalid', 'is', components[i].item], 
									fields: ['internalid','custitem_scpq_component_dynamic', 'custitem_scpq_component_rule', 'custitem_scpq_component_quantity'],
									async: false
								}).then(function (data) {
									const isDynamic = data[0].custitem_scpq_component_dynamic;
									const scpqRule = data[0].custitem_scpq_component_rule;
									const scpqQuantity = data[0].custitem_scpq_component_quantity.split(' ').join('');
									
									let passesRule = false;
									
									try {
										if(!scpqRule || evalRule(scpqRule)) {
											passesRule = true;
										} else {
											passesRule = false;
										}
									} catch(error) {
										passesRule = false;
									}

									
									if (isDynamic) {
										if(passesRule) {
											if(!scpqQuantity) {
												bomComponents.push({
													item: data[0].internalid,
													bomquantity: components[i].bomquantity
												});
											}else{
												bomComponents.push({
													item: data[0].internalid,
													bomquantity: parseInt(resolve(scpqQuantity))
												});
											}
										}
									} else {
										bomComponents.push({
											item: data[0].internalid,
											bomquantity: components[i].bomquantity
										});
									}
									
									if(i + 1 === components.length ) {
										// Step 1 - Create BOM
										createRecord({
											type: 'bom',
											fields: {
												name: 'BOM - ' + itemID,
												memo: 'Created from VCPQ',
												availableforalllocations: 'T',
												availableforallassemblies: 'T',
												includechildren: 'T'
											},
											async: false
										}).then(function (data) {
											console.log('Create BOM DONE!', data);
											bomID = data.id;
											// Step 2 - Create BOM Revision
											createRecord({ 
												type: "bomrevision",
												fields: {
													name: 'Revision ' + itemID,
													billofmaterials: bomID
												},
												sublists: {
													'component': bomComponents
												},
												async: false
											}).then(function (data) {
												// Step 3 - Create Assembly Item
												console.log('Create BOM Revision DONE!', data);
												
												createRecord({ 
													type: 'assemblyitem',
													fields: {
														taxschedule: '1',
														itemid: itemID,
														custitem_scpq_item_configurator: '2',
														custitem_scpq_item_isconf: 'T',
														unitstype: '1'
													},
													sublists: {
														'billofmaterials': [{
															billofmaterials: bomID,
															masterdefault: 'T'
														}],
														member: members
													},
													async: false
												}).then(function (data){
													// Step 4 - Add breakout items
													console.log('Create Assembly Item DONE!', data);
													setValue('SOLE', 'SOLEITEM', itemID);
													
													for(let j = 1; j <= table.getRowCount(); j++) {
														const itemName = getValue('DOOR_ACC','ACC_OPTION_'+j);
														const qty = getValue('DOOR_ACC','ACC_QTY_'+j);

														if (itemName && itemName !== '') {
															getData({ 
																type: 'inventoryitem', 
																filter: ['displayname', 'is', itemName], 
																fields: ['displayname', 'itemid','internalid'],
																async: false
															}).then(function (data) {
																addBreakoutItem({
																	itemid: data[0].itemid,
																	qty: qty
																});
															});
														}
													}
													
												});
											});
										});
									}
								});
							}
						}
					});
				}
			}).done(function (data) {
				if (existsSequentialNumber) { 
					updateRecordFields({
						type: 'customrecord_item_sequential_number',
						id: itemTypeSequentialNumberRecord.id,
						fields: {
							custrecord_item_type_sequential_number: parseFloat(itemTypeSequentialNumberRecord.custrecord_item_type_sequential_number) + 1
						},
						sourcing: true
					}).done(function(data) {
					  console.log(data);
					});
				} else {
					createRecord({
						type: "customrecord_item_sequential_number",
						fields: {
							name: itemType,
							custrecord_item_type_name: itemType,
							custrecord_item_type_sequential_number: 1
						}
					}).done(function(data) {
					  console.log(data);
					});
				}
			});
			
		});
	} else {
		if(getAnswerCode('ORDER_TYPE1') === 'REPL_PARTS') {
			const table = getQTable('DOOR_ACC');
					
			for(let i = 1; i <= table.getRowCount(); i++) {
				const description = getValue('DOOR_ACC','ACC_OPTION_'+i);
				const qty = getValue('DOOR_ACC','ACC_QTY_'+i);
				const accessoryID = getValue('DOOR_ACC','ACC_ID_'+i);
				if (description && qty && qty > 0) {
					addBreakoutItem({
						item: accessoryID,
						qty: qty
					});
				}
			}
		}
	}
	setTimeout(window.hideProcessing(),0);
})();