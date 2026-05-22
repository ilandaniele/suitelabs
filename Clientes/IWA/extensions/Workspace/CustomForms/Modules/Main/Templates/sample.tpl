<div class='row'>
    <div data-validation='control-group'>
        <label for='firstname'>First name <small>*</small></label>
        <div data-validation='control'>
            <input data-validate-required='' data-validate-required-message='First name is required' id='firstname' name='firstname' type='text' value='' />
        </div>
    </div>
    <div data-validation='control-group'>
        <label for='lastname'>Last Name <small>*</small></label>
        <div data-validation='control'>
            <input data-validate-required='' data-validate-required-message='Last name is required' id='lastname' name='lastname' type='text' value='' />
        </div>
    </div>
</div>
<div class='row'>
    <div data-validation='control-group'>
        <label for='email'>Email <small>*</small></label>
        <div data-validation='control'>
            <input data-validate-email='' data-validate-required='' data-validate-required-message='Please provide a valid email' id='email' name='email' type='text' value='' />
        </div>
    </div>
    <div data-validation='control-group'>
        <label for='phonenumber'>Phone Number</label>
        <div data-validation='control'>
            <input id='phone' name='phone' type='text' value='' />
        </div>
    </div>
</div>
<div class='row'>
    <div data-validation='control-group'>
        <label for='custentityao_mod_planname'>Plan Number or Name</label>
        <div data-validation='control'>
            <input id='custentityao_mod_planname' name='custentityao_mod_planname' type='text' value='' />
        </div>
    </div>
    <div data-validation='control-group'>
        <label for='custentityao_bldg_loc'>Building Location</label>
        <div data-validation='control'>
            <input id='custentityao_bldg_loc' name='custentityao_bldg_loc' type='text' value='' />
        </div>
    </div>
</div>
<div class='row'>
    <div data-validation='control-group'>
        <label for='custentityao_mod_foundation'>Foundation</label>
        <div data-validation='control'>
            <select data-list-id='customlist2' id='custentityao_mod_foundation' name='custentityao_mod_foundation'></select>
        </div>
    </div>
    <div data-validation='control-group'>
        <label for='custentityao_mod_wallframing'>Wall Framing</label>
        <div data-validation='control'>
            <select data-list-id='customlist5' id='custentityao_mod_wallframing' name='custentityao_mod_wallframing'></select>
        </div>
    </div>
</div>
<div class='row'>
    <div class='quote-request-form-large-row' data-validation='control-group'>
        <label for='custentityao_mod_note'>Additional Information</label>
        <div data-validation='control'>
            <textarea cols='30' id='custentityao_mod_note' name='custentityao_mod_note' rows='8'></textarea>
        </div>
    </div>
</div>
<div class='row'>
    <div class='quote-request-form-large-row' data-validation='control-group'>
        <label for='file'>Provide your marked-up plan / ideas</label>
        <div data-validation='control'>
            <input name='file' type='file' />
        </div>
    </div>
</div>
<div class='row'>
    <div class='quote-request-form-submit-container'>
        <button type='submit'>Submit</button>
    </div>
</div>
