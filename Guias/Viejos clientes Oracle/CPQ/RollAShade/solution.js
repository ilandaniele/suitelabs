// Initialize Variables
let pnQs = [
    { qCode: "HIDDEN", aCode: "WWCHNUM" },
    { qCode: "HIDDEN", aCode: "WWCHNUMRIGHT" },
    { qCode: "HIDDEN", aCode: "CNTRLSUR" },
    { qCode: "HIDDEN", aCode: "RCNTRLSUR" },
    { qCode: "HIDDEN", aCode: "DUOLINER" },
    { qCode: "HIDDEN", aCode: "RDUOLINER" },
    { qCode: "HIDDEN", aCode: "WWHOBCHNUM" },
    { qCode: "HIDDEN", aCode: "RWWHOBCHNUM" },
    { qCode: "HIDDEN", aCode: "HOBLINER" },
    { qCode: "HIDDEN", aCode: "RHOBLINER" },
    { qCode: "HIDDEN", aCode: "BAND" },
    { qCode: "HIDDEN", aCode: "RBAND" },
]
var qty = getAnswerName("WW_QTY");
async function addtoTable() {
    let ansQs = [];
    let shadesTable = getQTable("SHADES").get();
    if (!shadesTable) {
        for (let { qCode, aCode } of pnQs) {
            let pn = getValue(qCode, aCode)
            if (pn) {
                console.log('**ADD TO SHADES TABLE**')
                var t = getQTable("SHADES");
				
				getData({
					type: 'noninventoryitem',
					filter:['itemid','is',pn],     
					fields: ['itemid'],
					async: false
				}).done(function(res){
					console.log('entered asynchronous response: ', res);
					t.import({ QTY: qty, PN: pn, ID: res[0].id });
					// it does not execute at first, so it does not add the value, so will need some kind of async waiting or something
				});
            }
        }
    }
};

    // Initialize QTable
    var t = getQTable("SHADES");
    var count = t.getRowCount();
    

    addtoTable();
	console.log("count", count);

    reset("BUTTONS", "ADD");