var priorityLabel = document.getElementById('custentity_cust_priority_fs_lbl');
var priorityField = document.getElementById('custentity_cust_priority_fs');
priorityLabel.style.display = 'none';
priorityField.style.display = 'none';


var financeReviewLabel = document.getElementById('custentity_lux_financereviewstatus_fs_lbl');
var financeReviewField = document.getElementById('custentity_lux_financereviewstatus_fs');
financeReviewLabel.style.display = 'none';
financeReviewField.style.display = 'none';


var loginAccessLabel = document.getElementById('giveaccess_fs_lbl');
var loginAccessField = document.getElementById('giveaccess_fs');
var loginAccessInput = document.getElementById('giveaccess_fs_inp');
loginAccessInput.checked = !loginAccessInput.checked;
loginAccessLabel.style.display = 'none';
loginAccessField.style.display = 'none';

var assignedWebsiteLabel = document.getElementById('custentity_assigned_website_fs_lbl');
var assignedWebsiteField = document.getElementById('custentity_assigned_website_fs');
var assignedWebsite = document.getElementById('custentity_assigned_website');
assignedWebsiteLabel.style.display = 'none';
assignedWebsiteField.style.display = 'none';
assignedWebsite.value = '11';


document.getElementById('main_form').onsubmit = function(event) {
    try {
        if (NS.form.isInited() && NS.form.isValid() && save_record(true)) {
            alert('Your application will be processed...');
            return true; 
        } 
        return false; 
    } catch(e) { 
        return false; 
    }
};
