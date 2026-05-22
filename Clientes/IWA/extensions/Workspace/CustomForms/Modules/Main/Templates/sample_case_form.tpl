<div class='row'>
    <div data-validation='control-group'>
        <label for='companyname'>Company Name <small>*</small></label>
        <div data-validation='control'>
            <input data-validate-required data-validate-required-message='Company Name is required' id='companyname' name='companyname' type='text' value='' />
        </div>
    </div>
</div>
<div class='row'>
    <div data-validation='control-group'>
        <label for='email'>Email <small>*</small></label>
        <div data-validation='control'>
            <input data-validate-email data-validate-required data-validate-required-message='Please provide a valid email' id='email' name='email' type='text' value='' />
        </div>
    </div>
    <div data-validation='control-group'>
        <label for='title'>Title</label>
        <div data-validation='control'>
            <input id='title' name='title' type='text' value='' />
        </div>
    </div>
</div>
<div class='row'>
    <div data-validation='control-group'>
        <label for='incomingmessage'>Message</label>
        <div data-validation='control'>
            <textarea id='incomingmessage' name='incomingmessage'></textarea>
        </div>
    </div>
</div>
<input type="hidden" name="subsidiary">
<input type="hidden" name="currency">
<div class='row'>
    <div class=''>
        <button class="button-medium button-primary" type='submit'>Submit</button>
    </div>
</div>
