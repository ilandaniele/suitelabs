var version = "v2.52 JMS";
/*
 *** Changes log ***

 5/27/2021 Alex v2.1: Change logic for Quote and Sales Order. For Quote just generate name
 6/1/2021 Alex v2.3: Set checkboxes in Item record: custitem_routing_update and custitem_standard_cost_rollup_req. SB-2246
 6/1/2021 Alex v2.4: Replace one component with another in the BOM. Key: part_id_to_replace
 6/2/2021 Alex v2.5: Set BOM/revision name as top level item
 6/4/2021 Alex v2.6: Set Revision name according to field in Item record. Set Options for Top-level Item
 6/15/2021 Alex v2.8: Enhance CSV parse to proceed empty line.
 6/16/2021 Alex v2.9: Issue with generic item for Quotes
 6/18/2021 Alex v2.10: Issue with replacing items
 06/27/2021 Leo v2.12: Add window.getPropgenFields() for Proposal
 6/30/2021 Alex v2.13: Add sorting for additional components by bom level column
 7/7/2021 Leo v2.15: Update getPropgenFields() (add additional options)
 7/12/2021 Leo v2.16 Update getPropgenFields() (add qa for Add Model config)
 7/13/2021 Alex v2.17: Add Internal Note
 7/21/2021 Leo v2.18 Update getPropgenFields() (field changes)
 7/27/2021 Alex v2.20: Fix issue with getting index for next record. RegExp fix.
 8/2/2021 Leo v2.22 Fix propgen (replace inactive labels)
 8/5/2021 Leo v2.23 Update getPropgenFields() according to SB3
 8/6/2021 Leo v2.24 Update getPropgenFields() Delivery, Addendum options fix
 8/6/2021 Alex v2.25 Pricing fix
 8/8/2021 Leo v 2.26 Update getPropgenFields() add Teeth, Screens, Rotor sections
 8/13/2021 Leo v2.27 Discount fix
 8/16/2021 Leo v2.28 Propgen fix
 8/18/2021 Leo v2.29 Propgen, custom part price fix; Delivery charge fix
 8/20/2021 Leo v2.30 Propgen, Ship Bill address fix
 8/22/2021 Leo v2.31 Propgen, quoted by/sold by fix
 9/1/2021 Leo v2.32 Propgen, Additional Options fix
 9/2/2021 Leo v2.33 Propgen, Add individual items pricing options
 9/12/2021 Leo v2.34 Propgen, Add MC & EC configs
 9/14/2021 Leo v2.35 Propgen, Move Included Screens & Tooth to main Description
 9/17/2021 Leo v2.36 Propgen, Fix individual items pricing update
 9/18/2021 Leo v.2.37 Propgen, Rebuild and clear functions
 9/28/2021 Leo v.2.38 Propgen, Blank Config Modification
 9/28/2021 Leo v.2.39 Propgen, PDF Changes
 9/29/2021 Leo v.2.40 Propgen, add Pre-Paid Parts Credits
 10/8/2021 Leo v2.41 Propgen, individual items pricing fix
 10/26/2021 Leo v2.42 Propgen, blank propgen qty fix
 10/26/2021 Alex v2.43 try catch to avoid erroring with wrong rules
 11/2/2021 Leo v2.44 Propgen, blank propgen qty fix v2
 11/10/2021 Alex v2.45 PROD: Support multi Master id for one Answer
 11/10/2021 Alex v2.46 PROD: Show checkbox in the Custom Parts QTable (SB-3040)
 3/8/2022 JMS v2.47 JMS: Add console.log() statements to figure out why top 
 level is pulling previous revision. [line #221]
 4/5/2022 CH v2.48: Changed field custitem_standard_cost_rollup_req (old) to 
 custitem_granite_sc_roll_req (new)
 4/25/2022: JMS v2.49 JMS: Changed the referenced BOM revision from revision[0]
 to revision[revision.length-1] to copy components from latest revision in list
 instead of first. This ignores the "effectivity dates", but it's better than 
 ignoring any new revisions that have been created. Also uses the name of the 
 bom revision to assign the value of 'RC Revision' field in newly created items
 IN MOST CASES. There are some cases where it still gets copied from the 
 original item (top-level items only), but still an improvement.
 4/25/2022: v2.50 JMS: Adding on to level.options: labels for all questions 
 that are answered, labels for answers to all answered questions.
 5/12/2022 JMS: Trying to clear sales prices on all new items.

 */

window.loader_count = 0;
window.showProcessing = () => {
	$('#rtc-loader').show();
	window.loader_count++;
};
window.hideProcessing = () => {
	if (window.loader_count > 0 && --window.loader_count == 0) $('#rtc-loader').hide();
};
window.updateLoaderText = (msg) => {
	$('#rtc-loader').html(msg || 'Processing...');
};
window.showLoaderError = (msg) => {
	let txt = $('#rtc-loader').html();
	$('#rtc-loader').html(txt + '<br>' + (msg || 'Error!') + '<br><br><button onclick="hideProcessing()">OK</button>');
};

window.productid = +location.search.substr(1).split('&').filter(p => p.indexOf('productid') == 0)[0].split('=')[1];
window.items_cache = {};
window.boms_cache = {};


window.cleanRule = (rule) => {
	return rule && rule.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&eq;/g, '>') || rule;
};
window.parseCSV = (data) => {
	let objPattern = new RegExp(
		(
			// Delimiters.
			"(\\,|\\r?\\n|\\r|^)" +
			// Quoted fields.
			"(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
			// Standard fields.
			"([^\"\\,\\r\\n]*))"
		),
		"gi"
	);
	let arrData = [[]];
	let arrMatches = null;

	while (arrMatches = objPattern.exec(data)) {
		let strMatchedDelimiter = arrMatches[1];
		if (strMatchedDelimiter.length && strMatchedDelimiter !== ",") {
			arrData.push([]);
		}

		let strMatchedValue;
		if (arrMatches[2]) {
			strMatchedValue = arrMatches[2].replace(new RegExp("\"\"", "g"), "\"");
		} else {
			strMatchedValue = arrMatches[3];
		}
		arrData[arrData.length - 1].push(strMatchedValue);
	}

	return arrData;
};
window.getAdditionalBOM = async() => {
	let loadTable = async(table_code) => {
		let data = await loadFile({name: getTable(table_code).tableRef.file});

		data = parseCSV(data);

		let res = [];
		let columns = data[0];
		for (let i = 1; i < data.length; i++) {
			let row = {};
			if (columns.length > data[i].length) continue;
			for (let j = 0; j < columns.length; j++) {
				if (columns[j])
					row[columns[j]] = data[i][j];
			}
			res.push(row);
		}

		return res;
	};
	let additional = await loadTable('BOM_NEW');

	let bomlist = additional.filter(row => {
		try {
			let ruled = (row.rule && evalRule(row.rule)) || !row.rule;
			let questioned = (row.question && !row.answer && isAnswered(row.question)) || (!row.question && row.answer);
			let answered = (row.question && row.answer && hasAnswer(row.question, row.answer)) || (!row.answer && !row.question);
			return ruled && (questioned || answered);
		} catch (err) {
			return false;
		}
	});

	// Sort row by BOMLevel
	bomlist.sort((a, b) => a.BOMLevel > b.BOMLevel ? 1 : -1);

	return bomlist.map(item => {
		return {
			itemid: item.part_id.trim(),
			parentid: item.parent.trim(),
			replace: item.part_id_to_replace.split('|').map(c => c.trim()).filter(c => !!c),
			quantity: +resolve(item.qty.trim()) || 1
		}
	});
};
// Loads Item data or bunch of items
window.getItem = async(itemid, starts_with, clear_cache) => {

	let items_arr = !Array.isArray(itemid) ? [itemid] : itemid;
	let cached = [];
	let filter_items = [];

	if (!clear_cache) {
		items_arr.map(i => {
			let f = false;
			for (let r in window.items_cache) {
				if ((starts_with && r.indexOf(i) == 0) || (!starts_with && i == r)) {
					cached.push(window.items_cache[r]);
					f = true;
				}
			}
			if (!f) filter_items.push(i);
		});
		if (cached.length >= items_arr.length) return cached;
	} else {
		filter_items = items_arr;
	}

	let filter = [];
	filter_items.map(i => {
		let isNotID = isNaN(Number(i));
		updateLoaderText('Loading item ' + (isNotID ? '' : 'ID') + ' "' + i + '"...');
		if (isNotID) {
			filter.push(['itemid', starts_with ? 'startswith' : 'is', i]);
		} else {
			filter.push(['internalid', 'is', i]);
		}
		filter.push('or');
	});
	filter = filter.slice(0, -1);

	let data = await getData({
		type: 'item',
		filter: filter,
		fields: ['name', 'itemid', 'custitem_rc_bom_revision'],
		sublists: {
			'billofmaterials': ['billofmaterials', 'billofmaterials_display', 'inactive', 'currentrevision']
		},
		loadapi: true
	});

	if (!data.length) return [];

	let loadBom = async(itemdata) => {
		let bom = null;
		if (itemdata.sublists.billofmaterials.length > 0) {
			let revision = await getData({
				type: 'bomrevision',
				filter: ['billofmaterials', 'is', itemdata.sublists.billofmaterials[0].billofmaterials],
				fields: ['name', 'billofmaterials'],
				sublists: {
					'component': ['item', 'item:text', 'quantity']
				},
				loadapi: true
			});
			bom = {
				id: itemdata.sublists.billofmaterials[0].billofmaterials,
				name: itemdata.sublists.billofmaterials[0].billofmaterials_display,
//JMS Changed these lines from revision[0] to revision[revision.length-1] to copy components from latest revision
				revisionid: revision[revision.length-1] && revision[revision.length-1].id,
				latestrevision: revision[revision.length-1] && revision[revision.length-1].name,	//JMS Added this to make name of latest revision a property of bom
				components: revision[revision.length-1] && revision[revision.length-1].sublists.component.map(c => {
//JMS Changed these lines from revision[0] to revision[revision.length-1] to copy components from latest revision
					return {
						item: c.item,
						quantity: +c.quantity
					}
				}) || []
			};
		}
		let d = {
			item: itemdata.id,
			type: itemdata.recordtype,
			itemid: itemdata.itemid,
			custitem_rc_bom_revision: itemdata.custitem_rc_bom_revision,
			bom: bom
		};
//JMS If item has a BOM, use the name of latestrevision to name revision (instead of 'RC Revision')
			if (bom != null) {
				d.custitem_rc_bom_revision = bom.latestrevision;
			};
		window.items_cache[itemdata.itemid] = d;
		window.items_cache[itemdata.id] = d;

		return d;		

	};

	// Load Bill Of Materials and Revisions for further usage
	let queue = [];
	for (let rec of data) {
		queue.push(loadBom(rec));
	}
	let result = await Promise.all(queue);
	cached.map(c => result.push(c));
	return result;
};
window.getBOMs = async(itemid, clear_cache) => {
	let result = [];

	if (boms_cache[itemid] && !clear_cache) {
		return boms_cache[itemid];
	}

	updateLoaderText('Loading BOM records "' + itemid + '"...');
	let boms = await getData({
		type: 'bom',
		filter: ['name', 'startswith', itemid],
		fields: ['name']
	});

	let queue = [];
	for (let bom of boms) {
		updateLoaderText('Loading Revisions for "' + itemid + '"...');
		queue.push(getData({
			type: 'bomrevision',
			filter: [['billofmaterials', 'is', bom.id]],
			fields: ['name', 'billofmaterials'],
			sublists: {
				'component': ['item', 'item:text', 'quantity']
			},
			loadapi: true
		}));
	}
	let revisions = await Promise.all(queue);
	for (let i in boms) {
		result.push({
			id: boms[i].id,
			name: boms[i].name,
			revisionid: revisions[i][0] && revisions[i][0].id,
			components: revisions[i][0] && revisions[i][0].sublists.component.map(c => {
				return {item: c.item, itemid: c['item:text'], quantity: +c.quantity}
			})
		});
	}
	boms_cache[itemid] = result;
	return result;
};
window.getNextIndex = (items, key) => {
	let last_index = 0;
	key = key || 'itemid';
	items.map(item => {
		const regex = /.{5,}-(\d{4})$/gm;
		let m = regex.exec(item[key]);
		last_index = Math.max(last_index, m && +m[1]);
	});
	return last_index + 1;
};
window.getTopItemNextIndex = async(part_number) => {
	let list = await getData({
		type: 'customlist_scpq_used_itemid',
		filter: ['name', 'startswith', part_number],
		fields: ['name']
	});
	return getNextIndex(list, 'name');
};
window.addReservedItemName = async(name) => {
	let q = {
		type: "customlist_scpq_used_itemid",
		fields: {
			name: name
		}
	};
	updateLoaderText('Reserving Part Number "' + name + '"...');
	let r = await createRecord(q);
	console.log('*** New reserved name:', name, location.origin + '/app/common/custom/custrecordentry.nl?rectype=862&id=' + r.id);
	return r && r.id;
};
window.getMasterID = () => {
	let part_id = getAnswerVariable('MODEL', 'part_id');

	// Simple item id
	if (part_id) return part_id;

	let ruled = getAnswerVariable('MODEL', 'ruled');
	if (ruled) {
		try {
			ruled = JSON.parse(ruled);
			for (let id in ruled) {
				if (evalRule(ruled[id])) return id;
			}
		} catch (err) {
			console.error('Wrong ruled expression!');
		}
	}
	return null;
};
window.itemCreation = async() => {
	let createSuffix = (index) => {
		let year = String.fromCharCode(65 + (new Date().getFullYear() - 2020));
		let month = (new Date().getMonth() + 1).toString().padStart(2, '0');
		return {
			presuffix: year + month,
			index: ('' + index).padStart(4, '0'),
			suffix: '-' + year + month + '-' + ('' + index).padStart(4, '0')
		};
	};

	let preloadItems = async(level) => {
		level.children = [];

		let data = await getItem(level.itemid, false, false);
		if (data.length == 0) {
			level.id = null;
			return level;
		}

		level.itemid = data[0].itemid;
		level.id = data[0].item;
		level.type = data[0].type;

		if (!data[0].bom) {
			return level;
		}
		let q = [];

		level.bom_id = data[0].bom.id;

		for (let component of data[0].bom.components) {
			q.push(preloadItems({
				itemid: component.item,
				quantity: component.quantity
			}));
		}
		level.children = await Promise.all(q);

		return level;
	};

	let adjustChildren = async(additional, children) => {
		let changed = false;
		for (let component of children) {
			component.resolved_children = component.resolved_children || [].concat(component.children);
			if (component.resolved_children.length > 0) {
				component.bom_changed = await adjustChildren(additional, component.resolved_children) || component.bom_changed || false;
			}
			if (component.itemid == additional.parentid) {
				// Add additional component
				let data = additional.itemid && await preloadItems({
						itemid: additional.itemid,
						quantity: additional.quantity
					}) || {};
				// Remove items from resolved_children which are in data to prevent duplication
				let found = false;
				component.resolved_children = component.resolved_children.filter(c => {
					if (c.id != data.id && additional.replace.indexOf(c.itemid) == -1) {
						found = true;
						return true;
					}
					return false;
				});
				if (data.id) {
					component.resolved_children = component.resolved_children.concat(data);
				}
				if (component.resolved_children.length != component.children.length || found) {
					component.bom_changed = true;
					changed = true;
				}
			}
		}
		return changed;
	};

	let compareBOMs = (bom1, bom2) => {
		if (bom1.length != bom2.length) return false;
		return bom1.map(b1 => bom2.filter(b2 => b1.item == b2.id && b1.quantity == b2.quantity).length > 0).filter(o => !o).length == 0;
	};

	let getRoutings = async(bom_id) => {
		let data = await getData({
			type: 'manufacturingrouting',
			filter: [['isinactive', 'is', 'F'], 'and', ['billofmaterials', 'is', bom_id]],
			fields: ['name'],
			loadapi: true
		});
		return data && data[0];
	};

	let updateBOM = async(level) => {
		let bomcomponents = [];
		level.resolved_children.map(c => {
			if (c.id)
				bomcomponents.push({
					item: c.id,
					bomquantity: c.quantity
				});
		});
		q = {
			type: 'bomrevision',
			id: level.rev_id,
			fields: {},
			sublists: {
				'component:clear': bomcomponents
			}
		};

		updateLoaderText('Updating Revision of "' + level.itemid + '"...');
		let data = await createRecord(q);
		if (!data) throw new Error('Revision for "' + level.itemid + '" has not been updated!');
	};

	let createBOM = async(level) => {
		let existed = await getBOMs(level.itemid);
		let name = level.itemid;// + '-' + createSuffix(getNextIndex(existed, 'name')).index;

		//****   Create BOM record
		let q = {
			type: 'bom',
			fields: {
				name: name,
				subsidiary: '7',
				availableforalllocations: 'T',
				includechildren: 'T',
				// custrecord_bom_created_from_verenia: 'T'
			}
		};
		if (level.top_level) {
			q.fields.custrecord_rc_bom_machine = 'T';
		}

		updateLoaderText('Creating new BOM record "' + name + '"...');
		bom_data = await createRecord(q);
		if (!bom_data) throw new Error('BOM record for "' + name + '" has not been created!');
		console.log('New BOM: ' + location.origin + '/app/accounting/manufacturing/bom.nl?id=' + bom_data.id);
		level.bom_id = bom_data.id;


		//****  Create Revision record
		let start = new Date();
		start.setDate(start.getDate() - 1);
		let date = (start.getMonth() + 1) + '/' + start.getDate() + '/' + start.getFullYear();
		if (window.opener && window.opener.nlapiDateToString) {
			date = window.opener.nlapiDateToString(start);
		}
		let bomcomponents = [];
		level.resolved_children.map(c => {
			if (c.id)
				bomcomponents.push({
					item: c.id,
					bomquantity: c.quantity
				});
		});
		let rev_name = level.custitem_rc_bom_revision || name;
		q = {
			type: 'bomrevision',
			fields: {
				name: rev_name,
				billofmaterials: bom_data.id,
				effectivestartdate: date,
			},
			sublists: {
				'component:clear': bomcomponents
			}
		};

		updateLoaderText('Creating new Revision record "' + rev_name + '"...');
		let data = await createRecord(q);
		if (!data) throw new Error('Revision for "' + rev_name + '" has not been created!');
		console.log('New revision: ' + location.origin + '/app/accounting/manufacturing/bomrevision.nl?id=' + data.id);
		level.rev_id = data.id;


		//****  Copy Routing
		if (level.imt_bomid) {
			let routing = await getRoutings(level.imt_bomid);
			if (routing) {
				updateLoaderText('Creating new Manufacturing Routing record "' + name + '"...');
				let rout = await copyRecord({
					id: routing.id,
					type: 'manufacturingrouting',
					fields: {
						name: name,
						billofmaterials: level.bom_id,
						// custrecord_created_from_verenia: 'T'
					}
				});
				if (!rout) throw new Error('Manufacturing Routing for "' + name + '" has not been created!');
				console.log('New routing: ' + location.origin + '/app/accounting/manufacturing/mfgrouting.nl?id=' + rout.id);
				level.routing_id = rout.id;
			}
		}
	};

	let copyItem = async(level) => {
		//*****  Copy Item
		debugger;	//JMS
		updateLoaderText('Creating new Item "' + level.itemid + '"...');
		let obj = {
			id: level.id,
			type: level.type,
			fields: {
				itemid: level.itemid,
				custitem_rc_machine: level.top_level ? 'T' : 'F',
				custitem_scpq_item_configurator: window.productid,
				custitem_routing_update: 'T',
				custitem_granite_sc_roll_req: 'T',
				custitem_rc_created_from_verenia: 'T',
				custitem_rc_test_data: 'F',
				custitem_rc_bom_revision: 'Wrong'	//JMS Trying to name RC Revision with name of revision instead of copying field. Will be reassigned below.
			},
			lists: {	//JMS If I add the lists of sale prices and standard costs here, will it clear them both in the new item and leave them alone in the original?
				'billofmaterials': [
					{
						clear: 'all',
					},
					{
						billofmaterials: level.bom_id,
						masterdefault: "T"
					}
				]
/*				'price': [	//JMS Added this section to try and clear sale prices on all new copies
					{
						clear: 'all'
					}	//JMS Added this section to try and clear sale prices on all new copies
				]*/
			}
		};
		obj.fields.custitem_rc_bom_revision = level.custitem_rc_bom_revision;	//JMS Trying to name new RC Revision with name of revision instead of copying field
		if (level.top_level) {
			obj.fields.custitem_rc_configuration_options = level.options;
		}
		let res = await copyRecord(obj);
		
		//JMS Now need to clear the sale prices on the newly copied item...

		if (!res) throw new Error('Item "' + new_itemid + '" has not been created!');
		console.log('New item: ' + location.origin + '/app/common/item/item.nl?id=' + res.id);
		debugger;	//JMS Check obj here

		level.id = res.id;

		await getItem(level.itemid, false, true);

		return level;
		debugger;	//JMS Weird... It hits the above "debugger", but never gets to this one...
	};

	let assignBOM = async(item, bid) => {
		let data = await createRecord({
			type: 'assemblyitem',
			id: item,
			sublists: {
				'billofmaterials:clear': [
					{
						billofmaterials: bid,
						masterdefault: "T"
					}
				]
			}
		});
		return data.id;
	};

	//JMS Need to copy or edit the section below to clear prices on Sales tab
	//JMS Seems to do something similar already for costs on Loctions tab (including for sub-levels)
	//JMS Actually, I'm not sure it's even doing that correctly...
	let clearCosts = async(level) => {
		updateLoaderText('Updating Locations in "' + level.use_itemid + '"...');
		let data = await getData({
			type: 'item',
			filter: ['internalid', 'is', level.id],
			fields: [],
			sublists: {
				locations: ['location', 'cost'],	//JMS Added comma
				price: ['pricelevel', 'price_1_']	//JMS Added this, trying to clear sale prices in new items
			},
			loadapi: true
		});
		debugger;	//JMS

		if (!data) return false;

		let obj = {};
		data[0].sublists.locations.map(l => {
			if (l.cost) {
				console.log("itemid: " + data[0].itemid + " l.cost line 630: " + l.cost)	//JMS 
				obj[l.location] = {
					cost: ''
				};
			}
		});
		debugger;	//JMS
		
		//JMS Trying to clear costs in new items
/*		data[0].sublists.price.map(p => {
			if (p.price_1_) {
				console.log("id: " + data[0].id + " p.price_1_ line 643: " + p.price_1_ + " p.pricelevel: " + p.pricelevel)	//JMS
				obj[p.pricelevel] = {
					price_1_: '123.00'	//JMS added "123" between quotes to see if this sets all prices = $123.00
					//JMS It did set all prices to $123, but in the original item (04-0658) instead of the new item...
					//JMS As a test, I changed 04-0658 sale prices to $10, $20, $30, $40, $50 and ran a configuration
					//JMS Resulting item reflected that price (10, 20, 30...), but 04-0658 prices had been changed to $123
					//JMS So, somehow, the price is being read from the original item, and then the original item is being changed...
					//JMS Another problem, since both costs and prices are being added to obj, there will be conflicts when location id matches a pricelevel. This will need to be its own array.
				};
			}
			debugger;	//JMS
		});*/
		// JMS Trying to clear costs in new items
		
		debugger;	//JMS
		await createRecord({
			type: data[0].recordtype,
			id: level.id,
			sublists: {
				'locations:set': {
					key: 'locationid',	//JMS Try changing key: 'locationid' to key: 'location' to match the data in 'data'
					//JMS Then configure a master that has costs (04-0823 has standard costs of $288,000) to see if they get reset in either the new item or the original.
					//JMS If neither, revert change and retry.
					//JMS Without reverting the change, NEARLY all the costs in 04-0823  were reset to $0 (all locations except Australia), and the new item inherited the original costs...
					//JMS Revert the change and re-test with a master that has costs.
					//JMS Reverted change, added costs back into 04-0823. Costs were wiped out between line 652 and 675...
					items: obj
				}/*,	//JMS Added comma
				'price:set': {	//JMS
					key: 'pricelevel',	//JMS
					items: obj	//JMS
				}*/
			}
		});	//JMS
		debugger;	//JMS
	};

	let createItems = async(level) => {
		if (level.bom_changed) {
			for (let child of level.resolved_children) {
				await createItems(child);
			}
		}
		if (level.top_level) {
			let main_item_data = await getItem(level.use_itemid, false, false);
			if (main_item_data.length == 0) {
				let IMT = await getItem(level.itemid, false, false);
				// Create new BOM!
				if (IMT[0].bom) {
					level.imt_bomid = IMT[0].bom.id;
					let itemid = level.itemid;
					level.itemid = level.use_itemid;
					level.custitem_rc_bom_revision = IMT[0].custitem_rc_bom_revision;
					await createBOM(level);
					level.itemid = itemid;
				}

				// Item does not exist
				await copyItem({
					id: IMT[0].item,
					type: IMT[0].type,
					itemid: level.use_itemid,
					options: level.options,
					top_level: true,
					bom_id: level.bom_id
				});
				await clearCosts(level);
			} else {
				let itemid = level.itemid;
				level.bom_id = main_item_data[0].bom.id;
				level.rev_id = main_item_data[0].bom.revisionid;
				level.itemid = level.use_itemid;
				await updateBOM(level);
				level.itemid = itemid;

				updateLoaderText('Updating Item record "' + level.use_itemid + '"...');
				await createRecord({
					type: main_item_data[0].type,
					id: main_item_data[0].item,
					fields: {
						custitem_rc_configuration_options: level.options,	//JMS Added comma
						custitem_rc_bom_revision: level.custitem_rc_bom_revision	//JMS Trying to name RC Revision with name of revision instead of copying field
					}
				});
			}
		} else if (level.bom_changed) {
			// sub-levels
			/**** Create new or use existed item. Search for it.   ****/
			let items = await getItem(level.itemid, true, true);

			let found = false;
			for (let b1 of items) {
				if (b1.bom) {
					if (compareBOMs(b1.bom.components, level.resolved_children)) {
						found = true;
						level.itemid = b1.itemid;
						level.id = b1.item;

						level.bom_id = b1.bom.id;
						level.rev_id = b1.bom.revisionid;

						break;
					}
				}
			}

			if (!found) {
				// Does not exist
				console.log('%cLevel does not exist', 'color: red;', level);
				let IMT = await getItem(level.itemid, false, false);

				let suffix = createSuffix(getNextIndex(items));
				level.itemid = level.itemid + '-' + suffix.index;

				if (IMT[0].bom) {
					level.imt_bomid = IMT[0].bom.id;
					level.custitem_rc_bom_revision = IMT[0].custitem_rc_bom_revision;
					await createBOM(level);
				}
				await copyItem(level);
			}
		}
	};

	// debugger;

	let top_item = getMasterID();
	if (!top_item) return false;

	let config_bom = await getAdditionalBOM();

	let reserved_itemid = getValue('HIDDEN', '$RESERVED_ITEMID');
	if (!reserved_itemid) {
		let s = createSuffix();
		let index = await getTopItemNextIndex(top_item + '-' + s.presuffix);
		s = createSuffix(index);
		reserved_itemid = top_item + s.suffix;

		setValue('HIDDEN', '$RESERVED_ITEMID', reserved_itemid);
		await addReservedItemName(reserved_itemid);
	}
	setValue('NS_ORDCOL', 'custcol_reserved_itemid', reserved_itemid);


	if (transactionType == 'estimate') {
		return {
			itemid: top_item
		};
	}

	let options = [];
	let toInclude = ['MODEL', 'ENGINE', 'DRIVE', 'VOLTAGE', 'HITCH', 'AXLES', 
		'DISCHARGE', 'COLORIZER', 'DOLLY', 'ROTOR', 'TOOTH_CONFIG', 'TOOTH', 
		'TOOTH1', 'TOOTH2', 'CROSS', 'CB_DISC', 'ADDONS', 'ROTOLINK_CONN', 
		'NOZZLES'];	//JMS
	getRuleset('questions').map(q => {	//JMS Steps through all questions (ignoring hidden)
		if (toInclude.includes(q.code)) {	//JMS Include answers to many questions instead of just 'Additional Options'
			if (isAnswered(q.code)) {	//JMS
				options.push(q.labelHtml + ":" + "\n");	//JMS
				q.answers.map(a => {	//JMS Steps through ALL answers to all questions (ignoring hidden)
					if (hasAnswer(q.code, a.acode)) {	//JMS Steps through only selected answers
						options.push("-" + a.labelHtml + "\n");	//JMS Show answer labels indented under question labels
					}
				})
			options.push("\n");	//JMS Add a blank line after each question's answers
			}
		}
	});
	options = options.join("");	//JMS Line breaks are no longer needed here
	console.log("Options: \n" + options);

	// ....Sales Order....
	if (config_bom.length == 0) {
		debugger;	//JMS Trying to see what config_bom looks like
		// There is no changes based on options.
		// Create new item and use standard BOM
		let main_item_data = await getItem(reserved_itemid, false, false);
		let top_item_data = await getItem(top_item, false, false);

		// Update bom
		let bomcomponents = [];
		top_item_data[0].bom.components.map(c => {
			bomcomponents.push({
				id: c.item,
				quantity: c.quantity
			});
		});
		debugger;	//JMS Trying to see what main_item_data looks like
		if (main_item_data.length == 0) {
			debugger;	//JMS
			// Item does not exist
			let level = {
				id: top_item_data[0].item,
				type: top_item_data[0].type,
				itemid: reserved_itemid,
				options: options,
				resolved_children: bomcomponents,
				custitem_rc_bom_revision: top_item_data[0].custitem_rc_bom_revision,
				top_level: true,
				imt_bomid: top_item_data[0].bom.id,
			};

			// Create new BOM!
			await createBOM(level);
			await copyItem(level);

			return {
				itemid: reserved_itemid,
				bom_id: level.bom_id,
				rev_id: level.rev_id,
			};

		} else {
			updateLoaderText('Updating Item record "' + reserved_itemid + '"...');
			await createRecord({
				type: main_item_data[0].type,
				id: main_item_data[0].id,
				fields: {
					custitem_rc_configuration_options: options
				}
			});

			await updateBOM({
				itemid: reserved_itemid,
				rev_id: main_item_data[0].bom.revisionid,
				bom_id: main_item_data[0].bom.id,
				resolved_children: bomcomponents
			});
		}
		return {
			itemid: reserved_itemid,
			bom_id: main_item_data[0].bom.id,
			rev_id: main_item_data[0].bom.revisionid,
		};
	} else {
		debugger;	//JMS Trying to see what config_bom looks like
		// Must be changes
		let structure = {
			itemid: top_item,
			options: options,
			quantity: 1,
			top_level: true,
			use_itemid: reserved_itemid
		};
		await preloadItems(structure);

		for (let additional of config_bom) {
			await adjustChildren(additional, [structure]);
		}

		await createItems(structure);

		structure.itemid = reserved_itemid;

		return structure;
	}
};

window.prc_cache = {};
window.calculatePrices = () => {
	console.log('**** Calculate Prices ****');

	let top_item = getMasterID();

	if (!top_item) return false;

	let price = 0;
	if (window.prc_cache[top_item]) {
		price = window.prc_cache[top_item];
	} else {
		getItemPrice({
			skus: [top_item],
			async: false
		}).done(prc => {
			price = prc.getPrice(top_item, 1, 1) || 0;
		});
		window.prc_cache[top_item] = price;
	}

	setValue('DATA', 'PRC_BASE', price);

	// Calculate Total
	let total = 0;
	(getRuleset('pricings') || []).map(pricing => {
		total += +resolve(pricing.price) || 0;
	});
	setValue('NS_ORDCOL', 'rate', total);

	console.log('Total:' + total);

};

// Create User Notes
window.addUserNotes = () => {
	let internal_note = getValue('NOTES', 'INTERNAL');
	let itemid = getValue('HIDDEN', '$RESERVED_ITEMID');
	let oid = getOrderField('id');

	if (!transactionType) return false;

	console.group('  >> Internal Note');

	console.log('"' + internal_note + '"');

	let proceedNotes = (notes, new_trans) => {
		console.log('Existed notes:', notes);

		let note = notes.find(n => n.title == itemid);
		if (new_trans) {
			// New transaction
			if (note) {
				if (internal_note) {
					// Update existed note
					window.opener.nlapiSetLineItemValue('usernotes', 'note', note.line, internal_note);
				} else {
					// Delete note
					window.opener.nlapiRemoveLineItem('usernotes', note.line);
				}
			} else if (internal_note) {
				window.opener.nlapiSetCurrentLineItemValue('usernotes', 'title', itemid);
				window.opener.nlapiSetCurrentLineItemValue('usernotes', 'note', internal_note);
				window.opener.nlapiSetCurrentLineItemValue('usernotes', 'notetype', 7);
				window.opener.nlapiCommitLineItem('usernotes');
			}
		} else {
			// Transaction was saved.
			let obj = {
				type: 'note',
				id: note && note.id,
				fields: {
					title: itemid,
					notetype: 7,
					note: internal_note
				},
				async: false
			};
			if (!note)
				obj.fields.transaction = oid;

			if (internal_note) {
				createRecord(obj).done(r => {
					console.log('Note records was create/updated', r);
				});
			} else if (note) {
				// Delete note
				deleteRecord({
					type: 'note',
					id: note.id,
					async: false
				}).done(r => {
					console.log('Note records was deleted', r);
				});
			}

			window.opener.refreshmachine('usernotes');
		}
	};

	if (oid) {
		// Transaction was saved
		// Try to find existed note
		getData({
			type: 'note',
			filter: ['title', 'is', itemid],
			fields: ['title', 'note'],
			async: false
		}).done(proceedNotes);
	} else {
		// New transaction. Add notes via NS API
		if (window.opener && window.opener.nlapiGetLineItemCount) {
			window.opener.nlapiCancelLineItem('usernotes');
			let notes = [];
			let note_count = window.opener.nlapiGetLineItemCount('usernotes');


			for (let i = 1; i <= note_count; i++) {
				notes.push({
					line: i,
					title: window.opener.nlapiGetLineItemValue('usernotes', 'title', i),
					note: window.opener.nlapiGetLineItemValue('usernotes', 'note', i),
				});
			}
			proceedNotes(notes, true);
		}
	}
	console.groupEnd();
};

// Add custom Action
if ($scope && $scope.product) {
	$scope.product.operations.push({
		after: "F",
		cat: "",
		code: "FNC_PRICING",
		crule: "",
		exec: "calculatePrices();",
		first: "F",
		id: "666",
		name: "Pricing",
		rule: "true",
		sequence: "0",
		style: "",
		type: "before"
	});
	$scope.product.operations.push({
		after: "F",
		cat: "",
		code: "FNC_NOTES",
		crule: "",
		exec: "addUserNotes();",
		first: "F",
		id: "667",
		name: "Add User Notes",
		rule: '(__[\"SOLE/CFGSTATUS\"]==\"FINAL\")',
		sequence: "0",
		style: "",
		type: "before"
	});
} else {
	alert('Pricing calculations can not be performed! Please contact your administrator.');
}
if ($scope && $scope.currFormat) {
	$scope.currFormat = (price) => {
		let p = (+price).toFixed(2);
		p = isNaN(p) ? 0 : p;
		let f = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD'
		});
		return f.format(p);
	};
}


eos.Core.constraint("allowed", 'PROPGEN/START_EVEN');
eos.Core.constraint("allowed", 'PROPGEN/IMAGE');
eos.Core.constraint("allowed", 'PROPGEN/TERMS');
eos.Core.constraint("allowed", 'PROPGEN/CCN');					// Customer Company Name
eos.Core.constraint("allowed", 'PROPGEN/CN');					// Customer Name
eos.Core.constraint("allowed", 'PROPGEN/CA');					// Customer Address
eos.Core.constraint("allowed", 'PROPGEN/SRN');					// Sales Rep Name
eos.Core.constraint("allowed", 'PROPGEN/SRP');					// Sales Rep Phone
eos.Core.constraint("allowed", 'PROPGEN/SRE');					// Sales Rep Email
eos.Core.constraint("allowed", 'PROPGEN/MODEL');
eos.Core.constraint("allowed", 'PROPGEN/MODEL_DESCRIPTION');
eos.Core.constraint("allowed", 'PROPGEN/CHECK_SHIP');			// Check Ship-To
eos.Core.constraint("allowed", 'PROPGEN/BILL_ADDRESS');			// Bill-to address
eos.Core.constraint("allowed", 'PROPGEN/SUGGESTED_OPTIONS');
eos.Core.constraint("allowed", 'PROPGEN/TEETH_OPTIONS');
eos.Core.constraint("allowed", 'PROPGEN/SCREENS_OPTIONS');

window.getPropgenFields = () => {
	// get customer info
	getCustomer();
	// get sales rep info
	if (!getValue('PROPGEN','SRN')) {
		getSalesRep();
	}
	// check bill ship addres for checkbox from page4 header
	checkShipBill();

	let index = 0;

	const resolveItemLabel = (item) => {
		const htmlRegex = new RegExp(/<\/?[a-z][\s\S]*>/i);
		const label = item.html || item.labelHtml || item.name;
		if (htmlRegex.test(label)) {
			return $(label).text();
		} else {
			return label;
		}
	}
	const priceFormat = (price) => {
		let p = (+price).toFixed(2);
		p = isNaN(p) ? 0 : p;
		let f = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD'
		});
		return f.format(p);
	};

	// get config image for Page 4 header
	setValue('PROPGEN', 'IMAGE', getImg());

	if ($scope.product.code == 'ADDMODEL') {
		// for Add Model config
		setValue('PROPGEN', 'MODEL_DESCRIPTION', getLiteDesc());
	} else {
		// for other configs

		let optionsTanle = getSuggOptions(); //+ getTeethOptions() + getScreenOptions()
		setValue('PROPGEN', 'MODEL', getAnswerLabel('MODEL'));
		setValue('PROPGEN', 'MODEL_DESCRIPTION', getDesc());
		setValue('PROPGEN', 'SUGGESTED_OPTIONS', getSuggOptions());
		// setValue('PROPGEN', 'TEETH_OPTIONS', '');
		// setValue('PROPGEN', 'SCREENS_OPTIONS', '');
	}

	setValue('PROPGEN', 'START_EVEN', (index % 2 !== 0) ? 'even' : 'odd');
	setValue('PROPGEN', 'TERMS', getTerms());


	function getImg() {
		let modelImage = getValue('SOLE', 'IMAGES')[0]?.url;

		if (modelImage) {
			let loc = window.location?.origin;
			return `<img src="${loc}${modelImage}">`
		} else {
			return ' ';
		}
	}

	function checkShipBill() {
		let ship = getOrderField('shipaddresslist');
		let bill = getOrderField('billaddresslist');

		if (ship == bill) {
			// checkbox checked
			setValue('PROPGEN', 'CHECK_SHIP', `<img src="https://4526300.app.netsuite.com/core/media/media.nl?id=6745&c=4526300&h=JCMOz2-_hDtqzlt7wOfZsL1PzgT4BxoulWdYaKLScUDseVOF">`);
			reset('PROPGEN', 'BILL_ADDRESS');
		} else {
			// checkbox not checked
			setValue('PROPGEN', 'CHECK_SHIP', `<img src="https://4526300.app.netsuite.com/core/media/media.nl?id=6743&c=4526300&h=nWFJRbk_WSTK9gi2HutMMRlgpwoqUZz6DjhxovH0Er7nz4QO">`);
			let billAddress = getOrderField('billaddress');
			setValue('PROPGEN', 'BILL_ADDRESS', `<pre><b>Bill To:</b> ${billAddress}</pre>`);
		}
	}

	function getDesc() {
		const standardFeatures = $scope.product.questions.find(q => q.code == 'STANDARD') ?.answers;
		const Motor = getValue('HIDDEN', 'DRIVE_QCODE'),
			Rotor = 'ROTOR',
			Voltage = 'VOLTAGE';
		const additionalOptions = isAnswered('ADDONS') && getAnswersCodes('ADDONS');
		const additionalQuestion = $scope.product.questions.find(q => q.code == 'ADDONS');
		const extendedWarranty = isAnswered('WARRANTIES', 'EXTEND') && 'Extended Warranty';
		const pricings = getRuleset('pricings');
		const orderQTY = getValue('SOLE','QUANTITY') || 1;
		let template = ``;
		let textArr = [];
		let priceObj = {};

		// Prepare Standard Features
		if (standardFeatures) {
			standardFeatures.forEach(function (ans) {
				let readonly = ans.readonly;
				let text = resolveItemLabel(ans).replaceAll('\n', ' ');
				let price = false;
				const checkLabel = (code) => {
					const name = getAnswerLabel(code) || text;
					const priceItem = pricings.find(p => p.name == name);
					if (priceItem && readonly) {
						// replace label
						text = resolveItemLabel(priceItem);
						readonly = false;
					} else if (!priceItem && readonly) {
						text = name;
						readonly = false;
					}
					// prepare price
					price = getValue(code + '_PDF', 'YES') && (priceItem?.price * orderQTY || '0');
					if (price) priceObj[text] = price;
				}

				// replace readOnly labels
				switch (ans.name) {
					case 'Motor':
						checkLabel(Motor);
						break;
					case 'Rotor':
						checkLabel(Rotor);
						break;
					case 'Voltage':
						checkLabel(Voltage);
						break;
				}
				if (!readonly && ans.isVisible && ans.acode !== 'PRICE') {
					if (extendedWarranty && text.includes('Warranty')) text = extendedWarranty;
					textArr.push(text);
				}
			});
		}

		// Find Commissioning & Training or Delivery, so we can insert them at the end
		let otherDescription = textArr.find(t => t.includes('Commissioning & Training') || t.includes('Delivery'));
		let otherDescriptionIndex = textArr.indexOf(otherDescription);
		let otherDescriptionData = false;
		if (otherDescriptionIndex != -1) {
			otherDescriptionData = textArr.slice(otherDescriptionIndex, textArr.length);
			textArr = textArr.slice(0, otherDescriptionIndex);
		}

		// Prepare Additional Options & Individual Price
		if (additionalOptions && additionalQuestion) {
			const showPrice = getValue('ADDONS_PDF','YES');
			for (let i = 0; i < additionalOptions.length; i++) {
				let answer = additionalQuestion.answers ?.find(ans => ans.acode == additionalOptions[i]);
				let text = answer ? resolveItemLabel(answer) : '';

				if (!text) continue;

				if (showPrice) {
					let res = pricings.find( p => p.name == text);
					if (res && !res.price) {
						// try to pick up price from html text
						let htmlName = resolveItemLabel(res);
						if (htmlName.includes('$')) res.price = htmlName.split('$')[1];
						if (res.price.includes(',')) res.price = res.price.replace(',','');
					}
					priceObj[text] = res?.price || '0';
				}

				textArr.push(text);
			}
		}

		// Prepare Installed Tooth
		let showToothPrice = getValue('TOOTH_PDF','YES') || getValue('TOOTH_CONFIG_PDF','YES');
		let toothItems = isAnswered('TOOTH_CONFIG');
		if (toothItems) {
			let res = pricings.filter(p => p.name.includes('Tooth Package (included)') || p.name.includes('Tooth Packages (Half set'));
			if (res.length) {
				res.forEach(function(r) {
					let text = resolveItemLabel(r);
					text = resolve(text);
					let price = '';
					if (showToothPrice) {
						price = (r.total * orderQTY) || '0';
						priceObj[text] = price;
					}

					textArr.push(text);
				});
			}
		}
		
		// Additional Teeth starting here
		let teethOptions = isAnswered('TOOTH_ACC_QTYS') && 'TOOTH_ACC_QTYS';
		let teethQTY = 'TOOTH_ACC_INPUTS';
		let items = getRuleset('items');
		let data = $scope.product.items;
		let showAdditionalPrice = getValue('TOOTH_ACC_QTYS_PDF','YES');

		//let template = '';

		let activeItems = [];
		
		if (teethOptions && items && data) {
			items.forEach(function(it) {
				let res = data.find(d => d.itemid == it.itemid && d.rule.includes(teethOptions) && d.rule.includes(teethQTY));
				if (res) activeItems.push(res);
			});
		}
		
		if (activeItems.length) {
			for (var i = 0; i < activeItems.length; i++) {
				let text = activeItems[i].itemid || '';
				let price = '';
				let qty = activeItems[i].tqty || '1';
				if (showAdditionalPrice) price = (activeItems[i].price * activeItems[i].tqty) || '0';

				if (price) price = priceFormat(price);

				// if (i % 2 !== 0) style = `class="tr-even"`;
				if (!text) continue;

				getData({
					type: 'item',
					filter: ['itemid', 'is', text],
					fields: ['description','itemid'],
					async: false,
				}).done(function(rdata) {
					if (rdata && rdata.length) {
						text = rdata[0].description;
						textArr.push(text);
						priceObj[text] = price;
					}
				});

			}
		} 
		
		// Additional Teeth finishing here
		
		// Prepare Included Screens
		let installedTable = $scope.product.questions.find(q => q.code == 'SCREENS_TABLE') && getQTable('SCREENS_TABLE');
		let installedLength = installedTable && installedTable.getFilledRowCount();
		let showInstallPrice = getValue('SCREENS_PDF','YES') || getValue('SCREENS_TABLE_PDF','YES');
		if (installedTable && installedLength) {
			for (let i = 1; i <= installedLength; i++) {
				let item = installedTable.get('STYLE',i);
				if (showInstallPrice) priceObj[item] = '0';

				if (item) textArr.push(item);
			}
		}
		
		// Additional screens starting here
		
		let additionalTable = $scope.product.questions.find(q => q.code == 'QTABLE_SCREENS') && getQTable('QTABLE_SCREENS');
		let additionalLength = additionalTable && additionalTable.getFilledRowCount();
		activeItems = [];
		items = getRuleset('items');
		showAdditionalPrice = getValue('SCREEN_SEL_PDF','YES');

		if (additionalTable && additionalLength) {
			for (let i = 1; i <= additionalLength; i++) {
				let item = additionalTable.get('STYLE',i);
				let price = '';
				let qty = additionalTable.get('QTY',i) || 1;

				if (showAdditionalPrice) {
					let it = additionalTable.get('CODE',i);
					if (!it) it = item;
					let res = items.find(r => r.itemQA == it);
					price = (res?.price * res?.qty) || '0';
				}

				if (item) activeItems.push({item, price, qty});
			}
		}

		if (activeItems.length) {
			for (var i = 0; i < activeItems.length; i++) {
				let text = activeItems[i].item || '';
				let price = activeItems[i].price || '';
				let qty = activeItems[i].qty || '1';

				if (price) price = priceFormat(price);
				if (!text) continue;
				text = text + 'Additional x' + qty;
				textArr.push(text);
				if (showAdditionalPrice) {
					priceObj[text] = price;
				}
			}
		} 
		
		// Additional screens finishing here
		
		// Prepare Individual Item Price & Text
		const IndividualPriceMap = ['COLORIZER','DOLLY','CROSS','DISCHARGE','NOZZLES','HITCH'];
		if ($scope.product.code == 'GB250')	IndividualPriceMap.push('VOLTAGE');

		for (const question of IndividualPriceMap) {
			if (getValue(question + '_PDF', 'YES')) {
				let label = isAnswered(question) && getAnswerLabel(question);
				if (label) {
					const priceItem = pricings.find(p => p.name == label);
					const text = (priceItem && resolveItemLabel(priceItem)) || label;
					const price = (priceItem && priceItem.price * orderQTY) || '0';

					textArr.push(text);
					priceObj[text] = price;
				}
			}
		}

		// Add main item text
		textArr.forEach(function (text) {
			if (text) {
				let price = '';
				if (priceObj[text]) price = priceObj[text];
				template += getTemplate(index++, text, price);
			}
		});
		// Add Custom part text
		if (isAnswered('CUS_PART')) {
			let t = getQTable('CUS_PART');
			let rows = t.getFilledRowCount();
			for (let i = 1; i <= rows; i++) {
				let desc = '**Customization ' + t.get('DESC', i);
				const show = t.get('SHOW_PRICE', i);
				const prc = t.get('PRICE', i);
				template += getTemplate(index++, desc, show ? prc : '');
			}
		}
		// Add Pre-Paid Parts Credits
		const prePaidQTY = getValue('PARTS_CREDIT','INPUT');
		if (prePaidQTY) {
			// itemid DC-PrePaidParts, id 9719
			getData({
				type: 'noninventoryitem',
				filter: ['internalid','is','9719'],
				fields: ['price'],
				async: false,
			}).done(function(rdata) {
				if (rdata && rdata.length) {
					price = rdata[0].price * prePaidQTY;
					template += getTemplate(index++, 'Pre-Paid Parts Credits', price);
				}
			});
		}
		// Add Delivery, etc text
		if (otherDescriptionData && otherDescriptionData.length) {
			otherDescriptionData.forEach(function(text) {
				if (text) {
					let price = false;
					if (text.includes('Delivery') && getValue('SHOW_DELIVERY', 'SHOW_DELIVERY')) price = getValue('DELIVERY', 'CHARGE');
					template += getTemplate(index++, text, price);
				}
			});
		}


		// console.log(template);
		return template;

		function getTemplate(index, text, price) {
			let style = '';

			if (price) {
				price = priceFormat(price);
			} else {
				price = '';
			}

			if (index % 2 !== 0) style = `class="tr-even"`;

			return `<table class="model-table page-4">
				<tr ${style}>
					<td>${text}</td>
					<td>${price}</td>
				</tr>
			</table>`;
		}
	}

	function getSuggOptions() {
		let model = getAnswerCode('MODEL');
		let sugOptions = isAnswered('RECOM_OPT') && getAnswersCodes('RECOM_OPT');
		let question = $scope ?.product ?.questions ?.find(q => q.code == 'RECOM_OPT');
		const orderQTY = getValue('SOLE','QUANTITY') || 1;

		let template = `<p class="page-4" style="margin-top: 20px;"><b>Additional Suggested Options Not Included in Price Total</b></p>
				<table class="sugg-option page-4" id="sugg-option-header">
					<tr>
						<td>Description</td>
						<td>Price USD</td>		
						<td>
							<p>Customer</p>
							<p>initials</p>
						</td>
						<td>
							<p>Sales Rep</p>
							<p>initials</p>
						</td>
					</tr>
				</table>`;

		if (sugOptions && question) {
			for (var i = 0; i < sugOptions.length; i++) {
				let style = '';
				let answer = question.answers ?.find(ans => ans.acode == sugOptions[i]);
				let text = answer ? resolveItemLabel(answer) : '';
				let price_arr = $scope.product.pricings.filter(p => p.rule.includes('ADDONS/' + sugOptions[i] + '\"'));
				let price = '';
				if (price_arr.length == 1) {
					price = (price_arr[0].price * orderQTY) || '0';
				} else if (price_arr.length > 1) {
					price = price_arr.find(p => p.rule.includes(model + '\"')) ?.price || '0';
					price = price * orderQTY;
				}

				if (price) price = priceFormat(price);

				if (i % 2 !== 0) style = `class="tr-even"`;
				if (!text) continue;

				template += `<table class="sugg-option page-4">
					<tr ${style}>
						<td>${text}</td>
						<td>${price}</td>		
						<td>________</td>
						<td>________</td>
					</tr>
				</table>`;
			}

			return template;
		} else {
			return ' ';
		}
	}

	function getTerms() {
		let modelDrive = isAnswered(getValue('HIDDEN', 'DRIVE_QCODE')) && getAnswerCode(getValue('HIDDEN', 'DRIVE_QCODE'));
		let terms = ' ';

		switch (modelDrive) {
			// if DRIVE/ELE10
			case 'ELE10':
				terms = `<span>20% deposit, 80% upon machine completion</span>`;
				break;
			// if DRIVE/ELE15
			case 'ELE15':
				terms = `<span>20% deposit, 80% upon machine completion</span>`;
				break;
			// if DRIVE/DIESEL
			case 'DIESEL':
				terms = `<span>20% deposit, 80% prior to shipment</span>`;
				break;
			// if empty
			default:
				terms = ' ';
		}

		return terms;
	}

	function getCustomer() {
		let cust = getOrderField('entity');
		if (cust) {
			getData({
				type: 'customer',
				id: cust,
				fields: ['entityid', 'companyname', 'defaultaddress'],
				async: false,
			}).done(function (rdata) {
				// console.log('done!', rdata);
				if (rdata) {
					let comp_name = rdata.companyname;
					let cust_name = rdata.entityid.replace(comp_name, '');
					let address = rdata.defaultaddress?.replace(comp_name + '\n', '').split('\n');
					let cust_address = '';
					if (address) {
						address.forEach(function (a) {
							cust_address += `<p>${a}</p>`;
						});
					}

					setValue('PROPGEN', 'CCN', comp_name);
					setValue('PROPGEN', 'CN', cust_name);
					setValue('PROPGEN', 'CA', cust_address);
				}
			});
		}
	}

	function getSalesRep() {
		let sales = getOrderField('salesrep') || getValue('SOLE', 'USER');
		if (sales) {
			getData({
				type: 'employee',
				id: sales,
				// filter: ['entityid','is', sales],
				fields: ['phone', 'email', 'entityid'],
				async: false,
			}).done(function (rdata) {
				// console.log('done!', rdata);
				if (rdata) {
					let sales_name = rdata.entityid;
					let sales_phone = rdata.phone;
					let sales_mail = rdata.email;

					setValue('PROPGEN', 'SRN', sales_name);
					setValue('PROPGEN', 'SRP', sales_phone);
					setValue('PROPGEN', 'SRE', sales_mail);
				}
			});
		}
	}

	function getLiteDesc() {
		let template = ``;

		getTableData('MODELTABLE','ITEM','DESC','PRICE','QUANTITY');
		getTableData('INPUT',false,'DESCRIPTION','PRICE','QUANTITY');
		// Add Delivery
		let price = false;
		let text = 'Delivery';
		if (getValue('SHOW_DELIVERY', 'SHOW_DELIVERY')) price = getValue('DELIVERY', 'CHARGE');
		template += getTemplate(index++, text, price);

		// console.log(template);
		return template;

		function getTemplate(index, text, price) {
			let style = '';

			if (price) {
				price = priceFormat(price);
			} else {
				price = '';
			}

			if (index % 2 !== 0) style = `class="tr-even"`;

			return `<table class="model-table page-4">
				<tr ${style}>
					<td>${text}</td>
					<td>${price}</td>
				</tr>
			</table>`;
		}

		function getTableData(table, q_item, q_desc, q_price, q_qty) {
			let t = getQTable(table);
			let rows = t.getFilledRowCount();

			// Add Main Item Description
			if (rows) {
				for (let i = 1; i <= rows; i++) {
					let text = t.get(q_desc, i);
					if (!text) text = '';
					let item_text = t.get(q_item, i);
					if (item_text)  text = item_text + ' (' + text + ')';
					let price = t.get(q_price, i);
					let qty = t.get(q_qty, i) || 1;
					text += ' (x' + qty + ')';
					price = price * qty;

					template += getTemplate(index++, text, price);
				}
			}
		}
	}
}


console.log("%cCommon Functions Library loaded. Version: " + version, "font-size: 120%; font-weight: bold; color: green;");
$('.navbar-header').append('<span>v' + version + '</span>');

window.transactionType = getOrderField('baserecordtype');
eos.Core.constraint("allowed", 'HIDDEN/$RESERVED_ITEMID');

eos.Core.constraint("allowed", 'HIDDEN/DRIVE_QCODE');
setValue('HIDDEN', 'DRIVE_QCODE', 'MOTOR');
try {
	if ($scope.product.code == 'GB250') {
		setValue('HIDDEN', 'DRIVE_QCODE', 'DRIVE');
	} else
	if ($scope.product.code == 'ROTOCHOPPER') {
		setValue('HIDDEN', 'DRIVE_QCODE', 'ENGINE');
	} else
	if ($scope.product.code == 'EC') {
		setValue('HIDDEN', 'DRIVE_QCODE', 'DRIVE');
	}
} catch (err) {}

document.querySelector("#scpq-submit > button.btn.btn-default.ng-binding.ng-scope").addEventListener('click', showProcessing);
document.querySelector("#scpq-submit > ul > li:nth-child(1) > a").addEventListener('click', showProcessing);
document.querySelector("#scpq-submit > ul > li:nth-child(2) > a").addEventListener('click', showProcessing);

$('.sole-container').before('<div id="rtc-loader" style="padding-top: 5%; background: rgba(255,255,255,0.8); position: fixed; width: 100%; height: 100%; text-align: center; font-size: 30px; z-index: 999; display: none;">Processing...</div>');


window.initFullVersion = () => {
	const defaultSubmit = $('#scpq-submit');
	let customSubmit = defaultSubmit.clone();
	defaultSubmit.hide();
	customSubmit.attr({id: 'custom-submit'});
	customSubmit.insertAfter(defaultSubmit);
	customSubmit.find('button').css('background', 'lawngreen');
	customSubmit.find('[ng-click="postProduct(\'close\')"], [ng-click="postProduct(\'new\')"], [ng-click="postProduct(\'copy\')"]').click(async function () {

		if (getRuleset('questions').some(({incomp}) => incomp)) return alert('Cannot submit an incompatible configuration!');
		if (getRuleset('validations').some(({type}) => type == 'Invalid' || type == 'Incomplete')) return alert('Cannot submit invalid or incomplete configuration!');


		let el = $(this);
		let attribute = el.attr('ng-click');

		showProcessing();
		// Workaround to make loader appear

		console.error('Start time:', new Date().toISOString());
		var starttime = performance.now();

		try {
			var soleItem = await itemCreation();
		} catch (err) {
			showLoaderError('ERROR: ' + err.message);
			console.error(err);
			return false;
		}

		if (!soleItem) {
			showLoaderError('Configuration can not be submitted');
			return false;
		}

		console.log('%cResulted item', 'font-size: 150%;color:green;', soleItem);
		setValue('SOLE', 'SOLEITEM', soleItem.itemid);
		soleItem.bom_id && setValue('NS_ORDCOL', 'custcol_rc_adv_bom', soleItem.bom_id);
		soleItem.rev_id && setValue('NS_ORDCOL', 'custcol_rc_revision', soleItem.rev_id);

		// set discount
		let discount = +getValue('DISCOUNT','DOLLAR_AMOUNT') || +getValue('DATA','DISCOUNT');
		setValue('NS_ORDFLD', 'custbody_rc_discount_quote', discount);
		let delivery = getValue('DELIVERY', 'CHARGE');
		setValue('NS_ORDFLD', 'shippingcost', delivery);

		console.error('End time:', new Date().toISOString());
		console.error('Duration', performance.now() - starttime);

		updateLoaderText('Get Propgen Fields...');
		try {
			getPropgenFields();
		} catch (err) {
			showLoaderError('ERROR: ' + err.message);
			console.error(err);
		}


		updateLoaderText('Submit configuration...');

		hideProcessing();


		if (attribute.includes('copy')) {
			submitConfig({afterSubmitAction: 'copy'});
		} else if (attribute.includes('new')) {
			submitConfig({afterSubmitAction: 'new'});
		} else {
			submitConfig({afterSubmitAction: 'close'});
		}

		return true;
	});
};
