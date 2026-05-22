<div class="address-edit-fields">
    <div data-type="alert-placeholder"></div>

    <small class="address-edit-fields">{{translate 'Required'}} <span class="address-edit-fields-required">*</span></small>
    <div class="address-edit-fields-group" data-input="fullname" data-validation="control-group">
        <label class="address-edit-fields-group-label" for="{{manage}}fullname">
            {{translate 'Full Name'}} <span class="address-edit-fields-group-label-required">*</span>
        </label>
        <div  class="address-edit-fields-group-form-controls" data-validation="control">
            <input type="text" class="address-edit-fields-group-input" id="{{manage}}fullname" name="fullname" value="{{fullName}}">
        </div>
    </div>


    {{#if showCompanyField}}
    <div class="address-edit-fields-group" {{#if isCompanyFieldMandatory}} data-input="company" data-validation="control-group" {{/if}}>
    <label class="address-edit-fields-group-label" for="{{manage}}company">
        {{translate 'Company'}}
        {{#if isCompanyFieldMandatory}}
        <span class="address-edit-fields-group-label-required">*</span>
        {{else}}
        <p class="address-edit-fields-company-optional-label">{{translate '(optional)'}}</p>
        {{/if}}
    </label>
    <div  class="address-edit-fields-group-form-controls" {{#if isCompanyFieldMandatory}} data-validation="control" {{/if}}>
    <input type="text" class="address-edit-fields-group-input" id="{{manage}}company" name="company" value="{{company}}" >
</div>
</div>
{{/if}}

<div class="address-edit-fields-group" data-input="addr1" data-validation="control-group">
    <label class="address-edit-fields-group-label" for="{{manage}}addr1">
        {{translate 'Address 1 (Select from Dropdown)'}} <span class="address-edit-fields-input-required">*</span>
    </label>
    <div  class="address-edit-fields-group-form-controls" data-validation="control">
        <input type="text" class="address-edit-fields-group-input" id="{{manage}}addr1" name="addr1" value="{{addressLine1}}">
        <div class="address-edit-fields-group-help-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
            </svg>
            <small class="address-edit-fields-input-help">{{translate 'Example: 1234 Main Street'}}</small>
        </div>
    </div>
</div>

{{#if showAddressFormSecondAddress}}
<div class="address-edit-fields-group address-edit-fields-group-big" data-input="addr2">
    <label class="address-edit-fields-group-label" for="{{manage}}addr2">
        {{translate 'Address 2 (optional)'}}
    </label>
    <div>
        <input type="text" class="address-edit-fields-group-input" id="{{manage}}addr2" name="addr2" value="{{addressLine2}}">
        <div class="address-edit-fields-group-help-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
            </svg>
            <small class="address-edit-fields-input-help">{{translate 'Example: Apt. 3 or Suite #1516'}}</small>
        </div>
    </div>
</div>
{{/if}}
<div class="address-edit-fields-group" data-input="city" data-validation="control-group">
    <label class="address-edit-fields-group-label" for="{{manage}}city">
        {{translate 'City'}} <span class="address-edit-fields-input-required">*</span>
    </label>
    <div  class="address-edit-fields-group-form-controls" data-validation="control">
        <input type="text" class="address-edit-fields-group-input" id="{{manage}}city" name="city" value="{{city}}">
    </div>
</div>

<div class="address-edit-fields-group {{#unless showCountriesField}} hide {{/unless}}" data-view="CountriesDropdown" data-input="country" data-validation="control-group">
</div>

<div class="address-edit-fields-group" data-input="state" data-view="StatesView" data-validation="control-group">
</div>

<div class="address-edit-fields-group" data-input="zip" {{#if isZipOptional}} style="display: none;" {{/if}} data-validation="control-group">
<label class="address-edit-fields-group-label" for="{{manage}}zip">
    {{translate 'Zip Code (Select from Dropdown)'}} <span class="address-edit-fields-input-required">*</span>
</label>
<div  class="address-edit-fields-group-form-controls" data-validation="control">
    <input type="text" class="address-edit-fields-group-input-zip" id="{{manage}}zip" name="zip" value="{{zip}}" data-type="zip">
    <div class="address-edit-fields-group-help-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
        </svg>
        <small class="address-edit-fields-input-help">{{translate 'Example: 94117'}}</small>
    </div>
</div>
</div>

<div class="address-edit-fields-group"  data-input="phone" data-validation="control-group">
    <label class="address-edit-fields-group-label" for="{{manage}}phone">
        {{translate 'Phone Number'}}
        {{#if isPhoneFieldMandatory}}
        <span class="address-edit-fields-input-required">*</span>
        {{else}}
        <p class="address-edit-fields-phone-optional-label">{{translate '(optional)'}}</p>
        {{/if}}
    </label>
    <div  class="address-edit-fields-group-form-controls" data-validation="control">
        <input type="tel" class="address-edit-fields-group-input" id="{{manage}}phone" name="phone" value="{{phone}}" data-action="inputphone">
        <div class="address-edit-fields-group-help-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
            </svg>
            <small class="address-edit-fields-input-help">{{translate 'Example: 555-123-1234'}}</small>
        </div>
    </div>
</div>

<div class="address-edit-fields-group" data-input="isresidential">
    <label class="address-edit-fields-group-input-checkbox">
        <input type="checkbox" id="{{manage}}isresidential" value="T" data-unchecked-value="F" name="isresidential" {{#if isAddressResidential}} checked {{/if}} >
        {{translate 'This is a Residential Address'}}
        <i class="address-edit-fields-icon-question-sign" data-toggle="tooltip" title="" data-original-title="{{translate 'Indicating that this is a residential address will help us determine the best delivery method for your items.'}}"></i>
    </label>
</div>


{{#if showDefaultControls}}
<div class="address-edit-fields-group" data-input="defaultbilling">
    <label class="address-edit-fields-group-input-checkbox">
        <input type="checkbox" id="{{manage}}defaultbilling" value="T" data-unchecked-value="F" name="defaultbilling" {{#if isAddressDefaultBilling}} checked {{/if}}>
        {{#if isCurrentTouchPointCheckout}}
        {{translate 'Save as my primary billing address'}}
        {{else}}
        {{translate 'Make this my default billing address'}}
        {{/if}}
    </label>
</div>

<div class="address-edit-fields-group" data-input="defaultshipping">
    <label class="address-edit-fields-group-input-checkbox">
        <input type="checkbox" id="{{manage}}defaultshipping" value="T" data-unchecked-value="F" name="defaultshipping" {{#if isAddressDefaultShipping}} checked {{/if}}>
        {{#if isCurrentTouchPointCheckout}}
        {{translate 'Save as my primary shipping address'}}
        {{else}}
        {{translate 'Make this my default shipping address'}}
        {{/if}}
    </label>
</div>
{{/if}}
</div>



{{!----
Use the following context variables when customizing this template:

manage (String)
showCompanyField (Boolean)
isCompanyFieldMandatory (Boolean)
isPhoneFieldMandatory (Boolean)
showCountriesField (Boolean)
isZipOptional (Boolean)
isAddressResidential (Boolean)
showDefaultControls (Boolean)
isAddressDefaultBilling (Boolean)
isCurrentTouchPointCheckout (Boolean)
isAddressDefaultShipping (Boolean)
showAddressFormSecondAddress (Boolean)
fullName (String)
addressLine1 (String)
city (String)
zip (String)
phone (String)
company (String)
addressLine2 (String)

----}}
