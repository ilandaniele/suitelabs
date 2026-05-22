<div class='row'>
    <div data-validation='control-group'>
        <label for='firstname'>First name <small>*</small></label>
        <div data-validation='control'>
            <input data-validate-required data-validate-required-message='First name is required' id='firstname' name='firstname' type='text' value='' />
        </div>
    </div>
    <div data-validation='control-group'>
        <label for='lastname'>Last Name <small>*</small></label>
        <div data-validation='control'>
            <input data-validate-required data-validate-required-message='Last name is required' id='lastname' name='lastname' type='text' value='' />
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
        <label for='phonenumber'>Phone Number</label>
        <div data-validation='control'>
            <input id='phone' name='phone' type='text' value='' />
        </div>
    </div>
</div>
<div class='row'>
    <div data-validation='control-group'>
        <label for='custentity_kissler_customer_category'>Kissler Customer Category</label>
        <div data-validation='control'>
            <select data-list-id='customrecord_kissler_customer_category' id='custentity_kissler_customer_category' name='custentity_kissler_customer_category'></select>
        </div>
    </div>
    <div data-validation='control-group'>
        <label for='custentity_im_a_master'>I'm a Master, yes sir!</label>
        <div data-validation='control'>
            <input id='custentity_im_a_master' name='custentity_im_a_master' type='checkbox' value='T' />
        </div>
    </div>
</div>
<div class='row'>
    <div class='' data-validation='control-group'>
        <label for='file'>Upload your file</label>
        <div data-validation='control'>
            <input name='custom-file' type='file' />
        </div>
    </div>
</div>
<div class='row'>
    <div data-validation='control-group'>
        <label for='country'>Country</label>
        <div data-validation='control'>
            <select data-list-id='country' id='country' name='country'>
                <option value=""></option>
            </select>
        </div>
    </div>
    <div data-validation='control-group'>
        <label for='state'>State</label>
        <div data-validation='control'>
            <select data-list-id='state' id='state' name='state'></select>
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
<!--
    PARENT: data-list-id data-child-list-id
    CHILD: data-list-id data-list-parent-property
-->
