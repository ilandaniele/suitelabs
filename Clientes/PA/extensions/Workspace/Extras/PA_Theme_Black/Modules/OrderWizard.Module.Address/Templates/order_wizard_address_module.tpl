<div class="order-wizard-address-module">
	<div class="order-wizard-address-module-show-addresses-container">
     
		{{#if showTitle}}
			<h3 class="order-wizard-address-module-title">
				{{title}}
			</h3>
		{{/if}}
        {{#if shipaddress}}
        	{{#if isffl}}
                <h3 class="order-wizard-address-module-title">
                    {{translate 'Home Address'}}
                </h3>
            {{/if}}
		{{/if}}
        {{#if isFFL}}
        	<h3 class="order-wizard-address-module-title">
				{{translate 'Home Address'}}
			</h3>
        {{/if}}
		{{#if isSameAsEnabled}}
                <label class="order-wizard-address-module-checkbox">
                    <input
                        {{#if isSameAsCheckBoxDisable}}disabled="disabled"{{/if}}
                        type="checkbox"
                        name="same-as-address"
                        data-action="same-as"
                        value="1"
                        {{#if isSameAsSelected}}checked{{/if}}
                    >
                    {{sameAsMessage}}
                </label>
		{{/if}}

		{{#if showSingleAddressDetails}}
            <span>
                {{#if showManageValue}}
                    <a class="order-wizard-address-module-new-button" href="/addressbook/new?manage={{manageValue}}" data-toggle="show-in-modal">
                        {{translate 'Add New Address'}}
                    </a>
                {{else}}
                    <a class="order-wizard-address-module-new-button" href="/addressbook/new" data-toggle="show-in-modal">
                        {{translate 'Add New Address'}}
                    </a>
                {{/if}}
            </span>
            <!--<span>
                <a class="order-wizard-address-module-new-button" href="#" data-action="change-address" style="margin-left: 20px">
                    {{translate 'Change Address'}}
                </a>
            </span>-->
            {{#unless addressNeedRectification}}
                <div data-view="Single.Address.Details" class="order-wizard-address-module-single"></div>
            {{/unless}}
            {{#if addressNeedRectification}}
                <div data-view="Address.Confirmation.View" class="order-wizard-address-confirmation-view"></div>
                <div data-view="Address.Correction.View" class="order-wizard-address-correction-view"></div>
                <div data-view="Address.Address2.Fix.View" class="order-wizard-address-address2-fix-view"></div>
            {{/if}}
            <div class="clearfix"></div>
		{{else}}
			{{#if showAddressList}}
                <span>
                     {{#if showManageValue}}
                        <a class="order-wizard-address-module-new-button" href="/addressbook/new?manage={{manageValue}}" data-toggle="show-in-modal">
                            {{translate 'Add New Address'}}
                        </a>
                    {{else}}
                        <a class="order-wizard-address-module-new-button" href="/addressbook/new" data-toggle="show-in-modal">
                            {{translate 'Add New Address'}}
                        </a>
                    {{/if}}
                </span>
				<div id="order-wizard-address-module-placeholder" {{#if showManageValue}}data-manage="{{manageValue}}"{{/if}} class="order-wizard-address-module-list-placeholder">

					<div class="order-wizard-address-module-address-container">
						<div data-view="Address.List"></div>
					</div>
				</div>
			{{else}}
				<div id="address-module-form-placeholder" {{#if showManageValue}}data-manage="{{manageValue}}"{{/if}} class="order-wizard-address-module-form-placeholder">
					<div data-view="New.Address.Form"></div>

					{{#if showSaveButton}}
						<div class="order-wizard-address-module-form-actions">
							<button type="submit" class="order-wizard-address-module-save-button" data-action="submit">
								{{translate 'Save Address'}}
							</button>
						</div>
					{{/if}}
				</div>
			{{/if}}
		{{/if}}
        
        {{#if shipaddress}}
        	{{#if isffl}}
         		<div class="address-edit-fields">
                    <h3 class="order-wizard-address-module-title ffl-title">
                        FFL Shipping Address
                    </h3>
                	<div class="order-wizard-restriction-message-container">
                    	<h5>YOUR ORDER CONTAINS AN ITEM OR ITEMS THAT ARE REGULATED BY THE ATF.</h5>
                    	<p>Your entire order will only ship to an individual or business possessing a Federal Firearms License. Please provide an FFL address or contact info.</p>
                    </div>
                    <div class="address-edit-fields-group">
                    	<label class="address-edit-fields-group-label"><input type="checkbox" id="noffl" value="T" data-unchecked-value="F" name="noffl" {{#if noFFLInfo}} checked {{/if}}> {{translate 'I do not know my FFL address. I will provide it at a later time.'}} </label>
                    </div>
                    <div data-type="alert-placeholder"></div>
                    {{#unless noFFLInfo}}
                        <div class="address-edit-fields-group" data-input="custbody_ffl_name" data-validation="control-group">
                            <label class="address-edit-fields-group-label" for="custbody_ffl_name">
                                {{translate 'FFL ID, Name or Phone Number'}}
                            </label>
                            <div  class="address-edit-fields-group-form-controls" data-validation="control">
                                <input type="text" class="address-edit-fields-group-input" id="custbody_ffl_name" name="custbody_ffl_name" value="{{custbody_ffl_name}}">
                            </div>
                        </div>
                        <div class="address-edit-fields-group" data-input="custbody_ffl_shipping_address_1" data-validation="control-group">
                            <label class="address-edit-fields-group-label" for="custbody_ffl_shipping_address_1">
                                {{translate 'Address'}}
                            </label>
                            <div  class="address-edit-fields-group-form-controls" data-validation="control">
                                <input autocomplete="addrexx" type="text" class="address-edit-fields-group-input" id="custbody_ffl_shipping_address_1" name="custbody_ffl_shipping_address_1" value="{{custbody_ffl_shipping_address_1}}">
                                <p class="address-edit-fields-input-help">{{translate 'Example: 1234 Main Street'}}</p>
                            </div>
                        </div>                        
                        <div class="address-edit-fields-group" data-input="custbody_ffl_shipping_city" data-validation="control-group">
                            <label class="address-edit-fields-group-label" for="custbody_ffl_shipping_city">
                                {{translate 'City'}}
                            </label>
                            <div  class="address-edit-fields-group-form-controls" data-validation="control">
                                <input type="text" autocomplete="addrexx" class="address-edit-fields-group-input" id="custbody_ffl_shipping_city" name="custbody_ffl_shipping_city" value="{{custbody_ffl_shipping_city}}">
                            </div>
                        </div>
                        <div class="address-edit-fields-group" id="custbody_ffl_shipping_state" data-input="custbody_ffl_shipping_state" data-view="FFLStatesView" data-validation="control-group">
                        </div>
                        <div class="address-edit-fields-group" data-input="custbody_ffl_shipping_zip" data-validation="control-group">
                            <label class="address-edit-fields-group-label" for="custbody_ffl_shipping_zip">
                                {{translate 'Zip Code'}}
                            </label>
                            <div  class="address-edit-fields-group-form-controls" data-validation="control">
                                <input autocomplete="addrexx" type="text" class="address-edit-fields-group-input-zip" id="custbody_ffl_shipping_zip" name="custbody_ffl_shipping_zip" value="{{custbody_ffl_shipping_zip}}" data-type="zip">
                                <p class="address-edit-fields-input-help">{{translate 'Example: 94117'}}</p>
                            </div>
                        </div>
                    </div>
                {{/unless}}
    	    {{/if}}
        
        
        	{{!-- <div class="order-wizard-special-instructions-container">
                <div class="order-wizard-special-instructions-label">
                    <label class="address-edit-fields-group-label">Special Instructions</label>
                </div>
                <textarea rows="4" cols="40" name="custbodyspecialinstructions" id="custbodyspecialinstructions" placeholder="">{{custbodyspecialinstructions}}</textarea>
            </div> --}}
	    {{/if}}
	</div>
</div>